const fs = require('fs');
const { faker } = require('@faker-js/faker');

const data = [];

for (let i = 1; i <= 1000; i++) {
    data.push({
        id: i,
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price({ min: 5, max: 500 })),
        description: faker.commerce.productDescription(),
        product: faker.commerce.product(),
        color: faker.color.human(),
        createdAt: faker.date.past().toISOString(),
        image: faker.image.url()
    });
}

fs.writeFileSync('products.json', JSON.stringify(data, null, 2), 'utf-8');

console.log('success.');
