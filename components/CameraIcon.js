import React	from 'react';
import * as Icon from '@expo/vector-icons';

const CameraIcon = ({ name, size }) => {
	return (
		<Icon.MaterialIcons
			name = { name }
			size = { size }
			color = { 'white' }
		/>
	);
};

export default CameraIcon;
