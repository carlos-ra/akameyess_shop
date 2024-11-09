import { supabase } from '../config/supabase';

// Your mock data
const mockProducts = [
  {
    id: '1',
    title: 'Genshin Impact Hutao Cosplay',
    description: 'Complete Hutao costume including hat and accessories',
    price: 89.99,
    images: [
      'https://example.com/hutao1.jpg',
      'https://example.com/hutao2.jpg'
    ],
    category: 'cosplay',
    rating: 4.8,
    reviews: 125,
    featured: true,
    stock: 50
  },
  // ... add all your mock products here
];

async function migrateProducts() {
  console.log('Starting migration...');

  for (const product of mockProducts) {
    const { data, error } = await supabase
      .from('products')
      .upsert(product, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      });

    if (error) {
      console.error(`Error inserting product ${product.id}:`, error);
    } else {
      console.log(`Successfully inserted product ${product.id}`);
    }
  }

  console.log('Migration completed!');
}

// Run the migration
migrateProducts().catch(console.error); 