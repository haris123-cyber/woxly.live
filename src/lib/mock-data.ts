import { type Product } from "@/store/useCartStore";

export const CATEGORIES = [
  { id: '1', name: 'Grocery', slug: 'grocery', icon: 'ShoppingBasket' },
  { id: '2', name: 'Fruits & Veg', slug: 'fruits-veg', icon: 'Apple' },
  { id: '3', name: 'Dairy & Eggs', slug: 'dairy-eggs', icon: 'Milk' },
  { id: '4', name: 'Beverages', slug: 'beverages', icon: 'CupSoda' },
  { id: '5', name: 'Snacks', slug: 'snacks', icon: 'Cookie' },
  { id: '6', name: 'Fashion', slug: 'fashion', icon: 'Shirt' },
  { id: '7', name: 'Beauty', slug: 'beauty', icon: 'Sparkles' },
  { id: '8', name: 'Electronics', slug: 'electronics', icon: 'Smartphone' },
  { id: '9', name: 'Home Care', slug: 'home-care', icon: 'Home' },
  { id: '10', name: 'Liquor', slug: 'liquor', icon: 'Wine' },
  { id: '11', name: 'Stationery', slug: 'stationery', icon: 'PenTool' },
  { id: '12', name: 'More', slug: 'more', icon: 'MoreHorizontal' },
  { id: '13', name: 'Meat & Seafood', slug: 'meat-seafood', icon: 'Beef' },
];

export const PRODUCTS: Product[] = [
  // GROCERY
  {
    id: '1', name: 'Quaker Oats 1kg', slug: 'quaker-oats-1kg', price: 229, originalPrice: 269,
    image: '/images/grocery/Quaker_Oats.jpeg',
    images: ['/images/grocery/Quaker_Oats (2).jpeg'],
    category: 'Grocery', brand: 'Quaker', rating: 4.6, reviews: 4, description: 'Healthy and nutritious oats.', inStock: true,
    isSale: true, isHotSale: true, hasOffer: true
  },
  {
    id: '2', name: 'India Gate Rice 1kg', slug: 'india-gate-rice-1kg', price: 249,
    image: '/images/grocery/India_Gate_Rice.jpeg',
    images: ['/images/grocery/India_Gate_Rice (2).jpeg'],
    category: 'Grocery', brand: 'India Gate', rating: 4.6, reviews: 4, description: 'Premium quality basmati rice.', inStock: true
  },
  {
    id: '3', name: 'Whole Wheat Pasta 500g', slug: 'whole-wheat-pasta', price: 149,
    image: '/images/grocery/Whole_wheat_past.jpeg',
    images: ['/images/grocery/Whole_wheat_pasta.jpeg'],
    category: 'Grocery', brand: 'Barilla', rating: 4.5, reviews: 4, description: 'Healthy whole wheat penne pasta.', inStock: true
  },
  {
    id: '4', name: 'Extra Virgin Olive Oil 500ml', slug: 'olive-oil-500ml', price: 509, originalPrice: 629,
    image: '/images/grocery/Olive_oil_bottles.jpeg',
    images: ['/images/grocery/Four_olive_oil_bottles.jpeg'],
    category: 'Grocery', brand: 'Filippo Berio', rating: 4.8, reviews: 4, description: 'Premium cold pressed olive oil.', inStock: true,
    isNewArrived: true, isLimited: true, hasOffer: true
  },

  // FRUITS & VEG
  {
    id: '5', name: 'Fresh Bananas 1kg', slug: 'fresh-bananas-1kg', price: 99,
    image: '/images/veg/Bananas_product_.jpeg',
    category: 'Fruits & Veg', brand: 'Fresh Farm', rating: 4.6, reviews: 4, description: 'Fresh and organic bananas.', inStock: true
  },
  {
    id: '6', name: 'Green Apples 1kg', slug: 'green-apples-1kg', price: 269,
    image: '/images/veg/Green_apples.jpeg',
    category: 'Fruits & Veg', brand: 'Fresh Farm', rating: 4.8, reviews: 4, description: 'Crisp and juicy green apples.', inStock: true
  },
  {
    id: '7', name: 'Fresh Strawberries 500g', slug: 'fresh-strawberries-500g', price: 389,
    image: '/images/veg/Fresh_strawberries.jpeg',
    category: 'Fruits & Veg', brand: 'Berry Farm', rating: 4.9, reviews: 4, description: 'Sweet and fresh strawberries.', inStock: true
  },
  {
    id: '8', name: 'Fresh Avocados (Pack of 3)', slug: 'fresh-avocados', price: 309, originalPrice: 399,
    image: '/images/veg/Fresh_avocados.jpeg',
    category: 'Fruits & Veg', brand: 'Fresh Farm', rating: 4.7, reviews: 4, description: 'Ripe and ready to eat avocados.', inStock: true,
    isSale: true, hasOffer: true
  },

  // DAIRY & EGGS
  {
    id: '9', name: 'Amul Fresh Milk 1L', slug: 'amul-fresh-milk-1l', price: 109,
    image: '/images/DAIRY & EGGS/amul_fresh_milk_1789022080468.jpg',
    category: 'Dairy & Eggs', brand: 'Amul', rating: 4.7, reviews: 4, description: 'Pasteurized fresh milk.', inStock: true
  },
  {
    id: '10', name: 'Farm Fresh Eggs (12 pack)', slug: 'farm-fresh-eggs', price: 309,
    image: '/images/DAIRY & EGGS/farm_fresh_eggs_1789022099897.jpg',
    category: 'Dairy & Eggs', brand: 'Farm Valley', rating: 4.8, reviews: 4, description: 'Organic free range eggs.', inStock: true
  },
  {
    id: '11', name: 'Cheddar Cheese Block 250g', slug: 'cheddar-cheese', price: 349,
    image: '/images/DAIRY & EGGS/cheddar_cheese_block_1789022122231.jpg',
    category: 'Dairy & Eggs', brand: 'Kraft', rating: 4.6, reviews: 4, description: 'Sharp and aged cheddar cheese.', inStock: true
  },
  {
    id: '12', name: 'Greek Yogurt 500g', slug: 'greek-yogurt', price: 259,
    image: '/images/DAIRY & EGGS/Greek_yogurt_product_photography_20260910121334.jpeg',
    category: 'Dairy & Eggs', brand: 'Chobani', rating: 4.8, reviews: 4, description: 'Thick and creamy greek yogurt.', inStock: true
  },

  // BEVERAGES
  {
    id: '13', name: 'Coca-Cola Soft Drink 1.5L', slug: 'coca-cola-1-5l', price: 139, originalPrice: 159,
    image: '/images/DAIRY & EGGS/Coca-Cola_bottle_in_studio_20260910121358.jpeg',
    category: 'Beverages', brand: 'Coca-Cola', rating: 4.5, reviews: 4, description: 'Refreshing carbonated beverage.', inStock: true, hasOffer: true
  },
  {
    id: '14', name: 'Fresh Orange Juice 1L', slug: 'orange-juice-1l', price: 189,
    image: '/images/DAIRY & EGGS/Orange_juice_carton_on_background_20260910121403.jpeg',
    category: 'Beverages', brand: 'Tropicana', rating: 4.5, reviews: 4, description: '100% natural orange juice.', inStock: true
  },
  {
    id: '15', name: 'Pure Spring Water 6-pack', slug: 'spring-water-6pack', price: 389,
    image: '/images/DAIRY & EGGS/Pure_Spring_Water_6-pack_20260910121409.jpeg',
    category: 'Beverages', brand: 'Evian', rating: 4.7, reviews: 4, description: 'Natural spring water.', inStock: true
  },
  {
    id: '16', name: 'Green Tea Bags (50 pack)', slug: 'green-tea-bags', price: 309,
    image: '/images/liquor/Green_tea_bags_product_photography_20260910174221.jpeg',
    images: ['/images/liquor/Green_tea_bags_product_photography_20260910174225.jpeg'],
    category: 'Beverages', brand: 'Lipton', rating: 4.6, reviews: 4, description: 'Antioxidant rich green tea.', inStock: true
  },

  // SNACKS
  {
    id: '17', name: 'Classic Potato Chips', slug: 'classic-potato-chips', price: 149, originalPrice: 199,
    image: '/images/snacks/Potato_chips_product_photography_20260910123202.jpeg',
    images: ['/images/snacks/Potato_chips_product_photography_20260910123233.jpeg'],
    category: 'Snacks', brand: 'Lays', rating: 4.4, reviews: 4, description: 'Crispy salted potato chips.', inStock: true, hasOffer: true
  },
  {
    id: '18', name: 'Mixed Nuts 200g', slug: 'mixed-nuts', price: 429,
    image: '/images/snacks/Mixed_nuts_product_photography_20260910123211.jpeg',
    images: ['/images/snacks/Mixed_nuts_product_photography_20260910123238.jpeg'],
    category: 'Snacks', brand: 'Planters', rating: 4.8, reviews: 4, description: 'Healthy roasted mixed nuts.', inStock: true
  },
  {
    id: '19', name: 'Dark Chocolate Bar', slug: 'dark-chocolate', price: 189,
    image: '/images/snacks/Dark_chocolate_bar_product_photo…_20260910123217.jpeg',
    images: ['/images/snacks/Dark_chocolate_bar_photography_20260910123222.jpeg'],
    category: 'Snacks', brand: 'Lindt', rating: 4.9, reviews: 4, description: '70% cocoa dark chocolate.', inStock: true
  },
  {
    id: '20', name: 'Caramel Popcorn', slug: 'caramel-popcorn', price: 269,
    image: '/images/snacks/Caramel_popcorn_product_photography_20260910123226.jpeg',
    images: ['/images/snacks/Caramel_popcorn_product_photography_20260910123230.jpeg'],
    category: 'Snacks', brand: 'Kernel', rating: 4.7, reviews: 4, description: 'Sweet and crunchy caramel popcorn.', inStock: true
  },

  // FASHION
  {
    id: '21', name: 'Brown Leather Handbag', slug: 'brown-handbag', price: 3189, originalPrice: 4299,
    image: '/images/fashion/Brown_leather_handbag.jpeg',
    images: ['/images/fashion/Brown_leather_handbag.jpeg'],
    category: 'Fashion', brand: 'FashionBrand', rating: 4.6, reviews: 4, description: 'Stylish brown leather handbag.', inStock: true, hasOffer: true
  },
  {
    id: '22', name: 'Nike Running Shoes', slug: 'nike-running-shoes', price: 5589,
    image: '/images/fashion/Running_shoes.jpeg',
    images: ['/images/fashion/Running_shoes.jpeg'],
    category: 'Fashion', brand: 'Nike', rating: 4.7, reviews: 4, description: 'Comfortable running shoes.', sizes: ['8', '9', '10', '11'], inStock: true
  },
  {
    id: '23', name: 'Classic Analog Watch', slug: 'classic-watch', price: 3989,
    image: '/images/fashion/Classic_analog_watch.jpeg',
    images: ['/images/fashion/Classic_analog_watch (2).jpeg'],
    category: 'Fashion', brand: 'Timeless', rating: 4.6, reviews: 4, description: 'Classic analog watch.', inStock: true
  },
  {
    id: '24', name: 'Denim Jacket', slug: 'denim-jacket', price: 4789,
    image: '/images/fashion/Denim_jacket_product.jpeg',
    images: ['/images/fashion/Denim_jacket_product (2).jpeg'],
    category: 'Fashion', brand: 'Levi', rating: 4.8, reviews: 4, description: 'Classic blue denim jacket.', sizes: ['S', 'M', 'L', 'XL'], inStock: true
  },

  // BEAUTY
  {
    id: '25', name: 'Luxury Perfume 50ml', slug: 'luxury-perfume-50ml', price: 7189,
    image: '/images/beauty/Luxury_perfume_product_photography_20260910124345.jpeg',
    images: ['/images/beauty/Luxury_perfume_bottle_on_background_20260910124349.jpeg'],
    category: 'Beauty', brand: 'Chanel', rating: 4.7, reviews: 4, description: 'Elegant and long lasting fragrance.', inStock: true
  },
  {
    id: '26', name: 'Moisturizing Face Cream', slug: 'face-cream', price: 1989,
    image: '/images/beauty/Moisturizing_Face_Cream_photogra…_20260910124353.jpeg',
    category: 'Beauty', brand: 'Olay', rating: 4.5, reviews: 4, description: 'Hydrating day cream.', inStock: true
  },
  {
    id: '27', name: 'Matte Red Lipstick', slug: 'matte-lipstick', price: 1189,
    image: '/images/beauty/Red_lipstick_product_photography_20260910124357.jpeg',
    images: ['/images/beauty/Matte_Red_Lipstick_Product_Photo…_20260910124400.jpeg'],
    category: 'Beauty', brand: 'MAC', rating: 4.8, reviews: 4, description: 'Long-lasting matte lipstick.', inStock: true
  },
  {
    id: '28', name: 'Vitamin C Serum', slug: 'vitamin-c-serum', price: 2389,
    image: '/images/beauty/Vitamin_C_serum_product_photography_20260910124403.jpeg',
    images: ['/images/beauty/Vitamin_C_serum_product_photography_20260910124406.jpeg'],
    category: 'Beauty', brand: 'Ordinary', rating: 4.9, reviews: 4, description: 'Brightening vitamin C skin serum.', inStock: true
  },

  // ELECTRONICS
  {
    id: '29', name: 'Sony Wireless Headphones', slug: 'sony-wireless-headphones', price: 15989,
    image: '/images/electronics/Sony_Wireless_Headphones_photogr…_20260910125050.jpeg',
    images: ['/images/electronics/Sony_Wireless_Headphones_product…_20260910125055.jpeg'],
    category: 'Electronics', brand: 'Sony', rating: 4.9, reviews: 4, description: 'Noise cancelling over-ear headphones.', colors: ['Black', 'Silver'], inStock: true
  },
  {
    id: '30', name: 'Smart Phone Pro', slug: 'smart-phone-pro', price: 71989,
    image: '/images/electronics/Smartphone_product_photography_20260910125059.jpeg',
    images: ['/images/electronics/Smart_Phone_Pro_product_photography_20260910125103.jpeg'],
    category: 'Electronics', brand: 'TechBrand', rating: 4.8, reviews: 4, description: 'Latest generation smartphone.', colors: ['Silver', 'Black'], inStock: true
  },
  {
    id: '31', name: '10-inch Tablet', slug: '10-inch-tablet', price: 27989,
    image: '/images/electronics/Tablet_product_photography_20260910125113.jpeg',
    images: ['/images/electronics/Tablet_product_photography_studi…_20260910125117.jpeg'],
    category: 'Electronics', brand: 'TechBrand', rating: 4.6, reviews: 4, description: 'Powerful tablet for work and play.', inStock: true
  },
  {
    id: '32', name: 'Smart Watch Series 5', slug: 'smart-watch', price: 19989,
    image: '/images/electronics/Smart_Watch_product_photography_20260910125146.jpeg',
    images: ['/images/electronics/Smart_Watch_Series_5_photography_20260910125149.jpeg'],
    category: 'Electronics', brand: 'TechBrand', rating: 4.7, reviews: 4, description: 'Fitness and health tracking smartwatch.', inStock: true
  },

  // HOME CARE
  {
    id: '33', name: 'Laundry Detergent Pods', slug: 'laundry-pods', price: 1029,
    image: '/images/home care/Laundry_detergent_pods_photographed_20260910153827.jpeg',
    images: ['/images/home care/Laundry_detergent_pods_product_p…_20260910153831.jpeg'],
    category: 'Home Care', brand: 'Tide', rating: 4.7, reviews: 4, description: 'Stain removing laundry pods.', inStock: true
  },
  {
    id: '34', name: 'Dishwashing Liquid', slug: 'dishwashing-liquid', price: 389,
    image: '/images/home care/Dishwashing_liquid_product_photo…_20260910153834.jpeg',
    images: ['/images/home care/Dishwashing_liquid_product_photo…_20260910153837.jpeg'],
    category: 'Home Care', brand: 'Dawn', rating: 4.8, reviews: 4, description: 'Grease cutting dish soap.', inStock: true
  },
  {
    id: '35', name: 'Glass Cleaner Spray', slug: 'glass-cleaner', price: 309,
    image: '/images/home care/Glass_cleaner_spray_product_phot…_20260910153845.jpeg',
    images: ['/images/home care/Glass_cleaner_spray_product_phot…_20260910153847.jpeg'],
    category: 'Home Care', brand: 'Windex', rating: 4.5, reviews: 4, description: 'Streak-free window cleaner.', inStock: true
  },
  {
    id: '36', name: 'Paper Towels (6 Rolls)', slug: 'paper-towels', price: 789,
    image: '/images/home care/Paper_towels_product_photography_20260910153950.jpeg',
    images: ['/images/home care/Paper_towels_in_studio_20260910153952.jpeg'],
    category: 'Home Care', brand: 'Bounty', rating: 4.9, reviews: 4, description: 'Ultra absorbent paper towels.', inStock: true
  },

  // LIQUOR
  {
    id: '37', name: 'Cabernet Red Wine 750ml', slug: 'red-wine', price: 1189,
    image: '/images/liquor/Cabernet_red_wine_bottle_photogr…_20260910154409.jpeg',
    category: 'Liquor', brand: 'Vineyard', rating: 4.6, reviews: 4, description: 'Rich and bold red wine.', inStock: true
  },
  {
    id: '38', name: 'Craft Beer 6-pack', slug: 'craft-beer', price: 949,
    image: '/images/liquor/Craft_beer_pack_studio_photography_20260910154413.jpeg',
    images: ['/images/liquor/Craft_beer_pack_photography_20260910154416.jpeg'],
    category: 'Liquor', brand: 'Brewery', rating: 4.7, reviews: 4, description: 'Locally brewed craft IPA.', inStock: true
  },
  {
    id: '39', name: 'Aged Whiskey 700ml', slug: 'whiskey', price: 3669,
    image: '/images/liquor/Aged_whiskey_bottles_on_display_20260910154420.jpeg',
    images: ['/images/liquor/Four_bottles_of_whiskey_20260910154424.jpeg'],
    category: 'Liquor', brand: 'Distillery', rating: 4.9, reviews: 4, description: '12-year aged premium whiskey.', inStock: true
  },
  {
    id: '40', name: 'Premium Vodka 750ml', slug: 'vodka', price: 2389,
    image: '/images/liquor/Vodka_bottles_on_studio_background_20260910154513.jpeg',
    images: ['/images/liquor/Vodka_bottles_on_studio_background_20260910154516.jpeg'],
    category: 'Liquor', brand: 'Distillery', rating: 4.5, reviews: 4, description: 'Smooth and triple distilled vodka.', inStock: true
  },

  // MORE
  {
    id: '41', name: 'Hardcover Notebook', slug: 'notebook', price: 709,
    image: '/images/more/Hardcover_notebook_product_photo…_20260910155010.jpeg',
    images: ['/images/more/Hardcover_notebook_product_photo…_20260910155014.jpeg'],
    category: 'Stationery', brand: 'PaperCraft', rating: 4.7, reviews: 4, description: 'Ruled pages hardcover notebook.', inStock: true
  },
  {
    id: '67', name: 'Premium Ballpoint Pens (Pack of 5)', slug: 'ballpoint-pens', price: 299,
    image: '/images/more/Ballpoint_pens_product_photography_20260910155021.jpeg',
    images: ['/images/more/Ballpoint_pens_displayed_for_sale_20260910155018.jpeg'],
    category: 'Stationery', brand: 'Parker', rating: 4.8, reviews: 4, description: 'Smooth writing ballpoint pens.', inStock: true
  },
  {
    id: '68', name: 'Desk Organizer', slug: 'desk-organizer', price: 899,
    image: '/images/more/Desk_organizer_product_photography_20260910155025.jpeg',
    images: ['/images/more/Desk_organizer_product_photography_20260910155028.jpeg'],
    category: 'Stationery', brand: 'OfficePro', rating: 4.6, reviews: 4, description: 'Multifunctional wooden desk organizer.', inStock: true
  },
  {
    id: '69', name: 'Sticky Notes Set', slug: 'sticky-notes', price: 149,
    image: '/images/more/sticky_notes_set.jpg',
    category: 'Stationery', brand: 'PostIt', rating: 4.9, reviews: 4, description: 'Colorful sticky notes for reminders.', inStock: true
  },
  {
    id: '42', name: 'Yoga Mat', slug: 'yoga-mat', price: 1589,
    image: '/images/more/Yoga_mat_product_photography_20260910155031.jpeg',
    images: ['/images/more/Yoga_mat_product_photography_20260910155035.jpeg'],
    category: 'More', brand: 'Fitness', rating: 4.8, reviews: 4, description: 'Non-slip exercise yoga mat.', inStock: true
  },

  // NEW GROCERY
  {
    id: '45', name: 'Organic Lentils 1kg', slug: 'organic-lentils', price: 339,
    image: '/images/grocery/Organic_lentils.jpeg',
    images: ['/images/grocery/Organic_lentils (2).jpeg'],
    category: 'Grocery', brand: 'NatureFarm', rating: 4.5, reviews: 4, description: 'High protein organic lentils.', inStock: true
  },
  {
    id: '46', name: 'Tomato Pasta Sauce', slug: 'tomato-sauce', price: 229,
    image: '/images/grocery/Tomato_pasta_sauce.jpeg',
    images: ['/images/grocery/Tomato_pasta_sauce.jpeg'],
    category: 'Grocery', brand: 'Barilla', rating: 4.7, reviews: 4, description: 'Rich tomato and basil pasta sauce.', inStock: true
  },

  // NEW FRUITS & VEG
  {
    id: '47', name: 'Fresh Oranges 1kg', slug: 'fresh-oranges', price: 189,
    image: '/images/veg/Oranges_on_studio.jpeg',
    images: ['/images/veg/Oranges_on_studio.jpeg'],
    category: 'Fruits & Veg', brand: 'Fresh Farm', rating: 4.8, reviews: 4, description: 'Juicy and sweet fresh oranges.', inStock: true
  },
  {
    id: '48', name: 'Organic Broccoli 500g', slug: 'organic-broccoli', price: 149,
    image: '/images/veg/Organic_broccoli.jpeg',
    images: ['/images/veg/Organic_broccoli_2.jpg'],
    category: 'Fruits & Veg', brand: 'Fresh Farm', rating: 4.6, reviews: 4, description: 'Fresh organic green broccoli.', inStock: true
  },

  // NEW DAIRY & EGGS
  {
    id: '49', name: 'Salted Butter 250g', slug: 'salted-butter', price: 269,
    image: '/images/DAIRY & EGGS/Cream_Cheese_product_photography_20260910155248.jpeg',
    images: ['/images/DAIRY & EGGS/Cream_cheese_product_photography_20260910155252.jpeg'],
    category: 'Dairy & Eggs', brand: 'Amul', rating: 4.9, reviews: 4, description: 'Creamy and rich salted butter.', inStock: true
  },
  {
    id: '50', name: 'Cream Cheese 200g', slug: 'cream-cheese', price: 229,
    image: '/images/DAIRY & EGGS/Salted_butter_product_photography_20260910155220.jpeg',
    images: ['/images/DAIRY & EGGS/Salted_butter_product_photography_20260910155223.jpeg'],
    category: 'Dairy & Eggs', brand: 'Philadelphia', rating: 4.8, reviews: 4, description: 'Smooth and spreadable cream cheese.', inStock: true
  },

  // NEW BEVERAGES
  {
    id: '51', name: 'Peach Iced Tea 1L', slug: 'peach-iced-tea', price: 169,
    image: '/images/liquor/Peach_Iced_Tea_product_photography_20260910155708.jpeg',
    images: ['/images/liquor/Peach_iced_tea_product_photography_20260910155712.jpeg'],
    category: 'Beverages', brand: 'Lipton', rating: 4.5, reviews: 4, description: 'Refreshing peach flavored iced tea.', inStock: true
  },
  {
    id: '52', name: 'Energy Drink 250ml', slug: 'energy-drink', price: 149,
    image: '/images/liquor/Energy_drink_product_photography_20260910155912.jpeg',
    images: ['/images/liquor/Energy_drink_product_photography_20260910155915.jpeg'],
    category: 'Beverages', brand: 'Red Bull', rating: 4.7, reviews: 4, description: 'Vitalizing energy drink.', inStock: true
  },


  // NEW FASHION
  {
    id: '55', name: 'Polarized Sunglasses', slug: 'polarized-sunglasses', price: 2389,
    image: '/images/fashion/Polarized_sunglasses.jpeg',
    images: ['/images/fashion/Polarized_sunglasses (2).jpeg'],
    category: 'Fashion', brand: 'RayBan', rating: 4.8, reviews: 4, description: 'Stylish polarized sunglasses with UV protection.', inStock: true
  },
  {
    id: '56', name: 'Winter Wool Scarf', slug: 'wool-scarf', price: 1589,
    image: '/images/fashion/Winter_wool_scar.jpeg',
    images: ['/images/fashion/Winter_wool_scar.jpeg'],
    category: 'Fashion', brand: 'FashionBrand', rating: 4.7, reviews: 4, description: 'Warm and cozy winter scarf.', inStock: true
  },




  // MEAT & SEAFOOD
  {
    id: '70', name: 'Fresh Chicken Breast 500g', slug: 'chicken-breast', price: 249,
    image: '/images/meat&seafood/Chicken_breast_on_studio_background_20260910165310.jpeg',
    images: ['/images/meat&seafood/Fresh_chicken_breast_product_pho…_20260910165306.jpeg'],
    category: 'Meat & Seafood', brand: 'Fresh Farm', rating: 4.8, reviews: 4, description: 'Tender and juicy chicken breast.', inStock: true
  },
  {
    id: '71', name: 'Premium Atlantic Salmon 300g', slug: 'atlantic-salmon', price: 599, originalPrice: 699,
    image: '/images/meat&seafood/Atlantic_Salmon_product_photography_20260910165654.jpeg',
    images: ['/images/meat&seafood/Salmon_product_photography_20260910165650.jpeg'],
    category: 'Meat & Seafood', brand: 'Ocean Catch', rating: 4.9, reviews: 4, description: 'Freshly caught atlantic salmon.', inStock: true, hasOffer: true
  },
  {
    id: '72', name: 'Mutton Curry Cut 500g', slug: 'mutton-curry-cut', price: 649,
    image: '/images/meat&seafood/Mutton_Curry_Cut_product_photogr…_20260910165657.jpeg',
    images: ['/images/meat&seafood/Mutton_curry_cut_product_photogr…_20260910165700.jpeg'],
    category: 'Meat & Seafood', brand: 'Fresh Farm', rating: 4.7, reviews: 4, description: 'Premium quality mutton for curries.', inStock: true
  },
  {
    id: '73', name: 'Peeled Prawns 250g', slug: 'peeled-prawns', price: 349,
    image: '/images/meat&seafood/Peeled_prawns_product_photography_20260910165703.jpeg',
    images: ['/images/meat&seafood/Peeled_prawns_product_photography_20260910165706.jpeg'],
    category: 'Meat & Seafood', brand: 'Ocean Catch', rating: 4.6, reviews: 4, description: 'Freshly peeled medium prawns.', inStock: true
  }
];

