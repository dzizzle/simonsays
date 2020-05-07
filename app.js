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

const $turnCounter = $("#turn");
const $topLeft = $("#topleft");
const $topRight = $("#topright");
const $bottomLeft = $("#bottomleft");
const $bottomRight = $("#bottomright");
const $strictButton = $("#strict");
const $onButton = $("#on");
const $startButton = $("#go");

$strictButton.on('click', (event) => {
  if ($strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

$onButton.on('click', (event) => {
  if ($onButton.checked == true) {
    on = true;
    $turnCounter.text("-");
  } else {
    on = false;
    $turnCounter.text("");
    clearColor();
    clearInterval(intervalId);
  }
});

$startButton.on('click', (event) => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  $turnCounter.html(1);
  good = true;
  for (var i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }
  compTurn = true;

  intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
  on = false;

  if (flash == turn) {
    clearInterval(intervalId);
    compTurn = false;
    clearColor();
    on = true;
  }

  if (compTurn) {
    clearColor();
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
    let audio = $("sound1");
    audio.play();
  }
  noise = true;
  $topLeft.css('background-color',"purple");
}

function two() {
  if (noise) {
    let audio = $("sound2");
    audio.play();
  }
  noise = true;
  $topRight.css('background-color', "red");
}

function three() {
  if (noise) {
    let audio = $("sound3");
    audio.play();
  }
  noise = true;
  $bottomLeft.css('background-color',"green");
}

function four() {
  if (noise) {
    let audio = $("sound4");
    audio.play();
  }
  noise = true;
  $bottomRight.css('background-color', "blue");
}

function clearColor() {
  $topLeft.css('background-color',"#dbbad1");
  $topRight.css('background-color', "#EA6964");
  $bottomLeft.css('background-color',"#81CB71");
  $bottomRight.css('background-color',"#98DAF1");
}

function flashColor() {
  $topLeft.css('background-color', "#dbbad1");
  $topRight.css('background-color',"#EA6964");
  $bottomLeft.css('background-color', "#81CB71");
  $bottomRight.css('background-color',"#98DAF1");
}

$topLeft.on('click',(event) => {
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

$topRight.on('click',(event) => {
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

$bottomLeft.on('click', (event) => {
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

$bottomRight.on('click',(event)=> {
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
    $turnCounter.text("NO!");
    setTimeout(() => {
      $turnCounter.text(turn);
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
    $turnCounter.text(turn);
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  flashColor();
  $turnCounter.text("WIN!");
  on = false;
  win = true;
}
