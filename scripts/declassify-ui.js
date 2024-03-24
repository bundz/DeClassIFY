class DeClassIFYUI {
  view = `
  <div id="pdf-classify-modal">
    <div id="pdf-classify-modal-close-container">
      <div id="pdf-classify-modal-close-button">✖</div>
    </div>
    <h2>Classification</h2>
    <div id="pdf-classify-results">
    </div>
    <div id="pdf-classify-loader">
      <span></span>
    </div>
  </div>
  <div id="pdf-classify">
    <p>DeClassIFY</p>
  </div>
  `;

  constructor() {
    this.url = this.getUrl();

    if (!this.url) {
      return;
    }

    $("body").append(this.view);
    this.button = $("#pdf-classify");
    this.modal = $("#pdf-classify-modal");
    this.closeModalButton = $("#pdf-classify-modal-close-button");
    this.results = $("#pdf-classify-results");
    this.loader = $("#pdf-classify-loader");
    this.setupEvents();
  }

  getUrl() {
    const url = window.location.href;

    if (url.endsWith(".pdf")) {
      return url;
    }

    const plugin = $('embed[type="application/pdf"]');

    if (plugin.attr("type") == "application/pdf") {
      return url;
    }
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
