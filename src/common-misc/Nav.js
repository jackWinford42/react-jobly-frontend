import React, { useContext } from "react";
import { Navbar, Nav, NavItem, NavLink, } from "reactstrap";
import Context from "../authentication/Context";

/** Displays a navbar with variable links depending on whether
 * there is an authenticated user or not.
 */
function NavBar({logout}) {
  const { currUser } = useContext(Context);

  const loggedIn = () => {
    return (
      <Nav className="navbar-nav mr-auto" navbar>
        <NavItem>
          <NavLink href="/companies">Companies</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/jobs">Jobs</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/profile">Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/" onClick={logout}>Log out user</NavLink>
        </NavItem>
      </Nav>
    )
  }

  const unauthed = () => {
    return (
      <Nav className="navbar-nav mr-auto" navbar>
        <NavItem>
          <NavLink href="/sign-up">sign up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">log in</NavLink>
        </NavItem>
      </Nav>
    )
  }

  return (
    <Navbar color="light" light expand="md">
      <NavLink exact href="/" className="navbar-brand">
        Jobly
      </NavLink>
      {(currUser) ? loggedIn() : unauthed()}
    </Navbar>
  );
}

export default NavBar;