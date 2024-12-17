describe('Dashboard/Homepage wtv', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://rancid-tomatillos-api.onrender.com/api/v1/movies', { 
      status: 200,
      fixture: 'movie_posters'
     })
    cy.visit('http://localhost:3000/');

  })

  it('should load the main page', () => {
    cy.get('h1').should('contain', 'Rancid Tomatillos')
    cy.get('.MoviesContainer').find('.movie-card').should('have.length', 4)

    cy.get('.MoviesContainer > :nth-child(1) img').should('have.attr', 'src').and('contains', 'https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg' )
    cy.get('.MoviesContainer > :nth-child(1) img').should('have.attr', 'alt').and('contains', 'Poster for 155' )
    cy.get('.MoviesContainer > :nth-child(1)').find('section').should('have.attr', 'class').and('contains', 'VoterBlock')
    cy.get('.MoviesContainer > :nth-child(1)').find('section').as('firstMovie')
    cy.get('.MoviesContainer > :nth-child(4)').find('section').as('lastMovie')

    cy.get('@firstMovie').find('div').eq(0).find('img').should('have.attr', 'src').and('contains', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAtdJREFUeF7t20FOw0AQRFH7YERhByxAnAg4EYIFsCOCgwU5UlCQjFO2u6a6pWLDgs5M8l8GSw70nb+kBXrp7t68M4D4TWAAA4gLiLf3CTCAuIB4e58AA4gLiLf3CTCAuIB4e58AA4gLiLf3CTCAuIB4e58AAywvsLl5eRwe/fV2d/he8avsCTjE33cPh+h991QVoSTAn/jHt31RhHIAo/ELI5QCmIxfFKEMABS/IEIJgFnxiyGkB1gUvxBCaoBV8YsgpAUIiV8AISVAaPzkCOkAKPETI6QCoMZPipAGoEn8hAgpAJrGT4YgB5gTf9/1u77bb6duOyMzv49PcANPCjA3/vf77eXm+mU/BfD1ftdfXL9+noPKgiADWBJ/iIYADHNVECQAS+PPAaiC0BxgTfy5ABUQmgKsjb8EIDtCM4CI+EsBMiM0AYiKvwYgKwIdIDL+WoCMCFSA6PgRANkQaACM+FEAmRAoAKz4kQBZEMIBmPGjATIghAKw4zMA1AhhAC3iswCUCCEAreIzAVQIqwFaxmcDKBCaAQwflAz386fu5SM/Q29HI2v9NwPfyg74QGc1wOFdefq3+iOvKip+ixNwfPpnEQLiD3uFAEwhRMZvCTD56ygofijAGEJ0/NYAowiB8cMBThEY8RUAfxCC41MAjgis/9lqcREeuzhvr563u4/73ZqL+9hjw64B0U/sv/VUAKzXZwBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXDdcgDg6yozZgAxlQEMIC4g3t4nwADiAuLtfQIMIC4g3t4nwADiAuLtfQIMIC4g3t4nwADiAuLtfQIMIC4g3v4HROI9fyAPyNUAAAAASUVORK5CYII=')
    cy.get('@firstMovie').find('div').eq(1).find('img').should('have.attr', 'src').and('contains', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAtpJREFUeF7t20FOwzAQhWHnYFRlByxAnIhyIlQWwI6qHCwooFYC1CZjv/GbQa9rxxP+r6ZSCkPRi1pgoE7X8CIA8ptAAAIgFyCP1wkQALkAebxOgADIBcjjdQIEQC5AHq8TIAByAfJ4nQABkAuQx+sECMBWYHW9Hc9dsX+9S/WmSnWzU3gB2N6w8NUCgCe1bSgAWy/4agHAk9o2FICtF3y1AOBJbRsKwNYLvloA8KS2DQVg6wVfLQB4UtuGArD1gq8WADypbUMB2HrBVwsAntS2oQBsveCrBQBPattQALZe8NUCgCe1bSgAWy/4agHAk9o2FICtF3y1AOBJbRsKwNYLvloA8KS2DQWwoNf66mm9e7vfLVhqXsICWN1sN/uXu435hmcugP9l3HSjZSwPYxl2H6+3l+gbZgBcXD+/D2Vcl6E8ohGgAIf4h+geCL0BjvEPPxQYAQbwO74XQk+AP/EdECAAp+J7IPQCOBkfjNAMMBcfjdADYDY+EKEbwHTPiM8Eb4DF8acfCPB50Aww3cfSU4BA8AToHf/bEPTqheAFwIgPBeh1EjwAWPHhAD0Q0ADM+C4A3ghIAHZ8NwBPBBRAhPiuAF4ICIAo8d0BPBBaASLF7wKARmgBiBa/GwASoRYgYvyuACiEGoCo8bsDIBCsAJHjUwBaESwA0ePTAFoQlgJkiE8FqEVYApAlPh2gBuHry/Ezr+k7h7k1x8sBz/NbHybDHke33IjlUXbLnB/XBogf4gQconRFCBI/FID111H1SQgUPxyAO0Kw+CEB3BACxg8LAEcIGj80AAwhcPzwAM0IweOnAKhGSBA/DYAZIUn8VACLERLFTwcwi5AsfkqAkwgJ46cF+IOQNH5qgCNCKQX9f1vVz5kqLgzxOLrivv/NJQIgUwpAAOQC5PE6AQIgFyCP1wkQALkAebxOgADIBcjjdQIEQC5AHq8TIAByAfJ4nQABkAuQx38CizY9f7FvjaYAAAAASUVORK5CYII=')
    cy.get('@firstMovie').find('p').contains('32544')

    cy.get('@lastMovie').find('div').eq(0).find('img').should('have.attr', 'src').and('contains', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAtdJREFUeF7t20FOw0AQRFH7YERhByxAnAg4EYIFsCOCgwU5UlCQjFO2u6a6pWLDgs5M8l8GSw70nb+kBXrp7t68M4D4TWAAA4gLiLf3CTCAuIB4e58AA4gLiLf3CTCAuIB4e58AA4gLiLf3CTCAuIB4e58AAywvsLl5eRwe/fV2d/he8avsCTjE33cPh+h991QVoSTAn/jHt31RhHIAo/ELI5QCmIxfFKEMABS/IEIJgFnxiyGkB1gUvxBCaoBV8YsgpAUIiV8AISVAaPzkCOkAKPETI6QCoMZPipAGoEn8hAgpAJrGT4YgB5gTf9/1u77bb6duOyMzv49PcANPCjA3/vf77eXm+mU/BfD1ftdfXL9+noPKgiADWBJ/iIYADHNVECQAS+PPAaiC0BxgTfy5ABUQmgKsjb8EIDtCM4CI+EsBMiM0AYiKvwYgKwIdIDL+WoCMCFSA6PgRANkQaACM+FEAmRAoAKz4kQBZEMIBmPGjATIghAKw4zMA1AhhAC3iswCUCCEAreIzAVQIqwFaxmcDKBCaAQwflAz386fu5SM/Q29HI2v9NwPfyg74QGc1wOFdefq3+iOvKip+ixNwfPpnEQLiD3uFAEwhRMZvCTD56ygofijAGEJ0/NYAowiB8cMBThEY8RUAfxCC41MAjgis/9lqcREeuzhvr563u4/73ZqL+9hjw64B0U/sv/VUAKzXZwBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXBdA4ChWGMGYJUF1zUAGIo1ZgBWWXDdcgDg6yozZgAxlQEMIC4g3t4nwADiAuLtfQIMIC4g3t4nwADiAuLtfQIMIC4g3t4nwADiAuLtfQIMIC4g3v4HROI9fyAPyNUAAAAASUVORK5CYII=')
    cy.get('@lastMovie').find('div').eq(1).find('img').should('have.attr', 'src').and('contains', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAAAXNSR0IArs4c6QAAAtpJREFUeF7t20FOwzAQhWHnYFRlByxAnIhyIlQWwI6qHCwooFYC1CZjv/GbQa9rxxP+r6ZSCkPRi1pgoE7X8CIA8ptAAAIgFyCP1wkQALkAebxOgADIBcjjdQIEQC5AHq8TIAByAfJ4nQABkAuQx+sECMBWYHW9Hc9dsX+9S/WmSnWzU3gB2N6w8NUCgCe1bSgAWy/4agHAk9o2FICtF3y1AOBJbRsKwNYLvloA8KS2DQVg6wVfLQB4UtuGArD1gq8WADypbUMB2HrBVwsAntS2oQBsveCrBQBPattQALZe8NUCgCe1bSgAWy/4agHAk9o2FICtF3y1AOBJbRsKwNYLvloA8KS2DQWwoNf66mm9e7vfLVhqXsICWN1sN/uXu435hmcugP9l3HSjZSwPYxl2H6+3l+gbZgBcXD+/D2Vcl6E8ohGgAIf4h+geCL0BjvEPPxQYAQbwO74XQk+AP/EdECAAp+J7IPQCOBkfjNAMMBcfjdADYDY+EKEbwHTPiM8Eb4DF8acfCPB50Aww3cfSU4BA8AToHf/bEPTqheAFwIgPBeh1EjwAWPHhAD0Q0ADM+C4A3ghIAHZ8NwBPBBRAhPiuAF4ICIAo8d0BPBBaASLF7wKARmgBiBa/GwASoRYgYvyuACiEGoCo8bsDIBCsAJHjUwBaESwA0ePTAFoQlgJkiE8FqEVYApAlPh2gBuHry/Ezr+k7h7k1x8sBz/NbHybDHke33IjlUXbLnB/XBogf4gQconRFCBI/FID111H1SQgUPxyAO0Kw+CEB3BACxg8LAEcIGj80AAwhcPzwAM0IweOnAKhGSBA/DYAZIUn8VACLERLFTwcwi5AsfkqAkwgJ46cF+IOQNH5qgCNCKQX9f1vVz5kqLgzxOLrivv/NJQIgUwpAAOQC5PE6AQIgFyCP1wkQALkAebxOgADIBcjjdQIEQC5AHq8TIAByAfJ4nQABkAuQx38CizY9f7FvjaYAAAAASUVORK5CYII=')
    cy.get('@lastMovie').find('p').contains('27642')

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/")
    })
  })

  it('upvote a movie', () => {
    cy.intercept('PATCH', 'https://rancid-tomatillos-api.onrender.com/api/v1/movies/155', { 
      vote_direction: "up" 
    })

    cy.get('.MoviesContainer > :nth-child(1)').find('section').as('firstMovie')

    cy.get('@firstMovie').find('p').contains('32544')
    cy.get('@firstMovie').find('div').eq(0).find('img').click()
    cy.get('@firstMovie').find('p').contains('32545')
  })

  it('downvotes a movie', () => {
    cy.intercept('PATCH', 'https://rancid-tomatillos-api.onrender.com/api/v1/movies/680', { 
      vote_direction: "down" 
    })

    cy.get('.MoviesContainer > :nth-child(4)').find('section').as('lastMovie')

    cy.get('@lastMovie').find('p').contains('27642')
    cy.get('@lastMovie').find('div').eq(1).find('img').click()
    cy.get('@lastMovie').find('p').contains('27641')
  });
})