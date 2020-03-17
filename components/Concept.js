import React	from 'react';
import * as Icon from '@expo/vector-icons';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
}				from 'react-native';

const Concept = ({ concept, disableConcepts, speakWord }) => {
	const { name, translation } = concept;
	return(
		<TouchableOpacity
			style = { styles.textContainer }
			onPress = { () => speakWord(translation) }
			disabled = { disableConcepts }
		>
			<Text style = { styles.text }>{ name }</Text>
			<Icon.MaterialIcons
				name = { 'arrow-forward' }
				size = { 18 }
				color = { 'white' }
			/>
			<Text style = { styles.text }>{ translation }</Text>
			<Icon.MaterialIcons
				name = { 'hearing' }
				size = { 18 }
				color = { 'white' }
			/>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 18,
		color: 'white',
	},
	textContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		marginBottom: 10,
		width: '100%',
	},
});

export default Concept;
