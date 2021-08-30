import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import Header from '../../../src/components/Header'
import styles from '../../../styles/Home.module.css'
import coruja from '../../../src/images/coruja.png'
import local from '../../../src/images/local.png'
import LArrow from '../../../src/images/LArrow.svg'
import RArrow from '../../../src/images/RArrow.svg'
import { connectToDatabase } from "../../../lib/connect";

export default function Tamanho( {livros} ) {
  const [livroAtual, setLivroAtual] = useState(0)
  console.log(livros)

  // const PassarLivro = (e) => {
  //   console.log(livroAtual)

  //   const proximoLivro = livroAtual + 1
  //   if(livroAtual < (livros.length - 1)){
  //     setLivroAtual(proximoLivro)
  //   }else{
  //     setLivroAtual(livroAtual)
  //   }
  // }

  // const VoltarLivro = (e) => {
  //   console.log(livroAtual)

  //   const proximoLivro = livroAtual - 1
  //   if(livroAtual > 0){
  //     setLivroAtual(proximoLivro)
  //   }else{
  //     setLivroAtual(livroAtual)
  //   }
  // }



  return (
    <>
      <Header/>

      <Head>
          <title>GoBook</title>
          <meta name="description" content="Book recommendation App" />
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>

          <div className={styles.result}>
            <div className={styles.coruja}>
                  <Image src={coruja}
                  width={84}
                  height={96}
                  quality={100}
                />
            </div>
            <div>
              <p>Seu livro é do gênero de</p>
              <p><b>{livros[livroAtual].genero}</b></p>
            </div>
          </div>

          <div className={styles.book}>
            <div className={styles.quadroLivro}>
              <div className={styles.livros}>
                    {/* <button className={styles.arrow} onClick={(e) => VoltarLivro(e)}>
                      <Image src={LArrow}
                        width={15}
                        height={15}
                      />
                    </button> */}

                    <div className={styles.capa}>
                      <Image src={livros[livroAtual].image_url}
                        width={180}
                        height={255}
                        quality={100}
                      />
                    </div>

                    {/* <button className={styles.arrow} onClick={(e) => PassarLivro(e)}>
                      <Image src={RArrow}
                        width={15}
                        height={15}
                      />
                    </button> */}
              </div>

              <div className={styles.info}>
                <div className={styles.head}>
                  <p className={styles.tituloLivro}>{livros[livroAtual].nome}</p>
                  <p className={styles.escritor}>{livros[livroAtual].autor}</p>
                </div>

                <p className={styles.sinopse}>
                  {livros[livroAtual].sinopse}
                </p>
              </div>
            </div> 
          </div>
        </main>

        <div className={styles.footer}>
          
          <div className={styles.description}>
            <Image src={local}
              width={45}
              height={32}
            />
            <div className={styles.local}>
              <p><b>Biblioteca Fátima Costa</b></p>
              <p>Rua Oscar Araripe, 2173 - Bom Jardim, Fortaleza - CE</p>
            </div>
          </div>

          <hr></hr>

          <button className={styles.bigButton}>
              <Link href="/">
                  <a>Recomeçar</a>
              </Link>
          </button>
        </div>
      </div>
    </>
  )
}

//pegando os dados do banco de dados
export async function getServerSideProps(params) {
  const { db } = await connectToDatabase();

  const text = await db.collection("Livros").createIndex( {tag_tam: "text"} )

  //params pega o que veio no slug, a rota
  //console.log(params.query)
  const query = params.query;

  const livros = await db
    .collection("Livros")
    .find
    (
      {tag_gen: query.genero , $text: { $search: query.tamanho } }
    )
   .sort( { score: { $meta: "textScore" } } )
   .toArray();

  return {
    props: {
      livros: JSON.parse(JSON.stringify(livros)),
    },
  };
}