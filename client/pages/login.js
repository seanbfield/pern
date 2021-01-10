import Head from 'next/head'
import styles from '../styles/default.module.css'
import { parseCookies } from 'nookies'
import { redirect } from '../utils'

const Login = (props)=> {


  return (
    <div className={styles.container}>
      <Head>
      <title>Login - PERN stack starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      <h1>Welcome to Nextjs OAuth with GitHub and Google</h1>

        
            <div>
              <a href={"http://localhost:3001/auth/github"} >Login using Github</a>
              <br/>
              <a href={"http://localhost:3001/auth/google"} >Login using Google</a>
            </div>

            <span>Or</span>

            <div>
              <a href={"/register"}>Create a new account</a>
            </div>
        
      </main>


    </div>
  )
}


Login.getInitialProps = (ctx) => {


  const { authorization } = parseCookies(ctx);
  const {token} = ctx.query

  if(token || authorization){
    console.log('there is a session, redirect')
    redirect(ctx, '/')
  }else{
    console.log('there is no session, stay')

  }


  return {
    authorization: authorization || token,
  };
}

export default Login