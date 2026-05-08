/**
 * seedOrders.js
 * Run once to populate the Firestore `orders` collection.
 *
 * Usage (browser console while app is running):
 *   import('/src/scripts/seedOrders.js').then(m => m.seedOrders())
 */
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const SAMPLE_ORDERS = [
  { name: "Christine Brooks", address: "089 Kutch Green Apt. 448",      date: "2026-02-14", type: "Electric", status: "Completed",  amount: 240.00  },
  { name: "Rosie Pearson",    address: "979 Immanuel Ferry Suite 526",  date: "2026-02-14", type: "Book",     status: "Processing", amount: 45.00   },
  { name: "Darrell Caldwell", address: "8587 Frida Ports",              date: "2026-02-15", type: "Medicine", status: "Rejected",   amount: 129.50  },
  { name: "Gilbert Johnston", address: "768 Destiny Lake Suite 600",    date: "2026-02-15", type: "Mobile",   status: "Completed",  amount: 899.00  },
  { name: "Alan Cain",        address: "042 Mylene Throughway",         date: "2026-02-15", type: "Watch",    status: "Processing", amount: 320.00  },
  { name: "Alfred Murray",    address: "543 Weimann Mountain",          date: "2026-02-16", type: "Medicine", status: "Completed",  amount: 75.00   },
  { name: "Lula Barton",      address: "521 Camren Unions",             date: "2026-02-16", type: "Book",     status: "Completed",  amount: 32.00   },
  { name: "Phoebe Feeney",    address: "776 Linwood Falls",             date: "2026-02-17", type: "Electric", status: "Processing", amount: 580.00  },
  { name: "Barry Castillo",   address: "1234 Ridgeway Drive",           date: "2026-02-17", type: "Mobile",   status: "Rejected",   amount: 749.99  },
  { name: "Marian Shields",   address: "88 Winona Forge",              date: "2026-02-18", type: "Watch",    status: "Completed",  amount: 210.00  },
  { name: "Lester Bowman",    address: "99 Lila Gateway Apt. 12",      date: "2026-02-18", type: "Book",     status: "Processing", amount: 60.00   },
  { name: "Ora Brady",        address: "55 Hamill Summit",             date: "2026-02-19", type: "Electric", status: "Completed",  amount: 415.00  },
  { name: "Jacob Fowler",     address: "231 Alvis Run",                date: "2026-02-19", type: "Medicine", status: "Completed",  amount: 95.00   },
  { name: "Nelle Reeves",     address: "672 Collier Knolls Suite 900", date: "2026-02-20", type: "Mobile",   status: "Rejected",   amount: 1099.00 },
  { name: "Perry Ellis",      address: "14 Aida Stream",               date: "2026-02-20", type: "Watch",    status: "Processing", amount: 445.00  },
];

export const seedOrders = async () => {
  const ref = collection(db, "orders");
  let count = 0;
  for (const order of SAMPLE_ORDERS) {
    await addDoc(ref, { ...order, createdAt: serverTimestamp() });
    count++;
    console.log(`Seeded ${count}/${SAMPLE_ORDERS.length}: ${order.name}`);
  }
  console.log(`✅ Seeded ${count} orders`);
};
