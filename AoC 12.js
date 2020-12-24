var array = $('pre').innerText.trimEnd().split('\n');

var direction = 0;
var x=0,y=0;
array.forEach((a)=>{
    let value = Number.parseInt(a.substr(1));
    if (a[0]=='F') {
        x += value*(direction-1)*(direction%2-1);
        y += -value*(direction-2)*(direction%2);
    }
    if (['N','S'].includes(a[0]))
        y += value * (a[0]=='N'?1:-1);
    if (['E','W'].includes(a[0]))
        x += value * (a[0]=='E'?1:-1);
    if (a[0]=='R')
        direction = (4+direction-value/90)%4;
    if (a[0]=='L')
        direction = (direction+value/90)%4;
});
console.log(`answer 1: ${Math.abs(x)+Math.abs(y)}`);

x=0,y=0;
var wpX=10,wpY=1;
array.forEach((a)=>{
    let value = Number.parseInt(a.substr(1));
    if (a[0]=='F') {
        x+=wpX*value;
        y+=wpY*value;
    }
    if (['N','S'].includes(a[0]))
        wpY += value * (a[0]=='N'?1:-1);
    if (['E','W'].includes(a[0]))
        wpX += value * (a[0]=='E'?1:-1);
    if (a[0]=='R') {
        let newX = value==180?-wpX:-wpY*(value/90-2);
        let newY = value==180?-wpY:wpX*(value/90-2);
        wpX=newX;
        wpY=newY;
    }
    if (a[0]=='L') {
        let newX = value==180?-wpX:wpY*(value/90-2);
        let newY = value==180?-wpY:-wpX*(value/90-2);
        wpX=newX;
        wpY=newY;
    }
});
console.log(`answer 2: ${Math.abs(x)+Math.abs(y)}`);