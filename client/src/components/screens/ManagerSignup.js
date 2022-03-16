import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import M from "materialize-css";
import NavBar from "../Navbar";
import Footer from "../Footer";

const ManagerSignup = () => {
  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [age, setAge] = useState();
  const [role, setRole] = useState("");
  const [audiName, setAudiName] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [city, setCity] = useState("");
  const [cost, setCost] = useState("");

  useEffect(
    (req, res) => {
      var role = location.state;
      setRole(role.role);
    },
    [location]
  );

  const PostData = () => {

    fetch("/users/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        age,
        role,
        audiName,
        cost,
        capacity,
        address,
        city
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
            console.log("msg", data.error);
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          M.toast({
            html: "signed up successfully",
            classes: "#43a047 green darken-1",
          });
          history.push("/login");
        }
      })
      .catch((err) => {
        M.toast({ html: err.message, classes: "#c62828 red darken-3" });
      });
  };

  return (
    <>
      <NavBar />
      <div className="mycard">
        <div className="card auth-m-card input-field">
          <h4>Auditoria</h4>
          <div className="form-row">
           
            
            <div className="form-group col-md-6">
            <div className="col-md mt-3 text-primary">
              <h5>Personal Details</h5>
            </div>
              <div className="col-md">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="col-md">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="col-md">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPasword(e.target.value)}
                />
              </div>
              <div className="col-md">
                <input
                  type="Number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="col-md">
                <input
                  type="text"
                  placeholder="Ex. manager,user,organizer"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={true}
                />
              </div>
            </div>
            <div className="form-group col-md-6">
            <div className="col-md mt-3 text-primary">
              <h5>Auditorium Details</h5>
            </div>
              <div className="col-md">
                <input
                  type="text"
                  placeholder="Auditorium Name"
                  value={audiName}
                  onChange={(e) => setAudiName(e.target.value)}
                />
              </div>
              <div className="col-md">
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="col-md">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="col-md">
                <input
                  type="Number"
                  placeholder="Capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
              <div className="col-md">
                <input
                  type="Number"
                  placeholder="Cost per hour"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            className="btn waves-effect waves-light text-white blue darken-1 p-auto"
            onClick={() => PostData()}
          >
            Sign UP
          </button>
          <h5 className="mt-2">
            <Link to="/login">Already have an account ?</Link>
          </h5>
        </div>
      </div>
    </>
  );
};

export default ManagerSignup;
