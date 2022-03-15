import React, { useState, useEffect } from "react"
import { Link, useHistory, useLocation } from 'react-router-dom'
import M from 'materialize-css'
import NavBar from '../Navbar'
import Footer from "../Footer";

const ManagerSignup = () => {
    const history = useHistory()
    const location = useLocation();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPasword] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [cost, setCost] = useState("")
    const [capacity, setCapacity] = useState("")
    const [audiName, setAudiName] = useState("")
    const [age, setAge] = useState("")
    const [role, setRole] = useState("")

    
    useEffect((req, res) => {
        var role = location.state;
        setRole(role.role);
    }, [location]);

    const PostData = () => {
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            M.toast({ html: "invalid email", classes: "#c62828 red darken-3" })
            return
        }
        fetch("/users/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                age,
                role
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    console.log("msg", data.message, data.error)
                    M.toast({ html: "signed up successfully", classes: "#43a047 green darken-1" })
                    history.push('/login')
                }
            }).catch(err => {
                console.log(err.message)
            })
    }


    return (
        <>
            <NavBar />
            <div className="mycard">
                <div className="card auth-card input-field">
                    <h4>Helping Hands At Home</h4>
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPasword(e.target.value)}
                    />
                    <input
                        type="Number"
                        placeholder="age No."
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Ex. manager,user,organizer"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled={true}
                    />
                     <input
                        type="text"
                        placeholder="Auditorium Name"
                        value={audiName}
                        onChange={(e) => setAudiName(e.target.value)}
                    />
                     <input
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                     <input
                        type="text"
                        placeholder=""
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <button className="btn waves-effect waves-light text-white blue darken-1 p-auto"
                        onClick={() => PostData()}
                    >
                        Sign UP
                    </button>
                    <h5 className='mt-2'>
                        <Link to="/login">Already have an account ?</Link>
                    </h5>

                </div>
            </div>

        </>
    )
}

export default ManagerSignup