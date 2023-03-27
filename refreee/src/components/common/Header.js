import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
function Header() {

  const userData = JSON.parse(localStorage.getItem("Users")) || [];

  /* Finding the user that is logged in. */
  const logindata = userData.find((user) => user.isLogin === true) || [];

  console.log(logindata);

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Link to="/product"><Navbar.Brand>Home</Navbar.Brand></Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link to="/editeprofile">
              <Button>{logindata.firstname}</Button>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header; 
