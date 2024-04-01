const declassifyUi = new DeClassIFYUI();
const declassify = new DeClassIFY();

declassifyUi.button.click(async () => {
  declassifyUi.loader.show();
  const { results, classifications } = await declassify.classify(declassifyUi.url);
  declassifyUi.loader.hide();
  //declassifyUi.addResult("Nature", `${results.nature} (${classifications.nature.pure}/${classifications.nature.applied})`);
  declassifyUi.addResult("Nature", `${results.nature}`);
  declassifyUi.addResult("Validation Strategy", "Literature Review");
  declassifyUi.addResult("Method", `${results.method}`);
  //declassifyUi.addResult("Validation Strategy", `${results.method}`);
});
