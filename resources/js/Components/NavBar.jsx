import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { InertiaLink } from "@inertiajs/inertia-react";

const NavBar = () => {
    return (
        <Navbar className="bg-gray-700 text-white">
            <Container>
                <Navbar.Brand href="">Navbar</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={InertiaLink} href={route("data-submit")}>
                        Data Submit
                    </Nav.Link>
                    <Nav.Link as={InertiaLink} href={route("dashboard")}>
                        Dashboard
                    </Nav.Link>
                    <Nav.Link as={InertiaLink} href={route("insights")}>
                        Insights
                    </Nav.Link>
                    <Nav.Link as={InertiaLink} href={route("create-tag")}>
                        Create Tag
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavBar;
