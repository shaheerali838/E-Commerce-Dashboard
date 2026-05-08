/**
 * seedInbox.js
 * Run once from your browser console OR as a one-off script to populate
 * the Firestore `emails` collection with sample data.
 *
 * Usage (browser console while app is running):
 *   import { seedInbox } from "./src/scripts/seedInbox";
 *   seedInbox("dev-admin-123");   // pass the uid you see in AuthContext
 *
 * Or call it from main.jsx temporarily and remove after seeding.
 */

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const SAMPLE_EMAILS = [
  {
    folder: "Inbox",
    sender: "Jullu Jalal",
    avatar: "JJ",
    label: "Primary",
    subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
    preview:
      "We are pleased to inform you that our program has received full accreditation...",
    body: "Dear Student,\n\nWe are pleased to inform you that our Bachelor of Commerce program has received full ACBSP accreditation.\n\nBest regards,\nAdmissions Team",
    starred: false,
    important: false,
  },
  {
    folder: "Inbox",
    sender: "Minerva Barnett",
    avatar: "MB",
    label: "Work",
    subject: "Get Best Advertiser In Your Side Pocket",
    preview:
      "Discover the top advertising partners that can boost your revenue...",
    body: "Hi,\n\nI wanted to share some exciting advertising opportunities that could boost your revenue.\n\nBest,\nMinerva",
    starred: false,
    important: true,
  },
  {
    folder: "Inbox",
    sender: "Peter Lewis",
    avatar: "PL",
    label: "Friends",
    subject: "Vacation Home Rental Success",
    preview:
      "Hey! Just wanted to share how the vacation rental went this summer...",
    body: "Hey!\n\nThe vacation home rental was a huge success this summer. Let's catch up soon!\n\nPeter",
    starred: false,
    important: false,
  },
  {
    folder: "Inbox",
    sender: "Anthony Briggs",
    avatar: "AB",
    label: null,
    subject: "Free Classifieds — Promote Your Stuff Online",
    preview: "Learn how free classifieds can skyrocket your online presence...",
    body: "Hello,\n\nFree classified ads are one of the most underutilized marketing tools. Here's how to leverage them.\n\nAnthony",
    starred: true,
    important: true,
  },
  {
    folder: "Inbox",
    sender: "Clifford Morgan",
    avatar: "CM",
    label: "Social",
    subject: "Enhance Your Brand With Giant Advertising Blimps",
    preview: "Take your brand to new heights with aerial advertising...",
    body: "Hi,\n\nAerial advertising is making a comeback. Giant advertising blimps can give your brand incredible visibility.\n\nClifford",
    starred: false,
    important: false,
  },

  {
    folder: "Starred",
    sender: "Cecilia Webster",
    avatar: "CW",
    label: "Friends",
    subject: "Always Look On The Bright Side Of Life",
    preview: "A little positivity goes a long way...",
    body: "Hey!\n\nI just read an amazing article about staying positive. Thought of you!\n\nLots of love,\nCecilia",
    starred: true,
    important: false,
  },
  {
    folder: "Starred",
    sender: "Harvey Manning",
    avatar: "HM",
    label: null,
    subject: "Curling Irons Are As Individual As The Women Who Use Them",
    preview: "Find the perfect curling iron for your hair type...",
    body: "Hello,\n\nWe have curated a guide to help you find the perfect curling iron.\n\nHappy styling!\nHarvey",
    starred: true,
    important: false,
  },

  {
    folder: "Sent",
    sender: "Me",
    avatar: "ME",
    label: "Primary",
    to: "willie@example.com",
    subject: "Your order has been dispatched",
    preview: "Your recent order #48291 is on its way...",
    body: "Hi Willie,\n\nYour order #48291 has been dispatched. Expected delivery: 3-5 business days.\n\nThank you!",
    starred: false,
    important: false,
  },
  {
    folder: "Sent",
    sender: "Me",
    avatar: "ME",
    label: "Work",
    to: "minerva@example.com",
    subject: "Re: Q3 Marketing Proposal",
    preview: "Thanks for the proposal — a few comments...",
    body: "Hi Minerva,\n\nThank you for the Q3 marketing proposal. I have reviewed it and have a few suggestions.\n\nLet's schedule a call.",
    starred: false,
    important: true,
  },

  {
    folder: "Draft",
    sender: "Me",
    avatar: "ME",
    label: null,
    subject: "Draft: Newsletter for June Edition",
    preview: "Here's the working draft of the June newsletter...",
    body: "[DRAFT]\n\nHello everyone,\n\nWelcome to our June newsletter!\n\n[Continue writing...]",
    starred: false,
    important: false,
  },
  {
    folder: "Draft",
    sender: "Me",
    avatar: "ME",
    label: null,
    subject: "Draft: Event Invitation Template",
    preview: "Working on the invitation template for the gala...",
    body: "[DRAFT]\n\nDear [Name],\n\nYou are cordially invited to our Annual Gala Dinner.\n\n[Complete details...]",
    starred: false,
    important: false,
  },

  {
    folder: "Spam",
    sender: "Lora Houston",
    avatar: "LH",
    label: "Friends",
    subject: "You've won a million dollars!!!",
    preview: "Claim your prize now...",
    body: "CONGRATULATIONS!!!\n\nYou have won $1,000,000. Click here to claim.\n\n[SPAM]",
    starred: false,
    important: false,
  },
  {
    folder: "Spam",
    sender: "Unknown Sender",
    avatar: "US",
    label: null,
    subject: "URGENT: Verify your account now",
    preview: "Your account will be suspended unless you verify...",
    body: "WARNING: Suspicious activity detected. Verify your identity immediately.\n\n[SPAM - Do not click links]",
    starred: false,
    important: false,
  },

  {
    folder: "Important",
    sender: "Bank Alert",
    avatar: "BA",
    label: "Work",
    subject: "Important: Action required on your account",
    preview: "Please review your recent account activity...",
    body: "Dear Account Holder,\n\nWe detected unusual activity. Please log in and review recent transactions.\n\nBank Security",
    starred: false,
    important: true,
  },
  {
    folder: "Important",
    sender: "Team Updates",
    avatar: "TU",
    label: "Work",
    subject: "Q2 Performance Review — Please Read",
    preview: "Your Q2 review is now available...",
    body: "Hi,\n\nYour Q2 performance review is available. Please log in to HR portal and submit acknowledgment by end of week.",
    starred: false,
    important: true,
  },

  {
    folder: "Bin",
    sender: "Old Newsletter",
    avatar: "ON",
    label: "Social",
    subject: "Unsubscribe confirmation",
    preview: "You have been successfully unsubscribed...",
    body: "You have been successfully unsubscribed from our mailing list.",
    starred: false,
    important: false,
  },
  {
    folder: "Bin",
    sender: "Deleted Draft",
    avatar: "DD",
    label: null,
    subject: "Old project notes — [DELETED]",
    preview: "This draft was moved to bin automatically...",
    body: "These are old project notes that were automatically deleted after 30 days.",
    starred: false,
    important: false,
  },
];

export const seedInbox = async (userId) => {
  if (!userId) {
    console.error("seedInbox: userId is required");
    return;
  }
  const ref = collection(db, "emails");
  let count = 0;
  for (const email of SAMPLE_EMAILS) {
    await addDoc(ref, { ...email, userId, createdAt: serverTimestamp() });
    count++;
    console.log(`Seeded ${count}/${SAMPLE_EMAILS.length}: ${email.subject}`);
  }
  console.log(`✅ Seeded ${count} emails for user "${userId}"`);
};
