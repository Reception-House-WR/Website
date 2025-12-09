describe("Stories Page Tests (Hosted Environment)", () => {
  const storiesUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net/en/stories";

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
    cy.visit(storiesUrl);
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("loads the Stories page with correct hero section", () => {
      cy.url().should("include", "/stories");
      cy.get("h1").should("contain", "Join Our Community");
      cy.contains("Together, we create a welcoming community").should(
        "be.visible"
      );
    });

    it("displays the Client Story card correctly", () => {
      cy.contains("Muhibullah Kabir Ahmad's Story")
        .scrollIntoView()
        .should("be.visible");

      cy.contains("Client Story").should("be.visible");
      cy.contains("We are not used to hope").should("be.visible");

      cy.contains("a", "Watch Video Interview")
        .should("be.visible")
        .and("have.attr", "href");
    });

    it("displays the Carousel navigation", () => {
      cy.get("button").filter(":has(svg)").should("exist");
      cy.get("button").filter(":has(svg)").should("have.length.at.least", 2);
    });

    it("renders the 'Share Your Story' Call-to-Action", () => {
      cy.contains("Have a Story to Share?")
        .scrollIntoView()
        .should("be.visible");

      cy.contains("Your journey matters and can inspire others").should(
        "be.visible"
      );

      cy.contains("a", "Share Your Story")
        .should("be.visible")
        .and("have.attr", "href")
        .and("include", "mailto:");
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("renders the story card vertically on mobile", () => {
      cy.contains("Muhibullah Kabir Ahmad's Story")
        .scrollIntoView()
        .should("be.visible");

      cy.contains("a", "Watch Video Interview").should("be.visible");
    });
  });
});
