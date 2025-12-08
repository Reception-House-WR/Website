describe("Our History Page Tests (Hosted Environment)", () => {
  const historyUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net/en/about/our-history";

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
    cy.visit(historyUrl);
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("loads the Our History hero section", () => {
      cy.url().should("include", "/about/our-history");
      cy.get("h1").should("contain", "Our History");
      cy.contains("Three decades of growth, resilience").should("be.visible");
    });

    it("displays the main history content", () => {
      cy.contains("About Us - Our History")
        .scrollIntoView()
        .should("be.visible");

      cy.contains("As we look ahead, Reception House remains dedicated").should(
        "be.visible"
      );
    });

    it("displays the 'Building a Future of Belonging' highlight section", () => {
      cy.contains("Building a Future of Belonging")
        .scrollIntoView()
        .should("be.visible");

      cy.contains("Our history informs our path").should("be.visible");
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("stacks content vertically on mobile", () => {
      cy.contains("Our History").scrollIntoView().should("be.visible");

      cy.contains("About Us - Our History")
        .scrollIntoView()
        .should("be.visible");

      cy.contains("Building a Future of Belonging")
        .scrollIntoView()
        .should("be.visible");
    });
  });
});
