/*
====================================================
 Duck Genetics Calculator
 phenotypes.js

 Phenotype naming system using:
 - Exact genotype overrides
 - A centralized color matrix
 - Pattern, phase, runner, buff, and white rules
====================================================
*/


/*
----------------------------------------------------
Exact genotype-name overrides

Add only genotypes whose automatic name needs to be
corrected.

These exact names take priority over every other rule.
----------------------------------------------------
*/

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
	
	"male|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Nutmeg",

	"female|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Nutmeg",
	
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
	
	"male|M:M+/M+|Li:li/li|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Golden Trout",

	"female|M:M+/M+|Li:li/li|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Golden Trout",
	
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
	
	"male|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:d/d|Bu:bu/bu":
    "Brown Orpington",

	"female|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:d/W|Bu:bu/W":
    "Brown Orpington",
	
	"male|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:d/d|Bu:bu/bu":
    "Buff Orpington",

	"female|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:d/W|Bu:bu/W":
    "Buff Orpington",
	
	"male|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/d|Bu:bu/bu":
    "Blonde Orpington",

	"female|M:M+/M+|Li:Li+/Li+|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:r+/r+|D:d/W|Bu:bu/W":
    "Blonde Orpington",
	
	"male|M:Md/Md|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:d/d|Bu:Bu+/Bu+":
    "Khaki",

	"female|M:Md/Md|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:d/W|Bu:Bu+/W":
    "Khaki",
	
	"male|M:Md/Md|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Dark Dusky",

	"female|M:Md/Md|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:r+/r+|D:D+/W|Bu:Bu+/W":
    "Dark Dusky",	
	
	"male|M:md/md|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:R/R|D:d/d|Bu:Bu+/Bu+":
    "Fawn & White",

	"female|M:md/md|Li:Li+/Li+|E:e+/e+|Bl:bl+/bl+|C:C+/C+|R:R/R|D:d/W|Bu:Bu+/W":
    "Fawn & White",
	
	"male|M:md/md|Li:Li+/Li+|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:R/R|D:d/d|Bu:Bu+/Bu+":
    "US Fawn & White",

	"female|M:md/md|Li:Li+/Li+|E:e+/e+|Bl:Bl/Bl|C:C+/C+|R:R/R|D:d/W|Bu:Bu+/W":
    "US Fawn & White",

  /*
  Example:

  "male|M:M+/M+|Li:Li+/Li+|E:E/E|Bl:Bl/bl+|C:C+/C+|R:r+/r+|D:D+/D+|Bu:Bu+/Bu+":
    "Correct Name"
  */

};


/*
----------------------------------------------------
Color matrix

Rows represent the Blue-locus condition:

none:
  bl+/bl+

blue:
  Bl/bl+

splash:
  Bl/Bl

Each row contains:
- normal color
- Chocolate color

Change the names here whenever your preferred naming
terminology differs.
----------------------------------------------------
*/

const COLOR_MATRIX = {

  solid: {

    none: {
      normal: "Black",
      chocolate: "Chocolate"
    },

    blue: {
      normal: "Blue",
      chocolate: "Lilac"
    },

    splash: {
      normal: "Silver",
      chocolate: "Lavender"
    }

  },


  patterned: {

    none: {
      normal: "",
      chocolate: "Chocolate"
    },

    blue: {
      normal: "Blue",
      chocolate: "Lilac"
    },

    splash: {
      normal: "Silver",
      chocolate: "Lavender"
    }

  }

};


/*
----------------------------------------------------
Basic genotype helpers
----------------------------------------------------
*/

function hasAllele(genotype, gene, allele) {
  return (
    Array.isArray(genotype[gene]) &&
    genotype[gene].includes(allele)
  );
}


function isHomozygous(genotype, gene, allele) {
  return (
    Array.isArray(genotype[gene]) &&
    genotype[gene].length === 2 &&
    genotype[gene][0] === allele &&
    genotype[gene][1] === allele
  );
}


/*
----------------------------------------------------
Create the exact internal genotype key

Female Chocolate retains W internally, even though W
is hidden from the visible calculator results.
----------------------------------------------------
*/

function createFullGenotypeKey(genotype, sex) {
  const body = LOCUS_ORDER
    .filter(gene => Array.isArray(genotype[gene]))
    .map(gene => {
      return `${gene}:${genotype[gene].join("/")}`;
    })
    .join("|");

  return `${sex}|${body}`;
}


/*
----------------------------------------------------
Determine Chocolate status

Male:
D+/D+ = normal
D+/d  = split Chocolate
d/d   = Chocolate

Female:
D+ = normal
d  = Chocolate

The female W chromosome remains internal.
----------------------------------------------------
*/

function getChocolateStatus(genotype, sex) {
  const alleles = genotype.D || [];

  if (sex === "male") {
    const chocolate =
      alleles.length === 2 &&
      alleles[0] === "d" &&
      alleles[1] === "d";

    const split =
      alleles.includes("D+") &&
      alleles.includes("d");

    return {
      chocolate,
      split
    };
  }


  if (sex === "female") {
    const zAllele = alleles.find(
      allele => allele !== "W"
    );

    return {
      chocolate: zAllele === "d",
      split: false
    };
  }


  return {
    chocolate: false,
    split: false
  };
}

/*
----------------------------------------------------
Buff status

This makes Buff display like a sex-linked trait,
even though the current genetics engine still stores
two Buff alleles for both sexes.
----------------------------------------------------
*/

function getBuffStatus(genotype, sex) {
  const alleles = genotype.Bu || [];

  const hasNormal =
    alleles.includes("Bu+");

  const hasBuff =
    alleles.includes("bu");

  /*
   * Drakes:
   *
   * Bu+/Bu+ = normal
   * Bu+/bu  = split Buff
   * bu/bu   = Buff
   */
  if (sex === "male") {
    return {
      buff:
        alleles.length === 2 &&
        alleles[0] === "bu" &&
        alleles[1] === "bu",

      split:
        hasNormal &&
        hasBuff
    };
  }

  /*
   * Ducks:
   *
   * Females cannot be displayed as split Buff.
   * Any female genotype containing bu is shown
   * as Buff.
   */
  if (sex === "female") {
    return {
      buff: hasBuff,
      split: false
    };
  }

  return {
    buff: false,
    split: false
  };
}

/*
----------------------------------------------------
Determine the Blue-locus state
----------------------------------------------------
*/

function getBlueState(genotype) {
  if (isHomozygous(genotype, "Bl", "Bl")) {
    return "splash";
  }

  if (hasAllele(genotype, "Bl", "Bl")) {
    return "blue";
  }

  return "none";
}


/*
----------------------------------------------------
Determine the Pattern-locus name
----------------------------------------------------
*/

function getPatternName(genotype) {
  const alleles = genotype.M || [];

  /*
   * Restricted takes priority when MR is present.
   */
  if (alleles.includes("MR")) {
    return "Restricted";
  }

  /*
   * Wild-type Mallard pattern.
   */
  if (alleles.includes("M+")) {
    return "Mallard";
  }

  /*
   * Md/Md
   */
  if (
    alleles.length === 2 &&
    alleles[0] === "Md" &&
    alleles[1] === "Md"
  ) {
    return "Dusky";
  }

  return "Patterned";
}


/*
----------------------------------------------------
Determine the Phase-locus description
----------------------------------------------------
*/

function getPhaseName(genotype) {
  const alleles = genotype.Li || [];

  if (
    alleles.length === 2 &&
    alleles[0] === "lih" &&
    alleles[1] === "lih"
  ) {
    return "Harlequin";
  }

  if (alleles.includes("lih")) {
    return "Split Harlequin";
  }

  if (
    alleles.length === 2 &&
    alleles[0] === "li" &&
    alleles[1] === "li"
  ) {
    return "Light Phase";
  }

  if (alleles.includes("li")) {
    return "Split Light Phase";
  }

  return "";
}


/*
----------------------------------------------------
Resolve the main visible color through the matrix
----------------------------------------------------
*/

function resolveMatrixColor(
  genotype,
  sex,
  colorFamily
) {
  const blueState =
    getBlueState(genotype);

  const chocolate =
    getChocolateStatus(
      genotype,
      sex
    );

  const chocolateKey =
    chocolate.chocolate
      ? "chocolate"
      : "normal";

  const family =
    COLOR_MATRIX[colorFamily];

  if (!family) {
    return "";
  }

  const row =
    family[blueState];

  if (!row) {
    return "";
  }

  return row[chocolateKey] || "";
}


/*
----------------------------------------------------
Build the automatic phenotype name
----------------------------------------------------
*/

function buildFallbackName(genotype, sex) {
  const parts = [];

  /*
  --------------------------------------------------
  Recessive White

  c/c masks the other visible color and pattern rules.
  --------------------------------------------------
  */

  if (isHomozygous(genotype, "C", "c")) {
    parts.push("Recessive White");

    if (sex === "male") {
      parts.push("Drake");
    } else if (sex === "female") {
      parts.push("Duck");
    }

    return parts.join(" ");
  }


  /*
  --------------------------------------------------
  Extended Black determines whether this is a solid
  color or a patterned phenotype.
  --------------------------------------------------
  */

  const extendedBlack =
    hasAllele(genotype, "E", "E");

  const colorFamily =
    extendedBlack
      ? "solid"
      : "patterned";

  const matrixColor =
    resolveMatrixColor(
      genotype,
      sex,
      colorFamily
    );


  /*
  --------------------------------------------------
  Solid phenotype

  Extended Black hides the Pattern-locus name.
  --------------------------------------------------
  */

  if (extendedBlack) {
    parts.push(
      matrixColor || "Black"
    );
  }


  /*
  --------------------------------------------------
  Patterned phenotype

  Combine the matrix color with Mallard, Restricted,
  Dusky, or another Pattern-locus name.
  --------------------------------------------------
  */

  else {
    const patternName =
      getPatternName(genotype);

    if (matrixColor) {
      parts.push(matrixColor);
    }

    parts.push(patternName);
  }


  /*
  --------------------------------------------------
  Phase locus
  --------------------------------------------------
  */

  const phaseName =
    getPhaseName(genotype);

  if (phaseName) {
    parts.push(phaseName);
  }


  /*
--------------------------------------------------
Runner pattern

r+/r+ = no Runner label
R/r+  = Variable Runner Pattern
R/R   = Runner Pattern
--------------------------------------------------
*/

if (isHomozygous(genotype, "R", "R")) {
  parts.push("Runner Pattern");
} else if (
  hasAllele(genotype, "R", "R") &&
  hasAllele(genotype, "R", "r+")
) {
  parts.push("Variable Runner Pattern");
}


/*
--------------------------------------------------
Buff

Displayed using the same male/female expression
rules as a sex-linked trait.
--------------------------------------------------
*/

const buff =
  getBuffStatus(
    genotype,
    sex
  );

if (buff.buff) {
  parts.push("Buff");
}

if (buff.split) {
  parts.push("(Split Buff)");
}


  /*
  --------------------------------------------------
  Split Chocolate male

  Female ducks cannot be split Chocolate because they
  have only one Z-linked Chocolate allele.
  --------------------------------------------------
  */

  const chocolate =
    getChocolateStatus(
      genotype,
      sex
    );

  if (chocolate.split) {
    parts.push("(Split Chocolate)");
  }


  /*
  --------------------------------------------------
  */

  return parts
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}


/*
----------------------------------------------------
Main phenotype function used by app.js

Priority:

1. Exact name from FULL_GENOTYPE_NAMES
2. Automatically generated matrix name
----------------------------------------------------
*/

function getPhenotype(genotype, sex) {
  const key =
    createFullGenotypeKey(
      genotype,
      sex
    );

  if (FULL_GENOTYPE_NAMES[key]) {
    return FULL_GENOTYPE_NAMES[key];
  }

  return buildFallbackName(
    genotype,
    sex
  );
}