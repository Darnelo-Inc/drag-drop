export interface IBoard {
  id: number
  title: string
  tasks: ITask[]
}

export interface ITask {
  id: number
  title: string
}
