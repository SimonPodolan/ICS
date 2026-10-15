"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "./catalog";
const productHref = (product: Product) => `/products/${product.category}/${product.slug}`;
import RollingText from "./rolling-text";
export default function CatalogListing({products,compact=false}:{products:Product[];compact?:boolean}) {
 const [query,setQuery]=useState("");const [group,setGroup]=useState("All accessories");
 const groups=Array.from(new Set(products.flatMap(p=>p.groups)));
 const filtered=products.filter(p=>(group==='All accessories'||p.groups.includes(group))&&`${p.title} ${p.summary} ${p.specs.flat(2).join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()));
 return <section className={`catalog-listing ${compact?'catalog-listing-compact':''}`} aria-label="Products">{compact&&<div className="catalog-filters"><label>Find an accessory<input type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Name, part number or machine…"/></label><label>Browse by type<select value={group} onChange={e=>setGroup(e.target.value)}><option>All accessories</option>{groups.map(g=><option key={g}>{g}</option>)}</select></label><p role="status">{filtered.length} results</p></div>}
 <div className="catalog-product-list">{filtered.map((product,index)=><Link href={productHref(product)} key={product.id} className="catalog-product-row roll-trigger"><div className="catalog-product-image"><Image src={product.images[0]} alt={product.title} width={900} height={760} sizes={compact?'(max-width:700px) 100px, 160px':'(max-width:700px) 90vw, 40vw'} priority={index===0}/></div><div className="catalog-product-copy"><h2>{compact?product.title:<RollingText>{product.title}</RollingText>}</h2><p>{product.summary}</p>{!compact&&product.highlights.length>0&&<dl>{product.highlights.slice(0,3).map(([name,value])=><div key={name}><dt>{name}</dt><dd>{value.replace(/^Low weight: |^Weight /,'')}</dd></div>)}</dl>}</div><span className="catalog-product-arrow" aria-hidden="true">↗</span></Link>)}</div>
 {filtered.length===0&&<div className="catalog-empty"><h2>No matching accessories.</h2><p>Try a model number or choose another type.</p><button className="ui-action ui-action--secondary" onClick={()=>{setQuery('');setGroup('All accessories');}}>Clear filters ↗</button></div>}</section>;
}
