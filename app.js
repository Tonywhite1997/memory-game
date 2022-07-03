const cards = document.querySelectorAll(".card")


let storedMoves = JSON.parse(localStorage.getItem("moves")) || ""

const bestMove =document.querySelector(".best__move")
const lastMove =document.querySelector(".last__move")

function showMoves(){
    let storedBestMoves = storedMoves.best? storedMoves.best : ""
    let storedLastMoves = storedMoves.last? storedMoves.last : ""

    bestMove.innerText = `Best Moves: ${storedBestMoves}` 
    lastMove.innerText = `Last Moves: ${storedLastMoves}` 
}

showMoves()


let clickCounter = 0 
let movesCounter = 0
let correctCardCount = 0

function revealCard(card){
    card.classList.add("reveal")
}

function trackMoves(userMoves){
    let last = userMoves + 1
    let best = last < storedMoves.best ? last : storedMoves.best

    let moves ={
        best: best || last,
        last
    }

    localStorage.setItem("moves", JSON.stringify(moves))
}


let firstCardValue;
let secondCardValue;
let firstCardIndex;
let secondCardIndex;

cards.forEach((card, cardIndex)=>{
    card.addEventListener("click", ()=>{
        clickCounter += 1

        if(clickCounter === 1){
            firstCardValue = card.dataset.value
            firstCardIndex = cardIndex
            movesCounter += 1
            revealCard(cards[firstCardIndex])
        }

        if(clickCounter === 2 && cardIndex !== firstCardIndex){
            secondCardValue = card.dataset.value
            secondCardIndex = cardIndex
            movesCounter += 1
            revealCard(cards[secondCardIndex])
        }
        
        if(clickCounter === 2 && cardIndex === firstCardIndex){
            return clickCounter = 1
        }

        if(clickCounter === 2 && firstCardValue !== secondCardValue){
            return setTimeout(()=>{
                cards[firstCardIndex].classList.remove("reveal")
                cards[secondCardIndex].classList.remove("reveal")
                clickCounter = 0
            },1000)
        }

        if(clickCounter === 2 && firstCardIndex !== secondCardIndex && firstCardValue === secondCardValue){
            return setTimeout(()=>{
                cards[firstCardIndex].style.display = "none"
                cards[secondCardIndex].style.display = "none"
                correctCardCount += 1
                clickCounter = 0
            }, 1000)
        }

        if(correctCardCount === 7){
            trackMoves(movesCounter)
            setTimeout(()=>{
                alert(`Game completed with ${movesCounter} moves`)
                location.reload();
            }, 5000)
        }   
    })
    
})

