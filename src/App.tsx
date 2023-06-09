import { useState, DragEvent } from "react"
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

  const dragStartHandler = (card: ICard) => {
    setCurrentCard(card)
  }

  const dragEndHandler = () => {
    setCurrentCard(null)
  }

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const target = e.target as HTMLElement
    target.style.backgroundColor = "lightgray"
  }

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const target = e.target as HTMLElement
    target.style.backgroundColor = "#eee"
  }

  const dropHandler = (e: DragEvent<HTMLDivElement>, card: ICard) => {
    e.preventDefault()
    const target = e.target as HTMLElement
    target.style.backgroundColor = "#eee"
    setCards(
      cards.map((c) => {
        if (c.id === card.id && currentCard)
          return { ...c, order: currentCard.order }
        if (c.id === currentCard?.id) return { ...c, order: card.order }
        return c
      })
    )
  }

  const sortCards = (a: ICard, b: ICard) => {
    console.log("sorted")
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className="app">
      {cards.sort(sortCards).map((card) => (
        <div
          key={card.id}
          className="card"
          draggable
          onDragStart={() => dragStartHandler(card)}
          onDragEnd={dragEndHandler}
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
