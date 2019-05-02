import React	from 'react';
import {
	Image,
	Modal,
	StyleSheet,
	Text,
	View,
}				from 'react-native';

const Loading = ({ loadingText }) => {
	const images = {
		'Identifying picture...': require('../assets/images/identifying_picture_loading.gif'),
		'Taking picture...': require('../assets/images/taking_picture_loading.gif'),
		'Translating...': require('../assets/images/translating_loading.gif'),
	};
	return(
		<Modal
			animationType = 'fade'
			onRequestClose = { () => {} }
			transparent = { true }
			visible = { true }
		>
			<View style = { styles.mainView }>
				<Text style = { styles.mainText }>{ loadingText }</Text>

				<Image source = { images[loadingText] } />
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	mainText: {
		padding: 10,
		color: 'white',
		borderRadius: 5,
	},
	mainView: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Loading;
