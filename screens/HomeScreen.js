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
	Loading,
	MonoText,
	Translate,
}							from '../components/index.js';

export default class HomeScreen extends Component {
	state = {
		concepts: [],
		hasCameraPermission: null,
		image: null,
		language: 'es',
		loadingText: '',
		showTranslate: false,
	};

	clarifaiApp = null;
	cameraRef = null;
	cameraDirectory = FileSystem.cacheDirectory + 'Camera';

	render() {
		const {
			concepts,
			hasCameraPermission,
			image,
			language,
			loadingText,
			showTranslate,
		} = this.state;
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

					<CameraComp
						setCameraRef = { this._setCameraRef }
						showTranslate = { showTranslate }
						snap = { this._snapPic }
					/>

					{
						showTranslate &&
						<Translate
							bgImage = { this.cameraDirectory + '/' + image }
							concepts = { concepts }
							language = { language }
							loadingText = { loadingText }
							setLoadingText = { this._setLoadingText }
							toggleTranslate = { this._toggleTranslate }
						/>
					}

					{ loadingText !== '' && <Loading loadingText = { loadingText } /> }
				</View>
			);
		}
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

	_handleChangeLanguage = language => this.setState({ language });

	_setCameraRef = ref => this.cameraRef = ref;

	_setLoadingText = loadingText => Promise.resolve(this.setState({ loadingText }));

	_snapPic = () => {
		if (this.cameraRef) {
			return this._setLoadingText('Taking picture...')
				.then(async () => {
					const photo = await this.cameraRef.takePictureAsync({ base64: true });
					this.clarifaiApp.models.initModel({
						id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"
					})
					.then(generalModel => {
						return this._setLoadingText('Identifying picture...')
							.then(() => generalModel.predict(photo.base64));
					})
					.then(async response => {
						let concepts = response.outputs[0].data.concepts;
						const images = await FileSystem.readDirectoryAsync(this.cameraDirectory);
						concepts = concepts.map(concept => ({ name: concept.name }));
						this.setState({ image: images[0], concepts }, () => this._toggleTranslate());
					});
				})
				.then(() => this._setLoadingText(''));
		}
	};

	_toggleTranslate = () => {
		const { showTranslate } = this.state;
		if (showTranslate) this._deleteAllImages();
		this.setState({ showTranslate: !showTranslate });
	};
};

const styles = StyleSheet.create({
	homeScreenContainer: {
		flex: 1,
		backgroundColor: '#fff',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
	},
	header: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		marginTop: 30,
	},
	headerText: {
		fontSize: 17,
		color: 'black',
		lineHeight: 24,
		textAlign: 'center',
	},
});
