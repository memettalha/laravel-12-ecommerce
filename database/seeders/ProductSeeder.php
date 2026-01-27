<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Product::create([
    'name' => 'Kablosuz Kulaklık',
    'description' => 'Gürültü engelleyici özellikli, 20 saat pil ömrü.',
    'price' => 1250.00,
    'stock' => 50,
    'category' => 'Elektronik',
    'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
]);

Product::create([
    'name' => 'Akıllı Saat',
    'description' => 'Suya dayanıklı, kalp ritmi ölçer.',
    'price' => 3200.00,
    'stock' => 20,
    'category' => 'Aksesuar',
    'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
]);
    }
}
