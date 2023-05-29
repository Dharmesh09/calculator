const numBtns = document.querySelectorAll(".numbers");
const operationBtns = document.querySelectorAll(".operation");
const equalsBtn = document.querySelector(".equals");
const delBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");

const prev = document.querySelector(".prev");
const curr = document.querySelector(".curr");

window.addEventListener('keydown', keyboardSupport);

const screen = document.getElementById("#screen");
let currOperand='';
let prevOperand='';
let operation=undefined;

function clear(){
    curr.innerText='0'
    prev.innerText=''
    currOperand=''
    prevOperand=''
    operation = undefined
}

numBtns.forEach(button => {
    button.addEventListener('click', () => {
        appendNum(button.innerText);
        showResult();
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        selectOperation(button.innerText);
        showResult();
    })
})

function selectOperation(op){
    if(currOperand==='') return;
    if(prevOperand !== ''){
        operate();
    }
    operation = op
    prevOperand = currOperand.toString() + operation.toString();
    currOperand='' 
}

function appendNum(number){
    if(number === '.' && currOperand.includes('.')) return;
    currOperand = currOperand.toString() + number.toString();
}

function operate(){
    let answer
    const previous = parseFloat(prevOperand) 
    const current = parseFloat(currOperand)
    if(isNaN(previous) || isNaN(current)) return;

    switch(operation){
        case '+':
            answer = previous + current;
            break;
        
        case '-':
            answer = previous - current;
            break;

        case '*':
            answer = previous * current;
            break;
        
        case '/':
            if(current === 0) answer = null;
            else answer = previous / current;
            break;

        case '^':
            answer = Math.pow(previous,current);
            break;
        
        default:
            return;
    }
    currOperand = answer;
    operation = undefined;
    prevOperand = ''
}

function showResult(){
    curr.innerText = currOperand
    prev.innerText = prevOperand
}

clearBtn.addEventListener('click', () => { clear() });

equalsBtn.addEventListener('click', () => {
    operate();
    showResult();
})

delBtn.addEventListener('click', ()=>{
    remove();
    showResult();
})

function remove(){
    currOperand = currOperand.toString().slice(0,-1);
}

function keyboardSupport(e) {
    if (e.key >= 0 && e.key <= 9 || e.key === '.') appendNum(e.key)
    if (e.key === '=' || e.key === 'Enter') operate()
    if (e.key === 'Backspace') remove()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      selectOperation((e.key))

    showResult();
  }

window.onload=()=>{
    clear();
}