"""Import the public ICS catalogue snapshot (HTML cached in /tmp/ics-catalog).
Content is parsed as data only. Marketing summaries are edited separately.
"""
from bs4 import BeautifulSoup
from pathlib import Path
from urllib.parse import urljoin
import json,re,hashlib,subprocess
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
from io import BytesIO
BASE='https://www.ics-dryice.com'
CACHE=Path('/tmp/ics-catalog'); OUT=Path('public/ics/catalog'); OUT.mkdir(parents=True,exist_ok=True)
soups={f.stem:BeautifulSoup(f.read_text(),'html.parser') for f in CACHE.glob('*.html')}
asset_urls={}; image_by_id={}; title_by_id={}
def absurl(url): return urljoin(BASE,url)
def asset(url):
 url=absurl(url);name=hashlib.sha256(url.encode()).hexdigest()[:16]+'.webp';asset_urls[url]='/ics/catalog/'+name;return asset_urls[url]
def text(n):return re.sub(r'\s+',' ',n.get_text(' ',strip=True)).strip()
for name,s in sorted(soups.items()):
 for a in s.select('a[href*="/product/detail/"]'):
  m=re.search(r'/detail/(\d+)',a['href']);img=a.select_one('img');h=a.select_one('h2')
  if not m:continue
  id=m[1]
  if img and id not in image_by_id:image_by_id[id]=img['src']
  if h:title_by_id[id]=text(h)
groups={'57':'Nozzles','69':'Hoses','73':'Blast guns','82':'External modules','66':'Production accessories','71':'Other accessories','72':'Safety equipment'}
membership={}
for id,g in groups.items():
 for a in soups['category-'+id].select('a[href*="/product/detail/"]'):
  pid=re.search(r'/detail/(\d+)',a['href'])[1];membership.setdefault(pid,[]).append(g)
clean=['930','885','923','856','929','857','858','924','925','928']; production=['859'];automation=['926']
products=[]
for name,s in sorted(soups.items()):
 if not name.startswith('product-'):continue
 id=name.split('-')[1]
 if id in {'879','880','881'}:continue  # Loose dry ice is outside the four equipment categories.
 d=s.select_one('.product-detail')
 if not d:continue
 title=s.title.text.rsplit('|',1)[0].strip()
 category='cleaning' if id in clean else 'production' if id in production else 'automation' if id in automation else 'accessories'
 images=[]
 if id in image_by_id:images.append(image_by_id[id])
 for a in d.select('a.page-gallery-image[href]'):images.append(a['href'])
 for img in d.select('.slider img:not(.d-md-none), .fr-view img'):
  if img.get('src'):images.append(img['src'])
 images=list(dict.fromkeys(absurl(i) for i in images))
 # Product fields and tables, excluding the related-products footer.
 specs=[]
 for t in d.select('#parameters-data table'):
  rows=[[text(c) for c in tr.find_all(['th','td'],recursive=False)] for tr in t.select('tr')]
  specs.append([r for r in rows if any(r)])
 highlights=[]
 for fv in d.select('.fr-view'):
  h=fv.find(['h4']);ps=fv.find_all('p')
  if h and ps:highlights.append([text(h),' '.join(text(x) for x in ps)])
 description=[]
 for fv in d.select('.fr-view'):
  if fv.select_one('h4'):continue
  for p in fv.select('p'):
   if p.find_parent('table') or p.select_one('a,iframe'):continue
   t=text(p)
   if len(t)>35:description.append(t)
 videos=list(dict.fromkeys(absurl(x['src']).split('?')[0] for x in d.select('iframe[src]') if 'youtube' in x['src'] or 'vimeo' in x['src']))
 downloads=[{'title':text(a),'url':absurl(a['href'])} for a in d.select('a[href]') if '/data/files/' in a['href']]
 related=list(dict.fromkeys(re.search(r'/detail/(\d+)',a['href'])[1] for a in d.select('#accesorries a[href*="/detail/"]')))
 spins=[{'folder':x['data-path'],'frames':int(x['data-frames'])} for x in d.select('[data-path][data-frames]')]
 slug=title.lower().replace('ø','diameter');slug=re.sub(r'[^a-z0-9]+','-',slug).strip('-')+'-'+id
 products.append(dict(id=id,slug=slug,title=title,category=category,groups=membership.get(id,[]),images=[asset(x) for x in images],source=BASE+'/en/product/detail/'+id,summary='',features=[],specs=specs,highlights=highlights,videos=videos,downloads=downloads,related=related,spins=spins))
 Path('/tmp/ics-catalog/'+id+'-text.json').write_text(json.dumps(description,ensure_ascii=False,indent=2))
# A legacy accessory is linked from IC 030, but its own detail URL is unavailable.
if '889' in image_by_id:
 products.append(dict(id='889',slug='compressed-air-hose-1-1-2-889',title=title_by_id['889'],category='accessories',groups=['Hoses'],images=[asset(image_by_id['889'])],source=BASE+'/en/product/detail/889',summary='Compressed-air hose listed with the IC 030. Contact ICS for the current specification and availability.',features=[],specs=[],highlights=[],videos=[],downloads=[],related=[],spins=[],sourceUnavailable=True))
Path('app/catalog-data.json').write_text(json.dumps(products,ensure_ascii=False,indent=2))
def download(item):
 url,path=item;dest=Path('public'+path)
 if dest.exists():return
 result=subprocess.run(['curl','-L','--fail','--retry','2','--max-time','30','-s',url],capture_output=True)
 if result.returncode:print('FAILED',url);return
 try:
  im=Image.open(BytesIO(result.stdout));im.thumbnail((1800,1800));im.save(dest,'WEBP',quality=87)
 except Exception as e:print('IMAGE ERROR',url,e)
with ThreadPoolExecutor(max_workers=5) as pool:list(pool.map(download,asset_urls.items()))
Path('public/ics/catalog/sources.json').write_text(json.dumps({'retrieved':'2026-10-15','index':BASE+'/en/products','assets':asset_urls},indent=2))
print('Products:',len(products),'Images:',len(asset_urls),'Videos:',sum(len(x['videos']) for x in products),'Downloads:',sum(len(x['downloads']) for x in products))
