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
              <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem >
              <MDBNavLink to="/login">Login</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/signup">Sign Up</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/contactus">Contact Us</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavBar;