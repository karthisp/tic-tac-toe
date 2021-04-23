/*
    My approach was to first create the  html layout for the tic-tac-toe game, add 
    click events and then verify/check for the results horizontally, vertically and
    diagonally

    1. Once the table was created, I focused on adding the click event to the cells. 
    2. Then check for horizontal verification
    3. Then check for vertical verification
    4. Then for the diagonal verification

    Features:
    1. Start button
    2. Reset button
    3. Winner's names will displayed in the ordered list

*/


let gameScreen = document.querySelector('.main')
let table = gameScreen.querySelector('table')
let rows = table.querySelectorAll('tr');
let cells = table.querySelectorAll('td');
let gamesList = gameScreen.querySelector('.matches-played')
let itsX = false;
let coiuntCells = 0;

let x = prompt("enter player 1's name");
let o = prompt("enter player 2's name");


// adding click events to the cells for X and O to appear
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function (event) {
        let parent = this.parentNode;
        if (!this.innerText) {
            if (itsX) {
                this.innerText = 'O';
                itsX = false;
                coiuntCells++;

                if (horizontalMatch(this)) {
                    addScoreCard(o)
                    return clearTable();
                }

                if (verticalMatch(i, this)) {
                    addScoreCard(o)
                    return clearTable()
                }

                if (checkDiagonal(i, this)) {
                    addScoreCard(o)
                    return clearTable()
                }

            }

            else {
                this.innerText = 'X';
                itsX = true
                coiuntCells++;
                if (horizontalMatch(this)) {
                    addScoreCard(x)
                    return clearTable()
                }

                if (verticalMatch(i, this)) {
                    addScoreCard(x)
                    return clearTable()
                }

                if (checkDiagonal(i, this)) {
                    addScoreCard(x)
                    return clearTable()
                }
            }
        } else if (coiuntCells >= 8) {
            addScoreCard()
            clearTable()
        }
    })
}

// to clear the table
function clearTable() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
    coiuntCells = 0;
}

// for horizontal check fron left to right or right to left
function horizontalMatch(cell) {
    let parent = cell.parentNode;
    let value = cell.innerText;
    let children = parent.childNodes;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerText !== value) return false;
    }
    return true;
}

// for vertical check fron top to bottom or bottom to top
function verticalMatch(idx, cell) {
    let correctIndex = { 3: 0, 4: 1, 5: 2, 6: 0, 7: 1, 8: 2 };
    let checkIndex = idx > 2 ? correctIndex[idx] : idx;
    let value = cell.innerText;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].childNodes[checkIndex].innerText !== value) return false;
    }
    return true;
}

// to check for diagonal matches
function checkDiagonal(idx, cell) {
    let correctIndex = { 0: 0, 4: 1, 6: 0, 8: 2 };
    let checkIdx = correctIndex[idx];
    let value = cell.innerText;

    if(topLeftDiag(idx, value)) return true;
    if(topRightDiag(idx, value)) return true;
    if(bottomLeftDiag(idx, value)) return true;
    if(bottomRightDiag(idx, value)) return true;
    if(centerDiag(idx, value)) return true;
}

function topLeftDiag(idx, value){
    if (idx === 0) {
        if (rows[0].childNodes[0].innerText !== value) return false;
        if (rows[1].childNodes[1].innerText !== value) return false;
        if (rows[2].childNodes[2].innerText !== value) return false;
        return true;
    }    
}

function topRightDiag(idx, value){
    if (idx === 2) {
        if (rows[0].childNodes[2].innerText !== value) return false;
        if (rows[1].childNodes[1].innerText !== value) return false;
        if (rows[2].childNodes[0].innerText !== value) return false;
        return true;
    }    
}

function bottomLeftDiag(idx, value){
    if (idx === 6) {
        if (rows[2].childNodes[0].innerText !== value) return false;
        if (rows[1].childNodes[1].innerText !== value) return false;
        if (rows[0].childNodes[2].innerText !== value) return false;
        return true;
    }
}

function bottomRightDiag(idx, value){
    if (idx === 8) {
        if (rows[2].childNodes[2].innerText !== value) return false;
        if (rows[1].childNodes[1].innerText !== value) return false;
        if (rows[0].childNodes[0].innerText !== value) return false;
        return true;
    }    
}

function centerDiag(idx, value){
    if(idx === 4){
        if(topLeftDiag(0, value)) return true;
        if(topRightDiag(2, value)) return true;
        if(bottomLeftDiag(6, value)) return true;
        if(bottomRightDiag(8, value)) return true;  
    }
}

// start and reset btns
let start = gameScreen.querySelector('.st-btn');
let reset = gameScreen.querySelector('.rst-btn');

reset.addEventListener('click', function(){
    clearTable()
})

start.addEventListener('click', function(){
    x = prompt("enter player 1's name");
    o = prompt("enter player 2's name")
})

// add wins to the list
function addScoreCard(player){
    let list = document.createElement('li');
    if(!player){
        list.innerHTML = `
        <p>Match draw</p>
    `        
    } else {
        list.innerHTML = `
        <p>${player} won</p>
    `
    }
    gamesList.append(list);
}