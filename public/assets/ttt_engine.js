var player1_name = "Player 1";
var player2_name = "Player 2";

//Text messages
var nostart  = "The game hasn't started yet";
var usedcell = "This cell has already been selected";
var error_m  = "Critical error happened, run";
var draw_mes = "It's a draw";

var gameInfo    = document.getElementById('gameInfo');
var board       = document.getElementById('board');
var setting     = document.getElementById('setting');
var replay      = document.getElementById('replay');
var startBtn    = document.getElementById('startBtn');
var againBtn    = document.getElementById('againBtn');


//=======================================================

startBtn.addEventListener("click", restart);
againBtn.addEventListener("click", regame);


document.getElementById('0cell').addEventListener("click", function(){clicked(0);});
document.getElementById('1cell').addEventListener("click", function(){clicked(1);});
document.getElementById('2cell').addEventListener("click", function(){clicked(2);});
document.getElementById('3cell').addEventListener("click", function(){clicked(3);});
document.getElementById('4cell').addEventListener("click", function(){clicked(4);});
document.getElementById('5cell').addEventListener("click", function(){clicked(5);});
document.getElementById('6cell').addEventListener("click", function(){clicked(6);});
document.getElementById('7cell').addEventListener("click", function(){clicked(7);});
document.getElementById('8cell').addEventListener("click", function(){clicked(8);});

//=======================================================

function clicked(id){
    let req = {
        id:id,
        mplayer:document.getElementById('2players').checked
    }
    
    $.ajax({
        type: 'POST',
        url: "assets/engine.php",
        contentType:  'application/x-www-form-urlencoded; charset=UTF-8',
        data: jQuery.param(req),
        success: function(response){
            let arr = JSON.parse(response);
            let p1       = ""+player1_name+" has selected a cell";
            let p2       = ""+player2_name+" has selected a cell";
            let w1       = ""+player1_name+" has won the game!";
            let w2       = ""+player2_name+" has won the game!";
            $('.imageCells').each(function(i, obj) {
                switch(arr[i]){
                    case 0: $(this).attr("src","assets/icon/blank.png"); break;
                    case 1: $(this).attr("src","assets/icon/cross.png"); break;
                    case 2: $(this).attr("src","assets/icon/circle.png"); break;
                    default: break;
                }
            });
            //$("#gameInfo").html(arr);
            switch (arr[9]) {
                case 0: $("#gameInfo").html(p1);break;
                case 1: $("#gameInfo").html(p2);break;
                case 2: $("#gameInfo").html(nostart);break;
                case 3: $("#gameInfo").html(usedcell);break;
                case 4: $("#gameInfo").html(error_m);break;
                case 5: $("#gameInfo").html(draw_mes);break;
                case 6: $("#gameInfo").html(w1);break;
                case 7: $("#gameInfo").html(w2);break;
                default:
                    break;
            }
            if(arr[10] == 1){
                gameDone();
            }

        }
    });
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

function restart(){
    enableCells();
    board.style.display = "grid";
    setting.style.display = "none";
    replay.style.display = "none";

    let req = {
        reset:'reset'
    }
    $.ajax({
        type: 'POST',
        url: "assets/engine.php",
        contentType:  'application/x-www-form-urlencoded; charset=UTF-8',
        data: jQuery.param(req),
        success: function(response){
            let p1       = "It's "+player1_name+" turn's";
            $('.imageCells').each(function(i, obj) {
                $(this).attr("src","assets/icon/blank.png");
            });
            $("#gameInfo").html(p1);
        }
    });

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

}
