import React from "react";
import styled from "styled-components";

const StyledLayout = styled.div`
  width: 95%;
  max-width: 78em;
  margin: 0em auto 5em auto;
  flex: 1 0 auto;
  @media (min-width: 62.5em) {
    width: 80%;
  }
`;

// This component wraps the whole app
const Layout = (props) => {
  return <StyledLayout>{props.children}</StyledLayout>;
};

export default Layout;
