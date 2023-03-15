var player1_name = "Player 1";
var player2_name = "Player 2";

//Players
var player1 = {
    name: "Player 1",
    num:1,
    nameSet(text){
        this.name = text;
    }
};

var player2 = {
    name: "Player 2",
    num:2,
    nameSet(text){
        this.name = text;
    }
};

//Text messages
var nostart  = "The game hasn't started yet" // "it's "+player1.name+" turns";
var usedcell = "This cell has already been selected";
var error_m  = "Critical error happened, run";
var draw_mes = "It's a draw";



var gameGrid    = [[0,0,0],[0,0,0],[0,0,0]];
var magicSquare = [[8,1,6],[3,5,7],[4,9,2]];
var cellLeft = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
var gameInfo    = document.getElementById('gameInfo');
var board       = document.getElementById('board');
var setting     = document.getElementById('setting');
var replay      = document.getElementById('replay');
var startBtn    = document.getElementById('startBtn');
var againBtn    = document.getElementById('againBtn');
var playerTurn  = 0;
var turnPlayed  = 0;



//=======================================================
gameInfo.innerHTML = nostart;

let cells = document.querySelectorAll(".boardCells");
cells.forEach(function(i) {
    i.addEventListener('click', function(cell) {
        //document.getElementById('tt').innerHTML=parseInt(i.getAttribute('id'));
      let id = i.getAttribute('id');
      let p1       = ""+player1_name+" has selected a cell";
      let p2       = ""+player2_name+" has selected a cell";
      let w1       = ""+player1_name+" has won the game!";
      let w2       = ""+player2_name+" has won the game!";
      id = parseInt(id);
      switch(playerTurn){
        case 0:
            switch(gameGrid[Math.trunc(id/3)][id%3]){
                case 0:
                    gameGrid[Math.trunc(id/3)][id%3] = 1;
                    gameInfo.innerHTML=p1;
                    playerTurn = 1;
                    turnPlayed++;
                    redrawBoard();
                    break;
                case 1: gameInfo.innerHTML=usedcell; break;
                case 2: gameInfo.innerHTML=usedcell; break;
                default: break;
            }
            break;

        case 1:
            switch(gameGrid[Math.trunc(id/3)][id%3]){
                case 0:
                    gameGrid[Math.trunc(id/3)][id%3] = 2;
                    gameInfo.innerHTML=p2;
                    playerTurn = 0;
                    turnPlayed++;
                    redrawBoard();
                    break;
                case 1: gameInfo.innerHTML=usedcell; break;
                case 2: gameInfo.innerHTML=usedcell; break;
                default: break;
            }
            break;
        case 2: break;
        default:
            gameInfo.innerHTML=error_m; break;
        }


        if(!document.getElementById('2players').checked & (playerTurn==1)){
            console.log("got in");
            automatedPlayer();
        }
        redrawBoard();

        if(checkWinner(1)){
            gameInfo.innerHTML=w1;
            playerTurn = 2;
            gameDone();
        }
        if(checkWinner(2)){
            gameInfo.innerHTML=w2;
            playerTurn = 2;
            gameDone();
        }

        if(turnPlayed == 9 || cellLeft.length == 0){
            gameInfo.innerHTML=draw_mes;
            gameDone();
        }
    });
});


startBtn.addEventListener("click", restart);
againBtn.addEventListener("click", regame);


//=======================================================
function checkWinner(num){
    if( (gameGrid[0][0] == num) & (gameGrid[1][0] == num) & (gameGrid[2][0] == num) ) return true;
    else if( (gameGrid[0][0] == num) & (gameGrid[0][1] == num) & (gameGrid[0][2] == num) ) return true;
    else if( (gameGrid[0][0] == num) & (gameGrid[1][1] == num) & (gameGrid[2][2] == num) ) return true;
    else if( (gameGrid[0][2] == num) & (gameGrid[1][2] == num) & (gameGrid[2][2] == num) ) return true;
    else if( (gameGrid[2][0] == num) & (gameGrid[2][1] == num) & (gameGrid[2][2] == num) ) return true;
    else if( (gameGrid[1][1] == num) & (gameGrid[2][1] == num) & (gameGrid[0][1] == num) ) return true;
    else return false;
}

function disableCells(){
    let cells = document.querySelectorAll(".boardCells");
    cells.forEach(function(i) {
        i.setAttribute("disabled","disabled");
    });
}

function enableCells(){
    let cells = document.querySelectorAll(".boardCells");
    cells.forEach(function(i) {
        i.removeAttribute("disabled");
    });
}

function redrawBoard(){

    let cells = document.querySelectorAll(".imageCells");
    let x = 0;
    cells.forEach(function(i) {
        switch(gameGrid[Math.trunc(x/3)][x%3]){
            case 0: i.src = "assets/icon/blank.png"; break;
            case 1: i.src = "assets/icon/cross.png"; break;
            case 2: i.src = "assets/icon/circle.png"; break;
            default: break;
        }
        x++;
    });

}

function automatedPlayer(){
    cont = true;
    while(cont){

              let p1       = ""+player1_name+" has selected a cell";
              let p2       = ""+player2_name+" has selected a cell";
              let w1       = ""+player1_name+" has won the game!";
              let w2       = ""+player2_name+" has won the game!";
        if(cellLeft.length == 0){
          redrawBoard();
          gameDone();
        }
        var set = cellLeft[Math.floor(Math.random() * cellLeft.length)];
        if(gameGrid[set[0]][set[1]] == 0){
            gameGrid[set[0]][set[1]] = 2;
            gameInfo.innerHTML=p2;
            cont = false;
            playerTurn = 0;
            turnPlayed++;
        }

        var index = cellLeft.indexOf(set);
        cellLeft.splice(index, 1);
    }
}

function restart(){
    enableCells();
    board.style.display = "grid";
    setting.style.display = "none";
    replay.style.display = "none";
    gameGrid    = [[0,0,0],[0,0,0],[0,0,0]];
    cellLeft = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
    redrawBoard();
    playerTurn = 0;
    turnPlayed = 0;

    player1_name = ( document.getElementById('p1name').value);
    player2_name = ( document.getElementById('p2name').value);

}

function gameDone(){
    disableCells();
    replay.style.display = "block";
    board.classList.add("veil");
}

function regame(){
    board.style.display = "none";
    setting.style.display = "block";
    replay.style.display = "none";
    board.classList.remove("veil");
    gameGrid    = [[0,0,0],[0,0,0],[0,0,0]];
    cellLeft = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
    redrawBoard();
    playerTurn = 0;
    turnPlayed = 0;
    player1_name = ( document.getElementById('p1name').value);
    player2_name = ( document.getElementById('p2name').value);
}




//======================================

/*
<?php
//header('Content-type: application/json');
session_start();
$mPlayer;
$nostart = "The game hasn't started yet";
$usedcell = "This cell has already been selected";
$error_m = "Critical error happened, run";
$draw_m = "It's a drasw";

if(isset($_SESSION['gameGrid']) && isset($_SESSION['playerTurn']) &&
isset($_SESSION['turnPlayed']) && isset($_SESSION['cellLeft'])){
    $gameGrid = $_SESSION['gameGrid'];
    $playerTurn  = $_SESSION['playerTurn'];
    $turnPlayed  = $_SESSION['turnPlayed'];
    $cellLeft = $_SESSION['cellLeft'];
}else{
    $gameGrid = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    $playerTurn  = 0;
    $turnPlayed  = 0;
    $cellLeft = [
        [0,0],[0,1],[0,2],
        [1,0],[1,1],[1,2],
        [2,0],[2,1],[2,2],
    ];
}




//if(isset($_POST['reset'])){
//    resetGame($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
//}
//if(!empty($_POST) && !isset($_POST['reset'])){
    play($_POST['id'], $_POST['mplayer'], $turnPlayed, $playerTurn, $gameGrid, $response,$text_reponse);

    $flat_grid = [];
    for($i = 0; $i < 3; $i++){
        for($j = 0; $j < 3; $j++){
            array_push($flat_grid, $gameGrid[$i][$j]);
        }
    }
    array_push($flat_grid, $text_reponse);
    array_push($flat_grid, $response);
    echo json_encode($flat_grid);
//}

function play($id, $mPlayer, &$turnPlayed, &$playerTurn, &$gameGrid, &$response,
                &$text_reponse){
      switch($playerTurn) {
        case 0:
            switch($gameGrid[floor($id/3)][$id%3]){
                case 0:
                    $gameGrid[floor($id/3)][$id%3] = 1;
                    $response=0;
                    $text_reponse=0;
                    $playerTurn = 1;
                    $turnPlayed++;
                    break;
                case 1: $text_reponse = 3; break;
                case 2: $text_reponse = 3; break;
                default: break;
            }
            break;

        case 1:
            switch($gameGrid[floor($id/3)][$id%3]){
                case 0:
                    $gameGrid[floor($id/3)][$id%3] = 2;
                    $response=0;
                    $text_reponse=1;
                    $playerTurn = 0;
                    $turnPlayed++;
                    break;
                case 1: $text_reponse = 3; break;
                case 2: $text_reponse = 3; break;
                default: break;
            }
            break;
        case 2: break;
        default:
        $text_reponse = 4; break;
        }


        if(!$mPlayer & ($playerTurn==1)){
            automatedPlayer( $turnPlayed, $playerTurn, $gameGrid, $response, $cellLeft,
$text_reponse);
        }

        if(checkWinner(1, $gameGrid)){
            $text_reponse=6;
            $playerTurn = 2;
            //resetGame($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
            $response = 1; 
        }
        if(checkWinner(2, $gameGrid)){
            $text_reponse=7;
            $playerTurn = 2;
            //resetGame($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
            $response = 1; 
        }

        if($turnPlayed == 9){
            $text_reponse=5;
            //resetGame($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
            $response = 1; 
        }

        $_SESSION['gameGrid'] = $gameGrid;
        $_SESSION['playerTurn'] = $playerTurn;
        $_SESSION['turnPlayed'] = $turnPlayed;
}


function checkWinner($num, &$gameGrid){
    if( ($gameGrid[0][0] == $num) & ($gameGrid[1][0] == $num) & ($gameGrid[2][0] == $num) ) return true;
    elseif( ($gameGrid[0][0] == $num) & ($gameGrid[0][1] == $num) & ($gameGrid[0][2] == $num) ) return true;
    elseif( ($gameGrid[0][0] == $num) & ($gameGrid[1][1] == $num) & ($gameGrid[2][2] == $num) ) return true;
    elseif( ($gameGrid[0][2] == $num) & ($gameGrid[1][2] == $num) & ($gameGrid[2][2] == $num) ) return true;
    elseif( ($gameGrid[2][0] == $num) & ($gameGrid[2][1] == $num) & ($gameGrid[2][2] == $num) ) return true;
    elseif( ($gameGrid[1][1] == $num) & ($gameGrid[2][1] == $num) & ($gameGrid[0][1] == $num) ) return true;
    else return false;
}


function automatedPlayer( &$turnPlayed, &$playerTurn, &$gameGrid, &$response, &$cellLeft,
&$text_reponse){
    $cont = true;
    $set = [];
    while($cont){

        if(count($cellLeft) == 0){
          resetGame($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
          $response = 1; break;
        }
        $set = $cellLeft[floor(rand(0,count($cellLeft)))];
        if($gameGrid[$set[0]][$set[1]] == 0){
            $gameGrid[$set[0]][$set[1]] = 2;
            $text_reponse=2;
            $cont = false;
            $playerTurn = 0;
            $turnPlayed++;
        }

        $index = array_search($set, $cellLeft);
        unset($cellLeft[$index]);
    }
    $_SESSION['cellLeft'] = $cellLeft;
}

function resetGame(&$gameGrid, &$cellLeft, &$playerTurn, &$turnPlayed){
    $gameGrid    = [[0,0,0],[0,0,0],[0,0,0]];
    $cellLeft = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
    $playerTurn = 0;
    $turnPlayed = 0;
    session_destroy();
    
    $_SESSION['gameGrid'] = $gameGrid;
    $_SESSION['playerTurn'] = $playerTurn;
    $_SESSION['turnPlayed'] = $turnPlayed;
    $_SESSION['cellLeft'] = $cellLeft;
    
}

function generateBoard($gameGrid){
    $id = 0;
    $text = 'assets/icon/blank.png';
    while($id < 9){
        $cellImage = '';
        if($gameGrid[floor($id/3)][$id%3] == 1){
            $cellImage = 'assets/icon/circle.png';
        }
        if($gameGrid[floor($id/3)][$id%3] == 2){
            $cellImage = 'assets/icon/cross.png';
        }
        
        $text .= '<div class="boardItems" id="block'.$id.'">' .
                            '<button class="boardCells" id="'.($id-1).'cell">' .
                            '<img class="imageCells" src="'.$cellImage.'">' .
                            '</button>'            .
                            '</div>';
        $id++;
    }


}

echo '<form action="index.php" method="post">';
echo '<div id="board">';
for($i = 1; $i<10; $i++){
    echo '<div class="boardItems" id="block'.$i.'">'.
                        '<input name="click" type="submit" value="'.$i.'" class="boardCells" id="'.($i-1).'cell" background="assets/icon/circle.png"">' .
                        '<img class="imageCells" src="assets/icon/circle.png">' .
                        '</div>';
}
echo '</div>';
echo '</form>';

?>


*/