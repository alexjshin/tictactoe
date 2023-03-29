import { useState } from 'react';
import './App.css';

function Square({value, onSquareClick}){
  return (
    <button 
      className='square'
      onClick = {onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  function calculateWinner(squares){
    const winConds = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,4,8],
      [2,4,6],
      [0,3,6],
      [1,4,7],
      [2,5,8]
    ];
    for(let i = 0; i < winConds.length; i++){
      const [a,b,c] = winConds[i];
      if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(i){
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
    // setSquares(nextSquares);
    // setIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner){
    status = "Player " + winner + " has won!";
  }
  else{
    status = "Player " + (xIsNext ? 'X' : 'O') + "'s turn!";
  }
  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value = {squares[0]} onSquareClick = {() => handleClick(0)}/> 
        <Square value = {squares[1]} onSquareClick = {() => handleClick(1)}/>
        <Square value = {squares[2]} onSquareClick = {() => handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value = {squares[3]} onSquareClick = {() => handleClick(3)}/>
        <Square value = {squares[4]} onSquareClick = {() => handleClick(4)}/>
        <Square value = {squares[5]} onSquareClick = {() => handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value = {squares[6]} onSquareClick = {() => handleClick(6)}/>
        <Square value = {squares[7]} onSquareClick = {() => handleClick(7)}/>
        <Square value = {squares[8]} onSquareClick = {() => handleClick(8)}/>
      </div>
    </>
  ); 
}

function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0){
      description = "Go to move #" + move;
    } else{
      description = "Go to Game Start Board";
    }
    return (
      <li key = {move}>
        <button className = "moves" onClick = {() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <>
      <h1 className='game-title'>Shin's TicTacToe Game</h1>
      <div className='game'>
        <div className='game-board'>
          <Board xIsNext = {xIsNext} squares = {currentSquares} onPlay = {handlePlay}/>
        </div>
        <div className='game-info'>
          <ol>
            {moves}
          </ol>
        </div>
      </div>
    </>
  );
}

export default Game;
