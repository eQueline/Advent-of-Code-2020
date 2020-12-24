var input = '14,3,1,0,9,5';
//var input = '0,3,6';
var list = input.split(',');

function getTurn(turn) {
    let numbers = new Uint32Array(turn);
    let lastTurn;
    for (let i=0; i<list.length; i++) {
        let number = list[i];
        numbers[number] = i+1;
        lastTurn = number;
    }
    for (let i=list.length; i<turn; i++) {
        let lastNumber = numbers[lastTurn];
        numbers[lastTurn] = i;
        lastTurn = lastNumber?i-lastNumber:0;
    }
    return lastTurn;
}
console.log(`Answer 1: ${getTurn(2020)}`);
console.log(`Answer 2: ${getTurn(30000000)}`);