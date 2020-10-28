const nHighScores = JSON.parse(localStorage.getItem("nHighScores")) || [];
const eHighScores = JSON.parse(localStorage.getItem("eHighScores")) || [];
const hHighScores = JSON.parse(localStorage.getItem("hHighScores")) || [];


let easyScore = {
    category : "Medium",
    score : 0
}
nHighScores.push(easyScore)
localStorage.setItem("nHighScores" , JSON.stringify(nHighScores))

 easyScore = {
    category : "Easy",
    score : 0
}
eHighScores.push(easyScore)
localStorage.setItem("eHighScores" , JSON.stringify(eHighScores))

easyScore = {
    category : "Hard",
    score : 0
}
hHighScores.push(easyScore)
localStorage.setItem("hHighScores" , JSON.stringify(hHighScores))

const easyH = document.getElementById("easy")
const normalH = document.getElementById("normal")
const hardH = document.getElementById("hard")

easyH.innerText = `${eHighScores[0].category} - ${eHighScores[0].score} `
normalH.innerText = `${nHighScores[0].category} - ${nHighScores[0].score} `
hardH.innerText = `${hHighScores[0].category} - ${hHighScores[0].score} `