var input = $('pre').innerText.trimEnd().split('\n');
var mem = [];
function getOperand(line) {
    let c;
    do {
        c = line.pop();
        if (c=='*') {
            let operand1 = mem.pop();
            let operand2 = getOperand(line);
            mem.push(operand1 * operand2);
            return operand1 * operand2;
        } else if (c=='+') {
            let operand1 = mem.pop();
            let operand2 = getOperand(line);
            mem.push(operand1 + operand2);
            return operand1 + operand2;
        } else if (c==')') 
            getOperand(line);
        else if (c=='(' || c==null) 
            return mem.pop();
        else 
            mem.push(Number.parseInt(c));
    } while (c!=null);
}

var sum = 0;
input.forEach((a)=>{
    let line = a.replace(/ /g, '').split('');
    sum += getOperand(line);
})
console.log(`Answer 1: ${sum}`);

function calc(str) {
    var resStr = str;
    while (resStr.match(/[\)\(]/) != null) {
        let match = resStr.match(/\([^\(\)]*\)/);
        let string = match[0].substr(1, match[0].length-2);
        resStr = resStr.replace(match[0], calc(string));
    }
    let sum = 1;
    if (resStr.includes('*')) {
        let matches = resStr.split('*');
        matches.forEach((a)=>{
            sum *= calc(a);
        });
    } else {
        sum = eval(resStr);
    }
    return sum;
}

var res = 0;
input.forEach((a)=>{
    res += calc(a);
})
console.log(`Answer 2: ${res}`);