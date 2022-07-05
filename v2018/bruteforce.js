const fs = require('fs');
const crypto = require('crypto');

const file = fs.readFileSync('index.html', 'utf8');

const loop = 100000;
let initialTime = Date.now();
let lastTime = initialTime;

const prefixes = [
	"ambrose",
	"deadbeef",
	"311337",
	"sendhelp"
];
const minCol = 6;
let i = loop * 30000;

while (true) {
	const data = file.replace('RANDOM_VALUE', i);

	const hash = crypto.createHash('sha1');
	hash.update(data);
	const digest = hash.digest();
	const test = [
		digest.toString('latin1'),
		digest.toString('hex'),
		digest.toString('base64')
	];

	let e;
	for (e = 0; e < test.length; e++) {
		const str = test[e].toLowerCase();
		for (let k = 0; k < prefixes.length; k++) {
			const prefix = prefixes[k];
			let j;
			for (j = minCol; j < prefix.length; j++) {
				if (str.substr(0, j) !== prefix.substr(0, j)) {
					break;
				}
			}
			if (j > minCol) {
				j--;
				console.log('');
				console.log(j, test[e], i);
				console.log('');
				fs.appendFileSync('collisions.txt', test[e] + ' match: ' + j + ' i: ' + i + '\n', 'utf8');
			}
		}
	}

	if (i % loop == 0) {
		console.log('i:  ', i);
		const now = Date.now();
		const currentRate = loop / (now - lastTime) * 1000;
		console.log('cur:', currentRate, 'hash/sec');
		const averageRate = i / (now - initialTime) * 1000;
		console.log('avg:', averageRate, 'hash/sec');
		lastTime = now;
	}

	i++;
}
