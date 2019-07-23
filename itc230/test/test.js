const expect = require("chai").expect;
const cheeses = require("../lib/data.js");

describe('Cheese Get method', () => {
    it('returns requested cheese', () => {
        const result = cheeses.getItem("Pepperjack");
        expect(result).to.deep.equal({
            cheeseID: 12, 
            cheeseName: 'Pepperjack', 
            cheeseOzPackSize: 8, 
            cheeseBrand: 'Lucerne', 
            cheesePricePerOZ: 0.31});
    });

    it('fails w/ invalid cheese', () => {
        const result = cheeses.getItem('fake');
        expect(result).to.be.undefined;
    });
});

describe('Delete method', () => {
    it('removes requested cheese', () => {
        const result = cheeses.deleteItem("Pepperjack");
        expect(result.deleted).to.be.true;
    });

    it("fails to delete cheese if not present", () => {
        const result = cheeses.deleteItem('fake');
        expect(result.deleted).to.be.false;
    });
});

describe('Add method', () => {
    it('adds requested cheese', () => {
        const result = cheeses.addItem({ 
            cheeseID: 14, 
            cheeseName: 'Bald Eagle Cheeses', 
            cheeseOzPackSize: 15.5, 
            cheeseBrand: 'Ridgemont', 
            cheesePricePerOZ: 73.72});
        expect(result.added).to.be.true;
    });

    it('fails to add if cheese is already present', () => {
        const result = cheeses.addItem({ 
            cheeseID: 13, 
            cheeseName: 'Goat Cheese', 
            cheeseOzPackSize: 4, 
            cheeseBrand: 'Primo Taglio', 
            cheesePricePerOZ: 1.72});
        expect(result.added).to.be.false;
    });
});