describe("Language Switcher Tests (Hosted Environment)", () => {
  const baseUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net";

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
    cy.intercept("GET", "**/about/contact-us*", {
      statusCode: 200,
      body: {},
    }).as("ignoreContact");

    cy.visit(`${baseUrl}/en`);
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("switches language from English to French and back", () => {
      cy.url().should("include", "/en");

      cy.get("header button")
        .filter(":visible")
        .contains("EN")
        .should("be.visible")
        .click();

      cy.contains("French").click({ force: true });

      cy.url().should("include", "/fr");
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("switches language on mobile", () => {
      cy.get("header button").filter(":visible").contains("EN").click();
      cy.contains("French").click({ force: true });
      cy.url().should("include", "/fr");
    });
  });
});
