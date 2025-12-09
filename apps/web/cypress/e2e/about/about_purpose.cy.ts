describe("About - Our Purpose Page Tests (Hosted Environment)", () => {
  const purposeUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net/en/about/purpose";

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
    cy.visit(purposeUrl);
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("loads the Mission and Vision sections", () => {
      cy.url().should("include", "/about/purpose");
      cy.contains("Our Mission").scrollIntoView().should("be.visible");
      cy.contains("Guide and support refugees and newcomers").should(
        "be.visible"
      );
      cy.contains("Our Vision").scrollIntoView().should("be.visible");
      cy.contains("finds belonging, security").should("be.visible");
    });

    it("displays the Core Values", () => {
      cy.contains("Our Core Values").scrollIntoView().should("be.visible");
      cy.contains("Inclusivity").should("be.visible");
      cy.contains("Communication").should("be.visible");
      cy.contains("Innovation").should("be.visible");
      cy.contains("Empowerment").should("be.visible");
      cy.contains("Integrity").should("be.visible");
      cy.contains("We create spaces where everyone feels welcomed").should(
        "be.visible"
      );
    });

    it("displays Strategic Priorities and Impact sections", () => {
      cy.contains("Strategic Priorities 2024-2026")
        .scrollIntoView()
        .should("be.visible");
      cy.contains("Our roadmap for expanded impact").should("be.visible");
      cy.contains("See Our Impact").scrollIntoView().should("be.visible");
      cy.contains("Click to watch our story").should("be.visible");
    });

    it("displays Transparency & Accountability section", () => {
      cy.contains("Transparency & Accountability")
        .scrollIntoView()
        .should("be.visible");
      cy.contains("Explore our annual reports").should("be.visible");
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("stacks content vertically on mobile", () => {
      cy.contains("Our Mission").scrollIntoView().should("be.visible");
      cy.contains("Integrity").scrollIntoView().should("be.visible");
      cy.contains("Transparency & Accountability")
        .scrollIntoView()
        .should("be.visible");
    });
  });
});
