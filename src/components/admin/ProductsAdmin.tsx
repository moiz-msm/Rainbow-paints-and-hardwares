import React, { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  writeBatch,
} from "firebase/firestore";
import { Download, Search, Trash2, Plus, Database, CheckCircle, X, Edit, Edit3 } from "lucide-react";
import { downloadExcel } from "../../utils/excelExport";
import { mockProducts } from "../../data";
import ProductFormModal from "./ProductFormModal";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [dbBrands, setDbBrands] = useState<any[]>([]);
  const [dbCategories, setDbCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const [newBrand, setNewBrand] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setProducts(list);
      setLoading(false);
    });

    const unsubBrands = onSnapshot(collection(db, "brands"), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setDbBrands(list);
    });

    const unsubCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
      const list: any[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setDbCategories(list);
    });

    return () => {
      unsubProducts();
      unsubBrands();
      unsubCategories();
    };
  }, []);

  const handleAddBrand = async () => {
    if (!newBrand.trim()) return;
    try {
      await addDoc(collection(db, "brands"), { name: newBrand.trim() });
      setNewBrand("");
      setStatusMsg("Brand added!");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await addDoc(collection(db, "categories"), { name: newCategory.trim() });
      setNewCategory("");
      setStatusMsg("Category added!");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteBrand = async (id: string) => {
    await deleteDoc(doc(db, "brands", id));
  };

  const handleDeleteCategory = async (id: string) => {
    await deleteDoc(doc(db, "categories", id));
  };

  const handleExport = () => {
    const flattenedData = products.map((p) => ({
      ID: p.id,
      Name: p.name,
      Brand: p.brand,
      Category: p.topCategory,
      SubCategory: p.subCategory,
      Price: p.price,
      Popular: p.popular ? "Yes" : "No",
    }));
    downloadExcel(flattenedData, "Products_Export");
  };

  const handleSeedData = async () => {
    setStatusMsg("Seeding products...");
    try {
      const batch = writeBatch(db);
      mockProducts.forEach((prod) => {
        const prodRef = doc(collection(db, "products"));
        batch.set(prodRef, {
          name: prod.name,
          brand: prod.brand,
          topCategory: prod.topCategory,
          subCategory: prod.subCategory,
          price: prod.price,
          popular: prod.popular || false,
          image: prod.image || "",
          properties: prod.properties || [],
        });
      });
      await batch.commit();
      setStatusMsg("Products seeded successfully.");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (e) {
      console.error(e);
      setStatusMsg("Error seeding products");
      setTimeout(() => setStatusMsg(""), 3000);
    }
  };

  const handleSaveProduct = async (productData: any) => {
    try {
      if (editingProduct) {
        await updateDoc(doc(db, "products", editingProduct.id), productData);
        setStatusMsg("Product updated!");
      } else {
        await addDoc(collection(db, "products"), {
          ...productData,
          popular: false,
        });
        setStatusMsg("Product created!");
      }
      setShowAddForm(false);
      setEditingProduct(null);
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (e) {
      console.error(e);
      setStatusMsg("Error saving product");
      setTimeout(() => setStatusMsg(""), 3000);
    }
  };

  const handleEdit = (prod: any) => {
    setEditingProduct(prod);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    // Skipping confirm to support iframe constraints
    try {
      await deleteDoc(doc(db, "products", id));
      setStatusMsg("Product deleted!");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (e) {
      setStatusMsg("Error deleting product");
      setTimeout(() => setStatusMsg(""), 3000);
    }
  };

  const savePrice = async (id: string) => {
    if (!editPrice) return;
    try {
      await updateDoc(doc(db, "products", id), { price: editPrice });
      setEditingId(null);
      setStatusMsg("Price updated!");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch (e) {
      setStatusMsg("Error updating price");
      setTimeout(() => setStatusMsg(""), 3000);
    }
  };

  const filtered = products.filter((p) => {
    const term = search.toLowerCase();
    return (
      (p.name || "").toLowerCase().includes(term) ||
      (p.brand || "").toLowerCase().includes(term)
    );
  });

  if (loading)
    return (
      <div className="p-10 text-center text-zinc-600">Loading Products...</div>
    );

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-50">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-zinc-600" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-9 pr-3 py-2.5 text-sm border border-zinc-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-3">
          {statusMsg && (
            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg animate-fade-in">
              {statusMsg}
            </span>
          )}
          {products.length === 0 && (
            <button
              onClick={handleSeedData}
              className="px-4 py-2.5 bg-blue-50 text-blue-700 font-semibold text-sm rounded-xl hover:bg-blue-100 flex items-center justify-center gap-2 transition-colors border border-blue-100"
            >
              <Database className="w-4 h-4" /> Seed Initial Data
            </button>
          )}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2.5 bg-purple-50 text-purple-700 font-semibold text-sm rounded-xl hover:bg-purple-100 flex items-center justify-center gap-2 transition-colors border border-purple-100"
            title="Manage Categories and Brands"
          >
            Manage Attributes
          </button>
          <button
            onClick={() => {
              setEditingProduct(null);
              setShowAddForm(true);
            }}
            className="px-4 py-2.5 bg-zinc-900 text-white font-semibold text-sm rounded-xl hover:bg-zinc-800 flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2.5 bg-emerald-50 text-emerald-700 font-semibold text-sm rounded-xl hover:bg-emerald-100 flex items-center justify-center gap-2 transition-colors border border-emerald-100"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="p-6 border-b border-zinc-200 bg-white animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-zinc-900 mb-4 text-sm uppercase tracking-wider">Brands</h3>
              <div className="flex gap-2 mb-4">
                <input type="text" placeholder="New Brand" value={newBrand} onChange={e => setNewBrand(e.target.value)} className="w-full border border-zinc-200 p-2.5 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-500" />
                <button onClick={handleAddBrand} className="bg-purple-600 text-white px-4 rounded-lg font-semibold text-sm hover:bg-purple-700">Add</button>
              </div>
              <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {dbBrands.map(b => (
                  <li key={b.id} className="flex justify-between items-center text-sm p-3 bg-zinc-50 border border-zinc-200 rounded-lg">
                    <span>{b.name}</span>
                    <button onClick={() => handleDeleteBrand(b.id)} className="text-zinc-600 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 mb-4 text-sm uppercase tracking-wider">Categories</h3>
              <div className="flex gap-2 mb-4">
                <input type="text" placeholder="New Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full border border-zinc-200 p-2.5 rounded-lg text-sm bg-white focus:outline-none focus:border-purple-500" />
                <button onClick={handleAddCategory} className="bg-purple-600 text-white px-4 rounded-lg font-semibold text-sm hover:bg-purple-700">Add</button>
              </div>
              <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {dbCategories.map(c => (
                  <li key={c.id} className="flex justify-between items-center text-sm p-3 bg-zinc-50 border border-zinc-200 rounded-lg">
                    <span>{c.name}</span>
                    <button onClick={() => handleDeleteCategory(c.id)} className="text-zinc-600 hover:text-red-500"><Trash2 className="w-4 h-4"/></button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <ProductFormModal 
          product={editingProduct} 
          products={products}
          brands={dbBrands} 
          categories={dbCategories} 
          onSave={handleSaveProduct} 
          onClose={() => { 
            setShowAddForm(false); 
            setEditingProduct(null); 
          }} 
        />
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-zinc-50/50 text-zinc-600 border-b border-zinc-200">
              <th className="px-6 py-4 font-semibold w-16">Image</th>
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Brand & Details</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {filtered.map((prod) => (
              <tr
                key={prod.id}
                className="hover:bg-zinc-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  {prod.image ? (
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-12 h-12 object-cover rounded-xl border border-zinc-200 bg-white"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-zinc-100 border border-zinc-200 rounded-xl flex items-center justify-center text-zinc-600 text-xs">
                      No img
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-zinc-900 block truncate max-w-[200px]" title={prod.name}>
                    {prod.name}
                  </span>
                  <span className="text-xs text-zinc-600 font-mono">
                    {prod.id.slice(0, 8)}...
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-600">
                  <span className="block font-medium">{prod.brand}</span>
                  <span className="text-xs text-zinc-600">
                    {prod.topCategory}
                    {prod.subCategory ? ` > ${prod.subCategory}` : ""}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-zinc-900">
                  {editingId === prod.id ? (
                     <div className="flex items-center gap-2">
                       <input 
                         type="text"
                         className="text-xs font-mono border border-zinc-300 rounded px-2 py-1 outline-none focus:border-emerald-500 w-24"
                         value={editPrice}
                         onChange={e => setEditPrice(e.target.value)}
                         autoFocus
                       />
                       <button onClick={() => savePrice(prod.id)} className="text-emerald-600 hover:text-emerald-700">
                         <CheckCircle className="w-4 h-4" />
                       </button>
                    </div>
                  ) : (
                    <span 
                      onClick={() => { setEditingId(prod.id); setEditPrice(prod.price) }}
                      className="cursor-pointer hover:text-emerald-600 hover:underline"
                      title="Click to edit price"
                    >
                      {prod.price}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="p-1.5 text-zinc-600 hover:text-purple-600 transition-colors"
                      title="Edit Product"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(prod.id)}
                      className="p-1.5 text-zinc-600 hover:text-red-600 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-zinc-600"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
