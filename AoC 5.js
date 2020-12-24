var array = $('pre').innerText.trimEnd().split('\n');
var seats = array.map((a)=>{
    let row = Number.parseInt(a.substr(0,7).replace(/B|F/g, $0=>$0=='B'?1:0), 2);
    let column = Number.parseInt(a.substr(7).replace(/R|L/g, $0=>$0=='R'?1:0), 2);
    return [row,column,row*8+column];
});
var answer1 = seats.reduce((a,b)=>a>b[2]?a:b[2]);
console.log(`answer 1: ${answer1}`);


seats = seats.map(a=>a[2]).sort((a,b)=>a>b?1:-1);
var answer2 = seats.find((a,i,ar)=>ar[i-1]==a-1&&ar[i+1]==a+2)+1;
console.log(`answer 2: ${answer2}`);
