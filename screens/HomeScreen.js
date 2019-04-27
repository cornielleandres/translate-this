import React, { Component }	from 'react';
import Clarifai				from 'clarifai';
import { CLARIFAI_APP_KEY }	from 'react-native-dotenv';
import {
	StyleSheet,
	Text,
	View,
}							from 'react-native';
import {
	FileSystem,
	Permissions,
}							from 'expo';

import {
	CameraComp,
	LanguagePicker,
	MonoText,
	Translate,
}							from '../components/index.js';

export default class HomeScreen extends Component {
	state = {
		concepts: [],
		// concepts: [
		// 	{ name: 'one', value: .99 },
		// 	{ name: 'two', value: .9766 },
		// 	{ name: 'three', value: .9766 },
		// 	{ name: 'house', value: .9766 },
		// 	{ name: 'dog', value: .9766 },
		// 	{ name: 'cat', value: .9766 },
		// 	{ name: 'pair', value: .9766 },
		// 	{ name: 'dice', value: .9766 },
		// ],










		hasCameraPermission: null,
		image: null,
		// image: 'https://cdn.pixabay.com/photo/2017/02/17/23/15/duiker-island-2076042__340.jpg',





		language: 'fr',





		showTranslate: false,
	};

	clarifaiApp = null;
	cameraRef = null;
	cameraDirectory = FileSystem.cacheDirectory + 'Camera';

	render() {
		const { concepts, hasCameraPermission, image, language, showTranslate } = this.state;
		if (hasCameraPermission === null) {
			return(
				<View style = { styles.homeScreenContainer }>
					<Text>You need to give camera permissions in order to use this app.</Text>
				</View>
			);
		} else if (hasCameraPermission === false) {
			return(
				<View style = { styles.homeScreenContainer }>
					<Text>No access to camera</Text>
				</View>
			);
		} else {
			return(
				<View style = { styles.homeScreenContainer }>
					<View style = { styles.header }>
						<MonoText style = { styles.headerText }>Translate This!</MonoText>
						<LanguagePicker
							language = { language }
							handleChangeLanguage = { this._handleChangeLanguage }
						/>
					</View>

					<CameraComp setCameraRef = { this._setCameraRef } snap = { this._snap } />

					{
						showTranslate &&
						// !showTranslate &&












						<Translate
							bgImage = { this.cameraDirectory + '/' + image }
							// bgImage = { image }















							concepts = { concepts }
							language = { language }
							toggleTranslate = { this._toggleTranslate }
						/>
					}
				</View>
			);
		};
	};

	componentDidMount = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.clarifaiApp = new Clarifai.App({ apiKey: CLARIFAI_APP_KEY });
		this._deleteAllImages();
		this.setState({ hasCameraPermission: status === 'granted' });
	};

	_deleteAllImages = async () => {
		const images = await FileSystem.readDirectoryAsync(this.cameraDirectory);
		images.forEach(async image => await FileSystem.deleteAsync(this.cameraDirectory + '/' + image));
	};

	_deleteRecentImage = async () => {
		await FileSystem.deleteAsync(this.cameraDirectory + '/' + this.state.image);
		this.setState({ image: null });
	};

	_handleChangeLanguage = language => this.setState({ language });

	_setCameraRef = ref => this.cameraRef = ref;

	_snap = async () => {
		if (this.cameraRef) {
			const photo = await this.cameraRef.takePictureAsync({ base64: true });
			return this.clarifaiApp.models.initModel({
				id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"
			})
			.then(generalModel => generalModel.predict(photo.base64))
			.then(async response => {
				let concepts = response.outputs[0].data.concepts;
				const images = await FileSystem.readDirectoryAsync(this.cameraDirectory);
				concepts = concepts.map(concept => ({ name: concept.name, value: concept.value }));
				return this.setState({ image: images[0], concepts }, () => this._toggleTranslate());
			});
		}
	};

	_toggleTranslate = () => {
		const { showTranslate } = this.state;
		if (showTranslate) this._deleteRecentImage();
		this.setState({ showTranslate: !showTranslate });
	};
};

const styles = StyleSheet.create({
	homeScreenContainer: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 30,
	},
	header: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
	},
	headerText: {
		fontSize: 17,
		color: 'black',
		lineHeight: 24,
		textAlign: 'center',
	},
});
