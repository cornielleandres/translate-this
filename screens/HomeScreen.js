import React, { Component }	from 'react';
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
}							from 'react-native';
import { WebBrowser }		from 'expo';
import { MonoText }			from '../components/StyledText';

export default class HomeScreen extends Component {
	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<View style = { styles.container }>
				<ScrollView
					style = { styles.container }
					contentContainerStyle = { styles.contentContainer }
				>
					<View style = { styles.mainImageContainer }>
						<Image
							source = { require('../assets/images/icon.png') }
							style = { styles.mainImage }
						/>
					</View>

					<View style = { styles.headerContainer }>
						<MonoText style = { styles.headerText }>Translate This!</MonoText>
					</View>

					<View style = { styles.helpContainer }>
						<TouchableOpacity onPress = { this._handleHelpPress } style = { styles.helpLink }>
							<Text style = { styles.helpLinkText }>Help me!</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	};

	_handleHelpPress = () => {
		WebBrowser.openBrowserAsync(
			'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
		);
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
