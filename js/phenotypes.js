function getPhenotype(genotype){


let traits=[];


if(genotype.E?.includes("E"))

traits.push("Extended Black");


if(genotype.Bl?.includes("Bl"))

traits.push("Blue");


if(genotype.M?.includes("M+"))

traits.push("Mallard Pattern");


if(traits.length===0)

traits.push("Unknown");


return traits.join(" + ");

}