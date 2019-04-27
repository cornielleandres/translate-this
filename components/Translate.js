import React, { Component }	from 'react';
import { YANDEX_API_KEY }	from 'react-native-dotenv';
import {
	ImageBackground,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
}							from 'react-native';
import {
	Speech,
	WebBrowser,
}							from 'expo';

import CameraIcon			from './CameraIcon.js';
import Concept				from './Concept.js';

export default class Translate extends Component {
	state = { translatedConcepts: [], visible: false };
	render() {
		const { bgImage, toggleTranslate } = this.props;
		const { translatedConcepts, visible } = this.state;
		return(
			<Modal
				animationType = 'slide'
				onRequestClose = { () => {} }
				transparent = { false }
				visible = { visible }
			>
				<ImageBackground source = {{ uri: bgImage }} style = { styles.imgBckgrnd }>
					<View style = { styles.translations }>
						<View style = { styles.header }>
							<Text style = { styles.headerText }>Translations</Text>
							<TouchableOpacity style = { styles.closeBtn } onPress = { toggleTranslate }>
								<CameraIcon name = { 'cancel' } size = { 23 } />
							</TouchableOpacity>
						</View>

						<ScrollView
							style = { styles.concepts }
							contentContainerStyle = { styles.conceptsContent }
						>
							{
								translatedConcepts.map((concept, i) =>
									<Concept
										key = { i }
										concept = { concept }
										speakWord = { this._speakWord }
									/>
								)
							}
							<TouchableOpacity onPress = { this._handleGoToYandex }>
								<Text style = { styles.yandex }>Powered by Yandex</Text>
							</TouchableOpacity>
						</ScrollView>
					</View>
				</ImageBackground>
			</Modal>
		);
	};
	componentDidMount = () => {
		this._translateConcepts();
		this._toggleModal();
	};
	componentWillUnmount = () => this._toggleModal();
	_handleGoToYandex = () => WebBrowser.openBrowserAsync('http://translate.yandex.com/');
	_speakWord = word => Speech.speak(word, { language: this.props.language });
	_toggleModal = () => this.setState({ visible: !this.state.visible });
	_translateConcepts = async () => {
		const { concepts, language } = this.props;
		const translatedConcepts = [ ...concepts ];
		let response;
		let responseJson;
		try {
			for (let i = 0; i < concepts.length; i++) {
				response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${ YANDEX_API_KEY }&text=${ concepts[i].name }&lang=en-${ language }`);
				responseJson = await response.json();
				translatedConcepts[i].translation = responseJson.text[0];
			}
		} catch (err) { console.warn(err) }
		this.setState({ translatedConcepts });
	};
};

const styles = StyleSheet.create({
	concepts: {
		flex: 1,
		width: '100%',
		flexGrow: 6,
	},
	conceptsContent: {
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	closeBtn: {
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		borderRadius: 5,
		backgroundColor: 'rgba(200, 0, 0, 0.5)',
	},
	header: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	headerText: {
		flexGrow: 3,
		textAlign: 'center',
		fontSize: 24,
		color: 'white',
	},
	imgBckgrnd: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%',
		width: '100%',
	},
	translations: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		maxHeight: '50%',
		maxWidth: '75%',
		width: '75%',
		borderRadius: 5,
		padding: 10,
	},
	yandex: { color: 'white' },
});
