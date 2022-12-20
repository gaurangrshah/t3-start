/// <reference types="cypress"/>

describe('login with google', () => {
  before(() => {
    // cy.logout();
    cy.visit('/');
    cy.login();
    cy.wait('@session');
  });

  it('login with dummy session', () => {
    cy.contains('Logged in as Gaurang Shah').should('be.visible');
    // cy.get('button').contains('Sign out').click();
    // cy.clearAllSessionStorage()
    cy.clearAllCookies();
    cy.reload();
  });
});

export {};
