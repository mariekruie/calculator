"use strict";
const currentNumber = document.getElementById('currentNumber');
const prevNumber = document.getElementById('prevNumber');
const btns = [...document.getElementsByTagName('button')];
let resultDisplayed = false;

btns.forEach( el => el.onclick = handleClick );

function handleClick(e){
    let key = e.target.value;
    let lastChar = currentNumber.value[currentNumber.value.length - 1];
    let prevLastChar = currentNumber.value[currentNumber.value.length - 2];
    let testLastChar = /\+|\-|\*|\/|[a-z]/.test(lastChar); 
    let testPrevLastChar = /\+|\-|\*|\/|[a-z]/.test(prevLastChar); 

        switch(key){

            case /[0-9]/.exec(key)?.input:
                lastChar === '0' && testPrevLastChar ?
                (deleteLastChar(), appendNum(key))  :
                appendNum(key);
            break;

            case /\./.exec(key)?.input:
                testLastChar ?
                appendNum('0' + key):
                currentNumber.value.includes(key)?
                alert('В числе уже есть точка!') :
                appendNum(key);
            break;

            case /\+|\-|\*|\//.exec(key)?.input:
                resultDisplayed ? 
                (prevNumber.value += key, resultDisplayed= false):
                key ===  '-' && !lastChar ? 
                appendNum(key) :
                prevNumber.value !== ''?
                prevNumber.value = prevNumber.value.slice(0,-1) + key:
                /[0-9]/.test(lastChar) ? 
                chooseOperation(key) :
                alert('Введите число!');
            break;

            case 'backspace':
                deleteLastChar();
            break;

            case 'equals': 
                compute();
            break;

            case 'reset':
                reset();
            break;
        };

};

const appendNum = key => {
    currentNumber.value.length === 6 ?
    alert('6 символов - это максимальная длина числа'):    
    currentNumber.value += key;
};

const chooseOperation = key => {
    prevNumber.value = currentNumber.value + key;
    currentNumber.value = '';
    resultDisplayed= false;
};

const deleteLastChar = () => {
    currentNumber.value !== '' ? currentNumber.value = currentNumber.value.slice(0,-1) : prevNumber.value = prevNumber.value.slice(0,-1);
};

const compute = () => {
    if(!prevNumber.value || !currentNumber.value){
        alert('Введите число!');
    }else{
        if(Number(currentNumber.value) === 0 && prevNumber.value.slice(-1) === '/'){
            alert('На ноль делить нельзя!');
        }else{
            let result = eval(`${prevNumber.value} + (${currentNumber.value})`);
            result % 1 === 0 ? result = result : result = Math.round(Number(result) * 10) / 10;
            prevNumber.value = result;
            currentNumber.value = '';
            resultDisplayed = true;
        };
    };
};

const reset = () => {
    document.location.reload();
};