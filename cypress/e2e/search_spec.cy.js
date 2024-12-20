describe("Search Movies", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://rancid-tomatillos-api.onrender.com/api/v1/movies",
      {
        statusCode: 200,
        fixture: 'movie_posters'
      }
    ).as("getMovies");
    cy.visit("http://localhost:3000");
  });

  it('filters by live search', () => {
    cy.get('.search-bar').find('input').as('searchInput')

    cy.get('.MoviesContainer').find('.movie-card').should('have.length', 4)
    cy.get('@searchInput').type('r')
    cy.get('.MoviesContainer').find('.movie-card').should('have.length', 3)
    cy.get('@searchInput').clear()
    cy.get('.MoviesContainer').find('.movie-card').should('have.length', 4)
    cy.get('@searchInput').type('ree')
    cy.get('.MoviesContainer').find('.movie-card').should('have.length', 1)
    cy.get('@searchInput').clear()
    cy.get('@searchInput').type('reee')
    cy.get('.MoviesContainer').find('.movie-card').should('have.length', 0)
  });
});
