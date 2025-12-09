describe("Site-wide API Status Tests", () => {
  const baseUrl =
    "https://webapp-front-dev-esa3bpc4h2bnfrfw.canadacentral-01.azurewebsites.net";

  const checkPage = (path: string, uniqueText: string) => {
    it(`GET ${path} - should return 200 and contain "${uniqueText}"`, () => {
      cy.request("GET", `${baseUrl}${path}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers["content-type"]).to.include("text/html");

        expect(response.body).to.include(uniqueText);
      });
    });
  };

  // Main Pages
  checkPage("/en", "Belonging Starts Here");
  checkPage("/en/events", "Upcoming Events");
  checkPage("/en/stories", "Join Our Community");
  checkPage("/en/donate", "Support Newcomers");
  checkPage("/en/media-room", "Media Kit");

  checkPage("/en/about", "Who We Are");
  //   checkPage("/en/about/our-people", "Meet our dedicated team");
  checkPage("/en/about/purpose", "Our Mission");
  checkPage("/en/about/our-history", "Three decades of growth");
  checkPage("/en/about/contact-us", "Get in Touch");

  //  Programs & Services

  checkPage("/en/programs-and-services", "Programs");
  checkPage("/en/programs-and-services/employment", "Employment");
  checkPage("/en/programs-and-services/housing", "Accommodation");

  // 404 Page Test
  it("GET /en/non-existent-page - should return 404", () => {
    cy.request({
      url: `${baseUrl}/en/this-page-does-not-exist`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
