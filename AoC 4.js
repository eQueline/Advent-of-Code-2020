var array = $('pre').innerText.trimEnd().split('\n\n');

var answer1 = 0;
var expectedFields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
array.forEach(a=>{
    let fields = a.match(/(\w+)/g).filter((a,i)=>i%2==0);
    if (expectedFields.every(a=>fields.includes(a))) answer1++;
});
console.log(`answer 1: ${answer1}`);

var answer2 = 0;
var valids = [];
array.forEach(p=>{
    //let fields = a.match(/([a-z0-9#]+)/g);
    let fields = {}; 
    p.match(/([a-z0-9#]+)/g).forEach((a,i,ar)=>{
        if (i%2==0) fields[a]=ar[i+1];
    });
    if (fields['byr'] != null 
        && fields['byr'].match(/[^\d]/) == null
        && Number.parseInt(fields['byr']) >= 1920 
        && Number.parseInt(fields['byr']) <= 2002
        && fields['iyr'] != null
        && fields['iyr'].match(/[^\d]/) == null
        && Number.parseInt(fields['iyr']) >= 2010 
        && Number.parseInt(fields['iyr']) <= 2020
        && fields['eyr'] != null
        && fields['eyr'].match(/[^\d]/) == null
        && Number.parseInt(fields['eyr']) >= 2020 
        && Number.parseInt(fields['eyr']) <= 2030
        && fields['hgt'] != null
        && ((fields['hgt'].search('in') > 0
            && Number.parseInt(fields['hgt']) >= 59
            && Number.parseInt(fields['hgt']) <= 76)
            ||
            (fields['hgt'].search('cm') > 0
            && Number.parseInt(fields['hgt']) >= 150
            && Number.parseInt(fields['hgt']) <= 193))
        && fields['hcl'] != null
        && fields['hcl'].match(/^#[0-9a-f]{6}$/) != null
        && fields['ecl'] != null
        && ['amb','blu','brn','gry','grn','hzl','oth'].includes(fields['ecl'])
        && fields['pid'] != null
        && fields['pid'].match(/^\d{9}$/) != null) 
    {
        answer2++;
        valids.push(fields);
    } else
        console.log(`Invalid ${p}`);
});
console.log(`answer 2: ${answer2}`);