import React from "react";
import Die from "./components/Die.js";
import Score from "./components/Score.js";
import './App.css';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App() {  
  const [isClick,setIsClick]=React.useState(false);
  const [rolls,setRolls] =React.useState(0);   
  const [final, setFinal] = React.useState(0);
  const [finalTime, setFinalTime] = React.useState(0);
  function generateNewDice() {
    return{
        value:Math.floor(Math.random()*6+1),
        isHeld:false,
        id:nanoid()
      }}
  function  allNewDice() {
   let numArr=[]
    for (let i= 0; i<10; i++) {
      let randomValues=generateNewDice()
      numArr.push(randomValues)
    }   
   return numArr
    }
  const [die, setDie] =React.useState(allNewDice())
  let dieElements=die.map(die=> <Die value={die.value}
     key={die.id}
     isHeld={die.isHeld}
     holdDice={()=>{holdDice(die.id)
    }}
    isClick={isClick}
     />) 
    
      function resetGame() {
          setFinal(rolls)
          setFinalTime(time)
          setTenzies(true)         
          setDie(allNewDice())
          setRolls(-1) 
          setStart(true)
          setTime(0)
         
        } 
      function rollDice() {
        if (!tenzies) {
          setDie(prevDie=>prevDie.map(die=>{         
             if (die.isHeld) return die
               else return generateNewDice()    
        }))
        } else { 
          resetGame()
          setTenzies(false)
          
        }   
        setRolls(prevRoll=>prevRoll+1);
       
      }
      
      
      function holdDice(id) {
        setDie(prevDie =>
          prevDie.map( die=>{
            if (tenzies) return {...die,isHeld:true}
            if (id === die.id ){
              return {...die,isHeld:!die.isHeld}} else  return die  
        }))}
          const [tenzies, setTenzies] =React.useState(false);
          React.useEffect(()=>{
                    let anyVal=die[2].value ; 
                    let heldValues= die.every(die =>die.isHeld );
                    let equalValues=die.every(die=>die.value===anyVal?true:false);
                        if (heldValues && equalValues) 
                        setTenzies(true) 
                        setStart(false)
                      },[die])
                  
 /*                       confetti height && width                   */          
          const [windowSize, setWindowSize] =React.useState({windowHeight:window.innerHeight,
            windowWidth:window.innerWidth});
            function detectSize(){
              setWindowSize(
              {windowHeight:window.innerHeight,
              windowWidth:window.innerWidth})
            }
          React.useEffect(()=>{
            window.addEventListener("resize",detectSize)
            return ()=>window.removeEventListener("resize",detectSize)}
            ,[windowSize]);
/*                            timer                    */  

          const [time, setTime] =React.useState(0);
          const [start, setStart] =React.useState(true);
          React.useEffect(()=>{
           let interval=null
            if (start) {
             interval=setInterval(() => {
                  setTime(prevTime=>prevTime+10)}
                  ,10)}
                  else{ 
                    clearInterval(interval);
                  }
                  return ()=> clearInterval(interval);
                },[tenzies]); 

/*                                      ////////                                  */
const [bestRolls,setBestRolls]=React.useState(JSON.parse(localStorage.getItem("best rolls")) || 0);
const [bestTime,setBestTime]=React.useState(JSON.parse(localStorage.getItem("best time")) || 0);

React.useEffect(()=>
{ if(JSON.parse(localStorage.getItem("best rolls"))) {
  if(final < JSON.parse(localStorage.getItem("best rolls")))
  localStorage.removeItem("best rolls");
  localStorage.setItem("best rolls",JSON.stringify(rolls));
} else {
  localStorage.setItem("best rolls",JSON.stringify(rolls));
  setBestRolls(JSON.parse(localStorage.getItem("best rolls")))
}
},
[tenzies]);
React.useEffect(()=>
{if (JSON.parse(localStorage.getItem("best time"))) {
  if (finalTime<JSON.parse(localStorage.getItem("best time"))) 
    localStorage.removeItem("best time")
    localStorage.setItem("best time",JSON.stringify(time))
  } else {
    localStorage.setItem("best time",JSON.stringify(time))
    setBestTime(JSON.parse(localStorage.getItem("best time")))
  }

},
[tenzies]);      
      
  return (
    <main>  
      {tenzies && <Confetti height={windowSize.windowHeight} width={windowSize.windowWidth}/>}
      <h1>Tenzies </h1>
      <h4>Roll until all dice are the same. 
        Click each die to freeze it at its 
        current value between rolls.
      </h4><Score rolls={rolls}
              time={time}
      />
        <div className="dice-con">
            {dieElements}
        </div>
      <button onClick={function () {rollDice ()
                            setIsClick(true)
      }} >{tenzies?"New Game":"Roll"}</button>
      <div className="last-score">
      <span>
          best time:  {("0"+Math.floor((bestTime/6000)%60)).slice(-2)}:
            {("0"+Math.floor((bestTime/1000)%60)).slice(-2)}:
            {("0"+Math.floor((bestTime/10)%1000)).slice(-2)}
      </span>
      <span>
       best rolls: {bestRolls}
      </span>
        
      </div>
    
      
      </main>
  );
}


