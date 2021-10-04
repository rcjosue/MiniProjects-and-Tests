//console.log('hello world');

const {readFile, readFileSync } = require('fs'); //fs is file system module

const txt1 = readFileSync('./hello.txt','utf8'); //reading takes long

console.log(txt1)//will go first if readfile is Sync (blocking)
console.log('Do first cause faster'); //will do second if reading is "Sync"



const txt2 = readFile('./hello.txt','utf8',(err,txt2) => {
    console.log(txt2) //callback funciton: err will be returned while the file hasnt been read yet
});

console.log('Do first cause faster'); //will print first since faster
