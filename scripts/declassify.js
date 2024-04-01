const { natureAppliedRules, naturePureRules } = natureRules;
const { methodAnalyticalRules, methodCausalRules, methodCause_and_effectRules,
	methodConceptRules, methodConceptualRules, methodConstructiveRules,
	methodDescriptiveRules, methodEmpiricRules, methodEngineeringRules,
	methodEvaluationRules, methodEvaluativeRules, methodExperimentalRules,
	methodExploratoryRules, methodFormalRules, methodInvestigateRules,
	methodInvestigativeRules, methodMathemathicalRules, methodNormativeRules,
	methodProblem_orientedRules, methodProblem_solvingRules, methodScientificRules,
	methodTheoreticalRules } = methodRules;

  function getMaxLoc(obj) {
    let maxKey = null;
    let maxValue = 0;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] > maxValue) {
          maxValue = obj[key];
          maxKey = key;
        }
      }
    }
    if( maxValue === 0 ) {
       return "None";
    }
    // Capitaliza a primeira letra de maxKey
    if (maxKey !== null) {
      maxKey = maxKey.charAt(0).toUpperCase() + maxKey.slice(1);
    }
    return maxKey;
  }

class DeClassIFY {
  constructor() {}

  async classify(url) {
    const pdf = await pdfjsLib.getDocument(url).promise;
    const classifications = {
      nature: {    // Categoria 1
        pure: 0,
        applied: 0,
      },
      method: {    // Categoria 2
        analyticalRules: 0,
        causalRules: 0,
        cause_and_effectRules: 0,
        conceptRules: 0,
        conceptualRules: 0,
        constructiveRules: 0,
        descriptiveRules: 0,
        empiricRules: 0,
        engineeringRules: 0,
        evaluationRules: 0,
        evaluativeRules: 0,
        experimentalRules: 0,
        exploratoryRules: 0,
        formalRules: 0,
        investigateRules: 0,
        investigativeRules: 0,
        mathemathicalRules: 0,
        normativeRules: 0,
        problem_orientedRules: 0,
        problem_solvingRules: 0,
        scientificRules: 0,
        theoreticalRules: 0,
      },
      validation_strategy: {  // Categoria 3
        pilot: 0,
        comparative: 0,
        protocol_analysis: 0,
        observational: 0,
        project_monitoring: 0,
        meta_analysis: 0,
        literature_review: 0,
        hermeneutics: 0,
        phenomenology: 0,
        experiment: 0,
        application_and_instrument: 0,
        community: 0,
        case_control: 0,
        discourse_analysis: 0,
        conceptual_analysis: 0,
        static_analysis: 0,
        dynamic_analysis: 0,
        mathematical_proof: 0,
        grounded_theory: 0,
        replication: 0,
        case_study: 0,
        action_research: 0,
        secondary_data: 0,
      },
      data_nature: { // Categoria 4
        cross_sectional: 0,
        cross_section: 0,
	longitudinal: 0,
	qualitative: 0,
	quantitative: 0,
      },
      environment: { // Categoria 5
	in_vitro: 0,
	in_vivo: 0,
	real: 0,
	simulated: 0,
      },
      methodological: { // Categoria 6
	control_model: 0,
	historical: 0,
	historic: 0,
	modeling: 0,
	observational: 0,
	process_analysis: 0,
	processual: 0,
	prototype: 0,
	simulation: 0,
      },
      proof: { // Categoria 7
	abduction: 0,
	deduction: 0,
	induction: 0,
      },
      purpose: { // Categoria 8
	behavior: 0,
	critique: 0,
	design_science: 0,
	interpretative,
      },
      secondary_proof: { // Categoria 9
	proof: 0,
	rebuttal: 0,
      },
      validation_result: { // Categoria 10
	cost_effectiveness: 0,
	effectiveness: 0,
	efficiency: 0,
	operationalization: 0,
	usability: 0,
      },
    };

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const text = await this.getPageText(page);
      const occurrences = this.countNatureOccurrences(text);
      // Nature Categoria 1
      classifications.nature.pure += occurrences.nature.pure;
      classifications.nature.applied += occurrences.nature.applied;
      // Method Categoria 2
      classifications.method.causal += classifications.method.causal;
      classifications.method.conceptual += classifications.method.conceptual;
      classifications.method.formulative += classifications.method.formulative;
      classifications.method.formal += classifications.method.formal;
      classifications.method.theoretical += classifications.method.theoretical;
      classifications.method.constructive += classifications.method.constructive;
      classifications.method.normative += classifications.method.normative;
      classifications.method.problem_oriented += classifications.method.problem_oriented;
      classifications.method.experimental += classifications.method.experimental;
      classifications.method.exploratory += classifications.method.exploratory;
      classifications.method.analytical += classifications.method.analytical;
      classifications.method.evaluative += classifications.method.evaluative;
      classifications.method.descriptive += classifications.method.descriptive;
      classifications.method.mathematical += classifications.method.mathematical;
      classifications.method.scientific += classifications.method.scientific;
      classifications.method.engineering += classifications.method.engineering;
      // Validation Results Categoria 3
      classifications.method.pilot += classifications.validation_strategy.pilot;
      classifications.method.comparative += classifications.validation_strategy.comparative;
      classifications.method.protocol_analysis += classifications.validation_strategy.protocol_analysis;
      classifications.method.observational += classifications.validation_strategy.observational;
      classifications.method.project_monitoring += classifications.validation_strategy.project_monitoring;
      classifications.method.meta_analysis += classifications.validation_strategy.meta_analysis;
      classifications.method.literature_review += classifications.validation_strategy.literature_review;
      classifications.method.hermeneutics += classifications.validation_strategy.hermeneutics;
      classifications.method.phenomenology += classifications.validation_strategy.phenomenology;
      classifications.method.experiment += classifications.validation_strategy.experiment;
      classifications.method.application_and_instrument += classifications.validation_strategy.application_and_instrument;
      classifications.method.community += classifications.validation_strategy.community;
      classifications.method.case_control += classifications.validation_strategy.case_control;
      classifications.method.discourse_analysis += classifications.validation_strategy.discourse_analysis;
      classifications.method.conceptual_analysis += classifications.validation_strategy.conceptual_analysis;
      classifications.method.static_analysis += classifications.validation_strategy.static_analysis;
      classifications.method.dynamic_analysis += classifications.validation_strategy.dynamic_analysis;
      classifications.method.mathematical_proof += classifications.validation_strategy.mathematical_proof;
      classifications.method.grounded_theory += classifications.validation_strategy.grounded_theory;
      classifications.method.replication += classifications.validation_strategy.replication;
      classifications.method.case_study += classifications.validation_strategy.case_study;
      classifications.method.action_research += classifications.validation_strategy.action_research;
      classifications.method.secondary_data += classifications.validation_strategy.secondary_data;
    }

    const results = this.generateResults(classifications);
    return { results, classifications };
  }

  countNatureOccurrences(text) {
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

  countMethodOccurrences(text) {
    const occurrences = {
      method: {
        causal: 0,
        conceptual: 0,
        formulative: 0,
        formal: 0,
        theoretical: 0,
        constructive: 0,
        normative: 0,
        problem_oriented: 0,
        experimental: 0,
        exploratory: 0,
        analytical: 0,
        evaluative: 0,
        descriptive: 0,
        mathematical: 0,
        scientific: 0,
        engineering: 0,
      },
    };

    occurrences.method.causal = this.countOccurrences(text, methodCausalRulesi);
    occurrences.method.conceptual = this.countOccurrences(text, methodConceptualRules);
    occurrences.method.formulative = this.countOccurrences(text, methodFormulativeRules);
    occurrences.method.formal = this.countOccurrences(text, methodFormalRules);
    occurrences.method.theoretical = this.countOccurrences(text, methodTheoreticalRules);
    occurrences.method.constructive = this.countOccurrences(text, methodConstructiveRules);
    occurrences.method.normative = this.countOccurrences(text, methodNormativeRules);
    occurrences.method.problem_oriented = this.countOccurrences(text, methodProblem_orientedRules);
    occurrences.method.experimental = this.countOccurrences(text, methodExperimentalRules);
    occurrences.method.exploratory = this.countOccurrences(text, methodExploratoryRules);
    occurrences.method.analytical = this.countOccurrences(text, methodAnalyticalRules);
    occurrences.method.evaluative = this.countOccurrences(text, methodEvaluativeRules);
    occurrences.method.descriptive = this.countOccurrences(text, methodEvaluativeRules);
    occurrences.method.mathematical = this.countOccurrences(text, methodMathematicalRules);
    occurrences.method.scientific = this.countOccurrences(text, methodScientificRules);
    occurrences.method.engineering = this.countOccurrences(text, methodEngineeringRules);
    return occurrences;
  }

  countOccurrences(text, array) {
    let totalCount = 0;

    for (const substring of array) {
      const regex = new RegExp(Substring, "gi");
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

    results.method = getMaxLoc(classifications.method);
    results.validation_strategy = getMaxLoc(classifications.validation_strategy);
	  
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
