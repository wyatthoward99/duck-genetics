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
  return LOCUS_ORDER
    .filter(gene => Object.prototype.hasOwnProperty.call(gamete.genes, gene))
    .map(gene => {
      const value = gamete.genes[gene];
      return typeof value === "object" && value !== null
        ? `${gene}:${value.chromosome}:${value.allele ?? ""}`
        : `${gene}:${value}`;
    })
    .join("|");
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

function addAutosomalLocus(gametes, gene, alleles) {
  if (alleles.length !== 2) throw new Error(`Autosomal gene ${gene} needs two alleles.`);
  const next = [];
  gametes.forEach(gamete => {
    alleles.forEach(allele => {
      next.push({
        genes: { ...gamete.genes, [gene]: allele },
        probability: gamete.probability * 0.5
      });
    });
  });
  return mergeGametes(next);
}

function addMaleSexLinkedLoci(gametes, genes, parent) {
  let nextGametes = gametes;

  genes.forEach(gene => {
    const alleles = parent.genes[gene];
    if (!alleles) return;
    if (alleles.length !== 2 || alleles.includes("W")) {
      throw new Error(`A drake needs two Z-linked alleles at ${gene}.`);
    }

    const next = [];
    nextGametes.forEach(gamete => {
      alleles.forEach(allele => {
        next.push({
          genes: {
            ...gamete.genes,
            [gene]: { chromosome: "Z", allele }
          },
          probability: gamete.probability * 0.5
        });
      });
    });
    nextGametes = mergeGametes(next);
  });

  return nextGametes;
}

function addFemaleSexLinkedLoci(gametes, genes, parent) {
  const zGenes = {};
  const wGenes = {};

  genes.forEach(gene => {
    const alleles = parent.genes[gene];
    if (!alleles) return;
    const zAllele = alleles.find(allele => allele !== "W");
    if (!zAllele) throw new Error(`A duck needs one Z-linked allele at ${gene}.`);

    zGenes[gene] = { chromosome: "Z", allele: zAllele };
    wGenes[gene] = { chromosome: "W", allele: null };
  });

  const next = [];
  gametes.forEach(gamete => {
    next.push({
      genes: { ...gamete.genes, ...zGenes },
      probability: gamete.probability * 0.5
    });
    next.push({
      genes: { ...gamete.genes, ...wGenes },
      probability: gamete.probability * 0.5
    });
  });

  return mergeGametes(next);
}

function makeGametes(parent) {
  let gametes = [{ genes: {}, probability: 1 }];
  const sexLinkedGenes = [];

  LOCUS_ORDER.forEach(gene => {
    const alleles = parent.genes[gene];
    if (!alleles) return;

    const definition = GENES[gene];
    if (!definition) throw new Error(`Gene "${gene}" is not defined in genes.js.`);

    if (definition.type === "sex-linked") {
      sexLinkedGenes.push(gene);
    } else {
      gametes = addAutosomalLocus(gametes, gene, alleles);
    }
  });

  if (sexLinkedGenes.length > 0) {
    gametes = parent.sex === "ZZ"
      ? addMaleSexLinkedLoci(gametes, sexLinkedGenes, parent)
      : addFemaleSexLinkedLoci(gametes, sexLinkedGenes, parent);
  }

  return gametes;
}

function combineGametes(maleGamete, femaleGamete) {
  const genotype = {};
  let sex = "unspecified";
  let maternalSexChromosome = null;

  LOCUS_ORDER.forEach(gene => {
    const maleValue = maleGamete.genes[gene];
    const femaleValue = femaleGamete.genes[gene];
    if (maleValue === undefined && femaleValue === undefined) return;

    const definition = GENES[gene];
    if (definition.type === "sex-linked") {
      if (!maleValue || maleValue.chromosome !== "Z") {
        throw new Error(`The drake did not contribute a Z chromosome at ${gene}.`);
      }
      if (!femaleValue || !["Z", "W"].includes(femaleValue.chromosome)) {
        throw new Error(`The duck did not contribute a valid sex chromosome at ${gene}.`);
      }

      if (maternalSexChromosome === null) {
        maternalSexChromosome = femaleValue.chromosome;
        sex = maternalSexChromosome === "Z" ? "male" : "female";
      } else if (femaleValue.chromosome !== maternalSexChromosome) {
        throw new Error("Sex-linked loci received conflicting maternal sex chromosomes.");
      }

      genotype[gene] = femaleValue.chromosome === "Z"
        ? canonicalAlleles(gene, [maleValue.allele, femaleValue.allele])
        : [maleValue.allele, "W"];
    } else {
      if (maleValue === undefined || femaleValue === undefined) {
        throw new Error(`Missing an allele at autosomal locus ${gene}.`);
      }
      genotype[gene] = canonicalAlleles(gene, [maleValue, femaleValue]);
    }
  });

  return { sex, genotype };
}

function offspringKey(offspring) {
  return `${offspring.sex}|` + LOCUS_ORDER
    .filter(gene => offspring.genotype[gene])
    .map(gene => `${gene}:${offspring.genotype[gene].join("/")}`)
    .join("|");
}

function crossParents(maleParent, femaleParent) {
  if (!(maleParent instanceof Parent) || !(femaleParent instanceof Parent)) {
    throw new Error("crossParents requires two Parent objects.");
  }
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
      if (!grouped.has(key)) {
        grouped.set(key, {
          sex: offspring.sex,
          genotype: offspring.genotype,
          probability: 0
        });
      }
      grouped.get(key).probability += probability;
    });
  });

  return Array.from(grouped.values())
    .map(result => ({
      sex: result.sex,
      genotype: result.genotype,
      percent: Number((result.probability * 100).toFixed(6))
    }))
    .sort((a, b) =>
      a.sex !== b.sex
        ? (a.sex === "male" ? -1 : 1)
        : b.percent - a.percent
    );
}

function summarizeSexRatios(results) {
  const summary = { male: 0, female: 0, unspecified: 0 };
  results.forEach(result => {
    const key = Object.prototype.hasOwnProperty.call(summary, result.sex)
      ? result.sex
      : "unspecified";
    summary[key] += Number(result.percent);
  });
  Object.keys(summary).forEach(key => {
    summary[key] = Number(summary[key].toFixed(2));
  });
  return summary;
}
