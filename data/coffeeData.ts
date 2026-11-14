export interface CoffeeItem {
  name: string;
  testId: string;
  price: number;
  chineseTitle: string;
}

export interface CheckoutUser {
  name: string;
  email: string;
  promotions?: boolean;
}

export const COFFEES: Record<string, CoffeeItem> = {
  espresso: {
    name: 'Espresso',
    testId: 'Espresso',
    price: 10,
    chineseTitle: '特浓咖啡',
  },
  espressoMacchiato: {
    name: 'Espresso Macchiato',
    testId: 'Espresso_Macchiato',
    price: 12,
    chineseTitle: '浓缩玛奇朵',
  },
  cappuccino: {
    name: 'Cappuccino',
    testId: 'Cappuccino',
    price: 19,
    chineseTitle: '卡布奇诺',
  },
  mocha: {
    name: 'Mocha',
    testId: 'Mocha',
    price: 8,
    chineseTitle: '摩卡',
  },
  flatWhite: {
    name: 'Flat White',
    testId: 'Flat_White',
    price: 18,
    chineseTitle: '平白咖啡',
  },
  americano: {
    name: 'Americano',
    testId: 'Americano',
    price: 7,
    chineseTitle: '美式咖啡',
  },
  cafeLatte: {
    name: 'Cafe Latte',
    testId: 'Cafe_Latte',
    price: 16,
    chineseTitle: '拿铁',
  },
  espressoConPanna: {
    name: 'Espresso Con Panna',
    testId: 'Espresso_Con_Panna',
    price: 14,
    chineseTitle: '康宝蓝',
  },
  cafeBreve: {
    name: 'Cafe Breve',
    testId: 'Cafe_Breve',
    price: 15,
    chineseTitle: '半拿铁',
  },
};

export const PROMO = {
  mochaDiscountPrice: 4,
  message: "It's your lucky day! Get an extra cup of Mocha for $4.",
  cartItemName: '(Discounted) Mocha',
  acceptButtonText: 'Yes, of course!',
  declineButtonText: "Nah, I'll skip.",
};

export const TEST_USERS: Record<string, CheckoutUser> = {
  defaultUser: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    promotions: false,
  },
  promoOptInUser: {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    promotions: true,
  },
};

export const MESSAGES = {
  paymentSuccess: 'Thanks for your purchase. Please check your email for payment.',
  emptyCart: 'No coffee, go add some.',
};
