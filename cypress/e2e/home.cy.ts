/// <reference types="cypress"/>

// import { encode } from 'cypress/support/commands';

describe('empty spec', () => {
  it('localhost loads as expected', () => {
    cy.visit('http://localhost:3000');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
  it('baseUrl loads as expected', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});

describe('login with google', () => {
  before(() => {
    cy.visit('/');
    cy.login();
  });

  it('login with session', () => {
    cy.visit('/');
    cy.wait('@session');
    cy.contains('Logged in as Gaurang Shah').should('be.visible');
  });
});

export {};
