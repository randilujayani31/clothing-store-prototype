import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Instagram, LayoutDashboard, Menu, MessageCircle, PackagePlus, Pencil, Plus, Search, ShoppingBag, Trash2, X } from 'lucide-react';

const demoProducts = [
  {id:'L001',name:'Essential Cotton Tee',category:'T-Shirts',price:2490,size:'S, M, L, XL',color:'Cream',status:'In Stock',image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85'},
  {id:'L002',name:'Everyday Relaxed Tee',category:'T-Shirts',price:2790,size:'S, M, L',color:'White',status:'In Stock',image:'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85'},
  {id:'L003',name:'Weekend Linen Shirt',category:'Shirts',price:4290,size:'M, L, XL',color:'Sand',status:'In Stock',image:'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=1000&q=85'},
  {id:'L004',name:'Modern Basic Tee',category:'T-Shirts',price:2190,size:'S, M, L, XL',color:'Black',status:'In Stock',image:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=85'},
  {id:'L005',name:'Soft Summer Dress',category:'Dresses',price:5490,size:'S, M, L',color:'Beige',status:'In Stock',image:'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85'},
  {id:'L006',name:'Lightweight Layer',category:'Shirts',price:3990,size:'S, M, L',color:'Ivory',status:'Out of Stock',image:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85'}
];
const defaults={brand:'LUNA',tagline:'Designed for every day.',whatsapp:'94771234567',instagram:'https://instagram.com/',heroTitle:'Effortless style. Everyday confidence.',heroSubtitle:'Considered essentials for days that feel like you.'};
function fromStorage(k,fallback){try{const v=localStorage.getItem(k);return v?JSON.parse(v):fallback}catch{return fallback}}
function useStored(k,fallback){const [v,setV]=useState(()=>fromStorage(k,fallback));useEffect(()=>{localStorage.setItem(k,JSON.stringify(v))},[k,v]);return [v,setV]}
const money=n=>'Rs. '+Number(n||0).toLocaleString('en-LK');
function waLink(p,settings){const number=settings.whatsapp.replace(/\D/g,'');const msg=`Hi ${settings.brand}! I'm interested in this item:\nProduct: ${p.name}\nCode: ${p.id}\nPrice: ${money(p.price)}\nSizes: ${p.size}\nColor: ${p.color}\n\nIs it available?`;return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`}
function WhatsAppButton({p,settings}){return <a className="btn btn-dark order" href={waLink(p,settings)} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Order Now</a>}
function Header({settings}){const [open,setOpen]=useState(false);return <header className="header"><div className="container nav"><Link className="brand" to="/" onClick={()=>setOpen(false)}>{settings.brand}<span className="brand-dot">.</span></Link><button aria-label="Toggle menu" className="menu-btn" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button><nav className={open?'links links-open':'links'}><NavLink onClick={()=>setOpen(false)} to="/">Home</NavLink><NavLink onClick={()=>setOpen(false)} to="/shop">Collection</NavLink><Link onClick={()=>setOpen(false)} to="/#about">About</Link><Link onClick={()=>setOpen(false)} className="admin-link" to="/admin"><LayoutDashboard size={16}/> Admin Demo</Link></nav></div></header>}
function ProductCard({p,settings}){return <article className="product-card"><div className="photo"><img src={p.image} alt={p.name} loading="lazy"/><span className="chip">{p.category}</span></div><div className="product-info"><p className="muted micro">{p.id} • {p.color}</p><h3>{p.name}</h3><div className="price-line"><strong>{money(p.price)}</strong><span className={p.status==='In Stock'?'status yes':'status no'}>{p.status}</span></div><p className="muted micro">Sizes: {p.size}</p><WhatsAppButton p={p} settings={settings}/></div></article>}
function Home({products,settings}){return <><section className="hero"><div className="container hero-inner"><div className="hero-copy"><p className="eyebrow">NEW SEASON / EVERYDAY EDIT</p><h1>{settings.heroTitle}</h1><p>{settings.heroSubtitle}</p><Link className="btn btn-dark hero-btn" to="/shop">Explore the collection <ArrowRight size={18}/></Link></div><div className="hero-image"><img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=85" alt="Fashion collection"/></div></div></section><section className="container section"><div className="section-heading"><div><p className="eyebrow">CURATED FOR YOU</p><h2>Discover our favourites</h2></div><Link className="text-link" to="/shop">Shop all <ArrowRight size={17}/></Link></div><div className="products">{products.slice(0,4).map(p=><ProductCard key={p.id} p={p} settings={settings}/>)}</div></section><section className="about-band" id="about"><div className="container about-inner"><div><p className="eyebrow">ABOUT THE BRAND</p><h2>Less noise. More you.</h2></div><p>Simple, comfortable clothing selected for the moments that matter. Browse your favourites here and order directly through WhatsApp — no account or checkout required.</p></div></section></>}
function Shop({products,settings}){const [search,setSearch]=useState('');const [category,setCategory]=useState('All');const categories=['All',...new Set(products.map(p=>p.category))];const shown=products.filter(p=>(category==='All'||p.category===category)&&(`${p.name} ${p.color} ${p.id}`).toLowerCase().includes(search.toLowerCase()));return <main className="container section shop-section"><p className="eyebrow">THE LUNA EDIT</p><h1 className="page-title">The Collection</h1><p className="muted">Find something you love, then order directly through WhatsApp.</p><div className="filters"><div className="search"><Search size={18}/><input aria-label="Search products" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search items..."/></div><div className="category-list">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={'category '+(category===c?'active':'')}>{c}</button>)}</div></div><div className="products">{shown.map(p=><ProductCard key={p.id} p={p} settings={settings}/>)}</div>{!shown.length&&<p className="empty">No products found. Try another search.</p>}</main>}
const blank={id:'',name:'',category:'T-Shirts',price:'',size:'S, M, L',color:'Black',status:'In Stock',image:''};
function Admin({products,setProducts,settings,setSettings}){const [editing,setEditing]=useState(null);const [draft,setDraft]=useState(blank);const [notice,setNotice]=useState('');const [tab,setTab]=useState('products');const navigate=useNavigate();const openAdd=()=>{setDraft({...blank,id:'L'+String(Date.now()).slice(-6)});setEditing('new')};const openEdit=p=>{setDraft({...p});setEditing(p.id)};const save=e=>{e.preventDefault();if(!draft.name.trim()||!draft.id.trim()||!draft.image.trim()||Number(draft.price)<0||!Number.isFinite(Number(draft.price))){setNotice('Please fill all required fields with a valid price.');return}const p={...draft,price:Number(draft.price)};if(editing==='new'&&products.some(x=>x.id===p.id)){setNotice('Product code already exists.');return}setProducts(editing==='new'?[p,...products]:products.map(x=>x.id===editing?p:x));setEditing(null);setNotice('Saved in this browser only.');};const remove=p=>{if(window.confirm(`Delete ${p.name}?`)){setProducts(products.filter(x=>x.id!==p.id));setNotice('Product deleted from this browser.')}};const reset=()=>{if(window.confirm('Restore original demo products and settings in this browser?')){setProducts(demoProducts);setSettings(defaults);setNotice('Demo reset complete.')}};return <main className="admin-page"><div className="container"><div className="demo-warning"><strong>PUBLIC DEMO — no login or shared database.</strong> Changes are saved only in this browser, not for other visitors. Never enter confidential information.</div><div className="admin-heading"><div><p className="eyebrow">DEMO WORKSPACE</p><h1>Store Dashboard</h1><p className="muted">Explore how a business owner could manage their catalogue.</p></div><button className="btn btn-outline" onClick={()=>navigate('/')}><ArrowLeft size={16}/> View Website</button></div><div className="stats"><div><span>Total Products</span><strong>{products.length}</strong></div><div><span>In Stock</span><strong>{products.filter(p=>p.status==='In Stock').length}</strong></div><div><span>Categories</span><strong>{new Set(products.map(p=>p.category)).size}</strong></div></div><div className="admin-tabs"><button className={tab==='products'?'chosen':''} onClick={()=>setTab('products')}>Products</button><button className={tab==='settings'?'chosen':''} onClick={()=>setTab('settings')}>Store Settings</button><button className="reset" onClick={reset}>Reset Demo</button></div>{notice&&<p className="notice" role="status">{notice}</p>}{tab==='products'?<div className="admin-panel"><div className="panel-heading"><div><h2>Manage Products</h2><p className="muted micro">Edit products to preview the admin experience.</p></div><button className="btn btn-dark" onClick={openAdd}><Plus size={17}/> Add Product</button></div><div className="table-wrap"><table><thead><tr><th>Product</th><th>Code</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead><tbody>{products.map(p=><tr key={p.id}><td><div className="row-product"><img src={p.image} alt=""/><div><strong>{p.name}</strong><span>{p.category}</span></div></div></td><td>{p.id}</td><td>{money(p.price)}</td><td><span className={p.status==='In Stock'?'status yes':'status no'}>{p.status}</span></td><td><div className="table-actions"><button aria-label={'Edit '+p.name} onClick={()=>openEdit(p)}><Pencil size={17}/></button><button aria-label={'Delete '+p.name} onClick={()=>remove(p)}><Trash2 size={17}/></button></div></td></tr>)}</tbody></table></div></div>:<form className="settings admin-panel" onSubmit={e=>{e.preventDefault();setNotice('Settings saved in this browser only.')}}><h2>Store Settings</h2>{[['brand','Brand name'],['whatsapp','WhatsApp number (country code, no + sign)'],['instagram','Instagram URL'],['heroTitle','Homepage headline'],['heroSubtitle','Homepage subtitle']].map(([key,label])=><label key={key}>{label}<input required value={settings[key]} onChange={e=>setSettings({...settings,[key]:e.target.value})}/></label>)}<button className="btn btn-dark" type="submit"><Check size={17}/> Save Settings</button><p className="micro muted">WhatsApp example: 94771234567. Replace demo number before sharing for actual enquiries.</p></form>}</div>{editing!==null&&<div className="modal-backdrop" onClick={()=>setEditing(null)}><form className="modal" onClick={e=>e.stopPropagation()} onSubmit={save}><div className="modal-title"><h2>{editing==='new'?'Add Product':'Edit Product'}</h2><button type="button" aria-label="Close" onClick={()=>setEditing(null)}><X size={20}/></button></div>{[['name','Product name'],['id','Product code'],['category','Category'],['price','Price (Rs.)'],['size','Sizes (comma separated)'],['color','Colour'],['image','Image URL']].map(([key,label])=><label key={key}>{label}<input required type={key==='price'?'number':'text'} min={key==='price'?'0':undefined} value={draft[key]} onChange={e=>setDraft({...draft,[key]:e.target.value})}/></label>)}<label>Availability<select value={draft.status} onChange={e=>setDraft({...draft,status:e.target.value})}><option>In Stock</option><option>Out of Stock</option></select></label><button className="btn btn-dark" type="submit">Save Product</button></form></div>}</main>}
function Footer
function Footer({ settings }) {
  const phone = "94771234567"; // Replace with business number
  const email = "hello@lunafashion.lk";

  return (
    <footer className="footer">
      <div className="container footer-grid">

        {/* Brand information */}
        <div className="footer-column">
          <h2 className="footer-brand">{settings.brand}.</h2>
          <p>{settings.tagline}</p>
          <p>
            Discover stylish, comfortable clothing made
            for your everyday moments.
          </p>
        </div>

        {/* Quick links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop Collection</Link>
          <Link to="/#about">About Us</Link>
          <Link to="/admin">Admin Demo</Link>
        </div>

        {/* Contact information */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <a href={`tel:+${phone}`}>+{phone}</a>
          <a href={`mailto:${email}`}>{email}</a>
          <p>Sri Lanka</p>
          <a
            href={`https://wa.me/${settings.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Social media */}
        <div className="footer-column">
          <h3>Follow Us</h3>
          <a href={settings.instagram} target="_blank"
             rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://facebook.com/" target="_blank"
             rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://tiktok.com/" target="_blank"
             rel="noopener noreferrer">
            TikTok
          </a>
          <a href={`https://wa.me/${settings.whatsapp}`}
             target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>
          © {new Date().getFullYear()} {settings.brand}.
          All Rights Reserved.
        </p>
        <p>Clothing Website Prototype</p>
      </div>
    </footer>
  );
}
export default function App(){const [products,setProducts]=useStored('luna-products-v1',demoProducts);const [settings,setSettings]=useStored('luna-settings-v1',defaults);return <><Header settings={settings}/><Routes><Route path="/" element={<Home products={products} settings={settings}/>}/><Route path="/shop" element={<Shop products={products} settings={settings}/>}/><Route path="/admin" element={<Admin products={products} setProducts={setProducts} settings={settings} setSettings={setSettings}/>}/><Route path="*" element={<div className="container section"><h1>Page not found</h1><Link to="/">Back to home</Link></div>}/></Routes><Footer settings={settings}/></>}
