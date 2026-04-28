let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("reset-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");
let count = 0; //to track the number of moves

let turnO = true; //player X, player O

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.textContent === "") {
            if (turnO) {
                box.textContent = "O";
                turnO = false;
            } else {
                box.textContent = "X";
                turnO = true;
            }
        }
        count++;
        checkWinner();
    });
});

const checkWinner = () => {
    let isWinner = false;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes [pattern[1]].innerText;
        let pos3Val = boxes [pattern[2] ].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "" ){
           if (pos1Val === pos2Val && pos2Val === pos3Val) {
                isWinner = true;

                disabledBoxes();
                msg.textContent = `Congratulations, ${pos1Val} wins!`;
                msgContainer.classList.remove("hide");
                return;
            }
        }
    }
    if (count === 9 && !isWinner) {
        disabledBoxes();
        msg.textContent = "It's a draw!";
        msgContainer.classList.remove("hide");
    }   

};

const disabledBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};


resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.textContent = "";
        box.disabled = false;
    });
    msgContainer.classList.add("hide");
    count = 0;
    turnO = true;
});




