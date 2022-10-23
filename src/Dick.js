import React from 'react';

export class Dick extends React.Component {
	render() {
		return (
			<img
				src={process.env.PUBLIC_URL + './img/dick.png'}
				alt='dick'
				className='dick'
				style={{ transform: 'translate(-50%, -50%) rotateZ(' + this.props.angle + 'deg)' }}
				onPointerDown={this.props.onPointerDown}
			/>
		);
	}
}
