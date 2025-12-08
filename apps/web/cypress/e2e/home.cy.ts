describe("Homepage Tests (Hosted Environment)", () => {
  const baseUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net/en";

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  context("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1280, 720);
    });

    it("loads the correct Hero section content", () => {
      cy.get("h1").should("contain", "Belonging Starts Here");
      cy.contains("We guide refugees and newcomers with resources").should(
        "be.visible"
      );
      cy.contains("a", "Contact Us")
        .should("be.visible")
        .and("have.attr", "href");
      cy.contains("a", "Learn More").should("be.visible");
    });

    it("verifies the Current Campaign card loads", () => {
      cy.contains("h2", "Current Campaign")
        .scrollIntoView()
        .should("be.visible");
      cy.contains("Home Begins Here").should("be.visible");
      cy.get('[role="progressbar"]').should("exist");
      cy.contains("a", "Donate Here").should("be.visible");
    });

    it("displays the Stories of Hope carousel", () => {
      cy.contains("h2", "Stories of Hope").scrollIntoView();
      cy.contains("We are not used to hope").should("be.visible");
      cy.contains("Muhibullah Kabir Ahmad").should("be.visible");
      cy.get("button").filter(":has(svg)").should("exist");
    });

    it("displays Upcoming Events correctly", () => {
      cy.contains("h2", "Upcoming Events").scrollIntoView();
      cy.contains("December 2025").should("exist");
      cy.contains("test").should("be.visible");
      cy.contains("Oakville, ON, CAN").should("be.visible");
    });

    it("verifies Footer information", () => {
      cy.scrollTo("bottom");

      cy.get("footer").within(() => {
        cy.contains("101 Frederick St, Kitchener").should("be.visible");
        cy.contains("519-744-6549").should("be.visible");
        cy.get('a[href*="facebook"]').should("exist");
        cy.get('a[href*="linkedin"]').should("exist");
        cy.contains("2025 Reception House Waterloo Region").should(
          "be.visible"
        );
      });
    });
  });

  context("Mobile View", () => {
    beforeEach(() => {
      cy.viewport(375, 812);
    });

    it("opens the mobile navigation menu", () => {
      cy.contains("Programs & Services").should("not.be.visible");
      cy.get("header button").first().click();
      cy.get('[role="dialog"]').should("be.visible");

      cy.get('[role="dialog"]').within(() => {
        cy.contains("About Us").should("be.visible");
        cy.contains("Donate").should("be.visible");
      });
    });
  });

  context("Safe Form Interactions", () => {
    it("mocks the 'Hire Refugee' form submission", () => {
      cy.intercept("POST", "**/api/employment", {
        statusCode: 200,
        body: { message: "Mock Success" },
      }).as("mockSubmit");
    });
  });
});
