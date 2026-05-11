Goal

Implement Section 2 of roadmap.md (Advanced Data Handling) for products and orders, with these decisions locked:

Non-realtime useQuery / useInfiniteQuery + getDocs (no onSnapshot).

"Load More" pagination (replaces page numbers).

Add Product flow built as a separate modal alongside the Edit modal.

Architecture

flowchart LR
subgraph App
Main["main.jsx"] --> QCP["QueryClientProvider"]
QCP --> Pages["Pages (ProductStock, OrderList)"]
end
Pages -->|"useInfiniteQuery"| Hooks["useProducts / useOrders"]
Hooks -->|"getDocs + startAfter"| FS[(Firestore)]
Pages -->|"useMutation"| Hooks
Hooks -->|"invalidateQueries"| QC["QueryCache"]
QC --> Pages

Current state (relevant)

src/hooks/useProductStock.js and src/hooks/useOrderList.js use onSnapshot and download the entire collection.

src/pages/ProductStock.jsx and src/pages/OrderList.jsx paginate client-side via .slice() and have page-number buttons.

The "Add Product" button at line ~393 of ProductStock is a no-op.

EditModal in ProductStock.jsx uses useState form state, no validation.

Changes

1. Install + wire TanStack Query

Add @tanstack/react-query to package.json.

In src/main.jsx wrap <App /> in <QueryClientProvider client={queryClient}>, inside <AuthProvider>.

Defaults: staleTime: 30_000, refetchOnWindowFocus: false, retry: 1.

2. New hook: src/hooks/useProducts.js (delete useProductStock.js)

useProducts(pageSize = 20): useInfiniteQuery({ queryKey: ['products'], queryFn, getNextPageParam }).

queryFn({ pageParam }): query(collection(db, 'products'), orderBy('createdAt', 'desc'), startAfter(pageParam), limit(pageSize)) (omit startAfter for the first page); returns { items, lastDoc }.

getNextPageParam(lastPage): returns lastPage.lastDoc if items.length === pageSize, else undefined.

useAddProduct(): addDoc(... , { ...data, createdAt: serverTimestamp() }) + invalidate ['products'].

useUpdateProduct(): updateDoc(... , { ...data, updatedAt: serverTimestamp() }) + invalidate.

useDeleteProduct(): deleteDoc(...) + invalidate.

3. New hook: src/hooks/useOrders.js (delete useOrderList.js)

useOrders(pageSize = 20): same useInfiniteQuery pattern over orders.

useUpdateOrderStatus(): updateDoc(... , { status, updatedAt }) + invalidate.

4. Refactor src/pages/ProductStock.jsx

Switch to useProducts(); flatten data.pages to a single products array via useMemo.

Remove page-number pagination; replace with a Load More button (disabled when !hasNextPage, "Loading..." when isFetchingNextPage).

Add a caveat note above filters: "Filters and search apply to loaded products. Click Load More to fetch more."

Refactor EditModal to RHF + Yup: useForm({ resolver: yupResolver(productSchema), defaultValues: product }), inline field errors.

New AddProductModal (RHF + Yup, empty defaults). Wire it to the existing Add Product button.

Replace direct mutations with useAddProduct, useUpdateProduct, useDeleteProduct.

5. Refactor src/pages/OrderList.jsx

Switch to useOrders(); flatten pages; remove page-number pagination; add Load More.

Same caveat note above filters.

Wire OrderDetail's status buttons to useUpdateOrderStatus.

6. Yup schema

const productSchema = yup.object({
name: yup.string().trim().required("Name is required"),
category: yup.string().required("Category is required"),
price: yup.number().typeError("Price must be a number").min(0).required(),
piece: yup
.number()
.typeError("Stock must be a number")
.integer()
.min(0)
.required(),
});

Place inline in ProductStock.jsx for now; can be extracted to src/lib/schemas.js later.

Out of scope

useInbox refactor.

Server-side filtering/sorting (would require Firestore composite indexes).

firestore.rules (deferred from Section 1).

Sections 3-5 of the roadmap.

Caveats to surface during implementation

No live updates: another admin's changes won't appear until refetch.

Filter scope: client-side filters only see loaded pages; user must Load More to filter further.
