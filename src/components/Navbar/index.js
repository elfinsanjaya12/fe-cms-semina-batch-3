import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavLink from '../NavLink';

export default function Header() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>Logo</Navbar.Brand>
        <Nav className='me-auto'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/categories'>Categories</NavLink>
          <NavLink to='/talents'>Talents</NavLink>
          <NavLink to='/events'>Events</NavLink>
        </Nav>
        <Nav className='justify-content-end'>
          <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
