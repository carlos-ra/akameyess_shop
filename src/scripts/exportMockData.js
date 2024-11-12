import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Helper function to replace IDs with UUIDs
const generateUUID = () => uuidv4();
const mockProducts = [
    {
        id: generateUUID(),
        title: 'Demon Slayer Tanjiro Kamado Complete Uniform',
        // ... rest of the first product data
    },
    {
        id: generateUUID(),
        title: 'Genshin Impact Raiden Shogun Full Set',
        // ... rest of the second product data
    },
    // ... rest of the products with UUID for each id
];
// Transform the data to convert field names and images array
const transformedProducts = mockProducts.map(product => {
    const { subCategory, aliExpressLink, images, ...rest } = product;
    // Convert images array to object with numeric keys
    const imagesObject = images.reduce((acc, url, index) => ({
        ...acc,
        [index]: url
    }), {});
    // Return transformed product with snake_case fields
    return {
        ...rest,
        sub_category: subCategory,
        ali_express_link: aliExpressLink,
        images: imagesObject
    };
});
// Write JSON file
fs.writeFileSync(path.join(__dirname, 'mockProducts.json'), JSON.stringify(transformedProducts, null, 2));
// Write CSV file
const headers = Object.keys(transformedProducts[0]).join(',');
const rows = transformedProducts.map(product => {
    const values = Object.keys(product).map(key => {
        const value = product[key];
        if (key === 'images') {
            // Convert images object to string
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
        }
        return typeof value === 'string' ? `"${value}"` : value;
    });
    return values.join(',');
});
const csv = [headers, ...rows].join('\n');
fs.writeFileSync(path.join(__dirname, 'mockProducts.csv'), csv);
console.log('Mock data exported successfully in both JSON and CSV formats!');
