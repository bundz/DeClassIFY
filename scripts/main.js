const component = `
<div id="pdf-classify">
  <button id="pdf-classify-button">Check Nature</button>
  <p id="pdf-classify-text"></p>
</div>
`;

const natureAppliedRules = [
  "can be applied to the field", "being applied to", "applied computing", "models applied with", "we applied", "authors applied", "applied data", "applied real-world", "applied corporate data", "applied statistics", "usly applied in", "applied techniques", "teachers applied cs", "applied examples", "applied framework", "decolonizing applied linguistics", "applied verification", "then applied a", "on applied sciences", "applied analysis", "relatively applied field", "now applied towards", "been applied successfully", "technology applied engineering", "were applied", "engineering applied science", "applied theory", "works applied system", "bayesian applied regression", "engagement applied developmental", "modern applied statistical", "successfully applied strategies", "differentially applied based", "applied mathematics", "concerns applied equally", "be applied to the field of cs", "be applied to", "be applied to", "tables applied psychological", "evaluation applied keywords", "zhang applied machine", "serious applied games", "applied artiicial", "future applied work", "or applied science", "review applied ergonomics", "exemplar applied codes", "moderators applied problem", "starting applied design", "more applied projects", "all applied feedback", "applied physics", "essentially applied psychology", "approach applied network", "evaluation applied measurement", "changed applied iteration", "research applied research", "applied computing", "agents applied artificial", "applied computational", "fluids applied mathematical", "time applied collaborative", "commonly applied tactics", "applied deep", "applied dynamic", "advances applied informatics", "applied basic research", "applications applied optics", "method applied advantage", "applied coordinate-wi", "xor applied coordinate-wi", "applied our", "applied selfsupervise", "journal applied spatial", "model applied transfer", "applied supervised", "empower applied robotics", "pipes applied thermal", "mapping applied component-wis", "researchers applied ssl", "partially applied functions", "applied information", "final applied outputs", "multiple applied outputs", "applied static", "effects applied categorical", "applied multivariate", "applied services", "applied code", "distortions applied models", "advanced applied informatics", "applied text mining", "applied bayesian", "phrases applied perception", "applied numerical", "applied variational", "studies applied prediction", "applied multiway data analysis", "our applied", "applied function", "applied spectroscopy", "applied radiation", "applied geography", "applied disk", "main applied scenario", "applied physiology", "applied survival", "applied locality", "applied k-medoids", "applied active", "applied dataset", "applied power", "previously applied non-probabilistic", "applied velocity", "techniques applied", "feasible applied extension", "applied multi-tasklea", "frequently applied tool", "just applied individually", "domains applied cal",
];

const naturePureRules = [
"in pure computer", "considered pure exploration", "pure reason", "from pure statistics", "pure code", "pure kinematic", "pure tic", "a pure scaling", "pure rl-based", "pure robot", "pure knower", "as pure mathematical", "be pure real", "enough pure variables", "than pure bisection", "pure bisection", "pure data", "pure reasoning", "maps pure barycentric", "for pure positional", "abstraction pure", "pure procedural", "create pure features", "to pure chcs", "pure empiricism", "pure software-", "analyzing pure functional", "exclude pure functions", "pure constructs", "injects pure results", "terminating pure computations", "covers pure first-order", "need pure recursive", "represent pure pieces", "whereas pure implicit", "well-typed pure program", "noninterfering pure languages", "related pure terms", "generates pure surface", "extract pure geometry", "pure benchmarks", "essentially pure boolean", "class pure virtual", "reported pure nonvectorized", "namely pure software", "assumed pure hyperelasticity", "atomic pure predicates", "simple pure assertions", "making pure hardware", "pure transformer-based", "3d pure hexahedra", "generating pure hexahedral", "dense pure flash", "has pure", "pure sram", "performing pure tcp/ip", "pure p-refinement", "reports pure execution", "pure greedy", "pure image-based", "pure methods", "weakly pure expressions", "pure methods", "recursive pure", "pure method", "pure methodm", "pure metadata", "these pure approaches", "consider pure strategies", "pure programs", "perform pure forward", "pure manifold", "pure fuzzers", "pure strategy",
];

function countOccurrences(mainString, stringArray) {
  let totalCount = 0;

  // Percorre cada string no vetor
  stringArray.forEach(substring => {
    // Utiliza expressão regular para contar ocorrências da substring no string principal
    const regex = new RegExp(substring, 'gi');
    const matches = mainString.match(regex);

    // Se houver ocorrências, adiciona ao total
    if (matches) {
      totalCount += matches.length;
    }
  });

  return totalCount;
}

const prepare_and_filter = (text) => {
  // Remove todos os acentos
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  // Converte para minúsculas
  text = text.toLowerCase();
  
  // Substitui todos os símbolos que não são caracteres entre "a" e "z" por "-"
  text = text.replace(/[^a-z\n\t ]+/g, "");
  
  return text;
};

const run = () => {
  $("body").append(component);
  $("#pdf-classify-button").click(() => {
    countWords();
  });
};

const countWords = async () => {
  const url = window.location.href;

  if (!url.endsWith(".pdf")) {
    $("#pdf-classify-text").text("This is not a PDF file.");
    return;
  }

  const pdf = await pdfjsLib.getDocument(url).promise;
  let totalOccurrences = 0;
  let resp;

  for (let i = 1; i <= pdf.numPages; i++) {
   const page = await pdf.getPage(i);
    const pageTextContent = await page.getTextContent();
    const text = extractText(pageTextContent);
    const preparedText = prepare_and_filter(text);
    //totalOccurrences += countOccurrences(preparedText, "developed");
    const pure_count = countOccurrences(preparedText,naturePureRules);
    const applied_count = countOccurrences(preparedText,natureAppliedRules);

    if (pure_count == 0 && applied_count == 0) {
	resp = "None";
    } else if (pure_count >= applied_count) {
        resp = "Pure";
    } else {
      resp = "Applied";
    }
}

  //$("#pdf-classify-text").text(`Total occurrences of "developed": ${totalOccurrences}`);
  $("#pdf-classify-text").text(`This paper Nature is: ${resp}`);
};

const extractText = (pageTextContent) => {
  let text = "";

  for (const item of pageTextContent.items) {
    text += item.str;
  }

  return text;
};

run();

