var array = $('pre').innerText.split('\n').map(a=>a.split(''));
var width = array[0].length;
var row = 0;
var column = 0;
var treeCount = 0;
while (row < array.length) {
    if (array[row][column] == '#') treeCount++;
    row += 1;
    column = (column+3)%width;
}
console.log(`answer 1: ${treeCount}`);

var slopes = [[1,1],[1,5],[1,7],[2,1]];
slopes.forEach(a=>{
    let slopeTreeCount = 0;
    let row = 0;
    let column = 0;
    while (row < array.length) {
        if (array[row][column] == '#') slopeTreeCount++;
        row += a[0];
        column = (column+a[1])%width;
    }
    treeCount *= slopeTreeCount;
});
console.log(`answer 2: ${treeCount}`);