export const SHOP_CONTENT = {
  badge: "Shop",
  title: "Framed Prints & Art",
  description: "Bring the beauty of the world into your home with our premium framed prints.",
  contact: {
    whatsapp: "+2348123951878", // Update with actual number
    messageTemplate: "Hello Niniola, I am interested in purchasing the following piece:\n\n*Product:* {title}\n*Price:* {price}\n*Info:* {details}\n*Edition:* {edition}\n*Link:* {link}\n\nCould you confirm it's availability?"
  },
  dialog: {
    shippingInfo: "International Shipping Included",
    seriesTitleSnippet: "Collector's Series",
    materialDetailTitle: "Material Detail",
    actionButton: "Place Inquiry",
    actionButtonSub: "request quote"
  }
};

export const products = [
  { 
    id: 1, 
    title: "Alpine Mist Frame", 
    price: "$120.00", 
    image: "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=800",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800",
      "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=800"
    ],
    details: "Walnut Frame • 18x24\"",
    category: "Art Print",
    edition: "Edition #01",
    series: "Collector's Series",
    description: "A breathtaking view of the alpine peaks during sunset, encased in a premium handcrafted walnut frame. Perfect for bringing a touch of nature's majesty into your living space.",
    specs: [
        { label: "Paper", value: "Hahnemühle Rag" },
        { label: "Frame", value: "Walnut" },
        { label: "Glass", value: "Museum Std." }
    ]
  },
  { 
    id: 2, 
    title: "Urban Concrete", 
    price: "$95.00", 
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800",
      "https://images.unsplash.com/photo-1470075801209-17f9ec0cada6?q=80&w=800"
    ],
    details: "Black Aluminum Frame • 16x20\"",
    category: "Art Print",
    edition: "Edition #03",
    series: "Collector's Series",
    description: "Capturing the raw essence of modern architecture. This piece features sharp lines and monochromatic tones, framed in sleek black aluminum for a contemporary look.",
    specs: [
        { label: "Paper", value: "Hahnemühle Rag" },
        { label: "Frame", value: "Black Aluminum" },
        { label: "Glass", value: "Museum Std." }
    ]
  },
  { 
    id: 3, 
    title: "Desert Gold", 
    price: "$140.00", 
    image: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800"
    ],
    details: "Oak Frame • 24x36\"",
    category: "Art Print",
    edition: "Edition #02",
    series: "Collector's Series",
    description: "The golden dunes of the desert at dawn. This large format print brings warmth and a sense of vast openness to any room, beautifully complemented by a natural oak frame.",
    specs: [
        { label: "Paper", value: "Hahnemühle Rag" },
        { label: "Frame", value: "Natural Oak" },
        { label: "Glass", value: "Museum Std." }
    ]
  },
  { 
    id: 4, 
    title: "Ocean Blue", 
    price: "$110.00", 
    image: "https://images.unsplash.com/photo-1439405326854-01517489c73e?q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1439405326854-01517489c73e?q=80&w=800",
      "https://images.unsplash.com/photo-1505118380757-91f5f45d8de4?q=80&w=800",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800"
    ],
    details: "White Frame • 20x28\"",
    category: "Art Print",
    edition: "Edition #05",
    series: "Collector's Series",
    description: "Calm waves meeting the shore in a serene harmony of blues. Framed in clean white to emphasize the purity and tranquility of the ocean scene.",
    specs: [
        { label: "Paper", value: "Hahnemühle Rag" },
        { label: "Frame", value: "White" },
        { label: "Glass", value: "Museum Std." }
    ]
  },
];

