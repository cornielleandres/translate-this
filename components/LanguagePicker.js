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
			<Picker.Item label = 'Chinese' value = 'zh' />
			<Picker.Item label = 'Danish' value = 'da' />
			<Picker.Item label = 'Dutch' value = 'nl' />
			<Picker.Item label = 'Finnish' value = 'fi' />
			<Picker.Item label = 'French' value = 'fr' />
			<Picker.Item label = 'German' value = 'de' />
			<Picker.Item label = 'Italian' value = 'it' />
			<Picker.Item label = 'Japanese' value = 'ja' />
			<Picker.Item label = 'Korean' value = 'ko' />
			<Picker.Item label = 'Norwegian' value = 'no' />
			<Picker.Item label = 'Polish' value = 'pl' />
			<Picker.Item label = 'Portuguese' value = 'pt' />
			<Picker.Item label = 'Russian' value = 'ru' />
			<Picker.Item label = 'Spanish' value = 'es' />
			<Picker.Item label = 'Swedish' value = 'sv' />
		</Picker>
	);
};

const styles = StyleSheet.create({
	picker: { width: '50%' },
});

export default LanguagePicker;
