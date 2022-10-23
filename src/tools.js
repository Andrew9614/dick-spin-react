export function rotation(penis) {
	const L = 200;
	const dt = 1 / 60;
	const g = 5500;
	const y = 0.01;
	penis.a = -(g / L) * Math.sin(penis.phi);
	penis.v += penis.a * dt;
	penis.v -= penis.v * y;
	penis.phi += penis.v * dt;
	return penis;
}

export function toDeg(angle) {
	angle = angle >= 0 ? 180 - 180 * angle / Math.PI : -180 * angle / Math.PI + 180;
	if (Math.abs(angle) > 360)
		angle = 360 * (angle / 360 - Math.round(angle / 360));
	return angle;
}

function toRad(grad) {
	if (grad > 180) {
		return (180 - grad) * Math.PI / 180;
	} else {
		return (180 - grad) * Math.PI / 180;
	}
}

export function calcAngle(x, y, centerX, centerY) {
	let x0 = x - centerX;
	let y0 = y - centerY;
	let a = Math.atan(x0 / y0) * 180 / 3.14;
	if (a > 0) {
		if (y0 < 0) {
			a = 360 - a;
		} else {
			a = 180 - a;
		}
	} else {
		if (y0 < 0) {
			a = Math.abs(a);
		} else {
			a = Math.abs(a) + 180;
		}
	}
	return toRad(a);
}

export function cleanAngle(prevPhi, phi) {
	let angle = prevPhi - phi;
	if (Math.abs(angle) > 180) {
		angle = (360 - Math.abs(angle)) * (angle * (-1)) / Math.abs(angle);
	}
	return (angle);
}
