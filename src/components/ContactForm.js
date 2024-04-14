import React, { useState, useEffect } from "react";

export default function ContactForm(props) {
  const initialFieldValues = {
    fullName: "",
    mobile: "",
    email: "",
    address: "",
  };

  var [values, setValues] = useState(initialFieldValues);

  useEffect(() => {
    if (props.currentId == "")
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...props.contactObjects[props.currentId],
      });
  }, [props.currentId, props.contactObjects]);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addOrEdit(values);
  };
  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-outline mb-4">
        <input
          className="form-control"
          placeholder="Full Name"
          name="fullName"
          value={values.fullName}
          onChange={handleInputChange}
        />
      </div>
      <div className="row mb-4">
        <div className="col">
          <div className="form-outline">
            <input
              className="form-control"
              placeholder="Mobile"
              name="mobile"
              value={values.mobile}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="col">
          <div className="form-outline">
            <input
              className="form-control"
              placeholder="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
      <div className="form-outline mb-4">
        <textarea
          className="form-control"
          placeholder="Address"
          name="address"
          value={values.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-outline mb-4">
        <input
          type="submit"
          value={props.currentId == "" ? "Save" : "Update"}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
}
