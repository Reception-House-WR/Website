describe("Our People Page Tests (Hosted Environment)", () => {
  const peopleUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net/en/about/our-people";

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
    cy.visit(peopleUrl);
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("loads the Our People hero section", () => {
      cy.url().should("include", "/about/our-people");
      cy.get("h1").should("be.visible");
      cy.contains("We support refugees as they rebuild their lives").should(
        "be.visible"
      );
    });

    it("displays the Search and Filter interface", () => {
      cy.get('input[placeholder*="Search by name or role"]').should(
        "be.visible"
      );
      cy.contains(new RegExp("^All$", "g")).should("be.visible");
    });

    it("verifies the Team List content", () => {
      cy.contains("No team members found matching your search").should("exist");
    });

    it("allows typing in the search bar", () => {
      cy.get('input[placeholder*="Search by name or role"]')
        .type("Director")
        .should("have.value", "Director");
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("displays search bar on mobile", () => {
      cy.get('input[placeholder*="Search by name or role"]')
        .scrollIntoView()
        .should("be.visible");
      cy.contains(new RegExp("^All$", "g")).should("be.visible");
    });
  });
});
