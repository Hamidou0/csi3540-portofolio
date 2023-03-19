<?php
//header('Content-type: application/json');
session_start();
$mPlayer;

$nostart = "The game hasn't started yet";
$usedcell = "This cell has already been selected";
$error_m = "Critical error happened, run";
$draw_m = "It's a drasw";

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

$leaderboard = [];

if(isset($_SESSION['gameGrid']) && isset($_SESSION['playerTurn']) &&
isset($_SESSION['turnPlayed'])){
    $gameGrid = $_SESSION['gameGrid'];
    $playerTurn  = $_SESSION['playerTurn'];
    $turnPlayed  = $_SESSION['turnPlayed'];
    if(isset($_SESSION['cellLeft'])){
        $cellLeft = $_SESSION['cellLeft'];
    }  
    if(isset($_SESSION['leaderboard'])){
        $leaderboard = $_SESSION['leaderboard'];
    }  
}



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
$text_reponse = 0;
/*
 * 0 - Game continue
 * 1 - Game ended
 */
$response = 0;

if(isset($_POST['reset'])){
    resetGame($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
    $flat_grid = [];
    for($i = 0; $i < 3; $i++){
        for($j = 0; $j < 3; $j++){
            array_push($flat_grid, $gameGrid[$i][$j]);
        }
    }
    echo json_encode('a');
}else{
    play($_POST['id'], $_POST['mplayer'], $turnPlayed, $playerTurn, $gameGrid, $response,$text_reponse,$cellLeft, $leaderboard);
    $flat_grid = [];
    for($i = 0; $i < 3; $i++){
        for($j = 0; $j < 3; $j++){
            array_push($flat_grid, $gameGrid[$i][$j]);
        }
    }
    array_push($flat_grid, $text_reponse);
    array_push($flat_grid, $response);

    $flat_leaderboard;
    foreach($leaderboard as $key => $value){
        $flat_leaderboard = [$key,$value];
        array_push($flat_grid, $flat_leaderboard);
    }
    echo json_encode($flat_grid);
}

function play($id, $mPlayer, &$turnPlayed, &$playerTurn, &$gameGrid, &$response,
                &$text_reponse, &$cellLeft, &$leaderboard){
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


        if( ($mPlayer == 'false') & ($playerTurn==1)){
            automatedPlayer( $turnPlayed, $playerTurn, $gameGrid, $response, $cellLeft,
$text_reponse);
        }

        if(checkWinner(1, $gameGrid, $leaderboard)){
            $text_reponse=6;
            $playerTurn = 2;
            //resetGame($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
            $response = 1; 
        }
        elseif(checkWinner(2, $gameGrid, $leaderboard)){
            $text_reponse=7;
            $playerTurn = 2;
            //resetGame($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
            $response = 1; 
        }
        elseif($turnPlayed == 9){
            $text_reponse=5;
            //resetGame($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
            $response = 1; 
        }

        $_SESSION['gameGrid'] = $gameGrid;
        $_SESSION['playerTurn'] = $playerTurn;
        $_SESSION['turnPlayed'] = $turnPlayed;
}


function checkWinner($num, &$gameGrid, &$leaderboard){
    $ret = false;
    if( ($gameGrid[0][0] == $num) & ($gameGrid[1][0] == $num) & ($gameGrid[2][0] == $num) ) $ret =  true;
    elseif( ($gameGrid[0][1] == $num) & ($gameGrid[1][1] == $num) & ($gameGrid[2][1] == $num) ) $ret =  true;
    elseif( ($gameGrid[0][2] == $num) & ($gameGrid[1][2] == $num) & ($gameGrid[2][2] == $num) ) $ret =  true;

    elseif( ($gameGrid[0][0] == $num) & ($gameGrid[0][1] == $num) & ($gameGrid[0][2] == $num) ) $ret =  true;
    elseif( ($gameGrid[1][0] == $num) & ($gameGrid[1][1] == $num) & ($gameGrid[1][2] == $num) ) $ret =  true;
    elseif( ($gameGrid[2][0] == $num) & ($gameGrid[2][1] == $num) & ($gameGrid[2][2] == $num) ) $ret =  true;

    elseif( ($gameGrid[0][0] == $num) & ($gameGrid[1][1] == $num) & ($gameGrid[2][2] == $num) ) $ret =  true;
    elseif( ($gameGrid[0][2] == $num) & ($gameGrid[1][1] == $num) & ($gameGrid[2][0] == $num) ) $ret =  true;
    
    if($ret == true){
        $player = ($num == 1) ? $_POST['p1'] : $_POST['p2'];
        if(array_key_exists($player, $leaderboard)){
            $leaderboard[$player]++;
        }
        else{
            $leaderboard[$player] = 1;
        }
        $_SESSION['leaderboard'] = $leaderboard;
    }

    return $ret;

    
    
}


function automatedPlayer( &$turnPlayed, &$playerTurn, &$gameGrid, &$response, &$cellLeft,
&$text_reponse){
    $cont = true;
    $set = [];
    while($cont){

        if(count($cellLeft) == 0){
          //resetGame($gameGrid, $cellLeft, $playerTurn, $turnPlayed);
          $response = 1; break;
        }else{
            $set = $cellLeft[ rand(0,count($cellLeft)-1)];
            if($gameGrid[$set[0]][$set[1]] == 0){
                $gameGrid[$set[0]][$set[1]] = 2;
                $response = 0;
                $text_reponse=1;
                $playerTurn = 0;
                $cont = false;
                $turnPlayed++;
            }
    
            $index = array_search($set, $cellLeft);
            \array_splice($cellLeft,$index,1);
        }
    }
    $_SESSION['cellLeft'] = $cellLeft;
}

function resetGame(&$gameGrid, &$cellLeft, &$playerTurn, &$turnPlayed){
    $gameGrid    = [[0,0,0],[0,0,0],[0,0,0]];
    $cellLeft = [[0,0],[0,1],[0,2],[1,0],[1,1],[1,2],[2,0],[2,1],[2,2]];
    $playerTurn = 0;
    $turnPlayed = 0;

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