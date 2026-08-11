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
  { id: '11', name: 'More', slug: 'more', icon: 'MoreHorizontal' },
];

export const PRODUCTS: Product[] = [
  // GROCERY
  {
    id: '1', name: 'Quaker Oats 1kg', slug: 'quaker-oats-1kg', price: 229, originalPrice: 269,
    image: '/images/product_placeholder.png',
    category: 'Grocery', brand: 'Quaker', rating: 4.6, reviews: 4, description: 'Healthy and nutritious oats.', inStock: true,
    isSale: true, isHotSale: true, hasOffer: true
  },
  {
    id: '2', name: 'India Gate Rice 1kg', slug: 'india-gate-rice-1kg', price: 249,
    image: '/images/product_placeholder.png',
    category: 'Grocery', brand: 'India Gate', rating: 4.6, reviews: 4, description: 'Premium quality basmati rice.', inStock: true
  },
  {
    id: '3', name: 'Whole Wheat Pasta 500g', slug: 'whole-wheat-pasta', price: 149,
    image: '/images/product_placeholder.png',
    category: 'Grocery', brand: 'Barilla', rating: 4.5, reviews: 4, description: 'Healthy whole wheat penne pasta.', inStock: true
  },
  {
    id: '4', name: 'Extra Virgin Olive Oil 500ml', slug: 'olive-oil-500ml', price: 509, originalPrice: 629,
    image: '/images/product_placeholder.png',
    category: 'Grocery', brand: 'Filippo Berio', rating: 4.8, reviews: 4, description: 'Premium cold pressed olive oil.', inStock: true,
    isNewArrived: true, isLimited: true, hasOffer: true
  },

  // FRUITS & VEG
  {
    id: '5', name: 'Fresh Bananas 1kg', slug: 'fresh-bananas-1kg', price: 99,
    image: '/images/product_placeholder.png',
    category: 'Fruits & Veg', brand: 'Fresh Farm', rating: 4.6, reviews: 4, description: 'Fresh and organic bananas.', inStock: true
  },
  {
    id: '6', name: 'Green Apples 1kg', slug: 'green-apples-1kg', price: 269,
    image: '/images/product_placeholder.png',
    category: 'Fruits & Veg', brand: 'Fresh Farm', rating: 4.8, reviews: 4, description: 'Crisp and juicy green apples.', inStock: true
  },
  {
    id: '7', name: 'Fresh Strawberries 500g', slug: 'fresh-strawberries-500g', price: 389,
    image: '/images/product_placeholder.png',
    category: 'Fruits & Veg', brand: 'Berry Farm', rating: 4.9, reviews: 4, description: 'Sweet and fresh strawberries.', inStock: true
  },
  {
    id: '8', name: 'Fresh Avocados (Pack of 3)', slug: 'fresh-avocados', price: 309, originalPrice: 399,
    image: '/images/product_placeholder.png',
    category: 'Fruits & Veg', brand: 'Fresh Farm', rating: 4.7, reviews: 4, description: 'Ripe and ready to eat avocados.', inStock: true,
    isSale: true, hasOffer: true
  },

  // DAIRY & EGGS
  {
    id: '9', name: 'Amul Fresh Milk 1L', slug: 'amul-fresh-milk-1l', price: 109,
    image: '/images/product_placeholder.png',
    category: 'Dairy & Eggs', brand: 'Amul', rating: 4.7, reviews: 4, description: 'Pasteurized fresh milk.', inStock: true
  },
  {
    id: '10', name: 'Farm Fresh Eggs (12 pack)', slug: 'farm-fresh-eggs', price: 309,
    image: '/images/product_placeholder.png',
    category: 'Dairy & Eggs', brand: 'Farm Valley', rating: 4.8, reviews: 4, description: 'Organic free range eggs.', inStock: true
  },
  {
    id: '11', name: 'Cheddar Cheese Block 250g', slug: 'cheddar-cheese', price: 349,
    image: '/images/product_placeholder.png',
    category: 'Dairy & Eggs', brand: 'Kraft', rating: 4.6, reviews: 4, description: 'Sharp and aged cheddar cheese.', inStock: true
  },
  {
    id: '12', name: 'Greek Yogurt 500g', slug: 'greek-yogurt', price: 259,
    image: '/images/product_placeholder.png',
    category: 'Dairy & Eggs', brand: 'Chobani', rating: 4.8, reviews: 4, description: 'Thick and creamy greek yogurt.', inStock: true
  },

  // BEVERAGES
  {
    id: '13', name: 'Coca-Cola Soft Drink 1.5L', slug: 'coca-cola-1-5l', price: 139,
    image: '/images/product_placeholder.png',
    category: 'Beverages', brand: 'Coca-Cola', rating: 4.5, reviews: 4, description: 'Refreshing carbonated beverage.', inStock: true
  },
  {
    id: '14', name: 'Fresh Orange Juice 1L', slug: 'orange-juice-1l', price: 189,
    image: '/images/product_placeholder.png',
    category: 'Beverages', brand: 'Tropicana', rating: 4.5, reviews: 4, description: '100% natural orange juice.', inStock: true
  },
  {
    id: '15', name: 'Pure Spring Water 6-pack', slug: 'spring-water-6pack', price: 389,
    image: '/images/product_placeholder.png',
    category: 'Beverages', brand: 'Evian', rating: 4.7, reviews: 4, description: 'Natural spring water.', inStock: true
  },
  {
    id: '16', name: 'Green Tea Bags (50 pack)', slug: 'green-tea-bags', price: 309,
    image: '/images/product_placeholder.png',
    category: 'Beverages', brand: 'Lipton', rating: 4.6, reviews: 4, description: 'Antioxidant rich green tea.', inStock: true
  },

  // SNACKS
  {
    id: '17', name: 'Classic Potato Chips', slug: 'classic-potato-chips', price: 149,
    image: '/images/product_placeholder.png',
    category: 'Snacks', brand: 'Lays', rating: 4.4, reviews: 4, description: 'Crispy salted potato chips.', inStock: true
  },
  {
    id: '18', name: 'Mixed Nuts 200g', slug: 'mixed-nuts', price: 429,
    image: '/images/product_placeholder.png',
    category: 'Snacks', brand: 'Planters', rating: 4.8, reviews: 4, description: 'Healthy roasted mixed nuts.', inStock: true
  },
  {
    id: '19', name: 'Dark Chocolate Bar', slug: 'dark-chocolate', price: 189,
    image: '/images/product_placeholder.png',
    category: 'Snacks', brand: 'Lindt', rating: 4.9, reviews: 4, description: '70% cocoa dark chocolate.', inStock: true
  },
  {
    id: '20', name: 'Caramel Popcorn', slug: 'caramel-popcorn', price: 269,
    image: '/images/product_placeholder.png',
    category: 'Snacks', brand: 'Kernel', rating: 4.7, reviews: 4, description: 'Sweet and crunchy caramel popcorn.', inStock: true
  },

  // FASHION
  {
    id: '21', name: 'Brown Leather Handbag', slug: 'brown-handbag', price: 3189,
    image: '/images/product_placeholder.png',
    category: 'Fashion', brand: 'FashionBrand', rating: 4.6, reviews: 4, description: 'Stylish brown leather handbag.', inStock: true
  },
  {
    id: '22', name: 'Nike Running Shoes', slug: 'nike-running-shoes', price: 5589,
    image: '/images/product_placeholder.png',
    category: 'Fashion', brand: 'Nike', rating: 4.7, reviews: 4, description: 'Comfortable running shoes.', sizes: ['8', '9', '10', '11'], inStock: true
  },
  {
    id: '23', name: 'Classic Analog Watch', slug: 'classic-watch', price: 3989,
    image: '/images/product_placeholder.png',
    category: 'Fashion', brand: 'Timeless', rating: 4.6, reviews: 4, description: 'Classic analog watch.', inStock: true
  },
  {
    id: '24', name: 'Denim Jacket', slug: 'denim-jacket', price: 4789,
    image: '/images/product_placeholder.png',
    category: 'Fashion', brand: 'Levi', rating: 4.8, reviews: 4, description: 'Classic blue denim jacket.', sizes: ['S', 'M', 'L', 'XL'], inStock: true
  },

  // BEAUTY
  {
    id: '25', name: 'Luxury Perfume 50ml', slug: 'luxury-perfume-50ml', price: 7189,
    image: '/images/product_placeholder.png',
    category: 'Beauty', brand: 'Chanel', rating: 4.7, reviews: 4, description: 'Elegant and long lasting fragrance.', inStock: true
  },
  {
    id: '26', name: 'Moisturizing Face Cream', slug: 'face-cream', price: 1989,
    image: '/images/product_placeholder.png',
    category: 'Beauty', brand: 'Olay', rating: 4.5, reviews: 4, description: 'Hydrating day cream.', inStock: true
  },
  {
    id: '27', name: 'Matte Red Lipstick', slug: 'matte-lipstick', price: 1189,
    image: '/images/product_placeholder.png',
    category: 'Beauty', brand: 'MAC', rating: 4.8, reviews: 4, description: 'Long-lasting matte lipstick.', inStock: true
  },
  {
    id: '28', name: 'Vitamin C Serum', slug: 'vitamin-c-serum', price: 2389,
    image: '/images/product_placeholder.png',
    category: 'Beauty', brand: 'Ordinary', rating: 4.9, reviews: 4, description: 'Brightening vitamin C skin serum.', inStock: true
  },

  // ELECTRONICS
  {
    id: '29', name: 'Sony Wireless Headphones', slug: 'sony-wireless-headphones', price: 15989,
    image: '/images/product_placeholder.png',
    category: 'Electronics', brand: 'Sony', rating: 4.9, reviews: 4, description: 'Noise cancelling over-ear headphones.', colors: ['Black', 'Silver'], inStock: true
  },
  {
    id: '30', name: 'Smart Phone Pro', slug: 'smart-phone-pro', price: 71989,
    image: '/images/product_placeholder.png',
    category: 'Electronics', brand: 'TechBrand', rating: 4.8, reviews: 4, description: 'Latest generation smartphone.', colors: ['Silver', 'Black'], inStock: true
  },
  {
    id: '31', name: '10-inch Tablet', slug: '10-inch-tablet', price: 27989,
    image: '/images/product_placeholder.png',
    category: 'Electronics', brand: 'TechBrand', rating: 4.6, reviews: 4, description: 'Powerful tablet for work and play.', inStock: true
  },
  {
    id: '32', name: 'Smart Watch Series 5', slug: 'smart-watch', price: 19989,
    image: '/images/product_placeholder.png',
    category: 'Electronics', brand: 'TechBrand', rating: 4.7, reviews: 4, description: 'Fitness and health tracking smartwatch.', inStock: true
  },

  // HOME CARE
  {
    id: '33', name: 'Laundry Detergent Pods', slug: 'laundry-pods', price: 1029,
    image: '/images/product_placeholder.png',
    category: 'Home Care', brand: 'Tide', rating: 4.7, reviews: 4, description: 'Stain removing laundry pods.', inStock: true
  },
  {
    id: '34', name: 'Dishwashing Liquid', slug: 'dishwashing-liquid', price: 389,
    image: '/images/product_placeholder.png',
    category: 'Home Care', brand: 'Dawn', rating: 4.8, reviews: 4, description: 'Grease cutting dish soap.', inStock: true
  },
  {
    id: '35', name: 'Glass Cleaner Spray', slug: 'glass-cleaner', price: 309,
    image: '/images/product_placeholder.png',
    category: 'Home Care', brand: 'Windex', rating: 4.5, reviews: 4, description: 'Streak-free window cleaner.', inStock: true
  },
  {
    id: '36', name: 'Paper Towels (6 Rolls)', slug: 'paper-towels', price: 789,
    image: '/images/product_placeholder.png',
    category: 'Home Care', brand: 'Bounty', rating: 4.9, reviews: 4, description: 'Ultra absorbent paper towels.', inStock: true
  },

  // LIQUOR
  {
    id: '37', name: 'Cabernet Red Wine 750ml', slug: 'red-wine', price: 1189,
    image: '/images/product_placeholder.png',
    category: 'Liquor', brand: 'Vineyard', rating: 4.6, reviews: 4, description: 'Rich and bold red wine.', inStock: true
  },
  {
    id: '38', name: 'Craft Beer 6-pack', slug: 'craft-beer', price: 949,
    image: '/images/product_placeholder.png',
    category: 'Liquor', brand: 'Brewery', rating: 4.7, reviews: 4, description: 'Locally brewed craft IPA.', inStock: true
  },
  {
    id: '39', name: 'Aged Whiskey 700ml', slug: 'whiskey', price: 3669,
    image: '/images/product_placeholder.png',
    category: 'Liquor', brand: 'Distillery', rating: 4.9, reviews: 4, description: '12-year aged premium whiskey.', inStock: true
  },
  {
    id: '40', name: 'Premium Vodka 750ml', slug: 'vodka', price: 2389,
    image: '/images/product_placeholder.png',
    category: 'Liquor', brand: 'Distillery', rating: 4.5, reviews: 4, description: 'Smooth and triple distilled vodka.', inStock: true
  },

  // MORE
  {
    id: '41', name: 'Hardcover Notebook', slug: 'notebook', price: 709,
    image: '/images/product_placeholder.png',
    category: 'More', brand: 'Stationery', rating: 4.7, reviews: 4, description: 'Ruled pages hardcover notebook.', inStock: true
  },
  {
    id: '42', name: 'Yoga Mat', slug: 'yoga-mat', price: 1589,
    image: '/images/product_placeholder.png',
    category: 'More', brand: 'Fitness', rating: 4.8, reviews: 4, description: 'Non-slip exercise yoga mat.', inStock: true
  },
  {
    id: '43', name: 'Premium Dog Food 5kg', slug: 'dog-food', price: 1989,
    image: '/images/product_placeholder.png',
    category: 'More', brand: 'PetCare', rating: 4.6, reviews: 4, description: 'Nutritious dry food for adult dogs.', inStock: true
  },
  {
    id: '44', name: 'Basic Tool Set', slug: 'tool-set', price: 2789,
    image: '/images/product_placeholder.png',
    category: 'More', brand: 'Hardware', rating: 4.7, reviews: 4, description: 'Essential tools for home repair.', inStock: true
  },
  // NEW GROCERY
  {
    id: '45', name: 'Organic Lentils 1kg', slug: 'organic-lentils', price: 339,
    image: '/images/product_placeholder.png',
    category: 'Grocery', brand: 'NatureFarm', rating: 4.5, reviews: 4, description: 'High protein organic lentils.', inStock: true
  },
  {
    id: '46', name: 'Tomato Pasta Sauce', slug: 'tomato-sauce', price: 229,
    image: '/images/product_placeholder.png',
    category: 'Grocery', brand: 'Barilla', rating: 4.7, reviews: 4, description: 'Rich tomato and basil pasta sauce.', inStock: true
  },

  // NEW FRUITS & VEG
  {
    id: '47', name: 'Fresh Oranges 1kg', slug: 'fresh-oranges', price: 189,
    image: '/images/product_placeholder.png',
    category: 'Fruits & Veg', brand: 'Fresh Farm', rating: 4.8, reviews: 4, description: 'Juicy and sweet fresh oranges.', inStock: true
  },
  {
    id: '48', name: 'Organic Broccoli 500g', slug: 'organic-broccoli', price: 149,
    image: '/images/product_placeholder.png',
    category: 'Fruits & Veg', brand: 'Fresh Farm', rating: 4.6, reviews: 4, description: 'Fresh organic green broccoli.', inStock: true
  },

  // NEW DAIRY & EGGS
  {
    id: '49', name: 'Salted Butter 250g', slug: 'salted-butter', price: 269,
    image: '/images/product_placeholder.png',
    category: 'Dairy & Eggs', brand: 'Amul', rating: 4.9, reviews: 4, description: 'Creamy and rich salted butter.', inStock: true
  },
  {
    id: '50', name: 'Cream Cheese 200g', slug: 'cream-cheese', price: 229,
    image: '/images/product_placeholder.png',
    category: 'Dairy & Eggs', brand: 'Philadelphia', rating: 4.8, reviews: 4, description: 'Smooth and spreadable cream cheese.', inStock: true
  },

  // NEW BEVERAGES
  {
    id: '51', name: 'Peach Iced Tea 1L', slug: 'peach-iced-tea', price: 169,
    image: '/images/product_placeholder.png',
    category: 'Beverages', brand: 'Lipton', rating: 4.5, reviews: 4, description: 'Refreshing peach flavored iced tea.', inStock: true
  },
  {
    id: '52', name: 'Energy Drink 250ml', slug: 'energy-drink', price: 149,
    image: '/images/product_placeholder.png',
    category: 'Beverages', brand: 'Red Bull', rating: 4.7, reviews: 4, description: 'Vitalizing energy drink.', inStock: true
  },

  // NEW SNACKS
  {
    id: '53', name: 'Salted Pretzels 200g', slug: 'salted-pretzels', price: 189,
    image: '/images/product_placeholder.png',
    category: 'Snacks', brand: 'Snyder', rating: 4.4, reviews: 4, description: 'Crunchy baked pretzels.', inStock: true
  },
  {
    id: '54', name: 'Tortilla Chips 250g', slug: 'tortilla-chips', price: 259,
    image: '/images/product_placeholder.png',
    category: 'Snacks', brand: 'Doritos', rating: 4.6, reviews: 4, description: 'Crispy corn tortilla chips.', inStock: true
  },

  // NEW FASHION
  {
    id: '55', name: 'Polarized Sunglasses', slug: 'polarized-sunglasses', price: 2389,
    image: '/images/product_placeholder.png',
    category: 'Fashion', brand: 'RayBan', rating: 4.8, reviews: 4, description: 'Stylish polarized sunglasses with UV protection.', inStock: true
  },
  {
    id: '56', name: 'Winter Wool Scarf', slug: 'wool-scarf', price: 1589,
    image: '/images/product_placeholder.png',
    category: 'Fashion', brand: 'FashionBrand', rating: 4.7, reviews: 4, description: 'Warm and cozy winter scarf.', inStock: true
  },

  // NEW BEAUTY
  {
    id: '57', name: 'Hydrating Body Lotion', slug: 'body-lotion', price: 1029,
    image: '/images/product_placeholder.png',
    category: 'Beauty', brand: 'Nivea', rating: 4.7, reviews: 4, description: 'Deep moisture body lotion.', inStock: true
  },
  {
    id: '58', name: 'SPF 50 Sunscreen', slug: 'sunscreen', price: 1229,
    image: '/images/product_placeholder.png',
    category: 'Beauty', brand: 'Neutrogena', rating: 4.8, reviews: 4, description: 'Broad spectrum SPF 50 sunscreen.', inStock: true
  },

  // NEW ELECTRONICS
  {
    id: '59', name: 'Wireless Ergonomic Mouse', slug: 'wireless-mouse', price: 1989,
    image: '/images/product_placeholder.png',
    category: 'Electronics', brand: 'Logitech', rating: 4.6, reviews: 4, description: 'Comfortable wireless optical mouse.', inStock: true
  },
  {
    id: '60', name: 'Portable Bluetooth Speaker', slug: 'bluetooth-speaker', price: 4789,
    image: '/images/product_placeholder.png',
    category: 'Electronics', brand: 'JBL', rating: 4.8, reviews: 4, description: 'Waterproof portable bluetooth speaker.', inStock: true
  },

  // NEW HOME CARE
  {
    id: '61', name: 'All-Purpose Cleaner Spray', slug: 'all-purpose-cleaner', price: 349,
    image: '/images/product_placeholder.png',
    category: 'Home Care', brand: 'Lysol', rating: 4.7, reviews: 4, description: 'Multi-surface antibacterial cleaner.', inStock: true
  },
  {
    id: '62', name: 'Cleaning Sponges (6 pack)', slug: 'cleaning-sponges', price: 259,
    image: '/images/product_placeholder.png',
    category: 'Home Care', brand: 'Scotch-Brite', rating: 4.5, reviews: 4, description: 'Heavy duty scrub sponges.', inStock: true
  },

  // NEW LIQUOR
  {
    id: '63', name: 'London Dry Gin 700ml', slug: 'dry-gin', price: 1989,
    image: '/images/product_placeholder.png',
    category: 'Liquor', brand: 'Bombay', rating: 4.6, reviews: 4, description: 'Classic dry gin.', inStock: true
  },
  {
    id: '64', name: 'Silver Tequila 750ml', slug: 'silver-tequila', price: 2789,
    image: '/images/product_placeholder.png',
    category: 'Liquor', brand: 'Patron', rating: 4.8, reviews: 4, description: 'Premium blue agave tequila.', inStock: true
  },

  // NEW MORE
  {
    id: '65', name: 'Squeaky Dog Toy', slug: 'dog-toy', price: 549,
    image: '/images/product_placeholder.png',
    category: 'More', brand: 'PetCare', rating: 4.4, reviews: 4, description: 'Durable rubber chew toy.', inStock: true
  },
  {
    id: '66', name: 'LED Desk Lamp', slug: 'desk-lamp', price: 2389,
    image: '/images/product_placeholder.png',
    category: 'More', brand: 'HomeGoods', rating: 4.7, reviews: 4, description: 'Adjustable LED desk lamp with dimming.', inStock: true
  }
];

