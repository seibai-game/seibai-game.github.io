/* 成敗。背景キット：人物キット（charkit.js）と同じ決まり（左上の光・塗り色を暗くした線・グラデーション）で背景と小物を描く
   座標はゲーム内（横540×縦960、床は y=840）。2倍の解像度（1080×1920）で描く */
(function(){
const S=2,W=540,H=960,FLOOR=840;
const SH=(c,a)=>window.SEIBAI_KIT.SH(c,a),LN=c=>window.SEIBAI_KIT.line(c);
function box(x,X,Y,w,h,col,r,lw){x.beginPath();x.roundRect(X,Y,w,h,r||0);const g=x.createLinearGradient(X,Y,X+w*0.3,Y+h);g.addColorStop(0,SH(col,0.08));g.addColorStop(1,SH(col,-0.08));x.fillStyle=g;x.fill();if(lw!==0){x.lineWidth=lw||1.6;x.strokeStyle=LN(col);x.stroke();}}
function platform(){const c=document.createElement('canvas');c.width=W*S;c.height=H*S;const x=c.getContext('2d');x.scale(S,S);x.lineJoin='round';x.lineCap='round';
  // 空と遠くのビル
  let g=x.createLinearGradient(0,120,0,460);g.addColorStop(0,'#BFD9E6');g.addColorStop(1,'#EAF0EC');x.fillStyle=g;x.fillRect(0,0,W,H);
  const bl=[[0,250,70,'#C9D2D6'],[64,210,58,'#B9C6CC'],[118,280,80,'#D3DADB'],[190,190,62,'#C3CDD2'],[246,240,90,'#CED6D8'],[330,200,64,'#BAC6CB'],[388,260,80,'#D0D8DA'],[460,220,80,'#C1CCD1']];
  for(const [bx,by,bw,col] of bl){box(x,bx,by,bw,460-by,col,2,1.2);x.fillStyle=SH(col,-0.12);for(let yy=by+12;yy<440;yy+=18)for(let xx=bx+8;xx<bx+bw-8;xx+=14)x.fillRect(xx,yy,7,9);}
  // 電車（銀の車体＋赤い帯）
  const ty=372,tb=760;box(x,-10,ty,W+20,tb-ty,'#C9CDD1',14,2);
  x.fillStyle='#D8DCDF';x.fillRect(-10,ty+6,W+20,10);
  x.fillStyle='#D2453B';x.fillRect(-10,600,W+20,18);x.fillStyle='#B53A31';x.fillRect(-10,615,W+20,3);
  const win=(X,Y,w,h)=>{box(x,X,Y,w,h,'#5B6F80',6,1.8);let gg=x.createLinearGradient(X,Y,X+w,Y+h);gg.addColorStop(0,'rgba(255,255,255,.45)');gg.addColorStop(0.45,'rgba(255,255,255,0)');x.fillStyle=gg;x.beginPath();x.roundRect(X+3,Y+3,w-6,h-6,4);x.fill();
    x.strokeStyle='rgba(255,255,255,.55)';x.lineWidth=2;x.beginPath();x.moveTo(X+8,Y+h-10);x.lineTo(X+w*0.5,Y+10);x.stroke();};
  win(4,452,90,124);win(120,452,148,124);
  // 吊り革（窓の中）
  x.strokeStyle='#8B99A6';x.lineWidth=1.4;for(const X of [30,66,150,190,230]){x.beginPath();x.moveTo(X,456);x.lineTo(X,478);x.stroke();x.beginPath();x.arc(X,484,5,0,7);x.stroke();}
  // ドア（2枚）
  box(x,340,430,152,330,'#BFC4C8',4,1.8);x.strokeStyle=LN('#BFC4C8');x.lineWidth=1.6;x.beginPath();x.moveTo(416,430);x.lineTo(416,760);x.stroke();
  win(350,460,48,120);win(434,460,48,120);x.fillStyle='#D2453B';x.fillRect(340,600,152,18);
  // ホームの屋根・梁・照明
  g=x.createLinearGradient(0,0,0,170);g.addColorStop(0,'#5E6870');g.addColorStop(1,'#77828A');x.fillStyle=g;x.fillRect(0,0,W,150);
  x.fillStyle='#4A535A';for(let X=-20;X<W;X+=90){x.beginPath();x.moveTo(X,0);x.lineTo(X+40,150);x.lineTo(X+52,150);x.lineTo(X+12,0);x.fill();}
  box(x,-10,140,W+20,24,'#8A949B',0,1.6);
  for(const X of [120,330]){box(x,X,164,110,10,'#F3F1E8',5,1.4);x.fillStyle='rgba(255,250,225,.35)';x.beginPath();x.moveTo(X,174);x.lineTo(X+110,174);x.lineTo(X+140,230);x.lineTo(X-30,230);x.fill();}
  // 柱
  box(x,206,150,30,690,'#D6D2C8',2,1.8);x.fillStyle='#E8B43A';for(let yy=520;yy<600;yy+=16){x.save();x.beginPath();x.rect(206,yy,30,8);x.clip();x.fillStyle='#2E2A26';x.fillRect(206,yy,30,8);x.restore();}
  x.fillStyle='#2E2A26';for(let yy=520;yy<600;yy+=16)x.fillRect(206,yy,30,8);x.fillStyle='#E8B43A';for(let yy=528;yy<600;yy+=16)x.fillRect(206,yy,30,8);
  // 時計（吊り下げ）
  x.strokeStyle='#4A535A';x.lineWidth=3;x.beginPath();x.moveTo(91,164);x.lineTo(91,215);x.stroke();
  x.beginPath();x.arc(91,258,40,0,7);x.fillStyle='#F7F5EE';x.fill();x.lineWidth=5;x.strokeStyle='#3A4046';x.stroke();
  x.strokeStyle='#3A4046';x.lineWidth=2;for(let i=0;i<12;i++){const a=i/12*Math.PI*2;x.beginPath();x.moveTo(91+Math.cos(a)*31,258+Math.sin(a)*31);x.lineTo(91+Math.cos(a)*35,258+Math.sin(a)*35);x.stroke();}
  x.lineWidth=3;x.beginPath();x.moveTo(91,258);x.lineTo(91+Math.cos(-0.85)*-14,258+Math.sin(-0.85)*-14);x.stroke();x.lineWidth=2;x.beginPath();x.moveTo(91,258);x.lineTo(91+20,258-14);x.stroke();
  // 案内板と発車標
  x.strokeStyle='#4A535A';x.lineWidth=3;for(const X of [300,510]){x.beginPath();x.moveTo(X,164);x.lineTo(X,200);x.stroke();}
  box(x,272,200,262,70,'#F4F2EA',4,2);x.fillStyle='#2C4C7A';x.beginPath();x.arc(300,235,14,0,7);x.fill();x.fillStyle='#fff';x.font='900 15px sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('1',300,236);
  x.fillStyle='#3A4046';x.fillRect(326,222,120,7);x.fillRect(326,238,90,6);x.fillStyle='#2C4C7A';x.fillRect(466,224,50,22);
  box(x,258,285,237,45,'#23272C',4,2);x.fillStyle='#F2A33A';x.fillRect(270,296,40,8);x.fillRect(320,296,110,8);x.fillStyle='#7CD3A0';x.fillRect(440,296,40,8);x.fillStyle='#F2A33A';x.globalAlpha=0.7;x.fillRect(270,312,40,7);x.fillRect(320,312,90,7);x.globalAlpha=1;
  // ホームの床（奥：ふち＋点字ブロック、手前：床）
  g=x.createLinearGradient(0,760,0,H);g.addColorStop(0,'#B9B6AE');g.addColorStop(1,'#9F9C95');x.fillStyle=g;x.fillRect(0,760,W,H-760);
  x.fillStyle='#E6E2D8';x.fillRect(0,760,W,8);x.fillStyle='#E8B43A';x.fillRect(0,778,W,22);x.fillStyle='rgba(120,90,20,.35)';for(let X=6;X<W;X+=11){x.fillRect(X,781,6,3);x.fillRect(X,788,6,3);x.fillRect(X,795,6,3);}
  x.strokeStyle='rgba(60,60,60,.18)';x.lineWidth=1;for(let X=-200;X<W+200;X+=60){x.beginPath();x.moveTo(X,800);x.lineTo(X+(X-270)*0.4,H);x.stroke();}
  // 乗車位置の白線
  x.strokeStyle='#F4F2EA';x.lineWidth=3;x.beginPath();x.moveTo(330,808);x.lineTo(310,880);x.moveTo(500,808);x.lineTo(520,880);x.stroke();
  // ふちの影（人物の足元をなじませる）
  g=x.createLinearGradient(0,800,0,FLOOR+20);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(40,30,20,.12)');x.fillStyle=g;x.fillRect(0,800,W,FLOOR+20-800);
  c.ext=true;return c;}
/* 小物（壊れる物・投げ物）：同じ決まりで描く */
function prop(kind){const c=document.createElement('canvas'),x=c.getContext('2d');x.lineJoin='round';x.lineCap='round';
  if(kind==='bottle'){c.width=36;c.height=88;x.scale(2,2);box(x,4,10,10,34,'#BFE3EE',4,1.2);box(x,6,4,6,7,'#3E7FB0',2,1.2);x.fillStyle='#3E7FB0';x.fillRect(4,22,10,8);x.fillStyle='rgba(255,255,255,.6)';x.fillRect(6,13,2,26);}
  if(kind==='backpack'){c.width=92;c.height=100;x.scale(2,2);box(x,4,6,38,42,'#3A3A3E',10,1.6);box(x,10,24,26,18,'#4A4A50',5,1.2);x.strokeStyle='#5C5C62';x.lineWidth=2;x.beginPath();x.arc(23,8,8,Math.PI,0);x.stroke();}
  if(kind==='umbrella'){c.width=28;c.height=124;x.scale(2,2);box(x,4,6,7,46,'#2F5A7A',3,1.2);x.strokeStyle='#5A4636';x.lineWidth=2.2;x.beginPath();x.moveTo(7.5,52);x.lineTo(7.5,58);x.arc(4,58,3.5,0,Math.PI);x.stroke();}
  return c;}
window.SEIBAI_BG={platform,prop};
})();
