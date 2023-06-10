import { useState, DragEvent } from "react"
import "./App.css"

function App() {
  const [drag, setDrag] = useState<boolean>(false)

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true)
  }

  const dragLeaveHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }

  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)

    const data = e.dataTransfer.files
    console.log(data)

    const formData = new FormData()
    formData.append("image", data[0])
    formData.append("author", "darnelo")

    // formData can be send
  }

  return (
    <div className="app">
      {drag ? (
        <div
          className="drop-area"
          onDrop={(e) => dropHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
        >
          Drop file for upload
        </div>
      ) : (
        <div onDragOver={(e) => dragOverHandler(e)}>Move file for upload</div>
      )}
    </div>
  )
}

export default App
