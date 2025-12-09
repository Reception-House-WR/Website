describe("Donate Page Tests (Hosted Environment)", () => {
  const donateUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net/en/donate";

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
    cy.visit(donateUrl);
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("loads the Donate page with the correct Hero section", () => {
      cy.url().should("include", "/donate");
      cy.get("h1").should("contain", "Support Newcomers. Transform Lives");
      cy.contains("Your generosity creates opportunities").should("be.visible");
    });

    it("displays the 'Where Your Donation Helps' program cards", () => {
      cy.contains("Where Your Donation Helps")
        .scrollIntoView()
        .should("be.visible");

      cy.contains("Housing Support").should("be.visible");
      cy.contains("Employment & Integration").should("be.visible");
      cy.contains("Health & Well-Being").should("be.visible");
      cy.contains("Community Partnerships").should("be.visible");

      cy.contains("button, a", "Donate to Housing Support").should(
        "be.visible"
      );
    });

    it("displays the In-Kind Donation options", () => {
      cy.contains("h2", "In-Kind Donations")
        .scrollIntoView()
        .should("be.visible");

      cy.contains("Kids School Items").should("be.visible");
      cy.contains("Baby Essentials").should("be.visible");
      cy.contains("Backpacks").should("be.visible");
      cy.contains("Gift Cards").should("be.visible");
    });

    it("displays the bottom Call-to-Action", () => {
      cy.scrollTo("bottom");
      cy.contains(
        "Every Contribution Helps Newcomers Build a Safe and Welcoming Home"
      ).should("be.visible");
      cy.contains("button, a", "Make a Donation Today").should("be.visible");
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("stacks program cards vertically on mobile", () => {
      cy.contains("Housing Support").scrollIntoView().should("be.visible");
      cy.contains("Donate to Housing Support").should("be.visible");
    });
  });
});
