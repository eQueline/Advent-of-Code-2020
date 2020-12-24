var array = $('pre').innerText.trimEnd().split('\n');
array = array.map(a=>Number.parseInt(a));
var min = array.reduce((a,b)=>a<b?a:b);
array1 = array.filter(a=>a+min<2020);

var result1 = 0;
let cnt=0;
for (let i=0; i<array1.length; i++) {
    if (result1 > 0) break;
    let element = array1.find(a=>a+array1[i]==2020);
    if (element > 0) {
        result1 = array1[i]*element;
        break;
    }
}
console.log(`answer 1: ${result1}`);

var min2 =  array1.reduce((a,b)=>a<b&&a>min?a:b);
var array2 = array.filter(a=>a+min+min2<2020);
var result2 = 0;
cnt=0;
for (let i=0; i<array2.length; i++) {
    if (result2 > 0) break;
    for (let j=i+1; j<array2.length-i-1; j++) {
        if (result2 > 0) break;
        let sum = array2[i]+array2[j];
        if (sum+min > 2020) continue;
        let element = array1.find(a=>a+sum==2020);
        if (element > 0) {
            result2 = array2[i]*array2[j]*element;
            break;
        }
    }
}
console.log(`answer 2: ${result2}`);