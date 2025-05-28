// Get the game mode from localStorage ("single" or "double")
// const gameMode = localStorage.getItem("mode") || "double"; // default double player

// // Flag to track if AI should play (true if single player mode and AI's turn)
// let isAITurn = false;

let isSinglePlayer = false;

const gameMode = localStorage.getItem("gameMode");
if (gameMode === "single") {
  isSinglePlayer = true;
} else {
  isSinglePlayer = false;
}

window.onload = () => {
  resetGame(); // Or the function that sets up your game board
};








let boxes = document.querySelectorAll(".box"); 
let resetBtn = document.querySelector("#reset");
let newGame =   document.querySelector("#newGame");
let new_game = document.querySelector("#new_game") ;
let msg_container = document.querySelector(".msg-container") ;
let msg =  document.querySelector("#msg") ;


let turnO = true;  //  playerX  , playerO  


const winPattern  = [
    [0,1,2] ,
    [0,3,6] ,
    [0,4,8] ,
    [1,4,7] , 
    [2,5,8] ,
    [2,4,6] ,
    [3,4,5] ,
    [6,7,8]
];


// let moveCount = 0;
// boxes.forEach( (box) => {
//     box.addEventListener("click" , () => {
//       // console.log("box was print") ;

//       if(turnO == true)
//       {
//         box.innerText = "O" ;
//         turnO = false ;
//       }
//       else  
//       {
//         box.innerText = "X" ;
//         turnO = true ;
//       } 

//       box.disabled = true;  
//       moveCount ++ ;
//       checkWinner() ;
          
//     });
// }) ;



/*  For the mode selection code  */

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // If box already clicked or game ended, do nothing
    if (box.disabled) return;
    if (flag) return;  // flag means game over

    // Player's move
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }

    box.disabled = true;
    moveCount++;
    checkWinner();

    // If single player and game not ended, trigger AI move after short delay
    if (gameMode === "single" && !flag && moveCount < 9) {
      isAITurn = true;
      setTimeout(aiMove, 500);
    }
  });
});



function aiMove() {
  if (!isAITurn) return;

  // Find all empty boxes
  let emptyBoxes = [];
  boxes.forEach((box, index) => {
    if (box.innerText === "" && !box.disabled) {
      emptyBoxes.push(index);
    }
  });

  if (emptyBoxes.length === 0) return;

  // Pick random empty box
  const randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  boxes[randomIndex].innerText = "X";
  boxes[randomIndex].disabled = true;

  turnO = true; // back to player O's turn
  moveCount++;
  checkWinner();

  isAITurn = false;
}







/* Disable Boxes so further not clcik the button after winner */
const disableBoxes  = () => {
    for(let box  of boxes)
    {
      box.disabled = true ; 
    }
}


const enableBoxes = () => {
    for(let box  of boxes)
    {
        box.disabled = false ;
        box.innerText = "" ;  
    }
}



const resetGame = () => {
  turnO = true ;
  enableBoxes() ;
  msg_container.classList.add("hide") ;
  moveCount = 0 ;
  flag =  false;
}



/* For Showing the Winner */  
const showWinner = (winner) => {
  msg.innerText = `Congratulation , Winner is ${winner} 🔥🔥🔥` ;
  msg_container.classList.remove("hide") ;
  disableBoxes() ;
};

const showDraw = () => {
  msg.innerText = `Game is Draw.`
}


let flag  =  false ;
const checkWinner = () => {
  for(let pattern of winPattern)
  {
   let post1Val = boxes[pattern[0]].innerText ; 
   let post2Val = boxes[pattern[1]].innerText ; 
   let post3Val = boxes[pattern[2]].innerText ;
    
   if(post1Val != ""  && post2Val != "" && post3Val != "")
   {
    if(post1Val == post2Val && post2Val == post3Val)
    {
        // console.log("Winner" , post1Val) ;
        showWinner(post1Val) ;
        flag = true ;
        return ;
    }
   }

  }


if(moveCount == 9 &&  flag  ==  false)
  {
    showDraw() ;
    msg_container.classList.remove("hide") ;
    disableBoxes();
  }  
}


  
new_game.addEventListener("click" , resetGame) ;
resetBtn.addEventListener("click" , resetGame) ;






