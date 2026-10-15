"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

function Lightbox({src,title,close}:{src:string;title:string;close:()=>void}) {
 const ref=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const dialog=ref.current!;const focus=document.activeElement;const overflow=document.body.style.overflow;dialog.showModal();document.body.style.overflow='hidden';return()=>{dialog.close();document.body.style.overflow=overflow;if(focus instanceof HTMLElement&&focus.isConnected)focus.focus({preventScroll:true});};},[]);
 return <dialog ref={ref} className="catalog-lightbox" aria-label={title} onCancel={close} onClick={e=>{if(e.target===e.currentTarget)close();}}><button className="ui-action ui-action--secondary" onClick={close} autoFocus>Close <span>×</span></button><Image src={src} alt={title} width={1800} height={1500} sizes="95vw"/></dialog>;
}
export function ProductGallery({images,title}:{images:string[];title:string}) {
 const [selected,setSelected]=useState(0);const [zoom,setZoom]=useState(false);
 return <div className="catalog-gallery"><button className="catalog-gallery-main" onClick={()=>setZoom(true)} aria-label={`Enlarge ${title}, image ${selected+1}`}><Image src={images[selected]} alt={`${title}, view ${selected+1}`} width={1800} height={1200} sizes="(max-width:700px) 92vw, 80vw"/><span>View full image ↗</span></button><div className="catalog-gallery-controls"><p aria-live="polite">{String(selected+1).padStart(2,'0')} / {String(images.length).padStart(2,'0')}</p><div><button className="ui-action ui-action--secondary" aria-label="Previous image" onClick={()=>setSelected((selected+images.length-1)%images.length)}>←</button><button className="ui-action ui-action--secondary" aria-label="Next image" onClick={()=>setSelected((selected+1)%images.length)}>→</button></div></div><div className="catalog-thumbnails" role="group" aria-label="Product photographs">{images.map((src,i)=><button key={src} aria-label={`Show image ${i+1}`} aria-pressed={i===selected} onClick={()=>setSelected(i)}><Image src={src} alt="" width={150} height={100} sizes="100px"/></button>)}</div>{zoom&&<Lightbox src={images[selected]} title={title} close={()=>setZoom(false)}/>}</div>;
}
export function ProductVideo({url,title}:{url:string;title:string}) {
 const [playing,setPlaying]=useState(false);
 return <div className="catalog-video">{playing?<iframe src={url.replace('www.youtube.com','www.youtube-nocookie.com')} title={`${title} — application video`} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin"/>:<button onClick={()=>setPlaying(true)} className="catalog-video-cover"><span className="catalog-play">▷</span><span>See {title.split(',')[0]} in action</span><span>Play application video ↗</span></button>}<a className="ui-action ui-action--secondary" href={url.replace('/embed/','/watch?v=')} target="_blank" rel="noreferrer">Watch on YouTube ↗</a></div>;
}
export function ProductSpin({folder,frames}:{folder:string;frames:number}) {
 const [frame,setFrame]=useState(1);const [failed,setFailed]=useState(false);
 const drag=useRef<{x:number;frame:number}|null>(null);
 return <div className="catalog-spin"><div className="catalog-spin-image" onPointerDown={e=>{if(e.pointerType==='mouse'&&e.button!==0)return;drag.current={x:e.clientX,frame};e.currentTarget.setPointerCapture(e.pointerId);}} onPointerMove={e=>{if(!drag.current)return;setFrame(((drag.current.frame-1+Math.round((e.clientX-drag.current.x)/9))%frames+frames)%frames+1);}} onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}}>
 {failed?<p>The original 360° image is currently unavailable.</p>:/* The ICS frame sequence is served locally; the range input also supports keyboard rotation. */<Image unoptimized src={`/ics/catalog/360/${folder}/${frame}.webp`} alt={`${folder.toUpperCase()}, 360° view ${frame}`} width={800} height={600} draggable={false} onError={()=>setFailed(true)}/>}</div><label>{folder.toUpperCase()} <span>Drag to rotate · 360°</span><input aria-label={`Rotate ${folder}`} type="range" min={1} max={frames} value={frame} onChange={e=>setFrame(Number(e.target.value))}/></label></div>;
}
