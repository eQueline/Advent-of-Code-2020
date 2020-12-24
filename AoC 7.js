var array = $('pre').innerText.trimEnd().split('\n');
array = array.map((a)=>{
    let str = a.split(' bags contain ');
    if (str[1] == 'no other bags.') return;
    let bag = str[0];
    let contains = str[1].split(', ').map(b=>[b[0], b.substr(2, b.indexOf('bag')-3)]);
    return {bag:bag, contains:contains};
}).filter(a=>a!=null);

var root = 'shiny gold';
var bagSet = new Set();
function getParentBags(bag) {
    if (bagSet.has(bag)) return;
    let bags = array.filter(a=>a.contains!=null&&a.contains.find(b=>b[1]==bag)!=null);
    bags.forEach((a)=>{
        if (bagSet.has(a.bag)) return;
        getParentBags(a.bag);
        bagSet.add(a.bag);
    });
}
getParentBags(root);
console.log(`answer 1: ${bagSet.size}`);

var totalCount = 0;
function getChildBags(bag, amount) {
    let oBag = array.find(a=>a.bag==bag);
    if (oBag == null) return;
    oBag.contains.forEach((a)=>{
        totalCount += amount * a[0];
        getChildBags(a[1], amount * a[0]);
    });
}
getChildBags(root, 1);
console.log(`answer 2: ${totalCount}`);