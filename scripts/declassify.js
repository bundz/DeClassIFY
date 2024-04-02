const { natureAppliedRules, naturePureRules } = natureRules;
const { methodAnalyticalRules, methodCausalRules, methodCause_and_effectRules,
	methodConceptRules, methodConceptualRules, methodConstructiveRules,
	methodDescriptiveRules, methodEmpiricRules, methodEngineeringRules,
	methodEvaluationRules, methodEvaluativeRules, methodExperimentalRules,
	methodExploratoryRules, methodFormalRules, methodInvestigateRules,
	methodInvestigativeRules, methodMathemathicalRules, methodNormativeRules,
	methodProblem_orientedRules, methodProblem_solvingRules, methodScientificRules,
	methodTheoreticalRules } = methodRules;
const { methodologicalControl_modelRules, methodologicalHistoricalRules, methodologicalHistoricRules, 
        methodologicalModelingRules, methodologicalObservationalRules, 
        methodologicalProcess_analysisRules, methodologicalProcessualRules, 
        methodologicalPrototypeRules, methodologicalSimulationRules } = methodologicalRules;
const { validation_strategyPilotRules, validation_strategyComparativeRules,
	validation_strategyProtocol_analysisRules, validation_strategyObservationalRules,
	validation_strategyProject_monitoringRules, validation_strategyMeta_analysisRules,
	validation_strategyLiterature_reviewRules, validation_strategyHermeneuticsRules,
	validation_strategyPhenomenologyRules, validation_strategyExperimentRules,
	validation_strategyApplication_and_instrumentRules, validation_strategyCommunityRules,
	validation_strategyCase_controlRules, validation_strategyDiscourse_analysisRules,
	validation_strategyConceptual_analysisRules, validation_strategyStatic_analysisRules,
	validation_strategyDynamic_analysisRules, validation_strategyMathematical_proofRules,
	validation_strategyGrounded_theoryRules, validation_strategyReplicationRules,
	validation_strategyCase_studyRules, validation_strategyAction_researchRules,
	validation_strategySecondary_dataRules } = validation_strategyRules;
const { data_natureCross_sectionalRules, data_natureCross_sectionRules,
        data_natureLongitudinalRules, data_natureQualitativeRules,
        data_natureQuantitativeRules } = data_natureRules;
const { environmentIn_vitroRules, environmentIn_vivoRules, environmentRealRules,
        environmentReal_worldRules, environmentSimulatedRules } = environmentRules;
/*
const { validation_resultCost_effectivenessRules, validation_resultEffectivenessRules, 
        validation_resultEfficiencyRules, validation_resultOperationalizationRules, 
        validation_resultUsabilityRules
} = validation_resultRules;
const { purposeBehavioralRules, purposeCritiqueRules, purposeDesign_scienceRules,
        purposeInterpretiveRules
} = purposeRules;
const { secondary_proofProofRules, secondary_proofRebuttalRules
} = secondary_proofRules;
*/

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
        analytical: 0,
        causal: 0,
        cause_and_effect: 0,
        concept: 0,
        conceptual: 0,
        constructive: 0,
        descriptive: 0,
        empiric: 0,
        engineering: 0,
        evaluation: 0,
        evaluative: 0,
        experimental: 0,
        exploratory: 0,
        formal: 0,
        investigate: 0,
        investigative: 0,
        mathemathical: 0,
        normative: 0,
        problem_oriented: 0,
        problem_solving: 0,
        scientific: 0,
        theoretical: 0,
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
	interpretative: 0,
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
      { // Nature Categoria 1
        const occurrences = this.countNatureOccurrences(text);

        classifications.nature.pure    += occurrences.nature.pure;
        classifications.nature.applied += occurrences.nature.applied;
      }
      { // Method Categoria 2
        const occurrences = this.countMethodOccurrences(text);
       
        classifications.method.causal           += occurrences.method.causal;
        classifications.method.conceptual       += occurrences.method.conceptual;
        classifications.method.formulative      += occurrences.method.formulative;
        classifications.method.formal           += occurrences.method.formal;
        classifications.method.theoretical      += occurrences.method.theoretical;
        classifications.method.constructive     += occurrences.method.constructive;
        classifications.method.normative        += occurrences.method.normative;
        classifications.method.problem_oriented += occurrences.method.problem_oriented;
        classifications.method.experimental     += occurrences.method.experimental;
        classifications.method.exploratory      += occurrences.method.exploratory;
        classifications.method.analytical       += occurrences.method.analytical;
        classifications.method.evaluative       += occurrences.method.evaluative;
        classifications.method.descriptive      += occurrences.method.descriptive;
        classifications.method.mathematical     += occurrences.method.mathematical;
        classifications.method.scientific       += occurrences.method.scientific;
        classifications.method.engineering      += occurrences.method.engineering;
      }
      { // Validation Results Categoria 3
        const occurrences = this.countValidation_strategyOccurrences(text);

        classifications.validation_strategy.pilot                      += occurrences.validation_strategy.pilot;
        classifications.validation_strategy.comparative                += occurrences.validation_strategy.comparative;
        classifications.validation_strategy.protocol_analysis          += occurrences.validation_strategy.protocol_analysis;
        classifications.validation_strategy.observational              += occurrences.validation_strategy.observational;
        classifications.validation_strategy.project_monitoring         += occurrences.validation_strategy.project_monitoring;
        classifications.validation_strategy.meta_analysis              += occurrences.validation_strategy.meta_analysis;
        classifications.validation_strategy.literature_review          += occurrences.validation_strategy.literature_review;
        classifications.validation_strategy.hermeneutics               += occurrences.validation_strategy.hermeneutics;
        classifications.validation_strategy.phenomenology              += occurrences.validation_strategy.phenomenology;
        classifications.validation_strategy.experiment                 += occurrences.validation_strategy.experiment;
        classifications.validation_strategy.application_and_instrument += occurrences.validation_strategy.application_and_instrument;
        classifications.validation_strategy.community                  += occurrences.validation_strategy.community;
        classifications.validation_strategy.case_control               += occurrences.validation_strategy.case_control;
        classifications.validation_strategy.discourse_analysis         += occurrences.validation_strategy.discourse_analysis;
        classifications.validation_strategy.conceptual_analysis        += occurrences.validation_strategy.conceptual_analysis;
        classifications.validation_strategy.static_analysis            += occurrences.validation_strategy.static_analysis;
        classifications.validation_strategy.dynamic_analysis           += occurrences.validation_strategy.dynamic_analysis;
        classifications.validation_strategy.mathematical_proof         += occurrences.validation_strategy.mathematical_proof;
        classifications.validation_strategy.grounded_theory            += occurrences.validation_strategy.grounded_theory;
        classifications.validation_strategy.replication                += occurrences.validation_strategy.replication;
        classifications.validation_strategy.case_study                 += occurrences.validation_strategy.case_study;
        classifications.validation_strategy.action_research            += occurrences.validation_strategy.action_research;
        classifications.validation_strategy.secondary_data             += occurrences.validation_strategy.secondary_data;
      }
      { // Data Nature Categoria 4
	const occurrences = this.countData_natureOccurrences(text);

	classifications.data_nature.cross_sectional += occurrences.data_nature.cross_sectional;
        classifications.data_nature.cross_section   += occurrences.data_nature.cross_section;
	classifications.data_nature.longitudinal    += occurrences.data_nature.longitudinal;
	classifications.data_nature.qualitative     += occurrences.data_nature.qualitative;
	classifications.data_nature.quantitative    += occurrences.data_nature.quantitative;
      }
      { // Envirnoment Categoria 5
	const occurrences = this.countEnvironmentOccurrences(text);

	classifications.environment.invitro   += occurrences.environment.invitro;
	classifications.environment.invivo    += occurrences.environment.invivo;
	classifications.environment.real      += occurrences.environment.real;
	classifications.environment.simulated += occurrences.environment.simulated;
      }
    }

    const results = this.generateResults(classifications);
    return { results, classifications };
  }

  countNatureOccurrences(text) { // Categoria 1
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

  countMethodOccurrences(text) { // Categoria 2
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

    occurrences.method.causal           = this.countOccurrences(text, methodCausalRules);
    occurrences.method.conceptual       = this.countOccurrences(text, methodConceptualRules);
    //occurrences.method.formulative      = this.countOccurrences(text, methodFormulativeRules);
    occurrences.method.formal           = this.countOccurrences(text, methodFormalRules);
    occurrences.method.theoretical      = this.countOccurrences(text, methodTheoreticalRules);
    occurrences.method.constructive     = this.countOccurrences(text, methodConstructiveRules);
    occurrences.method.normative        = this.countOccurrences(text, methodNormativeRules);
    occurrences.method.problem_oriented = this.countOccurrences(text, methodProblem_orientedRules);
    occurrences.method.experimental     = this.countOccurrences(text, methodExperimentalRules);
    occurrences.method.exploratory      = this.countOccurrences(text, methodExploratoryRules);
    occurrences.method.analytical       = this.countOccurrences(text, methodAnalyticalRules);
    occurrences.method.evaluative       = this.countOccurrences(text, methodEvaluativeRules);
    occurrences.method.descriptive      = this.countOccurrences(text, methodEvaluativeRules);
    //occurrences.method.mathematical     = this.countOccurrences(text, methodMathematicalRules);
    occurrences.method.scientific       = this.countOccurrences(text, methodScientificRules);
    occurrences.method.engineering      = this.countOccurrences(text, methodEngineeringRules);
    return occurrences;
  }

  countValidation_strategyOccurrences(text) { // Categoria 3
    const occurrences = {
      validation_strategy: {
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
    };
    occurrences.validation_strategy.pilot                      = this.countOccurrences(text, validation_strategyPilotRules);
    occurrences.validation_strategy.comparative                = this.countOccurrences(text, validation_strategyComparativeRules);
    occurrences.validation_strategy.protocol_analysis          = this.countOccurrences(text, validation_strategyProtocol_analysisRules);
    occurrences.validation_strategy.observational              = this.countOccurrences(text, validation_strategyObservationalRules);
    occurrences.validation_strategy.project_monitoring         = this.countOccurrences(text, validation_strategyProject_monitoringRules);
    occurrences.validation_strategy.meta_analysis              = this.countOccurrences(text, validation_strategyMeta_analysisRules);
    occurrences.validation_strategy.literature_review          = this.countOccurrences(text, validation_strategyLiterature_reviewRules);
    occurrences.validation_strategy.hermeneutics               = this.countOccurrences(text, validation_strategyHermeneuticsRules);
    occurrences.validation_strategy.phenomenology              = this.countOccurrences(text, validation_strategyPhenomenologyRules);
    occurrences.validation_strategy.experiment                 = this.countOccurrences(text, validation_strategyExperimentRules);
    occurrences.validation_strategy.application_and_instrument = this.countOccurrences(text, validation_strategyApplication_and_instrumentRules);
    occurrences.validation_strategy.community                  = this.countOccurrences(text, validation_strategyCommunityRules);
    occurrences.validation_strategy.case_control               = this.countOccurrences(text, validation_strategyCase_controlRules);
    occurrences.validation_strategy.discourse_analysis         = this.countOccurrences(text, validation_strategyDiscourse_analysisRules);
    occurrences.validation_strategy.conceptual_analysis        = this.countOccurrences(text, validation_strategyConceptual_analysisRules);
    occurrences.validation_strategy.static_analysis            = this.countOccurrences(text, validation_strategyStatic_analysisRules);
    occurrences.validation_strategy.dynamic_analysis           = this.countOccurrences(text, validation_strategyDynamic_analysisRules);
    occurrences.validation_strategy.mathematical_proof         = this.countOccurrences(text, validation_strategyMathematical_proofRules);
    occurrences.validation_strategy.grounded_theory            = this.countOccurrences(text, validation_strategyGrounded_theoryRules);
    occurrences.validation_strategy.replication                = this.countOccurrences(text, validation_strategyReplicationRules);
    occurrences.validation_strategy.case_study                 = this.countOccurrences(text, validation_strategyCase_studyRules);
    occurrences.validation_strategy.action_research            = this.countOccurrences(text, validation_strategyAction_researchRules);
    occurrences.validation_strategy.secondary_data             = this.countOccurrences(text, validation_strategySecondary_dataRules);
    return occurrences;
  }

  countData_natureOccurrences(text) { // Categoria 4
    const occurrences = {
      data_nature: {
	cross_sectional: 0,
        cross_section: 0,
	longitudinal: 0,
	qualitative: 0,
	quantitative: 0,
      },
    };
    occurrences.data_nature.cross_sectional = this.countOccurrences(text, data_natureCross_sectionalRules);
    occurrences.data_nature.cross_section   = this.countOccurrences(text, data_natureCross_sectionRules);
    occurrences.data_nature.longitudinal    = this.countOccurrences(text, data_natureLongitudinalRules);
    occurrences.data_nature.qualitative     = this.countOccurrences(text, data_natureQualitativeRules);
    occurrences.data_nature.quantitative    = this.countOccurrences(text, data_natureQuantitativeRules);
    return occurrences;
  }

  countEnvironmentOccurrences(text) { // Categoria 5
    const occurrences = {
      environment: {
        in_vitro: 0,
        in_vivo: 0,
        real: 0,
        simulated: 0,
      },
    };
    occurrences.environment.in_vitro  = this.countOccurrences(text, environmentIn_vitroRules);
    occurrences.environment.in_vivo   = this.countOccurrences(text, environmentIn_vivoRules);
    occurrences.environment.real      = this.countOccurrences(text, environmentRealRules);
    occurrences.environment.simulated = this.countOccurrences(text, environmentSimulatedRules);

    return occurrences;
  }

  countMethodologicalOccurrences(text) { // Categoria 6
    const occurrences = {
      methodological: {
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
    };
    // TODO
    return occurrences;
  }

 countProofOccurrences(text) { // Categoria 7
    const occurrences = {
      proof: {
        abduction: 0,
        deduction: 0,
        induction: 0,
      },
    };
    // TODO
    return occurrences;
  }

countPurposeOccurrences(text) { // Categoria 8
    const occurrences = {
      purpose: {
        behavior: 0,
        critique: 0,
        design_science: 0,
        interpretative: 0,
      },
    };
    // TODO
    return occurrences;
  }

countSecondary_proofOccurrences(text) { // Categoria 9
    const occurrences = {
      proof: {
        proof: 0,
        rebuttal: 0,
      },
    };
    // TODO
    return occurrences;
  }

countValidation_resultOccurrences(text) { // Categoria 10
    const occurrences = {
      purpose: {
        cost_effectiveness: 0,
        effectiveness: 0,
        efficiency: 0,
        operationalization: 0,
        usability: 0,
      },
    };

    // TODO
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

    results.method = getMaxLoc(classifications.method);
    results.validation_strategy = getMaxLoc(classifications.validation_strategy);
    results.data_nature = getMaxLoc(classifications.data_nature);
    results.environment = getMaxLoc(classifications.environment);
    results.methodological = getMaxLoc(classifications.methodological);
    results.proof = getMaxLoc(classifications.proof);
    results.purpose = getMaxLoc(classifications.purpose);
    results.secundary_proof = getMaxLoc(classifications.secundary_proof);
    results.validation_result = getMaxLoc(classifications.validation_result);
	  
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
