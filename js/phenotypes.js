
const FULL_GENOTYPE_NAMES = {
	"male|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Mallard or Grey",

	"female|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Mallard or Grey",
	
	"male|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Blue Fawn",

	"female|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Blue Fawn",
	
	"male|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Pastel",

	"female|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Pastel",
	
	"male|M:M+/M+|Li:Li+/Li+|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Lavender",

	"female|M:M+/M+|Li:Li+/Li+|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Lavender",
	
	"male|M:M+/Md|Li:Li+/Li+|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Lavender",

	"female|M:M+/Md|Li:Li+/Li+|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Lavender",
	
	"male|M:Md/Md|Li:Li+/Li+|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Lavender",

	"female|M:Md/Md|Li:Li+/Li+|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Lavender",
	
	"male|M:M+/M+|Li:Li+/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Lavender",

	"female|M:M+/M+|Li:Li+/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Lavender",
	
	"male|M:M+/Md|Li:Li+/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Lavender",

	"female|M:M+/Md|Li:Li+/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Lavender",
	
	"male|M:Md/Md|Li:Li+/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Lavender",

	"female|M:Md/Md|Li:Li+/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Lavender",
	
	"male|M:M+/M+|Li:li/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Lavender",

	"female|M:M+/M+|Li:li/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Lavender",
	
	"male|M:M+/Md|Li:li/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Lavender",

	"female|M:M+/Md|Li:li/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Lavender",
	
	"male|M:Md/Md|Li:li/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Lavender",

	"female|M:Md/Md|Li:li/li|E:E/E|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Lavender",
	
	"male|M:M+/M+|Li:li/li|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Trout",

	"female|M:M+/M+|Li:li/li|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Trout",
	
	"male|M:M+/M+|Li:li/li|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Blue Trout",

	"female|M:M+/M+|Li:li/li|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Blue Trout",
	
	"male|M:M+/M+|Li:li/li|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Apricot Trout",

	"female|M:M+/M+|Li:li/li|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Apricot Trout",
	
	"male|M:M+/M+|Li:lih/lih|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Snowy",

	"female|M:M+/M+|Li:lih/lih|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Snowy",
	
	"male|M:M+/M+|Li:lih/lih|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Blue Snowy",

	"female|M:M+/M+|Li:lih/lih|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Blue Snowy",
	
	"male|M:M+/M+|Li:lih/lih|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Apricot Snowy",

	"female|M:M+/M+|Li:lih/lih|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Apricot Snowy",
	
	"male|M:M+/Md|Li:lih/lih|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Snowy",

	"female|M:M+/Md|Li:lih/lih|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Snowy",
	
	"male|M:M+/Md|Li:lih/lih|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Blue Snowy",

	"female|M:M+/Md|Li:lih/lih|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Blue Snowy",
	
	"male|M:M+/Md|Li:lih/lih|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Apricot Snowy",

	"female|M:M+/Md|Li:lih/lih|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Apricot Snowy",
	
	"male|M:Md/Md|Li:lih/lih|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Snowy",

	"female|M:Md/Md|Li:lih/lih|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Snowy",
	
	"male|M:Md/Md|Li:lih/lih|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Blue Snowy",

	"female|M:Md/Md|Li:lih/lih|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Blue Snowy",
	
	"male|M:Md/Md|Li:lih/lih|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Apricot Snowy",

	"female|M:Md/Md|Li:lih/lih|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Apricot Snowy",
	
	"male|M:M+/Md|Li:li/lih|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Aleutian",

	"female|M:M+/Md|Li:li/lih|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Aleutian",
	
	"male|M:M+/Md|Li:li/lih|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Blue Aleutian",

	"female|M:M+/Md|Li:li/lih|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Blue Aleutian",
	
	"male|M:M+/Md|Li:li/lih|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Apricot Aleutian",

	"female|M:M+/Md|Li:li/lih|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Apricot Aleutian",
	
	"male|M:Md/Md|Li:li/lih|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Spot",

	"female|M:Md/Md|Li:li/lih|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Spot",
	
	"male|M:Md/Md|Li:li/lih|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Blue Spot",

	"female|M:Md/Md|Li:li/lih|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Blue Spot",
	
	"male|M:Md/Md|Li:li/lih|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Apricot Spot",

	"female|M:Md/Md|Li:li/lih|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Apricot Spot",
};
function hasAllele(genotype, gene, allele) {
  return Array.isArray(genotype[gene]) && genotype[gene].includes(allele);
}

function isHomozygous(genotype, gene, allele) {
  return Array.isArray(genotype[gene]) && genotype[gene].length === 2 && genotype[gene][0] === allele && genotype[gene][1] === allele;
}

function createFullGenotypeKey(genotype, sex) {
  const body = LOCUS_ORDER.filter(gene => Array.isArray(genotype[gene])).map(gene => `${gene}:${genotype[gene].join("/")}`).join("|");
  return `${sex}|${body}`;
}

function chocolateStatus(genotype, sex) {
  const alleles = genotype.D || [];
  if (sex === "male") {
    return {
      chocolate: alleles[0] === "d" && alleles[1] === "d",
      split: alleles.includes("D+") && alleles.includes("d")
    };
  }
  if (sex === "female") {
    const zAllele = alleles.find(allele => allele !== "W");
    return { chocolate: zAllele === "d", split: false };
  }
  return { chocolate: false, split: false };
}


function buffStatus(genotype, sex) {
  const alleles = genotype.Bu || [];
  if (sex === "male") {
    return {
      buff: alleles[0] === "bu" && alleles[1] === "bu",
      split: alleles.includes("Bu+") && alleles.includes("bu")
    };
  }
  if (sex === "female") {
    const zAllele = alleles.find(allele => allele !== "W");
    return { buff: zAllele === "bu", split: false };
  }
  return { buff: false, split: false };
}

function buildFallbackName(genotype, sex) {
  const parts = [];
  const chocolate = chocolateStatus(genotype, sex);
  const buff = buffStatus(genotype, sex);

  if (isHomozygous(genotype, "C", "c")) {
    parts.push("Recessive White");
  } else {
    let base = "";

    if (hasAllele(genotype, "E", "E")) {
      if (isHomozygous(genotype, "Bl", "Bl")) base = "Silver";
      else if (hasAllele(genotype, "Bl", "Bl")) base = "Blue";
      else base = "Black";
    } else {
      if (hasAllele(genotype, "M", "MR")) base = "Restricted";
      else if (hasAllele(genotype, "M", "M+")) base = "Mallard";
      else if (isHomozygous(genotype, "M", "Md")) base = "Dusky";
      else base = "Patterned";

      if (isHomozygous(genotype, "Bl", "Bl")) base = `Silver ${base}`;
      else if (hasAllele(genotype, "Bl", "Bl")) base = `Blue ${base}`;
    }

    if (chocolate.chocolate) {
      if (base === "Black") base = "Chocolate";
      else if (base === "Blue") base = "Lilac";
      else base = `Chocolate ${base}`;
    }

    parts.push(base);

    if (isHomozygous(genotype, "Li", "lih")) parts.push("Harlequin");
    else if (hasAllele(genotype, "Li", "li")) parts.push("Light Phase");

    if (hasAllele(genotype, "R", "R")) parts.push("Runner Pattern");
    if (buff.buff) parts.push("Buff");
    if (chocolate.split) parts.push("(Split Chocolate)");
    if (buff.split) parts.push("(Split Buff)");
  }

  

  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function getPhenotype(genotype, sex) {
  const key = createFullGenotypeKey(genotype, sex);
  return FULL_GENOTYPE_NAMES[key] || buildFallbackName(genotype, sex);
}
