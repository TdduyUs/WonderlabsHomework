/* @flow */

import React from "react";
import { DrawerNavigator } from "react-navigation";

import Home from "../screens/home/";
import ProductDetail from "../screens/product_detail";
import SideBar from "../components/sidebar";

const DrawerExample = DrawerNavigator(
  {
    Home,
    ProductDetail,
  },
  {
    initialRouteName: "Home",
    contentOptions: {
        activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawerExample;
