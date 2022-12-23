/// <reference types="cypress"/>

describe('login with test credentials', () => {
  before(() => {
    cy.visit('/');
  });
  it('credentials auth flow', () => {
    cy.get('#authBtn').should('be.visible').click();
    // signIn page
    cy.get('input[name=email]')
      .should('be.visible')
      .clear()
      .type('e2e@e2e.test'); // @TODO: env var
    cy.get('input[name=password]').should('be.visible').clear().type('test'); // @TODO: env var
    cy.get('button[type=submit]').click();
    cy.contains('Logged in as E2E').should('be.visible');
    // signout
    cy.get('#authBtn').should('be.visible').click();
    cy.contains('Logged in as e2e').should('not.exist');
  });
});

export {};
