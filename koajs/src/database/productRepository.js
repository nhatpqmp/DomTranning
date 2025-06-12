const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'products.json');

let products = require('./products.json');

function getAll() {
    return products;
}

function getOne(id) {
    return products.find(p => p.id === parseInt(id));
}

function add(data) {
    products.unshift(data);
    saveToFile();
}

function update(id, updatedData) {
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) throw new Error('Product not found');

    products[index] = { ...products[index], ...updatedData, id: parseInt(id) };
    saveToFile();
}

function remove(id) {
    products = products.filter(p => p.id !== parseInt(id));
    saveToFile();
}

function saveToFile() {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}

module.exports = {
    getAll,
    getOne,
    add,
    update,
    remove
};
