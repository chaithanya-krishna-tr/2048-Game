var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function() {
    setGame();
}

function setGame() {
    console.log("hello world")
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    for (let r = 0; r < rows; r++) {
        for ( let c = 0;c<columns;c++) {
            //
            let tile = document.createElement("div");
            tile.id = r.toString()+ "."+c.toString();
            let num = board[r][c]
            updatetile(tile,num);
            document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

function updatetile(tile,num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if ( num <= 4096) {
            tile.classList.add("x"+num.toString());
        }
        else {
            tile.classList.add("x8192");
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        setTwo();
        slideLeft();
    }
    if (e.code == "ArrowRight") {
        setTwo();
        slideRight();
    }
    if (e.code == "ArrowUp") {
        setTwo();
        slideUp();
    }
    if (e.code == "ArrowDown") {
        setTwo();
        slideDown();
    }
    document.getElementById("score").innerText=score;
    
})

function slide(row)
{
    row = row.filter(num => num !=0 );
    for(let r=1; r < row.length; r++){
        if(row[r] == row[r-1]){
            row[r-1]+=row[r];
            row[r]=0;
            score+=row[r-1];
        }
    }
    
    row = row.filter(num => num !=0 );
    while(row.length < rows){
        row.push(0);
    }
    return row;
}

function slideLeft() 
{
    for ( let r = 0;r < rows;r++)
    {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0;c < columns;c++)
        {
            let tile = document.getElementById(r.toString()+"."+c.toString());
            let num = board[r][c];
            updatetile(tile,num);
            
        }
    }
}

function slideRight() 
{
    for ( let r = 0;r < rows;r++)
    {
        let row = board[r];
        row=row.reverse();
        row = slide(row);
        board[r] = row.reverse();
        for (let c = 0;c<columns;c++)
        {
            let tile = document.getElementById(r.toString()+"."+c.toString());
            let num = board[r][c];
            updatetile(tile,num);
        }
    }
}

function slideUp() 
{
    for ( let c = 0;c < columns; c++)
    {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        col = slide(col);
        
        for (let r = 0; r < rows; r++)
        {
            board[r][c]=col[r];
            let tile = document.getElementById(r.toString()+"."+c.toString());
            let num = board[r][c];
            updatetile(tile,num);
        }
    }
}

function slideDown() 
{
    for ( let c = 0;c < columns; c++)
    {
        let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
        col = slide(col.reverse());
        col=col.reverse();

        for (let r = 0; r < rows; r++)
        {
            board[r][c]=col[r];
            let tile = document.getElementById(r.toString()+"."+c.toString());
            let num = board[r][c];
            updatetile(tile,num);

        }
    }
}





function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "." + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true;
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false;
}