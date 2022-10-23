import React from 'react';
import { Balls } from './Balls';
import { Dick } from './Dick';
import './index.css';
import { rotation, calcAngle, cleanAngle, toDeg } from './tools';
import { Speedometer } from './Speedometer';
import { StartScreen } from "./StartScreen";
import { WinScreen } from "./WinScreen";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			widthToHeight: window.innerWidth / window.innerHeight,
			dickCatch: false,
			startScreenOn:  true,
			win: false,
			penis: {
				phi: 0,
				v: 0,
				a: 0
			},
			shake: {
				dx: 0,
				dy: 0
			}
		}
	}

	updateWidthToHeight = () => this.setState({ widthToHeight: window.innerWidth / window.innerHeight });
	tempPenis = {};

	rotate = () => {
		if (this.state.dickCatch) return;
		const scoreToWin = 100;
		const shake = this.state.shake;
		Object.assign(this.tempPenis, rotation(this.state.penis));

		if (Math.abs(this.tempPenis.v) >= scoreToWin) {
			this.setState({
				win: true
			});
		}

		if (Math.abs(this.tempPenis.v) >= 30) {
			let rand = 1;
			let speed = Math.abs(Math.round(this.tempPenis.v))
			if (Math.random() > 0.5) {
				rand = 1;
			} else rand = -1;
			shake.dx = Math.random() * rand * speed ** (2.2 * Math.random()) / 10000;
			shake.dy = Math.random() * rand * speed ** (2.2 * Math.random()) / 10000;
		} else {
			shake.dx = 0;
			shake.dy = 0;
		}

		this.setState({
			penis: this.tempPenis
		});
	}

	handleClickStartScreen = () => {
		this.setState({
			startScreenOn: false
		});
	}

	handleClickWinScreen = () => {
		this.setState({
			win: false,
		});
		this.tempPenis.phi = 0;
		this.tempPenis.v = 0;
	}

	handleMouseWheel = (e) => {
		if (this.state.startScreenOn && !this.state.win) return;
		const factor = 0.02;
		this.tempPenis.v += e.deltaY * factor;
	}

	handlePointerDown = (e) => {
		if (this.startScreenOn) return;
		e.preventDefault();
		const penis = this.state.penis;
		penis.v = 0;
		const ballsCenter = this.state.ballsCenter;
		const centerY = ballsCenter.top + window.pageYOffset + ballsCenter.height / 2;
		const centerX = ballsCenter.left + window.pageXOffset + ballsCenter.width / 2;
		penis.phi = calcAngle(e.pageX, e.pageY, centerX, centerY)
		this.setState({
			penis: penis,
			dickCatch: true
		});
		let prevTime = Date.now();
		let prevPhi = penis.phi;
		let time = 0;

		const move = (e) => {
			prevPhi = penis.phi;
			time = Date.now() - prevTime;
			prevTime = Date.now();
			penis.phi = calcAngle(e.pageX, e.pageY, centerX, centerY);
			this.setState({
				penis: penis
			});
		}

		const up = (e) => {
			const factor = 50;
			document.removeEventListener("pointermove", move);
			penis.v = cleanAngle(toDeg(prevPhi), toDeg(penis.phi)) * factor / time;
			if (isNaN(penis.v)) penis.v = 0;
			document.removeEventListener("pointerup", up);
			this.setState({
				penis: penis,
				dickCatch: false
			});
		}
		document.addEventListener("pointermove", move);
		document.addEventListener("pointerup", up);
	}

	componentDidMount() {
		this.setState({
			ballsCenter: document.querySelector(".balls").getBoundingClientRect()
		});
		window.addEventListener('resize', this.updateWidthToHeight);
		document.addEventListener('wheel', this.handleMouseWheel);
		this.renderInterval = setInterval(this.rotate, 1000 / 60);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWidthToHeight);
		document.removeEventListener('wheel', this.handleMouseWheel);
		clearInterval(this.renderInterval);
	}


	render() {
		return (
			<div
				onContextMenu={(e) => e.preventDefault()}
			>
				<Speedometer speed={Math.abs(Math.round(this.state.penis.v))} />
				{this.state.startScreenOn &&
					<StartScreen
						onClick={this.handleClickStartScreen}
					/>}
				{this.state.win &&
					<WinScreen
						onClick={this.handleClickWinScreen}
					/>}
				<div
					className={this.state.widthToHeight > 1 ? 'container' : 'container mob'}

					style={{
						top: 50 + this.state.shake.dx + "%",
						left: 50 + this.state.shake.dy + "%"
					}}>
					<Dick
						angle={toDeg(this.state.penis.phi)}
						onPointerDown={this.handlePointerDown}
					/>
					<Balls />
				</div>
			</div>
		);
	}
}

export default App;