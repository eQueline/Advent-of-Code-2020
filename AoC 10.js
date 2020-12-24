var array = $('pre').innerText.trimEnd().split('\n').map(a=>Number.parseInt(a));
array.push(0);
array.push(array.reduce((a,b)=>a>b?a:b)+3);
array = array.sort((a,b)=>a<b?-1:1);

var diff1=0, diff3=0;
for (let i=1; i<array.length; i++) {
    if (array[i]-array[i-1]==1) diff1++;
    if (array[i]-array[i-1]==3) diff3++;
}
console.log(`answer 1: ${diff1*diff3}`);

function countPaths(p1, p2) {
    if (p1==p2) return 1;
    let adapters = array.filter(a=>a>p1&&a<=p2&&a<=p1+3);
    let paths = 0;
    adapters.forEach((a)=>{
        paths += countPaths(a, p2);
    });
    return paths;
}

let points = array.filter((a,i,b)=>a-b[i-1]==3||i==0||i==b.length-1);
let paths = 1;
for (let i=1; i<points.length; i++) {
   paths *= countPaths(points[i-1], points[i]);
}
console.log(`answer 2: ${paths}`);