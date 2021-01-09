import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { destroyCookie, parseCookies } from 'nookies'


const Logout = (props)=> {

  destroyCookie({}, 'authorization', { path : '/'})

  return (
    <div className={styles.container}>
      <Head>
        <title>Logged out! - PERN stack starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      <h1>Logged out successfully</h1>

      <a href="/login">Login</a>
        
      </main>

    </div>
  )
}



export default Logout