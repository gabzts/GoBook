import Head from 'next/head'
import Image from 'next/image'
import fundo from '../src/images/fundoInicial.png'
import { useState, useEffect } from 'react'
import Header from '../src/components/Header'
import styles from '../styles/Home.module.css'
import Router from 'next/router'

export default function Questions() {
  //guardando as respostas escolhidas
  var [choices, setChoices] = useState([]);

  //verificando se as questões terminaram para calcular os resultados
  const [finalizado, setFinalizado] = useState(false)

  //mudando a questão que aparece na tela
  const [currentQuestion, setCurrentQuestion] = useState(0);

  //para desabilitar os botões após o quiz ser finalizado
  let disable;

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

  //inicializando as questões
  useEffect(()=>{
    getQuestion()
  },[])

  //atualizando as respostas
  useEffect(() => {
    console.log(choices);
  },[currentQuestion])

  //coletando os resultados
  useEffect(() => {
    if (finalizado == true) {
      generateResults(choices)
      disable = {display: 'none'};
    }
  },[finalizado])

  //para a seleção de respostas
  const handleAnswerButtonClick = (e, value) => {
    //mudando a pergunta atual
    const nextQuestion = currentQuestion + 1;
    //armazenando a resposta
    setChoices((arr) => [...arr, value])

    //verificando se as questões terminaram
    const timer = setTimeout(() => {
        if(nextQuestion < question.length){
        setCurrentQuestion(nextQuestion);

      } else {
        setCurrentQuestion(1);
        setFinalizado(true) //------
      }
    }, 800)
  }

  const prevQuestion = () =>{
    //verificar se é a primeira questão
    if(currentQuestion != 0){
      //tirando o último valor das escolhas
      const tirarUltimaEscolha = choices.filter(ultimaEscolha)
      setChoices((arr) => [...tirarUltimaEscolha])

      //setando a questão para voltar a anterior
      const previousQuestion = currentQuestion - 1;
      setCurrentQuestion(previousQuestion)
    }
  }
  //verificar se o elemento do array é o último
  function ultimaEscolha(value) {
    return value != choices[choices.length - 1];
  }

  //analisar e enviar resultados para a página final
  const generateResults = (choices) => {
    //const arr = ['1', '1', '2', '2', '2'];
    //criando um array para os gêneros
    var genero = choices.filter((objEscolha) => {
      if (objEscolha == "Investigação" || 
      objEscolha == "Romance" || 
      objEscolha == "Terror" || 
      objEscolha == "Literatura Regional" || 
      objEscolha == "Fantasia") {
        return true;
      }  
    })

    //criando um array para os tamanhos
    var tamanho = choices.filter((objEscolha) => {
      if (objEscolha == "Curta" || 
      objEscolha == "Mediana"|| 
      objEscolha == "Longa") {
        return true;
      }     
    })

    const arrayDeObjsGenero = countItems(genero);
    const arrayDeObjsTamanho = countItems(tamanho);

    //atribuindo valor dos mais escolhidos
    var generoMaisEscolhido = arrayDeObjsGenero.sort((a, b) => b.quantidade - a.quantidade);
    generoMaisEscolhido = generoMaisEscolhido[0].tag;
    var tamanhoMaisEscolhido = arrayDeObjsTamanho.sort((a, b) => b.quantidade - a.quantidade);
    tamanhoMaisEscolhido = tamanhoMaisEscolhido[0].tag;

    Router.push(`/books/${generoMaisEscolhido}/${tamanhoMaisEscolhido}`);

  }

  //função responsável por contar os itens do array, criando objetos
  function countItems(arr) {
    const countMap = Object.create(null);
  
    for (const element of arr) {
      // Basicamente, estamos dizendo: atribua à `countMap[element]` o valor atual (ou zero, caso não existir) somado ao número 1.
      countMap[element] = (countMap[element] || 0) + 1;
    }
  
    return Object.entries(countMap).map(([value, count]) => ({
      tag: value,
      quantidade: count
    }));
  }

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
          {
            //foto da questão
            finalizado == false && question && question.length>0 && question[currentQuestion]!=null 
            ? <div className={styles.questionImg}>
                <Image src={question[currentQuestion].picture} 
                className={styles.ilustration}
                width={800}
                height={860}
                objectFit="fill"
                quality={100}
                />
              </div>
            : <p>Carregando!</p> 
          }
        
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
              finalizado == false && question && question.length>0 && question[currentQuestion]!=null 
              ? <p className={styles.question} key={question[currentQuestion].id}>
                  {question[currentQuestion].questionText}
                </p>
              : <p>Carregando!</p> 
            } 

            <div className={styles.grid}>
              {finalizado == false && question[currentQuestion]!=null ? question[currentQuestion].answers.map((itemAtual) => {
                  return (
                    <button key={itemAtual.id} className={styles.ansButton} onClick={(e)=> handleAnswerButtonClick(e, itemAtual.tag)}>
                      {itemAtual.icon !== "" ? 
                      <Image src={itemAtual.icon}
                      alt="ícone da pergunta"
                      className={styles.respImg}
                      width={100}
                      height={100}
                      quality={100}
                      />
                       : ""
                      }
                      <p key={itemAtual.id}>{itemAtual.answer}</p>
                    </button>
                  )
                }) : 
                  <p>Carregando!</p>
                }
            </div>

            <div className={styles.action} style={disable}>
              <button className={styles.answerActionsButtons} onClick={() => prevQuestion()}>
                Voltar
              </button>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}
