import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import './style/BSticker.css'
import ButtonCheckDiv from './ShowHideBlock'
console.clear()

const TodoForm = ({addTodo}) => {
  // Input Tracker
  let input
  // Return JSX
  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      addTodo(input.value)
      input.value = ''
      }}>
      <input className="form-control col-md-12" ref={node => {
        input = node
      }} />
      <br />
    </form>
  )
}

const Todo = ({todo, remove}) => {
  // Each Todo
  return (<a href="#" className="list-group-item" onClick={() => { remove(todo.id) }}>{todo.text}</a>)
}

const TodoList = ({todos, remove}) => {
  // Map through the todos
  const todoNode = todos.map((todo) => {
    return (<Todo todo={todo} key={todo.id} remove={remove}/>)
  })
  return (<div className="list-group" style={{marginTop: '30px'}}>{todoNode}</div>)
}

// Contaner Component
// Todo Id
window.id = 0
class TodoApp extends React.Component {
  constructor (props) {
    // Pass props to parent class
    super(props)
    // Set initial state
    this.state = {
      data: []
    }
    this.apiUrl = 'awdwahttp://127.0.0.1:5000/foo'
  }
  // Lifecycle method
  componentDidMount () {
    // Make HTTP reques with Axios
    axios.get(this.apiUrl)
      .then((res) => {
        // Set state with result
        console.info(res)
        this.setState({data: res.data})
      })
  }
  // Add todo handler
  addTodo (val) {
    // Assemble data
    const todo = {text: val}
    // Update data
    axios.post(this.apiUrl, todo)
      .then((res) => {
        console.log(res)
        this.state.data.push(res.data)
        this.setState({data: this.state.data})
      })
  }
  // Handle remove
  handleRemove (id) {
    // Filter all todos except the one to be removed
    const remainder = this.state.data.filter((todo) => {
      if (todo.id !== id) return todo
    })
    // Update state with filter
    axios.delete(this.apiUrl + '/' + id)
      .then((res) => {
        this.setState({data: remainder})
      })
  }
/*
//внутри туду
  <TodoForm addTodo={this.addTodo.bind(this)}/>
        <TodoList
          todos={this.state.data}
          remove={this.handleRemove.bind(this)}
        />*/
  render () {
    // Render JSX
    return (
      <div id = "ToDo">
      </div>
    )
  }
}


export default TodoApp
