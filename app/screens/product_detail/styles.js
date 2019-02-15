const React = require("react-native");

const txtColor = '#AAAAAA'

export default {
    headerTitle:{
        color: '#030303'
    },
    productInfo:{
        padding: 15,
        backgroundColor: '#fff',
    },
    productTitle:{
        color: txtColor,
        fontSize: 17,
    },
    productDescription:{
        color: txtColor,
        fontSize: 14
    },
    footerTab:{
        backgroundColor: '#CCCCCC',
        color: '#fff'
    },
    footerTabTxt:{
        color: '#fff'
    },
    footerTabIcon:{
        color: '#fff'
    },
    FooterBuyButton:{
        flex: 1,
        backgroundColor: '#B4226C',
        justifyContent: 'center',
        alignItems: 'center'
    },
    FooterBuyTxt:{
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    variantsWrapper:{
        padding: 15,
        borderWidth: 1,
        borderBottomColor: txtColor,
        flex: 1
    },
    modal:{
        height: 300,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: 'center',
        padding: 10,
        zIndex: 9999
    },
    modalText:{
        fontWeight: 'bold'
    },
    modalButtonClose:{
        height: 70,
        position: 'absolute',
        top: 220,
        left: 60,
        right: 60,
        borderRadius: 10,
        backgroundColor: '#D0021B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonCloseText:{
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    }

};
