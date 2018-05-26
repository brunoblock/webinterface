describe("Oyster file upload and download", () => {
  context("Dummy treasure", () => {
    it("should upload and download file", () => {
      // TODO: Run tests against production version.

      // Goes to upload form
      cy.visit("http://0.0.0.0:3000/");
      cy.get("#upload-btn").click();
      cy.location().should(location => {
        expect(location.pathname).to.eq("/upload-form");
      });

      // Uploads image
      cy.uploadFile("#upload-input", "ditto.png");
    });
  });
});
