const FULL_GENOTYPE_NAMES = {
  // Add exact names here. Use the internal key shown in the console if needed.
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

function buildFallbackName(genotype, sex) {
  const parts = [];
  const chocolate = chocolateStatus(genotype, sex);

  if (isHomozygous(genotype, "C", "c")) {
    parts.push("Recessive White");
  } else {
    let base = "";

    if (hasAllele(genotype, "E", "E")) {
      if (isHomozygous(genotype, "Bl", "Bl")) base = "Splash";
      else if (hasAllele(genotype, "Bl", "Bl")) base = "Blue";
      else base = "Black";
    } else {
      if (hasAllele(genotype, "M", "MR")) base = "Restricted";
      else if (hasAllele(genotype, "M", "M+")) base = "Mallard";
      else if (isHomozygous(genotype, "M", "Md")) base = "Dusky";
      else base = "Patterned";

      if (isHomozygous(genotype, "Bl", "Bl")) base = `Splash ${base}`;
      else if (hasAllele(genotype, "Bl", "Bl")) base = `Blue ${base}`;
    }

    if (chocolate.chocolate) {
      if (base === "Black") base = "Chocolate";
      else if (base === "Blue") base = "Lilac";
      else base = `Chocolate ${base}`;
    }

    parts.push(base);

    if (isHomozygous(genotype, "Li", "lih")) parts.push("Harlequin Phase");
    else if (hasAllele(genotype, "Li", "li")) parts.push("Light Phase");

    if (hasAllele(genotype, "R", "R")) parts.push("Runner Pattern");
    if (isHomozygous(genotype, "Bu", "bu")) parts.push("Buff");
    if (chocolate.split) parts.push("(Split Chocolate)");
  }

  if (sex === "male") parts.push("Drake");
  else if (sex === "female") parts.push("Duck");

  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function getPhenotype(genotype, sex) {
  const key = createFullGenotypeKey(genotype, sex);
  return FULL_GENOTYPE_NAMES[key] || buildFallbackName(genotype, sex);
}
