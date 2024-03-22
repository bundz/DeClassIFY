const { natureAppliedRules, naturePureRules } = natureRules;

class DeClassIFY {
  constructor() {}

  async classify(url) {
    const pdf = await pdfjsLib.getDocument(url).promise;
    const classifications = {
      nature: {
        pure: 0,
        applied: 0,
      },
    };

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const text = await this.getPageText(page);
      const occurrences = this.countAllOccurrences(text);
      classifications.nature.pure += occurrences.nature.pure;
      classifications.nature.applied += occurrences.nature.applied;
    }

    const results = this.generateResults(classifications);
    return { results, classifications };
  }

  countAllOccurrences(text) {
    const occurrences = {
      nature: {
        pure: 0,
        applied: 0,
      },
    };

    occurrences.nature.pure = this.countOccurrences(text, naturePureRules);
    occurrences.nature.applied = this.countOccurrences(text, natureAppliedRules);
    return occurrences;
  }

  countOccurrences(text, array) {
    let totalCount = 0;

    for (const substring of array) {
      const regex = new RegExp(substring, "gi");
      const matches = text.match(regex);

      if (matches) {
        totalCount += matches.length;
      }
    }

    return totalCount;
  }

  generateResults(classifications) {
    const results = {};

    if (classifications.nature.pure >= classifications.nature.applied) {
      results.nature = "Pure";
    }

    if (classifications.nature.pure < classifications.nature.applied) {
      results.nature = "Applied";
    }

    if (!classifications.nature.pure && !classifications.nature.applied) {
      results.nature = "None";
    }

    return results;
  }

  async getPageText(page) {
    const pageTextContent = await page.getTextContent();
    const text = this.extractNormalizedText(pageTextContent);
    return text;
  }

  extractNormalizedText(pageTextContent) {
    const text = this.extractText(pageTextContent);
    return this.normalizeText(text);
  }

  extractText(pageTextContent) {
    let text = "";

    for (const item of pageTextContent.items) {
      text += item.str;
    }

    return text;
  }

  normalizeText(text) {
    text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    text = text.toLowerCase();

    text = text.replace(/[^a-z\n\t]+/g, " ");
    text = text.replace(/[" "]+/g, " ");

    return text;
  }
}
