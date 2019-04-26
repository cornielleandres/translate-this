import React	from 'react';
import { Icon }	from 'expo';

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
