let currentPlayer = "red";

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
            if (selectedPiece && isValidMove(selectedPiece, square, currentPlayer, pieceList)) {
                square.appendChild(selectedPiece);
                selectedPiece.classList.remove("selected");

                const pieceRow = +selectedSquare.dataset.row;
                const pieceCol = +selectedSquare.dataset.col;
                const targetRow = +square.dataset.row;
                const targetCol = +square.dataset.col;

                const rowDiff = targetRow - pieceRow;
                const colDiff = Math.abs(targetCol - pieceCol);
                const direction = currentPlayer === "red" ? 1 : -1;

                if (rowDiff === direction * 2 && colDiff === 2) {
                    const capturedRow = pieceRow + direction;
                    const capturedCol = (targetCol > pieceCol) ? pieceCol + 1 : pieceCol - 1;
                    const capturedSquare = document.querySelector(`[data-row="${capturedRow}"][data-col="${capturedCol}"]`);

                    if (capturedSquare && capturedSquare.hasChildNodes()) {
                        const capturedPiece = capturedSquare.firstElementChild;
                        pieceList.splice(pieceList.indexOf(capturedPiece), 1); // Remove the piece
                        capturedSquare.removeChild(capturedPiece);
                    }
                }
                switchPlayers();
                selectedPiece = null;
            }
        });
    });
});

function isValidMove(piece, square, currentPlayer, checkCapture) {
    const pieceRow = +piece.parentElement.dataset.row;
    const pieceCol = +piece.parentElement.dataset.col;
    const targetRow = +square.dataset.row;
    const targetCol = +square.dataset.col;

    const rowDiff = targetRow - pieceRow;
    const colDiff = Math.abs(targetCol - pieceCol);

    let direction = 0;

    if (currentPlayer === "red") {
        direction = 1;
    } else if (currentPlayer === "blue") {
        direction = -1;
    }
    if (rowDiff === direction && colDiff === 1 && !square.hasChildNodes()) {
        return true;
    }

    if (rowDiff === direction * 2 && colDiff === 2) {
        const capturedRow = pieceRow + direction;
        const capturedCol = (targetCol > pieceCol) ? pieceCol + 1 : pieceCol - 1;
        const capturedSquare = document.querySelector(`[data-row="${capturedRow}"][data-col="${capturedCol}"]`);

        if (capturedSquare && capturedSquare.hasChildNodes() && !capturedSquare.firstElementChild.classList.contains(currentPlayer)) {
            return true;
        }
    }

    return false;
}
