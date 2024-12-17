describe("Movie Details", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://rancid-tomatillos-api.onrender.com/api/v1/movies",
      {
        statusCode: 200,
        fixture: 'movie_posters'
      }
    ).as("getMovies");
    cy.intercept(
      "GET",
      "https://rancid-tomatillos-api.onrender.com/api/v1/movies/496243",
      {
        statusCode: 200,
        fixture: 'parasite_details'
      }
    ).as("getMovieDetails");

    cy.visit("http://localhost:3000");
  });

  it("displays movie data for the correct film", () => {
    cy.wait("@getMovies")
    cy.get("h1").should("contain", "Rancid Tomatillos")
    cy.get(".MoviesContainer")
      .find(".movie-card")
      .should("have.length", 4)
    cy.get('.movie-card img[alt="Poster for 496243"]')
      .click();
    cy.wait("@getMovieDetails")
    cy.get(".movie-image")
      .should('have.attr', 'alt')
      .and("include", "Backdrop for Parasite")
    cy.get(".movie-title")
      .should("contain", "Parasite")
    cy.get(".genres").within(() => {
      cy.get(".genre-tag").should("have.length", 3);
      cy.get(".genre-tag").eq(0).should("contain", "Comedy");
      cy.get(".genre-tag").eq(1).should("contain", "Thriller");
      cy.get(".genre-tag").eq(2).should("contain", "Drama");
    });
    cy.get(".overview").should("contain", "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.");
    
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/movie/496243")
    })
  }) 
    
  it("has a functioning home button", () => {
    cy.wait("@getMovies")
    cy.get('.movie-card img[alt="Poster for 496243"]')
      .click();
    cy.wait("@getMovieDetails")
    
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/movie/496243")
    })

    cy.get("header").find('img').click();
    cy.get(".MoviesContainer").should("exist");
    cy.get(".movie-card").should("have.length", 4);

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/")
    })
  })
});
