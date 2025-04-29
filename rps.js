//Score save

let score = JSON.parse(localStorage.getItem('score'))

if(!score) {
   score = {
      wins: 0,
      losses: 0,
      ties: 0
   }
}

updateScore()

//Computer move
let compMove = ''

function pickComputerMove() {
   const randomNumber = Math.random() ;

   if(randomNumber >= 0 && randomNumber < 1/3) {
      compMove = 'rock'
   }else if(randomNumber >= 1/3 && randomNumber < 2/3) {
      compMove = 'paper'
   }else if(randomNumber >= 2/3 && randomNumber < 1) {
      compMove = 'scissors'
   }

   return compMove;
}

   //Auto PLay
let isAutoPlaying = false;
let intervalId

function autoPlay() {
   if(!isAutoPlaying) {
      intervalId = setInterval(function() {
         const playerMove = pickComputerMove()
         playGame(playerMove)
      }, 1000)
      isAutoPlaying = true
   }else {
      clearInterval(intervalId)
      isAutoPlaying = false 
   }

}


//Player move
function playGame(playerMove) {
   pickComputerMove()

   let result = ''

   if (playerMove === 'scissors') {
      if (compMove === 'rock') {
         result = 'You Lose'
      }else if(compMove === 'paper') {
         result = 'You Win'
      }else if(compMove === 'scissors') {
         result = 'Tie'
      }

   } else if (playerMove === 'paper') {
      if (compMove === 'rock') {
         result = 'You Win'
      }else if(compMove === 'paper') {
         result = 'Tie'
      }else if(compMove === 'scissors') {
         result = 'You Lose'
      }

   }else if(playerMove === "rock") {
      if (compMove === 'rock') {
         result = 'Tie'
      }else if(compMove === 'paper') {
         result = 'You Lose'
      }else if(compMove === 'scissors') {
         result = 'You Win'
      }
   }

//Score
   if(result === 'You Win') {
      score.wins += 1;
   }else if (result === 'You Lose') {
      score.losses += 1;
   }else if(result === 'Tie') {
      score.ties += 1;
   }

   localStorage.setItem('score' , JSON.stringify(score)/*Преобразовывает объект в строку*/)
   //локальное хранилище

   updateScore()

            
//Result
   document.querySelector('.js-result').innerHTML = result

   document.querySelector('.js-moves').innerHTML = `You
      <img src="images/${playerMove}-emoji.png" class="move-icon">
      <img src="images/${compMove}-emoji.png" class="move-icon">
      Computer`
   }

   
   function updateScore() {
         document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
