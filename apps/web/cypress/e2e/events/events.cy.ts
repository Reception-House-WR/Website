describe("Events Page Tests (Hosted Environment)", () => {
  const eventsUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net/en/events";

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
    cy.visit(eventsUrl);
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("displays the Upcoming Events Calendar correctly", () => {
      cy.contains("December 2025").should("exist");
      cy.get(".rdp-day").should("have.length.gt", 0);
    });

    it("displays the Event Card details", () => {
      cy.contains("test").should("be.visible");
      cy.contains("Oakville, ON, CAN").should("be.visible");
      cy.contains("12:00 AM").should("be.visible");
    });

    it("switches between Upcoming and Past events", () => {
      cy.contains("button", "Past Events").click();
      cy.contains("test", { timeout: 10000 }).should("be.visible");
      cy.contains("button", "Upcoming").click();
      cy.contains("test").should("not.exist");
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport("iphone-x");
    });

    it("renders events list on mobile", () => {
      cy.contains("Upcoming Events Calendar").should("be.visible");
      cy.contains("test").scrollIntoView().should("be.visible");
    });
  });
});
