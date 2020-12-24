var array = $('pre').innerText.trimEnd().split('\n\n');
var rules = array[0].split('\n');
var yourTicket = array[1].split('\n').slice(1)[0].split(',').map(val=>Number.parseInt(val));
var tickets = array[2].split('\n').slice(1);
var validTickets = [];

var rangeList = new Map();
rules.forEach((a)=>{
    let name = a.match(/[^:]+/)[0];
    let ranges = a.match(/\d+-\d+/g);
    ranges.forEach((range)=>{
        let rangeInstance = rangeList.get(name)||[];
        rangeInstance.push(range.split('-').map(val=>Number.parseInt(val)));
        rangeList.set(name, rangeInstance);
    })
});

let errorRate = 0;
tickets.forEach((a)=>{
    let values = a.split(',').map(val=>Number.parseInt(val));
    let valid = true;
    values.forEach((val)=>{
        if (!Array.from(rangeList).some(rangeInstance => rangeInstance[1].some(range=>val>=range[0]&&val<=range[1]))) {
            errorRate += val;
            valid = false;
        }
    }); 
    if (valid)
        validTickets.push(values) 
});
console.log(`Answer 1: ${errorRate}`);

var classes = [];
validTickets.push(yourTicket);
var length = validTickets[0].length;
var variants = [];
for (let i=0; i<length; i++) {
    let values = validTickets.reduce((a,b)=>(a.push(b[i]),a),[]);
    variants[i] = Array.from(rangeList).filter(rangeInstance => values.every(val=>rangeInstance[1].some(range=>val>=range[0]&&val<=range[1]))).map(a=>a[0]);
}
var cnt = 0;
while (Object.keys(classes).length<length && cnt<1000) {
    cnt++;
    let single = variants.findIndex(a=>a.length==1);
    let name = variants[single][0];
    classes[single] = name;
    for (let i=0; i<variants.length; i++) {
        let index = variants[i].findIndex(a=>a==name);
        if (index > -1) {
            variants[i] = [...variants[i].slice(0,index), ...variants[i].slice(index+1)];
        }
    }
}

var answer2 = 1;
classes.forEach((a,i)=>{
    answer2 *= a.includes('departure')?yourTicket[i]:1;
});
console.log(`Answer 2: ${answer2}`);