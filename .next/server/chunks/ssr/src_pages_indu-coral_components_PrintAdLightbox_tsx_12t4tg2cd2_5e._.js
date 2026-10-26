module.exports=[20891,a=>{"use strict";var b=a.i(8171),c=a.i(27669),d=a.i(19816),e=a.i(86523),f=a.i(46014);a.s(["default",0,function({ads:a=[],currentIndex:g=0,isOpen:h=!1,onClose:i=()=>{},onNavigate:j=()=>{}}){let k=a.length,l=a[g],m=(0,c.useRef)(null),[n,o]=c.default.useState(!1),p=(0,c.useCallback)(()=>{0===k||j((g-1+k)%k)},[g,k,j]),q=(0,c.useCallback)(()=>{0===k||j((g+1)%k)},[g,k,j]);if((0,c.useEffect)(()=>{if(!h)return;let a=a=>{"Escape"===a.key?i():"ArrowLeft"===a.key?p():"ArrowRight"===a.key&&q()};window.addEventListener("keydown",a);let b=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{window.removeEventListener("keydown",a),document.body.style.overflow=b}},[h,i,p,q]),(0,c.useEffect)(()=>{if(!h||!m.current)return;let a=m.current.children[g];a&&a.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})},[g,h]),!h||!l)return null;let r="string"==typeof l.popupImage?l.popupImage:l.popupImage?.src||l.thumbnail?.src||l.thumbnail,s=async a=>{if(a.preventDefault(),!n&&l){o(!0);try{let a=new Image;a.crossOrigin="anonymous",await new Promise((b,c)=>{a.onload=()=>b(),a.onerror=()=>c(Error("Failed to load ad image for PDF")),a.src=r});let b=document.createElement("canvas"),c=a.naturalWidth||1200,d=a.naturalHeight||1600;b.width=c,b.height=d;let e=b.getContext("2d");if(!e)throw Error("Could not get 2D canvas context");e.fillStyle="#ffffff",e.fillRect(0,0,c,d),e.drawImage(a,0,0,c,d);let f=await new Promise((a,c)=>{b.toBlob(b=>{b?a(b):c(Error("Failed to encode image to JPEG"))},"image/jpeg",.94)}),g=new Uint8Array(await f.arrayBuffer()),h=Number((595.28*d/c).toFixed(2)),i=new TextEncoder,j=`q
595.28 0 0 ${h} 0 0 cm
/Im1 Do
Q
`,k=i.encode(j),m=`%PDF-1.4
%\xe2\xe3\xcf\xd3
`,n=`1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
`,o=`2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
`,p=`3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 ${h}] /Contents 4 0 R /Resources << /XObject << /Im1 5 0 R >> >> >>
endobj
`,q=`4 0 obj
<< /Length ${k.length} >>
stream
`,s=`
endstream
endobj
`,t=`5 0 obj
<< /Type /XObject /Subtype /Image /Width ${c} /Height ${d} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${g.length} >>
stream
`,u=`
endstream
endobj
`,v=i.encode(m),w=i.encode(n),x=i.encode(o),y=i.encode(p),z=i.encode(q),A=i.encode(s),B=i.encode(t),C=i.encode(u),D=v.length,E=D+w.length,F=E+x.length,G=F+y.length,H=G+z.length+k.length+A.length,I=H+B.length+g.length+C.length,J=a=>a.toString().padStart(10,"0"),K=`xref
0 6
0000000000 65535 f 
${J(D)} 00000 n 
${J(E)} 00000 n 
${J(F)} 00000 n 
${J(G)} 00000 n 
${J(H)} 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${I}
%%EOF
`,L=i.encode(K),M=new Blob([v,w,x,y,z,k,A,B,g,C,L],{type:"application/pdf"}),N=(l.date||l.shortDate||"Ad").replace(/[^a-zA-Z0-9]/g,"-"),O=`Indu-Coral-${l.publication||"Print-Ad"}-${N}.pdf`,P=URL.createObjectURL(M),Q=document.createElement("a");Q.href=P,Q.download=O,document.body.appendChild(Q),Q.click(),document.body.removeChild(Q),setTimeout(()=>URL.revokeObjectURL(P),3e4)}catch(b){console.error("Error generating PDF from image:",b);let a=document.createElement("a");a.href=r,a.download=`Indu-Coral-Print-Ad-${l.shortDate}.webp`,document.body.appendChild(a),a.click(),document.body.removeChild(a)}finally{o(!1)}}};return(0,b.jsxs)("div",{className:"print-ad-modal-overlay",role:"dialog","aria-modal":"true","aria-label":"Print Advertisement Lightbox",onClick:i,children:[(0,b.jsxs)("header",{className:"print-ad-modal-header",children:[(0,b.jsxs)("div",{className:"print-ad-modal-counter",children:["Print ad ",g+1," of ",k]}),(0,b.jsxs)("div",{className:"print-ad-modal-actions",children:[(0,b.jsxs)("button",{type:"button",onClick:a=>{a.stopPropagation(),s(a)},disabled:n,className:"print-ad-download-pdf-btn","aria-label":"Download advertisement PDF",children:[(0,b.jsx)("span",{children:n?"Preparing PDF...":"Download PDF"}),(0,b.jsx)("span",{className:"print-ad-pdf-icon-box","aria-hidden":"true",children:(0,b.jsx)(e.f,{size:13,strokeWidth:2.4})})]}),(0,b.jsx)("button",{type:"button",className:"print-ad-modal-close-btn",onClick:a=>{a.stopPropagation(),i()},"aria-label":"Close lightbox",children:(0,b.jsx)(f.X,{size:18,strokeWidth:2.4})})]})]}),(0,b.jsxs)("div",{className:"print-ad-modal-stage",children:[(0,b.jsx)("button",{type:"button",className:"print-ad-stage-nav-btn print-ad-stage-prev",onClick:a=>{a.stopPropagation(),p()},"aria-label":"Previous advertisement",children:(0,b.jsx)(d.f,{size:20,strokeWidth:2.4})}),(0,b.jsx)("div",{className:"print-ad-stage-img-wrap",children:(0,b.jsx)("img",{src:r,alt:l.title,className:"print-ad-stage-img"},l.id)}),(0,b.jsx)("button",{type:"button",className:"print-ad-stage-nav-btn print-ad-stage-next",onClick:a=>{a.stopPropagation(),q()},"aria-label":"Next advertisement",children:(0,b.jsx)(e.f,{size:20,strokeWidth:2.4})})]}),(0,b.jsxs)("footer",{className:"print-ad-modal-footer",children:[(0,b.jsx)("div",{className:"print-ad-modal-caption-wrap",children:(0,b.jsxs)("h3",{className:"print-ad-modal-title",children:[l.publication,", ",l.date]})}),(0,b.jsx)("div",{ref:m,className:"print-ad-modal-thumbnails-strip",role:"tablist","aria-label":"Newspaper advertisements thumbnails",children:a.map((a,c)=>{let d=c===g,e="string"==typeof a.thumbnail?a.thumbnail:a.thumbnail?.src||a.popupImage?.src||a.popupImage;return(0,b.jsxs)("button",{type:"button",role:"tab","aria-selected":d,className:`print-ad-thumb-col ${d?"active":""}`,onClick:a=>{a.stopPropagation(),j(c)},"aria-label":`View ad from ${a.date}`,children:[(0,b.jsxs)("div",{className:"print-ad-thumb-card",children:[(0,b.jsx)("img",{src:e,alt:a.title||`Print ad ${a.shortDate}`,className:"print-ad-thumb-img",loading:"eager"}),!d&&(0,b.jsx)("div",{className:"print-ad-thumb-dim-overlay","aria-hidden":"true"})]}),(0,b.jsx)("span",{className:"print-ad-thumb-label",children:a.shortDate})]},a.id)})})]})]})}])}];

//# sourceMappingURL=src_pages_indu-coral_components_PrintAdLightbox_tsx_12t4tg2cd2_5e._.js.map