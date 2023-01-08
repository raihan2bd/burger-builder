import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

const navigationItem = props => {
  let navigationItem = (
    <li className={classes.NavigationItem}>
      <NavLink
        to={props.link}
        exact={props.exact}
        activeClassName={classes.active}
      >
        {props.children}
      </NavLink>
    </li>
  );
  if (props.isSideDrawer) {
    navigationItem = (
      <li onClick={props.clicked} className={classes.NavigationItem}>
        <NavLink
          to={props.link}
          exact={props.exact}
          activeClassName={classes.active}
        >
          {props.children}
        </NavLink>
      </li>
    );
  }
  return navigationItem;
};

export default navigationItem;
