import React from 'react';

export class WinScreen extends React.Component {
	render() {
		return (
			<div className='modalBackground winModalBackground'>
				<div className='modal'>
					<b>Win</b>
					<p>Great! You're real dickspiner.</p>
					<button onClick={this.props.onClick}>Try again.</button>
				</div>
			</div>
		);
	}
}
