import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Basir',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
    
      name: 'Razer Naga Trinity Gaming Mouse Razer Inc',
      productid: 'Razer Naga Trinity Gaming Mouse Razer Inc',
      category: 'accessories',
      image: '/images/mouse1.png',
      price: 5,
      instock: 10,
      brand: 'Razer',
      promotionalPrice:10,
      rating: 4.5,
      numReview: 0,
      description:
        'developed by Razer Inc., is a versatile and high-performance gaming mouse tailored to meet the demands of gamers across various genres.',
    },

    {

      name: 'Razer BlackWidow Chroma V2 Gaming keypad',
      productid: 'Razer BlackWidow Chroma V2 Gaming keypad',
      category: 'accessories',
      image: "/images/Keyboard.png",
      price: 50,
      instock: 15,
      brand: 'Razer',
      rating: 3.5,
      numReview: 0,
      description:
        'The Razer BlackWidow Chroma V2 Gaming Keypad offers top-tier performance and customization for gamers.',
    },
    {

      name: ' Rato Spirit Of Gamer ELITE M20 Preto RGB',
      productid: 'Rato Spirit Of Gamer ELITE M20 Preto RGB',
      category: 'accessories',
      image: '/images/mouse2.png',
      price: 35,
      instock: 0,
      brand: 'Spirit Of Gamer',
      rating: 2.5,
      numReview: 0,
      description:
        'The Rato Spirit Of Gamer ELITE M20 Preto RGBL is a gaming mouse with customizable RGB lighting.',
    },
    {

      name: 'ASUS RGB Mechanical Gaming Keyboard',
      productid: 'ASUS RGB Mechanical Gaming Keyboard',
      category: 'accessories',
      image: '/images/keyboard2.png',
      price: 40,
      instock: 1,
      brand: 'ASUS',
      rating: 5,
      numReview: 0,
      description:
        'compact ten keyless form-factor expands to a full macro/10-key keyboard with the optional Claymore Bond',
    },
    
  ],
};
export default data;
