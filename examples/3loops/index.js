const arpx = require('arpxjs');

console.log('before');
arpx('./arpx.yaml', ['loop1', 'loop3']);
console.log('after');
