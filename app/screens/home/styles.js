const React = require("react-native");

const {Dimensions, Platform} = React;

const deviceWidth = Dimensions.get("window").width;

const marginNumber = 10;

export default {
    mainContainer:{
        backgroundColor: '#F6F6F6'
    },
    homeList: {
        flexDirection: 'column',
        marginBottom: 65
    },
    text: {
        color: "#AAAAAA",
        bottom: 6,
        marginTop: 5
    },
    itemCard: {
        margin: marginNumber,
        width: deviceWidth / 2 - (marginNumber * 2),
        // height: deviceWidth / 2 - 20
    },
    itemImage:{
        width: deviceWidth / 2 - (marginNumber * 2),
        height: deviceWidth / 2 - (marginNumber * 2)
    },
    overlay: {
        height: 50,
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        overflow: 'hidden',
        justifyContent: 'center',

    },
    headline: {
        fontSize: 17,
        textAlign: 'center',
        color: '#828282',
    },
    cartBadge: {
        width: 25,
        height: 25,
        right: 0,
        top: -10,
        position: 'absolute'
    },
    headerTitle:{
        color: '#030303'
    }
};
