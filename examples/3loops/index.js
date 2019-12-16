const {arpxjs} = require('arpxjs');

console.log('before');
arpxjs('./arpx.yaml', ['loop1', 'loop3']);
console.log('after');
