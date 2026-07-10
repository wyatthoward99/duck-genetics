document
.getElementById("calculate")
.onclick=function(){


let male=parseGenotype(
document.getElementById("male").value
);


let female=parseGenotype(
document.getElementById("female").value
);



let offspring=crossParents(
male,
female
);



let output="";


offspring.forEach(o=>{


output+=`

<div class="result">

<b>${getPhenotype(o.genotype)}</b><br>

${JSON.stringify(o.genotype)}

<br>

Probability:
${o.percent}%

</div>

`;


});


document.getElementById("results").innerHTML=output;


};