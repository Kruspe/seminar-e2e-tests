describe('Cypress Tests', () => {
  it('should add two items and check on of them', () => {
    cy.visit('/');
    cy.contains('No Todos');

    cy.get('#task-input').type('Task 1');
    cy.get('#submit-button').click();
    cy.get('#task-input').type('Task 2');
    cy.get('#submit-button').click();
    cy.get('[data-testid="todo-item"]').first().click();

    cy.contains('No Todos').should('not.exist');
    cy.get('[data-testid="todo-item"]').should('have.length', 2);
    cy.get('[data-testid="todo-checkbox"] input').first().should('be.checked');

    cy.reload();
    cy.contains('No Todos').should('not.exist');
    cy.get('[data-testid="todo-item"]').should('have.length', 2);
    cy.get('[data-testid="todo-checkbox"] input').first().should('be.checked');
  });
});