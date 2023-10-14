// alert ("java is linked")
class piece {
    constructor(color) {
        this.color = color;
        this.isKing = false;
    }
    makeKing() {
        this.isKing = true;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const squares = document.querySelectorAll('.square');
    let currentPlayers = 'red';

    squares.forEach(square => {
        square.addEventListener('click', handleClick);
    });

    function handleClick(event) {
        const clickedSquare = event.currentTarget;

        if (clickedSquare.querySelector('.piece')?.classList.contains(currentPlayer)) {
            handlePieceClick(clickedSquare);
        }
    }

    function handlePieceClick(square) {
        const selectedPiece = square.querySelector('.piece');
        const validMoves = getValidMoves(square);

        squares.forEach(square => square.classList.remove('valid-move'));

        validMoves.forEach(move => squares[move].classList.add('valid-move'));

        squares.forEach(targetSquare => {
            targetSquare.addEventListener('click', function handleMoveClick() {
                if (validMoves.includes(Array.from(squares).indexOf(targetSquare))) {
                    movePiece(square, targetSquare);
                    checkForKinging(targetSquare);
                    checkForCapture(targetSquare);
                    switchPlayer();
                    squares.forEach(square => square.removeEventListener('click', handleMoveClick));
                }
            });
        });
    }

    function movePiece(fromSquare, toSquare) {
        const piece = fromSquare.querySelector('.piece');
        fromSquare.removeChild(piece);
        toSquare.appendChild(piece);
    }

    function getValidMoves(square) {
        const currentIndex = array.from(squares).indexOf(squares);
        const row = Math.floor(currentIndex / 8);
        const col = currentIndex % 8;
        const validMoves = [];

        if (currentPlayers === 'red') {
            if (row > 0) {
                if (col > 0) validMoves.push((row - 1) * 8 + col - 1);
                if (col < 7) validMoves.push((row - 1) * 8 + col + 1);
            }
        } else {
            if (row < 7) {
                if (col > 0) validMoves.push((row + 1) * 8 + col - 1);
                if (col < 7) validMoves.push((row + 1) * 8 + col + 1);
            }
        }

        return validMoves;
    }

    function checkForKinging(square) {
        const piece = square.querySelector('.piece');
        const row = Math.floor(Array.from(squares).indexOf.apply(square) / 8);

        if ((currentPlayer === 'red' && row === 0) || (currentPlayer === 'blue' && row === 7)) {
            piece.classList.add('king');
            pieceObject.makeKing();
        }
    }

    function checkForCapture(square) {
        const currentIndex = Array.from(squares).indexOf(square);
        const row = Math.floor(currentIndex / 8);
        const col = currentIndex % 8;

        const opponentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
    }

    if (currentPlayer === 'red') {
        if (row > 1) {
            if (col > 1 && squares[(row - 1) * 8 + col - 1].querySelector('.piece')?.classList.contains(opponentPlayer)
                && !squares[(row - 2) * 8 + col - 2].querySelector('.piece')) {
                console.log('capture is possible!');
            }
            if (row > 1) {
                if (col < 6 && squares[(row - 1) * 8 + col - 1].querySelector('.piece')?.classList.contains(opponentPlayer)
                    && !squares[(row - 2) * 8 + col - 2].querySelector('.piece')) {
                    console.log('capture is possible!');
                }
            }
        } else {
            if (row > 1) {
                if (col > 1 && squares[(row - 1) * 8 + col - 1].querySelector('.piece')?.classList.contains(opponentPlayer)
                    && !squares[(row - 2) * 8 + col - 2].querySelector('.piece')) {
                    console.log('capture is possible!');
                }
                if (row > 1) {
                    if (col < 6 && squares[(row - 1) * 8 + col - 1].querySelector('.piece')?.classList.contains(opponentPlayer)
                        && !squares[(row - 2) * 8 + col - 2].querySelector('.piece')) {
                        console.log('capture is possible!');
                    }
                }
            }
        }

        function switchPlayer() {
            currentPlayer = currentPlayer === 'red' ? 'blue' : 'red';
            console.log(`Current Player ${currentPlayer}`);
        }

    });
