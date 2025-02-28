document.addEventListener('DOMContentLoaded', () => {
  // defining variables : Game state
  let currentPlayer = 'X';
  let gameBoard = Array(9).fill('');
  let gameOver = false;
  let winner = null;
  let winningCombination = [];
  
  // defining variables : DOM elements
  const gameBoardElement = document.getElementById('game-board');
  const winnerBanner = document.getElementById('winner-banner');
  const winnerText = document.getElementById('winner-text');
  const turnIndicator = document.getElementById('turn-indicator');
  const playerX = document.getElementById('player-x');
  const playerO = document.getElementById('player-o');
  const resetButton = document.getElementById('reset-button');
  
  // Win patterns
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  // Initialize game board function
  function initializeGameBoard() {
    gameBoardElement.innerHTML = '';
    
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.className = 'game-cell';
      cell.dataset.index = i;
      cell.addEventListener('click', () => handleCellClick(i));
      gameBoardElement.appendChild(cell);
    }
  }
  
  // Handle cell click
  function handleCellClick(index) {
    if (gameBoard[index] !== '' || gameOver) return;
    
    // Update game state
    gameBoard[index] = currentPlayer;
    
    // Updating UI
    const cell = document.querySelector(`.game-cell[data-index="${index}"]`);
    cell.classList.add(currentPlayer);
    
    const content = document.createElement('span');
    content.className = 'cell-content';
    content.textContent = currentPlayer;
    cell.appendChild(content);
    
    // Checking for winner
    checkWinner();
    
    // Switching chance for player if game not over
    if (!gameOver) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      updateTurnIndicator();
    }
  }
  
  // Checking for winner
  function checkWinner() {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        winner = gameBoard[a];
        gameOver = true;
        winningCombination = pattern;
        highlightWinningCombination();
        showWinner();
        return;
      }
    }
    
    // Checking for draw
    if (!gameBoard.includes('') && !gameOver) {
      gameOver = true;
      winner = 'draw';
      showWinner();
    }
  }
  
  // Highlight winning pattern
  function highlightWinningCombination() {
    for (const index of winningCombination) {
      const cell = document.querySelector(`.game-cell[data-index="${index}"]`);
      cell.classList.add('winning');
    }
  }
  
  // Show winner
  function showWinner() {
    turnIndicator.style.display = 'none';
    winnerBanner.style.display = 'flex';
    
    if (winner === 'draw') {
      winnerText.textContent = "It's a Draw!";
    } else {
      winnerText.textContent = `Player ${winner} Wins!`;
    }
    
    // Marking all cells as disabled
    document.querySelectorAll('.game-cell').forEach(cell => {
      cell.classList.add('disabled');
    });
  }
  
  // Update turn indicator
  function updateTurnIndicator() {
    playerX.classList.toggle('active', currentPlayer === 'X');
    playerO.classList.toggle('active', currentPlayer === 'O');
  }
  
  // Reset game
  function resetGame() {
    currentPlayer = 'X';
    gameBoard = Array(9).fill('');
    gameOver = false;
    winner = null;
    winningCombination = [];
    
    // Reset UI
    winnerBanner.style.display = 'none';
    turnIndicator.style.display = 'flex';
    updateTurnIndicator();
    
    // Re-initializing game board
    initializeGameBoard();
  }
  
  // event listener to reset button
  resetButton.addEventListener('click', resetGame);
  
  // Initializing the game
  initializeGameBoard();
});