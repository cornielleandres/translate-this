import React	from 'react';
import {
	Picker,
	StyleSheet,
}				from 'react-native';

const LanguagePicker = ({ language, handleChangeLanguage }) => {
	return(
		<Picker
			selectedValue = { language }
			style = { styles.picker }
			onValueChange = { language => handleChangeLanguage(language) }
		>
			<Picker.Item label = 'Czech' value = 'cs' />
			<Picker.Item label = 'Dutch' value = 'nl' />
			<Picker.Item label = 'French' value = 'fr' />
			<Picker.Item label = 'German' value = 'de' />
			<Picker.Item label = 'Italian' value = 'it' />
			<Picker.Item label = 'Polish' value = 'pl' />
			<Picker.Item label = 'Spanish' value = 'es' />
		</Picker>
	);
};

const styles = StyleSheet.create({
	picker: { width: '50%' },
});

export default LanguagePicker;
