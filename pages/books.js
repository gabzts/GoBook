import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../src/components/Header'
import styles from '../styles/Home.module.css'

export default function Books() {
  return (
    <div className={styles.container}>
      <Head>
        <title>GoBook</title>
        <meta name="description" content="Book recommendation App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div>
            <h1 className={styles.title}>
                Go<b>Book</b>
            </h1>
        </div>

        <div className={styles.book}>
            <a href="#">
                <h2>Aqui é onde o livro vai ficar</h2>
            </a>
        </div>
        
        <div>
            <p className={styles.description}>Aqui vai a localização!</p>
        </div>

        <button className={styles.bigButton}>
            <Link href="/">
                <a>Refazer teste!</a>
            </Link>
        </button>
      </main>

      <footer className={styles.footer}>
        <p>Obrigado por utilizar o GoBook!</p>
      </footer>
    </div>
  )
}
