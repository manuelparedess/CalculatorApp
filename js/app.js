const numbers = [0,1,2,3,4,5,6,7,8,9];
const operators = ['+','-','/','x'];

document.addEventListener('click', (e) => {
    let total = 0;

    if(e.target.matches('.calculator__button')) {

        if(numbers.includes(parseInt(e.target.dataset.number))) {
            (document.querySelector('.calculator__screen').innerHTML === '0') ? document.querySelector('.calculator__screen').innerHTML = `${parseInt(e.target.dataset.number)}` : document.querySelector('.calculator__screen').innerHTML += `${parseInt(e.target.dataset.number)}`;
        }
        if(operators.includes(e.target.dataset.number)) {
            if((document.querySelector('.calculator__screen').innerHTML.endsWith(operators[3]) || document.querySelector('.calculator__screen').innerHTML.endsWith(operators[2])) && e.target.dataset.number === '-'){
                document.querySelector('.calculator__screen').innerHTML += e.target.dataset.number;
            } else if (document.querySelector('.calculator__screen').innerHTML.endsWith(operators[3] + operators[1]) || document.querySelector('.calculator__screen').innerHTML.endsWith(operators[2] + operators[1])) {
                document.querySelector('.calculator__screen').innerHTML = document.querySelector('.calculator__screen').innerHTML.slice(0, -2);
                document.querySelector('.calculator__screen').innerHTML += e.target.dataset.number;
            } else if(operators.some(operator => document.querySelector('.calculator__screen').innerHTML.endsWith(operator))) {
                document.querySelector('.calculator__screen').innerHTML = document.querySelector('.calculator__screen').innerHTML.slice(0, -1);
                document.querySelector('.calculator__screen').innerHTML += e.target.dataset.number;
            } else {
                document.querySelector('.calculator__screen').innerHTML += e.target.dataset.number;
            }
        }
        if((e.target.dataset.number === '.') && !(document.querySelector('.calculator__screen').innerHTML).includes('.')) {
            document.querySelector('.calculator__screen').innerHTML += '.';
        }
    } 
})