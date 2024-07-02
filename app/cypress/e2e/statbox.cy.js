describe("Statbox visibility", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get('[data-testid="min-mapmethods-button"]').click();
    });

    it("opens statbox", () => {
        cy.get('[data-testid="open-statbox-button"]').click();
        cy.get(".statbox").should("exist");
    });

    it("opens and closes statbox", () => {
        cy.get('[data-testid="open-statbox-button"]').click();
        cy.get(".statbox").should("exist");
        cy.get('[data-testid="statbox-close-button"]').click();
        cy.get(".statbox").should("not.exist");
    });

    it("statbox is fullscreen on small screensize", () => {
        cy.viewport(550, 750);
        cy.get('[data-testid="open-statbox-button"]').click();
        cy.get(".statbox")
            .should("be.visible")
            .should("have.css", "width")
            .and("match", /550px/);
    });
    it("graph exists", () => {
        cy.get('[data-testid="open-statbox-button"]').click();
        cy.get(".statbox").should("exist");
        cy.get(".recharts-responsive-container").should("be.visible");
    });
});

describe("Statbox content", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get('[data-testid="min-mapmethods-button"]').click();
        cy.get('[data-testid="open-statbox-button"]').click();
    });
    it("select has a value and changes graph title", () => {
        cy.get('select[name="charts"]').should(
            "have.value",
            "Reitteihin käytetty aika tehtävätyypin mukaan",
        );
        cy.get(".chartDiv h2").should(
            "have.text",
            "Reitteihin käytetty aika tehtävätyypin mukaan",
        );
        cy.get('select[name="charts"]').select(
            "Reitteihin käytetty aika ajan mukaan",
        );
        cy.get(".chartDiv h2").should(
            "have.text",
            "Reitteihin käytetty aika ajan mukaan",
        );
    });

    it("chart content matches selected task types", () => {
        cy.get(".recharts-label-list .recharts-text tspan").should(
            "have.text",
            "Harjaus",
        );
        cy.visit("/#/auraus");
        cy.get('[data-testid="min-mapmethods-button"]').click();
        cy.get('[data-testid="open-statbox-button"]').click();
        cy.get(".recharts-label-list .recharts-text tspan").should(
            "contain.text",
            "Sulamisvedenhaittojen torjunta",
        );
    });

    it("select changes graph", () => {
        cy.get(".recharts-label-list .recharts-text tspan").should(
            "have.text",
            "Harjaus",
        );
        cy.get('select[name="charts"]').select(
            "Reitteihin käytetty aika ajan mukaan",
        );
        cy.get(".recharts-label-list .recharts-text tspan").should(
            "not.have.text",
            "Harjaus",
        );
        cy.get(".recharts-label-list .recharts-text tspan").should(
            "contain.text",
            "0123",
        );
    });
});
