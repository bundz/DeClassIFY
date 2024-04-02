const declassifyUi = new DeClassIFYUI();
const declassify = new DeClassIFY();

declassifyUi.button.click(async () => {
  declassifyUi.loader.show();
  const { results, classifications } = await declassify.classify(declassifyUi.url);
  declassifyUi.loader.hide();
  //declassifyUi.addResult("Nature", `${results.nature} (${classifications.nature.pure}/${classifications.nature.applied})`);
  declassifyUi.addResult("Nature", `${results.nature}`);
  declassifyUi.addResult("Method", `${results.method}`);
  declassifyUi.addResult("Validation Strategy", `${results.validation_strategy}`);
  declassifyUi.addResult("Data Nature", `${results.data_nature}`);
  declassifyUi.addResult("Environment", `${results.environment}`);
  declassifyUi.addResult("Methodological", `${results.methodological}`);
  declassifyUi.addResult("Proof", `${results.proof}`);
  declassifyUi.addResult("Purpose", `${results.purpose}`);
  declassifyUi.addResult("Secondary Proof", `${results.secondary_proof}`);
  declassifyUi.addResult("Validation Result", `${results.validation_result}`);
});
