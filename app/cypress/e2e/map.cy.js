/* eslint-disable cypress/no-unnecessary-waiting */
describe("map loads", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("leaflet container loads", () => {
        cy.get(".leaflet-container").should("be.visible");
    });

    it("map controls are visible", () => {
        cy.get(".leaflet-control-zoom").should("be.visible");
    });

    it("map viewport scales with screensize", () => {
        cy.viewport(550, 750);
        cy.get(".leaflet-container")
            .should("be.visible")
            .should("have.css", "width")
            .and("match", /550px/);
        cy.get(".leaflet-container")
            .should("have.css", "height")
            .and("match", /750px/);
    });
});

describe("map controls", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("zoom in becomes disabled when fully zoomed in", () => {
        cy.get(".leaflet-control-zoom-in").as("button");
        //scrollBehavior: "center" tai kontrollit ovat bannerin takana
        for (let n = 0; n < 15; n++) {
            cy.get("@button").click({ scrollBehavior: "center" });
            cy.wait(100);
        }
        cy.get("@button").should("have.attr", "aria-disabled", "true");
    });

    it("zoom out becomes disabled when fully zoomed out", () => {
        cy.wait(500);
        for (let n = 0; n < 15; n++) {
            cy.get(".leaflet-container").trigger("wheel", {
                deltaY: 120,
                wheelDelta: -120,
                wheelDeltaX: 0,
                wheelDeltaY: -120,
                bubbles: true,
            });
            cy.wait(500);
        }
        cy.get(".leaflet-control-zoom-out").should(
            "have.attr",
            "aria-disabled",
            "true",
        );
    });

    it("locate user requests location access", () => {
        cy.get(".easy-button-container button").click({
            scrollBehavior: "center",
        });
        //Cypress ei käytä sijaintia
        cy.on("window:alert", (t) => {
            expect(t).to.contains(
                "Käyttäjän paikantaminen vaatii sijainnin jakamisen.",
            );
        });
    });
});

describe("map dragging", () => {
    beforeEach(() => {
        cy.visit("/");
    });
    it("drags", () => {
        cy.wait(1000);
        cy.get(".leaflet-touch").dragMapFromCenter({
            // Go 1/6 of map container width to the right (negative direction)
            xMoveFactor: -1 / 6,
            // Go 1/3 of map container height to the top (positive direction)
            yMoveFactor: 1 / 3,
        });
        // We need to wait for something to happen after map starts moving
        cy.get(".leaflet-dragging");
    });
});

describe("routes and vehicles", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("draws paths (over 500 in test data)", () => {
        cy.wait(500);
        cy.get(".leaflet-interactive").should("have.length.greaterThan", 500);
    });

    it("draws vehicles (2 vehicles in test data)", () => {
        cy.wait(500);
        cy.get(".leaflet-marker-icon").should("have.length", 2);
    });

    it("clicking a vehicle opens popup", () => {
        cy.get(".leaflet-marker-icon")
            .last()
            .wait(500)
            .click({ scrollBehavior: "center" });
        //Ajoneuvon ID popupissa
        cy.get(".leaflet-popup-content").should("contain.text", "99483754");
    });

    it("can close vehicle popup", () => {
        cy.get(".leaflet-marker-icon")
            .last()
            .wait(500)
            .click({ scrollBehavior: "center" });
        cy.get(".leaflet-popup-close-button").click({
            scrollBehavior: "center",
        });
        cy.get(".leaflet-popup-content").should("not.exist");
    });

    it("hovering a route opens popup", () => {
        cy.get("g>.leaflet-interactive").eq(21).wait(500).trigger("mouseover", {
            scrollBehavior: "center",
            force: true,
        });
        cy.get(".leaflet-tooltip-pane").children();
    });
});
