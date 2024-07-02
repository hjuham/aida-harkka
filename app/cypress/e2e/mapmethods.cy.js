describe("Mapmethods visibility", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("opens mapmethods", () => {
        cy.get('[data-testid="min-mapmethods-button"]').click();
        cy.get('[data-testid="mapmethods"]').should("be.visible");
    });
    it("opens and closes mapmethods", () => {
        cy.get('[data-testid="min-mapmethods-button"]').click();
        cy.get('[data-testid="mapmethods"]').should("be.visible");
        cy.get('[data-testid="mapmethods-button"]').click();
        cy.get('[data-testid="min-mapmethods"]').should("be.visible");
        cy.get('[data-testid="mapmethods"]').should("not.exist");
    });

    it("opens and closes mapmethods with esc", () => {
        cy.get('[data-testid="min-mapmethods-button"]').click();
        cy.get('[data-testid="mapmethods"]').should("be.visible");
        cy.get('[data-testid="city-input"]').type("{esc}");
        cy.get('[data-testid="min-mapmethods"]').should("be.visible");
        cy.get('[data-testid="mapmethods"]').should("not.exist");
    });

    it("mapmethods is full width on small screen", () => {
        cy.viewport(550, 750);
        cy.get('[data-testid="min-mapmethods-button"]').click();
        cy.get('[data-testid="mapmethods"]')
            .should("be.visible")
            .should("have.css", "width")
            .and("match", /550px/);
    });
});

describe("Buttons and links", () => {
    beforeEach(() => {
        cy.visit("/");
        //Avaa mapmethods ennen jokaista testiä
        cy.get('[data-testid="min-mapmethods-button"]').click();
    });
    it("navigates to app info", () => {
        cy.get('[data-testid="info-link"]').should("exist");
        cy.get('[data-testid="info-link"]').click();
        cy.url().should("include", "/#/tietoa");
    });
    it("opens statbox", () => {
        cy.get('[data-testid="open-statbox-button"]').click();
        cy.get(".statbox").should("exist");
    });
});

describe("Tests for city filtering", () => {
    beforeEach(() => {
        cy.visit("/");
        //Avaa mapmethods ennen jokaista testiä
        cy.get('[data-testid="min-mapmethods-button"]').click();
    });

    it("input is empty and autofocused", () => {
        cy.get('[data-testid="city-input"]')
            .should("have.focus")
            .should("be.empty");
    });

    it("can type in input field", () => {
        cy.get('[data-testid="city-input"]').type("Tampere");
        cy.get('[data-testid="city-input"]').should("have.value", "Tampere");
    });

    it("input field filters cities", () => {
        cy.get('[data-testid="city-input"]').type("Tampere");
        cy.get("#cities > li")
            .should("have.length", 1)
            .should("have.text", "Tampere");
    });
    it("arrow keys navigate the list", () => {
        cy.get('[data-testid="city-input"]').type("{downArrow}");
        cy.get("#selected").should("have.text", "Tampere");
    });
    it("navigating with arrow keys follows the selected city", () => {
        for (let i = 0; i < 5; i++) {
            cy.get('[data-testid="city-input"]').type("{downArrow}");
        }
        cy.get("#selected").should("be.visible");
        cy.get("#cities li").first().should("not.be.visible");
    });
});

describe("Tests for task filtering", () => {
    beforeEach(() => {
        cy.visit("/");
        //Avaa mapmethods ennen jokaista testiä
        cy.get('[data-testid="min-mapmethods-button"]').click();
    });

    it("task list loads", () => {
        cy.get(".tasks").children().its("length").should("be.gt", 10);
    });

    it("selected tasks match the current page and update on navigation", () => {
        cy.get(".selected-task").should("have.text", "Harjaus");
        cy.visit("/#/auraus");
        cy.get('[data-testid="min-mapmethods-button"]').click();
        cy.get(".selected-task")
            .should("contain.text", "Auraus ja sohjonpoisto")
            .and("contain.text", "Sulamisveden haittojen torjunta")
            .and("contain.text", "Pinnan tasaus")
            .and("contain.text", "Lumivallien madaltaminen")
            .and("contain.text", "Paannejään poisto");
        cy.visit("/#/hiekoitus");
        cy.get('[data-testid="min-mapmethods-button"]').click();
        cy.get(".selected-task")
            .should("contain.text", "Linjahiekoitus")
            .and("contain.text", "Pistehiekoitus");
    });

    it("empty selection button empties selected tasks", () => {
        cy.get('[data-testid="empty-button"').click();
        cy.get(".selected-task").should("not.exist");
    });

    it("return default button returns default tasks", () => {
        cy.get('[data-testid="empty-button"').click();
        cy.get('[data-testid="default-button"').click();
        cy.get(".selected-task").should("have.text", "Harjaus");
    });

    it("empty filter request causes errror message", () => {
        cy.get('[data-testid="empty-button"').click();
        cy.get('[data-testid="filter-button"').click();
        cy.get('[data-testid="error-text"').should("be.visible");
    });

    //Only works if running non-local version
    // it("task filtering creates a network request with taskID", () => {
    //     cy.get("li").contains("Jyräys").click();
    //     cy.intercept(
    //         "GET",
    //         "https://tie.digitraffic.fi/api/maintenance/v1/tracking/routes*"
    //     ).as("test-request");
    //     cy.get('[data-testid="filter-button"').click();

    //     cy.wait("@test-request").then((interception) => {
    //         cy.log(interception);
    //         cy.expect(interception.request.query.taskId).contains(
    //             "COMPACTION_BY_ROLLING"
    //         );
    //     });
    // });
});
