import React from 'react';

export class StartScreen extends React.Component {
	render() {
		return (
			<div className='modalBackground'>
				<div className='modal'>
					<b>Welcome</b>
					<p>This is the DickSpin game. You can spin dick by scroll or drag.</p>
					<p>You must reach 100 point of speed to win</p>
					<button onClick={this.props.onClick}>Let's celebrate and spin some dick</button>
				</div>
			</div>
		);
	}
}
