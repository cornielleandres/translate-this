import React, { Component }	from 'react';
import {
	Animated,
	Image,
	Modal,
	StyleSheet,
	Text,
	View,
}							from 'react-native';

export default class Loading extends Component {
	state = { springAnim: new Animated.Value(0.3) };
	images = {
		'Identifying picture...': require('../assets/images/identifying_picture_loading.gif'),
		'Taking picture...': require('../assets/images/taking_picture_loading.gif'),
		'Translating...': require('../assets/images/translating_loading.gif'),
	};
	render() {
		const { loadingText } = this.props;
		const { springAnim } = this.state;
		return(
			<Modal
				animationType = 'fade'
				onRequestClose = { () => {} }
				transparent = { true }
				visible = { true }
			>
				<View style = { styles.mainView }>
					<Animated.View
						style = {[ styles.innerView, { transform: [{ scale: springAnim }] } ]}
					>
						<Text style = { styles.mainText }>{ loadingText }</Text>
						<Image source = { this.images[ loadingText ] } />
					</Animated.View>
				</View>
			</Modal>
		);
	};
	componentDidMount() {
		Animated.spring(
			this.state.springAnim, // The value to drive
			{
				friction: 3, // Controls "bounciness"/overshoot. Default 7.
				toValue: 1, // Animate to final value of 1
			}
		).start(); // Start the animation
	};
};

const styles = StyleSheet.create({
	innerView: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		borderRadius: 5,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	mainText: {
		paddingBottom: 10,
		color: 'white',
		borderRadius: 5,
	},
	mainView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
