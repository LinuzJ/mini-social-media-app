import React, { useState, useContext } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";

function MenuBar() {
  // Helpers to find path
  const pathname = window.location.pathname; // current path upon opening/refresh
  const path = pathname === "/" ? "home" : pathname.substr(1); // is home if the path is /, else takes the path

  // Context for login
  const context = useContext(AuthContext);

  // State for active page
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  // Main bar, depends on login context
  const mainBar = context.user ? (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu.Item name={`Welcome ${context.user.username}!`} active />
        <Menu.Item name="Logout" onClick={context.logout} />
      </Menu>
    </Segment>
  ) : (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
      </Menu>
    </Segment>
  );

  return mainBar;
}

export default MenuBar;
