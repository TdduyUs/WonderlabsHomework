import React, {Component} from "react";
import {Text, View, AsyncStorage, Dimensions, ScrollView} from "react-native";

import {
	Container,
	Button,
	Header,
	Title,
	Body,
	Left,
	Right,
	Icon,
	Spinner,
	Content,
	Footer,
	FooterTab,
	Row,
	Col
} from "native-base";
import AutoHeightImage from 'react-native-auto-height-image';
import Modal from 'react-native-modalbox';

import customStyles from "./styles";
import styles from "./styles";
import {Global} from '../../config/global';

const deviceWidth = Dimensions.get('window').width;
const defaultImg = require("../../assets/images/default-img.png");

import {firebaseApp, Firebase} from '../../config/firebaseConfig';

let params = null

class ProductDetail extends Component {

	constructor(props) {
		super(props);

		params = this.props.navigation.state.params;

		this.state = {
			isLoading: true,
			product: null,
			variant_id: null,
			showFooter: true
		};

		this.dataRef = firebaseApp.database();

	}

	componentDidMount() {
		fetch(Global.API.getProductDetail + params.id, {
			method: "GET",
			headers: {
				'Accept': 'application/json',
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					'product': responseJson,
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
						<Button transparent onPress={() => this.props.navigation.openDrawer()}>
							<Icon name="menu" style={{color: 'black'}}/>
						</Button>
					</Left>
					<Body style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
					<Title style={styles.headerTitle}> {params.name}</Title>
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
						let img = null;
						let {product} = this.state
						if (!!product.images){
							img = {uri: product.images[0].src};
						}
						else
							img = defaultImg;
						const regex = /(<([^>]+)>)/ig;

						let that = this

						return (

							<View style={{flex: 1}}>
								<ScrollView>
									<AutoHeightImage
										width={deviceWidth}
										source={img}
									/>
									<View style={styles.productInfo}>
										<Text style={styles.productTitle}>{product.name}</Text>
										<Text style={styles.productDescription}>{product.description.replace(regex, '')}</Text>
										<View style={styles.variantsWrapper}>
											<Text style={styles.productTitle}>Variants Created</Text>
											{

											}
										</View>
									</View>
								</ScrollView>
								<Modal
									style={[styles.modal, styles.modal]}
									position={"bottom"}
									ref={"modal"}
									onClosed={this.onClose.bind(that)}
								>
									<Text style={styles.modalText}>BUY WAS TAPPED</Text>
									<Text>{this.state.variant_id}</Text>
									<Button style={styles.modalButtonClose} onPress={() => this.refs.modal.close()}>
										<Text style={styles.modalButtonCloseText}>CLOSE THIS MODAL</Text>
									</Button>
								</Modal>
							</View>
						);

					}
				})()}
				{
					this.state.showFooter && <Footer>
						<FooterTab style={styles.footerTab}>
							<Row>
								<Col size={2.5}>
									<Button vertical>
										<Icon name="more" style={styles.footerTabIcon} />
										<Text style={styles.footerTabTxt}>More</Text>
									</Button>
								</Col>
								<Col size={2.5}>
									<Button vertical>
										<Icon name="cart" style={styles.footerTabIcon} />
										<Text style={styles.footerTabTxt}>Cart</Text>
									</Button>
								</Col>
								<Col size={5}>
									<View style={styles.FooterBuyButton}>
										<Text style={styles.FooterBuyTxt} onPress={() => this.handleSubmit() }>BUY</Text>
									</View>
								</Col>
							</Row>
						</FooterTab>
					</Footer>
				}

			</Container>
		);
	}

	onClose() {
		this.setState({showFooter: true})
	}

	handleSubmit = () => {
		this.addItem(this.state.product.id);
		console.log('Item saved successfully');
	};

	addItem(product_id){
		let randomKey = this.dataRef.ref('/variant').push().key
		this.setState({variant_id: randomKey})
		this.dataRef.ref('/variant').push({
			product_id: product_id,
			datetime_created: Firebase.database.ServerValue.TIMESTAMP,
			variant_id: randomKey
		})

		this.setState({showFooter: false})
		setTimeout(function () {
			this.refs.modal.open()
		}.bind(this), 100);
	}
}


export default ProductDetail;
