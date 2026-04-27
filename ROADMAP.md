# E-Commerce Admin Dashboard - Implementation Roadmap (v2.0)

**Updated**: April 24, 2026 - Based on Official Requirements & Design Specifications

## Table of Contents

1. [Project Overview](#project-overview)
2. [Official Requirements Summary](#official-requirements-summary)
3. [Technology Stack](#technology-stack)
4. [Current State Analysis](#current-state-analysis)
5. [UI/UX Design Overview](#uiux-design-overview)
6. [Implementation Phases](#implementation-phases)
7. [Firestore Database Schema](#firestore-database-schema)
8. [Feature Specifications](#feature-specifications)
9. [Backend Integration](#backend-integration)
10. [Advanced Features](#advanced-features)
11. [Verification & Testing](#verification--testing)

---

## Project Overview

**Goal:** Build a complete, production-ready admin dashboard to manage an e-commerce system with proper data handling, state management, and business logic.

**This is NOT a simple CRUD project** - it must behave like a real business dashboard with:

- Real Firebase backend integration
- Proper data flow and consistency
- Role-based access control
- Complex state management
- Real-time notifications
- Email automation
- Advanced analytics
- Security constraints

**Current Completion:** ~25% (scaffolding phase)

---

## Official Requirements Summary

### Core Features (Must Have)

1. ✅ **Admin Authentication & Access Control** - Firebase Auth with role-based access
2. ✅ **Product Management System** - Full CRUD with image uploads (Cloudinary)
3. ✅ **Category Management** - Create, update, delete categories
4. ✅ **Order Management System** - View, filter, update order status
5. ✅ **User Management System** - View registered users and their details
6. ✅ **Dashboard Analytics System** - KPIs and charts (Recharts)
7. ✅ **Inventory Management** - Track stock with low-stock alerts
8. ✅ **Notification System** - Firebase Cloud Messaging (FCM)
9. ✅ **Email System** - Nodemailer for order confirmations & alerts
10. ✅ **Data Handling & State Management** - Centralized with TanStack Query
11. ✅ **Error Handling & Reliability** - API failures, network issues, validation
12. ✅ **Security Rules** - Firestore rules for admin-only access
13. ✅ **Performance Optimization** - Pagination, lazy loading, efficient queries
14. ✅ **Scalability** - Support thousands of products, high order volume

### Advanced Features (For Strong Interns)

- Multi-admin roles (super admin, manager)
- Refund system
- Coupon/discount management
- Export data (CSV/Excel)
- Real-time dashboard updates
- Audit logs (track admin actions)

---

## Technology Stack

### Frontend

- **React** 19.2.4 (hooks-based architecture)
- **React Router** 7.14.0 (navigation control)
- **Vite** 8.0.4 (build tool)
- **Tailwind CSS** 4.2.2 (styling)
- **React Hook Form** 7.72.1 (form handling)
- **Yup** 1.7.1 (validation)
- **TanStack Query (React Query)** (data fetching & caching)
- **Recharts** (analytics & charts)
- **Axios** (API communication)
- **date-fns or Day.js** (date formatting)
- **React Icons** 5.6.0 (icon library)

### Backend & Services

- **Firebase Authentication** - Admin login system
- **Cloud Firestore** - Database (products, orders, users, categories, analytics)
- **Firebase Cloud Messaging (FCM)** - Push notifications
- **Cloudinary** - Image & file hosting for product images & banners
- **Nodemailer** - Email system for confirmations & alerts

### State Management

- **Context API** (for auth)
- **TanStack Query** (for server state)
- **React Hook Form** (for form state)

---

## Current State Analysis

### ✅ Completed

- Firebase configuration setup
- React Router with protected routes
- Auth context provider (needs real auth)
- Admin login form with validation
- Navbar UI components
- Sidebar UI with navigation structure
- Tailwind CSS integration

### ⚠️ Issues Found

1. **Layout rendering error** - `<children />` should be `{children}`
2. **Hardcoded authentication** - Using fake dev user instead of Firebase
3. **No real Firestore integration** - Database not connected
4. **ProtectedRoute redirects wrong** - Points to non-existent `/login`
5. **No `.env.local`** - Firebase credentials missing
6. **Dashboard is empty** - No content or data display
7. **No notification system** - FCM not set up
8. **No email system** - Nodemailer not configured
9. **No image upload** - Cloudinary not integrated

### ❌ Not Implemented

- All data CRUD operations
- Actual Firestore queries
- Email automation
- Push notifications
- Image upload handling
- Analytics charts
- Inventory management
- Audit logging
- Error boundaries
- Loading states

---

## UI/UX Design Overview

Based on the provided design mockup (DashStack template):

### Navigation Structure

**Left Sidebar:**

- Dashboard (Home)
- Products
- Favorites
- Inbox
- Order Lists
- Product Stock
- **Pages Section:**
  - Pricing
  - Calendar
  - To-Do
  - Contact
  - Invoice
  - UI Elements
  - Team
  - Table
- Settings
- Logout

**Top Navigation:**

- Search bar
- Notifications bell
- Language selector
- Admin profile dropdown

### Dashboard Page Layout

1. **Top Row - 4 Metric Cards:**
   - Total Users (with % change)
   - Total Orders (with % change)
   - Total Sales (with % change)
   - Total Pending (with % change)

2. **Charts Section:**
   - Sales Details (line chart showing trends over time)
   - Category Distribution (optional)

3. **Bottom Tables:**
   - Deals Details table (showing recent transactions)
   - Order history
   - Recent user activity

### Color Scheme

- Primary Blue: Used for buttons and active states
- Success Green: For positive metrics
- Warning Orange/Red: For alerts
- Neutral Gray: For secondary elements
- Background: Light gray/white

---

## Implementation Phases (REVISED)

---

### Phase 1: Foundation, Auth & Bug Fixes (Days 1-2)

**CRITICAL** - Must complete before moving forward

**Tasks:**

1. Fix Layout component rendering bug (`<children />` → `{children}`)
2. Enable real Firebase Authentication in AuthContext
3. Create `.env.local` with Firebase credentials
4. Uncomment real auth logic (remove hardcoded dev user)
5. Implement logout functionality
6. Fix ProtectedRoute redirect paths
7. Set up Firestore security rules
8. Configure image hosting (Cloudinary credentials)
9. Set up email system (Nodemailer config)

**Deliverables:**

- ✅ Real admin login/logout working
- ✅ Session persists on refresh
- ✅ Only admins access dashboard
- ✅ Firebase & external services configured
- ✅ No console errors

**Files Modified:** `AuthContext.jsx`, `Layout.jsx`, `Navbar.jsx`, `ProtectedRoute.jsx`, `.env.local`

---

### Phase 2: Dashboard & Analytics (Days 2-4)

**Focus:** Build the main dashboard view with KPIs and charts

**Tasks:**

1. Design dashboard data model (total users, orders, revenue, etc.)
2. Create Firestore aggregation queries for metrics
3. Implement DataCard component (4 metric cards)
4. Build Sales Details line chart (Recharts)
5. Create RecentTransactions table
6. Set up TanStack Query for data fetching
7. Implement real-time metric updates
8. Add loading skeletons & error states

**Deliverables:**

- ✅ Dashboard page displays 4 metric cards with real data
- ✅ Charts render with historical data
- ✅ Data updates in real-time from Firestore
- ✅ Loading states appear during fetch
- ✅ Error messages display on failures

**Files Created:** `Dashboard.jsx`, `DataCard.jsx`, `SalesChart.jsx`, `useDashboardMetrics.js`

**Key Dependencies:** TanStack Query, Recharts, date-fns

---

### Phase 3: Product Management (Days 4-7)

**Focus:** Full product CRUD with image uploads

**Tasks:**

1. Create Firestore products collection schema
2. Build Products listing page with filters & search
3. Implement Add Product modal with form validation
4. Implement Edit Product modal (pre-populate data)
5. Add image upload to Cloudinary
6. Implement Delete Product with confirmation
7. Add product search functionality
8. Implement bulk actions (bulk delete, bulk status change)
9. Add pagination for large product lists
10. Create product category assignment

**Deliverables:**

- ✅ Product table with all CRUD operations
- ✅ Image uploads work to Cloudinary
- ✅ Form validation prevents invalid data
- ✅ Search & filtering work dynamically
- ✅ Pagination handles large datasets

**Files Created:** `Products.jsx`, `ProductTable.jsx`, `ProductForm.jsx`, `CloudinaryUpload.jsx`, `useProducts.js`

**Key Dependencies:** Cloudinary SDK, React Hook Form + Yup, TanStack Query

---

### Phase 4: Category Management (Days 7-8)

**Focus:** Category CRUD and product assignment

**Tasks:**

1. Create categories collection in Firestore
2. Build Category listing & management page
3. Implement Create Category form
4. Implement Edit Category form
5. Implement Delete Category (prevent duplicates)
6. Add category-product assignment
7. Implement category validation (no duplicates)
8. Reflect category changes across products

**Deliverables:**

- ✅ Categories can be created, updated, deleted
- ✅ No duplicate categories allowed
- ✅ Products correctly assigned to categories
- ✅ Changes reflect across product list

**Files Created:** `Categories.jsx`, `CategoryForm.jsx`, `useCategories.js`

---

### Phase 5: Order Management System (Days 8-10)

**Focus:** View, filter, and manage orders

**Tasks:**

1. Create orders collection schema
2. Build Orders listing page with table view
3. Implement order filtering (by status, date, customer)
4. Build order details modal
5. Implement order status update workflow
6. Add order status history tracking
7. Implement order search (by order ID, customer)
8. Add order export to CSV/JSON
9. Implement pagination for orders
10. Add real-time order updates

**Deliverables:**

- ✅ View all orders with complete details
- ✅ Filter & search functionality working
- ✅ Update order status (pending → shipped → delivered)
- ✅ Export orders to CSV/Excel
- ✅ Order history tracked

**Files Created:** `Orders.jsx`, `OrderTable.jsx`, `OrderDetailsModal.jsx`, `useOrders.js`, `exportUtils.js`

---

### Phase 6: User Management (Days 10-11)

**Focus:** View and manage registered users

**Tasks:**

1. Create users collection queries
2. Build Users listing page
3. Display user details (name, email, role, orders)
4. Implement user search & filtering
5. Add user status management (active/inactive)
6. Create user details view modal
7. Implement pagination for users
8. Add admin role assignment capability
9. Create user activity tracking

**Deliverables:**

- ✅ View all registered users
- ✅ See user details and order history
- ✅ Search & filter users
- ✅ Manage user status and roles

**Files Created:** `Users.jsx`, `UserTable.jsx`, `UserDetailsModal.jsx`, `useUsers.js`

---

### Phase 7: Inventory Management (Days 11-12)

**Focus:** Stock tracking with alerts

**Tasks:**

1. Create inventory collection schema
2. Build inventory tracking system
3. Implement low-stock alerts (reorder point)
4. Create inventory history logs
5. Add bulk stock updates
6. Implement stock level visualization
7. Create reorder point configuration
8. Add inventory export functionality

**Deliverables:**

- ✅ View all product stock levels
- ✅ Low-stock items highlighted/alerted
- ✅ Update stock quantities
- ✅ Inventory change history tracked

**Files Created:** `Inventory.jsx`, `InventoryTable.jsx`, `StockAlerts.jsx`, `useInventory.js`

---

### Phase 8: Notifications & Alerts (Days 12-13)

**Focus:** Firebase Cloud Messaging & in-app notifications

**Tasks:**

1. Set up Firebase Cloud Messaging (FCM)
2. Implement push notification handler
3. Create notification UI component
4. Implement notification types (order, stock, system)
5. Add notification persistence
6. Create notification preferences
7. Implement notification history/logs
8. Add toast notifications for user actions

**Deliverables:**

- ✅ Real-time push notifications working
- ✅ New order alerts
- ✅ Low-stock warnings
- ✅ In-app toast notifications

**Files Created:** `NotificationService.js`, `NotificationCenter.jsx`, `useNotifications.js`

---

### Phase 9: Email Automation (Days 13-14)

**Focus:** Nodemailer integration for emails

**Tasks:**

1. Set up Nodemailer configuration
2. Create email templates (HTML)
3. Implement order confirmation emails
4. Implement order status update emails
5. Create admin alert emails
6. Implement low-stock warning emails
7. Test email delivery
8. Add email logging & retry logic

**Deliverables:**

- ✅ Emails sent on order creation
- ✅ Status update emails working
- ✅ Admin alerts emailed
- ✅ Email logging for debugging

**Backend Tasks:** Create Cloud Functions for email triggers

---

### Phase 10: Advanced Features (Days 14-16)

**Focus:** Multi-admin roles, refunds, coupons, audit logs

**Tasks:**

1. Implement multi-admin role system (super admin, manager)
2. Create refund request system
3. Implement coupon/discount code management
4. Create comprehensive audit logs (track all admin actions)
5. Implement data export (products, orders, users to CSV/Excel)
6. Add admin activity dashboard
7. Create system settings page
8. Implement advanced permission management

**Deliverables:**

- ✅ Multi-level admin roles working
- ✅ Refund workflow implemented
- ✅ Coupon system functional
- ✅ Complete audit trail available
- ✅ Data exports working

**Files Created:** `AdminRoles.jsx`, `Refunds.jsx`, `Coupons.jsx`, `AuditLogs.jsx`, `SystemSettings.jsx`

---

### Phase 11: Performance & Optimization (Days 16-17)

**Focus:** Speed, caching, pagination

**Tasks:**

1. Optimize Firestore queries with indexes
2. Implement pagination across all tables
3. Add lazy loading for images
4. Memoize expensive components
5. Implement request caching with TanStack Query
6. Optimize bundle size
7. Add performance monitoring
8. Implement code splitting

**Deliverables:**

- ✅ App loads in < 2 seconds
- ✅ Pagination handles 1000+ records smoothly
- ✅ Caching prevents redundant API calls
- ✅ No performance warnings in DevTools

---

### Phase 12: Error Handling & Polish (Days 17-18)

**Focus:** UI/UX polish, error boundaries, security

**Tasks:**

1. Create error boundary component
2. Implement comprehensive error handling
3. Add loading skeletons for all data views
4. Create global error logging
5. Add accessibility features (ARIA labels, keyboard nav)
6. Implement dark mode (optional)
7. Add final UI polish & animations
8. Security audit & testing

**Deliverables:**

- ✅ No console errors/warnings
- ✅ Error messages are helpful & user-friendly
- ✅ Loading states appear for all data fetches
- ✅ Accessibility standards met (WCAG AA)
- ✅ App is production-ready

**Files Created:** `ErrorBoundary.jsx`, `ErrorLogger.js`, `Skeleton.jsx`

---

## Firestore Database Schema

---

### Collections

#### `admins/{uid}`

```
- email: string
- name: string
- role: "super_admin" | "manager" | "admin"
- createdAt: timestamp
- lastLogin: timestamp
- permissions: {
    canCreateProducts: boolean,
    canDeleteProducts: boolean,
    canManageOrders: boolean,
    canManageUsers: boolean,
    canManageAdmins: boolean,
    canViewAnalytics: boolean
  }
- active: boolean
```

#### `users/{uid}`

```
- email: string
- name: string
- phone: string
- address: string
- role: "user"
- createdAt: timestamp
- lastLogin: timestamp
- orderCount: number
- totalSpent: number
- active: boolean
```

#### `categories/{id}`

```
- name: string (unique)
- description: string
- banner: string (Cloudinary URL)
- icon: string (Cloudinary URL)
- productCount: number
- createdAt: timestamp
- updatedAt: timestamp
- active: boolean
```

#### `products/{id}`

```
- name: string
- description: string
- categoryId: string (reference)
- sku: string (unique)
- price: number
- cost: number
- discount: number (optional, percentage)
- finalPrice: number (calculated)
- stock: number
- images: string[] (Cloudinary URLs)
- status: "active" | "inactive" | "discontinued"
- createdAt: timestamp
- updatedAt: timestamp
- ratings: {
    average: number,
    count: number
  }
```

#### `orders/{id}`

```
- orderNumber: string (unique)
- userId: string (reference)
- items: [{
    productId: string,
    productName: string,
    quantity: number,
    price: number,
    subtotal: number
  }]
- subtotal: number
- tax: number
- shippingCost: number
- totalAmount: number
- status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
- paymentStatus: "pending" | "completed" | "failed" | "refunded"
- paymentMethod: string
- shippingAddress: string
- trackingNumber: string (optional)
- statusHistory: [{
    status: string,
    timestamp: timestamp,
    note: string
  }]
- createdAt: timestamp
- shippedAt: timestamp (optional)
- deliveredAt: timestamp (optional)
- refundId: string (optional, reference)
```

#### `inventory/{id}`

```
- productId: string (reference)
- quantity: number
- reorderPoint: number
- lastRestocked: timestamp
- status: "in_stock" | "low_stock" | "out_of_stock"
- logs: [{
    action: "restock" | "sale" | "adjustment" | "return",
    quantity: number,
    date: timestamp,
    adminId: string,
    note: string
  }]
```

#### `refunds/{id}`

```
- orderId: string (reference)
- userId: string (reference)
- amount: number
- reason: string
- status: "pending" | "approved" | "rejected" | "processed"
- requestedAt: timestamp
- processedAt: timestamp (optional)
- adminId: string (who processed it)
- notes: string
```

#### `coupons/{id}`

```
- code: string (unique)
- description: string
- discountType: "percentage" | "fixed"
- discountValue: number
- minOrderAmount: number (optional)
- maxUses: number
- usedCount: number
- expiryDate: timestamp
- active: boolean
- createdBy: string (adminId)
- createdAt: timestamp
```

#### `analyticsData/{id}` (Daily snapshots)

```
- date: string (YYYY-MM-DD)
- totalUsers: number
- totalOrders: number
- totalRevenue: number
- totalProducts: number
- newOrders: number
- salesByCategory: {categoryName: number}
- topProducts: [{productId, productName, sales}]
- conversionRate: number
```

#### `auditLogs/{id}`

```
- adminId: string
- adminEmail: string
- action: string (e.g., "create_product", "update_order_status")
- resource: string (e.g., "product", "order", "user")
- resourceId: string
- changes: {
    before: object,
    after: object
  }
- timestamp: timestamp
- ipAddress: string (optional)
- userAgent: string (optional)
- status: "success" | "failed"
- errorMessage: string (optional)
```

#### `notifications/{id}`

```
- adminId: string
- type: "order" | "stock" | "system" | "alert"
- title: string
- message: string
- data: object
- read: boolean
- createdAt: timestamp
- expiresAt: timestamp
```

---

## Feature Specifications

### 1. Admin Authentication & Access Control

**What Must Happen:**

- Only authorized users can access dashboard
- Login via Firebase Authentication with email/password
- Role-based access (admin, manager, super_admin)
- Session persistence across page refresh
- Secure logout

**Implementation Details:**

- AuthContext manages auth state
- ProtectedRoute wraps all dashboard pages
- Check role in Firestore `admins` collection
- Store auth token in localStorage (with expiration)
- Implement automatic token refresh

**Security:**

- Use Firebase security rules to prevent unauthorized writes
- Implement refresh token rotation
- Log all admin login attempts
- Enforce strong password requirements

---

### 2. Product Management System

**What Must Happen:**

- Full CRUD operations (Create, Read, Update, Delete)
- Upload images to Cloudinary
- Assign to categories
- Search and filter functionality
- Pagination for large datasets
- Status management (active/inactive/discontinued)

**Advanced Behavior:**

- Prevent invalid data entry (validation)
- Handle image upload failures gracefully
- Maintain SKU uniqueness
- Calculate final price (price - discount)
- Track product creation/update timestamps

**UI Components Needed:**

- Product table with sorting & pagination
- Product form modal (add/edit)
- Image upload preview
- Category selector dropdown
- Bulk action toolbar (delete, status change)

---

### 3. Order Management System

**What Must Happen:**

- View all orders with complete details
- Filter orders (by status, date range, customer)
- Update order status (pending → processing → shipped → delivered)
- Track order status history
- Search by order ID or customer name
- Export orders to CSV/Excel
- Send status update emails automatically

**Order Status Workflow:**

```
pending → processing → shipped → delivered
                   ↓
              cancelled (at any stage)
```

**Advanced Features:**

- Order timeline/history view
- Automatic email triggers on status change
- SMS notifications (optional)
- Refund management
- Payment status tracking

---

### 4. User Management

**What Must Happen:**

- View all registered users
- See user details (email, orders, total spent)
- Filter and search users
- View user order history
- Manage user status (active/suspended)

**Data Displayed:**

- User profile information
- Total orders placed
- Total amount spent
- Account creation date
- Last login date
- Active status

---

### 5. Dashboard Analytics

**What Must Show:**

- Total Users (count)
- Total Orders (count)
- Total Revenue ($)
- Total Products (count)
- Sales trend chart (7-day/30-day line chart)
- Orders per day/week bar chart
- Category distribution (pie/donut chart)
- Recent transactions table
- Top products by sales

**Real-time Updates:**

- Refresh every 30 seconds (configurable)
- Use Firestore real-time listeners
- Update charts dynamically
- Show loading state during refresh

---

### 6. Inventory Management

**What Must Happen:**

- Track product stock levels
- Set reorder points
- Show low-stock alerts
- Maintain stock history
- Prevent negative stock
- Update stock after orders
- Send low-stock email alerts

**Features:**

- Stock level visualization (in stock, low, out of stock)
- Bulk stock updates
- Reorder point configuration
- Inventory history logs
- Automatic alerts when stock <= reorder point

---

### 7. Notification System (Firebase Cloud Messaging)

**Triggers:**

- New order placed
- Order status changes
- Stock level drops below reorder point
- System alerts
- Admin activities

**Implementation:**

- Service Worker for push notifications
- Notification preferences per admin
- In-app notification center
- Notification history/logs
- Real-time badge count

---

### 8. Email System (Nodemailer)

**Email Types:**

1. **Order Confirmation** - Sent to customer on order creation
2. **Order Status Update** - Sent when order status changes
3. **Low Stock Alert** - Sent to admin when stock is low
4. **System Alerts** - Critical system notifications

**Implementation:**

- HTML email templates
- Scheduled email sending
- Retry logic for failed emails
- Email logging for debugging
- BCC admin for compliance

---

### 9. Category Management

**What Must Happen:**

- Create new categories
- Edit existing categories
- Delete categories (with validation)
- Prevent duplicate categories
- Assign products to categories
- Upload category banners/icons (Cloudinary)

**Constraints:**

- Category name must be unique
- Cannot delete category with active products (or reassign)
- Category icon/banner stored on Cloudinary

---

### 10. Refund Management (Advanced Feature)

**What Must Happen:**

- View refund requests
- Approve/reject refunds
- Process refunds (update payment status)
- Maintain refund history
- Send refund confirmation emails
- Track refunded items

---

### 11. Coupon Management (Advanced Feature)

**What Must Happen:**

- Create discount coupons
- Set discount type (percentage or fixed amount)
- Set usage limits
- Set expiration dates
- View active/expired coupons
- Track coupon usage
- Activate/deactivate coupons

---

### 12. Audit Logs (Advanced Feature)

**What Must Be Logged:**

- Every admin action (create, update, delete)
- Login/logout events
- Changes made (before & after values)
- IP address & browser info
- Timestamp of action
- Success/failure status

**Features:**

- Filter audit logs by date, admin, action type
- Export audit logs
- View detailed change history
- Search audit logs

---

## Backend Integration

### Cloud Functions Needed

1. **Order Creation Trigger** - Send confirmation email & update inventory
2. **Order Status Update** - Send status email & create notification
3. **Low Stock Alert** - Send admin email & in-app notification
4. **Analytics Update** - Run daily aggregations
5. **Refund Processing** - Process refund & send email
6. **Coupon Usage** - Track coupon usage

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admins only
    match /admins/{document=**} {
      allow read, write: if request.auth.uid != null &&
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role in ['super_admin', 'manager'];
    }

    // Products - read by all, write by admins
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth.uid != null &&
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.canCreateProducts == true;
    }

    // Orders - read/write by admins, read own by users
    match /orders/{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if request.auth.uid != null &&
        get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.canManageOrders == true;
    }

    // Audit logs - admin only
    match /auditLogs/{document=**} {
      allow read: if request.auth.uid != null;
      allow write: if false; // Only backend can write
    }
  }
}
```

### API Endpoints (If Backend API Used)

```
POST   /api/orders                 - Create order
GET    /api/orders                 - Get all orders
GET    /api/orders/:id             - Get order details
PATCH  /api/orders/:id/status      - Update order status
POST   /api/products               - Create product
GET    /api/products               - Get all products
PATCH  /api/products/:id           - Update product
DELETE /api/products/:id           - Delete product
POST   /api/coupons                - Create coupon
GET    /api/coupons                - Get coupons
POST   /api/refunds                - Create refund request
PATCH  /api/refunds/:id/process    - Process refund
```

---

## Advanced Features (Optional for Strong Interns)

**Priority: CRITICAL** - Must complete before other features

#### Tasks

1. **Fix Layout component rendering bug**
   - File: `src/components/Layout/Layout.jsx`
   - Change: `<children />` → `{children}`
   - Why: JSX fragments cannot use component-like syntax

2. **Enable real Firebase authentication**
   - File: `src/context/AuthContext.jsx`
   - Action: Uncomment the real auth logic (currently commented out)
   - Action: Remove hardcoded dev user
   - Why: Security requirement for production

3. **Create `.env.local` setup**
   - Create `.env.example` template
   - Document required Firebase credentials
   - Instructions for users to add their own credentials

4. **Implement logout functionality**
   - File: `src/components/Navbar.jsx`
   - Add: Logout button in profile dropdown
   - Action: Call `signOut()` from Firebase auth

5. **Fix ProtectedRoute redirect**
   - File: `src/components/ProtectedRoute.jsx`
   - Change: Redirect to `/admin` instead of `/login`
   - Why: `/login` doesn't exist; should send to admin login page

6. **Add login success redirect**
   - File: `src/pages/AdminLogin.jsx`
   - After successful login, redirect to `/dashboard`

7. **Implement role-based access**
   - Verify user has `role: "admin"` before accessing dashboard
   - Restrict access to non-admin users

#### Verification Checklist

- [ ] No console errors on page load
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials shows error
- [ ] Logout button appears and clears session
- [ ] Session persists on page refresh
- [ ] Only admins can access `/dashboard`
- [ ] Non-admins are redirected to login

#### Files to Modify

- `src/context/AuthContext.jsx`
- `src/components/Layout/Layout.jsx`
- `src/components/Navbar.jsx`
- `src/components/ProtectedRoute.jsx`
- `src/pages/AdminLogin.jsx`
- `src/App.jsx` (update routes if needed)

#### Files to Create

- `.env.local` (user provides credentials)
- `.env.example` (template)

---

### Phase 2: Dashboard Overview (Days 2-3)

**Focus:** Admin KPIs and real-time analytics

#### Tasks

1. **Design dashboard metrics schema**
   - Total Revenue (sum of all orders)
   - Total Orders (count)
   - Total Products (count)
   - Active Users (count)
   - Conversion Rate (percentage)
   - Average Order Value (AOV)

2. **Create Firestore aggregation queries**
   - Build queries to fetch metrics
   - Implement real-time listeners for live updates
   - Add pagination for large datasets

3. **Build DataCard component**
   - Display metric name, value, percentage change
   - Color coding (green for increases, red for decreases)
   - Optional: Sparkline chart in card

4. **Create dashboard grid layout**
   - 4-6 metric cards in responsive grid
   - Recent orders table (last 10 orders)
   - Top products section (top 5 by sales)
   - Revenue trend chart (7-day chart)

5. **Implement chart component**
   - Library: Chart.js or Recharts
   - Show revenue trends over last 7 days
   - Show order volume trends
   - Make charts interactive

6. **Add real-time updates**
   - Use Firestore real-time listeners
   - Update metrics as data changes
   - Avoid page refresh for updates

#### Verification Checklist

- [ ] Dashboard page loads without errors
- [ ] All metric cards display correct values
- [ ] Charts render with correct data
- [ ] Recent orders table shows latest orders
- [ ] Data updates in real-time when Firestore changes
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Loading state appears while fetching data
- [ ] API calls complete within 2 seconds

#### Files to Modify

- `src/pages/Dashboard.jsx` (build main layout)
- `src/components/DataCard.jsx` (implement component)
- `src/components/Navbar.jsx` (add search functionality)

#### Files to Create

- `src/hooks/useDashboardMetrics.js` (custom hook for metrics)
- `src/utils/firebaseQueries.js` (reusable Firestore queries)
- `src/components/RevenueChart.jsx` (revenue trend chart)
- `src/components/OrdersChart.jsx` (order volume chart)
- `src/components/RecentOrders.jsx` (recent orders table)
- `src/components/TopProducts.jsx` (top products section)

---

### Phase 3: Product Management (Days 3-5)

**Focus:** Full CRUD operations for products

#### Tasks

1. **Create Firestore products collection schema**
   - Collections/fields: `products/{id}` with fields:
     - `name` (string)
     - `sku` (string, unique)
     - `category` (string)
     - `price` (number)
     - `cost` (number)
     - `stock` (number)
     - `images` (array of URLs)
     - `description` (string)
     - `active` (boolean)
     - `createdAt` (timestamp)
     - `updatedAt` (timestamp)

2. **Build Products page with table view**
   - Display all products in table format
   - Columns: SKU, Name, Category, Price, Stock, Status, Actions
   - Sorting by any column
   - Filtering by category, price range, stock status

3. **Implement Add Product modal**
   - Form with all product fields
   - Form validation (required fields, price > 0, stock >= 0)
   - Image upload preview
   - Submit button triggers Firestore `add()`

4. **Implement Edit Product modal**
   - Pre-populate form with existing product data
   - Modal title indicates "Edit" mode
   - Submit button triggers Firestore `update()`

5. **Implement Delete Product**
   - Confirmation dialog before delete
   - Triggers Firestore `delete()`
   - Remove from UI table immediately
   - Show success message

6. **Add product search**
   - Real-time search by name or SKU
   - Filters results as user types
   - Client-side filtering for small datasets, server-side for large

7. **Add bulk actions**
   - Checkbox to select multiple products
   - Bulk delete with confirmation
   - Bulk status change (activate/deactivate)

#### Verification Checklist

- [ ] Products page loads with all products displayed
- [ ] Add product: Form validates inputs and saves to Firestore
- [ ] Edit product: Form pre-populates and updates data
- [ ] Delete product: Confirmation appears, product removed from Firestore and UI
- [ ] Search filters products in real-time
- [ ] Sorting works on all columns
- [ ] Filtering by category/price/stock works
- [ ] Bulk actions select and modify multiple products
- [ ] All operations show loading state
- [ ] Success/error messages appear after operations

#### Files to Modify

- `src/App.jsx` (add `/products` route)
- `src/components/Sidebar.jsx` (add Products link)

#### Files to Create

- `src/pages/Products.jsx` (main products page)
- `src/components/ProductTable.jsx` (table component)
- `src/components/ProductForm.jsx` (add/edit form modal)
- `src/hooks/useProducts.js` (hook for product operations)

---

### Phase 4: Order Management (Days 5-6)

**Focus:** Order tracking and status management

#### Tasks

1. **Create Firestore orders collection schema**
   - Collection/fields: `orders/{id}` with fields:
     - `orderNumber` (string, unique)
     - `customerId` (string)
     - `customerName` (string)
     - `customerEmail` (string)
     - `items` (array of objects with productId, quantity, price)
     - `totalAmount` (number)
     - `status` (string: pending, processing, shipped, delivered)
     - `shippingAddress` (string)
     - `paymentMethod` (string)
     - `createdAt` (timestamp)
     - `shippedAt` (timestamp, optional)
     - `deliveredAt` (timestamp, optional)

2. **Build Orders page with table view**
   - Display all orders in table format
   - Columns: Order#, Customer, Amount, Status, Created Date, Actions
   - Sorting by any column
   - Filtering by status, date range, customer

3. **Implement order filtering**
   - Filter by status (pending, processing, shipped, delivered)
   - Filter by date range (start date to end date)
   - Filter by customer name or email
   - Combine multiple filters

4. **Build order details modal**
   - Show complete order information
   - List all items in order with quantities and prices
   - Show customer contact info
   - Show order timeline (created → shipped → delivered)
   - Allow status update from modal

5. **Implement order status update**
   - Dropdown or button group to change status
   - Status flow: pending → processing → shipped → delivered
   - Update Firestore with new status
   - Update `shippedAt` and `deliveredAt` timestamps automatically

6. **Add order search**
   - Search by order number
   - Search by customer name or email
   - Results update in real-time

7. **Create order export to CSV**
   - Generate CSV file with order data
   - Include columns: Order#, Customer, Amount, Status, Date
   - Download as `orders-export-YYYY-MM-DD.csv`

#### Verification Checklist

- [ ] Orders page loads with all orders displayed
- [ ] Table shows correct columns and data
- [ ] Sorting works on all columns
- [ ] Filtering by status/date/customer works
- [ ] Order details modal opens and shows all info
- [ ] Status update changes Firestore and UI immediately
- [ ] Status timestamps update correctly
- [ ] Search filters orders in real-time
- [ ] CSV export generates correct file
- [ ] All operations show loading state
- [ ] Success/error messages appear

#### Files to Modify

- `src/App.jsx` (add `/orders` route)
- `src/components/Sidebar.jsx` (add Orders link)

#### Files to Create

- `src/pages/Orders.jsx` (main orders page)
- `src/components/OrderTable.jsx` (table component)
- `src/components/OrderDetailsModal.jsx` (order detail view)
- `src/hooks/useOrders.js` (hook for order operations)
- `src/utils/exportCSV.js` (utility function for CSV export)

---

### Phase 5: Inventory Management (Days 6-7)

**Focus:** Stock level tracking and alerts

#### Tasks

1. **Create Firestore inventory collection schema**
   - Collection/fields: `inventory/{id}` with fields:
     - `productId` (string, reference to products)
     - `quantity` (number)
     - `reorderPoint` (number - alert threshold)
     - `lastRestocked` (timestamp)
     - `logs` (array of objects: {action, quantity, date, note})

2. **Build Inventory page**
   - Display stock levels for all products
   - Columns: Product, Current Stock, Reorder Point, Status, Last Restocked, Actions
   - Highlight low-stock items (stock < reorderPoint) in red/orange
   - Show status badge (In Stock, Low Stock, Out of Stock)

3. **Implement low-stock alerts**
   - Visual highlighting for items below reorder point
   - Alert section at top of inventory page
   - Count of products that need restocking
   - Click to view all low-stock items

4. **Add bulk stock updates**
   - Select multiple products
   - Update quantity for all selected items at once
   - Bulk increase/decrease stock
   - Add restock note (e.g., "Received new shipment")

5. **Configure reorder points**
   - Form to set reorder point per product
   - Default suggestion based on average sales velocity
   - Save to Firestore

6. **Create inventory history/logs**
   - For each inventory change, log it
   - Track: action (restock/sale/adjustment), quantity, user, timestamp, note
   - Display history timeline in UI
   - Filter history by product, date range, action type

7. **Add reorder alerts**
   - Automatically trigger when stock <= reorderPoint
   - Show in dashboard notification center
   - Email notification to admin (optional Phase 7)

#### Verification Checklist

- [ ] Inventory page loads with all products and stock levels
- [ ] Low-stock items are highlighted correctly
- [ ] Status badges show correct status (In Stock/Low/Out)
- [ ] Reorder point can be configured per product
- [ ] Bulk stock updates work correctly
- [ ] Inventory logs record all changes with details
- [ ] History timeline shows all changes with timestamps
- [ ] Low-stock alerts appear when threshold is hit
- [ ] Search and filter work on inventory page
- [ ] All operations show loading state

#### Files to Modify

- `src/App.jsx` (add `/inventory` route)
- `src/components/Sidebar.jsx` (add Inventory link)
- `src/pages/Dashboard.jsx` (add inventory alerts widget)

#### Files to Create

- `src/pages/Inventory.jsx` (main inventory page)
- `src/components/InventoryTable.jsx` (inventory table)
- `src/components/StockAlerts.jsx` (low-stock alerts)
- `src/components/InventoryHistory.jsx` (history timeline)
- `src/hooks/useInventory.js` (hook for inventory operations)

---

### Phase 6: Settings & Admin Management (Days 7-8)

**Focus:** System configuration and admin controls

#### Tasks

1. **Build Settings page**
   - Sections: Admin Profile, Admin Users, System Settings, Activity Logs

2. **Implement admin profile management**
   - Edit form with: name, email, phone
   - Update password functionality
   - Profile picture upload
   - Two-factor authentication option (optional)

3. **Build admin user management**
   - List all admin users
   - Add new admin (invite via email)
   - Remove admin with confirmation
   - View admin permissions
   - View admin activity logs
   - Suspend/reactivate admin accounts

4. **Create system settings**
   - Store information (name, logo, address, phone)
   - Email notification preferences
   - Dashboard refresh rate settings
   - Default currency and timezone

5. **Implement activity logs**
   - Audit trail of all admin actions
   - Log: who (admin), what (action), when (timestamp), details
   - Actions to track: login, logout, add/edit/delete products, change order status, change inventory, etc.
   - Filter logs by date, admin, action type
   - Export logs to CSV

6. **Add data backup/export**
   - Export products as CSV/JSON
   - Export orders as CSV/JSON
   - Export inventory as CSV/JSON
   - Schedule automated backups (optional)
   - Download backup files

#### Verification Checklist

- [ ] Settings page loads without errors
- [ ] Admin can update their profile and changes save
- [ ] Password change functionality works
- [ ] New admins can be added and email invite sent
- [ ] Admins can be removed with confirmation
- [ ] Activity logs record all actions
- [ ] Logs can be filtered by date, admin, action
- [ ] CSV/JSON exports generate correct files
- [ ] System settings persist in Firestore
- [ ] All operations show loading state

#### Files to Modify

- `src/App.jsx` (add `/settings` route)
- `src/components/Sidebar.jsx` (add Settings link)

#### Files to Create

- `src/pages/Settings.jsx` (main settings page)
- `src/components/AdminProfile.jsx` (admin profile form)
- `src/components/AdminUsers.jsx` (admin user management)
- `src/components/SystemSettings.jsx` (system settings)
- `src/components/ActivityLogs.jsx` (activity audit trail)
- `src/hooks/useActivityLogs.js` (hook for activity operations)
- `src/utils/exportData.js` (utility for data exports)

---

### Phase 7: Polish & Optimization (Days 8-10)

**Focus:** UI/UX improvements, error handling, performance

#### Tasks

1. **Add error boundaries**
   - Create ErrorBoundary component
   - Catch component rendering errors
   - Display user-friendly error message
   - Log error to console for debugging

2. **Implement loading skeletons**
   - Create Skeleton component variants
   - Show skeleton while data is loading
   - Replace skeleton with actual content when loaded
   - Apply to: tables, cards, forms

3. **Add toast notifications**
   - Toast component for success/error/info messages
   - Auto-dismiss after 3 seconds
   - Allow manual dismiss
   - Position: top-right corner
   - Examples: "Product saved successfully", "Error: Invalid data"

4. **Optimize Firestore queries**
   - Add composite indexes for complex queries
   - Implement pagination for large tables (limit to 10-25 items per page)
   - Use query caching where appropriate
   - Batch Firestore writes for bulk operations

5. **Add keyboard shortcuts**
   - Ctrl+K or Cmd+K to open command palette
   - Ctrl+N or Cmd+N to add new product
   - Ctrl+F or Cmd+F to focus search
   - ESC to close modals
   - Tab navigation for forms

6. **Implement dark mode (optional)**
   - Toggle dark mode in settings
   - Save preference to localStorage
   - Apply Tailwind dark mode classes
   - Ensure contrast meets accessibility standards

7. **Performance optimization**
   - Lazy load pages (code splitting)
   - Memoize expensive components (React.memo)
   - Optimize re-renders with useCallback
   - Image optimization and lazy loading
   - Minify and optimize bundle

8. **Add accessibility features**
   - ARIA labels for screen readers
   - Proper heading hierarchy
   - Keyboard navigation
   - Color contrast compliance (WCAG AA)
   - Alt text for images

#### Verification Checklist

- [ ] No console errors or warnings
- [ ] Loading states appear while fetching data
- [ ] Toast notifications appear for all operations
- [ ] Error messages are helpful and user-friendly
- [ ] App performs smoothly with large datasets
- [ ] Mobile view is fully usable
- [ ] Keyboard shortcuts work as expected
- [ ] Accessibility requirements met (WAVE, axe)
- [ ] Dark mode toggle works and settings persist
- [ ] Bundle size is optimized

#### Files to Create

- `src/components/ErrorBoundary.jsx` (error boundary wrapper)
- `src/components/Skeleton.jsx` (loading skeleton component)
- `src/components/Toast.jsx` (toast notification component)
- `src/components/CommandPalette.jsx` (keyboard shortcut handler)
- `src/hooks/useToast.js` (custom hook for toast)
- `src/hooks/useKeyboardShortcuts.js` (keyboard shortcuts hook)
- `src/utils/accessibilityHelpers.js` (accessibility utilities)

#### Files to Modify

- `src/App.jsx` (wrap with ErrorBoundary)
- All pages and components (add loading states, error handling)

---

## File Structure

### Current Structure

```
src/
├── App.jsx                          # Main router component
├── main.jsx                         # React DOM entry
├── index.css                        # Global styles
├── firebase/
│   └── config.js                   # Firebase initialization
├── context/
│   └── AuthContext.jsx             # Auth state management
├── pages/
│   ├── AdminLogin.jsx              # Login page
│   └── Dashboard.jsx               # Dashboard (empty)
├── components/
│   ├── Layout/
│   │   └── Layout.jsx              # Main layout wrapper
│   ├── UI/
│   │   └── SideBarList.jsx         # Sidebar list renderer
│   ├── DataCard.jsx                # Metric card (stub)
│   ├── Navbar.jsx                  # Top navigation
│   ├── Sidebar.jsx                 # Side navigation
│   └── ProtectedRoute.jsx          # Route protection
```

### After Implementation

```
src/
├── App.jsx
├── main.jsx
├── index.css
├── firebase/
│   └── config.js
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── AdminLogin.jsx
│   ├── Dashboard.jsx               # Dashboard with metrics
│   ├── Products.jsx                # Product management
│   ├── Orders.jsx                  # Order management
│   ├── Inventory.jsx               # Stock management
│   └── Settings.jsx                # Admin settings
├── components/
│   ├── Layout/
│   │   └── Layout.jsx
│   ├── UI/
│   │   ├── SideBarList.jsx
│   │   ├── Skeleton.jsx            # NEW: Loading skeleton
│   │   ├── Toast.jsx               # NEW: Toast notifications
│   │   └── ErrorBoundary.jsx       # NEW: Error boundary
│   ├── DataCard.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── ProtectedRoute.jsx
│   ├── RevenueChart.jsx            # NEW: Revenue chart
│   ├── OrdersChart.jsx             # NEW: Orders chart
│   ├── RecentOrders.jsx            # NEW: Recent orders table
│   ├── TopProducts.jsx             # NEW: Top products section
│   ├── ProductTable.jsx            # NEW: Product table
│   ├── ProductForm.jsx             # NEW: Add/edit product form
│   ├── OrderTable.jsx              # NEW: Order table
│   ├── OrderDetailsModal.jsx       # NEW: Order details view
│   ├── InventoryTable.jsx          # NEW: Inventory table
│   ├── InventoryHistory.jsx        # NEW: Stock history
│   ├── StockAlerts.jsx             # NEW: Low-stock alerts
│   ├── AdminProfile.jsx            # NEW: Admin profile
│   ├── AdminUsers.jsx              # NEW: Admin management
│   ├── SystemSettings.jsx          # NEW: System settings
│   ├── ActivityLogs.jsx            # NEW: Activity audit trail
│   └── CommandPalette.jsx          # NEW: Keyboard shortcuts
├── hooks/
│   ├── useDashboardMetrics.js      # NEW: Dashboard metrics hook
│   ├── useProducts.js              # NEW: Product operations hook
│   ├── useOrders.js                # NEW: Order operations hook
│   ├── useInventory.js             # NEW: Inventory operations hook
│   ├── useActivityLogs.js          # NEW: Activity logs hook
│   ├── useToast.js                 # NEW: Toast hook
│   └── useKeyboardShortcuts.js     # NEW: Keyboard shortcuts hook
├── utils/
│   ├── firebaseQueries.js          # NEW: Reusable queries
│   ├── exportCSV.js                # NEW: CSV export utility
│   ├── exportData.js               # NEW: Data export utility
│   └── accessibilityHelpers.js     # NEW: A11y helpers
└── index.html
```

---

## Firestore Schema

### Collections Structure

#### `users` Collection

```javascript
users/{uid}
  - email: string                    // User email
  - name: string                     // Full name
  - role: "admin" | "user"          // User role
  - createdAt: timestamp             // Account creation date
  - lastLogin: timestamp             // Last login date
  - phone: string                    // Phone number
  - profilePhoto: string             // Photo URL
  - twoFactorEnabled: boolean        // 2FA status
```

#### `products` Collection

```javascript
products/{id}
  - name: string                     // Product name
  - sku: string                      // Stock keeping unit (unique)
  - category: string                 // Product category
  - price: number                    // Selling price
  - cost: number                     // Cost price
  - stock: number                    // Current stock quantity
  - images: string[]                 // Array of image URLs
  - description: string              // Product description
  - active: boolean                  // Is product active
  - createdAt: timestamp             // Creation date
  - updatedAt: timestamp             // Last update date
```

#### `orders` Collection

```javascript
orders/{id}
  - orderNumber: string              // Unique order number
  - customerId: string               // Reference to customer
  - customerName: string             // Customer full name
  - customerEmail: string            // Customer email
  - items: array[{
      productId: string,
      productName: string,
      quantity: number,
      price: number                  // Price at time of order
    }]
  - totalAmount: number              // Order total
  - status: "pending" | "processing" | "shipped" | "delivered"
  - shippingAddress: string          // Full shipping address
  - paymentMethod: string            // How they paid
  - createdAt: timestamp             // Order creation date
  - shippedAt: timestamp             // When shipped (null if not shipped)
  - deliveredAt: timestamp           // When delivered (null if not delivered)
```

#### `inventory` Collection

```javascript
inventory/{id}
  - productId: string                // Reference to product
  - quantity: number                 // Current quantity
  - reorderPoint: number             // Alert threshold
  - lastRestocked: timestamp         // Last restock date
  - logs: array[{
      action: "restock" | "sale" | "adjustment",
      quantity: number,
      date: timestamp,
      note: string,
      adminId: string
    }]
```

#### `adminActivity` Collection

```javascript
adminActivity/{id}
  - adminId: string                  // Admin who performed action
  - adminEmail: string               // Admin email
  - action: string                   // Action type (e.g., "create_product")
  - resource: string                 // Resource affected (e.g., "product")
  - resourceId: string               // ID of resource
  - timestamp: timestamp             // When action occurred
  - details: object                  // Additional details
  - ipAddress: string                // IP address (optional)
  - userAgent: string                // Browser info (optional)
```

#### `systemSettings` Collection

```javascript
systemSettings/{key}
  - storeName: string                // Store/company name
  - storeLogo: string                // Logo URL
  - storeAddress: string             // Physical address
  - storePhone: string               // Phone number
  - storeEmail: string               // Contact email
  - currency: string                 // Default currency (USD, EUR, etc)
  - timezone: string                 // Store timezone
  - notificationsEnabled: boolean    // Email notifications on/off
  - dashboardRefreshRate: number     // Seconds (default 30)
```

---

## Custom Hooks

### `useDashboardMetrics()`

```javascript
// Fetches all dashboard KPIs and real-time updates
const {
  metrics: { totalRevenue, totalOrders, totalProducts, activeUsers },
  loading,
  error,
  refreshMetrics,
} = useDashboardMetrics();
```

### `useProducts()`

```javascript
// CRUD operations for products with search/filter
const {
  products,
  loading,
  error,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  filterByCategory,
  sortBy,
} = useProducts();
```

### `useOrders()`

```javascript
// CRUD operations for orders with filtering
const {
  orders,
  loading,
  error,
  updateOrderStatus,
  filterByStatus,
  filterByDateRange,
  searchOrders,
  exportToCSV,
} = useOrders();
```

### `useInventory()`

```javascript
// Inventory management with alerts
const {
  inventory,
  loading,
  error,
  updateStock,
  setReorderPoint,
  getLowStockItems,
  getInventoryHistory,
  bulkUpdateStock,
} = useInventory();
```

### `useActivityLogs()`

```javascript
// Audit trail management
const { logs, loading, error, logAction, filterLogs, exportLogs } =
  useActivityLogs();
```

### `useToast()`

```javascript
// Toast notification management
const { showToast } = useToast();

// Usage
showToast({
  type: "success", // 'success' | 'error' | 'info'
  message: "Saved!",
  duration: 3000,
});
```

### `useKeyboardShortcuts()`

```javascript
// Register and handle keyboard shortcuts
const { registerShortcut } = useKeyboardShortcuts();

registerShortcut("ctrl+k", () => {
  // Open command palette
});
```

---

## Verification Checklist

### Phase 1 Verification

- [ ] Layout component renders without errors
- [ ] Real Firebase auth is enabled and working
- [ ] Login with valid admin credentials succeeds
- [ ] Login with invalid credentials shows error
- [ ] Logout button appears and functions
- [ ] Session persists on page refresh
- [ ] Non-admins are denied access to dashboard
- [ ] No console errors or warnings

### Phase 2 Verification

- [ ] Dashboard page loads successfully
- [ ] All metric cards display correct values from Firestore
- [ ] Revenue chart renders with data
- [ ] Recent orders table shows latest 10 orders
- [ ] Data updates in real-time when Firestore changes
- [ ] Responsive layout works on all screen sizes
- [ ] Loading state shows while fetching data
- [ ] Error messages appear if fetch fails

### Phase 3 Verification

- [ ] Products page loads with all products
- [ ] Add product form validates and saves to Firestore
- [ ] Edit product form pre-populates and updates correctly
- [ ] Delete product shows confirmation and removes data
- [ ] Search filters products in real-time
- [ ] Sorting works on all table columns
- [ ] Filtering by category/price/stock works
- [ ] Bulk operations select multiple products
- [ ] No console errors

### Phase 4 Verification

- [ ] Orders page loads with all orders
- [ ] Table displays correct order information
- [ ] Filtering by status/date/customer works
- [ ] Order details modal opens and shows complete info
- [ ] Status updates sync to Firestore immediately
- [ ] CSV export generates correct file
- [ ] Search filters orders in real-time
- [ ] No console errors

### Phase 5 Verification

- [ ] Inventory page shows all products with stock levels
- [ ] Low-stock items are highlighted correctly
- [ ] Reorder point can be set per product
- [ ] Bulk stock updates work
- [ ] Inventory history records all changes
- [ ] Low-stock alerts trigger correctly
- [ ] Responsive design works
- [ ] No console errors

### Phase 6 Verification

- [ ] Settings page loads all sections
- [ ] Admin profile can be updated
- [ ] New admins can be added via email
- [ ] Admins can be removed with confirmation
- [ ] Activity logs display all actions
- [ ] Data exports generate correct files
- [ ] System settings persist
- [ ] No console errors

### Phase 7 Verification

- [ ] ErrorBoundary catches and displays errors
- [ ] Loading skeletons appear during data fetch
- [ ] Toast notifications show for all operations
- [ ] Keyboard shortcuts work as expected
- [ ] App performs smoothly with large datasets
- [ ] Mobile view is fully usable
- [ ] Dark mode toggle works (if implemented)
- [ ] Accessibility features meet WCAG AA standards
- [ ] No console errors or warnings
- [ ] Bundle is optimized and loads quickly

---

## Architecture & Decisions

### Firebase-First Architecture

- **Decision**: Use Firestore as primary database, no backend API
- **Reasoning**: Faster development, real-time capabilities, built-in auth
- **Trade-offs**: Security rules must be carefully configured, data validation on client side

### Role-Based Access Control

- **Decision**: Only users with `role: "admin"` can access dashboard
- **Implementation**: Check role in AuthContext before rendering ProtectedRoute
- **Future**: Extend to fine-grained permissions (e.g., can_edit_products, can_delete_orders)

### Real-Time Updates

- **Decision**: Use Firestore real-time listeners instead of polling
- **Implementation**: Set up onSnapshot listeners in custom hooks
- **Benefit**: Automatic UI updates when data changes, better performance

### Form Validation

- **Decision**: Use React Hook Form + Yup (already in dependencies)
- **Implementation**: Define Yup schemas for each form type
- **Benefit**: Client-side validation, built-in error handling

### Custom UI Components

- **Decision**: Build components with Tailwind CSS (no external UI library)
- **Reasoning**: Full control, smaller bundle size, consistency
- **Trade-off**: More time to build, but more flexible

### No TypeScript (Initially)

- **Decision**: Use JavaScript for faster development
- **Future**: Can migrate to TypeScript incrementally if needed
- **Reasoning**: Faster prototyping, lower setup complexity

### Pagination for Large Datasets

- **Decision**: Implement pagination (10-25 items per page) for orders/products
- **Reasoning**: Better performance, manageable UI
- **Implementation**: Firestore `.limit()` and `.offset()` queries

---

## Key Decisions Summary

| Decision           | Choice                | Why                                          |
| ------------------ | --------------------- | -------------------------------------------- |
| Database           | Firestore             | Real-time, scalable, authentication built-in |
| Frontend Framework | React 19              | Latest version, better performance           |
| Build Tool         | Vite                  | Faster build times, better DX                |
| Styling            | Tailwind CSS          | Utility-first, responsive design             |
| Form Library       | React Hook Form + Yup | Efficient, validation, already installed     |
| Auth Method        | Email/Password        | Simple, secure, admin-focused                |
| UI Library         | None (custom)         | Full control, smaller bundle                 |
| State Management   | Context API           | Sufficient for this app size                 |
| Database Updates   | Real-time listeners   | Automatic UI sync                            |

---

## Further Considerations

### Security

- [ ] Set up proper Firestore security rules (admin-only access)
- [ ] Implement email verification for admin accounts
- [ ] Add rate limiting on login attempts
- [ ] Use HTTPS for all communications
- [ ] Store sensitive data securely
- [ ] Regular security audits

### Performance

- [ ] Monitor Firestore read/write operations
- [ ] Optimize queries with proper indexing
- [ ] Implement caching for frequently accessed data
- [ ] Lazy load components and pages
- [ ] Monitor bundle size
- [ ] Regular performance profiling

### Backup & Disaster Recovery

- [ ] Regular Firestore exports
- [ ] Implement backup to cloud storage
- [ ] Document recovery procedures
- [ ] Test backup restoration regularly

### Monitoring & Logging

- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Monitor Firestore performance
- [ ] Track user actions and admin activity
- [ ] Set up alerts for critical errors

### Scalability

- [ ] Plan for pagination at 1000+ products
- [ ] Set up Firestore indexes for complex queries
- [ ] Consider sharding for high-traffic collections
- [ ] Monitor and optimize hot documents

### Future Enhancements

- [ ] Multi-language support (i18n)
- [ ] Advanced analytics (custom reports, dashboards)
- [ ] Webhook integrations
- [ ] API for external systems
- [ ] Mobile app version
- [ ] Advanced search (Firestore full-text search)
- [ ] AI-powered recommendations
- [ ] Automated workflows (inventory alerts, order notifications)

---

## Quick Start Checklist

Before starting implementation:

1. [ ] Clone/open project in VS Code
2. [ ] Install dependencies: `npm install`
3. [ ] Create `.env.local` with Firebase credentials
4. [ ] Verify Firebase connection works
5. [ ] Run app: `npm run dev`
6. [ ] Test login page loads
7. [ ] Create Firestore collections with sample data
8. [ ] Review this roadmap thoroughly
9. [ ] Choose starting phase (recommend Phase 1)
10. [ ] Begin implementation following phases

---

## Support & Resources

### Firebase Documentation

- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Security Rules](https://firebase.google.com/docs/firestore/security/start)

### React & Vite

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)

### Tailwind CSS

- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Component Examples](https://tailwindcss.com/components)

### Form Libraries

- [React Hook Form](https://react-hook-form.com)
- [Yup Validation](https://github.com/jquense/yup)

---

**Last Updated**: April 24, 2026
**Project**: E-Commerce Admin Dashboard
**Status**: Ready for Phase 1 Implementation
