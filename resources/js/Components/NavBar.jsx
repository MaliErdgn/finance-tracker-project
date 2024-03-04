import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { InertiaLink } from '@inertiajs/inertia-react';

const NavBar = () => {
return (
<Navbar bg="primary" data-bs-theme="dark">
    <Container>
        <Navbar.Brand href="">Navbar</Navbar.Brand>
        <Nav className="me-auto">
            <Nav.Link as={InertiaLink} href={route("balance-check")}>Balance</Nav.Link>
            <Nav.Link as={InertiaLink} href={route("data-submit")}>Data Submit</Nav.Link>
        </Nav>
    </Container>
</Navbar>
);
};

export default NavBar;
