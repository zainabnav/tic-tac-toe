import React, {useState} from "react";


function Boxes({value, onBoxesClick}) {
  return <button className="bg-white text-3xl text-black text-bold h-[50px] w-[70px] justify-center text-center m-1" onClick={onBoxesClick}>{value}</button>
} 

export default function Game(){
  const [xIsNext, setXIsNext] = useState(true);
    const[values, setValues] = useState(Array(9).fill(null));
    const [gameOver, setGameOver] = useState(false);
  
    function handleClick(i){
      if (values[i] || gameOver) {
        return;
      }
      const nextValues = values.slice();
      if (xIsNext) {
        nextValues[i] = "X";
      } else {
        nextValues[i] = "Y";
      }
      setValues(nextValues);
      setXIsNext(!xIsNext);

      if(calculateWinner(nextValues)){
        setGameOver(true)
      }
  }
  const winner = calculateWinner(values);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } 
  else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'Y');
  }
  function ResetBtn(){
   setValues(Array(9).fill(null));
   setXIsNext(true);
   setGameOver(false);
  }
  
  return (
<div className="flex justify-center items-center bg-pink-800 text-white">
<header>
<div className="flex flex-col justify-center flex-wrap items-center h-[100vh] ">
  <h1 className="text-3xl text-bold mb-3">tic-tac-toe</h1>
  <h3 className="text-bold mb-6">let's play together :)</h3>
  <span className="text-bold">{ status}</span>
  <div className="flex">
    <Boxes value={values[0]} onBoxesClick={()=> handleClick(0)}/>
    <Boxes value={values[1]} onBoxesClick={()=> handleClick(1)}/>
    <Boxes value={values[2]} onBoxesClick={()=> handleClick(2)}/>
</div>
<div className="flex">
    <Boxes value={values[3]} onBoxesClick={()=> handleClick(3)}/>
    <Boxes value={values[4]} onBoxesClick={()=> handleClick(4)}/>
    <Boxes value={values[5]} onBoxesClick={()=> handleClick(5)}/>
</div>
<div className="flex">
    <Boxes value={values[6]} onBoxesClick={()=> handleClick(6)}/>
    <Boxes value={values[7]} onBoxesClick={()=> handleClick(7)}/>
    <Boxes value={values[8]} onBoxesClick={()=> handleClick(8)}/>
</div>
<button className="text-bold m-2 text-base p-1 px-2 rounded-2xl bg-pink-700" onClick={ResetBtn}>Reset</button>
        </div>
      </header>
    </div>
  );

function calculateWinner(values) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (values[a] && values[a] === values[b] && values[a] === values[c]) {
      return values[a];
    }
  }
  return null;
}
}
