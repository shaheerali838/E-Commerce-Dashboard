/**
 * seedProductStock.js
 * Run once to populate the Firestore `products` collection.
 *
 * Usage (browser console while app is running):
 *   import('/src/scripts/seedProductStock.js').then(m => m.seedProductStock())
 */
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const SAMPLE_PRODUCTS = [
  { name: "Apple Watch Series 4",  category: "Electronics", price: 690,  piece: 63,  colors: ["#1f2937","#9ca3af","#fb7185"],              emoji: "⌚" },
  { name: "Microsoft Headset",     category: "Electronics", price: 190,  piece: 13,  colors: ["#1f2937","#fb7185","#3b82f6","#facc15"],     emoji: "🎧" },
  { name: "Women's Floral Dress",  category: "Fashion",     price: 640,  piece: 635, colors: ["#6b21a8","#60a5fa","#1e293b","#4f46e5"],     emoji: "👗" },
  { name: "Samsung A50",           category: "Mobile",      price: 400,  piece: 67,  colors: ["#3730a3","#1f2937","#9f1239"],               emoji: "📱" },
  { name: "DSLR Camera",           category: "Electronics", price: 420,  piece: 8,   colors: ["#3730a3","#1f2937","#9f1239"],               emoji: "📷" },
  { name: "Running Shoes",         category: "Fashion",     price: 120,  piece: 220, colors: ["#ffffff","#ef4444","#1f2937"],               emoji: "👟" },
  { name: "JavaScript Handbook",   category: "Books",       price: 45,   piece: 0,   colors: ["#f59e0b"],                                   emoji: "📚" },
  { name: "Vitamin C Supplement",  category: "Medicine",    price: 28,   piece: 340, colors: ["#f97316"],                                   emoji: "💊" },
  { name: "Leather Wallet",        category: "Fashion",     price: 75,   piece: 5,   colors: ["#78350f","#1f2937"],                         emoji: "👛" },
  { name: "Bluetooth Speaker",     category: "Electronics", price: 220,  piece: 44,  colors: ["#1f2937","#6b7280"],                         emoji: "🔊" },
  { name: "Yoga Mat",              category: "Sports",      price: 60,   piece: 88,  colors: ["#a3e635","#7c3aed","#f43f5e"],               emoji: "🧘" },
  { name: "Ibuprofen 400mg",       category: "Medicine",    price: 12,   piece: 0,   colors: ["#ffffff"],                                   emoji: "💉" },
  { name: "Smart TV 55\"",         category: "Electronics", price: 1200, piece: 17,  colors: ["#1f2937"],                                   emoji: "📺" },
  { name: "Design Patterns Book",  category: "Books",       price: 55,   piece: 130, colors: ["#1e3a8a"],                                   emoji: "📖" },
  { name: "Protein Powder",        category: "Sports",      price: 85,   piece: 62,  colors: ["#fbbf24","#dc2626"],                         emoji: "🥤" },
];

export const seedProductStock = async () => {
  const ref = collection(db, "products");
  let count = 0;
  for (const product of SAMPLE_PRODUCTS) {
    await addDoc(ref, { ...product, createdAt: serverTimestamp() });
    count++;
    console.log(`Seeded ${count}/${SAMPLE_PRODUCTS.length}: ${product.name}`);
  }
  console.log(`✅ Seeded ${count} products`);
};
