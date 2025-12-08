describe("Media Room Page Tests (Hosted Environment)", () => {
  const mediaUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net/en/media-room";

  Cypress.on("uncaught:exception", (err, runnable) => {
    if (
      err.message.includes("Minified React error #418") ||
      err.message.includes("Hydration failed")
    ) {
      return false;
    }
    return true;
  });

  beforeEach(() => {
    cy.visit(mediaUrl);
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("loads the Media Room hero section correctly", () => {
      cy.url().should("include", "/media-room");
      cy.get("h1").should("contain", "Media Room");
      cy.contains("Access our media kit, explore recent press releases").should(
        "be.visible"
      );
    });

    it("displays Media Kit download options", () => {
      cy.contains("h2", "Media Kit").scrollIntoView().should("be.visible");
      cy.contains("Organization Logo Pack").should("be.visible");
      cy.contains("Brand Guidelines").should("be.visible");
      cy.contains("Key Facts & Statistics").should("be.visible");
      cy.contains("Download").should("be.visible");
      cy.get("body").find(":contains('Download')").should("have.length.gte", 3);
    });

    it("displays the Photos & Videos gallery", () => {
      cy.contains("h2", "Photos & Videos")
        .scrollIntoView()
        .should("be.visible");

      cy.contains("button", "All Media").should("be.visible");
      cy.contains("button", "Photos").should("be.visible");
      cy.contains("button", "Videos").should("be.visible");

      cy.get("img[alt*='Reception House']").should("exist");
    });

    it("displays the Press Releases section", () => {
      cy.contains("h2", "Press Releases").scrollIntoView().should("be.visible");

      cy.contains("Stay updated with our latest news").should("be.visible");
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("stacks content vertically on mobile", () => {
      cy.contains("Media Kit").scrollIntoView().should("be.visible");
      cy.contains("Key Facts & Statistics")
        .scrollIntoView()
        .should("be.visible");
      cy.contains("Download").should("be.visible");
    });
  });
});
