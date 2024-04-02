export default {
  date: "2022-01-01T00:00:00Z",
  cost: 1000,
  status: "pending",
  from_name: "The Classic Bookshop",
  from_address: "123 Book St, Readville, USA",
  from_phone: "555-555-BOOK",
  to_name: "Jane Reader",
  to_address: "124 Novel Ave, Readville, USA",
  to_phone: "666-666-READ",
  bookOrders: [
    {
      title: "The Great Gatsby",
      description: "A novel by F. Scott Fitzgerald about the Jazz Age.",
      category: "Classic Literature",
      price: "15.99",
      quantity: "59",
      supplier: "Classic Novels Inc.",
      availability: "In Stock",
      shippingOptions: [
        {
          title: "Ship Next Day",
          description: "Ships on the next business day.",
        },
        {
          title: "Standard Shipping",
          description: "Ships within 3 to 5 business days.",
        },
      ],
    },
    {
      title: "To Kill a Mockingbird",
      description: "A novel by Harper Lee, a classic of modern American literature.",
      category: "Modern Classics",
      price: "12.99",
      quantity: "67",
      supplier: "Literary Gems",
      availability: "In Stock",
      shippingOptions: [
        {
          title: "Ship Next Day",
          description: "Ships on the next business day.",
        },
        {
          title: "Standard Shipping",
          description: "Ships within 3 to 5 business days.",
        },
      ],
    },
  ],
};
