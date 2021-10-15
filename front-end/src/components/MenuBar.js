import React, { useState } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function MenuBar() {
  // Helpers to find path
  const pathname = window.location.pathname; // current path upon opening/refresh
  const path = pathname === "/" ? "home" : pathname.substr(1); // is home if the path is /, else takes the path

  // State for active page
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
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
}

export default MenuBar;
