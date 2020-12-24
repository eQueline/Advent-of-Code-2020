var array = $('pre').innerText.trimEnd().split('\n').map(a=>Number.parseInt(a));

function findSum(number, list) {
    for (let i=0; i<list.length; i++) {
        let number1 = list[i];
        let number2 = list.find(a=>number1+a==number);
        if (number2 != null) return true;
    }
    return false;
}

var index = 25;
while (true || index>=array.length) {
    let list = array.slice(index-25,index);
    let number = array[index];
    if (!findSum(number, list)) break;
    index++;
}
var answer1 = array[index];
console.log(`answer 1: ${answer1}`);

var answer2 = 0;
for (let i=0; i<array.length; i++) {
    let sum = 0;
    let j=i;
    let range = [];
    while (sum<answer1) {
        let number = array[j++];
        range.push(number);
        sum += number;
    }
    if (sum == answer1) {
        answer2 = range.reduce((a,b)=>a>b?a:b)+range.reduce((a,b)=>a<b?a:b);
        break;
    }
}
console.log(`answer 2: ${answer2}`);