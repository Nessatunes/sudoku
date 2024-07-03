// função que vai ajudar a resolver o Sudoku
export const solver = (grid, row = 0, col = 0) => {
  //se a célula atual estiver preenchida, vá para a próxima célula
  if (grid[row][col] !== -1) {
    const isLast = row >= 8 && col >= 8;
    if (!isLast) {
      const [newRow, newCol] = getNext(row, col);
      return solver(grid, newRow, newCol);
    }
  }

  for (let num = 1; num <= 9; num++) {
    //loop que vai observar ser o NUM está satisfazendo as restições do sudoku

    if (checkValid(grid, row, col, num)) {
      grid[row][col] = num;

      const [newRow, newCol] = getNext(row, col);

      if (!newRow && !newCol) return true;
      if (solver(grid, newRow, newCol)) return true;
    }
  }
  // se for valido preenche com -1
  grid[row][col] = -1;
  return false;
};

const getNext = (row, col) => {
  // se a coluna atingir 8, ele vai aumentar o numero de linhas
  //se a linha atringir o 8 e a coluna atingir o 8,a proxima posição vai ser [0, 0]
  //se a coluna não atingir o 8, ele vai incrementar o numero de coluna
  return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
};

const checkValid = (grid, row, col, num) => {
  //função vai verificar se o número é unico, na coluna, na linha, no quadrado 3x3
  if (
    checkRow(grid, row, num) &&
    checkCol(grid, col, num) &&
    checkBox(grid, row, col, num)
  )
    return true;

  return false;
};

const checkRow = (grid, row, num) => {
  //verifica se o numero é o unico na linha
  return grid[row].indexOf(num) === -1;
};

const checkCol = (grid, col, num) => {
  //verifica se o numero é o unico na coluna
  return grid.map((row) => row[col]).indexOf(num) === -1;
};

const checkBox = (grid, row, col, num) => {
  //verifica se o numero é o unico no quadrado 3x3
  let boxArr = [],
    rowStart = row - (row % 3),
    colStart = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    //pegar todos os números de células e coloca dentro do array boxArr
    for (let j = 0; j < 3; j++) {
      boxArr.push(grid[rowStart + i][colStart + j]);
    }
  }
  return boxArr.indexOf(num) === -1;
};

//função para comparar os sudoku´s

export const compareSudoku = (currentSudoku, solvedSudoku) => {
  //resposta
  const res = {
    isComplete: true,
    isSolvable: true,
  };
  //estrutura de repetição vamos usar para comparar os array´s
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (currentSudoku[i][j] !== solvedSudoku[i][j]) {
        if (currentSudoku[i][j] !== -1) {
          res.isSolvable = false;
        }
        res.isComplete = false;
      }
    }
  }

  return res;
};
