/**
 * Simple tic-tac-toe game example. 
 */
var gameStatus = 1;
$("#winner-Status").hide();
const cellElements = [
  $("#upper-left")[0],
  $("#upper-mid")[0],
  $("#upper-right")[0],
  $("#center-left")[0],
  $("#center-mid")[0],
  $("#center-right")[0],
  $("#lower-left")[0],
  $("#lower-mid")[0],
  $("#lower-right")[0]
];

for (let i = 0; i < cellElements.length; i++) {
  cellElements[i].addEventListener('click', async function () {
    if (!gameStatus) {
      alert("please click on reset to play");
      return;
    }
    // add player's X


    const isValidMove = await addMove(cellElements[i], i);

  });
}

function play() {
  $("#winner-Status").hide();
  for (let n = 0; n < cellElements.length; n++) {
    if (cellElements[n].innerHTML != " ") {
      cellElements[n].innerHTML = " ";
    }
  }
  gameStatus = 1;
}

function findBestSquare(arr) {
  for (let n = 0; n < arr.length; n++) {
    if (arr[n].innerHTML == " ") {
      return n;
    }
  }
}

function checkBoxElements(arr, cellElements) {
  var result;
  for (let i = 0; i < arr.length; i++) {
    if (cellElements[arr[i]].innerHTML == " ") {
      result = arr[i];
    }
    if (result) {
      break;
    }
  }
  if (!result) {
    result = findBestSquare(cellElements);
  }
  return result;
}

async function addMove(cellElement, i) {
  if (cellElement.innerHTML != " " && cellElement.innerHTML) {
    return false;
  }
  /*const headingElement = document.createElement("h1");
  headingElement.appendChild(textNode);*/
  const textNode = document.createTextNode("X");
  cellElement.appendChild(textNode);
  let winner = findWinner("X");
  if (!gameStatus) {
    return;
  }
  if (true) {
    gameStatus = 1;
    // choose computer's O
    const j = await findBestMove(cellElements, i);

    // pause, then add computer's O
    //await new Promise((resolve) => setTimeout(() => resolve(), 2000));
    if (cellElements[j].innerHTML != " " && cellElements[j].innerHTML) {
      return;
    }
    /*const headingElement = document.createElement("h1");
    headingElement.appendChild(textNode);*/
    const textNode = document.createTextNode("O");
    cellElements[j].appendChild(textNode);
    findWinner("O");
    return true;
  }
}

async function findBestMove(cellElements, id) {
  var gameArray = [];
  var boxId;
  if (id == 0) {
    gameArray = [1, 2, 3, 4, 8, 7];
    boxId = checkBoxElements(gameArray, cellElements);
  }
  if (id == 1) {
    gameArray = [0, 2, 4, 7];
    boxId = checkBoxElements(gameArray, cellElements);
  }
  if (id == 2) {
    gameArray = [1, 5, 4, 0, 8, 6];
    boxId = checkBoxElements(gameArray, cellElements);
  }
  if (id == 3) {
    gameArray = [0, 4, 5, 6];
    boxId = checkBoxElements(gameArray, cellElements);
  }
  if (id == 4) {
    gameArray = [1, 5, 3, 2, 7, 8, 6];
    boxId = checkBoxElements(gameArray, cellElements);
  }
  if (id == 5) {
    gameArray = [4, 3, 2, 8];
    boxId = checkBoxElements(gameArray, cellElements);
  }
  if (id == 6) {
    gameArray = [3, 4, 7, 8, 0, 2];
    boxId = checkBoxElements(gameArray, cellElements);
  }
  if (id == 7) {
    gameArray = [6, 4, 8, 1];
    boxId = checkBoxElements(gameArray, cellElements);
  }
  if (id == 8) {
    gameArray = [7, 4, 5, 6, 2, 0];
    boxId = checkBoxElements(gameArray, cellElements);
  }
  return boxId;
}

async function addX(cellElement) {
  if (cellElement.innerHTML != " " && cellElement.innerHTML) {
    return false;
  }
  /*const headingElement = document.createElement("h1");
  headingElement.appendChild(textNode);*/
  const textNode = document.createTextNode("X");
  cellElement.appendChild(textNode);
  findWinner("X");
  return true;
}

async function addO(cellElement) {
  if (cellElement.innerHTML != " " && cellElement.innerHTML) {
    return;
  }
  /*const headingElement = document.createElement("h1");
  headingElement.appendChild(textNode);*/
  const textNode = document.createTextNode("O");
  cellElement.appendChild(textNode);
  findWinner("O");
}

async function findWinner(player) {
  let gameWinner = 0;
  if (cellElements[0].innerText == player && cellElements[1].innerText == player && cellElements[2].innerText == player) {
    gameWinner = 1;
  }
  else if (cellElements[3].innerText == player && cellElements[4].innerText == player && cellElements[5].innerText == player) {
    gameWinner = 1;
  }
  else if (cellElements[6].innerText == player && cellElements[7].innerText == player && cellElements[8].innerText == player) {
    gameWinner = 1;
  }
  else if (cellElements[0].innerText == player && cellElements[3].innerText == player && cellElements[6].innerText == player) {
    gameWinner = 1;
  }
  else if (cellElements[1].innerText == player && cellElements[4].innerText == player && cellElements[7].innerText == player) {
    gameWinner = 1;
  }
  else if (cellElements[2].innerText == player && cellElements[5].innerText == player && cellElements[8].innerText == player) {
    gameWinner = 1;
  }
  else if (cellElements[0].innerText == player && cellElements[4].innerText == player && cellElements[8].innerText == player) {
    gameWinner = 1;
  }

  else if (cellElements[6].innerText == player && cellElements[4].innerText == player && cellElements[2].innerText == player) {
    gameWinner = 1;
  }
  let count = 0;
  for (let i = 0; i < cellElements.length; i++) {
    if (cellElements[i].innerText != " " && cellElements[i].innerText) {
      count += +1;
    }
  }
  if (count == 9 && !gameWinner) {
    gameWinner = 1;
    player = "Draw";
  }
  if (gameWinner) {
    gameStatus = 0;
    if (player == "Draw") {
      $("#winner-Status").html("Draw");
      alert("Gameover, play again");
    }
    else {
      $("#winner-Status").html("'" + player + "' Wins");
      alert("'" + player + "' Winner");
    }
    $("#winner-Status").show();
    return true;
  }
}