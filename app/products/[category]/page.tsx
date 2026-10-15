
import PageTransition from "../../page-transition";
import { Suspense } from "react";
import Loading from "../loading";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, categoryProducts } from "../../catalog";
import CatalogListing from "../../catalog-listing";
export function generateStaticParams() { return categories.map(c=>({category:c.slug})); }
export async function generateMetadata({params}:{params:Promise<{category:string}>}) { const {category}=await params; const item=categories.find(c=>c.slug===category); return {title:`${item?.title || "Products"} — ICS`}; }
async function CategoryContent({params}:{params:Promise<{category:string}>}) {
 const {category}=await params; const item=categories.find(c=>c.slug===category); if(!item)notFound();
 return <PageTransition><main id="catalog-main"><header className="catalog-intro category-intro"><div><p className="catalog-breadcrumb"><Link href="/products">Products</Link><span>/</span>{item.action.replace('.','')}</p><h1>{item.title}</h1></div><p className="catalog-intro-aside">{item.intro}</p></header>
 <nav className="catalog-category-nav" aria-label="Product categories">{categories.map(c=><Link key={c.slug} href={`/products/${c.slug}`} aria-current={c.slug===category?'page':undefined}>{c.action}</Link>)}</nav>
 {category==='automation'&&<section className="automation-note"><h2>Built around<br />your operation.</h2><div><p>ICS designs and manufactures single-purpose equipment and integrated production systems, from initial engineering through installation, commissioning and maintenance.</p><p>The APS system below combines dry ice production and packaging. For a different process, talk to the engineering team about a custom solution.</p></div></section>}
 <CatalogListing products={categoryProducts(category)} compact={category==='accessories'}/></main></PageTransition>;
}

export default function Page(props:{params:Promise<{category:string}>}) { return <Suspense fallback={<Loading/>}><CategoryContent {...props}/></Suspense>; }
