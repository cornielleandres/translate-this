import React, { Component }	from 'react';
import {
	Platform,
	StatusBar,
	StyleSheet,
	View,
}							from 'react-native';
import { AppLoading } from 'expo';

import * as Icon from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

import { HomeScreen } from './screens/index.js';

export default class App extends Component {
	state = { isLoadingComplete: false };

	render() {
		if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
			return (
				<AppLoading
					startAsync = { this._loadResourcesAsync }
					onError = { this._handleLoadingError }
					onFinish = { this._handleFinishLoading }
				/>
			);
		} else {
			return (
				<View style = { styles.container }>
					{ Platform.OS === 'ios' && <StatusBar barStyle = 'default' /> }
					<HomeScreen />
				</View>
			);
		}
	};

	_loadResourcesAsync = async () => {
		return Promise.all([
			Asset.loadAsync([
				require('./assets/images/identifying_picture_loading.gif'),
				require('./assets/images/taking_picture_loading.gif'),
				require('./assets/images/translating_loading.gif'),
			]),
			Font.loadAsync({
				...Icon.MaterialIcons.font,
				'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
			}),
		]);
	};

	_handleLoadingError = error => {
		// In this case, you might want to report the error to your error
		// reporting service, for example Sentry
		console.warn(error);
	};

	_handleFinishLoading = () => this.setState({ isLoadingComplete: true });
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
