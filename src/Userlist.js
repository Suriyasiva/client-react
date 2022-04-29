import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Userlist() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      let userData = await axios.get(
        "https://node-server28.herokuapp.com/users",
        {
          headers: {
            authorization: localStorage.getItem("app_token"),
          },
        }
      );
      setData(userData.data);
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  };

  const deleteData = async (value) => {
    try {
      await axios.delete(
        `https://node-server28.herokuapp.com/delete/${value}`,
        {
          headers: {
            authorization: localStorage.getItem("app_token"),
          },
        }
      );
      console.log(value);
      fetchData();
      alert("data deleted");
    } catch (error) {
      alert("error");
      navigate("/");
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  let logOut = () => {
    window.localStorage.removeItem("app_token");
    navigate("/");
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="logout">
            <button
              onClick={() => {
                logOut();
              }}
              className="btn btn-primary mt-3"
            >
              LogOut
            </button>
          </div>
          <h3 className="mt-5 mb-5 d-flex  justify-content-center">
            User List
          </h3>
          <div className="col-sm-12 d-flex flex-wrap justify-content-evenly">
            {data.map((data) => {
              return (
                <div
                  class="card"
                  style={{ width: "18rem", marginBottom: "10px" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">Name: {data.name}</h5>
                    <p className="card-text m-0">Email: {data.email}</p>
                    <p className="card-text ">Phone Number: {data.number}</p>
                    <Link
                      to={`/edituser/${data._id}`}
                      className="btn btn-warning m-1"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        deleteData(data._id);
                      }}
                      className="btn btn-danger m-1"
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Userlist;
