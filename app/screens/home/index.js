import React, {Component} from "react";
import {View, FlatList, TouchableOpacity} from "react-native";

import {
	Container,
	Header,
	Title,
	Body,
	Left,
	Right,
	Icon,
	Spinner,
} from "native-base";

import styles from "./styles";
import {Global} from '../../config/global';
import ItemCard from './ItemCard';

class Home extends Component {

	constructor(props) {

		super(props);
		this.state = {
			isLoading: true,
			listProducts: [],
			variant_id_list: []
		};
	}

	componentDidMount() {
		fetch(Global.API.getProductsList, {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					'listProducts': responseJson,
					'isLoading': false,
				});
			})
			.catch((error) => {
				console.warn(error);
			});
	}

	render() {

		return (
			<Container style={styles.mainContainer}>
				<Header style={{backgroundColor: "#ffffff"}}>
					<Left>
						<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
							<Icon name="ios-menu" style={{color: 'black'}}/>
						</TouchableOpacity>
					</Left>
					<Body style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
					<Title style={styles.headerTitle}> List of Product</Title>
					</Body>
					<Right style={{flex: 0.5}}>
						<Icon name="cart" style={{marginRight: 10}}/>
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
							<View>
								<FlatList
									numColumns={2}
									style={ styles.homeList}
									data={this.state.listProducts}
									keyExtractor={item => String(item.id)}
									onEndReachedThreshold={0.5}
									renderItem={({ item, index }) =>
										<ItemCard
											key={index}
											_clickItem={() => this.props.navigation.navigate("ProductDetail", { id: item.id, name: item.name })}
											item={item} />
									} />

							</View>
						);

					}
				})()}
			</Container>
		);
	}
}

export default Home;
