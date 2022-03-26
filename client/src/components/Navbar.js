import React, { Component ,useContext} from "react";
import {UserContext} from '../App'
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdbreact";

import { Link } from "react-router-dom";
class NavBar extends Component {
  state = {
    isOpen: false, 
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  
  render() {
    return (
      <MDBNavbar color="#1e88e5 blue darken-1" dark expand="md" className="rounded-b-lg">
        <MDBNavbarBrand>
          <strong className="white-text title">Auditoria</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem >
              <Link to="/">Home</Link>
            </MDBNavItem>
            <MDBNavItem >
              <Link to="/login">Login</Link>
            </MDBNavItem>
            <MDBNavItem>
              <Link to="/signup">Sign Up</Link>
            </MDBNavItem>
            <MDBNavItem>
              <Link to="/contactus">Contact Us</Link>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavBar;