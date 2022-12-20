/// <reference types="cypress"/>

describe('page loads', () => {
  it('localhost loads as expected', () => {
    cy.visit('http://localhost:3000');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('baseUrl loads as expected', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});

describe('Unauthenticated content', () => {
  before(() => {
    cy.logout();
    cy.visit('/');
  });
  it('shows content', () => {
    cy.contains('Loading tRPC query...').should('be.visible');
    cy.contains('Logged in as e2e').should('not.exist');
  });
});

describe('login with google', () => {
  before(() => {
    cy.logout();
    cy.visit('/');
    cy.login();
    cy.wait('@session');
  });

  it('login with dummy session', () => {
    cy.contains('Logged in as e2e').should('be.visible');
    cy.get('button').contains('Sign out').click()
  });
});

export {};
