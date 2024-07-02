describe("can load site", () => {
    it("passes", () => {
        //URL cypress.config.js-tiedostossa
        cy.visit("/");
    });
});

describe("banner tests", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("links are rendered", () => {
        cy.get('[data-testid="harjaus-link"]')
            .should("exist")
            .should("have.text", "Harjaus");

        cy.get('[data-testid="auraus-link"]')
            .should("exist")
            .should("have.text", "Auraus");
        cy.get('[data-testid="hiekoitus-link"]')
            .should("exist")
            .should("have.text", "Hiekoitus");
    });
    it("links navigate to new url", () => {
        cy.get('[data-testid="hiekoitus-link"]').click();
        cy.get('[data-testid="hiekoitus-link"]')
            .url()
            .should("include", "/#/hiekoitus");
        cy.get('[data-testid="auraus-link"]').click();
        cy.get('[data-testid="auraus-link"]')
            .url()
            .should("include", "/#/auraus");
        cy.get('[data-testid="harjaus-link"]').click();
        cy.get('[data-testid="harjaus-link"]')
            .url()
            .should("include", "/#/hiekanpuhdistus");
    });
});
