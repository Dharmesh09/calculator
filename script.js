const numbers =  document.getElementsByClassName("numbers");
const screen = document.getElementById("screen");
let a,b,num;

screen.innerHTML="0";

function clear(){
    screen.innerHTML="0";
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        const fired_button = button.value;
        alert(fired_button);
        
    });
});