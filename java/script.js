document.addEventListener('DOMContentLoaded', function () { 
    let currentPlayer = "red";

    function currentPlayerPiece(piece) {
        return piece.classList.contains(currentPlayer);
    }

    const pieces = document.querySelectorAll(".piece");
    const squares = document.querySelectorAll(".square1");
    let selectedPiece = null;

    pieces.forEach(piece => {
        piece.addEventListener("click", function (event) {
            if (currentPlayerPiece(piece)) {
            event.stopPropagation();

            if(selectedPiece) {
                selectedPiece.classList.remove("selected");
            }

            piece.classList.add("selected");
            selectedPiece = piece
            } else if (selectedPiece) {
                const selectedSquare = document.querySelector(".square1.selected");
                if (isValidMove(selectedPiece, selectedSquare)) {
                    selectedSquare.appendChild(selectedPiece);
                    selectedPiece.classList.remove("selected");

                    currentPlayer = currentPlayer === "red" ? "blue" : "red";
                    selectedPiece = null;
                }
            }
        });
    });

    squares.forEach(square => {
        square.addEventListener("click", function () {
            if (selectedPiece && isValidMove(selectedPiece, square)) {
                square.appendChild(selectedPiece);
                selectedPiece.classList.remove("selected");
                
                currentPlayer = currentPlayer === "red" ? "blue" : "red";
                selectedPiece = null;
             }
        });
    });
});

function isValidMove(piece, square) {
    const pieceRow = +piece.parentElement.dataset.row;
    const pieceCol = +piece.parentElement.dataset.col;
    const targetRow = +square.dataset.row;
    const targetCol = +square.dataset.col;

    const rowDiff = Math.abs(targetRow - pieceRow);
    const colDiff = Math.abs(targetCol - pieceCol);

    if (rowDiff === 1 && colDiff === 1 && !square.hasChildNodes()) {
        return true;
    }
    
    return false; 
}

// function isValidKingMove(piece, square) {
//     const pieceRow = +piece.parentElement.dataset.row;
//     const pieceCol = +piece.parentElement.dataset.col;
//     const targetRow = +square.dataset.row;
//     const targetCol = +square.dataset.col;

//     const rowDiff = Math.abs(targetRow - pieceRow);
//     const colDiff = Math.abs(targetCol - pieceCol);

//     if (rowDiff === 1 && colDiff === 1 && !square.hasChildNodes()) {
//         return true;
//     }
//     return false; 
// }


// function removeCapturePieces(piece, desinationSquare) {
//     const pieceRow = +piece.parentElement.dataset.row;
//     const pieceCol = +piece.parentElement.dataset.col;
//     const targetRow = +desinationSquare.dataset.row;
//     const targetCol = +desinationSquare.dataset.col;

//     const rowDirection = targetRow - pieceRow > 0 ? 1 : -1;
//     const colDirection = targetCol - pieceRow > 0 ? 1 : -1;

//     let currentRow = pieceRow + rowDirection;
//     let currentCol = pieceCol + colDirection;

//     while (currentRow !== targetRow && currentCol !== targetCol) {
//         const square = document.querySelector(`[data-row="${currentRow}"][data-col="${currentCol}"]`);
//         if (square.hasChildNodes()) {
//             square.removeChild(square.firstChild);
//         }
        
//         currentRow += rowDirection;
//         currentCol += colDirection;
//     }
// }

// function isKing(piece, square) {
//     if((currentPlayer === "red" && square.dataset.row === "8") || (currentPlayer === "blue" && square.dataset.row === "1")) {
//         return true;
//     }
//     return false;
// }

// function kingPiece(piece) {
//     piece.classList.add("king");
// }
