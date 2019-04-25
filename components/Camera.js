import React, { Component }	from 'react';
import {
	Text,
	TouchableOpacity,
	View,
}							from 'react-native';
import { Camera }			from 'expo';

const auto = 'auto';
const off = 'off';
const on = 'on';
const torch = 'torch';

export default class CameraComp extends Component {
	state = {
		flashMode: Camera.Constants.FlashMode.auto,
		flashModeText: auto,
		type: Camera.Constants.Type.back,
		zoom: 0,
	};

	render() {
		const { flashMode, flashModeText, type, zoom } = this.state;
		const { _setCameraRef } = this.props;
		return(
			<Camera
				style = {{ flex: 1, height: 300 }}
				flashMode = { flashMode }
				type = { type }
				zoom = { zoom }
				ref = { ref => _setCameraRef(ref) }
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
						<Text style = {{ fontSize: 18, marginBottom: 10, color: 'white' }}>
							{' '}Flip{' '}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style = {{
						flex: 0.1,
						alignItems: 'center',
						}}
						onPress = { this._modifyZoom }
					>
						<Text style = {{ fontSize: 18, marginBottom: 10, color: 'white' }}>
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
						<Text style = {{ fontSize: 18, marginBottom: 10, color: 'white' }}>
							{' '}Flash: { flashModeText }{' '}
						</Text>
					</TouchableOpacity>
				</View>
			</Camera>
		);
	};

	_toggleFlashMode = () => {
		let flashMode;
		let flashModeText;
		switch(this.state.flashMode) {
			case Camera.Constants.FlashMode.auto:
				flashMode = Camera.Constants.FlashMode.on;
				flashModeText = on;
				break;
			case Camera.Constants.FlashMode.on:
				flashMode = Camera.Constants.FlashMode.off;
				flashModeText = off;
				break;
			case Camera.Constants.FlashMode.off:
				flashMode = Camera.Constants.FlashMode.torch;
				flashModeText = torch;
				break;
			default:
				flashMode = Camera.Constants.FlashMode.auto;
				flashModeText = auto;
		};
		this.setState({ flashMode, flashModeText });
	};

	_modifyZoom = () => this.setState({ zoom: this.state.zoom == 1 ? 0 : this.state.zoom + 0.25 });
};
