class Parent {
  constructor(genes, sex) {
    if (!genes || typeof genes !== "object") throw new Error("Parent genes must be an object.");
    if (sex !== "ZZ" && sex !== "ZW") throw new Error('Parent sex must be "ZZ" or "ZW".');
    this.genes = genes;
    this.sex = sex;
  }
}

function alleleRank(gene, allele) {
  if (allele === "W") return Number.MAX_SAFE_INTEGER;
  const order = GENES[gene]?.alleles || [];
  const index = order.indexOf(allele);
  return index === -1 ? Number.MAX_SAFE_INTEGER - 1 : index;
}

function canonicalAlleles(gene, alleles) {
  return [...alleles].sort((a, b) => alleleRank(gene, a) - alleleRank(gene, b));
}

function gameteKey(gamete) {
  return LOCUS_ORDER.filter(gene => Object.prototype.hasOwnProperty.call(gamete.genes, gene)).map(gene => {
    const value = gamete.genes[gene];
    return typeof value === "object" && value !== null
      ? `${gene}:${value.chromosome}:${value.allele ?? ""}`
      : `${gene}:${value}`;
  }).join("|");
}

function mergeGametes(gametes) {
  const merged = new Map();
  gametes.forEach(gamete => {
    const key = gameteKey(gamete);
    if (!merged.has(key)) merged.set(key, { genes: gamete.genes, probability: 0 });
    merged.get(key).probability += gamete.probability;
  });
  return Array.from(merged.values());
}

function makeGametes(parent) {
  let gametes = [{ genes: {}, probability: 1 }];

  LOCUS_ORDER.forEach(gene => {
    const alleles = parent.genes[gene];
    if (!alleles) return;

    const definition = GENES[gene];
    if (!definition) throw new Error(`Gene "${gene}" is not defined in genes.js.`);

    const next = [];

    if (definition.type === "sex-linked") {
      if (parent.sex === "ZZ") {
        if (alleles.length !== 2 || alleles.includes("W")) throw new Error(`A drake needs two Z-linked alleles at ${gene}.`);
        gametes.forEach(gamete => {
          alleles.forEach(allele => next.push({
            genes: { ...gamete.genes, [gene]: { chromosome: "Z", allele } },
            probability: gamete.probability * 0.5
          }));
        });
      } else {
        const zAllele = alleles.find(allele => allele !== "W");
        if (!zAllele) throw new Error(`A duck needs one Z-linked allele at ${gene}.`);
        gametes.forEach(gamete => {
          next.push({ genes: { ...gamete.genes, [gene]: { chromosome: "Z", allele: zAllele } }, probability: gamete.probability * 0.5 });
          next.push({ genes: { ...gamete.genes, [gene]: { chromosome: "W", allele: null } }, probability: gamete.probability * 0.5 });
        });
      }
    } else {
      if (alleles.length !== 2) throw new Error(`Autosomal gene ${gene} needs two alleles.`);
      gametes.forEach(gamete => {
        alleles.forEach(allele => next.push({
          genes: { ...gamete.genes, [gene]: allele },
          probability: gamete.probability * 0.5
        }));
      });
    }

    gametes = mergeGametes(next);
  });

  return gametes;
}

function combineGametes(maleGamete, femaleGamete) {
  const genotype = {};
  let sex = "unspecified";

  LOCUS_ORDER.forEach(gene => {
    const maleValue = maleGamete.genes[gene];
    const femaleValue = femaleGamete.genes[gene];
    if (maleValue === undefined && femaleValue === undefined) return;

    const definition = GENES[gene];
    if (definition.type === "sex-linked") {
      if (!maleValue || maleValue.chromosome !== "Z") throw new Error(`The drake did not contribute a Z chromosome at ${gene}.`);
      if (!femaleValue) throw new Error(`The duck did not contribute a sex chromosome at ${gene}.`);

      if (femaleValue.chromosome === "Z") {
        sex = "male";
        genotype[gene] = canonicalAlleles(gene, [maleValue.allele, femaleValue.allele]);
      } else if (femaleValue.chromosome === "W") {
        sex = "female";
        genotype[gene] = [maleValue.allele, "W"];
      } else {
        throw new Error(`Invalid sex chromosome at ${gene}.`);
      }
    } else {
      if (maleValue === undefined || femaleValue === undefined) throw new Error(`Missing an allele at autosomal locus ${gene}.`);
      genotype[gene] = canonicalAlleles(gene, [maleValue, femaleValue]);
    }
  });

  return { sex, genotype };
}

function offspringKey(offspring) {
  return `${offspring.sex}|` + LOCUS_ORDER.filter(gene => offspring.genotype[gene]).map(gene => `${gene}:${offspring.genotype[gene].join("/")}`).join("|");
}

function crossParents(maleParent, femaleParent) {
  if (!(maleParent instanceof Parent) || !(femaleParent instanceof Parent)) throw new Error("crossParents requires two Parent objects.");
  if (maleParent.sex !== "ZZ") throw new Error('The drake must use sex "ZZ".');
  if (femaleParent.sex !== "ZW") throw new Error('The duck must use sex "ZW".');

  const maleGametes = makeGametes(maleParent);
  const femaleGametes = makeGametes(femaleParent);
  const grouped = new Map();

  maleGametes.forEach(maleGamete => {
    femaleGametes.forEach(femaleGamete => {
      const offspring = combineGametes(maleGamete, femaleGamete);
      const probability = maleGamete.probability * femaleGamete.probability;
      const key = offspringKey(offspring);
      if (!grouped.has(key)) grouped.set(key, { sex: offspring.sex, genotype: offspring.genotype, probability: 0 });
      grouped.get(key).probability += probability;
    });
  });

  return Array.from(grouped.values()).map(result => ({
    sex: result.sex,
    genotype: result.genotype,
    percent: Number((result.probability * 100).toFixed(6))
  })).sort((a, b) => a.sex !== b.sex ? (a.sex === "male" ? -1 : 1) : b.percent - a.percent);
}

function summarizeSexRatios(results) {
  const summary = { male: 0, female: 0, unspecified: 0 };
  results.forEach(result => {
    const key = Object.prototype.hasOwnProperty.call(summary, result.sex) ? result.sex : "unspecified";
    summary[key] += Number(result.percent);
  });
  Object.keys(summary).forEach(key => summary[key] = Number(summary[key].toFixed(2)));
  return summary;
}
