
import PageTransition from "../page-transition";
import ProductEnquiry from "../product-enquiry";
import Link from "next/link";
import Image from "next/image";
import { categories, products, categoryProducts, cataloguePdf } from "../catalog";
import RollingText from "../rolling-text";
export const metadata = { title: "Products — ICS", description: "Explore ICS dry ice blasters, production systems, automation and accessories." };
export default function ProductsPage() {
 return <PageTransition><main id="catalog-main"><header className="catalog-intro"><div><p className="catalog-breadcrumb"><Link href="/">ICS</Link><span>/</span>Products</p><h1>Every part.<br /><span>One process.</span></h1></div><div className="catalog-intro-aside"><p>From the first pellet to the final clean.<br />Explore the complete ICS range.</p><a className="ui-action ui-action--secondary" href={cataloguePdf} target="_blank" rel="noreferrer">2026 catalogue <span>↗</span></a></div></header>
 <div className="catalog-category-list">{categories.map((category,index) => { const product=products.find(p=>p.id===category.id)!;return <Link href={`/products/${category.slug}`} key={category.slug} className="catalog-category-row roll-trigger"><div className="catalog-category-title"><span className="catalog-count">{String(categoryProducts(category.slug).length).padStart(2,"0")} {category.slug==="accessories"?"accessories":"products"}</span><h2><RollingText>{category.action}</RollingText></h2><p>{category.intro}</p><span className="catalog-row-cta">Explore the range <span>↗</span></span></div><div className="catalog-category-picture"><Image src={category.image} alt={product.title} width={1000} height={800} sizes="(max-width:700px) 90vw, 48vw" priority={index===0}/></div></Link>;})}</div>
 <section className="catalog-help"><h2>Not sure where<br /><span>to start?</span></h2><div><p>Tell us what you clean, how often and what air supply you have. We can help you find the right system.</p><ProductEnquiry>Talk to ICS</ProductEnquiry></div></section></main></PageTransition>;
}
