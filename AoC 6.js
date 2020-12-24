var array = $('pre').innerText.trimEnd().split('\n\n');
var answer1 = 0;
array.forEach((a)=>{
    answer1 += new Set(a.match(new RegExp('([a-z])', 'g'))).size;
});
console.log(`answer 1: ${answer1}`);

var answer2 = 0;
array.forEach((ar)=>{
    var groupCount = ar.split('\n').length;
    var answers = [...ar.replaceAll('\n','')].reduce((a,b)=>{a[b]=a[b]==null?1:a[b]+1; return a}, {});
    answer2 += Object.values(answers).filter(a=>a==groupCount).length;
});
console.log(`answer 2: ${answer2}`);