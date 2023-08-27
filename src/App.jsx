import { useEffect, useState } from 'react'
import './App.css'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())

  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allDicePick = dice.every(die => die.isHeld)
    const sameValue = dice[0].value
    const allSameDiceValue = dice.every(die => die.value === sameValue)

    if(allDicePick && allSameDiceValue)
    {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  function generateDice() {
    return {
      value : Math.ceil(Math.random() * 6),
      isHeld : false,
      id: nanoid()
    }
  }


  function allNewDice(){
    const diceArr = []

    for(let i=0; i<10; i++)
    {
      diceArr.push(generateDice())
    }

    return diceArr;
  }

  function holdDice(id){
    setDice(oldDiceArr => oldDiceArr.map(die =>{
      return die.id === id ? 
            {
              ...die,
              isHeld : !die.isHeld
            }
            : die
    }))
  }

  function rollDice() {
    if(tenzies)
    {
      setTenzies(false)
      setDice(allNewDice())
    }
    else 
    {
      setDice(oldDiceData => oldDiceData.map(die => {
        return die.isHeld ? die : generateDice()
      }))
    }
  }

  const diceNewArray = dice.map(dieValue => <Die
    key={dieValue.id} 
    value={dieValue.value} 
    isHeld={dieValue.isHeld} 
    holdDice = {() => holdDice(dieValue.id)}
    />
  )

  return (
    <main className='main-body'>
        <div className='container'>
          {tenzies && <Confetti/>}
          <div className="about-game">
            <h1 className='game-title'>Tenzies</h1>
            <p className='game-info'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          </div>
          <div className="dice-container">
            {diceNewArray}
          </div>
          <button 
            className='roll-btn' 
            onClick={rollDice}
          >
           {tenzies ? "New Game" : "Roll"}
          </button>
        </div>
    </main>
  )
}

export default App
