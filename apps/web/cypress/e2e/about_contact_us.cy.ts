describe("Contact Us Page Tests (Hosted Environment)", () => {
  const contactUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net/en/about/contact-us";

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
    cy.visit(contactUrl);
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("loads the Contact Us hero section", () => {
      cy.url().should("include", "/about/contact-us");

      cy.get("h1").contains("Contact Us").should("be.visible");

      cy.contains("We're here to answer your questions").should("be.visible");
    });

    it("displays Contact Details (Address, Phone, Email)", () => {
      cy.contains("Get in Touch").scrollIntoView().should("be.visible");

      cy.contains("101 Frederick St").should("be.visible");
      cy.contains("Kitchener").should("be.visible");

      cy.contains("Main: (519)-743-0445").should("be.visible");

      cy.contains("info@receptionhouse.ca").should("be.visible");
    });

    it("displays Office Hours and Parking Info", () => {
      cy.contains("Office Hours").scrollIntoView().should("be.visible");

      cy.contains("Monday - Friday").should("be.visible");
      cy.contains("9am - 4:30pm").should("be.visible");

      cy.contains("Parking Information").should("be.visible");
      cy.contains("Free parking is available").should("be.visible");
    });

    it("displays the Map section", () => {
      cy.contains("Find Us").scrollIntoView().should("be.visible");
    });

    it("verifies the Contact Form state", () => {
      cy.contains("Contact form is temporarily unavailable")
        .scrollIntoView()
        .should("be.visible");
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("stacks content vertically on mobile", () => {
      cy.contains("Contact Us").scrollIntoView().should("be.visible");

      cy.contains("Get in Touch").scrollIntoView().should("be.visible");

      cy.contains("Find Us").scrollIntoView().should("be.visible");
    });
  });
});
