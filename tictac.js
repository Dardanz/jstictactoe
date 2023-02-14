const player = (sign) => {
    this.sign = sign;

    const getSign = () => { return sign };

    return { getSign };
};


const gameBoard = (() => {
    const board = ["X", "O", "X",
                   "O", "X", "O",
                   "O", "O", "X"];

    const getField = (position) => {
        return board[position];
    };

    return { getField };
})();


const displayController = (() => {
    const individualFields = document.querySelectorAll(".field");

    console.log("asdg");

    individualFields.forEach(
        (field) => 
            field.addEventListener("click", (e) => {
                updateGameboard();
            })
    );

    const updateGameboard = () => {
        for (let i = 0; i < individualFields.length; i++) {
            individualFields[i].textContent = gameBoard.getField(i);
        }
      };

})();