const run = async () => {
  const url = window.location.href;

  if (!url.endsWith(".pdf")) {
    return;
  }

  const declassifyUi = new DeClassIFYUI();
  const declassify = new DeClassIFY();
  const results = await declassify.classify(url);
  declassifyUi.addResult("Nature", results.nature);
};

run();
