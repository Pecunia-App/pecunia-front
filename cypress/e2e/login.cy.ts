describe('The Login Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should navigate to login page and login successfully', () => {
    cy.contains('Connexion').should('be.visible');
    cy.contains('Connexion').click();

    cy.url().should('include', '/login');
    cy.get('app-login-form').should('be.visible');
    cy.get('[data-cy=email-input]').type(Cypress.env('email'));
    cy.get('[data-cy=password-input]').type(Cypress.env('password'));
    cy.intercept('POST', '**/login').as('loginRequest');
    cy.get('[data-cy=login-button]').click();

    cy.wait('@loginRequest');
    cy.url().should('include', '/transactions');
    cy.contains('Aperçu').should('be.visible');
  });
});
