import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post(
          "https://node-server28.herokuapp.com/register",
          values
        );
        alert("user Registered");
      } catch (error) {
        alert("error");
        console.log(error);
      }
      resetForm();
      navigate("/");
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.number) {
        errors.number = "Required";
      }
      if (!values.email) {
        errors.email = "Required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 card-center">
          <div className="card-container">
            <div>
              <div className="logo-container">
                <h4 className="mt-5 text-light">Register</h4>
              </div>
            </div>
            <div className="form-container">
              <form onSubmit={formik.handleSubmit}>
                <div className="name-container">
                  <label className="form-label text-light">Name: </label>
                  <input
                    className="form-control text-light "
                    type="text"
                    placeholder="Enter Name Here"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  ></input>
                  {formik.errors.name ? (
                    <div style={{ color: "red" }}>{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="number-container">
                  <label className="form-label text-light">Number: </label>
                  <input
                    className="form-control text-light "
                    type="number"
                    placeholder="Enter number Here"
                    name="number"
                    onChange={formik.handleChange}
                    value={formik.values.number}
                  ></input>
                  {formik.errors.number ? (
                    <div style={{ color: "red" }}>{formik.errors.number}</div>
                  ) : null}
                </div>
                <div className="email-container">
                  <label className="form-label text-light">Email: </label>
                  <input
                    className="form-control text-light "
                    type="email"
                    placeholder="Enter Email Here"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  ></input>
                  {formik.errors.email ? (
                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="password-container mt-2">
                  <label className="form-label text-light">Password: </label>
                  <input
                    className="form-control text-light"
                    type="password"
                    placeholder="Enter Your Password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  ></input>
                  {formik.errors.password ? (
                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="d-grid mt-4">
                  <input
                    className="btn login"
                    type="submit"
                    value="register"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
