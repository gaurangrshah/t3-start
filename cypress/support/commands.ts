/// <reference types="cypress" />
import '@testing-library/cypress/add-commands'; // this import should be at the top of file
import { signOut } from 'next-auth/react';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

/*
@SEE: https://github.com/nextauthjs/next-auth/discussions/2053#discussioncomment-1191016
*/
Cypress.Commands.add('login', () => {
  cy.intercept('/api/auth/session', { fixture: 'session.json' }).as('session');

  // Set the cookie for cypress.
  // It has to be a valid cookie so next-auth can decrypt it and confirm its validity.
  // This step can probably/hopefully be improved.
  // We are currently unsure about this part.
  // We need to refresh this cookie once in a while.
  // We are unsure if this is true and if true, when it needs to be refreshed.
  cy.setCookie('next-auth.session-token', `${Cypress.env('SESSION_TOKEN')}`);
  cy.setCookie(
    '__Secure-next-auth.session-token',
    `${Cypress.env('SESSION_TOKEN')}`,
    {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true,
    }
  );
});

// Cypress.Commands.add('logout', () => {
//   cy.log('logout');
//   return cy.wrap(signOut({ redirect: false }));
// });

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(): Chainable<void>;
      logout(): Chainable<Element>;
    }
  }
}
export {};
