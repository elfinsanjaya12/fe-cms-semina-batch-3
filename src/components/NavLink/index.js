import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NavLink({ to, children }) {
  const navigate = useNavigate();
  return <Nav.Link onClick={() => navigate(to)}>{children}</Nav.Link>;
}
