var array = $('pre').innerText.trimEnd().split('\n');
var mem = [];
var mask = '';

function convert(val) {
    let result = [];
    for (let i=0; i<mask.length; i++) {
        if (mask[i]!='X')
            result[i] = mask[i];
        else {
            if (mask.length-i>val.length)
                result[i] = '0';
            else
                result[i] = val[i-mask.length+val.length]
        }
    }
    return BigInt('0b' + result.join(''));
}

array.forEach((a)=>{
    if (a.includes('mask'))
        mask = a.substr(7);
    if (a.includes('mem')) {
        mem[a.substr(4, a.indexOf(']')-4)] = convert(Number.parseInt(a.substr(a.indexOf(']')+4)).toString(2));
    }
});
var answer1 = Object.keys(mem).reduce((a,b)=>a+mem[b], 0n);
console.log(`answer 1: ${answer1}`);


function convert2(val) {
    let result = [];
    for (let i=0; i<mask.length; i++) {
        if (mask[i]!='0')
            result[i] = mask[i];
        else {
            if (mask.length-i>val.length)
                result[i] = '0';
            else
                result[i] = val[i-mask.length+val.length]
        }
    }
    return result.join('');
}

function resolveX(address, list) {
    if (!address.includes('X')) {
        list.push(address);
        return;
    }
    resolveX(address.replace('X', '0'), list);
    resolveX(address.replace('X', '1'), list);
}

mem = [];
array.forEach((a)=>{
    if (a.includes('mask'))
        mask = a.substr(7);
    if (a.includes('mem')) {
        address = convert2(Number.parseInt(a.substr(4, a.indexOf(']')-4)).toString(2));
        value = Number.parseInt(a.substr(a.indexOf(']')+4));

        let addresses = [];
        resolveX(address, addresses);
        addresses.forEach((a)=>{
            mem[a] = value;
        });
    }
});
var answer2 = Object.keys(mem).reduce((a,b)=>a+mem[b], 0);
console.log(`answer 2: ${answer2}`);