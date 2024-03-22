class DeClassIFYUI {
  view = `
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

  constructor() {
    $("body").append(this.view);
    this.button = $("#pdf-classify");
    this.modal = $("#pdf-classify-modal");
    this.closeModalButton = $("#pdf-classify-modal-close-button");
    this.results = $("#pdf-classify-results");
    this.setupEvents();
  }

  setupEvents() {
    this.button.click(() => this.showModal());
    this.closeModalButton.click(() => this.hideModal());
  }

  showModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
    this.results.empty();
  }

  addResult(name, result) {
    this.results.append(`<p><strong>${name}</strong>: ${result}</p>`);
  }
}
