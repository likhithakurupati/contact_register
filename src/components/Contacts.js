import React, { useState, useEffect } from "react";
import ContactForm from "./ContactForm";
import fireDb from "../firebase";
import { ref, push, onValue, child, set, remove } from "firebase/database";

export default function Contacts() {
  var [contactObjects, setContactObjects] = useState({});
  var [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const contactsRef = ref(fireDb, "contacts");
    onValue(contactsRef, (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        });
      else setContactObjects({});
    });
  }, []);

  const addOrEdit = (obj) => {
    const dbRef = ref(fireDb, "contacts"); // Reference to 'contacts' node
    if (currentId === "") {
      push(dbRef, obj, (err) => {
        // Pushing data to 'contacts' node
        if (err) {
          console.log("Error pushing data:", err);
        } else {
          console.log("Data pushed successfully");
          setCurrentId("");
        }
      });
    } else {
      // If currentId is not empty, it means we are updating an existing object
      const contactRef = child(dbRef, currentId); // Reference to the specific contact
      set(contactRef, obj, (err) => {
        // Setting data to the specific contact node
        if (err) {
          console.log(err);
        } else {
          setContactObjects({
            fullName: "",
            mobile: "",
            email: "",
            address: "",
          });
          setCurrentId("");
        }
      });
      setCurrentId("");
    }
  };

  const onDelete = (key) => {
    if (window.confirm("Are you sure to delete this record?")) {
      const dbRef = ref(fireDb, "contacts");
      const contactRef = child(dbRef, key); // Use the key parameter passed to the function
      remove(contactRef, (err) => {
        // Remove the specific contact node
        if (err) {
          console.log(err);
        } else {
          setCurrentId(""); // Clear the currentId after successful deletion
        }
      });
    }
  };
  return (
    <div className="row mt-5">
      <div className="col-md-5">
        <ContactForm {...{ addOrEdit, currentId, contactObjects }} />
      </div>
      <div className="col-md-7">
        <table className="table table-bordered align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th className="fw-medium">Full Name</th>
              <th className="fw-medium">Mobile</th>
              <th className="fw-medium">Email</th>
              <th className="fw-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(contactObjects).map((id) => {
              return (
                <tr key={id}>
                  <td>
                    <div className="">
                      <p className="fw-normal mb-1">
                        {contactObjects[id].fullName}
                      </p>
                    </div>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">
                      {contactObjects[id].mobile}
                    </p>
                  </td>
                  <td>
                    <p className="fw-normal mb-1">{contactObjects[id].email}</p>
                  </td>
                  <td>
                    <a
                      className="btn btn-sm btn-rounded btn-outline-primary me-2"
                      onClick={() => {
                        setCurrentId(id);
                      }}
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </a>
                    <a
                      className="btn btn-sm btn-rounded btn-outline-danger"
                      onClick={() => {
                        onDelete(id);
                      }}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
