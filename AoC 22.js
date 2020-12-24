var input = $('pre').innerText.trimEnd().split('\n\n');
var player1 = input[0].split('\n').slice(1).reverse().map(a=>Number.parseInt(a));
var player2 = input[1].split('\n').slice(1).reverse().map(a=>Number.parseInt(a));

var winner;
while (true) {
    if (player1.length == 0) {
        winner = player2;
        break;
    } else if (player2.length == 0) {
        winner = player1;
        break;
    }
    let round = [player1.pop(), player2.pop()];
    if (round[0] > round[1])
        player1 = [round[1], round[0], ...player1];
    else
        player2 = [round[0], round[1], ...player2];
}
var score = winner.reduce((a,b,i)=>a+b*(i+1),0);
console.log(`Answer 1: ${score}`);

var player1 = input[0].split('\n').slice(1).reverse().map(a=>Number.parseInt(a));
var player2 = input[1].split('\n').slice(1).reverse().map(a=>Number.parseInt(a));
function playGame(player1, player2, game) {
    let i = 1;
    let states = new Map();
    while (true) {
        let state = player1.join(',') + ';' + player2.join(',');
        if (states.has(state)) {
            return [1, player1.reduce((a,b,i)=>a+b*(i+1),0)];
        }
        states.set(state, true);

        if (player1.length == 0)
            return [2, player2.reduce((a,b,i)=>a+b*(i+1),0)];
        else if (player2.length == 0)
            return [1, player1.reduce((a,b,i)=>a+b*(i+1),0)];
        
        let round = [player1.pop(), player2.pop()];
        let winner;
        if (player1.length >= round[0] && player2.length >= round[1])
            winner = playGame(player1.slice(-round[0]), player2.slice(-round[1]), game+1);
        else
            winner = round[0]>round[1]?[1, player1]:[2, player2];

        if (winner[0] == 1)
            player1 = [round[1], round[0], ...player1];
        else
            player2 = [round[0], round[1], ...player2];
        i++;
    }
}
winner = playGame(player1, player2, 1);
console.log(`Answer 1: ${winner[1]}`);