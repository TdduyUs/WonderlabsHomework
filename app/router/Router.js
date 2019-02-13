import { createStackNavigator, createSwitchNavigator } from "react-navigation";

import Transition from "../components/Transition";
import Drawer from "./Drawer";
import ProductsList from "../screens/home";
import ProductDetail from "../screens/product_detail";

const AppStack = createStackNavigator({
    Drawer,
    ProductsList,
    ProductDetail,
}, {
        initialRouteName: "Drawer",
        transitionConfig: Transition,
        headerMode: "none"
    });

export default AppStack