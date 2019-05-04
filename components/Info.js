import React, { Component } from 'react';
import {
	Animated,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
}							from 'react-native';
import { Constants }		from 'expo';

import PrivacyPolicy		from './PrivacyPolicy.js';
import SubHeader			from './SubHeader.js';

export default class Info extends Component {
	state = {
		showPrivacyPolicy: false,
		springAnim: new Animated.Value(50),
	};
	render() {
		const { toggleInfo } = this.props;
		const { showPrivacyPolicy, springAnim } = this.state;
		return(
			<View style = {[ styles.mainView, { paddingTop: Constants.statusBarHeight } ]}>
				<Animated.View
					style = {[ styles.infoView, { transform: [{ translateX: springAnim }] } ]}
				>
					<SubHeader
						headerText = { 'Info' }
						headerCloseFunc = { toggleInfo }
						textColor = { 'black' }
					/>

					<ScrollView
						style = { styles.info }
						contentContainerStyle = { styles.infoContents }
					>
						<View style = { styles.infoContent }>
							<Text>Developer:</Text>
							<Text>cornielleandres@gmail.com</Text>
						</View>

						<View style = { styles.infoContent }>
							<Text>Current Version:</Text>
							<Text>1.0.0</Text>
						</View>

						<View style = { styles.infoContent }>
							<Text>Content Rating:</Text>
							<Text>Everyone</Text>
						</View>

						<View style = { styles.infoContent }>
							<TouchableOpacity
								style = { styles.privacyWrapper }
								onPress = { this._togglePrivacyPolicy }
							>
								<Text style = { styles.privacy }>Privacy Policy</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</Animated.View>

				{
					showPrivacyPolicy &&
					<PrivacyPolicy togglePrivacyPolicy = { this._togglePrivacyPolicy } />
				}
			</View>
		);
	};

	componentDidMount() {
		Animated.spring(
			this.state.springAnim, // The value to drive
			{
				friction: 2, // Controls "bounciness"/overshoot. Default 7.
				toValue: 0, // Animate to final value of 1
			}
		).start(); // Start the animation
	};

	_togglePrivacyPolicy = () => this.setState({ showPrivacyPolicy: !this.state.showPrivacyPolicy });
};

const styles = StyleSheet.create({
	info: {
		flex: 1,
		width: '100%',
		flexGrow: 10,
	},
	infoContent: {
		width: '100%',
		borderBottomWidth: 1,
		padding: 10,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	infoContents: {
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	infoView: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		maxHeight: '95%',
		width: '95%',
		borderRadius: 5,
		borderWidth: 1,
		padding: 10,
	},
	mainView: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	privacy: {
		color: 'white',
		textAlign: 'center',
	},
	privacyWrapper: {
		width: '100%',
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 5,
	},
});
