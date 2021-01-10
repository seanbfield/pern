import React from 'react'
import { API } from '../services'

class List extends React.Component {

    constructor (props){
      super();
      this.state = { todos : props.todos }
    }
  
    handleTextChange = (idx, task, e) =>{
      task.text = e.target.value
      let value = this.state.todos
      value[idx] = task
      this.setState({ todos : value })
    }
  
    handleStatusChange = (idx, task, e) =>{
      task.complete = e.target.checked
      let value = this.state.todos
      value[idx] = task
      this.setState({ todos : value })
    }
  
    handleDelete = (idx, task, e)=>{
      let value = this.state.todos
      value.splice(idx, 1)
      this.setState({ todos : value })
    }
  
    handleCreate = async ()=>{
      // let value = this.state.todos

      const created = await API.task.create( { body : { text : "New task" } })


      // if(value){
      //   value.push(created)
      // }
      // this.setState({ todos : value })
    }
  
    handleUpdate = async (idx, task, e)=>{
      return await API.task.update(task.id, task)
    }

   

    render(){
        return (
            <div style={ {width:'100%', display : 'flex', flexDirection : 'column'}}>

            <ul style={ {width:'100%'}}>
            {this.state.todos.map( (task, i) => {
                return (
                    <li style={ { display:'flex', alignItems : 'center', justifyContent : 'space-around', width : '100%' } } key={i}>
                  <input type="text" style={{width:'100%'}} value={task.text} onChange={  this.handleTextChange.bind(this, i, task) }  />
                  <input type="checkbox" style={{margin:'0em 2em'}} checked={task.complete} onChange={ this.handleStatusChange.bind(this, i, task) }/>
                  <button onClick={this.handleDelete.bind(this, i, task)}>🗑</button>
                  <button onClick={this.handleUpdate.bind(this, i, task)}>💾</button>
                </li>
              )
            })}
          </ul>

          <button onClick={this.handleCreate}>➕</button>

        </div>
        )
    }

}

export default List