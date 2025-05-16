var board; // Representa o tabuleiro como uma matriz 4x4
var score = 0; // Armazena a pontuação do jogador
var rows = 4; // Número de linhas do tabuleiro
var columns = 4; // Número de colunas do tabuleiro

// Quando a janela for carregada, inicia o jogo
window.onload = function () {
  setGame();
};

// Função que inicializa o jogo e monta o tabuleiro
function setGame() {
  // Inicializa a matriz do tabuleiro com todos os valores zerados
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  // Percorre todas as posições da matriz para criar os blocos (tiles)
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      // Cria uma <div> no HTML para representar o tile na interface com o id=0-0 -> <div id="0-0"></div>
      let tile = document.createElement("div");
      // Define um id único para cada tile baseado em sua posição (ex: "0-0")
      tile.id = r.toString() + "-" + c.toString();
      // Pega o valor numérico da posição (inicialmente 0)
      let num = board[r][c];
      // Atualiza visualmente o tile conforme o valor (cor, texto, etc.)
      updateTile(tile, num);
      // Adiciona o tile ao elemento #board no HTML
      document.getElementById("board").append(tile);
    }
  }

  // Qauntidade de tiles que serão criados inicialmente
  setTwo();
  setTwo();
}

// Função que verifica se existe algum tile vazio (com valor 0) no tabuleiro
function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}

function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }

  let found = false;
  while (!found) {
    // r, c aleatório
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("x2");
      found = true;
    }
  }
}

// Função que atualiza visualmente cada tile (cor, texto e classe CSS)
function updateTile(tile, num) {
  tile.innerText = ""; // Limpa o texto do tile
  tile.classList.value = ""; // Limpa todas as classes CSS do tile
  tile.classList.add("tile"); // Adiciona a classe base "tile"
  if (num > 0) {
    tile.innerText = num; // Mostra o número no tile

    // Adiciona uma classe CSS específica conforme o valor do tile (ex: x2, x4, etc.)
    if (num <= 4096) {
      tile.classList.add("x" + num.toString());
    } else {
      tile.classList.add("x8192"); // Caso o número seja maior que 4096
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    slideLeft();
    // Gera dois blocos (tiles) após o movimento
    setTwo();
  } else if (e.code == "ArrowRight") {
    slideRight();
    // Gera dois blocos (tiles) após o movimento
    setTwo();
  } else if (e.code == "ArrowUp") {
    slideUp();
    // Gera dois blocos (tiles) após o movimento
    setTwo();
  } else if (e.code == "ArrowDown") {
    slideDown();
    // Gera dois blocos (tiles) após o movimento
    setTwo();
  }

  // Atualiza a pontuação na interface
  document.getElementById("score").innerText = score;
});

function filterZero(row) {
  return row.filter((num) => num != 0); // Cria um novo array sem zeros
}

function slide(row) {
  // [0, 2, 2, 2]
  row = filterZero(row); // [2, 2, 2]

  // Desliza
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
    } // [2, 2, 2] -> [4, 0, 2]
  }

  row = filterZero(row); // [4, 2]

  // Adiciona zeros
  while (row.length < columns) {
    row.push(0);
  } // [4, 2, 0, 0]

  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    // board[0][c] = row[0];
    // board[1][c] = row[1];
    // board[2][c] = row[2];
    // board[3][c] = row[3];
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

// Alternância de tema claro/escuro
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
