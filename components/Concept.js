import React	from 'react';
import { Icon }	from 'expo';
import {
	TouchableOpacity,
	StyleSheet,
	Text,
}				from 'react-native';

const Concept = ({ concept, speakWord }) => {
	const { name, translation, value } = concept;
	return(
		<TouchableOpacity style = { styles.textContainer } onPress = { () => speakWord(translation) }>
			<Text style = { styles.text }>
				{ name }{' '}
				<Text style = { styles.value }>{ (value * 100).toFixed(1) }%</Text>
				-{' '}{ translation }
			</Text>
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
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		marginBottom: 10,
		width: '100%',
	},
	value: {
		fontSize: 10,
	},
});

export default Concept;
