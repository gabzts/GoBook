import Head from 'next/head'
import Image from 'next/image'
import fundo from '../src/images/fundoInicial.png'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Header from '../src/components/Header'
import styles from '../styles/Home.module.css'
import Router from 'next/router'

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
      Router.push('/books')
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

      <main className={styles.index}>
        <div className={styles.questionImg}>
          <Image src={fundo} 
          className={styles.ilustration}
          width={700}
          height={655}
          />
        </div>
      
        <div className={styles.interact}>
          {
            //PROGRESSO DO QUIZ
            question && question.length>0 && question[currentQuestion]!=null 
            ? <p className={styles.progress}>
                Pergunta {currentQuestion+1} de {question.length}
              </p>
            : <p>Carregando!</p> 
          } 

          <div className={styles.slider}>
            
          </div>

          {
            //ENUNCIADO DA QUESTÂO
            question && question.length>0 && question[currentQuestion]!=null 
            ? <p className={styles.question} key={question[currentQuestion].id}>
                {question[currentQuestion].questionText}
              </p>
            : <p>Carregando!</p> 
          } 

          <div className={styles.grid}>
            {question[currentQuestion]!=null ? question[currentQuestion].answers.map((itemAtual) => {
                return (
                  <button key={itemAtual.id} className={styles.ansButton} onClick={(e)=> handleAnswerButtonClick(e, itemAtual.answer)}>
                    <Image src={itemAtual.picture}
                    alt="ícone da pergunta"
                    className={styles.respImg}
                    width={70}
                    height={70}
                    />
                    <p key={itemAtual.id}>{itemAtual.answer}</p>
                  </button>
                )
              }) : 
                <p>Carregando!</p>
              }
          </div>

          <div className={styles.action}>
            <button className={styles.answerActionsButtons}>
              Voltar
            </button>

            <button className={styles.answerActionsButtons}>
              Próximo
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
