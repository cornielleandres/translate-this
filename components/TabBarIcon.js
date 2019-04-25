import React	from 'react';
import { Icon }	from 'expo';

import Colors	from '../constants/Colors.js';

const TabBarIcon = ({ name, focused }) => {
	return (
		<Icon.Ionicons
			name = { name }
			size = { 26 }
			style = { { marginBottom: -3 } }
			color = { focused ? Colors.tabIconSelected : Colors.tabIconDefault }
		/>
	);
};

export default TabBarIcon;
