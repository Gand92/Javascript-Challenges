const cells = document.querySelectorAll('.cell');
let cellsArray = new Array(9).fill(null);
let lastIsX = false;

const handleClick = (e) => {
  lastIsX === false ? (e.target.innerHTML = 'X') : (e.target.innerHTML = 'O');
  lastIsX = !lastIsX;
  cellsArray[Number(e.target.id - 1)] = e.target.innerHTML;
  console.log(cellsArray);
  checkWinner();
};

cells.forEach((cell) => {
  cell.addEventListener('click', handleClick, { once: true });
});

const checkWinner = () => {
  if (
    (cellsArray[0] === 'X' && cellsArray[1] === 'X' && cellsArray[2] === 'X') ||
    (cellsArray[3] === 'X' && cellsArray[4] === 'X' && cellsArray[5] === 'X') ||
    (cellsArray[6] === 'X' && cellsArray[7] === 'X' && cellsArray[8] === 'X') ||
    (cellsArray[0] === 'X' && cellsArray[3] === 'X' && cellsArray[6] === 'X') ||
    (cellsArray[1] === 'X' && cellsArray[4] === 'X' && cellsArray[7] === 'X') ||
    (cellsArray[2] === 'X' && cellsArray[5] === 'X' && cellsArray[8] === 'X') ||
    (cellsArray[0] === 'X' && cellsArray[4] === 'X' && cellsArray[8] === 'X') ||
    (cellsArray[2] === 'X' && cellsArray[4] === 'X' && cellsArray[6] === 'X')
  ) {
    cells.forEach((cell) => {
      cell.removeEventListener('click', handleClick);
    });
    setTimeout(() => {
      alert('X is the winner');
    }, 100);
  } else if (
    (cellsArray[0] === 'O' && cellsArray[1] === 'O' && cellsArray[2] === 'O') ||
    (cellsArray[3] === 'O' && cellsArray[4] === 'O' && cellsArray[5] === 'O') ||
    (cellsArray[6] === 'O' && cellsArray[7] === 'O' && cellsArray[8] === 'O') ||
    (cellsArray[0] === 'O' && cellsArray[3] === 'O' && cellsArray[6] === 'O') ||
    (cellsArray[1] === 'O' && cellsArray[4] === 'O' && cellsArray[7] === 'O') ||
    (cellsArray[2] === 'O' && cellsArray[5] === 'O' && cellsArray[8] === 'O') ||
    (cellsArray[0] === 'O' && cellsArray[4] === 'O' && cellsArray[8] === 'O') ||
    (cellsArray[2] === 'O' && cellsArray[4] === 'O' && cellsArray[6] === 'O')
  ) {
    cells.forEach((cell) => {
      cell.removeEventListener('click', handleClick);
    });
    setTimeout(() => {
      alert('O is the winner');
    }, 100);
  }
};
