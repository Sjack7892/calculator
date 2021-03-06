const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('Server started on port:', PORT);
});
// Array for complete operations.
operations = [];

// Array for answers.
answers = [];

// Handles math operations and adds to array.
app.post('/calculations', (req, res) => {
    console.log('In calculate POST');
    let firstNumber = Number(req.body.operation[0]);
    let secondNumber = Number(req.body.operation[2])
    if (req.body.operation[1] === '+') {
        let answer = firstNumber + secondNumber;
        console.log(answer);
        answers.push(answer);
        operations.push(`${firstNumber} + ${secondNumber} = ${answer}`);
    } else if (req.body.operation[1] === '-') {
        let answer = firstNumber - secondNumber;
        console.log(answer);
        answers.push(answer);
        operations.push(`${firstNumber} - ${secondNumber} = ${answer}`);
    } else if (req.body.operation[1] === '*') {
        let answer = firstNumber * secondNumber;
        console.log(answer);
        answers.push(answer);
        operations.push(`${firstNumber} * ${secondNumber} = ${answer}`);
    } else {
        let answer = firstNumber / secondNumber;
        console.log(answer);
        answers.push(answer);
        operations.push(`${firstNumber} / ${secondNumber} = ${answer}`);
    }
    res.sendStatus(200);
    console.log(operations);
    console.log(answers);
});

// Sends calculations array to client.
app.get('/calculations', (req, res) => {
    console.log('In calculate GET');
    res.send(operations);
})

// Sends answers array to client.
app.get('/answers', (req, res) => {
    res.send(answers);
})

// Empties operations array.
app.delete('/calculations', (req, res) => {
    console.log('In calculate delete');
    operations = [];
    res.send(operations);
})
