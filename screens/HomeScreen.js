import React, { Component }	from 'react';
import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	View,
}							from 'react-native';
import {
	FileSystem,
	Permissions,
}							from 'expo';
import {
	CameraComp,
	MonoText,
}							from '../components/index.js';

export default class HomeScreen extends Component {
	state = {
		hasCameraPermission: null,
		images: [],
	};

	cameraRef = null;
	_setCameraRef = ref => this.cameraRef = ref;
	cameraDirectory = FileSystem.cacheDirectory + 'Camera';

	render() {
		const { hasCameraPermission, images } = this.state;
		if (hasCameraPermission === null) {
			return <Text>You need to give camera permissions in order to use this app</Text>;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			return(
				<View style = { styles.container }>
					<ScrollView
						style = { styles.container }
						contentContainerStyle = { styles.contentContainer }
					>
						<View style = { styles.headerContainer }>
							<MonoText style = { styles.headerText }>Translate This!</MonoText>
						</View>

						<CameraComp _setCameraRef = { this._setCameraRef } />

						<TouchableOpacity
							onPress = { this._snap }
							style = { styles.helpLink }
						>
							<Text style = { styles.helpLinkText }>Snap</Text>
						</TouchableOpacity>
						<View style = { styles.mainImageContainer }>
							{
								images.map((image, i) =>
									<TouchableHighlight
										key = { i }
										onPress = { () => this._handleDeleteImage(i) }
									>
										<Image
											style = { styles.mainImage }
											source = {{
												uri: this.cameraDirectory + '/' + image,
												width: 100,
												height: 100,
											}}
										/>
									</TouchableHighlight>
								)
							}
						</View>
					</ScrollView>
				</View>
			);
		};
	};

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		const images = await FileSystem.readDirectoryAsync(this.cameraDirectory);
		this.setState({ hasCameraPermission: status === 'granted', images });
	};

	_snap = async () => {
		if (this.cameraRef) {
			const photo = await this.cameraRef.takePictureAsync();
			const images = await FileSystem.readDirectoryAsync(this.cameraDirectory);
			this.setState({ images });
		}
	};

	_handleDeleteImage = async i => {
		await FileSystem.deleteAsync(this.cameraDirectory + '/' + this.state.images[i]);
		const images = await FileSystem.readDirectoryAsync(this.cameraDirectory);
		this.setState({ images });
	};
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	contentContainer: {
		paddingTop: 30,
	},
	mainImageContainer: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	mainImage: {
		width: 100,
		height: 80,
		resizeMode: 'contain',
		marginTop: 3,
	},
	headerContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	headerText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
		textAlign: 'center',
	},
	helpContainer: {
		marginTop: 15,
		alignItems: 'center',
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
});
