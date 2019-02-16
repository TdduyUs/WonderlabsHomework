import React, {Component} from "react";
import {Text, View, AsyncStorage, Dimensions, ScrollView, TouchableOpacity} from "react-native";

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
			showFooter: true,
			variant_id_list: []
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
						<TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
							<Icon name="menu" style={{color: 'black'}}/>
						</TouchableOpacity>
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
												this.state.variant_id_list.length > 0 && this.state.variant_id_list.map((item, key) => {
													return (
														<Text style={styles.modalText} key={key}>{item}</Text>
													);
												})
											}
										</View>
									</View>
								</ScrollView>
								<Modal
									style={styles.modal}
									position={"bottom"}
									ref={"buyModal"}
									onClosed={this.onCloseBuyModal.bind(that)}
								>
									<Text style={styles.modalText}>BUY WAS TAPPED</Text>
									<Text>{this.state.variant_id}</Text>
									<Button style={styles.modalButtonClose} onPress={() => this.refs.buyModal.close()}>
										<Text style={styles.modalButtonCloseText}>CLOSE THIS MODAL</Text>
									</Button>
								</Modal>
								<Modal
									style={styles.modal}
									position={"bottom"}
									ref={"moreModal"}
									onClosed={this.onCloseMoreModal.bind(that)}
								>
									<Text style={styles.modalText}>MORE WAS TAPPED</Text>
									<Button style={styles.modalButtonClose} onPress={() => this.refs.moreModal.close()}>
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
									<Button vertical onPress={() => this.handleMoreModal()}>
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

	onCloseBuyModal() {
		this.setState({showFooter: true})
	}

	onCloseMoreModal() {
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

		this.setState({ variant_id_list: [...this.state.variant_id_list, randomKey] })

		this.showBottomFooter()
		setTimeout(function () {
			this.refs.buyModal.open()
		}.bind(this), 100);
	}

	handleMoreModal = () => {
		this.showBottomFooter()
		setTimeout(function () {
			this.refs.moreModal.open()
		}.bind(this), 100);
	};

	showBottomFooter(){
		this.setState({showFooter: false})
	}
}

export default ProductDetail;
