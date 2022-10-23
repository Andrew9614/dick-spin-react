import React from 'react';

export class Speedometer extends React.Component {
	render() {
		return (
			<div className='speedometer'>
				Speed: {this.props.speed}
			</div>
		);
	}
}

