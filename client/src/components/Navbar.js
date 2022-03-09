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
          <strong className="white-text title">Helping Hands At  Home</strong>
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
            {/* <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-md-inline d-sm-inline d-inline">Signup</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="/signuppro">
                    Professional
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/signup">User</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-md-inline d-sm-inline d-inline">Signin</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default" >
                  <MDBDropdownItem href="/loginpro">
                    Professional
                  </MDBDropdownItem>
                  <MDBDropdownItem href="/login">User</MDBDropdownItem>
                  <MDBDropdownItem href="/adminLogin">Admin</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem> */}
            
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

// import React, { Component } from "react";
// import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
// MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
// import { BrowserRouter as Router } from 'react-router-dom';

// class NavBar extends Component {
// state = {
//   isOpen: false
// };

// toggleCollapse = () => {
//   this.setState({ isOpen: !this.state.isOpen });
// }

// render() {
//   return (
//     <Router>
//       <MDBNavbar color="default-color" dark expand="md">
//         <MDBNavbarBrand>
//           <strong className="white-text">Navbar</strong>
//         </MDBNavbarBrand>
//         <MDBNavbarToggler onClick={this.toggleCollapse} />
//         <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
//           <MDBNavbarNav left>
//             <MDBNavItem active>
//               <MDBNavLink to="#!">Home</MDBNavLink>
//             </MDBNavItem>
//             <MDBNavItem>
//               <MDBNavLink to="#!">Features</MDBNavLink>
//             </MDBNavItem>
//             <MDBNavItem>
//               <MDBNavLink to="#!">Pricing</MDBNavLink>
//             </MDBNavItem>
//             <MDBNavItem>
//               <MDBDropdown>
//                 <MDBDropdownToggle nav caret>
//                   <div className="d-none d-md-inline">Dropdown</div>
//                 </MDBDropdownToggle>
//                 <MDBDropdownMenu className="dropdown-default">
//                   <MDBDropdownItem href="#!">Action</MDBDropdownItem>
//                   <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
//                   <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
//                   <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
//                 </MDBDropdownMenu>
//               </MDBDropdown>
//             </MDBNavItem>
//           </MDBNavbarNav>
//           <MDBNavbarNav right>
//             <MDBNavItem>
//               <MDBNavLink className="waves-effect waves-light" to="#!">
//                 <MDBIcon fab icon="twitter" />
//               </MDBNavLink>
//             </MDBNavItem>
//             <MDBNavItem>
//               <MDBNavLink className="waves-effect waves-light" to="#!">
//                 <MDBIcon fab icon="google-plus-g" />
//               </MDBNavLink>
//             </MDBNavItem>
//             <MDBNavItem>
//               <MDBDropdown>
//                 <MDBDropdownToggle nav caret>
//                   <MDBIcon icon="user" />
//                 </MDBDropdownToggle>
//                 <MDBDropdownMenu className="dropdown-default">
//                   <MDBDropdownItem href="#!">Action</MDBDropdownItem>
//                   <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
//                   <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
//                   <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
//                 </MDBDropdownMenu>
//               </MDBDropdown>
//             </MDBNavItem>
//           </MDBNavbarNav>
//         </MDBCollapse>
//       </MDBNavbar>
//     </Router>
//     );
//   }
// }

// export default NavbarPage;
export default NavBar;