<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="assets/jquery.min.js"></script>
    <title>Tic Tac Toe</title>
    
</head>
<body>
    <style>
    <?php include "game.css" ?>
    </style>
    <nav>
        <ul>
        <li>
        <a href="index.html">Home</a>
        </li>
        <li>
        <a href="projects.html">PROJECTS</a>
        </li>
        <li>
        <a  href="contact.html">Contact me</a>
        </li>
        <li>
        <a  href="resume.html">Resume</a>
        </li>
        <li>
        <a  href="test.php">Games</a>
        </li>
        </ul>        
    </nav>

    <div class="head_text">
        <h1 id="tt">TIC-TAC-TOE</h1>
    </div>
    <div id="board"></div>
    <div id="setting">
        <input type="checkbox" id="2players" name="2players" value="MP">
        <label for="2player"> 2 Players</label><br>
        <label for="p1name">Player 1 name's</label>
        <input type="text" id="p1name" name="p1name" value="Player 1"><br><br>
        <label for="p1name">Player 1 name's</label>
        <input type="text" id="p2name" name="p2name" value="Player 2"><br><br>
        <button id="startBtn">Start a game</button>
    </div>
    <div id="replay">
        <button id="againBtn">New game</button>
    </div>
    

    <div class="head_text">
        <p id="gameInfo"></p>
    </div>

    <footer>
        <a href="https://github.com/Hamidou0" target="_blank">
            <img class="icon" src="img/github.png" alt="">
        </a>
        <a href="https://www.linkedin.com/in/hamidou-cisse-b6482419a/" target="_blank">
            <img class="icon" src="img/linkedin.png" alt="">
        </a>
        <p>Copyright &copy; 2023.</p>
    </footer>

</body>
</html>
<script src="assets/board.js"></script>
<script src="assets/ttt_engine.js"></script>