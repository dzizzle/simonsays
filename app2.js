let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;
let welcome =prompt("Welcome to the Powerpuff Challenge! It looks like the girls need some help with their homework...help the Powerpuff Girls by repeating what the keypad plays to you!");

const turnCounter = document.querySelector("#turn");
const topLeft = document.querySelector("#topleft");
const topRight = document.querySelector("#topright");
const bottomLeft = document.querySelector("#bottomleft");
const bottomRight = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#go");

//check if the strict button is checked 
strictButton.addEventListener('click', (event) => {
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

//check to see if the on button is selected, turn counter shows what is in box 
onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    //stops running game turn function when you clear 
    clearInterval(intervalId);
  }
});

//check to see if the start button is on (equals true)or when win equals true, then run play function 
startButton.addEventListener('click', (event) => {
  if (on || win) {
    play();
  }
});

//order gets random number between 1 and 4, math.random gets decimal, multiply by 4 for whole number then you add 1 (will return random array 1-4)
function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;
  //runs game turn function every 800 miliseconds 
  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;
//if computer's turn is over then clear interval, clear color and player can now press buttons bc on is true
  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }
//set timeout function will run function only after a certain amount of miliseconds, it will flash a color 
  if (compTurn) {
    clearColor();
    //if first number in flash array is 1 then run one function etc
    setTimeout(() => {
      if (order[flash] == 1) one();
      if (order[flash] == 2) two();
      if (order[flash] == 3) three();
      if (order[flash] == 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("sound1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "purple";
}

function two() {
  if (noise) {
    let audio = document.getElementById("sound2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "red";
}

function three() {
  if (noise) {
    let audio = document.getElementById("sound3");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "green";
}

function four() {
  if (noise) {
    let audio = document.getElementById("sound4");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "blue";
}

//clear color brings color back to original state before flash
function clearColor() {
  topLeft.style.backgroundColor = "#dbbad1";
  topRight.style.backgroundColor = "#EA6964";
  bottomLeft.style.backgroundColor = "#81CB71";
  bottomRight.style.backgroundColor = "#98DAF1";
}

function flashColor() {
  topLeft.style.backgroundColor = "#dbbad1";
  topRight.style.backgroundColor = "#EA6964";
  bottomLeft.style.backgroundColor = "#81CB71";
  bottomRight.style.backgroundColor = "#98DAF1";
}

topLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(1);
    check();
    one();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

topRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(2);
    check();
    two();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomLeft.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(3);
    check();
    three();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

bottomRight.addEventListener('click', (event) => {
  if (on) {
    playerOrder.push(4);
    check();
    four();
    if(!win) {
      setTimeout(() => {
        clearColor();
      }, 300);
    }
  }
})

function check() {
  if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1])
    good = false;

  if (playerOrder.length == 10 && good) {
    winGame();
  }

  if (good == false) {
    flashColor();
    turnCounter.innerHTML = "NO!";
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();

      if (strict) {
        play();
      } else {
        compTurn = true;
        flash = 0;
        playerOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false;
  }

  if (turn == playerOrder.length && good && !win) {
    turn++;
    playerOrder = [];
    compTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN!";
  on = false;
  win = true;
}

