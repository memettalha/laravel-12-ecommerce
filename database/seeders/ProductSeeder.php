<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product; // Modelin burada olduğundan emin ol

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Ürün
        Product::create([
            'name' => 'Kablosuz Kulaklık',
            'description' => 'Gürültü engelleyici özellikli, 20 saat pil ömrü.',
            'price' => 1250.00,
            'stock' => 50,
            'category' => 'Elektronik',
            'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
        ]);

        // 2. Ürün
        Product::create([
            'name' => 'Akıllı Saat',
            'description' => 'Suya dayanıklı, kalp ritmi ölçer.',
            'price' => 3200.00,
            'stock' => 20,
            'category' => 'Aksesuar',
            'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
        ]);

        // 3. Ürün
        Product::create([
            'name' => 'Mekanik Klavye',
            'description' => 'RGB aydınlatmalı, sessiz switchli oyuncu klavyesi.',
            'price' => 1850.00,
            'stock' => 20,
            'category' => 'Elektronik',
            'image' => 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500'
        ]);

        // 4. Ürün
        Product::create([
            'name' => 'Filtre Kahve Makinesi',
            'description' => 'Zaman ayarlı, geniş hazneli otomatik kahve makinesi.',
            'price' => 3200.00,
            'stock' => 10,
            'category' => 'Mutfak',
            'image' => 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500'
        ]);

        // 5. Ürün
        Product::create([
            'name' => 'Laptop Standı',
            'description' => 'Alüminyum alaşımlı, ayarlanabilir ergonomik laptop standı.',
            'price' => 450.00,
            'stock' => 100,
            'category' => 'Aksesuar',
            'image' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'
        ]);

        // 6. Ürün
        Product::create([
            'name' => 'Bluetooth Hoparlör',
            'description' => 'Derin bas etkili, 12 saat pil ömürlü taşınabilir hoparlör.',
            'price' => 950.00,
            'stock' => 40,
            'category' => 'Elektronik',
            'image' => 'https://images.unsplash.com/photo-1608156639585-34a0a56ee6c9?w=500'
        ]);

        // 7. Ürün
        Product::create([
            'name' => 'Sırt Çantası',
            'description' => 'Su itici kumaş, 15.6 inç laptop uyumlu şehir çantası.',
            'price' => 800.00,
            'stock' => 60,
            'category' => 'Moda',
            'image' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
        ]);

        // 8. Ürün
        Product::create([
            'name' => 'Çalışma Lambası',
            'description' => 'Dokunmatik kontrol, 3 farklı renk modu özellikli LED lamba.',
            'price' => 350.00,
            'stock' => 25,
            'category' => 'Ev Yaşam',
            'image' => 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500'
        ]);

        // 9. Ürün
        Product::create([
            'name' => 'Gaming Mouse',
            'description' => '16000 DPI, programlanabilir tuşlu profesyonel mouse.',
            'price' => 1100.00,
            'stock' => 15,
            'category' => 'Elektronik',
            'image' => 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500'
        ]);

        // 10. Ürün
        Product::create([
            'name' => 'Termos',
            'description' => '12 saat sıcak/soğuk tutma özellikli paslanmaz çelik termos.',
            'price' => 600.00,
            'stock' => 80,
            'category' => 'Mutfak',
            'image' => 'https://images.unsplash.com/photo-1517254456976-ee8682099819?w=500'
        ]);
    }
}