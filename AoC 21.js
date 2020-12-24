var input = $('pre').innerText.trimEnd().split('\n');
var recipes = [];
input.forEach((a)=>{
    let split = a.split(' (contains ');
    let recipe = [];
    recipe[0] = split[0].split(' ');
    recipe[1] = split[1].split(', ');
    recipe[1][recipe[1].length-1] = recipe[1][recipe[1].length-1].substr(0, recipe[1][recipe[1].length-1].length-1);
    recipes.push(recipe);
});
var ingredients = new Map();
recipes.map(a=>a[0]).flat().forEach(a=>ingredients.set(a));
ingredients = Array.from(ingredients.keys());

var allergens = new Map();
recipes.map(a=>a[1]).flat().forEach(a=>allergens.set(a, new Map()));
Array.from(allergens.keys()).forEach((allergen)=>{
    let recipeIngredients = recipes.filter(a=>a[1].includes(allergen)).map(a=>a[0]).flat();
    recipeIngredients.forEach(a=>allergens.get(allergen).set(a, true));
    recipeIngredients = allergens.get(allergen);
    Array.from(recipeIngredients.keys()).forEach((ingredient)=>{
        let cantContain = recipes.find(a=>a[1].includes(allergen)&&!a[0].includes(ingredient));
        if (cantContain != null) {
            //console.log(`${ingredient} cant contain ${allergen} because recipe ${cantContain} contains that allergy but not that ingredient`)
            allergens.get(allergen).delete(ingredient);
        }
    });
});

var noAllergy = ingredients.filter(a=>Array.from(allergens.values()).every(b=>!b.has(a)));
var apperances = recipes.reduce((a,b)=>a+b[0].filter(c=>noAllergy.includes(c)).length,0);
console.log(`Answer 1: ${apperances}`);

var determinedAllergens = [];
while (true) {
    let singleAllergens = Array.from(allergens.keys()).filter(a=>allergens.get(a).size==1&&!determinedAllergens.includes(a));
    if (singleAllergens.length == 0) break;
    singleAllergens.forEach((allergen)=>{
        let ingredient = Array.from(allergens.get(allergen).keys())[0];
        Array.from(allergens.keys()).filter(a=>a!=allergen).forEach((a)=>{
            if (allergens.get(a).has(ingredient))
                allergens.get(a).delete(ingredient);
        })
    });
    singleAllergens.forEach(a=>Array.from(allergens.keys()).filter(b=>b!=a).forEach(b=>allergens.get(b).has(a)?allergens.get(b).delete(a):null));
    determinedAllergens.push(...singleAllergens);
}
var dangerousList = Array.from(allergens.keys()).sort().map(a=>allergens.get(a).keys().next().value).join(',');
console.log(`Answer 1: ${dangerousList}`);