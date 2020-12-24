var array = $('pre').innerText.trimEnd().split('\n');
var ts = Number.parseInt(array[0]);
var buses = array[1].split(',').filter(a=>a!='x').map(a=>Number.parseInt(a));
//ts = 939;
//buses = [7,13,59,31,19];
var minBus, minTime = ts;
for (let i=0; i<buses.length; i++) {
    if (buses[i]-ts%buses[i] < minTime) {
        minTime = buses[i]-ts%buses[i];
        minBus = buses[i];
    }
}
console.log(`answer 1: ${minTime*minBus}`);

var operations = 0;
function findCongruence(x, y, mod) {
    let i = 0n;
    //while ((x*i-y)%mod != 0) i++;
    while ((mod*i+y)%x != 0n)
        i = i+1n;
    return (mod*i+y)/x;
}

var buses2 = array[1].split(',').map((a,i)=>[Number.parseInt(a),i]).filter(a=>!isNaN(a[0]));
var base = 1n;
var congruence = 0n;
for (let i=1; i<buses2.length; i++) {
    base = base * BigInt(buses2[i-1][0]);
    let nextBus = BigInt(buses2[i][0]);
    let offset = BigInt(buses2[i][1])
    congruence = nextBus * findCongruence(nextBus, congruence + offset, base) - offset;
}
console.log(`answer 2: ${congruence}`);
