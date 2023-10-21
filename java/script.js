let currentPlayer = "red";
let pieceList = Array.from(document.querySelectorAll(".piece"));

function switchPlayers() {
    currentPlayer = currentPlayer === "red" ? "blue" : "red";
}

document.addEventListener('DOMContentLoaded', function () {
    let selectedPiece = null;
    let selectedSquare = null;

    function currentPlayerPiece(piece) {
        return piece.classList.contains(currentPlayer);
    }

    const pieces = document.querySelectorAll(".piece");
    const squares = document.querySelectorAll(".square1");
    const pieceList = Array.from(pieces);

    pieces.forEach(piece => {
        piece.addEventListener("click", function (event) {
            if (currentPlayerPiece(piece)) {
                event.stopPropagation();

                if (selectedPiece) {
                    selectedPiece.classList.remove("selected");
                }

                piece.classList.add("selected");
                selectedPiece = piece;
                selectedSquare = piece.parentElement;
            }
        });
    });

    squares.forEach(square => {
        square.addEventListener("click", function () {
            if (selectedPiece && isValidMove(selectedPiece, square, currentPlayer)) {
                square.appendChild(selectedPiece);
                selectedPiece.classList.remove("selected");

                const pieceRow = +selectedSquare.dataset.row;
                const pieceCol = +selectedSquare.dataset.col;
                const targetRow = +square.dataset.row;
                const targetCol = +square.dataset.col;

                const rowDiff = targetRow - pieceRow;
                const colDiff = Math.abs(targetCol - pieceCol);
                const direction = currentPlayer === "red" ? 1 : -1;

                if (targetRow === 1 || targetRow === 8) {
                    selectedPiece.classList.add("kinged");
                    selectedPiece.classList.add(currentPlayer);
                }

                if (rowDiff === direction * 2 && colDiff === 2) {
                    const capturedRow = pieceRow + direction;
                    const capturedCol = (targetCol > pieceCol) ? pieceCol + 1 : pieceCol - 1;
                    const capturedSquare = document.querySelector(`[data-row="${capturedRow}"][data-col="${capturedCol}"]`);

                    if (capturedSquare && capturedSquare.hasChildNodes()) {
                        const capturedPiece = capturedSquare.firstElementChild;

                    if (!capturedPiece.classList.contains(currentPlayer)) {
                        pieceList.splice(pieceList.indexOf(capturedPiece), 1);
                        capturedSquare.removeChild(capturedPiece);
                        return true;
                    }
                        
                    }
                }

                if (rowDiff !== 0 && colDiff === 2) {
                    const capturedRow = pieceRow + (rowDiff / 2);
                    const capturedCol = pieceCol + (colDiff / 2);
                    const capturedSquare = document.querySelector(`[data-row="${capturedRow}"][data-col="${capturedCol}"]`);

                    if (capturedSquare && capturedSquare.hasChildNodes()) {
                        const capturedPiece = capturedSquare.firstElementChild;

                    if (!capturedPiece.classList.contains(currentPlayer)) {
                        pieceList.splice(pieceList.indexOf(capturedPiece), 1);
                        capturedSquare.removeChild(capturedPiece);
                        return true;
                    }
                    }
                }

                checkForWinner();
                switchPlayers();
                
                selectedPiece = null;
            }
        });
    });
});

function isValidMove(piece, square, currentPlayer) {
    const pieceRow = +piece.parentElement.dataset.row;
    const pieceCol = +piece.parentElement.dataset.col;
    const targetRow = +square.dataset.row;
    const targetCol = +square.dataset.col;

    const rowDiff = targetRow - pieceRow;
    const colDiff = Math.abs(targetCol - pieceCol);

    const isKinged = piece.classList.contains("kinged");

    if (isKinged) {
        if (Math.abs(rowDiff) === 1 && colDiff === 1) {
            return true;
        }

        if (Math.abs(rowDiff) === 2 && colDiff === 2) {
            const capturedRow = pieceRow + rowDiff / 2;
            const capturedCol = pieceCol + colDiff / 2;
            const capturedSquare = document.querySelector(`[data-row="${capturedRow}"][data-col="${capturedCol}"]`);

            if (capturedSquare && capturedSquare.hasChildNodes()) {
                const capturedPiece = capturedSquare.firstElementChild;
                if (!capturedPiece.classList.contains(currentPlayer)) {
                    // Ensure that only one piece is captured
                    if (pieceList.includes(capturedPiece)) {
                        pieceList.splice(pieceList.indexOf(capturedPiece), 1);
                        capturedSquare.removeChild(capturedPiece);
                        return true;
                    }
                }
            }
        }
            } else {

                let direction = 0;

                if (currentPlayer === "red") {
                    direction = 1;
                } else if (currentPlayer === "blue") {
                    direction = -1;
                }

                if (Math.abs(rowDiff) === 1 && colDiff === 1 && !square.hasChildNodes()) {
                    return true;
                }

                if (rowDiff === direction * 2 && colDiff === 2) {
                    const capturedRow = pieceRow + direction;
                    const capturedCol = (targetCol > pieceCol) ? pieceCol + 1 : pieceCol - 1;
                    const capturedSquare = document.querySelector(`[data-row="${capturedRow}"][data-col="${capturedCol}"]`);

                    if (capturedSquare && capturedSquare.hasChildNodes()) {
                        const capturedPiece = capturedSquare.firstElementChild;
                        if (!capturedPiece.classList.contains(currentPlayer)) {

                            if (pieceList.includes(capturedPiece)) {
                                pieceList.splice(pieceList.indexOf(capturedPiece), 1);
                                capturedSquare.removeChild(capturedPiece);
                                return true;
                            }
                        }

                    }
                    
                }
            }
            return false;
        }

        function checkForWinner() {
            const redPieces = pieceList.filter(piece => piece.classList.contains("red"));
            const bluePieces = pieceList.filter(piece => piece.classList.contains("blue"));
            
            console.log("Red pieces: ", redPieces.length);
            console.log("Blue pieces: ", bluePieces.length);
        
            if (redPieces.length === 1) {
                
                displayWinner("Blue player");
            } else if (bluePieces.length === 1) {
                
                displayWinner("Red player");
            }
        }
        
        function displayWinner(winner) {
            const winnerMessage = document.createElement("div");
            winnerMessage.textContent = `${winner} wins!`;
        
            winnerMessage.style.fontSize = "100px";
            winnerMessage.style.color = "green"; 
            winnerMessage.style.position = "absolute";
            winnerMessage.style.zIndex = "1000";
        
            document.body.appendChild(winnerMessage);
        
            setTimeout(() => {
                location.reload();
            }, 30000);
        }