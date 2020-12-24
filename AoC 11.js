var array = $('pre').innerText.trimEnd().split('\n');

function copy() {
    let newArray = [];
    for (let i=0; i<array.length; i++)
        newArray.push(array[i]);
    return newArray;
}

function print() {
    for (let i=0; i<array.length; i++)
        console.log(array[i]);
}

function step() {
    let arrayCopy = copy();
    let changed = false;
    for (let y=0; y<array.length; y++) {
        let row = array[y];
        for (let x=0; x<row.length; x++) {
            //let empty = 0;
            let occupied = 0;
            for (let j=-1; j<=1; j++)
                for (let i=-1; i<=1; i++) {
                    if (x+i<0 || x+i>=row.length || y+j<0 || y+j>=array.length || (i==0 && j==0)) continue;
                    occupied += array[y+j][x+i] == '#';
                }
            if (row[x] == 'L' && occupied == 0) {
                rowCopy = arrayCopy[y];
                rowCopy = rowCopy.substring(0, x) + '#' + rowCopy.substring(x+1)
                arrayCopy[y] = rowCopy;
                changed = true;
            }
            if (row[x] == '#' && occupied >= 4) {
                rowCopy = arrayCopy[y];
                rowCopy = rowCopy.substring(0, x) + 'L' + rowCopy.substring(x+1)
                arrayCopy[y] = rowCopy;
                changed = true;
            }
        }
    }
    if (changed) array = arrayCopy;
    return changed;
}

var steps = 0;
while (steps < 100) {
    if (!step()) break;
    steps++;
}

var seats = 0;
for (let i=0; i<array.length; i++) {
    seats += (array[i].match(/#/g) || []).length;
}
console.log(`answer 1: ${seats}`);

function step2() {
    let arrayCopy = copy();
    let changed = false;
    for (let y=0; y<array.length; y++) {
        let row = array[y];
        for (let x=0; x<row.length; x++) {
            //let empty = 0;
            let occupied = 0;
            for (let j=-1; j<=1; j++)
                for (let i=-1; i<=1; i++) {
                    let steps = 0;
                    while(true) {
                        steps++;
                        if (x+i*steps<0 || x+i*steps>=row.length || y+j*steps<0 || y+j*steps>=array.length || (i==0 && j==0)) break;
                        occupied += array[y+j*steps][x+i*steps] == '#';
                        if (array[y+j*steps][x+i*steps] == 'L' || array[y+j*steps][x+i*steps] == '#') break;
                    }
                }
            if (row[x] == 'L' && occupied == 0) {
                rowCopy = arrayCopy[y];
                rowCopy = rowCopy.substring(0, x) + '#' + rowCopy.substring(x+1)
                arrayCopy[y] = rowCopy;
                changed = true;
            }
            if (row[x] == '#' && occupied >= 5) {
                rowCopy = arrayCopy[y];
                rowCopy = rowCopy.substring(0, x) + 'L' + rowCopy.substring(x+1)
                arrayCopy[y] = rowCopy;
                changed = true;
            }
        }
    }
    if (changed) array = arrayCopy;
    return changed;
}

var array = $('pre').innerText.trimEnd().split('\n');
var steps = 0;
while (steps < 100) {
    if (!step2()) break;
    steps++;
}

var seats = 0;
for (let i=0; i<array.length; i++) {
    seats += (array[i].match(/#/g) || []).length;
}
console.log(`answer 2: ${seats}`);