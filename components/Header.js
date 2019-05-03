import React			from 'react';
import {
	StyleSheet,
	View,
}						from 'react-native';

import { MonoText }		from './StyledText.js';
import LanguagePicker	from './LanguagePicker.js';

const Header = ({ handleChangeLanguage, language }) => {
	return(
		<View style = { styles.header }>
			<MonoText style = { styles.headerText }>Translate This!</MonoText>
			<LanguagePicker
				language = { language }
				handleChangeLanguage = { handleChangeLanguage }
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 10,
		marginTop: 30,
	},
	headerText: {
		fontSize: 17,
		color: 'black',
		lineHeight: 24,
		textAlign: 'center',
	},
});

export default Header;
