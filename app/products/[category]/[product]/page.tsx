
import PageTransition from "../../../page-transition";
import ProductEnquiry from "../../../product-enquiry";
import { Suspense } from "react";
import Loading from "../../loading";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, categories, productHref } from "../../../catalog";
import specGroups from "../../../catalog-spec-groups.json";
import { ProductGallery, ProductSpin, ProductVideo } from "../../../catalog-media";
export function generateStaticParams(){return products.map(p=>({category:p.category,product:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{category:string;product:string}>}){const {product}=await params;const p=products.find(p=>p.slug===product);return {title:`${p?.title || 'Product'} — ICS`,description:p?.summary};}
async function ProductContent({params}:{params:Promise<{category:string;product:string}>}){
 const {category,product:slug}=await params;const product=products.find(p=>p.slug===slug&&p.category===category);if(!product)notFound();const family=categories.find(c=>c.slug===category)!;
 const sections=(specGroups as Record<string,{title:string;lines:string[]}[]>)[product.id]||[];
 const related=product.related.map(id=>products.find(p=>p.id===id)).filter(p=>p!==undefined);
 return <PageTransition><main id="catalog-main"><div className="catalog-detail-hero"><p className="catalog-breadcrumb"><Link href="/products">Products</Link><span>/</span><Link href={`/products/${category}`}>{family.action.replace('.','')}</Link><span>/</span>{product.title}</p><div className="catalog-detail-grid"><div className="catalog-detail-title"><h1>{product.title}</h1><p>{product.summary}</p><ProductEnquiry product={product.title}>Ask about this product</ProductEnquiry></div><div className="catalog-detail-image"><Image src={product.images[0]} alt={product.title} width={1400} height={1100} priority sizes="(max-width:700px) 90vw, 60vw"/></div></div>{product.highlights.length>0&&<dl className="catalog-key-specs">{product.highlights.map(([name,value])=><div key={name}><dt>{name}</dt><dd>{value.replace(/^Low weight: |^Weight /,'')}</dd></div>)}</dl>}</div>
 <nav className="catalog-detail-nav" aria-label="Product information">{product.features.length>0&&<a href="#overview">Overview</a>}<a href="#specifications">Specifications</a><a href="#gallery">Gallery</a>{product.spins.length>0&&<a href="#rotate">360° view</a>}{product.videos.length>0&&<a href="#video">In action</a>}{product.downloads.length>0&&<a href="#downloads">Downloads</a>}{related.length>0&&<a href="#accessories">Accessories</a>}</nav>
 {product.features.length>0&&<section id="overview" className="catalog-detail-section catalog-overview"><h2>Made for<br /><span>your process.</span></h2><div>{product.features.map(feature=><p key={feature}>{feature}</p>)}</div></section>}
 <section id="specifications" className="catalog-detail-section"><div className="catalog-section-heading"><h2>The technical details.</h2></div>{sections.length>0?<div className="catalog-spec-groups">{sections.map((g,i)=><div key={i}><h3>{g.title}</h3>{g.lines.map((line,j)=><p key={j}>{line}</p>)}</div>)}</div>:product.specs.length>0?<div className="catalog-spec-pairs">{product.specs.flat().map((row,i)=><div key={i}><h3>{row[0]}</h3><p>{row.slice(1).join(' · ')}</p></div>)}</div>:<p>This accessory is listed for the IC 030. Contact the team for the current specification.</p>}</section>
 <section id="gallery" className="catalog-detail-section catalog-gallery-section"><div className="catalog-section-heading"><h2>A closer look.</h2><p>{product.images.length} photographs & views</p></div><ProductGallery images={product.images} title={product.title}/></section>
 {product.spins.length>0&&<section id="rotate" className="catalog-detail-section"><div className="catalog-section-heading"><h2>Every angle.</h2><p>You control the view.</p></div><div className="catalog-spins">{product.spins.map(s=><ProductSpin key={s.folder} {...s}/>)}</div></section>}
 {product.videos.length>0&&<section id="video" className="catalog-detail-section"><h2>See the difference.</h2>{product.videos.map(url=><ProductVideo key={url} url={url} title={product.title}/>)}</section>}
 {product.downloads.length>0&&<section id="downloads" className="catalog-detail-section catalog-downloads"><h2>Keep the details.</h2><div>{product.downloads.map((file,i)=><a key={i} href={file.url} target="_blank" rel="noreferrer">{file.title}<span>PDF ↗</span></a>)}</div></section>}
 {related.length>0&&<section id="accessories" className="catalog-detail-section"><div className="catalog-section-heading"><h2>Complete your setup.</h2><Link className="ui-action ui-action--secondary" href="/products/accessories">All accessories ↗</Link></div><div className="catalog-related">{related.map(item=><Link key={item.id} href={productHref(item)}><Image src={item.images[0]} alt="" width={150} height={130} sizes="90px"/><span>{item.title}</span><span>↗</span></Link>)}</div></section>}
 <section className="catalog-help"><h2>Make it work<br /><span>for you.</span></h2><div><p>Discuss your application, the right configuration and compatible accessories with ICS.</p><ProductEnquiry product={product.title}>{`Talk about ${product.title.split(",")[0]}`}</ProductEnquiry></div></section></main></PageTransition>;
}

export default function Page(props:{params:Promise<{category:string;product:string}>}) { return <Suspense fallback={<Loading/>}><ProductContent {...props}/></Suspense>; }
