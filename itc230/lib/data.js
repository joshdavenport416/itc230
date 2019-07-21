let cheeses = [
    { cheeseID: 1, cheeseName: 'Cheddar, medium', cheeseOzPackSize: 32, cheeseBrand: 'Tillamook', cheesePricePerOZ: 0.34 },
    { cheeseID: 2, cheeseName: 'Cheddar, sharp', cheeseOzPackSize: 32, cheeseBrand: 'Lucerne', cheesePricePerOZ: 0.28 },
    { cheeseID: 3, cheeseName: 'Cheddar, sharp', cheeseOzPackSize: 8, cheeseBrand: 'Tillamook', cheesePricePerOZ: 0.57 },
    { cheeseID: 4, cheeseName: 'Montery Jack', cheeseOzPackSize: 32, cheeseBrand: 'Lucerne', cheesePricePerOZ: 0.28 },
    { cheeseID: 5, cheeseName: 'Cheddar, medium', cheeseOzPackSize: 32, cheeseBrand: 'Lucerne', cheesePricePerOZ: 0.28 },
    { cheeseID: 6, cheeseName: 'Cheddar, xtra sharp', cheeseOzPackSize: 8, cheeseBrand: 'Lucerne', cheesePricePerOZ: 0.31 },
    { cheeseID: 7, cheeseName: 'Brie, soft-ripened', cheeseOzPackSize: 8, cheeseBrand: 'President', cheesePricePerOZ: 1.14 },
    { cheeseID: 8, cheeseName: 'Boursin, garlic & herb', cheeseOzPackSize: 5.2, cheeseBrand: 'Boursin', cheesePricePerOZ: 0.96 },
    { cheeseID: 9, cheeseName: 'Havarti', cheeseOzPackSize: 16, cheeseBrand: 'Primo Taglio', cheesePricePerOZ: 0.56 },
    { cheeseID: 10, cheeseName: 'Colby Jack', cheeseOzPackSize: 32, cheeseBrand: 'Lucerne', cheesePricePerOZ: 0.28 },
    { cheeseID: 11, cheeseName: 'Cheddar, aged', cheeseOzPackSize: 7, cheeseBrand: 'Kerrygold', cheesePricePerOZ: 0.98 },
    { cheeseID: 12, cheeseName: 'Pepperjack', cheeseOzPackSize: 8, cheeseBrand: 'Lucerne', cheesePricePerOZ: 0.31 },
    { cheeseID: 13, cheeseName: 'Goat Cheese', cheeseOzPackSize: 4, cheeseBrand: 'Primo Taglio', cheesePricePerOZ: 1.72 },
];

const getAll = () => {
    return cheeses;
}

const getItem = (cheeseName) => {
    return cheeses.find((cheese) => {
        return cheese.cheeseName == cheeseName;
    });
}

// const deleteItem = (cheeseName) => {
//     const found = cheeses.findIndex((cheese) => {
//         return cheese.cheeseName == cheeseName;
//     });
//     cheeses.splice(found, 1);
// }

const deleteItem = (cheeseName) => {
    let foundIndex = cheeses.findIndex((cheese) => {
        return cheese.cheeseName === cheeseName;
    });
    if (foundIndex > -1) {
        cheeses.splice(foundIndex, 1);
        return {deleted: true, count: cheeses.length};
    } else {
        return {deleted: false, count: cheeses.length};
    };
}




module.exports = { getAll, getItem, deleteItem }