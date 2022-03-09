import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="#1e88e5 blue darken-1" 
    // className="page-footer center-on-small-only pt-0 mt-5 fixed bottom"

    className="font-small pt-0.5 mt-4 page-footer rounded-t-lg"
    style={{right: 0,left: 0}}
>   

      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="/">www.ams.com</a>
        </MDBContainer>
      </div>
    </MDBFooter>
   
  );
}


export default Footer;