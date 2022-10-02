import React, { useState } from 'react';
import NavLink from '../NavLink';

export default function Header() {
  const [token, setToken] = useState(true);
  return (
    <ul>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/categories'>Categories</NavLink>
      <NavLink to='/about'>About</NavLink>
      {token ? <NavLink to='/logout'>Logout</NavLink> : <>login</>}
    </ul>
  );
}
