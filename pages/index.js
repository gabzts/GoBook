import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Header from '../src/components/Header'
import styles from '../styles/Home.module.css'
import fundo from '../src/images/fundoInicial.png'
import ccm from '../src/images/ccmpsc.png'

export default function Home() {
  
  return (
    <>
    <Header />
    <div className={styles.container}>
      <Head>
        <title>GoBook</title>
        <meta name="description" content="Book recommendation App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.index}>
        <Image src={fundo} 
        className={styles.ilustration}
        width={660}
        height={740}
        />

        <div className={styles.interact}>
          <h1 className={styles.title}>
          VAMOS DESCOBRIR UM NOVO LIVRO?
          </h1>

          <p className={styles.description}>
          Oi, eu sou a Bibi, sua parceira de leitura, vou te ajudar a descobrir qual é o livro ideal para você aproveitar uma boa leitura.
          <br/>
          <br/>
          Nesse quiz, nós iremos explorar seu gosto pessoal e lhe contar um pouco sobre nossa história do Conselho Comunitário dos Moradores do Parque Santa Cecília.
          </p>

          <div className={styles.action}>
            <button className={styles.bigButton}>
              <Link href="/questions">
                <a>COMEÇAR</a>
              </Link>
            </button>
          </div>

          <div className={styles.ccm}>
            <Image src={ccm}
              width={99}
              height={44}
              layout="fixed"
            />
          </div>
        </div>
      </main>
    </div>
  </>
  )
}
