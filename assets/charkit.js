/* 成敗。人物キット v2：全員を同じ決まりでコードから描く（背景キット assets/kit_bg.js と同じ線・光・色の決まり）
   決まり：光は左上から／線は塗り色を暗くした色（黒い線は使わない）／頭は体の約1/4.8／体は左向きの3/4
   - makeRig(spec)  → ラグドール用の部品と表情8種（ゲームの「投げ飛ばせる人物」の形式）
   - makeStand(spec,pose,expr) → 立ち姿1枚（主人公・周りの人）。pose: normal / talk / trouble / arms / phone / sigh
*/
(function(){
const K=3,LW=1.7;
const B={waistUp:13,hipDown:13,neck:70,shoulder:61,headC:30,headR:27,headTop:62,uarm:38,farm:44,thigh:58,shin:56};
function hex(c){const n=parseInt(c.slice(1),16);return [n>>16,n>>8&255,n&255];}
function SH(c,a){let [r,g,b]=hex(c);const f=a<0?(x)=>x*(1+a):(x)=>x+(255-x)*a;return 'rgb('+[r,g,b].map(v=>Math.round(f(v))).join(',')+')';}
function line(c){return SH(c,-0.55);}
function cvs(w,h){const c=document.createElement('canvas');c.width=Math.ceil(w*K);c.height=Math.ceil(h*K);const x=c.getContext('2d');x.scale(K,K);x.lineJoin='round';x.lineCap='round';return [c,x];}
/* 塗り：左上が明るいグラデーション＋右（背中側）に影＋塗り色の暗い線 */
function paint(x,col,bx,by,bw,bh,noShade){const g=x.createLinearGradient(bx,by,bx+bw,by+bh);g.addColorStop(0,SH(col,0.1));g.addColorStop(0.55,col);g.addColorStop(1,SH(col,-0.12));
  x.save();x.fillStyle=g;x.fill();if(!noShade){x.clip();x.fillStyle=SH(col,-0.2);x.globalAlpha=0.55;const e=new Path2D();e.ellipse(bx+bw*0.95,by+bh*0.55,Math.max(1,bw*0.32),Math.max(1,bh*0.7),0,0,7);x.fill(e);}x.restore();x.lineWidth=LW;x.strokeStyle=line(col);x.stroke();}
function capsule(x,cx,y0,L,w0,w1){x.beginPath();x.moveTo(cx-w0/2,y0);x.bezierCurveTo(cx-w0/2,y0-w0*0.66,cx+w0/2,y0-w0*0.66,cx+w0/2,y0);x.lineTo(cx+w1/2,y0+L);x.bezierCurveTo(cx+w1/2,y0+L+w1*0.66,cx-w1/2,y0+L+w1*0.66,cx-w1/2,y0+L);x.closePath();}
/* ---------- 胴 ---------- */
function torso(s){const T=s.top,W=72,H=B.neck+36,[c,x]=cvs(W,H),cx=W/2,ay=12,by=ay+B.neck;const col=T.color,sw=T.wide?58:52,ww=T.wide?48:42,hem=T.long?22:9;
  x.beginPath();x.moveTo(cx-9,ay-2);x.quadraticCurveTo(cx-sw/2+2,ay,cx-sw/2,ay+12);x.quadraticCurveTo(cx-sw/2-1,ay+40,cx-ww/2,by+hem);x.quadraticCurveTo(cx,by+hem+3,cx+ww/2,by+hem);x.quadraticCurveTo(cx+sw/2+1,ay+40,cx+sw/2,ay+12);x.quadraticCurveTo(cx+sw/2-2,ay,cx+9,ay-2);x.closePath();
  paint(x,col,cx-sw/2,ay,sw,B.neck+hem);
  x.save();x.clip();
  const ink=line(col);x.strokeStyle=ink;x.lineWidth=1.2;
  if(T.type==='suit'||T.type==='coat'){x.fillStyle=T.inner||'#F4F1EA';x.beginPath();x.moveTo(cx-11,ay-2);x.lineTo(cx-2,ay+30);x.lineTo(cx+6,ay-2);x.closePath();x.fill();
    if(T.tie){x.fillStyle=T.tie;x.beginPath();x.moveTo(cx-5,ay+3);x.lineTo(cx,ay+3);x.lineTo(cx+2,ay+27);x.lineTo(cx-2,ay+31);x.lineTo(cx-6,ay+27);x.closePath();x.fill();x.strokeStyle=line(T.tie);x.stroke();x.strokeStyle=ink;}
    x.fillStyle=SH(col,-0.06);x.beginPath();x.moveTo(cx-11,ay-2);x.lineTo(cx-2,ay+30);x.lineTo(cx-9,ay+30);x.lineTo(cx-19,ay+4);x.closePath();x.fill();x.stroke();
    x.beginPath();x.moveTo(cx-2,ay+30);x.lineTo(cx-2,by+hem);x.stroke();
    x.fillStyle=SH(col,-0.35);for(const yy of [ay+40,ay+54])x.beginPath(),x.arc(cx-6,yy,1.4,0,7),x.fill();
    if(T.type==='coat'){x.beginPath();x.moveTo(cx-ww/2,by-4);x.lineTo(cx+ww/2,by-4);x.lineWidth=3;x.strokeStyle=SH(col,-0.12);x.stroke();}}
  if(T.type==='hoodie'){x.fillStyle=SH(col,-0.08);x.beginPath();x.ellipse(cx+10,ay+5,16,10,0.2,0,7);x.fill();x.stroke();x.beginPath();x.moveTo(cx-14,by-12);x.quadraticCurveTo(cx,by-4,cx+12,by-12);x.stroke();
    x.strokeStyle='#F4F1EA';x.lineWidth=1.3;x.beginPath();x.moveTo(cx-7,ay+4);x.lineTo(cx-8,ay+22);x.moveTo(cx-2,ay+4);x.lineTo(cx-2,ay+20);x.stroke();}
  if(T.type==='knit'){x.globalAlpha=0.35;x.strokeStyle=SH(col,-0.22);x.lineWidth=1;for(let i=-4;i<=4;i++){x.beginPath();x.moveTo(cx+i*6,ay+6);x.lineTo(cx+i*5.4,by+hem);x.stroke();}x.globalAlpha=1;x.fillStyle=SH(col,-0.06);x.fillRect(cx-ww,by+hem-7,ww*2,7);x.beginPath();x.ellipse(cx-1,ay,10,4,0,0,Math.PI);x.strokeStyle=ink;x.lineWidth=1.4;x.stroke();}
  if(T.type==='shirt'){x.fillStyle=T.inner||'#FFFFFF';x.beginPath();x.moveTo(cx-10,ay-2);x.lineTo(cx-3,ay+9);x.lineTo(cx+4,ay-2);x.closePath();x.fill();x.beginPath();x.moveTo(cx-3,ay+9);x.lineTo(cx-3,by+hem);x.stroke();
    if(T.tie){x.fillStyle=T.tie;x.beginPath();x.moveTo(cx-5,ay+3);x.lineTo(cx,ay+3);x.lineTo(cx+2,ay+30);x.lineTo(cx-2,ay+34);x.lineTo(cx-6,ay+30);x.closePath();x.fill();}}
  if(T.pattern==='tryon'){/* 試着の柄ニット：朱の地に紺の斜めストライプと白い水玉 */x.fillStyle='#E8553A';x.fillRect(0,0,W,H);x.fillStyle='#22305A';for(let k=-H;k<W+H;k+=22){x.beginPath();x.moveTo(k,0);x.lineTo(k+8,0);x.lineTo(k+8-H,H);x.lineTo(k-H,H);x.closePath();x.fill();}x.fillStyle='#F6E8C8';for(let yy=ay+8;yy<by+hem;yy+=13)for(let xx=cx-30;xx<cx+30;xx+=13){x.beginPath();x.arc(xx+((yy/13|0)%2)*6,yy,2.4,0,7);x.fill();}
    x.fillStyle='rgba(30,20,40,.18)';x.beginPath();x.ellipse(cx+sw*0.48,ay+B.neck*0.55,sw*0.3,B.neck*0.7,0,0,7);x.fill();}
  x.restore();
  if(s.bag){x.strokeStyle=s.bag;x.lineWidth=2.6;x.beginPath();x.moveTo(cx+14,ay);x.lineTo(cx-16,by+2);x.stroke();x.strokeStyle=line(s.bag);x.lineWidth=0.8;x.stroke();}
  if(s.backpack){x.fillStyle=s.backpack;x.beginPath();x.moveTo(cx+14,ay+6);x.lineTo(cx+12,by-4);x.stroke();}
  return {img:c,A:[cx*K,ay*K],B:[cx*K,by*K]};}
function pelvis(s){const W=60,H=B.waistUp+B.hipDown+18,[c,x]=cvs(W,H),cx=W/2,ay=6,by=ay+B.waistUp+B.hipDown,col=s.bottom,w=s.skirt?50:42;
  x.beginPath();x.moveTo(cx-w/2+1,ay);x.lineTo(cx+w/2-1,ay);x.quadraticCurveTo(cx+w/2+2,by-4,cx+w/2+(s.skirt?5:0),by+6);x.lineTo(cx-w/2-(s.skirt?5:0),by+6);x.quadraticCurveTo(cx-w/2-2,by-4,cx-w/2+1,ay);x.closePath();
  paint(x,col,cx-w/2,ay,w,by-ay+6);if(s.belt){x.fillStyle=s.belt;x.fillRect(cx-w/2+1,ay+1,w-2,3.5);}
  return {img:c,A:[cx*K,ay*K],B:[cx*K,by*K]};}
function thigh(s){const W=32,H=B.thigh+22,[c,x]=cvs(W,H),cx=W/2,ay=11;capsule(x,cx,ay,B.thigh,22,17);paint(x,s.bottom,cx-11,ay-8,22,B.thigh+16);return {img:c,A:[cx*K,ay*K],B:[cx*K,(ay+B.thigh)*K]};}
function shin(s){const W=48,H=B.shin+20,[c,x]=cvs(W,H),cx=30,ay=10,by=ay+B.shin;const legc=s.skirt&&!s.tights?s.skin:(s.socks||s.bottom);
  capsule(x,cx,ay,B.shin-10,17,13);paint(x,legc,cx-9,ay-6,18,B.shin);
  x.beginPath();x.moveTo(cx+7,by-12);x.quadraticCurveTo(cx+10,by-2,cx+6,by+1);x.lineTo(cx-21,by+1);x.quadraticCurveTo(cx-27,by,cx-24,by-5);x.quadraticCurveTo(cx-17,by-12,cx-5,by-13);x.closePath();paint(x,s.shoe,cx-26,by-13,34,14,true);
  x.fillStyle=SH(s.shoe,hex(s.shoe)[0]>150?-0.18:0.3);x.fillRect(cx-23,by-2.5,30,2.5);
  return {img:c,A:[cx*K,ay*K],B:[cx*K,by*K]};}
function uarm(s){const W=28,H=B.uarm+20,[c,x]=cvs(W,H),cx=W/2,ay=10;capsule(x,cx,ay,B.uarm,17,14);paint(x,s.top.sleeve||s.top.color,cx-9,ay-7,18,B.uarm+12);return {img:c,A:[cx*K,ay*K],B:[cx*K,(ay+B.uarm)*K]};}
function farm(s){const W=28,H=B.farm+16,[c,x]=cvs(W,H),cx=W/2,ay=8,L=B.farm-13;const sc=s.top.sleeve||s.top.color,sl=s.top.short?0:L-3;
  // 手（左向き：親指が手前）
  x.beginPath();x.ellipse(cx-0.5,ay+L+6,6.4,8,0.12,0,7);paint(x,s.skin,cx-7,ay+L,13,15,true);
  x.beginPath();x.ellipse(cx-5.5,ay+L+3,2.3,4,-0.55,0,7);paint(x,s.skin,cx-8,ay+L,5,8,true);
  capsule(x,cx,ay,L,14,12);paint(x,s.skin,cx-7,ay-5,14,L+10);
  if(sl>0){capsule(x,cx,ay,sl,15,13.5);paint(x,sc,cx-8,ay-5,16,sl+10);x.beginPath();x.ellipse(cx,ay+sl,7,2.6,0,0,7);x.fillStyle=SH(sc,-0.08);x.fill();x.strokeStyle=line(sc);x.lineWidth=1.2;x.stroke();}
  return {img:c,A:[cx*K,ay*K],B:[cx*K,(ay+B.farm)*K]};}
/* ---------- 頭（左向き3/4）。表情8種 ---------- */
const EXPR=['smile','smug','bow','confused','surprised','gag','blank','dizzy'];
function hairBack(x,s,cx,cy,r){const hs=s.hair.style,hc=s.hair.color;x.beginPath();
  if(hs==='long'){x.moveTo(cx-r+3,cy-8);x.bezierCurveTo(cx-r-10,cy+18,cx-r-2,cy+38,cx-4,cy+40);x.lineTo(cx+r+6,cy+40);x.bezierCurveTo(cx+r+14,cy+20,cx+r+8,cy-6,cx+r-2,cy-12);x.closePath();}
  else if(hs==='bob'){x.moveTo(cx-r+2,cy-6);x.quadraticCurveTo(cx-r-6,cy+20,cx-r+6,cy+24);x.lineTo(cx+r+6,cy+22);x.quadraticCurveTo(cx+r+10,cy,cx+r-2,cy-10);x.closePath();}
  else if(hs==='bun'){x.arc(cx+r-3,cy-r+3,10,0,7);}
  else return;paint(x,hc,cx-r,cy-r,2*r,2*r);}
function hairFront(x,s,cx,cy,r){const hs=s.hair.style,hc=s.hair.color;x.beginPath();
  if(hs==='buzz'){x.ellipse(cx+2,cy-7,r+1,r-6,0,Math.PI*1.0,Math.PI*2.0);x.closePath();}
  else if(hs==='curly'){for(let a=0;a<7;a++){const t=Math.PI*(1.05+a*0.14);const ax=cx+Math.cos(t)*(r-2),ay2=cy-4+Math.sin(t)*(r-2);x.moveTo(ax+7,ay2);x.arc(ax,ay2,7,0,7);}}
  else{const side=hs==='long'||hs==='bob';x.moveTo(cx-r-1,cy+(side?10:0));x.bezierCurveTo(cx-r-4,cy-r-2,cx-4,cy-r-10,cx+6,cy-r-6);x.bezierCurveTo(cx+r+6,cy-r+2,cx+r+4,cy+4,cx+r+1,cy+(side?14:4));x.quadraticCurveTo(cx+r-6,cy-8,cx+2,cy-11);x.quadraticCurveTo(cx-9,cy-6,cx-r+5,cy+(side?2:-2));x.closePath();}
  paint(x,hc,cx-r,cy-r-8,2*r,r);
  x.save();x.globalAlpha=0.35;x.strokeStyle=SH(hc,0.45);x.lineWidth=2;x.beginPath();x.arc(cx-2,cy-4,r-4,Math.PI*1.18,Math.PI*1.42);x.stroke();x.restore();
  if(s.cap){x.beginPath();x.moveTo(cx-r-12,cy-6);x.quadraticCurveTo(cx-r,cy-9,cx-4,cy-9);x.bezierCurveTo(cx-r+2,cy-r-12,cx+r+4,cy-r-8,cx+r+2,cy-5);x.closePath();paint(x,s.cap,cx-r,cy-r-10,2*r,r);}}
function head(s,e){const W=88,H=96,[c,x]=cvs(W,H),cx=44,ny=88,r=B.headR,cy=ny-8-r;
  x.beginPath();x.rect(cx-6,cy+r-8,13,ny-(cy+r-8)+2);paint(x,s.skin,cx-6,cy+r-8,13,12,true);
  hairBack(x,s,cx,cy,r);
  // 顔：あごが少し左に出る3/4
  x.beginPath();x.moveTo(cx-r+1,cy-4);x.bezierCurveTo(cx-r-1,cy+12,cx-r+6,cy+r,cx-6,cy+r+1);x.bezierCurveTo(cx+6,cy+r+2,cx+r,cy+12,cx+r-1,cy-2);x.bezierCurveTo(cx+r-2,cy-r-2,cx-r+2,cy-r-2,cx-r+1,cy-4);x.closePath();
  paint(x,s.skin,cx-r,cy-r,2*r,2*r);
  x.beginPath();x.ellipse(cx+r-8,cy+4,4.6,6.4,0,0,7);paint(x,s.skin,cx+r-12,cy-2,9,12,true);
  hairFront(x,s,cx,cy,r);
  const ink='#3A2A24',ex=[cx-12,cx+4],ey=cy+4,mx=cx-7,my=cy+16;x.strokeStyle=ink;x.fillStyle=ink;
  // 鼻
  x.strokeStyle=SH(s.skin,-0.35);x.lineWidth=1.3;x.beginPath();x.moveTo(cx-r+6,cy+6);x.quadraticCurveTo(cx-r+3,cy+11,cx-r+7,cy+12);x.stroke();x.strokeStyle=ink;
  if(s.blush!==false){x.fillStyle='rgba(232,120,105,.22)';for(const X of ex){x.beginPath();x.ellipse(X-1,ey+8,4.2,2.3,0,0,7);x.fill();}x.fillStyle=ink;}
  const eye=(X,ry,look)=>{x.fillStyle='#fff';x.beginPath();x.ellipse(X,ey,3.6,ry+0.6,0,0,7);x.fill();x.fillStyle=s.eye||'#3B2A22';x.beginPath();x.ellipse(X-0.6+(look||0),ey+0.3,2.6,ry,0,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(X-1.5+(look||0),ey-ry*0.35,0.9,0,7);x.fill();
    x.strokeStyle=ink;x.lineWidth=1.7;x.beginPath();x.moveTo(X-4.2,ey-ry+0.2);x.quadraticCurveTo(X,ey-ry-1.6,X+4,ey-ry+0.6);x.stroke();};
  const brow=(dy,t0,t1)=>{x.strokeStyle=SH(s.hair.color,-0.25);x.lineWidth=2;for(let i=0;i<2;i++){const X=ex[i],t=i?t1:t0;x.beginPath();x.moveTo(X-4,ey-9+dy+t);x.lineTo(X+4,ey-9+dy-t);x.stroke();}x.strokeStyle=ink;};
  const mouth=(f,fill)=>{x.lineWidth=1.6;x.beginPath();f();if(fill){x.fillStyle=fill;x.fill();}x.strokeStyle='#7A3A32';x.stroke();x.fillStyle=ink;};
  if(e==='smile'){brow(0,0,0);for(const X of ex){x.lineWidth=2;x.beginPath();x.arc(X,ey+2,3.4,Math.PI*1.12,Math.PI*1.88);x.stroke();}mouth(()=>{x.moveTo(mx-5,my-1);x.quadraticCurveTo(mx,my+5,mx+5,my-1);x.closePath();},'#B8564A');}
  if(e==='smug'){brow(-1,1.5,-0.5);for(const X of ex){eye(X,2.2,-0.4);x.fillStyle=s.skin;x.fillRect(X-4.5,ey-4.5,9,3.2);x.strokeStyle=ink;x.lineWidth=1.8;x.beginPath();x.moveTo(X-4.3,ey-1.4);x.lineTo(X+4,ey-1.6);x.stroke();}mouth(()=>{x.moveTo(mx-5,my);x.quadraticCurveTo(mx+1,my+3,mx+6,my-3);});}
  if(e==='bow'){brow(1,0,0);for(const X of ex){x.lineWidth=1.9;x.beginPath();x.moveTo(X-4,ey+1);x.quadraticCurveTo(X,ey+3.5,X+4,ey+1);x.stroke();}mouth(()=>{x.moveTo(mx-4,my);x.quadraticCurveTo(mx,my+2,mx+4,my);});}
  if(e==='confused'){brow(-1,-1.5,2);for(const X of ex)eye(X,3,0);mouth(()=>{x.moveTo(mx-5,my);x.quadraticCurveTo(mx-2,my-2.5,mx,my);x.quadraticCurveTo(mx+2,my+2.5,mx+5,my);});}
  if(e==='surprised'){brow(-3,0,0);for(const X of ex)eye(X,3.6,0);mouth(()=>{x.ellipse(mx,my+1,3,4,0,0,7);},'#8A3A34');}
  if(e==='gag'){brow(-2,-2,2);x.lineWidth=2.3;for(const X of ex){x.beginPath();x.moveTo(X-4,ey-3.5);x.lineTo(X+1.5,ey);x.lineTo(X-4,ey+3.5);x.stroke();}mouth(()=>{x.ellipse(mx,my+2,5.5,6.5,0,0,7);},'#8A3A34');x.fillStyle='#E98A8C';x.beginPath();x.ellipse(mx,my+6,3.2,2,0,0,7);x.fill();}
  if(e==='blank'){brow(0,0,0);for(const X of ex){eye(X,2.6,0);x.fillStyle=s.skin;x.fillRect(X-4.5,ey-4.4,9,2.2);x.strokeStyle=ink;x.lineWidth=1.6;x.beginPath();x.moveTo(X-4.2,ey-2.2);x.lineTo(X+4,ey-2.2);x.stroke();}mouth(()=>{x.moveTo(mx-4,my+1);x.lineTo(mx+4,my+1);});}
  if(e==='dizzy'){brow(-1,-1,1);x.lineWidth=1.3;for(const X of ex){x.beginPath();for(let a=0;a<13;a+=0.3){const q=0.33*a;x.lineTo(X+Math.cos(a)*q,ey+Math.sin(a)*q);}x.stroke();}mouth(()=>{x.moveTo(mx-6,my+1);for(let i=0;i<6;i++)x.lineTo(mx-6+i*2.4,my+(i%2?-1.4:1.6));});}
  if(s.glasses&&e!=='gag'&&e!=='dizzy'){x.lineWidth=1.4;x.strokeStyle=s.glasses;for(const X of ex){x.beginPath();x.ellipse(X,ey+0.5,5.6,4.8,0,0,7);x.stroke();}x.beginPath();x.moveTo(ex[0]+5.6,ey);x.lineTo(ex[1]-5.6,ey);x.moveTo(ex[1]+5.6,ey-0.5);x.lineTo(cx+r-9,ey-2);x.stroke();}
  if(s.earring){x.strokeStyle='#C9A24A';x.lineWidth=1.3;x.beginPath();x.arc(cx+r-9,cy+12,2.2,0,7);x.stroke();}
  return {img:c,A:[cx*K,ny*K],crown:(cy-r-6)*K,B:null};}
/* ---------- まとめ ---------- */
function makeRig(spec){const parts={torso:torso(spec),pelvis:pelvis(spec),thigh:thigh(spec),shin:shin(spec),uarm:uarm(spec),farm:farm(spec)},heads={};
  for(const e of EXPR)heads[e]=head(spec,e);
  return {parts,heads,rig:{bones:Object.assign({},B),widths:{torso:50,pelvis:42,uarm:16,farm:13,thigh:20,shin:16},kB:null}};}
function drawSeg(g,p,a,b){const A=p.A,Bp=p.B,dx=Bp[0]-A[0],dy=Bp[1]-A[1],L=Math.hypot(dx,dy),l=Math.hypot(b.x-a.x,b.y-a.y),sc=l/L;g.save();g.translate(a.x,a.y);g.rotate(Math.atan2(b.y-a.y,b.x-a.x)-Math.atan2(dy,dx));g.scale(sc,sc);g.translate(-A[0],-A[1]);g.drawImage(p.img,0,0);g.restore();}
/* 腕の角度（ラジアン、左向き基準。負＝前へ上げる） */
const POSES={normal:{nU:0.08,nF:0.18,fU:-0.08,fF:0.14},talk:{nU:-0.75,nF:-1.15},trouble:{nU:-0.25,nF:-2.6},arms:{nU:-0.3,nF:-1.85,fU:-0.25,fF:-1.75},phone:{nU:-0.2,nF:-1.75},sigh:{nU:0.05,nF:0.1,fU:-0.05,fF:0.1}};
function makeStand(spec,pose,expr,rig){const R=rig||makeRig(spec),P=Object.assign({},POSES.normal,POSES[pose]||{});
  const W=120,Ht=B.hipDown+B.thigh+B.shin+B.waistUp+B.neck+B.headTop+14,c=document.createElement('canvas');c.width=W*K;c.height=Ht*K;const g=c.getContext('2d');
  const u=v=>v*K,px=W/2*K,py=(12+B.headTop+B.neck+B.waistUp)*K,pt=(o,a,l)=>({x:o.x-Math.sin(a)*u(l),y:o.y+Math.cos(a)*u(l)});
  const waist={x:px,y:py-u(B.waistUp)},neck={x:px,y:waist.y-u(B.neck)},sh={x:px+u(2),y:waist.y-u(B.shoulder)},hip={x:px,y:py+u(B.hipDown)};
  const leg=dx=>{const h={x:hip.x+u(dx),y:hip.y},k=pt(h,0,B.thigh),f=pt(k,0,B.shin);drawSeg(g,R.parts.thigh,h,k);drawSeg(g,R.parts.shin,k,f);};
  const arm=(a1,a2,dx)=>{const s0={x:sh.x+u(dx),y:sh.y},e=pt(s0,a1,B.uarm),h=pt(e,a1+a2,B.farm);drawSeg(g,R.parts.uarm,s0,e);drawSeg(g,R.parts.farm,e,h);};
  arm(P.fU,P.fF,5);leg(6);leg(-5);drawSeg(g,R.parts.pelvis,waist,hip);drawSeg(g,R.parts.torso,neck,waist);
  if(spec.backpack){g.save();g.translate(px+u(24),waist.y-u(42));const bw=u(20),bh=u(38);g.beginPath();g.roundRect(-bw/2,0,bw,bh,u(6));g.fillStyle=spec.backpack;g.fill();g.lineWidth=u(LW);g.strokeStyle=line(spec.backpack);g.stroke();g.restore();}
  const hd=R.heads[expr||'smile'],hs=u(B.headTop)/(hd.A[1]-hd.crown);g.save();g.translate(neck.x,neck.y);g.scale(hs,hs);g.translate(-hd.A[0],-hd.A[1]);g.drawImage(hd.img,0,0);g.restore();
  arm(P.nU,P.nF,-2);
  if(spec.bagSide){const bx=px+u(spec.bagX||-10),by=py+u(4);g.beginPath();g.roundRect(bx-u(9),by-u(9),u(18),u(16),u(3));g.fillStyle=spec.bagSide;g.fill();g.lineWidth=u(LW);g.strokeStyle=line(spec.bagSide);g.stroke();}
  if(spec.tote){const bx=px+u(14),by=py-u(4);g.beginPath();g.roundRect(bx-u(10),by,u(20),u(22),u(2));g.fillStyle=spec.tote;g.fill();g.lineWidth=u(LW);g.strokeStyle=line(spec.tote);g.stroke();}
  if(spec.briefcase){const bx=px-u(6),by=py+u(30);g.beginPath();g.roundRect(bx-u(13),by,u(26),u(18),u(2));g.fillStyle=spec.briefcase;g.fill();g.lineWidth=u(LW);g.strokeStyle=line(spec.briefcase);g.stroke();}
  if(pose==='phone'){const e=pt(pt({x:sh.x-u(2),y:sh.y},P.nU,B.uarm),P.nU+P.nF,B.farm-6);g.save();g.translate(e.x,e.y);g.rotate(-0.3);g.fillStyle='#22262E';g.beginPath();g.roundRect(-u(4),-u(7),u(8),u(13),u(1.5));g.fill();g.restore();}
  return c;}
window.SEIBAI_KIT={makeRig,makeStand,B,K,EXPR,SH,line};
})();
