function parseGenotype(text){

let genes={};


text.trim()
.split("\n")
.forEach(line=>{


let parts=line.split(":");


if(parts.length!==2)
return;


let gene=parts[0].trim();

let alleles=parts[1]
.trim()
.split("/");


genes[gene]=alleles;


});


return genes;

}



function makeGametes(genotype){


let keys=Object.keys(genotype);


let gametes=[{}];


keys.forEach(gene=>{


let next=[];


gametes.forEach(g=>{


let a=gene;


let copy1={...g};

copy1[gene]=genotype[gene][0];

next.push(copy1);



let copy2={...g};

copy2[gene]=genotype[gene][1];

next.push(copy2);


});


gametes=next;


});


return gametes;

}




function crossParents(male,female){


let maleGametes=makeGametes(male);

let femaleGametes=makeGametes(female);


let results={};


maleGametes.forEach(m=>{


femaleGametes.forEach(f=>{


let child={};


Object.keys(m).forEach(g=>{


child[g]=[m[g],f[g]];


});


let key=JSON.stringify(child);


if(!results[key]){

results[key]={

genotype:child,

count:0

};

}


results[key].count++;


});


});



let total=maleGametes.length*femaleGametes.length;


return Object.values(results)
.map(r=>{

r.percent=(r.count/total*100).toFixed(2);

return r;

});


}