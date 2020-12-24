var array = $('pre').innerText.trimEnd().split('\n');
var map = array.map(a=>a.match(/(\d+)-(\d+) (\w): (\w+)/).slice(1,5));
var answer1 = map.filter(a=>{
        let cnt = (a[3].match(new RegExp(a[2], 'g')) || []).length;
        return (cnt >= a[0] && cnt <= a[1]);
    }
);
console.log(`answer 1: ${answer1.length}`);

var answer2 = map.filter(a=>{
        return ((a[3][a[0]-1]==a[2])+(a[3][a[1]-1]==a[2])==1);
    }
);
console.log(`answer 2: ${answer2.length}`);