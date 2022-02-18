// const { EventEmitter } = require('events');
// const events = require("events");
//
// const ee = new EventEmitter();
//
// ee.on('Log', (name) => {
//     console.log(`Log is working!!!! ${name}`)
// })
//
// ee.on('Test2', (name) => {
//     console.log(`Log is working!!!! ${name}`)
// })
//
// ee.once('Test', () => {
//     console.log('Once is working!!!')
// })
//
//
// ee.once('Test32', () => {
//     console.log('Once is working!!!')
// })
// ee.emit('Log', 'Oleg');
// ee.emit('Log', 'Oleg');
// ee.emit('Log', 'Oleg');
// ee.emit('Log', 'Oleg');
// ee.emit('Log', 'Oleg');
// ee.emit('Log', 'Oleg');
// ee.emit('Log', 'Oleg');

//
// ee.emit('Test')
// ee.emit('Test')
// ee.emit('Test')
// ee.emit('Test')
// ee.emit('Test')
// ee.emit('Test')
// ee.emit('Test')
//
// console.log(ee.eventNames())






const fs = require('fs');
const path = require('path');


const readStream = fs.createReadStream(path.join(__dirname, 'test2.txt'));
const writeStream = fs.createWriteStream(path.join(__dirname, 'fileTest.txt'));

//
// readStream.on('data', (chunk) => {
//     // console.log(chunk.toString())
//     writeStream.write(chunk, (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     })
//     writeStream.end()
// });

//
// for (let i = 0; i < 5000; i++) {
//     writeStream.write('NEW', (err) => {
//         if (err) {
//             console.log(err);
//             throw err;
//         }
//     })
//
// }
// writeStream.end()

// readStream.pipe(writeStream);
















