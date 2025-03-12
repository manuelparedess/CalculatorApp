const numbers = [0,1,2,3,4,5,6,7,8,9];
const operators = ['+','-','/','x'];

function calculate (expression) {
    if(!operators.some(operator => expression.includes(operator)) || operators.some(operator => expression.endsWith(operator))) return expression;

    let total = 0;
    let terms = expression.match(/\d+|[x+/\-]/g);

    for (let i = 0; i < terms.length; i++) {
        
        if(terms[i] === operators[3] || terms[i] === operators[2]) {
            if(terms[i + 1] === operators[1]) terms[i + 1] = terms[i + 1] + terms[i + 2];

            if(terms[i] === operators[3]) terms[i - 1] = `${parseInt(terms[i - 1]) * parseInt(terms[i + 1])}`;
            if(terms[i] === operators[2]) terms[i - 1] = `${parseInt(terms[i - 1]) / parseInt(terms[i + 1])}`;

            terms.splice(i, 2);
            i--;
        }
    }
  
    if(terms[0] === operators[1]) {
        total = parseInt(terms[0] + terms[1]);
        terms.splice(0, 1);
    } else {
        total = parseInt(terms[0]);
    }

    for (let i = 1; i < terms.length; i++) {

        if(terms[i] === operators[0]) total += parseInt(terms[i + 1]);
        if(terms[i] === operators[1]) total -= parseInt(terms[i + 1]);
    }

    return total;
}

document.addEventListener('click', (e) => {
    let total = 0;

    //KEYBOARD BUTTONS
    if(e.target.matches('.calculator__button')) {

        //Numbers
        if(numbers.includes(parseInt(e.target.dataset.number))) {
            (document.querySelector('.calculator__screen').innerHTML === '0') ? document.querySelector('.calculator__screen').innerHTML = `${parseInt(e.target.dataset.number)}` : document.querySelector('.calculator__screen').innerHTML += `${parseInt(e.target.dataset.number)}`;
        }
        //Operators
        if(operators.includes(e.target.dataset.number)) {
            if((e.target.dataset.number === operators[1]) && (document.querySelector('.calculator__screen').innerHTML === '0')) {
                document.querySelector('.calculator__screen').innerHTML = e.target.dataset.number;
            } else if(document.querySelector('.calculator__screen').innerHTML.includes(operators[1]) && document.querySelector('.calculator__screen').innerHTML.length === 1) {
                document.querySelector('.calculator__screen').innerHTML = '0';
                document.querySelector('.calculator__screen').innerHTML += e.target.dataset.number;
            } else if((document.querySelector('.calculator__screen').innerHTML.endsWith(operators[3]) || document.querySelector('.calculator__screen').innerHTML.endsWith(operators[2])) && e.target.dataset.number === operators[1]){
                document.querySelector('.calculator__screen').innerHTML += e.target.dataset.number;
            } else if (document.querySelector('.calculator__screen').innerHTML.endsWith(operators[3] + operators[1]) || document.querySelector('.calculator__screen').innerHTML.endsWith(operators[2] + operators[1])) {
                document.querySelector('.calculator__screen').innerHTML = document.querySelector('.calculator__screen').innerHTML.slice(0, -2);
                document.querySelector('.calculator__screen').innerHTML += e.target.dataset.number;
            } else if(operators.some(operator => document.querySelector('.calculator__screen').innerHTML.endsWith(operator))) {
                document.querySelector('.calculator__screen').innerHTML = document.querySelector('.calculator__screen').innerHTML.slice(0, -1);
                document.querySelector('.calculator__screen').innerHTML += e.target.dataset.number;
            } else {
                document.querySelector('.calculator__screen').innerHTML += e.target.dataset.number;
            };
        }

        //Decimals
        if((e.target.dataset.number === '.') && !(document.querySelector('.calculator__screen').innerHTML).includes('.')) {
            document.querySelector('.calculator__screen').innerHTML += '.';
        }

        //Delete
        if((e.target.dataset.number === 'delete') && document.querySelector('.calculator__screen').innerHTML !== '0') {
            document.querySelector('.calculator__screen').innerHTML = document.querySelector('.calculator__screen').innerHTML.slice(0, -1);
            if(document.querySelector('.calculator__screen').innerHTML === '') document.querySelector('.calculator__screen').innerHTML = '0';
        }
    } 

    //ACTION BUTTONS
    if(e.target.matches('.calculator__big-btn')) {
        if(e.target.dataset.action === 'reset') {
            document.querySelector('.calculator__screen').innerHTML = '0';
        }
        if (e.target.dataset.action === 'isEqual') {
            document.querySelector('.calculator__screen').innerHTML = calculate(document.querySelector('.calculator__screen').innerHTML);
        }
    }

    //STYLE
    if(e.target.matches('.calculator__button') || e.target.matches('.calculator__big-btn'))
    e.target.classList.add('click');
    setTimeout(() => {
        e.target.classList.remove('click');
    }, 100);
})