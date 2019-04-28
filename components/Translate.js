import React, { Component }	from 'react';
import {
	VOICERSS_API_KEY,
	YANDEX_API_KEY
}							from 'react-native-dotenv';
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
	Audio,
	WebBrowser,
}							from 'expo';

import CameraIcon			from './CameraIcon.js';
import Concept				from './Concept.js';

export default class Translate extends Component {
	state = { disableConcepts: false, translatedConcepts: [], visible: false };
	soundObject = null;
	render() {
		const { bgImage, toggleTranslate } = this.props;
		const { disableConcepts, translatedConcepts, visible } = this.state;
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
										disableConcepts = { disableConcepts }
										speakWord = { this._speakWord }
									/>
								)
							}

							<TouchableOpacity onPress = { this._handleGoToYandex }>
								<Text style = { styles.yandex }>Translations Powered by Yandex</Text>
							</TouchableOpacity>
						</ScrollView>
					</View>
				</ImageBackground>
			</Modal>
		);
	};
	componentDidMount = () => {
		this.soundObject = new Audio.Sound();
		this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
		this._translateConcepts();
		this._toggleModal();
	};
	componentWillUnmount = () => this._toggleModal();
	_getVoiceLanguage = () => {
		switch(this.props.language) {
			case 'da': return 'da-dk';
			case 'de': return 'de-de';
			case 'es': return 'es-mx';
			case 'fi': return 'fi-fi';
			case 'fr': return 'fr-fr';
			case 'it': return 'it-it';
			case 'ja': return 'ja-jp';
			case 'ko': return 'ko-kr';
			case 'nl': return 'nl-nl';
			case 'no': return 'nb-no';
			case 'pl': return 'pl-pl';
			case 'pt': return 'pt-pt';
			case 'ru': return 'ru-ru';
			case 'sv': return 'sv-se';
			case 'zh': return 'zh-cn';
			default: return 'en-us';
		}
	};
	_handleGoToYandex = () => WebBrowser.openBrowserAsync('http://translate.yandex.com/');
	_onPlaybackStatusUpdate = async playbackStatus => {
		if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
			await this.soundObject.unloadAsync();
		}
	};
	_speakWord = word => {
		this.setState({ disableConcepts: true }, async () => {
			const language = this._getVoiceLanguage();
			let response;
			try {
				response = await fetch(`https://api.voicerss.org/?key=${ VOICERSS_API_KEY }&hl=${ language }&f=16khz_16bit_mono&b64=true&src=${ word }`);
			} catch (err) { console.warn(err); this.setState({ disableConcepts: false }); }
			try {
				await this.soundObject.loadAsync({ uri: response._bodyText });
				await this.soundObject.playAsync();
			} catch (err) { console.warn(err); this.setState({ disableConcepts: false }); }
			this.setState({ disableConcepts: false });
		});
	};
	_toggleModal = () => this.setState({ visible: !this.state.visible });
	_translateConcepts = async () => {
		const { concepts, language } = this.props;
		const translatedConcepts = [];
		let response;
		let responseJson;
		try {
			for (let i = 0; i < concepts.length; i++) {
				if (concepts[i].name !== 'no person') {
					response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${ YANDEX_API_KEY }&text=${ concepts[i].name }&lang=en-${ language }`);
					responseJson = await response.json();
					translatedConcepts[i] = {
						name: concepts[i].name,
						translation: responseJson.text[0],
					};
				}
			}
		} catch (err) { console.warn(err); }
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
		maxHeight: '75%',
		width: '90%',
		borderRadius: 5,
		padding: 10,
	},
	yandex: { color: 'white' },
});
