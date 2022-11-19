import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import {
  accessCategories,
  accessEvents,
  accessOrders,
  accessPayments,
  accessTalents,
} from '../../const/access';
import NavLink from '../NavAccess';

export default function Header() {
  const [role, setRole] = useState(null);

  console.log('role');
  console.log(role);

  useEffect(() => {
    const fetchData = () => {
      let { role } = localStorage.getItem('auth')
        ? JSON.parse(localStorage.getItem('auth'))
        : {};

      setRole(role);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/signin';
  };
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='#home'>Logo</Navbar.Brand>
        <Nav className='me-auto'>
          <NavLink role={role} roles={accessCategories.lihat} to='/'>
            Home
          </NavLink>
          <NavLink role={role} roles={accessCategories.lihat} to='/categories'>
            Categories
          </NavLink>
          <NavLink role={role} roles={accessTalents.lihat} to='/talents'>
            Talents
          </NavLink>
          <NavLink role={role} roles={accessEvents.lihat} to='/events'>
            Events
          </NavLink>
          <NavLink role={role} roles={accessPayments.lihat} to='/payments'>
            Payments
          </NavLink>
          <NavLink role={role} roles={accessOrders.lihat} to='/orders'>
            Order
          </NavLink>
        </Nav>
        <Nav className='justify-content-end'>
          <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
