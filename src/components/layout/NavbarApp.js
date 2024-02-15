import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import React from "react";

const NavbarApp = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="/">
                                <img
                                    alt=""
                                    src="/logo192.png"
                                    width="40"
                                    height="40"
                                    className="d-inline-block align-top"
                                />
                                <h6>T-Shop</h6>
                            </Navbar.Brand>
                        </Container>
                    </Navbar>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/products">Manager Product</Nav.Link>
                            <Nav.Link href="/users">Manager User</Nav.Link>
                            <NavDropdown title="Other" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Infor</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Cart
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Login</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Register</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </>
    );
}
export default NavbarApp;