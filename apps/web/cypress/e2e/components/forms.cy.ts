describe("Partner Forms (Employment)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/programs-and-services/employment");
  });

  it("submits the Hire Refugee form successfully", () => {
    cy.intercept("POST", "/api/employment", {
      statusCode: 200,
      body: { message: "Form submitted successfully!" },
    }).as("submitForm");

    cy.contains("button", "Hire Through Reception House").click();
    cy.get('[role="dialog"]').should("be.visible");

    cy.get('input[name="name"]').type("Cypress Test User");
    cy.get('input[name="organization"]').type("Cypress Corp");
    cy.get('input[name="email"]').type("test@cypress.io");
    cy.get('textarea[name="message"]').type(
      "This is an automated test inquiry."
    );

    cy.contains("button", "Submit Request").click();

    cy.wait("@submitForm").its("request.body").should("include", {
      name: "Cypress Test User",
      email: "test@cypress.io",
    });

    cy.on("window:alert", (text) => {
      expect(text).to.contains("Form submitted successfully");
    });
  });

  it("shows validation errors for invalid email", () => {
    cy.contains("button", "Hire Through Reception House").click();

    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("not-an-email");
    cy.contains("button", "Submit Request").click();

    cy.contains("Invalid email").should("exist");
  });
});
