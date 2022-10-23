import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import NavLink from '../NavLink';

export default function Header() {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>Logo</Navbar.Brand>
        <Nav className='me-auto'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/categories'>Categories</NavLink>
          <NavLink to='/talents'>Talents</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
}
