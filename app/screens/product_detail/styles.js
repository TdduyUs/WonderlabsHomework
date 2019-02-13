const React = require("react-native");

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  imageContainer: {
    flex: 1,
    width: deviceWidth,
    height: null
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30
  },
  logo: {
    position: "absolute",
    left: Platform.OS === "android" ? 40 : 50,
    top: Platform.OS === "android" ? 35 : 60,
    width: 280,
    height: 100
  },
  text: {
    color: "#D8D8D8",
    bottom: 6,
    marginTop: 5
  },
  homeList:{
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
  },
  halfWidth: {
      width: deviceWidth/2 - 40,
      height: deviceWidth/2 - 40,
      borderRadius: 10,
  },
    itemImage: {
        width: deviceWidth/2 - 40,
        height: deviceWidth/2,
        borderRadius: 10,
        overflow: 'hidden'
    },
    overlay: {
        height: 30,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        overflow: 'hidden',
        justifyContent: 'center',

    },
    headline: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
        fontFamily: 'VNFQuicksand'
    },
    cartBadge: {
        width: 25,
        height:25,
        right: 0,
        top: -10,
        position: 'absolute'
    }
};
