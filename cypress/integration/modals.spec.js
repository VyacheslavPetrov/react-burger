const {baseUrl} = require('./dragg.spec')
const IngredientDetails = "[data-cy=ingredient-details]"

describe("Modals", () => {
  before(function () {
    cy.viewport(1300, 800);
    cy.visit(baseUrl);
  });

  it("открытие модального окна с описанием ингредиента", () => {
    cy.get("[data-cy=ingredient]").first().as("ingredient");

    cy.get("@ingredient").click();

    cy.get(IngredientDetails).as("ingredient-details");

    cy.scrollTo("top");
  });

  it("отображение в модальном окне данных ингредиента", () => {
    cy.get(IngredientDetails).as("ingredient-details");

    cy.get("[data-cy=ingredient-details-image]").as(
      "ingredient-details-image"
    );

    cy.get("[data-cy=ingredient-details-name]").as(
      "ingredient-details-name"
    );

    cy.get("[data-cy=ingredient-details-calories]").as(
      "ingredient-details-calories"
    );

    cy.get("[data-cy=ingredient-details-proteins]").as(
      "ingredient-details-proteins"
    );

    cy.get("[data-cy=ingredient-details-fat]").as("ingredient-details-fat");

    cy.get("[data-cy=ingredient-details-carbohydrates]").as(
      "ingredient-details-carbohydrates"
    );

    cy.scrollTo("top");
  });

  it("закрытие модального окна с описанием ингредиента при клике на кнопку закрытия", () => {
    cy.get(IngredientDetails).as("ingredient-details");
    cy.get("[data-cy=modal-close-button]").as("close-button");

    cy.get("@close-button").click();
  });
});