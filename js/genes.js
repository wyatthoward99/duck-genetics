const LOCUS_ORDER = ["M", "Li", "E", "Bl", "C", "R", "D", "Bu"];

const GENES = {
  M: { name: "Pattern Locus", type: "autosomal", alleles: ["MR", "M+", "Md"], maleDefault: "M+/M+", femaleDefault: "M+/M+" },
  Li: { name: "Phase Locus", type: "autosomal", alleles: ["Li+", "li", "lih"], maleDefault: "Li+/Li+", femaleDefault: "Li+/Li+" },
  E: { name: "Extended Black", type: "autosomal", alleles: ["E", "e+"], maleDefault: "e+/e+", femaleDefault: "e+/e+" },
  Bl: { name: "Blue Dilution", type: "autosomal", alleles: ["Bl", "bl+"], maleDefault: "bl+/bl+", femaleDefault: "bl+/bl+" },
  C: { name: "Recessive White", type: "autosomal", alleles: ["C+", "c"], maleDefault: "C+/C+", femaleDefault: "C+/C+" },
  R: { name: "Runner Pattern", type: "autosomal", alleles: ["R", "r+"], maleDefault: "r+/r+", femaleDefault: "r+/r+" },
  D: { name: "Chocolate", type: "sex-linked", alleles: ["D+", "d"], maleDefault: "D+/D+", femaleDefault: "D+" },
  Bu: { name: "Buff", type: "sex-linked", alleles: ["Bu+", "bu"], maleDefault: "Bu+/Bu+", femaleDefault: "Bu+" }
};
