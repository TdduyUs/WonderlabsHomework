import React, {Component} from "react";
import {Image, View, AsyncStorage, BackHandler, ListView, Dimensions} from "react-native";

import {
	Container,
	Button,
	H3,
	Text,
	Header,
	Title,
	Body,
	Left,
	Right,
	ListItem,
	Icon,
	Content,
	Badge,
	Spinner,
} from "native-base";

import customStyles from "./styles";
import styles from "./styles";
import {Global} from '../../config/global';

const deviceHeight = Dimensions.get('window').height;


class ProductDetail extends Component {

	constructor(props) {

		console.log("123");

		super(props);
		this.state = {
			isLoading: true,
			listProducts: []
		};

		this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
	}

	componentDidMount() {
		fetch(Global.API.getProductDetail, {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson.data);
				this.setState({
					'listProducts': responseJson.data,
					'isLoading': false,
				});
			})
			.catch((error) => {
				console.warn(error);
			});
	}

	componentWillMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
	}

	handleBackButtonClick() {
		this.props.navigation.goBack(null);
		return true;
	}

	render() {

		return (
			<Container>
				<Header iosBarStyle="light-content">
					<Left>
						<Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
							<Icon name="menu" style={{color: 'black'}}/>
						</Button>
					</Left>
					<Body style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
					<Title style={styles.headerTitle}> PRODUCTS</Title>
					</Body>
					<Right style={{flex: 0.5}}>

					</Right>
				</Header>

				{(() => {
					if (this.state.isLoading) {
						return (
							<View style={{flex: 1, justifyContent: 'center'}}>
								<Spinner/>
							</View>
						);
					}
					else {
						return (
							<View style={{backgroundColor: "#f2f2f2", marginBottom: 60}}>

							</View>
						);

					}
				})()}
			</Container>
		);
	}
}


export default ProductDetail;
