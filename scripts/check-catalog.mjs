import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const products=JSON.parse(readFileSync('app/catalog-data.json','utf8'));
const ids=new Set(products.map(p=>p.id));
assert.equal(ids.size,products.length,'Duplicate product IDs');
assert.equal(new Set(products.map(p=>`${p.category}/${p.slug}`)).size,products.length,'Duplicate routes');
for(const product of products){
 assert.ok(product.images.length,`${product.id}: missing photographs`);
 assert.ok(product.specs.length||product.sourceUnavailable,`${product.id}: missing specifications without explanation`);
 for(const image of product.images)assert.ok(existsSync(`public${image}`),`${product.id}: missing ${image}`);
 for(const related of product.related)assert.ok(ids.has(related),`${product.id}: broken related product ${related}`);
 for(const spin of product.spins){assert.ok(spin.frames>0);for(let f=1;f<=spin.frames;f++)assert.ok(existsSync(`public/ics/catalog/360/${spin.folder}/${f}.webp`),`${spin.folder}: missing frame ${f}`);}
 for(const file of product.downloads){assert.ok(file.url.startsWith('/ics/documents/'),`${product.id}: external document link`);assert.ok(existsSync(`public${file.url}`),`${product.id}: missing document ${file.url}`);}
 for(const video of product.videos)assert.ok(video.startsWith('https://www.youtube.com/embed/'));
}
console.log(`Verified ${products.length} product records, image assets, 360° sequences, media URLs and related-product links.`);
