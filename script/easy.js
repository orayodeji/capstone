const question = document.getElementById("question")
const choices = Array.from(document.getElementsByClassName("choice-text"))
const questionCounterText = document.getElementById("questionCounter")
const scoreText = document.getElementById("score")
const loader = document.getElementById("loader")

//To Show Display The Score
const short = document.getElementById("short")
  
let currentQuestion = {};
let selectAnswer = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];

fetch("https://opentdb.com/api.php?amount=20&category=21&type=multiple")
.then(res=>{
    return res.json();
})
.then(Datas =>{
   questions = Datas.results.map(data=>{
        const formattedQuestion = {
            question : data.question
        }

        const answerChoices = [...data.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random()*4)+1;
        answerChoices.splice(formattedQuestion.answer -1, 0, data.correct_answer)

        answerChoices.forEach((choice, index) =>{
            formattedQuestion["choice" + (index + 1)] = choice
    })
    return formattedQuestion
    })
    game.classList.remove("hidden")
    loader.classList.add("hidden")
    startGame()
})
.catch(err=>{
    alert("connect to your internet") 
    console.error(err)
})

const correct_bonus = 10;
const max_question = 20;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()
}


getNewQuestion = () =>{
    if(availableQuestions.length === 0 || questionCounter === max_question){
       saveScore()
        
         if(score < 90){
             short.innerHTML =`<h2>Your Score is ${score}</h2>`
            return setTimeout(()=>{
               return window.location.assign("/")
            },5000)
        } else {  short.innerHTML=`<h2>Good! Your Score is ${score}</h2>`
        return setTimeout(()=>{
            return window.location.assign("/")
        },5000)}       
       
    }
    
    questionCounter++
    questionCounterText.innerText = `${questionCounter}/ ${max_question} `

    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice=>{
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })
    availableQuestions.splice(questionIndex,1)
    selectAnswer = true
}

choices.forEach(choice =>{
    choice.addEventListener("click", e => {
        if(!selectAnswer) return;

        selectAnswer = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"]
       
       const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect" ;

    if(classToApply === "correct"){
     incrementScore(correct_bonus)}

     selectedChoice.parentElement.classList.add(classToApply)

     setTimeout(()=>{
         selectedChoice.parentElement.classList.remove(classToApply)
         getNewQuestion()
     },1000)

    })    
})

incrementScore = num =>{
    score += num;
    scoreText.innerText = score
}

//To save the scores in localStorage
const eHighScores = JSON.parse(localStorage.getItem("eHighScores")) || [];

saveScore = () =>{
    let easyScore = {
        category : "Easy",
        score : score
    }
    eHighScores.push(easyScore)
    eHighScores.sort((a,b) => b.score - a.score)
    eHighScores.splice(2)
    localStorage.setItem("eHighScores" , JSON.stringify(eHighScores))
}