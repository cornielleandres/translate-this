import React, { Component }	from 'react';
import {
	Text,
	TouchableOpacity,
	View,
}							from 'react-native';
import { Camera }			from 'expo';

import CameraIcon			from './CameraIcon.js';

export default class CameraComp extends Component {
	state = {
		flashMode: Camera.Constants.FlashMode.auto,
		type: Camera.Constants.Type.back,
		zoom: 0,
	};

	render() {
		const { flashMode, type, zoom } = this.state;
		const { setCameraRef, snap } = this.props;
		return(
			<Camera
				style = { styles.flex }
				flashMode = { flashMode }
				type = { type }
				zoom = { zoom }
				ref = { ref => setCameraRef(ref) }
			>
				<View
					style = { [ styles.mainCameraView, styles.flex, styles.transparent ] }
				>
					<View>
						<TouchableOpacity style = { styles.icons } onPress = { this._zoomIn }>
							<CameraIcon name = { 'zoom-in' } size = { 32 } />
						</TouchableOpacity>

						<Text style = { styles.ZoomText }>
							{ zoom * 100 }%
						</Text>

						<TouchableOpacity style = { styles.icons } onPress = { this._zoomOut }>
							<CameraIcon name = { 'zoom-out' } size = { 32 } />
						</TouchableOpacity>
					</View>

					<View>
						<TouchableOpacity style = { styles.icons } onPress={ this._toggleCameraType }>
							<CameraIcon
								name = {
									type === Camera.Constants.Type.back ? 'camera-front' : 'camera-rear'
								}
								size = { 32 }
							/>
						</TouchableOpacity>
					</View>

					<View>
						<TouchableOpacity style = { styles.icons } onPress = { this._toggleFlashMode }>
							<CameraIcon
								name = {
									flashMode === Camera.Constants.FlashMode.auto ? 'flash-auto'
									: flashMode === Camera.Constants.FlashMode.on ? 'flash-on'
									: flashMode === Camera.Constants.FlashMode.off ? 'flash-off'
									: 'flare'
								}
								size = { 32 }
							/>
						</TouchableOpacity>
					</View>

					<View style = { styles.snap }>
						<TouchableOpacity style = { styles.icons } onPress = { snap }>
							<CameraIcon
								name = { 'photo-camera' }
								size = { 32 }
							/>
						</TouchableOpacity>
					</View>
				</View>
			</Camera>
		);
	};

	componentWillUnmount = () => setCameraRef(null);

	_toggleFlashMode = () => {
		let flashMode;
		switch(this.state.flashMode) {
			case Camera.Constants.FlashMode.auto:
				flashMode = Camera.Constants.FlashMode.on;
				break;
			case Camera.Constants.FlashMode.on:
				flashMode = Camera.Constants.FlashMode.off;
				break;
			case Camera.Constants.FlashMode.off:
				flashMode = Camera.Constants.FlashMode.torch;
				break;
			default:
				flashMode = Camera.Constants.FlashMode.auto;
		};
		this.setState({ flashMode });
	};

	_toggleCameraType = () => this.setState({
		type: this.state.type === Camera.Constants.Type.back
		? Camera.Constants.Type.front
		: Camera.Constants.Type.back,
	});

	_zoomIn = () => this.state.zoom !== 1 && this.setState({ zoom: this.state.zoom + 0.25 });
	_zoomOut = () => this.state.zoom !== 0 && this.setState({ zoom: this.state.zoom - 0.25 });
};

styles = {
	flex: { flex: 1 },
	icons: {
		paddingTop: 10,
		paddingRight: 24,
		paddingBottom: 10,
		paddingLeft: 24,
		borderRadius: 5,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	mainCameraView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	snap: {
		position: 'absolute',
		left: 0,
		right: 0,
		marginLeft: 'auto',
		marginRight: 'auto',
		bottom: 0,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	transparent: { backgroundColor: 'transparent' },
	ZoomText: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		fontSize: 18,
		color: 'white',
		textAlign: 'center',
	},
};
