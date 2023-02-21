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
        if (gameOver) {
            console.log("The game is over. Please start a new game.");
            return;
        }
        if (gameBoard.getField(fieldPosition) !== "") {
            console.log("This field is already taken. Please choose another one.");
            return;
        }
        gameBoard.setField(fieldPosition, getCurrentPlayerSign());
        round++;
        console.log(`Player ${getCurrentPlayerSign()} played at position ${fieldPosition}`);
        checkForWinner();
    };
    

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerOne.getSign() : playerTwo.getSign();
    };

    const checkForWinner = () => {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];

        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            const fieldA = gameBoard.getField(a);
            const fieldB = gameBoard.getField(b);
            const fieldC = gameBoard.getField(c);

            if (fieldA !== "" && fieldA === fieldB && fieldA === fieldC) {
                gameOver = true;
                console.log(`Player ${getCurrentPlayerSign()} wins!`);
                return;
            }
        }

        if (round > 9) {
            gameOver = true;
            console.log("It's a tie!");
        }
    };

    console.log("Game controller created");

    return { playRound };
})();
