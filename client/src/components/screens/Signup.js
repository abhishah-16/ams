import React, { useState } from "react"
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import NavBar from '../Navbar'

const SignUp = () => {
    const history = useHistory();

    return (
        <>
            <NavBar />
            <div className="mycard">
                <div className="card auth-card input-field">
                    <h3>AMS</h3>
                    <h6>Select Your Role for SignUp</h6>
                  
                    <button className="btn waves-effect waves-light text-white blue darken-1 p-auto"
                    >
                        Auditorium's Manager
                    </button>
                    <button className="btn waves-effect waves-light text-white blue darken-1 p-auto"
                    >
                        Event Organizer
                    </button>
                    <button className="btn waves-effect waves-light text-white blue darken-1 p-auto"
                    value="Customer"
                     onClick={(e) => {
                        var role = value;
                        history.push({
                          pathname: "/csignup",
                          state: role ,
                        });
                      }}
                    >   
                        Customer
                    </button>
                    <h5 className='mt-2'>
                        <Link to="/login">Already have an account ?</Link>
                    </h5>

                </div>
            </div>
        </>
    )
}

export default SignUp