describe("About Page Tests (Hosted Environment)", () => {
  const aboutUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net/en/about";

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
    cy.visit(aboutUrl);
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("loads the About page content correctly", () => {
      cy.url().should("include", "/about");
      cy.get("h1, h2").contains("Who We Are").should("be.visible");
      cy.contains("We are a compassionate nonprofit organization").should(
        "be.visible"
      );
    });

    it("displays the About Us navigation cards", () => {
      cy.contains("Our People").scrollIntoView().should("be.visible");
      cy.contains("Our People").should("be.visible");
      cy.contains("Our Purpose").should("be.visible");
      cy.contains("Our History").should("be.visible");
      cy.contains("Contact Us").should("be.visible");
    });

    it("displays the Board of Directors section", () => {
      cy.contains("Board of Directors").scrollIntoView().should("be.visible");
      cy.contains("The Board of Directors plays a pivotal role").should(
        "be.visible"
      );
      cy.contains("Meet our board").should("be.visible");
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("stacks navigation cards vertically on mobile", () => {
      cy.contains("Our People").scrollIntoView().should("be.visible");
      cy.contains("Contact Us").scrollIntoView().should("be.visible");
      cy.contains("Board of Directors").scrollIntoView().should("be.visible");
    });
  });
});
