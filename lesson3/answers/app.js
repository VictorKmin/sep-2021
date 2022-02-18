// Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
// Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
// Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user ({. name: "Andrii", age: 22, city: "Lviv" }),
// відповідно перший - onlineUsers, другий - inPersonUsers;
// і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів,
//     але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.
//
// Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу.
// (ті, що були в папці inPerson будуть в папці online)

const fsPromises = require('fs/promises');
const path = require('path');
// const fsPromises2 = require('fs').promises;

const util = require('util');
const fs = require('fs')

const onlineUsers = [
    {
        name: 'Test1',
        age: 22,
        city: 'Lviv'
    },
    {
        name: 'Test2',
        age: 22,
        city: 'Lviv'
    },
    {
        name: 'Test3',
        age: 22,
        city: 'Lviv'
    },
    {
        name: 'Test4',
        age: 22,
        city: 'Lviv'
    },
]

const inPersonUsers = [
    {
        name: 'Test5',
        age: 22,
        city: 'Lviv'
    },
    {
        name: 'Test6',
        age: 22,
        city: 'Lviv'
    },
    {
        name: 'Test7',
        age: 22,
        city: 'Lviv'
    },
    {
        name: 'Test8',
        age: 22,
        city: 'Lviv'
    },
];

const mainPath = path.join(__dirname, 'main')

async function createData() {
    await fsPromises.mkdir(mainPath);

    await Promise.all([
        fsPromises.mkdir(path.join(mainPath, 'inPerson')),
        fsPromises.mkdir(path.join(mainPath, 'online')),
        writeAndAppendFile('inPerson', inPersonUsers),
        writeAndAppendFile('online', onlineUsers)
    ]);

    // await Promise.all([
    //     writeAndAppendFile('inPerson', inPersonUsers),
    //     writeAndAppendFile('online', onlineUsers)
    // ])
}

async function writeAndAppendFile(pathFolder, users) {
    const data = users.map(({ name, age, city }) => `NAME:${name} \n AGE:${age} \nCITY:${city}\n\n`)
    return fsPromises.writeFile(path.join(mainPath, pathFolder, 'user.txt'), data)
}

async function swap(firstFolder, secondFolder) {
    try {
        const [dataFromFirstFile, dataFromSecondFile] = await Promise.all([
            fsPromises.readFile(path.join(mainPath, firstFolder, 'user.txt'), 'utf8'),
            fsPromises.readFile(path.join(mainPath, secondFolder, 'user.txt'), 'utf8')
        ]);

        await  Promise.all([
            fsPromises.appendFile(path.join(mainPath, firstFolder, 'user.txt'), dataFromSecondFile, {flag: 'w'}),
            fsPromises.appendFile(path.join(mainPath, secondFolder, 'user.txt'), dataFromFirstFile, {flag: 'w'})
        ])
    } catch (err) {
        console.log(err)
    }
}



// fs.stat(path.join(mainPath, 'online', 'user.txt'), (err, data) => {
//     console.log(data)
//     console.log(data.isFile())
//     console.log(data.isDirectory())
// })

// const p = path.basename(path.join(mainPath, 'online', 'user.txt'))
// console.log(p)
//
// fs.readdir(path.join(mainPath, 'inPerson'), (err, data) => {
//     console.log(data)
// })

// console.log(path.parse(path.join(mainPath, 'inPerson', 'user.txt')))

console.log(path.extname(mainPath))

const writeStream = fs.createWriteStream(path.join(mainPath, 'steam.txt'));

for (let i = 0; i < 50; i++) {
    writeStream.write('NEW DATA', (err) => {
        if (err) console.log(err)
    })
}
writeStream.end()