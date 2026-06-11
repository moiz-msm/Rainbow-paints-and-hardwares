import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

export default function ProductFormModal({
  product,
  products = [],
  onSave,
  onClose,
  brands,
  categories,
}: any) {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    topCategory: '',
    subCategory: '',
    brand: '',
    description: '',
    shortDescription: '',
    specifications: '',
    coverageArea: '',
    finishType: '',
    surfaceType: '',
    environment: '',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    urlSlug: '',
    mrp: '',
    price: '',
    contractorPrice: '',
    dealerPrice: '',
    bulkPrice: '',
    discountPercent: '',
    offerPrice: '',
    gstPercent: '',
    image: '',
    images: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        topCategory: product.topCategory || '',
        subCategory: product.subCategory || '',
        brand: product.brand || '',
        description: product.description || '',
        shortDescription: product.shortDescription || '',
        specifications: Array.isArray(product.specifications)
          ? product.specifications.join('\n')
          : product.specifications || '',
        coverageArea: product.coverageArea || '',
        finishType: product.finishType || '',
        surfaceType: product.surfaceType || '',
        environment: product.environment || '',
        tags: Array.isArray(product.tags)
          ? product.tags.join(', ')
          : product.tags || '',
        seoTitle: product.seoTitle || '',
        seoDescription: product.seoDescription || '',
        urlSlug: product.urlSlug || '',
        mrp: product.mrp || '',
        price: product.price || '',
        contractorPrice: product.contractorPrice || '',
        dealerPrice: product.dealerPrice || '',
        bulkPrice: product.bulkPrice || '',
        discountPercent: product.discountPercent || '',
        offerPrice: product.offerPrice || '',
        gstPercent: product.gstPercent || '',
        image: product.image || '',
        images: Array.isArray(product.images)
          ? product.images.join(', ')
          : product.images || '',
      });
    }
  }, [product]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      mrp: Number(formData.mrp) || 0,
      price: Number(formData.price) || String(formData.price),
      contractorPrice: Number(formData.contractorPrice) || 0,
      dealerPrice: Number(formData.dealerPrice) || 0,
      bulkPrice: Number(formData.bulkPrice) || 0,
      offerPrice: Number(formData.offerPrice) || 0,
      discountPercent: Number(formData.discountPercent) || 0,
      gstPercent: Number(formData.gstPercent) || 0,
      tags: typeof formData.tags === 'string'
        ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : formData.tags,
      images: typeof formData.images === 'string'
        ? formData.images.split(',').map((t) => t.trim()).filter(Boolean)
        : formData.images,
      specifications: typeof formData.specifications === 'string'
        ? formData.specifications.split('\n').map((t) => t.trim()).filter(Boolean)
        : formData.specifications,
    };
    onSave(dataToSave);
  };

  const uniqueSubcategories = React.useMemo(() => {
    const subs = new Set<string>();
    products.forEach((p: any) => {
      if (p.topCategory === formData.topCategory && p.subCategory) {
        subs.add(p.subCategory);
      }
    });
    return Array.from(subs);
  }, [products, formData.topCategory]);

  const uniqueFinishTypes = React.useMemo(() => {
    const set = new Set<string>();
    products.forEach((p: any) => p.finishType && set.add(p.finishType));
    return Array.from(set);
  }, [products]);

  const uniqueSurfaceTypes = React.useMemo(() => {
    const set = new Set<string>();
    products.forEach((p: any) => p.surfaceType && set.add(p.surfaceType));
    return Array.from(set);
  }, [products]);

  const inputClass = "w-full border border-zinc-200 p-2.5 rounded-lg text-sm bg-white focus:ring-1 focus:ring-purple-500 outline-none";
  const labelClass = "block text-xs font-medium text-zinc-600 mb-1";

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-900/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-xl">
        <div className="px-6 py-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50 rounded-t-2xl">
          <h3 className="font-bold text-zinc-900 text-lg">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="text-zinc-600 hover:text-zinc-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
          <form id="product-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Core Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h4 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-2 mb-4">Basic Details</h4>
              </div>
              <div>
                <label className={labelClass}>Product Name *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>SKU Code</label>
                <input type="text" name="sku" value={formData.sku} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Category</label>
                <select name="topCategory" value={formData.topCategory} onChange={handleChange} className={inputClass}>
                  <option value="">Select Category</option>
                  {categories.map((c: any) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Sub Category</label>
                <input 
                  type="text" 
                  name="subCategory" 
                  list="subcategories-list"
                  value={formData.subCategory} 
                  onChange={handleChange} 
                  className={inputClass} 
                  placeholder="e.g. Interior Paints" 
                />
                <datalist id="subcategories-list">
                  {uniqueSubcategories.map(sub => (
                    <option key={sub} value={sub} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className={labelClass}>Brand</label>
                <select name="brand" value={formData.brand} onChange={handleChange} className={inputClass}>
                  <option value="">Select Brand</option>
                  {brands.map((b: any) => <option key={b.id} value={b.name}>{b.name}</option>)}
                </select>
              </div>
            </div>

            {/* Content & Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h4 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-2 mb-4">Descriptions & Specifications</h4>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Short Description</label>
                <input type="text" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className={inputClass} />
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Full Description</label>
                <textarea rows={3} name="description" value={formData.description} onChange={handleChange} className={inputClass}></textarea>
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}>Specifications (One per line)</label>
                <textarea rows={3} name="specifications" value={formData.specifications} onChange={handleChange} placeholder="e.g. Washability: High" className={inputClass}></textarea>
              </div>
              <div>
                <label className={labelClass}>Finish Type</label>
                <input type="text" name="finishType" list="finishTypes-list" value={formData.finishType} onChange={handleChange} className={inputClass} />
                <datalist id="finishTypes-list">
                  {uniqueFinishTypes.map(ft => <option key={ft} value={ft} />)}
                </datalist>
              </div>
              <div>
                <label className={labelClass}>Surface Type</label>
                <input type="text" name="surfaceType" list="surfaceTypes-list" value={formData.surfaceType} onChange={handleChange} className={inputClass} />
                <datalist id="surfaceTypes-list">
                  {uniqueSurfaceTypes.map(st => <option key={st} value={st} />)}
                </datalist>
              </div>
              <div>
                <label className={labelClass}>Environment</label>
                <select name="environment" value={formData.environment} onChange={handleChange} className={inputClass}>
                  <option value="">Select</option>
                  <option value="Indoor">Indoor</option>
                  <option value="Outdoor">Outdoor</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Coverage Area</label>
                <input type="text" name="coverageArea" value={formData.coverageArea} onChange={handleChange} className={inputClass} placeholder="e.g. 100-120 sq.ft/L" />
              </div>
            </div>

            {/* Media & SEO */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <h4 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-2 mb-4">Media, Tags & SEO</h4>
              </div>
              <div>
                <label className={labelClass}>Primary Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Additional Image URLs (Comma separated)</label>
                <input type="text" name="images" value={formData.images} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Tags (Comma separated)</label>
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>SEO Title</label>
                  <input type="text" name="seoTitle" value={formData.seoTitle} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>URL Slug</label>
                  <input type="text" name="urlSlug" value={formData.urlSlug} onChange={handleChange} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>SEO Description</label>
                <textarea rows={2} name="seoDescription" value={formData.seoDescription} onChange={handleChange} className={inputClass}></textarea>
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-3">
                <h4 className="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-2 mb-4">Pricing & Tax</h4>
              </div>
              <div>
                <label className={labelClass}>MRP (₹)</label>
                <input type="number" step="0.01" name="mrp" value={formData.mrp} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Selling Price (₹) *</label>
                <input required type="text" name="price" value={formData.price} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Discount %</label>
                <input type="number" step="0.01" name="discountPercent" value={formData.discountPercent} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Contractor Price (₹)</label>
                <input type="number" step="0.01" name="contractorPrice" value={formData.contractorPrice} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Dealer Price (₹)</label>
                <input type="number" step="0.01" name="dealerPrice" value={formData.dealerPrice} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Bulk Pricing (₹)</label>
                <input type="number" step="0.01" name="bulkPrice" value={formData.bulkPrice} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Offer Price (₹)</label>
                <input type="number" step="0.01" name="offerPrice" value={formData.offerPrice} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>GST %</label>
                <input type="number" step="0.01" name="gstPercent" value={formData.gstPercent} onChange={handleChange} className={inputClass} />
              </div>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t border-zinc-200 bg-zinc-50 rounded-b-2xl flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 font-medium text-zinc-600 hover:text-zinc-900 transition-colors">
            Cancel
          </button>
          <button 
            type="submit" 
            form="product-form"
            className="bg-zinc-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-zinc-800 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
