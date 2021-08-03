import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../src/components/Header'
import styles from '../styles/Home.module.css'

export default function Questions() {
  //guardando as respostas escolhidas
  var [choices, setChoices] = useState([]);

  //mudando a questão que aparece na tela
  const [currentQuestion, setCurrentQuestion] = useState(0);

  //pegando as questões do JSON
  const [question,setQuestion]=useState([]);
  const getQuestion=()=>{
    fetch('questions.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        //console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        //console.log(myJson);
        setQuestion(myJson)
      });
  }

  useEffect(()=>{
    getQuestion()
  },[])
  //

  const handleAnswerButtonClick = (e, value) => {
    //mudando a pergunta atual
    const nextQuestion = currentQuestion + 1;

    //verificando se as questões terminaram
    if(nextQuestion < question.length){
      setCurrentQuestion(nextQuestion);

      //armazenando a resposta
      setChoices( (arr) => [...arr, value])
      console.log(choices);
    } else {
      console.log('Escolhas: ' + choices)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>GoBook</title>
        <meta name="description" content="Book recommendation App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
      
        {
          question && question.length>0 && question[currentQuestion]!=null 
          ? <p className={styles.question}>
              {question[currentQuestion].questionText}
            </p>
          : <p>Carregando!</p> } 

        <div className={styles.grid}>
          {question[currentQuestion]!=null ? question[currentQuestion].answers.map((itemAtual) => {
              return (
                <button className={styles.ansButton} onClick={(e)=> handleAnswerButtonClick(e, itemAtual.answer)}>
                  <p>{itemAtual.answer}</p>
                </button>
              )
            }) : 
              <p>Carregando!</p>
            }
        </div>
      </main>
      
      <footer className={styles.footer}>
        {
          question && question.length>0 && question[currentQuestion]!=null && <p className={styles.dica}>Hey! Dica: <b>{question[currentQuestion].tip}</b></p>
        }
      </footer>
    </div>
  )
}
