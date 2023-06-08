import { useState, MouseEvent } from "react"
import { ICard } from "./models/card"
import "./App.css"

function App() {
  const [cards, setCards] = useState<ICard[]>([
    { id: 1, order: 3, text: "card-3" },
    { id: 2, order: 1, text: "card-1" },
    { id: 3, order: 2, text: "card-2" },
    { id: 4, order: 4, text: "card-4" },
  ])

  const [currentCard, setCurrentCard] = useState<ICard | null>(null)

  const dragStartHandler = (e: MouseEvent<HTMLDivElement>, card: ICard) => {
    console.log("drag", card)
    setCurrentCard(card)
  }

  const dragEndHandler = (e: MouseEvent<HTMLDivElement>) => {
    setCurrentCard(null)
  }

  const dragOverHandler = (e: MouseEvent<HTMLDivElement>) => {
    // e.target.style.background("lightgray")
  }

  const dragLeaveHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const dropHandler = (e: MouseEvent<HTMLDivElement>, card: ICard) => {
    e.preventDefault()
    console.log("drop", card)
    setCards([...cards])
  }

  return (
    <div className="app">
      {cards.map((card) => (
        <div
          key={card.id}
          className="card"
          draggable
          onDragStart={(e) => dragStartHandler(e, card)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDrop={(e) => dropHandler(e, card)}
        >
          {card.text}
        </div>
      ))}
    </div>
  )
}

export default App
