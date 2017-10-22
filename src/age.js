import moment from 'moment';

export default function (dob) {
	let a = moment();
	let b = moment(dob);
	return a.diff(b, 'months');
}
