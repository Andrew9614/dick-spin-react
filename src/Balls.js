import React from 'react';

export class Balls extends React.Component {
	render() {
		return (
			<img
				src={process.env.PUBLIC_URL + './img/balls.png'}
				alt='balls'
				className='balls' />
		);
	}
}
