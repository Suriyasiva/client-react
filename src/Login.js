import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        let login = await axios.post(
          "https://node-server28.herokuapp.com/login",
          values
        );
        window.localStorage.setItem("app_token", login.data.token);
        console.log(login);
        alert("login successfully");
        navigate("/userlist");
      } catch (error) {
        alert("error");
        navigate("/");
        console.log(error);
      }
      resetForm();
    },
    validate: (values) => {
      const errors = {};
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
                <h4 className="mt-5 text-light">Login</h4>
              </div>
            </div>
            <div className="form-container">
              <form onSubmit={formik.handleSubmit}>
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
                  <div className="forgot-container">
                    <a href="#" className="forgot">
                      Forgot password
                    </a>
                  </div>
                </div>
                <div className="d-grid mt-4">
                  <input className="btn login" type="submit" />
                  <div className="sponsors-container mt-1">
                    <p className="mt-1 text-light ">sponsors</p>
                  </div>
                  <div className="option-buttons">
                    <div className="border border-2 rounded">
                      <i class="fa-brands fa-google text-danger"></i>
                    </div>
                    <div className="border  border-2 rounded">
                      <i class="fa-brands fa-facebook"></i>
                    </div>
                    <div className="border  border-2 rounded">
                      <i class="bi bi-apple text-light"></i>
                    </div>
                    <div className="border  border-2 rounded">
                      <i class="bi bi-github text-light"></i>
                    </div>
                    <div className="border  border-2 rounded">
                      <i class="fa-brands fa-twitter"></i>
                    </div>
                  </div>
                </div>
              </form>
              <div className="register-container">
                <div className="text-light">
                  Don't have an account?
                  <Link to="/register" className="signup text-primary">
                    {" "}
                    SignUp here
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
