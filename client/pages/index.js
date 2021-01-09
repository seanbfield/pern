import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from 'isomorphic-fetch'
import { parseCookies } from 'nookies'
import React from 'react';


export function redirect(ctx, path) {
  const { res } = ctx;
  if (res) {
    res.writeHead(301, { Location: path });
    res.end();
  }
}

class Home extends React.Component {

  constructor (){
    super();
    this.state = { todos : [ { text : 'hola', complete : true }, { text : 'mundo', complete : false } ] };
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

  handleAdd = ()=>{
    let value = this.state.todos
    value.push({ text : 'New task', complete : false })
    this.setState({ todos : value })
  }

  render(){

    
    return (
      <div className={styles.container}>
        <Head>
          <title>PERN stack starter</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>

          <h1>Hi {this.props.user.oAuthData.displayName}, Welcome to Nextjs OAuth with GitHub and Google</h1>
          <h2>Try adding, updating, completing and removing tasks</h2>
          
          <ul style={ {width:'100%'}}>
            {this.state.todos.map( (task, i) => {
              return (
                <li style={ { display:'flex', alignItems : 'center', justifyContent : 'space-around', width : '100%' } } key={i}>
                  <input type="text" style={{width:'100%'}} value={task.text} onChange={  this.handleTextChange.bind(this, i, task) }  />
                  <input type="checkbox" style={{margin:'0em 2em'}} checked={task.complete} onChange={ this.handleStatusChange.bind(this, i, task) }/>
                  <button onClick={this.handleDelete.bind(this, i, task)}>🗑</button>
                </li>
              )
            })}
          </ul>

          <button onClick={this.handleAdd}>➕</button>

          {JSON.stringify(this.state.todos)}

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
    
    if(res.status === 200) return { authorization, user: await res.json() }
    else return {authorization}
  
}



// Home.getInitialProps = async (ctx) => {
export async function getServerSideProps (ctx) {

  const { authorization } = parseCookies(ctx);
  const {token} = ctx.query

  if(!(token || authorization)){
    redirect(ctx, '/login')
  }

  const props = await getUser(authorization || token)

  return { props }
}

export default Home