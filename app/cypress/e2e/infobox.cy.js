describe("Infobox opening and closing", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("infobox can be closed", () => {
        cy.get(".infobox").should("be.visible");
        cy.get('[data-testid="hide-infobox"]').should("be.visible").click();
        cy.get(".infobox").should("not.exist");
    });
    it("infobox can be closed and opened", () => {
        cy.get(".infobox").should("be.visible");
        cy.get('[data-testid="hide-infobox"]').should("be.visible").click();
        cy.get(".infobox").should("not.exist");
        cy.get('[data-testid="show-infobox"]').should("be.visible").click();
        cy.get(".infobox").should("be.visible");
    });
});

describe("Toggle checkboxes", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("checkboxes are ticked by default", () => {
        cy.get('[data-testid="green-check"]').should("be.checked");
        cy.get('[data-testid="yellow-check"]').should("be.checked");
        cy.get('[data-testid="red-check"]').should("be.checked");
    });
    it("clicking a checkbox unticks, but doesn't affect others", () => {
        cy.get('[data-testid="green-check"]').click();
        cy.get('[data-testid="green-check"]').should("not.be.checked");
        cy.get('[data-testid="yellow-check"]').should("be.checked");
        cy.get('[data-testid="red-check"]').should("be.checked");
    });
});
