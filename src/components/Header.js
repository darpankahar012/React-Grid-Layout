import React from 'react';
import { Link } from 'react-router-dom';

import {
    Container, Row, Col, Form, Input, Button, Navbar, Nav,
    NavLink, NavItem, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';

const AVATAR = 'https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg';

const Header = () => (
    <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" >

        <Container>
            <Row noGutters className="position-relative w-100 align-items-center">

                <Col className="d-none d-lg-flex justify-content-start">
                    <Nav className="mrx-auto" navbar>

                        <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" >
                                <img src={AVATAR} alt="avatar" className="img-fluid rounded-circle" style={{ width: 36 }} />
                            </NavLink>
                        </NavItem>

                        <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" > <Link style={{ textDecoration: "none", color: "#737373" }} to="/">Home</Link></NavLink>
                        </NavItem>

                        <NavItem className="d-flex align-items-center">
                            <NavLink className="font-weight-bold" ><Link style={{ textDecoration: "none", color: "#737373" }} to="/login">Login</Link></NavLink>
                        </NavItem>

                        <UncontrolledDropdown className="d-flex align-items-center" nav inNavbar>
                            <DropdownToggle className="font-weight-bold" nav caret>fashion</DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem className="font-weight-bold text-secondary text-uppercase" header disabled>Learn React</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Men</DropdownItem>
                                <DropdownItem>Women</DropdownItem>
                                <DropdownItem>Baby and Kids</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>

                    </Nav>
                </Col>

                {/* <Col className="d-flex justify-content-xs-start justify-content-lg-center">
                        <NavbarBrand className="d-inline-block p-0"  style={{ width: 80 }}>
                            <img src={logo} alt="logo" className="position-relative img-fluid" />
                        </NavbarBrand>
                    </Col> */}

                <Col className="d-none d-lg-flex justify-content-end">
                    <Form inline  >
                        <Row noGutters className="position-relative w-100 align-items-center">
                            <Col className="d-none d-lg-flex justify-content-start" >
                                <Input type="search" className="mr-3" placeholder="Search React Courses" style={{ "width": "95%" }} />
                            </Col>
                            <Col className="d-none d-lg-flex justify-content-start">
                                <Button type="submit" color="info" outline>Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>

            </Row>
        </Container>

    </Navbar>
);

export default Header;