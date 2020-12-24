var array;

function resetArray() {
    array = $('pre').innerText.trimEnd().split('\n');
    array = array.map(a=>[a.substr(0,3), a.substr(4), 0]);
}

function run(halt) {
    let acc = 0;
    let op = 0;
    while (true) {
        if (halt && op>=array.length) return acc;
        let instruction = array[op];
        if (instruction[2] > 0) {
            return halt?null:acc;
        }
        switch (instruction[0]) {
            case 'nop':
                op++;
                break;
            case 'acc':
                acc += Number.parseInt(instruction[1]);
                op++;
                break;
            case 'jmp':
                op += Number.parseInt(instruction[1]);
                break;
        }
        instruction[2]++;
    }
}
resetArray();
var answer1 = run(false);
console.log(`answer 1: ${answer1}`);

var possibleChanges = array.map((a,i)=>(a[0]=='jmp'||a[0]=='nop')?i:null).filter(a=>a!=null);
var answer2;
var i;
for (i=0; i<possibleChanges.length; i++) {
    resetArray();
    let instruction = array[possibleChanges[i]];
    instruction[0] = instruction[0]=='jmp'?'nop':'jmp';
    answer2 = run(true);
    if (answer2 != null) break;
}
console.log(`answer 2: ${answer2}`);