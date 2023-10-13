
describe('Pruebas E2E para el componente TableData', () => {
  it('debería mostrar la tabla correctamente', () => {
    cy.visit('/');
    cy.get('.table-container').should('exist');
    cy.get('table.custom').should('exist');
  });

  it('debería eliminar una nota', () => {
    cy.visit('/');
    cy.get('[data-test="delete-note-button"]').first().click();
    cy.get('.is-size-2.has-text-danger.has-text-centered').should('exist');
    cy.contains('Are you sure you want to delete this note?').should('exist');
    cy.get('.delete-note-button').click();
    cy.get('.alert-info').should('exist');
    cy.get('.alert-info > h3').should('exist');
    cy.contains('The note was delete').should('exist');

  });
});
