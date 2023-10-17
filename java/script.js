// alert ("java is linked")
// class piece {
//     constructor(color) {
//         this.color = color;
//         this.King = false;
//     }
//     makeKing() {
//         this.King = true;
//     }
// }

// const squares = document.querySelectorAll('.square, .square1');

// let currentPlayer = "red"
// let selectedPiece = null
// let opponentPlayer = 'blue'

// function switchPlayer() {
//     currentPlayer = (currentPlayer === 'red') ? 'blue' : 'red';
//     opponentPlayer = (currentPlayer === 'red') ? 'blue' : 'red';
//     console.log(`Current Player ${currentPlayer}`);
// }

document.addEventListener('DOMContentLoaded', function () { 
    let currentPlayer = "red";

    function currentPlayerPiece(piece) {
        return piece.classList.contains(currentPlayer);
    }

    const pieces = document.querySelectorAll(".piece");
    pieces.forEach(piece => {
        piece.addEventListener("click", function (event) {
            event.stopPropagation();
            pieces.forEach(p => p.classList.remove("selected"));
            piece.classList.add("selected");
        });
    });
    
    const squares = document.querySelectorAll(".square, .square1");
    squares.forEach(square => {
        square.addEventListener("click", function () {
            console.log("square is clicked")
            const selectedPiece = document.querySelector(".selected");

            if (selectedPiece) {
                square.appendChild(selectedPiece);
                selectedPiece.classList.remove("selected");
                
                currentPlayer = currentPlayer === "red" ? "blue" : "Red";
             }
        });
    });
});


//         } handleSquareClick(square));
//     });

//     pieces.forEach(piece => {
//         piece.addEventListener('click', () => handlePieceClick(piece));
//     });

//     function handlePieceClick(piece) {
//         if (piece.classList.contains(currentPlayer)) {
//             selectedPiece = piece;
//         } else if (selectedPiece) {
//             const isValidMove = isValidMove(piece);

//             if (isValidMove) {
//                 piece.appendChild(selectedPiece);
//                 checkForCapture(piece);
//                 checkForKinging(piece);
//                 selectedPiece= null;
//                 switchPlayer();
//             }
//         }
//     }

//     function handleSquareClick(square) {
//         const clickedPiece = square.querySelector('.piece');

//         if (clickedPiece && clickedPiece.classList.contains(currentPlayer)) {
//             selectedPiece = clickedPiece;
//         } else if (selectedPiece) {
//             const isValidMove = isValidMove(square);

//             if (isValidMove) {
//             square.appendChild(selectedPiece);
//             checkForCapture(square);
//             checkForKinging(square);
//             selectedPiece = null;
//             switchPlayer();
//             }
//         }
//     }

//     function isValidMove(square) {
//         const row = Math.floor(Array.from(squares).indexOf(square) / 8);
//         const col = Array.from(squares).indexOf(square) % 8;
//         const validMoves = getValidMoves(row, col);
    
//         // Check if the clicked square is one of the valid moves
//         return validMoves.includes(Array.from(squares).indexOf(square));
//     }

//     function movePiece(fromSquare, toSquare) {
//         const piece = fromSquare.querySelector('.piece');
//         fromSquare.removeChild(piece);
//         toSquare.appendChild(piece);
//     }

//     function getValidMoves(row, col) {
//         const validMoves = [];

//         if (currentPlayer === 'red') {
//             if (row > 0) {
//                 if (col > 0) validMoves.push((row - 1) * 8 + col - 1);
//                 if (col < 7) validMoves.push((row - 1) * 8 + col + 1);
//             }
//         } else {
//             if (row < 7) {
//                 if (col > 0) validMoves.push((row + 1) * 8 + col - 1);
//                 if (col < 7) validMoves.push((row + 1) * 8 + col + 1);
//             }
//         }

//         return validMoves;
//     }

//     function checkForKinging(square) {
//         const piece = square.querySelector('.piece');
//         const row = Math.floor(Array.from(squares).indexOf(square) / 8);

//         if ((currentPlayer === 'red' && row === 0) || (currentPlayer === 'blue' && row === 7)) {
//             piece.classList.add('king');
//         }
//     }

//     function checkForCapture(square) {
//         const currentIndex = Array.from(squares).indexOf(square);
//         const row = Math.floor(currentIndex / 8);
//         const col = currentIndex % 8;
//         const opponentPlayer = currentPlayer === 'red' ? 'blue' : 'red';

//         if (currentPlayer === 'red') {
//             if (row > 1) {
//                 if (col > 1 && squares[(row - 1) * 8 + col - 1].querySelector('.piece')?.classList.contains(opponentPlayer)
//                     && !squares[(row - 2) * 8 + col - 2].querySelector('.piece')) {
//                     console.log('capture is possible!');
//                 }
//                 if (row > 1) {
//                     if (col < 6 && squares[(row - 1) * 8 + col + 1].querySelector('.piece')?.classList.contains(opponentPlayer)
//                         && !squares[(row - 2) * 8 + col + 2].querySelector('.piece')) {
//                         console.log('capture is possible!');
//                     }
//                 }
//             } else {
//                 if (row < 6) {
//                     if (col > 1 && squares[(row - 1) * 8 + col - 1].querySelector('.piece')?.classList.contains(opponentPlayer)
//                         && !squares[(row - 2) * 8 + col - 2].querySelector('.piece')) {
//                         console.log('capture is possible!');
//                     }
//                     if (row > 1) {
//                         if (col < 6 && squares[(row - 1) * 8 + col + 1].querySelector('.piece')?.classList.contains(opponentPlayer)
//                             && !squares[(row - 2) * 8 + col + 2].querySelector('.piece')) {
//                             console.log('capture is possible!');
//                         }
//                     }
//                 }
//             }
//         }
//     }
// });
