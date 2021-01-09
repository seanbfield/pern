import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { parseCookies } from 'nookies'


export function redirect(ctx, path) {
  const { res } = ctx;
  if (res) {
    res.writeHead(301, { Location: path });
    res.end();
  }
}

const Login = (props)=> {


  return (
    <div className={styles.container}>
      <Head>
      <title>Register - PERN stack starter</title>
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
              <a href={"/login"}>Login with your existing account</a>
            </div>
        
      </main>


    </div>
  )
}


Login.getInitialProps = (ctx) => {


  const { authorization } = parseCookies(ctx);
  const {token} = ctx.query

  if(token || authorization){
    redirect(ctx, '/')
  }

  return {
    authorization: authorization || token,
  };
}

export default Login