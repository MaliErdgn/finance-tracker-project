import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { InertiaLink } from "@inertiajs/inertia-react";
import "@/Components/NavBar/NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    return (
        <Navbar className="text-white">
            <Container>
                <Navbar.Brand href={route("dashboard")} className="nav-link">
                    <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                </Navbar.Brand>
                <Nav className="">
                    <Nav.Link
                        className="nav-link"
                        as={InertiaLink}
                        href={route("data-submit")}
                    >
                        Data Submit
                    </Nav.Link>
                    <Nav.Link
                        className="nav-link"
                        as={InertiaLink}
                        href={route("dashboard")}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        className="nav-link"
                        as={InertiaLink}
                        href={route("insights")}
                    >
                        Insights
                    </Nav.Link>
                    <Nav.Link
                        className="nav-link"
                        as={InertiaLink}
                        href={route("create-tag")}
                    >
                        Create Tag
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
