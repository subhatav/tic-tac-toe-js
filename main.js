const selectBox = document.querySelector(".select-box");

const selectButtonX = selectBox.querySelector(".options .playerX");
const selectButtonO = selectBox.querySelector(".options .playerO");

const players = document.querySelector(".players");
const playBoard = document.querySelector(".play-board");
const allBoxes = document.querySelectorAll("section span");

const resultBox = document.querySelector(".result-box");
const statusText = resultBox.querySelector(".status-text");

const replayButton = resultBox.querySelector("button");

window.onload = () => {

  for (let index = 0; index < allBoxes.length; index += 1) {

    allBoxes[index].setAttribute("onclick", "clickedBox(this)");
  }
}

replayButton.onclick = () => {

  window.location.reload();
}

selectButtonX.onclick = () => {

  selectBox.classList.add("hide");
  playBoard.classList.add("show");
}

selectButtonO.onclick = () => {

  selectBox.classList.add("hide");
  playBoard.classList.add("show");

  players.setAttribute("class", "players active player");
}

let playerSign = "X";

let playerIconX = "fas fa-times";
let playerIconO = "far fa-circle";

let botTurn = true;

function clickedBox(element) {

  if (players.classList.contains("player")) {

    playerSign = "O";

    element.innerHTML = `<i class="${playerIconO}"></i>`;
    players.classList.remove("active");
    element.setAttribute("id", playerSign);

  } else {

    element.innerHTML = `<i class="${playerIconX}"></i>`;
    element.setAttribute("id", playerSign);
    players.classList.add("active");
  }

  decideResult();

  element.style.pointerEvents = "none";
  playBoard.style.pointerEvents = "none";

  let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();

  setTimeout(() => { runBot(botTurn); }, randomTimeDelay);
}

function runBot() {

  let array = [];

  if (botTurn) {

    playerSign = "O";

    for (let index = 0; index < allBoxes.length; index += 1) {

      if (allBoxes[index].childElementCount == 0) {

        array.push(index);
      }
    }

    let randomBox = array[Math.floor(Math.random() * array.length)];

    if (array.length > 0) {

      if (players.classList.contains("player")) {

        playerSign = "X";

        allBoxes[randomBox].innerHTML = `<i class="${playerIconX}"></i>`;
        allBoxes[randomBox].setAttribute("id", playerSign);
        players.classList.add("active");

      } else {

        allBoxes[randomBox].innerHTML = `<i class="${playerIconO}"></i>`;
        players.classList.remove("active");
        allBoxes[randomBox].setAttribute("id", playerSign);

      }

      decideResult();
    }

    allBoxes[randomBox].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";

    playerSign = "X";
  }
}

function getIdValue(classname) {

  return document.querySelector(".box" + classname).id;
}

function checkIdSign(value1, value2, value3, sign) {

  if (getIdValue(value1) == sign &&
      getIdValue(value2) == sign &&
      getIdValue(value3) == sign) {

    return true;
  }
}

function decideResult() {

  if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) ||
      checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) ||
      checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) ||
      checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {

    botTurn = false;
    runBot(botTurn);

    setTimeout(() => {

      resultBox.classList.add("show");
      playBoard.classList.remove("show");

    }, 700);

    statusText.innerHTML = `Player <p>&nbsp;${playerSign}&nbsp;</p> won the game!`;

  } else {

    if (getIdValue(1) != "" && getIdValue(2) != "" && getIdValue(3) != "" &&
        getIdValue(4) != "" && getIdValue(5) != "" && getIdValue(6) != "" &&
        getIdValue(7) != "" && getIdValue(8) != "" && getIdValue(9) != "") {

      botTurn = false;
      runBot(botTurn);

      setTimeout(() => {

        resultBox.classList.add("show");
        playBoard.classList.remove("show");

      }, 700);

      statusText.textContent = "Match has been drawn!";
    }
  }
}