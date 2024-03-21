const component = `
<div id="pdf-classify-modal">
  <div id="pdf-classify-modal-close-container">
    <div id="pdf-classify-modal-close-button">✖</div>
  </div>
  <h2>Classification</h2>
  <div id="pdf-classify-results">
  </div>
</div>
<div id="pdf-classify">
  <p>Classify</p>
</div>
`;

const { natureAppliedRules, naturePureRules } = natureRules;

function countOccurrences(mainString, stringArray) {
  let totalCount = 0;

  // Percorre cada string no vetor
  stringArray.forEach((substring) => {
    // Utiliza expressão regular para contar ocorrências da substring no string principal
    const regex = new RegExp(substring, "gi");
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

  // Substitui todos os símbolos que não são caracteres entre "a" e "z" por " "
  text = text.replace(/[^a-z\n\t]+/g, " ");
  text = text.replace(/[" "]+/g, " ");

  return text;
};

const run = () => {
  $("body").append(component);

  $("#pdf-classify").click(() => {
    $("#pdf-classify-results").empty();
    $("#pdf-classify-modal").show();
    $("#pdf-classify-modal-close-button").click(() => {
      $("#pdf-classify-modal").hide();
    });
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
  let resp;
  let pure_count = 0;
  let applied_count = 0;

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const pageTextContent = await page.getTextContent();
    const text = extractText(pageTextContent);
    const preparedText = prepare_and_filter(text);

    pure_count += countOccurrences(preparedText, naturePureRules);
    applied_count += countOccurrences(preparedText, natureAppliedRules);
  }

  if (pure_count == 0 && applied_count == 0) {
    resp = "None";
  } else if (pure_count >= applied_count) {
    resp = "Pure";
  } else {
    resp = "Applied";
  }

  $("#pdf-classify-results").append(`<p><strong>Nature</strong>: ${resp} (${pure_count}/${applied_count})</p>`);
};

const extractText = (pageTextContent) => {
  let text = "";

  for (const item of pageTextContent.items) {
    text += item.str;
  }

  return text;
};

run();
