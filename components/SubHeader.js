import React		from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
}					from 'react-native';

import CameraIcon	from './CameraIcon.js';

const SubHeader = ({ headerText, headerCloseFunc, textColor }) => {
	return(
		<View style = { styles.header }>
			<Text style = {[ styles.headerText, { color: textColor } ]}>{ headerText }</Text>
			
			<View style = { styles.closeBtnView }>
				<TouchableOpacity style = { styles.closeBtn } onPress = { headerCloseFunc }>
					<CameraIcon name = { 'cancel' } size = { 23 } />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	closeBtn: {
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		borderRadius: 5,
		backgroundColor: 'rgb(200, 0, 0)',
	},
	closeBtnView: {
		position: 'absolute',
		right: 0,
		top: 0,
		bottom: 0,
		marginTop: 'auto',
		marginBottom: 'auto',
	},
	header: {
		width: '100%',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
	},
	headerText: {
		textAlign: 'center',
		fontSize: 24,
	},
});

export default SubHeader;
