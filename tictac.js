const player = (sign) => {
    this.sign = sign;

    const getSign = () => { return sign };

    return { getSign };
};


const gameBoard = (() => {
    const board = ["", "", "",
                   "", "", "",
                   "", "", ""];

    const setField = (position, playerSign) => {
        board[position] = playerSign;
    }

    const getField = (position) => {
        return board[position];
    };

    return { getField, setField };
})();


const displayController = (() => {
    const individualFields = document.querySelectorAll(".field");

    individualFields.forEach(
        (field) =>             
            field.addEventListener("click", (e) => 
                {
                    if (e.target.textContent !== "") return;
                    gameController.playRound(e.target.dataset.index);
                    updateGameboard();
                }
            )
    );

    const updateGameboard = () => {
        for (let i = 0; i < individualFields.length; i++) {
            individualFields[i].textContent = gameBoard.getField(i);
        }
      };       
      
})();

const gameController = (() => {
    const playerOne = player("X");
    const playerTwo = player("O");
    let round = 1;
    let gameOver = false;
    
    const playRound = (fieldPosition) => {
        gameBoard.setField(fieldPosition, getCurrentPlayerSign());
        round++;
    }

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerOne.getSign() : playerTwo.getSign();
    };

    

    return { playRound };
})();
