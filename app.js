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

$strictButton.on('click', function() {
  if ($strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

$onButton.on('click', function () {
  if ($onButton.checked == true) {
    on = true;
    $turnCounter.html("-");
  } else {
    on = false;
    $turnCounter.html("");
    clearColor();
    clearInterval(intervalId);
  }
});

$startButton.on('click', function () {
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
    let audio = $("clip1");
    audio.play();
  }
  noise = true;
  $topLeft.css({backgroundColor: "purple"});
}

function two() {
  if (noise) {
    let audio = $("clip2");
    audio.play();
  }
  noise = true;
  $topRight.css({backgroundColor: "red"});
}

function three() {
  if (noise) {
    let audio = $("clip3");
    audio.play();
  }
  noise = true;
  $bottomLeft.css({backgroundColor: "green"});
}

function four() {
  if (noise) {
    let audio = $("clip4");
    audio.play();
  }
  noise = true;
  $bottomRight.css({backgroundColor: "blue"});
}

function clearColor() {
  $topLeft.css({backgroundColor:"#dbbad1"});
  $topRight.css({backgroundColor: "#EA6964"});
  $bottomLeft.css({backgroundColor:"#81CB71"});
  $bottomRight.css({backgroundColor:"#98DAF1"});
}

function flashColor() {
  $topLeft.css({backgroundColor: "#dbbad1"});
  $topRight.css({backgroundColor: "#EA6964"});
  $bottomLeft.css({backgroundColor: "#81CB71"});
  $bottomRight.css({backgroundColor: "#98DAF1"});
}

$topLeft.on('click',function (event) {
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

$topRight.on('click',function(event) {
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

$bottomLeft.on('click',function (event) {
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

$bottomRight.on('click',function (event) {
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
    $turnCounter.html(turn);
    intervalId = setInterval(gameTurn, 800);
  }

}

function winGame() {
  flashColor();
  turnCounter.html("WIN!");
  on = false;
  win = true;
}

