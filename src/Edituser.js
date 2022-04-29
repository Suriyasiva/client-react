import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
function Edituser() {
  let navigate = useNavigate();
  let params = useParams();
  const formik = useFormik({
    initialValues: {
      name: "",
      number: "",
      email: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.put(
          `https://node-server28.herokuapp.com/editdata/${params.id}`,
          values,
          {
            headers: {
              authorization: localStorage.getItem("app_token"),
            },
          }
        );
        alert("user edited");
      } catch (error) {
        alert("error");
        navigate("/");
        console.log(error);
      }
      resetForm();
      navigate(-1);
    },
  });
  // get single user and set
  const setData = async () => {
    try {
      let singleData = await axios.get(
        `https://node-server28.herokuapp.com/singleuser/${params.id}`,
        {
          headers: {
            authorization: localStorage.getItem("app_token"),
          },
        }
      );
      delete singleData.data._id;
      formik.setValues(singleData.data);
    } catch (error) {
      console.log(error);
      navigate("/");
      alert("error");
    }
  };
  useEffect(() => {
    setData();
  }, []);
  return (
    <>
      {/* <h1>{params.id}</h1> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 card-center">
            <div className="card-container">
              <div>
                <div className="logo-container">
                  <h4 className="mt-5 text-light">User Edit</h4>
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
                  <div className="d-grid mt-4">
                    <input
                      className="btn login"
                      type="submit"
                      value="submit"
                    ></input>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Edituser;
