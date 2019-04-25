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
	Camera,
	FileSystem,
	Permissions,
}							from 'expo';
import { MonoText }			from '../components/StyledText';

export default class HomeScreen extends Component {
	state = {
		flashMode: Camera.Constants.FlashMode.auto,
		flashModeText: 'auto',
		hasCameraPermission: null,
		images: null,
		type: Camera.Constants.Type.back,
		zoom: 0,
	};

	cameraDirectory = FileSystem.cacheDirectory + 'Camera';

	render() {
		const { flashMode, flashModeText, hasCameraPermission, images, type, zoom } = this.state;
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

						<Camera
							style = {{ flex: 1, height: 300 }}
							flashMode = { flashMode }
							type = { type }
							zoom = { zoom }
							ref = { ref => this.camera = ref }
						>
							<View
								style = {{
									flex: 1,
									backgroundColor: 'transparent',
									flexDirection: 'row',
								}}
							>
								<TouchableOpacity
									style = {{
									flex: 0.1,
									alignSelf: 'flex-end',
									alignItems: 'center',
									}}
									onPress={ () => this.setState({
											type: type === Camera.Constants.Type.back
											? Camera.Constants.Type.front
											: Camera.Constants.Type.back,
										})
									}
								>
									<Text
										style = {{ fontSize: 18, marginBottom: 10, color: 'white' }}
									>
										{' '}Flip{' '}
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style = {{
									flex: 0.1,
									// alignSelf: 'flex-start',
									alignItems: 'center',
									}}
									onPress = { this._modifyZoom }
								>
									<Text
										style = {{ fontSize: 18, marginBottom: 10, color: 'white' }}
									>
										{' '}Zoom: { zoom * 100 }%{' '}
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									style = {{
									flex: 0.1,
									alignSelf: 'flex-start',
									alignItems: 'center',
									}}
									onPress = { this._toggleFlashMode }
								>
									<Text
										style = {{ fontSize: 18, marginBottom: 10, color: 'white' }}
									>
										{' '}Flash: { flashModeText }{' '}
									</Text>
								</TouchableOpacity>
							</View>
						</Camera>
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

	_toggleFlashMode = () => {
		let flashMode;
		let flashModeText;
		switch(this.state.flashMode) {
			case Camera.Constants.FlashMode.auto:
				flashMode = Camera.Constants.FlashMode.on;
				flashModeText = 'on';
				break;
			case Camera.Constants.FlashMode.on:
				flashMode = Camera.Constants.FlashMode.off;
				flashModeText = 'off';
				break;
			case Camera.Constants.FlashMode.off:
				flashMode = Camera.Constants.FlashMode.torch;
				flashModeText = 'torch';
				break;
			default:
				flashMode = Camera.Constants.FlashMode.auto;
				flashModeText = 'auto';
		};
		this.setState({ flashMode, flashModeText });
	};

	_modifyZoom = () => this.setState({ zoom: this.state.zoom == 1 ? 0 : this.state.zoom + 0.25 });

	_snap = async () => {
		if (this.camera) {
			const photo = await this.camera.takePictureAsync();
			const images = await FileSystem.readDirectoryAsync(this.cameraDirectory);
			this.setState({ images });
		}
	};

	_handleDeleteImage = async i => {
		await FileSystem.deleteAsync(this.cameraDirectory + '/' + this.state.images[i]);
		const dir = await FileSystem.readDirectoryAsync(this.cameraDirectory);
		this.setState({ images: dir });
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
