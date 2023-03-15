var board = document.getElementById('board');


//Add cells to the board
for(var i = 1; i<10; i++){
    board.innerHTML += '<div class="boardItems" id="block'+i+'">' +
                        '<button class="boardCells" id="'+(i-1)+'cell">' +
                        '<img class="imageCells" src="assets/icon/blank.png">' +
                        '</button>'            +
                        '</div>';
}

