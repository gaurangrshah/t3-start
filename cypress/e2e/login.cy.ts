/// <reference types="cypress"/>

// describe('login with google', () => {
//   before(() => {
//     // cy.logout();
//     cy.visit('/');
//     cy.googleLogin();
//     cy.wait('@session');
//   });

//   it('login with dummy session', () => {
//     cy.contains('Logged in as Gaurang Shah').should('be.visible');
//     // cy.get('button').contains('Sign out').click();
//     // cy.clearAllSessionStorage()
//     cy.clearAllCookies();
//     cy.reload();
//   });
// });

describe('login with test credentials', () => {
  before(() => {
    cy.visit('/');
    if (process.env.NODE_ENV) cy.log(process.env.NODE_ENV);
  });
  it('login flow', () => {
    cy.get('main').within(() => {
      cy.get('button')
        .contains(/sign in/i)
        .click();
    });
  });
});

export {};
