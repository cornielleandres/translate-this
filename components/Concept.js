import React	from 'react';
import {
	StyleSheet,
	Text
}				from 'react-native';

const Concept = ({ concept }) => {
	const { name, value } = concept;
	return <Text style = { styles.text }>{ name } { (value * 100).toFixed(2) }%</Text>;
};

const styles = StyleSheet.create({
	text: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		marginBottom: 10,
		fontSize: 18,
		width: '100%',
		color: 'white',
	},
});

export default Concept;
