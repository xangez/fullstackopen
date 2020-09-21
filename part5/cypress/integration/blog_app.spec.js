describe('BLog app', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Log in')
  })

  it('user can login', function () {
    cy.get('#username').type('bob')
    cy.get('#password').type('kjhgkjhg')
    cy.get('#login-button').click()
    cy.contains('logged in')
  })
})
