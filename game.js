let table = document.querySelector('table')
let rows = table.querySelectorAll('tr');
let cells = table.querySelectorAll('td');
let itsX = false;
let coiuntCells = 0;

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', function (event) {
        let parent = this.parentNode;
        if (!this.innerText) {
            if (itsX) {
                this.innerText = 'O';
                itsX = false;
                coiuntCells++;

                if (horizontalMatch(this)) {
                    alert('O Won');
                    return clearTable();
                }

                if (verticalMatch(i, this)) {
                    alert('O Won');
                    return clearTable()
                }

                if (checkHorizontal(i, this)) {
                    alert('O Won');
                    return clearTable()
                }

            }

            else {
                this.innerText = 'X';
                itsX = true
                coiuntCells++;
                if (horizontalMatch(this)) {
                    alert('X Won');
                    return clearTable()
                }

                if (verticalMatch(i, this)) {
                    alert('X Won');
                    return clearTable()
                }

                if (checkHorizontal(i, this)) {
                    alert('X Won');
                    return clearTable()
                }
            }
        } else if (coiuntCells === 9) {
            clearTable()
        }
    })
}

function clearTable() {
    alert('It was a draw');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
    coiuntCells = 0;
}

function horizontalMatch(cell) {
    let parent = cell.parentNode;
    let value = cell.innerText;
    let children = parent.childNodes;
    for (let i = 0; i < children.length; i++) {
        if (children[i].innerText !== value) return false;
    }
    return true;
}

function verticalMatch(idx, cell) {
    let correctIndex = { 3: 0, 4: 1, 5: 2, 6: 0, 7: 1, 8: 2 };
    let checkIndex = idx > 2 ? correctIndex[idx] : idx;
    let value = cell.innerText;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].childNodes[checkIndex].innerText !== value) return false;
    }
    return true;
}

function checkHorizontal(idx, cell) {
    let correctIndex = { 0: 0, 4: 1, 6: 0, 8: 2 };
    let checkIdx = correctIndex[idx];
    let value = cell.innerText;

    // if (idx === 0) {
    //     if (rows[1].childNodes[1].innerText !== value) return false;
    //     if (rows[2].childNodes[2].innerText !== value) return false;
    //     return true;
    // }

    // if (idx === 2) {
    //     if (rows[1].childNodes[1].innerText !== value) return false;
    //     if (rows[2].childNodes[0].innerText !== value) return false;
    //     return true;
    // }

    // if (idx === 6) {
    //     if (rows[1].childNodes[1].innerText !== value) return false;
    //     if (rows[0].childNodes[2].innerText !== value) return false;
    //     return true;
    // }

    // if (idx === 8) {
    //     if (rows[1].childNodes[1].innerText !== value) return false;
    //     if (rows[0].childNodes[0].innerText !== value) return false;
    //     return true;
    // }
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