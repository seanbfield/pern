import Head from 'next/head'
import styles from '../styles/default.module.css'
import fetch from 'isomorphic-fetch'
import { parseCookies } from 'nookies'
import React from 'react';
import { redirect } from '../utils'
import { API } from '../services';


class Home extends React.Component {

  constructor (props){
    super(props);
    this.state = { todos : props.todos || [], authorization : props.authorization, loaded : false }

    const instance = this;

    setTimeout(function(){
      instance.setState( { loaded : true })
    }, 2000)


  }

  handleTextChange = (idx, task, e) =>{
    task.text = e.target.value
    let value = this.state.todos
    value[idx] = task
    this.setState({ todos : value })
    console.log('akdlfsjfksf', this.state)
  }

  handleStatusChange = (idx, task, e) =>{
    task.complete = e.target.checked
    let value = this.state.todos
    value[idx] = task
    this.setState({ todos : value })
  }


  handleCreate = async ()=>{
    let collection = this.state.todos

    const created = await API.task.create( this.state.authorization, { text : "New task" } )
    
    if(Array.isArray(collection)){
      collection.push(created)
    }else{
      collection = [ created ]
    }

    this.setState({ todos : collection })

  }

  handleUpdate = async (idx, task, e)=>{

    console.log(task)
    
    const res = await API.task.update( this.state.authorization, task)
    
    console.log('res', res)

    let collection = this.state.todos

    if(Array.isArray(collection)){
      collection[idx] = task
    }else{
      collection = [ task ]
    }

    this.setState( { todos : collection })

  }

    
  handleDelete = async (idx, task, e)=>{
    
    await API.task.delete( this.state.authorization, task)
    
    let collection = this.state.todos

    if(Array.isArray(collection)){
      collection.splice(idx, 1)
    }else{
      collection = []
    }

    this.setState({ todos : collection })
    console.log(this.state)
  }



  render(){

    if(!this.state.loaded){ return null }

    return (
      <div className={styles.container}>
        <Head>
          <title>PERN stack starter</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>

          <h2>Try adding, updating, completing and removing tasks</h2>
          
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

        </main>

        <footer className={styles.footer}>
          <a href="/logout">Logout</a>
        </footer>
      </div>
    )
  }
}


async function getUser(authorization) {
  

  const res = await fetch('http://localhost:3001/api/self', { headers: { authorization } })
  
  try{
    if(res.status === 200) return { authorization, user: await res.json() }
  }catch(e){
    return {authorization}
  }

}


export async function getServerSideProps (ctx) {

  const { authorization } = parseCookies(ctx);
  const {token} = ctx.query

  let data = { props : {} }


  if(!(token || authorization)){
    redirect(ctx, '/login')
  }
  
  try{

    const res = await API.task.findMany(authorization)
    
    data.props = { ...data.props, ...(await getUser(authorization || token)), todos : res }

    
  }catch(err){
    redirect(ctx, '/login')
  }

  return data
}

export default Home