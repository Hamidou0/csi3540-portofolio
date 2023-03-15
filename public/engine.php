<?php
header('Content-type: application/json');
print_r($_POST);

$mPlayer;

$nostart = "The game hasn't started yet";
$usedcell = "This cell has already been selected";
$error_m = "Critical error happened, run";
$draw_m = "It's a drasw";

$playerTurn  = 0;
$turnPlayed  = 0;

$gameGrid = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];
$cellLeft = [
            [0,0],[0,1],[0,2],
            [1,0],[1,1],[1,2],
            [2,0],[2,1],[2,2],
];

/*
 * 0 - p1
 * 1 - p2
 * 2 - nostart
 * 3 - usedcell
 * 4 - error_m
 * 5 - draw_m
 * 6 - w1
 * 7 - w2
 */
$text_reponse = '';
/*
 * 0 - Game continue
 * 1 - Game ended
 */
$response = '';

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
                    $text_reponse=0;
                    $playerTurn = 1;
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
            reset($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
            $response = 1; 
        }
        if(checkWinner(2, $gameGrid)){
            $text_reponse=7;
            $playerTurn = 2;
            reset($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
            $response = 1; 
        }

        if($turnPlayed == 9){
            $text_reponse=5;
            reset($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
            $response = 1; 
        }
}


function checkWinner($num, &$gameGrid){
    if( ($gameGrid[0][0] == $$num) & ($gameGrid[1][0] == $num) & ($gameGrid[2][0] == $num) ) return true;
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
          reset($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
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
}

function reset(&$gameGrid, &$cellLeft, &$playerTurn, &$turnPlayed){
    $gameGrid    = [[0,0,0],[0,0,0],[0,0,0]];
    $cellLeft = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
    $playerTurn = 0;
    $turnPlayed = 0;
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
/*
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
*/

?>