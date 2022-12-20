/// <reference types="cypress"/>

describe('page loads', () => {
  it('localhost loads as expected', () => {
    cy.visit('http://localhost:3000');
    cy.url().should('eq', `${Cypress.env('baseUrl')}/`);
  });
  it('baseUrl loads as expected', () => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}/`);
  });
});

export {};
