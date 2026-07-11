let currentOffspringResults = [];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function readGeneSelection(parentPrefix, gene) {
  const element = document.getElementById(parentPrefix + gene);
  if (!element) return null;

  if (gene === "D" && parentPrefix === "female") {
    return [element.value, "W"];
  }

  const alleles = element.value.split("/").map(allele => allele.trim()).filter(Boolean);
  if (alleles.length !== 2) throw new Error(`Invalid selection for ${parentPrefix}${gene}.`);
  return alleles;
}

function buildParent(parentPrefix, sex) {
  const genes = {};
  LOCUS_ORDER.forEach(gene => {
    const selection = readGeneSelection(parentPrefix, gene);
    if (selection) genes[gene] = selection;
  });
  return new Parent(genes, sex);
}

function displaySex(sex) {
  if (sex === "male") return "Male/Drake";
  if (sex === "female") return "Female/Duck";
  return "Sex not determined";
}

function getDisplayAlleles(gene, alleles, sex) {
  if (gene === "D" && sex === "female") return alleles.filter(allele => allele !== "W");
  return [...alleles];
}

function formatGenotype(genotype, sex) {
  return LOCUS_ORDER.filter(gene => genotype[gene]).map(gene => {
    const alleles = getDisplayAlleles(gene, genotype[gene], sex);
    return `<div class="genotype-locus"><strong>${escapeHtml(gene)}:</strong> ${escapeHtml(alleles.join("/"))}</div>`;
  }).join("");
}

function createDisplayGenotypeKey(genotype, sex) {
  return LOCUS_ORDER.filter(gene => genotype[gene]).map(gene => {
    const alleles = getDisplayAlleles(gene, genotype[gene], sex);
    return `${gene}:${alleles.join("/")}`;
  }).join("|");
}

function findMatchingOption(selectElement, desiredValue) {
  const options = Array.from(selectElement.options);
  const exact = options.find(option => option.value === desiredValue);
  if (exact) return exact.value;
  if (!desiredValue.includes("/")) return null;

  const desiredAlleles = desiredValue.split("/").sort().join("/");
  const equivalent = options.find(option => option.value.split("/").sort().join("/") === desiredAlleles);
  return equivalent ? equivalent.value : null;
}

function genotypeValueForDropdown(gene, alleles, sex) {
  return getDisplayAlleles(gene, alleles, sex).join("/");
}

function loadOffspringAsParent(resultIndex, parentPrefix) {
  const result = currentOffspringResults[resultIndex];
  if (!result) return;

  if (parentPrefix === "male" && result.sex !== "male") {
    alert("Only male offspring can be used as a drake.");
    return;
  }

  if (parentPrefix === "female" && result.sex !== "female") {
    alert("Only female offspring can be used as a duck.");
    return;
  }

  LOCUS_ORDER.forEach(gene => {
    const alleles = result.genotype[gene];
    const select = document.getElementById(parentPrefix + gene);
    if (!alleles || !select) return;

    const desiredValue = genotypeValueForDropdown(gene, alleles, result.sex);
    const matchingValue = findMatchingOption(select, desiredValue);

    if (matchingValue !== null) select.value = matchingValue;
    else console.warn(`No ${parentPrefix}${gene} option matches ${desiredValue}.`);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createSexSummary(results) {
  const ratios = summarizeSexRatios(results);
  return `
    <div class="sex-summary">
      <h3>Offspring Sex Ratio</h3>
      <p><strong>Male:</strong> ${ratios.male.toFixed(2)}%</p>
      <p><strong>Female:</strong> ${ratios.female.toFixed(2)}%</p>
    </div>
  `;
}

function createResultCard(result, resultIndex) {
  const phenotype = getPhenotype(result.genotype, result.sex);
  const displayKey = createDisplayGenotypeKey(result.genotype, result.sex);
  const actionLabel = result.sex === "male" ? "Use as Drake" : "Use as Duck";
  const parentPrefix = result.sex === "male" ? "male" : "female";

  return `
    <article class="result">
      <div class="result-heading">
        <h3>${escapeHtml(phenotype)}</h3>
        <span class="result-percent">${Number(result.percent).toFixed(2)}%</span>
      </div>
      <p class="offspring-sex">${escapeHtml(displaySex(result.sex))}</p>
      <div class="offspring-genotype">${formatGenotype(result.genotype, result.sex)}</div>
      <div class="offspring-actions">
        <button type="button" class="use-offspring-button" data-result-index="${resultIndex}" data-parent-prefix="${parentPrefix}">${actionLabel}</button>
      </div>
      <details class="genotype-key">
        <summary>Show full genotype key</summary>
        <code>${escapeHtml(displayKey)}</code>
      </details>
    </article>
  `;
}

function calculateCross() {
  const resultsElement = document.getElementById("results");

  try {
    const drake = buildParent("male", "ZZ");
    const duck = buildParent("female", "ZW");

    currentOffspringResults = crossParents(drake, duck);

    if (currentOffspringResults.length === 0) {
      resultsElement.textContent =
        "No offspring results were generated.";
      return;
    }

    const maleResults = currentOffspringResults.filter(
      result => result.sex === "male"
    );

    const femaleResults = currentOffspringResults.filter(
      result => result.sex === "female"
    );

    const maleCards = maleResults
      .map(result => {
        const originalIndex =
          currentOffspringResults.indexOf(result);

        return createResultCard(
          result,
          originalIndex
        );
      })
      .join("");

    const femaleCards = femaleResults
      .map(result => {
        const originalIndex =
          currentOffspringResults.indexOf(result);

        return createResultCard(
          result,
          originalIndex
        );
      })
      .join("");

    resultsElement.innerHTML = `
     

      <div class="results-grid">

        <section class="results-column">

          <div class="results-column-heading">
            <h3>Male Offspring</h3>

            <p>
              ${maleResults.length}
              genotype${maleResults.length === 1 ? "" : "s"}
            </p>
          </div>

          ${
            maleCards ||
            "<p>No male offspring results.</p>"
          }

        </section>

        <section class="results-column">

          <div class="results-column-heading">
            <h3>Female Offspring</h3>

            <p>
              ${femaleResults.length}
              genotype${femaleResults.length === 1 ? "" : "s"}
            </p>
          </div>

          ${
            femaleCards ||
            "<p>No female offspring results.</p>"
          }

        </section>

      </div>
    `;

  } catch (error) {
    console.error(error);

    resultsElement.innerHTML = `
      <div class="calculator-error">
        <strong>Calculation error:</strong>
        ${escapeHtml(error.message || "Unknown error")}
      </div>
    `;
  }
}

function resetCalculator() {
  LOCUS_ORDER.forEach(gene => {
    const definition = GENES[gene];
    const male = document.getElementById("male" + gene);
    const female = document.getElementById("female" + gene);
    if (male) male.value = definition.maleDefault;
    if (female) female.value = definition.femaleDefault;
  });

  currentOffspringResults = [];
  document.getElementById("results").textContent = "Calculator reset to wild-type defaults.";
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calculate").addEventListener("click", calculateCross);
  document.getElementById("reset").addEventListener("click", resetCalculator);
  document.getElementById("results").addEventListener("click", event => {
    const button = event.target.closest(".use-offspring-button");
    if (!button) return;
    loadOffspringAsParent(Number(button.dataset.resultIndex), button.dataset.parentPrefix);
  });
});
