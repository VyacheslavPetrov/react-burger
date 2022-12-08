export const baseUrl = 'http://localhost:3000'

describe('service is available', function () {
  beforeEach(function () {
    cy.viewport(1300, 800);
    cy.log('Вход на страницу')
    cy.visit(baseUrl);
  })

  const dragAndDrop = (index) => {
    cy.get('[data-cy="ingredient"]').eq(index).trigger('dragstart');
    cy.get('[data-cy="drop-target"]').trigger('drop');
  };

  it('Dnd, login, create order, close modal', function () {
    dragAndDrop(0);
    cy.get('[data-cy="up-bun"]')
      .children().should(($children) => {
      expect($children).to.have.length(1);
    });
    cy.get('[data-cy="down-bun"]')
      .children().should(($children) => {
      expect($children).to.have.length(1);
    });
    dragAndDrop(1)
    cy.get('[data-cy="up-bun"]')
      .children().should(($children) => {
      expect($children).to.have.length(1);
    });
    cy.get('[data-cy="down-bun"]')
      .children().should(($children) => {
      expect($children).to.have.length(1);
    });
    dragAndDrop(2)
    dragAndDrop(3)
    dragAndDrop(4)
    cy.get('[data-cy="other-ingredients-container"]')
      .children().should(($children) => {
      expect($children).to.have.length(3);
    });
    cy.contains("Оформить заказ").as("create-order");
    cy.get("@create-order").click();

    cy.get("[name=email]").as("email-input");
    cy.get("[name=password]").as("password-input");
    cy.contains("Войти").as("login-submit-button");

    cy.get("@email-input").focus();
    cy.get("@email-input").type("test1234444@yandex.ru");

    cy.get("@password-input").focus();
    cy.get("@password-input").type("password");

    cy.get("@login-submit-button").click();
    cy.contains("Оформить заказ").as("create-order");
    cy.get("@create-order").click();

    cy.get("[data-cy=modal-close-button]").as("close-button");
    cy.get("@close-button").click();

  });

});

