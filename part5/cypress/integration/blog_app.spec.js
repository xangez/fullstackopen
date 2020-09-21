describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'billy',
      username: 'billyy',
      password: 'billybob',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  describe('Login', function () {
    xit('succeeds with correct credentials', function () {
      cy.get('#username').type('billyy')
      cy.get('#password').type('billybob')
      cy.get('#login-button').click()
      cy.contains('billy logged in')
    })
    xit('fails with wrong credentials', function () {
      cy.get('#username').type('billy')
      cy.get('#password').type('billybob')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'billyy', password: 'billybob' })
    })
    xit('a new blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('making food')
      cy.get('#author').type('billy')
      cy.get('#url').type('billy/food')
      cy.contains('save').click()
      cy.contains('A new blog making food by billy added')
      cy.contains('making food billy')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'making food',
          author: 'billy ',
          url: 'kjhkjh',
          likes: 2,
        })
        cy.createBlog({
          title: 'sleeping',
          author: 'billy ',
          url: 'kjhkjh',
          likes: 1,
        })
        cy.createBlog({
          title: 'travelling',
          author: 'billy ',
          url: 'kjhkjh',
          likes: 3,
        })
      })

      xit('blog can be liked', function () {
        cy.contains('making food billy').contains('view').click()
        cy.contains('making food billy').contains('upvote').click()
        cy.contains('making food billy').contains('3')
      })

      xit('blog can be deleted', function () {
        // cy.contains('making food billy').contains('hide').click()
        cy.contains('making food billy').contains('view').click()
        cy.contains('making food billy').contains('remove').click()
        cy.get('html').should('not.contain', 'making food billy')
      })

      xit('blogs are sorted by likes', function () {
        const strings = ['3', '2', '1']
        cy.get('.likes').each((element, index) => {
          expect(element.get(0).innerText.substr(6)).equal(strings[index])
        })
      })
    })
  })
})
