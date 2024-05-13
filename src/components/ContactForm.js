import React, { useState, useEffect } from "react";

export default function ContactForm(props) {
  const initialFieldValues = {
    fullName: "",
    mobile: "",
    email: "",
    address: "",
  };

  var [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    if (values.fullName.trim() === "") {
      errors.fullName = "Name is required";
    }
    if (values.email.trim() === "") {
      errors.email = "Email is required";
    } else if (!isValidEmail(values.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (values.mobile.trim() === "") {
      errors.mobile = "Message is required";
    } else if (!isValidMobile(values.mobile)) {
      errors.mobile = "Please enter a valid mobile number";
    }
    setErrors((prevErrors) => ({ ...prevErrors, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const isValidMobile = (mobile) => {
    // Regular expression for validating mobile number
    const mobileRegex = /^[0-9]{10}$/; // Assumes a 10-digit mobile number format
    return mobileRegex.test(mobile);
  };
  const isValidEmail = (email) => {
    // Regular expression for validating email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (props.currentId == "")
      setValues({
        ...initialFieldValues,
      });
    else
      setValues({
        ...props.contactObjects[props.currentId],
      });
    setErrors({});
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
    if (validateForm()) {
      props.addOrEdit(values);
    }
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
        {errors.fullName && (
          <p className="text-red-500 text-error text-xs mt-1">
            {errors.fullName}
          </p>
        )}
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
            {errors.mobile && (
              <p className="text-red-500 text-error text-xs mt-1">
                {errors.mobile}
              </p>
            )}
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
            {errors.email && (
              <p className="text-red-500 text-error text-xs mt-1">
                {errors.email}
              </p>
            )}
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
