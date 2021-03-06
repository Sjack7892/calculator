console.log('js ready');

$(document).ready(readyNow);

function readyNow() {
    console.log('jquery ready');
    getOperations();
    // Click events for buttons on DOM.
    $('#equals').on('click', calculate);
    $('#clear').on('click', clear);
    $('#add').on('click', add);
    $('#subtract').on('click', subtract);
    $('#multiply').on('click', multiply);
    $('#divide').on('click', divide);
    $('#one').on('click', one);
    $('#two').on('click', two);
    $('#three').on('click', three);
    $('#four').on('click', four);
    $('#five').on('click', five);
    $('#six').on('click', six);
    $('#seven').on('click', seven);
    $('#eight').on('click', eight);
    $('#nine').on('click', nine);
    $('#zero').on('click', zero);
    $('#dot').on('click', dot);
    $('#deleteBtn').on('click', deleteHistory);
}
// Functions for each button to input respective value.
function one() {
    $('#input').val($('#input').val() + $(this).val());
}
function two() {
    $('#input').val($('#input').val() + $(this).val());
}
function three() {
    $('#input').val($('#input').val() + $(this).val());
}
function four() {
    $('#input').val($('#input').val() + $(this).val());
}
function five() {
    $('#input').val($('#input').val() + $(this).val());
}
function six() {
    $('#input').val($('#input').val() + $(this).val());
}
function seven() {
    $('#input').val($('#input').val() + $(this).val());
}
function eight() {
    $('#input').val($('#input').val() + $(this).val());
}
function nine() {
    $('#input').val($('#input').val() + $(this).val());
}
function zero() {
    $('#input').val($('#input').val() + $(this).val());
}
function dot() {
    $('#input').val($('#input').val() + $(this).val());
}

// Declared operator variable for calculate function to use when deciding if input is valid or not.
let operator = '';

// Functions to prevent use of multiple operators and change value of operator variable.
function add() {
    console.log('add');
    if ($('#input').val() === '') {
        alert('Please enter a number first!');
        return;
    }
    if ($('#input').val().includes('+') ||
        $('#input').val().includes('-') ||
        $('#input').val().includes('*') ||
        $('#input').val().includes('/')) {
        alert('You have already entered an operator!');
        return;
    }
    $('#input').val($('#input').val() + $(this).val());
    operator = '+';
}

function subtract() {
    console.log('subtract');
    if ($('#input').val() === '') {
        alert('Please enter a number first!');
        return;
    }
    if ($('#input').val().includes('+') ||
        $('#input').val().includes('-') ||
        $('#input').val().includes('*') ||
        $('#input').val().includes('/')) {
        alert('You have already entered an operator!');
        return;
    }
    $('#input').val($('#input').val() + $(this).val());
    operator = '-';
}

function multiply() {
    console.log('multiply');
    if ($('#input').val() === '') {
        alert('Please enter a number first!');
        return;
    }
    if ($('#input').val().includes('+') ||
        $('#input').val().includes('-') ||
        $('#input').val().includes('*') ||
        $('#input').val().includes('/')) {
        alert('You have already entered an operator!');
        return;
    }
    $('#input').val($('#input').val() + $(this).val());
    operator = '*';
}

function divide() {
    console.log('divide');
    if ($('#input').val() === '') {
        alert('Please enter a number first!');
        return;
    }
    if ($('#input').val().includes('+') ||
        $('#input').val().includes('-') ||
        $('#input').val().includes('*') ||
        $('#input').val().includes('/')) {
        alert('You have already entered an operator!');
        return;
    }
    $('#input').val($('#input').val() + $(this).val());
    operator = '/';
}

// Clears input value.
function clear() {
    $('#input').val('');
}

// Determines if input is valid and then sends input to server.
function calculate() {
    let string = $('#input').val();
    let stringArray = string.split(' ');
    console.log(stringArray);
    let objectToSend = {
        operation: stringArray,
    }

    if ($('#input').val() === '') {
        alert('Please input two numbers!');
        return;
    } else if (operator === '') {
        alert('Please select an operator!');
        return;
    } else {
        $.ajax({
            type: 'POST',
            url: '/calculations',
            data: objectToSend
        }).then(function (response) {
            console.log('Back from POST:', response);
        }).catch(function (error) {
            alert('Error! Check console.', error);
        });
    }
    getOperations();
    getAnswers();
    clear();
}
// Request completed operations from server.
function getOperations() {
    $.ajax({
        type: 'GET',
        url: '/calculations'
    }).then(function (response) {
        console.log('Back from GET:', response);
        append(response);
    }).catch(function (error) {
        console.log('Error! Check console.', error);
    });
}
// Request answers from server.
function getAnswers() {
    $.ajax({
        type: 'GET',
        url: '/answers'
    }).then(function (response) {
        console.log('Back from GET:', response);
        appendAnswer(response);
    }).catch(function (error) {
        console.log('Error! Check console.', error);
    });
}

// Appends answer to DOM.
function appendAnswer(response) {
    let answer = response[response.length - 1];
    $('#input').val(answer);
}

// Appends complete operation to DOM.
function append(response) {
    $('#display').empty();
    console.log(response);
    for (let i = 0; i < response.length; i++) {
        $('#display').append(`
        <p>${response[i]}</p>
        `);
    }
}

// Requests to delete array from server.
function deleteHistory() {
    console.log('history is deleted!');
    $.ajax({
        type: 'DELETE',
        url: '/calculations'
    }).then(function (response) {
        console.log('Back from GET:', response);
    }).catch(function (error) {
        console.log('Error! Check console.', error);
    });
    getOperations();
}
