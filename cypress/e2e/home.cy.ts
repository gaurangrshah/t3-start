/// <reference types="cypress"/>

describe('Unauthenticated content', () => {
  before(() => {
    cy.visit('/');
  });
  it('shows content', () => {
    cy.contains('Loading tRPC query...').should('be.visible');
    cy.contains('Logged in as e2e').should('not.exist');
    cy.get('#authBtn').should('be.visible');
  });
});

export {};
