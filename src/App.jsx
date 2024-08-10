import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import Confetti from 'react-confetti'



const gameIcons=[
  "😊","🌹","🐱‍👤","🐱‍🏍","🎁","🤞","🤳","🎉"
];

function App() {

  const[pieces,setPieces]=useState([]);

  let timeout=useRef();

  const isGamecompleted=useMemo(()=> {
    if(pieces.length>0 && pieces.every((piece)=>
    piece.solved)){
      return true;
  }return false
},[pieces]
  )

  const startGame=()=>{
    const dupeIcons=gameIcons.concat(gameIcons);
    const newGameIcons=[];

    while (newGameIcons.length<gameIcons.length*2) {
      const randomIndex=Math.floor(Math.random()*dupeIcons.length);
      newGameIcons.push({
        emoji:dupeIcons[randomIndex],
        flipped:false,
        solved:false,
        position:newGameIcons.length
      });
      dupeIcons.splice(randomIndex,1)
    }
    setPieces(newGameIcons);
  };


useEffect(()=>{
  startGame();
},[]);

const handleActive=(data)=>{
 const flippedData= pieces.filter((data)=>data.flipped && !data.solved);
  if (flippedData.length===2) return;

  const newpieces =pieces.map(piece=>{
    if (piece.position===data.position) {
      piece.flipped=!piece.flipped
    }
    return piece;
});
setPieces(newpieces);
}


const gameLogicForFlipped=()=>{
 const flippedData= pieces.filter((data)=>data.flipped && !data.solved);

  if (flippedData.length===2) {
timeout.current= setTimeout(() => {
   
    
      //success
      setPieces(
        pieces.map((data)=>{
          if(data.position===flippedData[0].position||
            data.position===flippedData[1].position
          ){
            if (flippedData[0].emoji===flippedData[1].emoji)  {
            data.solved=true;
       
          }else{
           
                  data.flipped=false;
                }
              }
                return data;
              
                  
              
           } )
            
          );   
        }, 800);
          
        }
    
    };



useEffect(()=>{
  gameLogicForFlipped();

 return()=>{
  clearTimeout(timeout.current);
 }
},[pieces]
);


  return (
    <main>
      <h1>Memory Card Game</h1>

      <div className='container'>
{pieces.map((data,index)=>(

<div className={`flip-card ${data.flipped ? "active" : ""}`} key={index}
onClick={()=>handleActive(data)}>
<div className="flip-card-inner">
  <div className="flip-card-front">
  </div>
  <div className="flip-card-back">{data.emoji}
  </div>
</div>
</div>

)
)}

    


      </div>

      {isGamecompleted && (
        <div className='game-end'>
        <h1>YOU WIN!!!</h1>
        <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
    />

      </div>
    )}




    </main>
  )}


export default App
