describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('validates inputs', () => {
    cy.get('button').click();

    cy.contains('First name is a required field');
    cy.contains('Last name is a required field');
    cy.contains('Email is a required field');
  });

  it('succesfully registers', () => {
    cy.get('input[name=firstName]').type('John');
    cy.get('input[name=lastName]').type('Doe');
    cy.get('input[name=email]').type('john.doe@gmail.com');

    cy.get('button').click();

    cy.get('.registration-text').contains('Registration done');
  });
});
