import React, { Component }	from 'react';
import {
	YANDEX_API_KEY
}												from 'react-native-dotenv';
import {
	Animated,
	ImageBackground,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
}												from 'react-native';
import * as WebBrowser	from 'expo-web-browser';
import * as Speech 			from 'expo-speech';
import Constants 				from 'expo-constants';
import Concept					from './Concept.js';
import SubHeader				from './SubHeader.js';

export default class Translate extends Component {
	state = {
		disableConcepts: false,
		springAnim: new Animated.Value(50),
		translatedConcepts: [],
		visible: false,
	};
	render() {
		const { bgImage, toggleTranslate } = this.props;
		const { disableConcepts, springAnim, translatedConcepts, visible } = this.state;
		return(
			<View style = {[ styles.mainView, { paddingTop: Constants.statusBarHeight } ]}>
				<ImageBackground source = {{ uri: bgImage }} style = { styles.imgBckgrnd }>
					{
						visible &&
						<Animated.View
							style = {[ styles.translations, { transform: [{ translateX: springAnim }] } ]}
						>
							<SubHeader
								headerText = { 'Translations' }
								headerCloseFunc = { toggleTranslate }
								textColor = { 'white' }
							/>

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
						</Animated.View>
					}
				</ImageBackground>
			</View>
		);
	};
	componentDidMount = () => {
		return this.props.setLoadingText('Translating...')
			.then(async () => {
				this._translateConcepts()
					.then(() => this.props.setLoadingText(''))
					.then(() => {
						Animated.spring(
							this.state.springAnim, // The value to drive
							{
								friction: 2, // Controls "bounciness"/overshoot. Default 7.
								toValue: 0, // Animate to final value of 0
							}
						).start(); // Start the animation
						this._toggleModal();
					});
			});
	};
	_handleGoToYandex = () => WebBrowser.openBrowserAsync('http://translate.yandex.com/');
	_speakWord = word => {
		this.setState({ disableConcepts: true }, async () => {
			try {
				Speech.speak(word, { language: this.props.language });
			} catch (err) { console.warn(err); this.setState({ disableConcepts: false }); }
			this.setState({ disableConcepts: false });
		});
	};
	_toggleModal = () => this.setState({ visible: !this.state.visible });
	_translateConcepts = async () => {
		const { concepts, language } = this.props;
		const translatedConcepts = [];
		try {
			for (let i = 0; i < concepts.length; i++) {
				if (concepts[i].name !== 'no person') {
					const response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${ YANDEX_API_KEY }&text=${ concepts[i].name }&lang=en-${ language }`);
					const responseJson = await response.json();
					translatedConcepts[i] = {
						name: concepts[i].name,
						translation: responseJson.text[0],
					};
				}
			}
		} catch (err) { console.warn(err); }
		this.setState({ translatedConcepts });
	};
}

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
	imgBckgrnd: {
		width: '100%',
		height: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mainView: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
	translations: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		maxHeight: '75%',
		width: '95%',
		borderRadius: 5,
		padding: 10,
	},
	yandex: { color: 'white' },
});
