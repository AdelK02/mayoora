// src/app/admin/dashboard/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/utils/api';
import {
  Film, LogOut, Package, FolderHeart, Image as ImageIcon,
  Plus, Search, Edit2, Trash2, X, PlusCircle, Check, HelpCircle,
  Globe
} from 'lucide-react';

const PRESET_IMAGES = [
  { name: 'RED Komodo', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sony FX6', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
  { name: 'Sony FX3', url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80' },
  { name: 'Category Cameras', url: 'https://images.unsplash.com/photo-1576815316499-106518a203f1?auto=format&fit=crop&w=800&q=80' },
  { name: 'Category Lights', url: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80' },
  { name: 'Category Audio', url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=800&q=80' },
  { name: 'Category Lenses', url: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80' },
  { name: 'Banner 1', url: 'https://images.unsplash.com/photo-1500705077387-65f31ef00c90?q=80&w=1154&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { name: 'Banner 2', url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1600&q=80' },
  { name: 'Banner 3', url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80' },
  { name: 'Banner 4', url: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?auto=format&fit=crop&w=1600&q=80' },
];

const DashboardPage = () => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'categories' | 'offers'

  // DB States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);

  // Search/Filters
  const [searchTerm, setSearchTerm] = useState('');

  // Form Modals
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [offerModalOpen, setOfferModalOpen] = useState(false);

  // Edit States (null means creating new)
  const [editProduct, setEditProduct] = useState(null);
  const [editCategory, setEditCategory] = useState(null);
  const [editOffer, setEditOffer] = useState(null);

  // Form Field States - Product
  const [pTitle, setPTitle] = useState('');
  const [pCategory, setPCategory] = useState('');
  const [pImage, setPImage] = useState('');
  const [pPrice, setPPrice] = useState('');
  const [pFeatures, setPFeatures] = useState(['']);
  const [pDescription, setPDescription] = useState('');
  const [pFooter, setPFooter] = useState('');
  const [pIsKit, setPIsKit] = useState(false);

  // Form Field States - Category
  const [cSlug, setCSlug] = useState('');
  const [cName, setCName] = useState('');
  const [cImage, setCImage] = useState('');

  // Form Field States - Offer
  const [oImage, setOImage] = useState('');
  const [oTitle, setOTitle] = useState('');
  const [oSubtitle, setOSubtitle] = useState('');

  // Local File States for upload integration
  const [productFile, setProductFile] = useState(null);
  const [categoryFile, setCategoryFile] = useState(null);
  const [offerFile, setOfferFile] = useState(null);

  // Promo Popup Settings States
  const [popIsActive, setPopIsActive] = useState(true);
  const [popTitle, setPopTitle] = useState('');
  const [popSubtitle, setPopSubtitle] = useState('');
  const [popTagline, setPopTagline] = useState('');
  const [popFeatures, setPopFeatures] = useState(['']);
  const [popButtonText, setPopButtonText] = useState('');
  const [popButtonLink, setPopButtonLink] = useState('');
  const [popWebsite, setPopWebsite] = useState('');
  const [popImage, setPopImage] = useState('');
  const [popFile, setPopFile] = useState(null);

  // Gallery states
  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [gCategory, setGCategory] = useState('PHOTO');
  const [gTitle, setGTitle] = useState('');
  const [gUrl, setGUrl] = useState('');
  const [gFile, setGFile] = useState(null);

  useEffect(() => {
    if (!api.auth.checkAuth()) {
      router.push('/admin/login');
    } else {
      api.auth.verify()
        .then(() => {
          setAuthorized(true);
          refreshData();
        })
        .catch(() => {
          api.auth.logout();
          router.push('/admin/login');
        });
    }
  }, [router]);

  const refreshData = async () => {
    try {
      const [prods, cats, offs, pop, galls] = await Promise.all([
        api.products.getAll(),
        api.categories.getAll(),
        api.offers.getAll(),
        api.promoPopup.get(),
        api.gallery.getAll()
      ]);
      setProducts(prods);
      setCategories(cats);
      setOffers(offs);
      setGalleryItems(galls || []);
      
      // Load popup settings state
      if (pop) {
        setPopIsActive(pop.isActive);
        setPopTitle(pop.title);
        setPopSubtitle(pop.subtitle);
        setPopTagline(pop.tagline);
        setPopFeatures(pop.features || ['']);
        setPopButtonText(pop.buttonText);
        setPopButtonLink(pop.buttonLink);
        setPopWebsite(pop.website);
        setPopImage(pop.image);
      }
    } catch (err) {
      console.error("Error refreshing dashboard data:", err);
    }
  };

  const savePromoPopupForm = async (e) => {
    e.preventDefault();
    const updatedFeatures = popFeatures.filter(f => f.trim() !== '');

    const formData = new FormData();
    formData.append('isActive', popIsActive);
    formData.append('title', popTitle);
    formData.append('subtitle', popSubtitle);
    formData.append('tagline', popTagline);
    formData.append('features', JSON.stringify(updatedFeatures));
    formData.append('buttonText', popButtonText);
    formData.append('buttonLink', popButtonLink);
    formData.append('website', popWebsite);

    if (popFile) {
      formData.append('image', popFile);
    } else {
      formData.append('image', popImage);
    }

    try {
      await api.promoPopup.update(formData);
      alert("PROMO POPUP SETTINGS SAVED SUCCESSFULLY!");
      setPopFile(null);
      refreshData();
    } catch (err) {
      alert("Failed to save settings: " + err.message);
    }
  };

  const handlePopFeatureChange = (index, val) => {
    const list = [...popFeatures];
    list[index] = val;
    setPopFeatures(list);
  };

  const addPopFeatureInput = () => {
    setPopFeatures([...popFeatures, '']);
  };

  const removePopFeatureInput = (index) => {
    const list = popFeatures.filter((_, i) => i !== index);
    setPopFeatures(list.length ? list : ['']);
  };

  const saveGalleryForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('category', gCategory);
    formData.append('title', gTitle);
    
    if (gCategory === 'PHOTO') {
      if (gFile) {
        formData.append('image', gFile);
      } else {
        formData.append('url', gUrl);
      }
    } else {
      formData.append('url', gUrl);
    }

    try {
      await api.gallery.create(formData);
      refreshData();
      setGalleryModalOpen(false);
      setGTitle('');
      setGUrl('');
      setGFile(null);
    } catch (err) {
      alert("Failed to save gallery item: " + err.message);
    }
  };

  const deleteGalleryItem = async (id) => {
    if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS GALLERY ITEM?')) {
      try {
        await api.gallery.delete(id);
        refreshData();
      } catch (err) {
        alert("Failed to delete gallery item: " + err.message);
      }
    }
  };

  const handleLogout = () => {
    api.auth.logout();
    router.push('/admin/login');
  };

  // --- PRODUCT CRUD ---
  const openProductForm = (prod = null) => {
    setProductFile(null);
    if (prod) {
      setEditProduct(prod);
      setPTitle(prod.title);
      setPCategory(prod.category);
      setPImage(prod.image);
      setPPrice(prod.price);
      setPFeatures(prod.features || ['']);
      setPDescription(prod.description || '');
      setPFooter(prod.footerText || '');
      setPIsKit(prod.isKit || false);
    } else {
      setEditProduct(null);
      setPTitle('');
      setPCategory(categories[0]?.slug || 'cameras');
      setPImage(PRESET_IMAGES[0].url);
      setPPrice('');
      setPFeatures(['']);
      setPDescription('');
      setPFooter('');
      setPIsKit(false);
    }
    setProductModalOpen(true);
  };

  const saveProductForm = async (e) => {
    e.preventDefault();
    const updatedFeatures = pFeatures.filter(f => f.trim() !== '');

    const formData = new FormData();
    formData.append('title', pTitle);
    formData.append('category', pCategory);
    formData.append('price', pPrice);
    formData.append('features', JSON.stringify(updatedFeatures));
    formData.append('description', pDescription);
    formData.append('footerText', pFooter);
    formData.append('isKit', pIsKit);

    if (productFile) {
      formData.append('image', productFile);
    } else {
      formData.append('image', pImage);
    }

    try {
      if (editProduct) {
        await api.products.update(editProduct.id, formData);
      } else {
        await api.products.create(formData);
      }
      refreshData();
      setProductModalOpen(false);
    } catch (err) {
      alert("Failed to save product: " + err.message);
    }
  };

  const deleteProductItem = async (id) => {
    if (confirm('ARE YOU SURE YOU WANT TO DELETE THIS EQUIPMENT?')) {
      try {
        await api.products.delete(id);
        refreshData();
      } catch (err) {
        alert("Failed to delete product: " + err.message);
      }
    }
  };

  // Dynamic Specifications helpers
  const handleFeatureChange = (index, val) => {
    const list = [...pFeatures];
    list[index] = val;
    setPFeatures(list);
  };

  const addFeatureInput = () => {
    setPFeatures([...pFeatures, '']);
  };

  const removeFeatureInput = (index) => {
    const list = pFeatures.filter((_, i) => i !== index);
    setPFeatures(list.length ? list : ['']);
  };


  // --- CATEGORY CRUD ---
  const openCategoryForm = (cat = null) => {
    setCategoryFile(null);
    if (cat) {
      setEditCategory(cat);
      setCSlug(cat.slug);
      setCName(cat.name);
      setCImage(cat.image);
    } else {
      setEditCategory(null);
      setCSlug('');
      setCName('');
      setCImage(PRESET_IMAGES[3].url);
    }
    setCategoryModalOpen(true);
  };

  const saveCategoryForm = async (e) => {
    e.preventDefault();
    const slug = cSlug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');

    const formData = new FormData();
    formData.append('slug', slug);
    formData.append('name', cName.toUpperCase());

    if (categoryFile) {
      formData.append('image', categoryFile);
    } else {
      formData.append('image', cImage);
    }

    try {
      if (editCategory) {
        await api.categories.update(editCategory.slug, formData);
      } else {
        await api.categories.create(formData);
      }
      refreshData();
      setCategoryModalOpen(false);
    } catch (err) {
      alert("Failed to save category: " + err.message);
    }
  };

  const deleteCategoryItem = async (slug) => {
    if (confirm(`ARE YOU SURE YOU WANT TO DELETE THIS CATEGORY? ALL PRODUCTS UNDER THIS CATEGORY WILL BE UNLINKED.`)) {
      try {
        await api.categories.delete(slug);
        refreshData();
      } catch (err) {
        alert("Failed to delete category: " + err.message);
      }
    }
  };


  // --- OFFERS/POSTERS CRUD ---
  const openOfferForm = (off = null) => {
    setOfferFile(null);
    if (off) {
      setEditOffer(off);
      setOImage(off.image);
      setOTitle(off.title);
      setOSubtitle(off.subtitle);
    } else {
      setEditOffer(null);
      setOImage(PRESET_IMAGES[7].url);
      setOTitle('');
      setOSubtitle('');
    }
    setOfferModalOpen(true);
  };

  const saveOfferForm = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', oTitle);
    formData.append('subtitle', oSubtitle);

    if (offerFile) {
      formData.append('image', offerFile);
    } else {
      formData.append('image', oImage);
    }

    try {
      if (editOffer) {
        await api.offers.update(editOffer.id, formData);
      } else {
        await api.offers.create(formData);
      }
      refreshData();
      setOfferModalOpen(false);
    } catch (err) {
      alert("Failed to save offer banner: " + err.message);
    }
  };

  const deleteOfferItem = async (id) => {
    if (confirm('ARE YOU SURE YOU WANT TO REMOVE THIS HERO OFFER BANNER?')) {
      try {
        await api.offers.delete(id);
        refreshData();
      } catch (err) {
        alert("Failed to delete offer banner: " + err.message);
      }
    }
  };

  // Searching logic
  const filteredProducts = products.filter(p => {
    const titleMatch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return titleMatch || categoryMatch;
  });

  if (!authorized) return null;

  return (
    <main className="min-h-screen bg-[#0a0709] text-white flex flex-col">
      {/* Navbar header */}
      <header className="bg-[#140e12] border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center relative z-20 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#600138] rounded-xl flex items-center justify-center text-[#E2D1A1] shadow-md">
            <Film className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-wide uppercase">MAYOORA</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Administration Workspace</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 md:space-x-6">
          <div className="hidden lg:flex items-center space-x-2 bg-green-500/10 text-green-400 border border-green-500/20 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
            <span>LIVE API CONNECTION</span>
          </div>

          <Link
            href="/"
            className="flex items-center space-x-2 bg-white/5 border border-white/5 px-4 py-2.5 rounded-2xl hover:bg-[#600138]/20 hover:text-white text-gray-300 transition-all font-black tracking-widest text-xs uppercase shadow-sm"
          >
            <Globe className="w-4 h-4 text-[#E2D1A1]" />
            <span>Regular Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300 font-black tracking-widest text-xs uppercase"
          >
            <LogOut className="w-4 h-4 text-[#600138]" />
            <span className="hidden sm:inline">LOG OUT</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex-1 flex flex-col md:flex-row">

        {/* Sidebar Navigation */}
        <aside className="w-full md:w-80 bg-[#100b0e] border-r border-white/5 p-8 flex flex-col space-y-10">

          {/* Quick Info Card */}
          <div className="bg-[#1a1317] border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#600138]/10 rounded-full blur-2xl"></div>
            <h3 className="text-[#E2D1A1] text-xs font-black uppercase tracking-widest mb-1">Signed in as</h3>
            <p className="text-white text-lg font-black tracking-wider uppercase">Lead Admin</p>
            <p className="text-gray-500 text-xs mt-1">Status: Live MongoDB Atlas</p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-3 pb-4 md:pb-0 shrink-0">
            {[
              { id: 'products', name: 'EQUIPMENT & RATES', icon: Package },
              { id: 'categories', name: 'PRODUCT CATEGORIES', icon: FolderHeart },
              { id: 'offers', name: 'OFFERS & POSTERS', icon: ImageIcon },
              { id: 'promoPopup', name: 'ENTRY PROMO POPUP', icon: Film },
              { id: 'gallery', name: 'GALLERY ITEMS', icon: Globe }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shrink-0 transition-all ${activeTab === tab.id
                    ? 'bg-[#600138] text-white shadow-xl translate-x-1'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden md:block flex-1 border-t border-white/5 pt-8 text-[11px] text-gray-600 leading-relaxed font-semibold uppercase tracking-wider">
            <HelpCircle className="w-5 h-5 text-gray-500 mb-2" />
            <p>Changes written here are instantly saved to the live MongoDB database using secure REST API requests.</p>
          </div>
        </aside>

        {/* Dynamic Workspace Area */}
        <section className="flex-1 p-6 md:p-12 space-y-10 overflow-y-auto max-w-7xl">

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Total Equipment', val: products.length, icon: Package, color: 'text-purple-400' },
              { name: 'Active Categories', val: categories.length, icon: FolderHeart, color: 'text-pink-400' },
              { name: 'Promotional Offers', val: offers.length, icon: ImageIcon, color: 'text-amber-400' }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-[#140e12] border border-white/5 rounded-3xl p-6 flex justify-between items-center shadow-inner relative group hover:border-[#600138]/20 transition-all duration-300">
                  <div className="space-y-1">
                    <span className="text-gray-500 text-xs font-black uppercase tracking-widest">{stat.name}</span>
                    <p className="text-3xl font-black">{stat.val}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* TAB CONTENT: PRODUCTS & RATES */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1 border-l-4 border-[#600138] pl-4">
                  <h2 className="text-2xl font-black uppercase tracking-wider">Equipment Inventory</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Adjust daily rates, specifications list, and crew bata options</p>
                </div>
                <button
                  onClick={() => openProductForm(null)}
                  className="bg-[#600138] hover:bg-[#7A0247] text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center space-x-2 shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD EQUIPMENT</span>
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="SEARCH EQUIPMENT OR CATEGORY..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#140e12] border border-white/5 py-4 pl-12 pr-4 rounded-2xl text-xs font-black uppercase tracking-wider placeholder-gray-600 focus:outline-none focus:border-[#600138] focus:ring-1 focus:ring-[#600138] transition-all"
                />
              </div>

              {/* Products Table */}
              <div className="bg-[#140e12] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs uppercase tracking-wider">
                    <thead>
                      <tr className="border-b border-white/5 bg-[#1a1317] text-gray-400 font-black">
                        <th className="py-4 px-6">Image</th>
                        <th className="py-4 px-6">Equipment Info</th>
                        <th className="py-4 px-6">Category</th>
                        <th className="py-4 px-6">Daily Rate</th>
                        <th className="py-4 px-6 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-6">
                            <div className="w-14 h-14 bg-black rounded-xl overflow-hidden border border-white/10 flex items-center justify-center p-1">
                              <img src={prod.image} alt={prod.title} className="max-w-full max-h-full object-contain" />
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="space-y-1">
                              <span className="font-black text-white text-sm">{prod.title}</span>
                              <div className="flex flex-wrap gap-1 text-[9px] text-gray-500 font-bold">
                                <span>{prod.features?.length || 0} Features</span>
                                {prod.isKit && (
                                  <span className="bg-[#600138]/25 text-[#E2D1A1] border border-[#600138]/30 px-1 rounded">KIT PACKAGE</span>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="bg-white/5 border border-white/5 px-3 py-1 rounded-full text-[10px] font-black text-gray-300">
                              {prod.category}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-black text-[#E2D1A1] text-sm">
                            ₹{Number(prod.price).toLocaleString('en-IN')}/Day
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex justify-center space-x-2">
                              <button
                                onClick={() => openProductForm(prod)}
                                className="p-2.5 bg-white/5 rounded-xl hover:bg-[#600138]/20 hover:text-[#E2D1A1] transition-all"
                                title="Edit Item"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteProductItem(prod.id)}
                                className="p-2.5 bg-white/5 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all"
                                title="Delete Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredProducts.length === 0 && (
                        <tr>
                          <td colSpan="5" className="text-center py-20 text-gray-600 font-black uppercase tracking-widest">
                            No equipment found matching criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1 border-l-4 border-[#600138] pl-4">
                  <h2 className="text-2xl font-black uppercase tracking-wider">Product Categories</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Manage distinct groupings which automatically drive public menus</p>
                </div>
                <button
                  onClick={() => openCategoryForm(null)}
                  className="bg-[#600138] hover:bg-[#7A0247] text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center space-x-2 shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD CATEGORY</span>
                </button>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((cat, idx) => {
                  const count = products.filter(p => p.category === cat.slug).length;
                  return (
                    <div key={idx} className="bg-[#140e12] border border-white/5 rounded-3xl p-6 space-y-6 flex flex-col justify-between shadow-2xl relative group overflow-hidden">
                      {/* Image Preview Banner */}
                      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover rounded-bl-3xl" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Slug: {cat.slug}</span>
                        <h4 className="text-xl font-black text-white tracking-wide">{cat.name}</h4>
                        <p className="text-xs text-[#E2D1A1] font-black uppercase tracking-widest">{count} Active Items</p>
                      </div>

                      <div className="flex space-x-2 relative z-10">
                        <button
                          onClick={() => openCategoryForm(cat)}
                          className="flex-1 py-2.5 bg-white/5 rounded-xl hover:bg-[#600138]/20 hover:text-[#E2D1A1] transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center space-x-2"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>EDIT</span>
                        </button>
                        <button
                          onClick={() => deleteCategoryItem(cat.slug)}
                          className="p-2.5 bg-white/5 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB CONTENT: OFFERS & POSTERS */}
          {activeTab === 'offers' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1 border-l-4 border-[#600138] pl-4">
                  <h2 className="text-2xl font-black uppercase tracking-wider">Banners & Posters</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Create and update promotional hero banners driving the landing slider</p>
                </div>
                <button
                  onClick={() => openOfferForm(null)}
                  className="bg-[#600138] hover:bg-[#7A0247] text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center space-x-2 shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD BANNER</span>
                </button>
              </div>

              {/* Offers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {offers.map((off) => (
                  <div key={off.id} className="bg-[#140e12] border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col group relative">
                    <div className="h-44 relative bg-black">
                      <img src={off.image} alt={off.title} className="w-full h-full object-cover opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      <div className="absolute bottom-4 left-6 right-6">
                        <span className="text-[10px] text-[#E2D1A1] font-black uppercase tracking-widest">Promotional Slide</span>
                        <h4 className="text-lg font-black uppercase text-white tracking-wide">{off.title}</h4>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                      <p className="text-gray-400 text-xs font-semibold leading-relaxed uppercase">{off.subtitle}</p>

                      <div className="flex space-x-3 pt-2">
                        <button
                          onClick={() => openOfferForm(off)}
                          className="flex-1 py-2.5 bg-white/5 rounded-xl hover:bg-[#600138]/20 hover:text-[#E2D1A1] transition-all text-xs font-black uppercase tracking-widest flex items-center justify-center space-x-2"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>EDIT OFFER</span>
                        </button>
                        <button
                          onClick={() => deleteOfferItem(off.id)}
                          className="p-2.5 bg-white/5 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all"
                          title="Delete Banner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB CONTENT: ENTRY PROMO POPUP */}
          {activeTab === 'promoPopup' && (
            <div className="space-y-6 max-w-4xl">
              <div className="space-y-1 border-l-4 border-[#600138] pl-4">
                <h2 className="text-2xl font-black uppercase tracking-wider text-white">Promo Popup Settings</h2>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                  Configure the entry promotional banner, including active status, titles, image, and dynamic features list.
                </p>
              </div>

              <form onSubmit={savePromoPopupForm} className="bg-[#140e12] border border-white/5 rounded-3xl p-8 space-y-8 shadow-2xl">
                
                {/* Active Toggle */}
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <div className="space-y-1">
                    <span className="text-sm font-black uppercase tracking-wider text-white">Popup Active Status</span>
                    <p className="text-xs text-gray-500 font-semibold uppercase">Turn the entry promo modal on or off for users entering the site</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={popIsActive}
                      onChange={(e) => setPopIsActive(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Popup Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. DJI RONIN RS3 PRO"
                      value={popTitle}
                      onChange={(e) => setPopTitle(e.target.value)}
                      className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                    />
                  </div>

                  {/* Subtitle */}
                  <div className="space-y-2">
                    <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Popup Subtitle</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. FOR RENT"
                      value={popSubtitle}
                      onChange={(e) => setPopSubtitle(e.target.value)}
                      className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                    />
                  </div>

                  {/* Tagline */}
                  <div className="space-y-2">
                    <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Popup Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. Power. Precision. Pro."
                      value={popTagline}
                      onChange={(e) => setPopTagline(e.target.value)}
                      className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                    />
                  </div>

                  {/* Website link */}
                  <div className="space-y-2">
                    <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Footer Link / Domain</label>
                    <input
                      type="text"
                      placeholder="e.g. www.rentalcamerawayanad.in"
                      value={popWebsite}
                      onChange={(e) => setPopWebsite(e.target.value)}
                      className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                    />
                  </div>

                  {/* Button Text */}
                  <div className="space-y-2">
                    <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Button Label</label>
                    <input
                      type="text"
                      placeholder="e.g. Rent Now"
                      value={popButtonText}
                      onChange={(e) => setPopButtonText(e.target.value)}
                      className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                    />
                  </div>

                  {/* Button Link */}
                  <div className="space-y-2">
                    <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Button Target Link (Call / WhatsApp)</label>
                    <input
                      type="text"
                      placeholder="e.g. https://wa.me/919496350343"
                      value={popButtonLink}
                      onChange={(e) => setPopButtonLink(e.target.value)}
                      className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                    />
                  </div>
                </div>

                {/* Dynamic Features */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Popup Highlights / Features</label>
                    <button
                      type="button"
                      onClick={addPopFeatureInput}
                      className="text-[#E2D1A1] hover:text-white text-xs font-black uppercase tracking-widest flex items-center space-x-1"
                    >
                      <PlusCircle className="w-4.5 h-4.5 text-[#E2D1A1]" />
                      <span>ADD HIGHLIGHT</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {popFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <span className="text-gray-600 text-xs font-black font-mono w-4">{idx + 1}.</span>
                        <input
                          type="text"
                          placeholder="e.g. Fast Delivery"
                          value={feat}
                          onChange={(e) => handlePopFeatureChange(idx, e.target.value)}
                          className="flex-1 bg-[#1c1418] border border-white/5 rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                        />
                        <button
                          type="button"
                          onClick={() => removePopFeatureInput(idx)}
                          className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Graphic selection */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Popup Image Graphic</label>
                  
                  {/* Preset list with DJI and others */}
                  <div className="grid grid-cols-4 gap-3 p-4 bg-[#1c1418] border border-white/5 rounded-2xl max-h-36 overflow-y-auto">
                    {[
                      { name: 'DJI Gimbal (Default)', url: '/DJI.jpg' },
                      { name: 'RED Komodo', url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80' },
                      { name: 'Sony FX6', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80' },
                      { name: 'Sony FX3', url: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=800&q=80' },
                    ].map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPopImage(img.url)}
                        className={`relative aspect-square bg-black border rounded-xl overflow-hidden hover:border-[#600138] transition-all p-1 flex items-center justify-center ${popImage === img.url ? 'border-[#600138] ring-1 ring-[#600138]' : 'border-white/10'
                          }`}
                        title={img.name}
                      >
                        <img src={img.url} alt={img.name} className="max-w-full max-h-full object-contain" />
                        {popImage === img.url && (
                          <div className="absolute top-1 right-1 bg-[#600138] rounded-full p-0.5 text-white">
                            <Check className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Or enter custom image URL</span>
                    <input
                      type="text"
                      placeholder="Custom Image Link..."
                      value={popImage}
                      onChange={(e) => setPopImage(e.target.value)}
                      className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Or upload new image file</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setPopFile(e.target.files[0])}
                      className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] text-gray-400"
                    />
                    {popFile && (
                      <p className="text-xs text-green-400 font-bold">Selected file for upload: {popFile.name}</p>
                    )}
                  </div>
                </div>

                {/* Save button */}
                <div className="pt-6 border-t border-white/5 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#600138] hover:bg-[#7A0247] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    SAVE POPUP SETTINGS
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* TAB CONTENT: GALLERY ITEMS */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-l-4 border-[#600138] pl-4">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-wider text-white">Gallery Items</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                    Manage photos and video links shown in the public gallery.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setGCategory('PHOTO');
                    setGTitle('');
                    setGUrl('');
                    setGFile(null);
                    setGalleryModalOpen(true);
                  }}
                  className="bg-[#600138] hover:bg-[#7A0247] text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl flex items-center space-x-2 transition-all hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD GALLERY ITEM</span>
                </button>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {galleryItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="relative aspect-square rounded-2xl overflow-hidden group bg-[#1c1418] border border-white/5 shadow-md flex flex-col justify-between"
                  >
                    {item.category === 'VIDEO' ? (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/95 flex flex-col justify-between p-4 z-0">
                        <span className="bg-[#600138] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider self-start">
                          {item.category}
                        </span>
                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white self-center">
                          <svg className="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                        <h4 className="text-white font-bold text-[10px] uppercase tracking-wide truncate">
                          {item.title || 'Cinematic Video'}
                        </h4>
                      </div>
                    ) : (
                      <>
                        <img 
                          src={item.url} 
                          alt={item.title || item.category} 
                          className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 z-10 bg-[#600138] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {item.category}
                        </div>
                      </>
                    )}

                    {/* Delete Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
                      <button
                        type="button"
                        onClick={() => deleteGalleryItem(item.id)}
                        className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-transform hover:scale-110 shadow-lg"
                        title="Delete Media"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {galleryItems.length === 0 && (
                <div className="text-center py-20 bg-[#1c1418] border border-white/5 rounded-3xl p-10">
                  <p className="text-gray-400 font-bold uppercase">No media items in gallery yet</p>
                </div>
              )}
            </div>
          )}

        </section>
      </div>

      {/* --- FORM MODAL: GALLERY ITEM --- */}
      {galleryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#140e12] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setGalleryModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>

            <form onSubmit={saveGalleryForm} className="p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-xl font-black uppercase italic tracking-wide text-[#E2D1A1]">
                  ADD GALLERY ITEM
                </h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Upload a photo or add a video link</p>
              </div>

              {/* Media Category Selection */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Media Category</label>
                <div className="grid grid-cols-2 gap-4">
                  {['PHOTO', 'VIDEO'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setGCategory(cat)}
                      className={`py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                        gCategory === cat 
                        ? 'bg-[#600138] text-white shadow-lg' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Field */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Title / Caption</label>
                <input
                  type="text"
                  required
                  placeholder={gCategory === 'PHOTO' ? "e.g. Cine Camera Setup" : "e.g. Wedding Highlight Reel"}
                  value={gTitle}
                  onChange={(e) => setGTitle(e.target.value)}
                  className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                />
              </div>

              {/* URL or Upload File fields depending on Photo vs Video */}
              {gCategory === 'PHOTO' ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Upload Image File</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setGFile(e.target.files[0]);
                        setGUrl(''); // Clear URL if file selected
                      }}
                      className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] text-gray-400"
                    />
                    {gFile && (
                      <p className="text-xs text-green-400 font-bold">Selected file for upload: {gFile.name}</p>
                    )}
                  </div>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink mx-4 text-gray-600 text-[10px] font-black uppercase tracking-widest">OR</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Image URL</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={gUrl}
                      onChange={(e) => {
                        setGUrl(e.target.value);
                        setGFile(null); // Clear file if URL is written
                      }}
                      className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Video URL (YouTube / Vimeo / MP4)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. https://www.youtube.com/watch?v=..."
                    value={gUrl}
                    onChange={(e) => setGUrl(e.target.value)}
                    className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                  />
                  <p className="text-[10px] text-gray-500 font-bold uppercase leading-relaxed">
                    Paste a YouTube link, Vimeo link, or a direct link to an MP4 video file.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#600138] hover:bg-[#7A0247] text-white px-8 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl transition-all hover:-translate-y-0.5"
                >
                  SAVE TO GALLERY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- FORM MODAL: PRODUCT --- */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#140e12] border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => setProductModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>

            <form onSubmit={saveProductForm} className="p-8 md:p-10 space-y-8">
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-2xl font-black uppercase italic tracking-wide text-[#E2D1A1]">
                  {editProduct ? 'EDIT EQUIPMENT' : 'ADD NEW EQUIPMENT'}
                </h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Configure pricing, accessories, and metadata</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Equipment Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SONY FX3"
                    value={pTitle}
                    onChange={(e) => setPTitle(e.target.value)}
                    className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all"
                  />
                </div>

                {/* Category Selection */}
                <div className="space-y-2">
                  <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Category</label>
                  <select
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                    className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] text-white uppercase"
                  >
                    {categories.map(c => (
                      <option key={c.slug} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Price Rate */}
                <div className="space-y-2">
                  <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Daily Rental Rate (₹ INR)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 2500"
                    value={pPrice}
                    onChange={(e) => setPPrice(e.target.value)}
                    className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-[#E2D1A1]"
                  />
                </div>

                {/* Kit Toggle */}
                <div className="space-y-2 flex flex-col justify-end">
                  <label className="flex items-center space-x-3 bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={pIsKit}
                      onChange={(e) => setPIsKit(e.target.checked)}
                      className="w-4 h-4 accent-[#600138]"
                    />
                    <span className="text-gray-300 text-xs font-black uppercase tracking-widest">Mark as Complete Kit Package</span>
                  </label>
                </div>
              </div>

              {/* Preset Image Helper */}
              <div className="space-y-3">
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Equipment Image Selection</label>
                <div className="grid grid-cols-5 gap-3 p-4 bg-[#1c1418] border border-white/5 rounded-2xl max-h-36 overflow-y-auto">
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPImage(img.url)}
                      className={`relative aspect-square bg-black border rounded-xl overflow-hidden hover:border-[#600138] transition-all p-1 flex items-center justify-center ${pImage === img.url ? 'border-[#600138] ring-1 ring-[#600138]' : 'border-white/10'
                        }`}
                      title={img.name}
                    >
                      <img src={img.url} alt={img.name} className="max-w-full max-h-full object-contain" />
                      {pImage === img.url && (
                        <div className="absolute top-1 right-1 bg-[#600138] rounded-full p-0.5 text-white">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Or enter any custom Image URL</span>
                  <input
                    type="url"
                    placeholder="Custom Image Link..."
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                    className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all"
                  />
                </div>
                <div className="space-y-1 mt-2">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Or upload a local image file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProductFile(e.target.files[0])}
                    className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] text-gray-400"
                  />
                  {productFile && (
                    <p className="text-xs text-green-400 font-bold">Selected file: {productFile.name}</p>
                  )}
                </div>
              </div>

              {/* Product Description */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Product Description (Optional)</label>
                <textarea
                  placeholder="e.g. Netflix-approved full frame camera kit with standard accessories..."
                  value={pDescription}
                  onChange={(e) => setPDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white resize-none"
                />
              </div>

              {/* Enquire Now button text */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Enquire Now Button Text (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. ENQUIRE NOW"
                  value={pFooter}
                  onChange={(e) => setPFooter(e.target.value)}
                  className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] transition-all text-white"
                />
              </div>

              {/* Action buttons */}
              <div className="flex space-x-4 pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="flex-1 bg-[#600138] hover:bg-[#7A0247] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl"
                >
                  SAVE EQUIPMENT
                </button>
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-8 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- FORM MODAL: CATEGORY --- */}
      {categoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#140e12] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl relative">
            <button
              onClick={() => setCategoryModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>

            <form onSubmit={saveCategoryForm} className="p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-xl font-black uppercase italic tracking-wide text-[#E2D1A1]">
                  {editCategory ? 'EDIT CATEGORY' : 'ADD NEW CATEGORY'}
                </h3>
              </div>

              {/* Slug */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Category Slug / Route</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. drones (lowercase, no spaces)"
                  disabled={!!editCategory}
                  value={cSlug}
                  onChange={(e) => setCSlug(e.target.value)}
                  className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] disabled:opacity-50"
                />
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Display Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DRONES"
                  value={cName}
                  onChange={(e) => setCName(e.target.value)}
                  className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138]"
                />
              </div>

              {/* Banner Image selector */}
              <div className="space-y-3">
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Category Banner Image Selection</label>
                <div className="grid grid-cols-4 gap-2.5 p-3.5 bg-[#1c1418] border border-white/5 rounded-2xl max-h-28 overflow-y-auto">
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCImage(img.url)}
                      className={`relative aspect-video bg-black border rounded-xl overflow-hidden hover:border-[#600138] transition-all flex items-center justify-center p-0.5 ${cImage === img.url ? 'border-[#600138]' : 'border-white/10'
                        }`}
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Or enter custom Banner URL</span>
                  <input
                    type="url"
                    placeholder="Custom image link..."
                    value={cImage}
                    onChange={(e) => setCImage(e.target.value)}
                    className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#600138]"
                  />
                </div>
                <div className="space-y-1 mt-2">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Or upload custom banner file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCategoryFile(e.target.files[0])}
                    className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] text-gray-400"
                  />
                  {categoryFile && (
                    <p className="text-xs text-green-400 font-bold">Selected file: {categoryFile.name}</p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3 pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="flex-1 bg-[#600138] hover:bg-[#7A0247] text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl"
                >
                  SAVE CATEGORY
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryModalOpen(false)}
                  className="px-6 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- FORM MODAL: OFFER/BANNER --- */}
      {offerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#140e12] border border-white/10 rounded-3xl w-full max-w-xl shadow-2xl relative">
            <button
              onClick={() => setOfferModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>

            <form onSubmit={saveOfferForm} className="p-8 space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-xl font-black uppercase italic tracking-wide text-[#E2D1A1]">
                  {editOffer ? 'EDIT OFFER BANNER' : 'ADD NEW BANNER / OFFER'}
                </h3>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Banner Title / Header</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Power Up Your Production"
                  value={oTitle}
                  onChange={(e) => setOTitle(e.target.value)}
                  className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138]"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Subtitle / Details</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Affordable rental for Cinema camera, lights and other accessories"
                  value={oSubtitle}
                  onChange={(e) => setOSubtitle(e.target.value)}
                  className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3.5 px-4 text-xs font-bold focus:outline-none focus:border-[#600138]"
                />
              </div>

              {/* Banner Image selector */}
              <div className="space-y-3">
                <label className="block text-gray-400 text-xs font-black uppercase tracking-widest">Poster Background Image Selection</label>
                <div className="grid grid-cols-4 gap-2.5 p-3.5 bg-[#1c1418] border border-white/5 rounded-2xl max-h-28 overflow-y-auto">
                  {PRESET_IMAGES.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setOImage(img.url)}
                      className={`relative aspect-video bg-black border rounded-xl overflow-hidden hover:border-[#600138] transition-all flex items-center justify-center p-0.5 ${oImage === img.url ? 'border-[#600138]' : 'border-white/10'
                        }`}
                    >
                      <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Or enter custom Banner URL</span>
                  <input
                    type="url"
                    placeholder="Custom background link..."
                    value={oImage}
                    onChange={(e) => setOImage(e.target.value)}
                    className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#600138]"
                  />
                </div>
                <div className="space-y-1 mt-2">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Or upload custom banner file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setOfferFile(e.target.files[0])}
                    className="w-full bg-[#1c1418] border border-white/5 rounded-2xl py-3 px-4 text-xs font-bold focus:outline-none focus:border-[#600138] text-gray-400"
                  />
                  {offerFile && (
                    <p className="text-xs text-green-400 font-bold">Selected file: {offerFile.name}</p>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-3 pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="flex-1 bg-[#600138] hover:bg-[#7A0247] text-white py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl"
                >
                  SAVE POSTER
                </button>
                <button
                  type="button"
                  onClick={() => setOfferModalOpen(false)}
                  className="px-6 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
};

export default DashboardPage;
