// Creating the Navbar Section for the Sprint Planner Page
import React from "react";
import "./NavBar.scss";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Sprint from "./CreateSprint/CreateSprint";
import LoginForm from "../components/LoginForm";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../assets/logo.png";
class NavBarC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      isSprintOpen: false,
      username: this.props.username,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.username,
    });
  }

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  // logout handler
  logout = (e) => {
    localStorage.clear();
    window.location.reload(false);
    return <LoginForm />;
  };

  // open sprint modal
  openSprintModal = () => this.setState({ isSprintOpen: true });
  // close sprint modal
  closeSprintModal = () => this.setState({ isSprintOpen: false });

  render() {
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Brand>
              <img
                alt="logo"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{" "}
              Sprint Planner
            </Navbar.Brand>
            <Navbar.Collapse id="navbarScroll">
              <Nav>
                <NavDropdown
                  title={<BsPersonCircle></BsPersonCircle>}
                  id="navbarScrollingDropdown"
                  align={"end"}
                >
                  <NavDropdown.Item>
                    Howdy, {this.state.username}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={this.logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Sprint isSprintOpen={this.state.isSprintOpen}></Sprint>
      </>
    );
  }
}

export default NavBarC;
