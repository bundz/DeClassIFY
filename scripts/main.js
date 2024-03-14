const component = `
<div id="pdf-classify">
  <p id="pdf-classify-text"></p>
</div>
`;

const run = async () => {
  const url = window.location.href;

  if (!url.endsWith(".pdf")) {
    return;
  }

  const pdf = await pdfjsLib.getDocument(url).promise;
  const text = await getText(pdf);
  const words = text.split(" ");

  $("body").append(component);
  $("#pdf-classify-text").text(`Words: ${words.length}`);
};

const getText = async (pdf) => {
  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const pageTextContent = await page.getTextContent();
    text += extractText(pageTextContent);
  }

  return text;
};

const extractText = (pageTextContent) => {
  let text = "";

  for (const item of pageTextContent.items) {
    text += item.str;
  }

  return text;
};

run();
