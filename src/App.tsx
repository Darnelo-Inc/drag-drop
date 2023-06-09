import { DragEvent, useState } from "react"
import "./App.css"
import { IBoard, ITask } from "./models/board"

function App() {
  const [boards, setBoards] = useState<IBoard[]>([
    {
      id: 1,
      title: "To do",
      tasks: [
        { id: 1, title: "Read a book" },
        { id: 2, title: "Watch TV" },
      ],
    },
    {
      id: 2,
      title: "To review",
      tasks: [
        { id: 3, title: "Cook a dinner" },
        { id: 4, title: "Walk with Dina" },
      ],
    },
    {
      id: 3,
      title: "Done",
      tasks: [
        { id: 5, title: "Complete work tasks" },
        { id: 6, title: "Make the bed" },
      ],
    },
  ])

  console.log("render")

  const [currentBoard, setCurrentBoard] = useState<IBoard | null>(null)
  const [currentTask, setCurrentTask] = useState<ITask | null>(null)

  const addShadow = (e: DragEvent<HTMLParagraphElement>) => {
    const target = e.target as HTMLElement
    target.style.boxShadow = "0 4px 3px gray"
  }

  const removeShadow = (e: DragEvent<HTMLParagraphElement>) => {
    const target = e.target as HTMLElement
    target.style.boxShadow = "none"
  }

  const dragStartHandler = (
    e: DragEvent<HTMLParagraphElement>,
    board: IBoard,
    task: ITask
  ) => {
    setCurrentBoard(board)
    setCurrentTask(task)
  }

  const dragEndHandler = (e: DragEvent<HTMLParagraphElement>) => {
    removeShadow(e)
  }

  const dragOverHandler = (e: DragEvent<HTMLParagraphElement>) => {
    e.preventDefault()
    addShadow(e)
  }

  const dragLeaveHandler = (e: DragEvent<HTMLParagraphElement>) => {
    // e.preventDefault()
    removeShadow(e)
  }

  const dropHandler = (
    e: DragEvent<HTMLParagraphElement>,
    board: IBoard,
    task: ITask
  ) => {
    e.preventDefault()
    removeShadow(e)

    const currentIndex = currentBoard!.tasks.indexOf(currentTask!)
    currentBoard!.tasks.splice(currentIndex, 1)

    const pushedIndex = board.tasks.indexOf(task)
    board.tasks.splice(pushedIndex, 0, currentTask!)

    // setBoards(
    //   boards.map((b) => {
    //     if (b.id === board.id) {
    //       // return board
    //     }
    //     if (b.id === currentBoard!.id) {
    //       // return currentBoard!
    //     }
    //     return b
    //   })
    // ) //cuz render will be anyway

    setCurrentBoard(null)
    setCurrentTask(null)
  }

  const boardDragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const boardDropHanler = (e: DragEvent<HTMLDivElement>, board: IBoard) => {
    e.preventDefault()

    if (!board.tasks.length) {
      board.tasks.push(currentTask!)
      const currentIndex = currentBoard!.tasks.indexOf(currentTask!)
      currentBoard!.tasks.splice(currentIndex, 1)

      setCurrentBoard(null)
      setCurrentTask(null)
    }
  }

  return (
    <div className="app">
      {boards.map((board) => (
        <div
          className="board"
          key={board.id}
          onDragOver={(e) => boardDragOverHandler(e)}
          onDrop={(e) => boardDropHanler(e, board)}
        >
          <h2 className="board__title">
            {board.id}. {board.title}
          </h2>
          {board.tasks.map((task) => (
            <p
              key={task.id}
              className="task"
              draggable
              onDragStart={(e) => dragStartHandler(e, board, task)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDrop={(e) => dropHandler(e, board, task)}
            >
              {task.id}. {task.title}
            </p>
          ))}
        </div>
      ))}
    </div>
  )
}

export default App
