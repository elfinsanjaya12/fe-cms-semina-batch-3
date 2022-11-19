import React from 'react';
import { Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NavLink({ role, roles, to, children }) {
  const navigate = useNavigate();
  let isHas = roles.indexOf(role);

  return (
    <>
      {isHas >= 0 && (
        <Nav.Link onClick={() => navigate(to)}>{children}</Nav.Link>
      )}
    </>
  );
}
