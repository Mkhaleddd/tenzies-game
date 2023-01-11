import React from "react";
import Die from "./components/Die.js";
import Score from "./components/Score.js";
import './App.css';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


export default function App() {  
    
  const [rolls,setRolls] =React.useState(0);   
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
     holdDice={()=>holdDice(die.id)}
     />) 
      function resetGame() {
          setTenzies(!tenzies)
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
        }   
         setRolls(prevRoll=>prevRoll+1);
         setBestRolls(rolls+1)
        
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
                        setRecords()
                        },[die])
/*                                        ////////                                  */
      const [bestRolls,setBestRolls]=React.useState(JSON.parse(localStorage.getItem("best rolls")) || 0);
      const [bestTime,setBestTime]=React.useState(JSON.parse(localStorage.getItem("best time")) || 0);

       function setRecords(){
        if (!bestRolls || rolls < bestRolls ) {
          console.log(rolls)
          setBestRolls(rolls)  
        }  
        if (!bestTime || (time/10) < bestTime) {
          console.log(time)
          setBestTime(time)
        } 
      };     
     
      React.useEffect(()=>
      { localStorage.setItem("best rolls",JSON.stringify(bestRolls))},
      [bestRolls]);
      React.useEffect(()=>
       {localStorage.setItem("best time",JSON.stringify(bestTime))},
      [bestTime]);
                        
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
            return ()=>window.removeEventListener("resize",detectSize)},[windowSize]);
/*                            timer                    */  

          const [time, setTime] =React.useState(0);
          const [start, setStart] =React.useState(true);
          React.useEffect(()=>{
           let interval=null
            if (start) {
             interval=setInterval(() => {
                  setTime((prevTime)=>prevTime+10)}
                  ,10)}
                  else{ 
                    clearInterval(interval);
                  }
                  return ()=> clearInterval(interval);
          },[tenzies]) 
 
  return (
    <main>
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
      <button onClick={rollDice} >{tenzies?"New Game":"Roll"}</button>
      {bestRolls}
      <br></br>
      {(Math.floor((bestTime / 1000)))}:
            {("0" + ((bestTime/ 10) % 10))}
     {tenzies && <Confetti height={windowSize.windowHeight} width={windowSize.windowWidth}/>}
    </main>
  );
}


