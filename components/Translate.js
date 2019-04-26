import React, { Component }	from 'react';
import {
	ImageBackground,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
}							from 'react-native';

import CameraIcon			from './CameraIcon.js';
import Concept				from './Concept.js';

export default class Translate extends Component {
	state = { visible: false };
	render() {
		const { bgImage, concepts, toggleTranslate } = this.props;
		const { visible } = this.state;
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
							{ concepts.map((concept, i) => <Concept key = { i } concept = { concept } />) }
						</ScrollView>
					</View>
				</ImageBackground>
			</Modal>
		);
	};
	componentDidMount = () => this._toggleModal();
	componentWillUnmount = () => this._toggleModal();
	_toggleModal = () => this.setState({ visible: !this.state.visible });
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
});
