var input = $('pre').innerText.trimEnd().split('\n').map(a=>a.split('').map(b=>b=='.'?false:true));
//var input = ';........;........;...#....;....#...;..###...;........;........;........'.split(';').map(a=>a.split('').map(b=>b=='.'?false:true));
var array = [];
var maxX,maxY,maxZ,maxW;
var startingX,startingY,startingZ,startingW;

function init3d() {
    array = [];
    maxX=6,maxY=6,maxZ=2;
    startingX=20,startingY=20,startingZ=20;
    for (let z=0; z<=startingZ*2; z++) {
        array[z] = [];
        for (let y=0; y<=startingY*2; y++) {
            array[z][y] = [];
            for (let x=0; x<=startingX*2; x++) {
                array[z][y][x] = false;
                if (z == startingZ && x>=16 && x<24 && y>=16 && y<24) {
                    array[z][y][x] = input[y-16][x-16];
                }
            }
        }
    }
}
function init4d() {
    array = [];
    maxX=6,maxY=6,maxZ=2,maxW=2;
    startingX=20,startingY=20,startingZ=20,startingW=20;
    for (let w=0; w<=startingW*2; w++) {
        array[w] = []
        for (let z=0; z<=startingZ*2; z++) {
            array[w][z] = [];
            for (let y=0; y<=startingY*2; y++) {
                array[w][z][y] = [];
                for (let x=0; x<=startingX*2; x++) {
                    array[w][z][y][x] = false;
                    if (w==startingW && z==startingZ && x>=16 && x<24 && y>=16 && y<24) {
                        array[w][z][y][x] = input[y-16][x-16];
                    }
                }
            }
        }
    }
}

function copy(src) {
    let cp;
    if (typeof(src) != 'object')
        cp = src;
    else {
        cp = [];
        for (let i=0; i<src.length; i++)
            cp[i] = copy(src[i]);
    }
    return cp;
}

function getNeighbours3d(x,y,z) {
    let cnt = 0;
    for (let dz=-1; dz<=1; dz++) {
        for (let dy=-1; dy<=1; dy++) {
            for (let dx=-1; dx<=1; dx++) {
                if (dx==0 && dy==0 && dz==0) continue;
                cnt += array[z+dz][y+dy][x+dx];
            }
        }
    }
    return cnt;
}

function getNeighbours4d(x,y,z,w) {
    let cnt = 0;
    for (let dw=-1; dw<=1; dw++)
        for (let dz=-1; dz<=1; dz++)
            for (let dy=-1; dy<=1; dy++)
                for (let dx=-1; dx<=1; dx++) {
                    if (dx==0 && dy==0 && dz==0 && dw==0) continue;
                    cnt += array[w+dw][z+dz][y+dy][x+dx];
                }
    return cnt;
}

function step3d() {
    let newArray = copy(array);
    for (let z=startingZ-maxZ; z<=startingZ+maxZ; z++) {
        for (let y=startingY-maxY; y<=startingY+maxY; y++) {
            for (let x=startingX-maxX; x<=startingX+maxX; x++) {
                let n = getNeighbours3d(x,y,z);
                if (array[z][y][x] && n!=2 && n!=3)
                    newArray[z][y][x] = false;
                else if (!array[z][y][x] && n==3)
                    newArray[z][y][x] = true;
                else
                    newArray[z][y][x] = array[z][y][x];
            }
        }
    }
    maxX++;maxY++;maxZ++;
    array = newArray;
}

function step4d() {
    let newArray = copy(array);
    for (let w=startingW-maxW; w<=startingW+maxW; w++)
        for (let z=startingZ-maxZ; z<=startingZ+maxZ; z++)
            for (let y=startingY-maxY; y<=startingY+maxY; y++)
                for (let x=startingX-maxX; x<=startingX+maxX; x++) {
                    let n = getNeighbours4d(x,y,z,w);
                    if (array[w][z][y][x] && n!=2 && n!=3)
                        newArray[w][z][y][x] = false;
                    else if (!array[w][z][y][x] && n==3)
                        newArray[w][z][y][x] = true;
                    else
                        newArray[w][z][y][x] = array[w][z][y][x];
                }
    maxX++;maxY++;maxZ++;maxW++;
    array = newArray;
}


init3d();
for (let i=1; i<=6; i++) {
    step3d();
}
console.log(`Answer 1: ${array.flat(2).filter(a=>a).length}`);

init4d();
for (let i=1; i<=6; i++) {
    step4d();
}
console.log(`Answer 1: ${array.flat(3).filter(a=>a).length}`);
/*
function printLayer(z) {
    console.log(array[z].map(y=>y.map(x=>x?'#':'.').join('')).join('\n'));
}
*/