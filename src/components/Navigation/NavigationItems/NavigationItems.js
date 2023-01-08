import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem
        clicked={props.clicked}
        isSideDrawer={props.isSideDrawer}
        link="/"
        exact
      >
        Burger Builder
      </NavigationItem>

      {props.isAuth ? (
        <NavigationItem
          clicked={props.clicked}
          isSideDrawer={props.isSideDrawer}
          link="/orders"
        >
          Orders
        </NavigationItem>
      ) : null}

      {!props.isAuth ? (
        <NavigationItem
          clicked={props.clicked}
          isSideDrawer={props.isSideDrawer}
          link="/auth"
        >
          Login
        </NavigationItem>
      ) : (
        <NavigationItem
          clicked={props.clicked}
          isSideDrawer={props.isSideDrawer}
          link="/logout"
        >
          Logout
        </NavigationItem>
      )}
    </ul>
  );
};

export default navigationItems;
