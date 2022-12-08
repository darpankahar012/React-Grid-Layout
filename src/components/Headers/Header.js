import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Header = () => {
  let location = useLocation();
  const history = useHistory();

  const [navbarToggler, setNavbarToggler] = React.useState(false);

  React.useEffect(() => {
    let token = global.localStorage.getItem("access_token");
    if (!token) {
      history.push("/login");
    }
  }, []);

  const hideHeaders = () => {
    if (location.pathname !== "/login") {
      return (
        <>
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="container-fluid">
              <Link to="/">
                <a class="navbar-brand" href="#">
                  <img src="../../assets/images/logo.png" alt="" />
                </a>
              </Link>

              <button
                class={
                  navbarToggler ? "navbar-toggler" : "navbar-toggler collapsed"
                }
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded={navbarToggler ? "true" : "false"}
                aria-label="Toggle navigation"
                onClick={() => setNavbarToggler(!navbarToggler)}
              >
                <span class="navbar-toggler-icon"></span>
              </button>
              <div
                class={
                  navbarToggler
                    ? "collapse navbar-collapse show"
                    : "collapse navbar-collapse"
                }
                id="navbarSupportedContent"
              >
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">
                      Dashboard
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Client Section
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      Publisher Section
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">
                      CC Analytics
                    </a>
                  </li>
                  <li class="nav-item">
                    {location.pathname === "/login" ? (
                      <Link to="/login">
                        <a class="nav-link">
                          <i class="fas fa-power-off"></i> Login
                        </a>
                      </Link>
                    ) : (
                      <a class="nav-link">
                        <i class="fas fa-power-off"></i> Logout
                      </a>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <Link to="/">
                <a className="navbar-brand">
                  <img src="../../assets/images/logo.png" alt="" />
                </a>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Client Section
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Publisher Section
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      CC Analytics
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link to="/login">
                      <a className="nav-link">
                        <i className="fas fa-power-off"></i> Admin
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav> */}
        </>
      );
    } else {
      return null;
    }
  };

  return (
    // <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" >

    //     <Container>
    //         <Row noGutters className="position-relative w-100 align-items-center">

    //             <Col className="d-none d-lg-flex justify-content-start">
    //                 <Nav className="mrx-auto" navbar>

    //                     <NavItem className="d-flex align-items-center">
    //                         <NavLink className="font-weight-bold" >
    //                             <img src={AVATAR} alt="avatar" className="img-fluid rounded-circle" style={{ width: 36 }} />
    //                         </NavLink>
    //                     </NavItem>

    //                     <NavItem className="d-flex align-items-center">
    //                         <NavLink className="font-weight-bold" > <Link style={{ textDecoration: "none", color: "#737373" }} to="/">Home</Link></NavLink>
    //                     </NavItem>

    //                     <NavItem className="d-flex align-items-center">
    //                         <NavLink className="font-weight-bold" ><Link style={{ textDecoration: "none", color: "#737373" }} to="/login">Login</Link></NavLink>
    //                     </NavItem>

    //                     <UncontrolledDropdown className="d-flex align-items-center" nav inNavbar>
    //                         <DropdownToggle className="font-weight-bold" nav caret>fashion</DropdownToggle>
    //                         <DropdownMenu end>
    //                             <DropdownItem className="font-weight-bold text-secondary text-uppercase" header disabled>Learn React</DropdownItem>
    //                             <DropdownItem divider />
    //                             <DropdownItem>Men</DropdownItem>
    //                             <DropdownItem>Women</DropdownItem>
    //                             <DropdownItem>Baby and Kids</DropdownItem>
    //                         </DropdownMenu>
    //                     </UncontrolledDropdown>

    //                 </Nav>
    //             </Col>

    //             {/* <Col className="d-flex justify-content-xs-start justify-content-lg-center">
    //                     <NavbarBrand className="d-inline-block p-0"  style={{ width: 80 }}>
    //                         <img src={logo} alt="logo" className="position-relative img-fluid" />
    //                     </NavbarBrand>
    //                 </Col> */}

    //             <Col className="d-none d-lg-flex justify-content-end">
    //                 <Form inline  >
    //                     <Row noGutters className="position-relative w-100 align-items-center">
    //                         <Col className="d-none d-lg-flex justify-content-start" >
    //                             <Input type="search" className="mr-3" placeholder="Search React Courses" style={{ "width": "95%" }} />
    //                         </Col>
    //                         <Col className="d-none d-lg-flex justify-content-start">
    //                             <Button type="submit" color="info" outline>Search</Button>
    //                         </Col>
    //                     </Row>
    //                 </Form>
    //             </Col>

    //         </Row>
    //     </Container>

    // </Navbar>
    hideHeaders()
  );
};
export default Header;
// export const history = createHashHistory();
