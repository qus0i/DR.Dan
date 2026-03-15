'use client';
import { useState, useEffect } from 'react';

const SERVICES = [
  { id:1,icon:'🦷',title:'زراعة الأسنان',titleEn:'Dental Implants',desc:'حلول متقدمة لزراعة الأسنان باستخدام أحدث التقنيات العالمية لاستعادة ابتسامتك الطبيعية بثقة تامة',price:'يبدأ من 400 د.أ',dur:'60 دقيقة',grad:'linear-gradient(135deg,#0f766e,#064e3b,#0d9488)' },
  { id:2,icon:'✨',title:'تجميل الأسنان',titleEn:'Cosmetic Dentistry',desc:'ابتسامة هوليوود، فينيرز، وتبييض الأسنان بأحدث الطرق لمنحك ابتسامة مثالية وطبيعية',price:'يبدأ من 200 د.أ',dur:'45 دقيقة',grad:'linear-gradient(135deg,#7c3aed,#4f46e5,#6366f1)' },
  { id:3,icon:'👑',title:'التركيبات والتيجان',titleEn:'Crowns & Bridges',desc:'تركيبات ثابتة ومتحركة بجودة عالية تعيد لأسنانك وظيفتها وجمالها الطبيعي',price:'يبدأ من 150 د.أ',dur:'40 دقيقة',grad:'linear-gradient(135deg,#b45309,#d97706,#f59e0b)' },
  { id:4,icon:'🔧',title:'العلاج التحفظي',titleEn:'Conservative Treatment',desc:'حشوات تجميلية وعلاج جذور الأسنان بتقنيات حديثة للحفاظ على أسنانك الطبيعية',price:'يبدأ من 50 د.أ',dur:'30 دقيقة',grad:'linear-gradient(135deg,#0369a1,#0284c7,#38bdf8)' },
  { id:5,icon:'💉',title:'البوتكس التجميلي',titleEn:'Botox Treatment',desc:'علاجات البوتكس لتقليل التجاعيد واستعادة نضارة البشرة بأيدي خبيرة ومتخصصة',price:'يبدأ من 100 د.أ',dur:'20 دقيقة',grad:'linear-gradient(135deg,#be185d,#e11d48,#f43f5e)' },
  { id:6,icon:'😁',title:'تبييض الأسنان',titleEn:'Teeth Whitening',desc:'تبييض الأسنان بالليزر والتقنيات المتقدمة للحصول على ابتسامة بيضاء ناصعة ومشرقة',price:'يبدأ من 120 د.أ',dur:'35 دقيقة',grad:'linear-gradient(135deg,#0f766e,#c8a960,#0d9488)' },
];
const SLOTS=['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
const REVIEWS=[{name:'أحمد م.',text:'دكتورة رائعة جداً، أسلوب تعامل راقي من أروع الأطباء. النتيجة كانت مذهلة!',rating:5},{name:'سارة خ.',text:'تجربة ممتازة مع الدكتورة دانيا. زراعة الأسنان كانت بدون أي ألم والنتيجة طبيعية جداً.',rating:5},{name:'محمد ع.',text:'أنصح الجميع بزيارة العيادة. الدكتورة محترفة والعيادة نظيفة ومجهزة بأحدث الأجهزة.',rating:5}];
const ST={confirmed:{l:'مؤكد',bg:'#dcfce7',c:'#166534'},pending:{l:'قيد الانتظار',bg:'#fef3c7',c:'#92400e'},cancelled:{l:'ملغى',bg:'#fecaca',c:'#991b1b'},completed:{l:'مكتمل',bg:'#ede9fe',c:'#5b21b6'}};
const P='#0f766e',PL='#e6f5f3',PD='#064e3b',AC='#c8a960',ACL='#fdf8ed',DK='#111827',DM='#374151',GR='#6b7280',GL='#f3f4f6',GB='#e5e7eb',WH='#ffffff',LT='#f8faf9';

function useM(){const[m,s]=useState(false);useEffect(()=>{const c=()=>s(window.innerWidth<768);c();window.addEventListener('resize',c);return()=>window.removeEventListener('resize',c)},[]);return m}

export default function DentalApp(){
  const[page,setPage]=useState('home');const[admin,setAdmin]=useState(false);const[appts,setAppts]=useState([]);const[loading,setLoading]=useState(true);
  const[bk,setBk]=useState({name:'',phone:'',service:'',date:'',time:''});const[bkOk,setBkOk]=useState(false);const[bkL,setBkL]=useState(false);
  const[aTab,setATab]=useState('overview');const[login,setLogin]=useState({user:'',pass:''});const[loginErr,setLoginErr]=useState('');

  const fetchA=async()=>{try{const r=await fetch('/api/appointments');if(r.ok){setAppts(await r.json())}}catch(e){console.error(e)}finally{setLoading(false)}};
  useEffect(()=>{fetchA()},[]);

  const doBook=async()=>{if(!bk.name||!bk.phone||!bk.service||!bk.date||!bk.time)return;setBkL(true);
    try{const r=await fetch('/api/appointments',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(bk)});if(r.ok){const n=await r.json();setAppts(p=>[...p,n]);setBkOk(true);setTimeout(()=>{setBkOk(false);setBk({name:'',phone:'',service:'',date:'',time:''})},3000)}}catch(e){console.error(e)}finally{setBkL(false)}};

  const updS=async(id,status)=>{try{const r=await fetch('/api/appointments',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})});if(r.ok){const u=await r.json();setAppts(p=>p.map(a=>a.id===u.id?u:a))}}catch(e){console.error(e)}};

  const doLogin=()=>{if(login.user==='admin'&&login.pass==='admin123'){setAdmin(true);setLoginErr('')}else setLoginErr('اسم المستخدم أو كلمة المرور غير صحيحة')};
  const nav=(p)=>{setPage(p);window.scrollTo(0,0)};

  if(admin)return<Admin appts={appts} updS={updS} tab={aTab} setTab={setATab} logout={()=>setAdmin(false)}/>;
  return(
    <div style={{fontFamily:"'Tajawal',sans-serif",direction:'rtl',background:LT,minHeight:'100vh',overflowX:'hidden'}}>
      <Nav page={page} setPage={nav}/>
      <div style={{paddingTop:64}}>
        {page==='home'&&<Home nav={nav}/>}{page==='services'&&<Svc nav={nav}/>}{page==='booking'&&<Book bk={bk} setBk={setBk} doBook={doBook} ok={bkOk} appts={appts} loading={bkL}/>}
        {page==='about'&&<About/>}{page==='login'&&<Login login={login} setLogin={setLogin} doLogin={doLogin} err={loginErr}/>}
      </div>
      <Foot/>
    </div>
  );
}

function Nav({page,setPage}){const[open,setOpen]=useState(false);const m=useM();const items=[{k:'home',l:'الرئيسية'},{k:'services',l:'الخدمات'},{k:'booking',l:'حجز موعد'},{k:'about',l:'عن الدكتورة'}];
  return(<nav style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(20px)',borderBottom:`1px solid ${GB}`}}>
    <div style={{maxWidth:1200,margin:'0 auto',padding:'0 16px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
      <div style={{display:'flex',alignItems:'center',gap:10,cursor:'pointer'}} onClick={()=>{setPage('home');setOpen(false)}}>
        <div style={{width:40,height:40,borderRadius:11,background:`linear-gradient(135deg,${P},${PD})`,display:'flex',alignItems:'center',justifyContent:'center'}}><span style={{fontSize:20}}>🦷</span></div>
        <div><div style={{fontSize:m?14:17,fontWeight:800,color:DK,lineHeight:1.2}}>د. دانيا عوض</div><div style={{fontSize:m?8:10,color:AC,fontWeight:700,letterSpacing:2}}>DENTAL CLINIC</div></div>
      </div>
      {m?<button onClick={()=>setOpen(!open)} style={{background:'none',border:'none',fontSize:26,cursor:'pointer',color:DK,padding:8}}>{open?'✕':'☰'}</button>:
      <div style={{display:'flex',alignItems:'center',gap:6}}>
        {items.map(i=><button key={i.k} onClick={()=>setPage(i.k)} style={{padding:'8px 16px',border:'none',borderRadius:8,cursor:'pointer',fontSize:14,fontWeight:600,fontFamily:"'Tajawal',sans-serif",background:page===i.k?PL:'transparent',color:page===i.k?P:GR}}>{i.l}</button>)}
        <button onClick={()=>setPage('login')} style={{padding:'8px 18px',border:`2px solid ${P}`,borderRadius:10,cursor:'pointer',fontSize:13,fontWeight:700,fontFamily:"'Tajawal',sans-serif",background:'transparent',color:P,marginRight:8}}>لوحة التحكم</button>
      </div>}
    </div>
    {m&&open&&<div style={{background:WH,borderTop:`1px solid ${GB}`,padding:'12px 16px',display:'flex',flexDirection:'column',gap:4,boxShadow:'0 10px 30px rgba(0,0,0,0.1)'}}>
      {items.map(i=><button key={i.k} onClick={()=>{setPage(i.k);setOpen(false)}} style={{padding:'12px 16px',border:'none',borderRadius:10,cursor:'pointer',fontSize:15,fontWeight:600,fontFamily:"'Tajawal',sans-serif",background:page===i.k?PL:'transparent',color:page===i.k?P:DM,textAlign:'right'}}>{i.l}</button>)}
      <button onClick={()=>{setPage('login');setOpen(false)}} style={{padding:'12px 16px',border:`2px solid ${P}`,borderRadius:10,cursor:'pointer',fontSize:14,fontWeight:700,fontFamily:"'Tajawal',sans-serif",background:PL,color:P,textAlign:'center',marginTop:4}}>لوحة التحكم</button>
    </div>}
  </nav>);
}

function Home({nav}){const m=useM();return(<>
  <section style={{minHeight:m?'auto':'92vh',position:'relative',overflow:'hidden',background:`linear-gradient(135deg,${DK} 0%,#0c2f2a 40%,${PD} 70%,${P} 100%)`,display:'flex',alignItems:'center',padding:m?'60px 20px 50px':'0 24px'}}>
    <div style={{position:'absolute',top:-120,left:-80,width:300,height:300,borderRadius:'50%',background:`${AC}08`,filter:'blur(80px)'}}/>
    <div style={{maxWidth:1200,margin:'0 auto',position:'relative',zIndex:2,width:'100%',display:'grid',gridTemplateColumns:m?'1fr':'1fr 1fr',alignItems:'center',gap:m?30:60}}>
      <div className="animate-fade-up">
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:`${AC}18`,borderRadius:100,padding:m?'6px 16px':'8px 22px',marginBottom:m?20:28}}><span style={{fontSize:12}}>⭐</span><span style={{color:AC,fontSize:m?12:14,fontWeight:600}}>+12 عام من الخبرة</span></div>
        <h1 style={{fontSize:m?34:54,fontWeight:900,color:'white',lineHeight:1.3,marginBottom:m?16:22}}>ابتسامة <span style={{color:AC}}>مثالية</span><br/>تبدأ من هنا</h1>
        <p style={{fontSize:m?15:18,color:'#9dbbb5',lineHeight:2,marginBottom:m?28:40,maxWidth:500}}>مع الدكتورة دانيا عوض، أخصائية طب الأسنان التجميلي والزراعة والتركيبات</p>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          <button onClick={()=>nav('booking')} style={{padding:m?'14px 28px':'17px 44px',borderRadius:14,border:'none',cursor:'pointer',background:`linear-gradient(135deg,${AC},#d4b76a)`,color:DK,fontSize:m?15:17,fontWeight:800,fontFamily:"'Tajawal',sans-serif",boxShadow:`0 8px 32px ${AC}35`,flex:m?'1':'none'}}>احجز موعدك الآن ←</button>
          {!m&&<button onClick={()=>nav('services')} style={{padding:'17px 36px',borderRadius:14,cursor:'pointer',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.15)',color:'white',fontSize:16,fontWeight:600,fontFamily:"'Tajawal',sans-serif"}}>اكتشف خدماتنا</button>}
        </div>
        <div style={{display:'flex',gap:m?24:48,marginTop:m?32:52}}>{[{n:'+2000',l:'مريض سعيد'},{n:'+12',l:'سنة خبرة'},{n:'98%',l:'نسبة رضا'}].map((s,i)=><div key={i}><div style={{fontSize:m?22:30,fontWeight:900,color:AC}}>{s.n}</div><div style={{fontSize:m?11:13,color:'#7da39c'}}>{s.l}</div></div>)}</div>
      </div>
      {!m&&<div style={{position:'relative'}}><div style={{width:'100%',aspectRatio:'4/5',borderRadius:28,overflow:'hidden',background:`linear-gradient(160deg,${P}20,${PD},${P})`,boxShadow:'0 30px 80px rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:20}}>
        <span style={{fontSize:120,filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.3))'}}>🦷</span>
        <div style={{color:'white',fontSize:22,fontWeight:800,textAlign:'center',padding:'0 30px'}}>عيادة متخصصة في<br/>طب الأسنان التجميلي والزراعة</div>
      </div><div style={{position:'absolute',bottom:40,right:-24,background:'rgba(255,255,255,0.97)',borderRadius:18,padding:'18px 26px',boxShadow:'0 20px 50px rgba(0,0,0,0.15)'}} className="animate-float"><div style={{display:'flex',alignItems:'center',gap:14}}><div style={{width:48,height:48,borderRadius:14,background:PL,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>🏆</div><div><div style={{fontSize:15,fontWeight:800,color:DK}}>البورد الأردني</div><div style={{fontSize:12,color:GR}}>معالجة تحفظية وتجميل</div></div></div></div></div>}
    </div>
  </section>

  <section style={{padding:m?'60px 16px':'100px 24px',background:WH}}><div style={{maxWidth:1200,margin:'0 auto'}}>
    <div style={{textAlign:'center',marginBottom:m?36:60}}><span style={{display:'inline-block',fontSize:13,fontWeight:700,color:P,background:PL,padding:'8px 22px',borderRadius:100,marginBottom:12}}>خدماتنا المتميزة</span><h2 style={{fontSize:m?28:40,fontWeight:900,color:DK,marginBottom:10}}>رعاية شاملة <span style={{color:P}}>لابتسامتك</span></h2></div>
    <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(auto-fill,minmax(340px,1fr))',gap:m?16:24}}>
      {SERVICES.map(s=><div key={s.id} style={{borderRadius:20,overflow:'hidden',background:WH,border:`1px solid ${GB}`}}>
        <div style={{height:m?160:200,background:s.grad,display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}><div style={{position:'absolute',top:-30,right:-30,width:100,height:100,borderRadius:'50%',background:'rgba(255,255,255,0.1)'}}/><span style={{fontSize:m?48:64,filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',position:'relative',zIndex:2}}>{s.icon}</span></div>
        <div style={{padding:m?16:24}}><h3 style={{fontSize:m?17:20,fontWeight:800,color:DK,marginBottom:4}}>{s.title}</h3><p style={{fontSize:11,color:P,fontWeight:600,letterSpacing:1,marginBottom:8}}>{s.titleEn}</p><p style={{fontSize:m?13:14,color:GR,lineHeight:1.9,marginBottom:14}}>{s.desc}</p>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:m?14:16,fontWeight:800,color:P}}>{s.price}</span><span style={{fontSize:11,color:GR,background:GL,padding:'4px 12px',borderRadius:8,fontWeight:600}}>⏱ {s.dur}</span></div></div>
      </div>)}
    </div>
  </div></section>

  <section style={{padding:m?'50px 16px':'80px 24px',background:PL}}><div style={{maxWidth:1200,margin:'0 auto'}}>
    <div style={{textAlign:'center',marginBottom:m?28:48}}><h2 style={{fontSize:m?26:36,fontWeight:900,color:DK}}>ماذا يقول مرضانا عنا</h2></div>
    <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(3,1fr)',gap:m?16:24}}>
      {REVIEWS.map((r,i)=><div key={i} style={{background:WH,borderRadius:20,padding:m?20:32,border:`1px solid ${GB}`}}>
        <div style={{display:'flex',gap:3,marginBottom:12}}>{Array.from({length:r.rating}).map((_,j)=><span key={j} style={{fontSize:18,color:'#facc15'}}>★</span>)}</div>
        <p style={{fontSize:14,color:DM,lineHeight:2,marginBottom:16}}>"{r.text}"</p>
        <div style={{display:'flex',alignItems:'center',gap:10}}><div style={{width:38,height:38,borderRadius:10,background:`linear-gradient(135deg,${P},${PD})`,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700}}>{r.name[0]}</div><span style={{fontWeight:700,color:DK}}>{r.name}</span></div>
      </div>)}
    </div>
  </div></section>

  <section style={{padding:m?'50px 16px':'80px 24px',background:WH}}><div style={{maxWidth:1000,margin:'0 auto',textAlign:'center'}}>
    <h2 style={{fontSize:m?26:36,fontWeight:900,color:DK,marginBottom:m?28:48}}>لماذا <span style={{color:P}}>تختارنا؟</span></h2>
    <div style={{display:'grid',gridTemplateColumns:m?'1fr 1fr':'repeat(4,1fr)',gap:m?12:28}}>
      {[{i:'🎓',t:'خبرة أكاديمية',d:'محاضر في الجامعة الأردنية'},{i:'🏅',t:'البورد الأردني',d:'شهادة اختصاص عليا'},{i:'⚡',t:'تقنيات حديثة',d:'أحدث أجهزة طب الأسنان'},{i:'💎',t:'جودة عالية',d:'مواد عالمية معتمدة'}].map((w,idx)=><div key={idx} style={{padding:m?20:32,borderRadius:16,background:LT,border:`1px solid ${GB}`}}><div style={{fontSize:m?30:40,marginBottom:12}}>{w.i}</div><h4 style={{fontSize:m?14:17,fontWeight:800,color:DK,marginBottom:6}}>{w.t}</h4><p style={{fontSize:m?12:14,color:GR,lineHeight:1.7}}>{w.d}</p></div>)}
    </div>
  </div></section>

  <section style={{padding:m?'50px 20px':'80px 24px',textAlign:'center',background:`linear-gradient(135deg,${P},${PD})`}}><div style={{maxWidth:600,margin:'0 auto'}}>
    <span style={{fontSize:m?48:60}}>😁</span><h2 style={{fontSize:m?26:38,fontWeight:900,color:'white',marginBottom:14,marginTop:16}}>جاهز لابتسامة أجمل؟</h2>
    <p style={{fontSize:m?14:17,color:'#a0d4c8',marginBottom:28,lineHeight:1.9}}>احجز موعدك الآن واحصل على استشارة</p>
    <button onClick={()=>nav('booking')} style={{padding:m?'14px 36px':'17px 52px',borderRadius:14,border:'none',cursor:'pointer',background:`linear-gradient(135deg,${AC},#d4b76a)`,color:DK,fontSize:m?16:18,fontWeight:800,fontFamily:"'Tajawal',sans-serif",width:m?'100%':'auto'}}>احجز موعدك الآن</button>
  </div></section>
</>)}

function Svc({nav}){const m=useM();return(<section style={{padding:m?'40px 16px 60px':'60px 24px 100px',background:LT}}><div style={{maxWidth:1200,margin:'0 auto'}}>
  <div style={{textAlign:'center',marginBottom:m?36:60}}><h1 style={{fontSize:m?30:44,fontWeight:900,color:DK,marginBottom:10}}>خدماتنا <span style={{color:P}}>المتخصصة</span></h1></div>
  {SERVICES.map((s,i)=><div key={s.id} style={{display:'grid',gridTemplateColumns:m?'1fr':(i%2===0?'1fr 1.2fr':'1.2fr 1fr'),gap:0,marginBottom:m?16:28,background:WH,borderRadius:m?18:24,overflow:'hidden',border:`1px solid ${GB}`}}>
    <div style={{minHeight:m?180:300,background:s.grad,display:'flex',alignItems:'center',justifyContent:'center',order:m?0:(i%2===1?1:0)}}><span style={{fontSize:m?60:90,filter:'drop-shadow(0 6px 20px rgba(0,0,0,0.2))'}}>{s.icon}</span></div>
    <div style={{padding:m?24:48,order:m?1:(i%2===1?0:1)}}><h3 style={{fontSize:m?22:30,fontWeight:800,color:DK,marginBottom:4}}>{s.title}</h3><p style={{fontSize:11,fontWeight:700,color:P,marginBottom:14,letterSpacing:1.5}}>{s.titleEn}</p><p style={{fontSize:m?14:16,color:GR,lineHeight:2,marginBottom:20}}>{s.desc}</p>
    <div style={{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap'}}><div style={{background:PL,padding:'10px 18px',borderRadius:10}}><span style={{fontSize:m?14:17,fontWeight:800,color:P}}>{s.price}</span></div><div style={{background:ACL,padding:'10px 18px',borderRadius:10}}><span style={{fontSize:m?14:17,fontWeight:800,color:AC}}>⏱ {s.dur}</span></div></div>
    <button onClick={()=>nav('booking')} style={{padding:'12px 32px',borderRadius:12,border:'none',cursor:'pointer',background:`linear-gradient(135deg,${P},${PD})`,color:'white',fontSize:14,fontWeight:700,fontFamily:"'Tajawal',sans-serif",width:m?'100%':'auto'}}>احجز هذه الخدمة</button></div>
  </div>)}
</div></section>)}

function Book({bk,setBk,doBook,ok,appts,loading}){const m=useM();const booked=appts.filter(a=>a.date===bk.date&&a.status!=='cancelled').map(a=>a.time);const ready=bk.name&&bk.phone&&bk.service&&bk.date&&bk.time;
  return(<section style={{padding:m?'40px 16px 60px':'60px 24px 100px',background:LT}}><div style={{maxWidth:800,margin:'0 auto'}}>
    <div style={{textAlign:'center',marginBottom:m?28:48}}><h1 style={{fontSize:m?30:40,fontWeight:900,color:DK,marginBottom:10}}>احجز <span style={{color:P}}>موعدك</span></h1></div>
    {ok&&<div style={{background:'#ecfdf5',border:'1px solid #6ee7b740',borderRadius:16,padding:m?20:28,marginBottom:20,textAlign:'center'}}><span style={{fontSize:36,display:'block',marginBottom:8}}>✅</span><h3 style={{color:'#10b981',fontWeight:800,fontSize:m?18:22}}>تم الحجز بنجاح!</h3></div>}
    <div style={{background:WH,borderRadius:m?20:26,padding:m?20:44,border:`1px solid ${GB}`}}>
      <div style={{display:'grid',gridTemplateColumns:m?'1fr':'1fr 1fr',gap:m?12:20,marginBottom:m?16:24}}><Inp label="الاسم الكامل" ph="أدخل اسمك" val={bk.name} set={v=>setBk({...bk,name:v})}/><Inp label="رقم الهاتف" ph="07XXXXXXXX" val={bk.phone} set={v=>setBk({...bk,phone:v})}/></div>
      <div style={{marginBottom:m?16:24}}><label style={{display:'block',fontSize:14,fontWeight:700,color:DK,marginBottom:8}}>الخدمة المطلوبة</label>
        <div style={{display:'grid',gridTemplateColumns:m?'1fr 1fr':'repeat(3,1fr)',gap:8}}>
          {SERVICES.map(s=><button key={s.id} onClick={()=>setBk({...bk,service:s.title})} style={{padding:m?'10px 6px':'14px 10px',borderRadius:12,cursor:'pointer',border:bk.service===s.title?`2px solid ${P}`:`1px solid ${GB}`,background:bk.service===s.title?PL:WH,fontSize:m?11:13,fontWeight:700,color:bk.service===s.title?P:DM,fontFamily:"'Tajawal',sans-serif",display:'flex',alignItems:'center',gap:6,justifyContent:'center'}}><span>{s.icon}</span>{s.title}</button>)}
        </div>
      </div>
      <div style={{marginBottom:m?16:24}}><label style={{display:'block',fontSize:14,fontWeight:700,color:DK,marginBottom:8}}>التاريخ</label><input type="date" value={bk.date} onChange={e=>setBk({...bk,date:e.target.value,time:''})} style={{width:'100%',padding:'12px 14px',borderRadius:12,border:`1px solid ${GB}`,fontSize:15,fontFamily:"'Tajawal',sans-serif",outline:'none',background:LT}}/></div>
      {bk.date&&<div style={{marginBottom:m?20:32}}><label style={{display:'block',fontSize:14,fontWeight:700,color:DK,marginBottom:8}}>الوقت المتاح</label>
        <div style={{display:'grid',gridTemplateColumns:m?'repeat(3,1fr)':'repeat(5,1fr)',gap:8}}>
          {SLOTS.map(t=>{const b=booked.includes(t);const s=bk.time===t;return<button key={t} disabled={b} onClick={()=>setBk({...bk,time:t})} style={{padding:'10px 6px',borderRadius:10,cursor:b?'not-allowed':'pointer',border:s?`2px solid ${P}`:`1px solid ${b?'#fecaca':GB}`,background:b?'#fef2f2':s?PL:WH,color:b?'#fca5a5':s?P:DM,fontSize:m?13:14,fontWeight:700,fontFamily:"'Tajawal',sans-serif",textDecoration:b?'line-through':'none',opacity:b?0.5:1}}>{t}</button>})}
        </div>
      </div>}
      <button onClick={doBook} disabled={!ready||loading} style={{width:'100%',padding:m?'14px':'17px',borderRadius:14,border:'none',cursor:ready?'pointer':'default',background:ready?`linear-gradient(135deg,${P},${PD})`:GL,color:ready?'white':GR,fontSize:m?16:18,fontWeight:800,fontFamily:"'Tajawal',sans-serif",opacity:loading?0.7:1}}>{loading?'جاري الحجز...':'تأكيد الحجز'}</button>
    </div>
  </div></section>)}

function About(){const m=useM();return(<section style={{padding:m?'40px 16px 60px':'60px 24px 100px',background:LT}}><div style={{maxWidth:1000,margin:'0 auto'}}>
  <div style={{display:'grid',gridTemplateColumns:m?'1fr':'1fr 1.5fr',gap:m?24:48,background:WH,borderRadius:m?20:28,padding:m?20:48,border:`1px solid ${GB}`}}>
    <div>
      <div style={{aspectRatio:m?'16/9':'3/4',borderRadius:m?16:22,background:`linear-gradient(160deg,${PL},${P},${PD})`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:12}}>
        <div style={{width:m?80:120,height:m?80:120,borderRadius:'50%',background:'rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',border:'3px solid rgba(255,255,255,0.3)'}}><span style={{fontSize:m?36:52}}>👩‍⚕️</span></div>
        <div style={{color:'white',fontSize:m?18:22,fontWeight:800}}>د. دانيا عوض</div>
      </div>
      <div style={{marginTop:16,background:PL,borderRadius:14,padding:m?16:22}}><h4 style={{fontSize:14,fontWeight:700,color:P,marginBottom:10}}>تواصل معنا</h4>
        <div style={{display:'flex',flexDirection:'column',gap:8,fontSize:12,color:DM}}><span>📍 الدوار السابع، بناية نصار (1)</span><span>📞 0776565200</span><span>🕒 السبت-الخميس: 9ص-6م</span></div>
      </div>
    </div>
    <div>
      <h1 style={{fontSize:m?26:38,fontWeight:900,color:DK,marginBottom:6}}>د. دانيا عوض</h1>
      <p style={{fontSize:13,color:P,fontWeight:700,marginBottom:20}}>أخصائية العلاج التحفظي والتركيبات والزراعة والتجميل</p>
      <p style={{fontSize:m?13:15,color:GR,lineHeight:2.1,marginBottom:24}}>أخصائية متميزة مع خبرة +12 عاماً. تعمل في عيادتها بالدوار السابع بعمّان ومحاضر في الجامعة الأردنية.</p>
      <h3 style={{fontSize:m?16:19,fontWeight:800,color:DK,marginBottom:14}}>المؤهلات</h3>
      <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:24}}>
        {['بكالوريوس طب الفم والأسنان - الجامعة الأردنية','الاختصاص العالي - الخدمات الطبية الملكية','البورد الأردني - التحفظي والتجميل والزراعة','محاضر في الجامعة الأردنية'].map((q,i)=><div key={i} style={{display:'flex',alignItems:'start',gap:10}}><span style={{width:22,height:22,borderRadius:6,background:PL,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:P,flexShrink:0,marginTop:2}}>✓</span><span style={{fontSize:m?12:14,color:DM,lineHeight:1.8}}>{q}</span></div>)}
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:6}}>{['زراعة','تجميل','تركيبات','علاج تحفظي','هوليوود سمايل','بوتكس','تبييض'].map(s=><span key={s} style={{padding:'7px 14px',borderRadius:8,fontSize:m?11:13,fontWeight:700,background:PL,color:P}}>{s}</span>)}</div>
    </div>
  </div>
</div></section>)}

function Login({login,setLogin,doLogin,err}){const m=useM();return(<section style={{minHeight:'85vh',display:'flex',alignItems:'center',justifyContent:'center',background:`linear-gradient(135deg,${DK},${PD})`,padding:m?16:24}}>
  <div style={{width:m?'100%':420,maxWidth:420,background:WH,borderRadius:m?20:28,padding:m?28:48}}>
    <div style={{textAlign:'center',marginBottom:28}}><div style={{width:60,height:60,borderRadius:18,margin:'0 auto 14',background:`linear-gradient(135deg,${P},${PD})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28}}>🔒</div><h2 style={{fontSize:m?22:26,fontWeight:900,color:DK}}>لوحة التحكم</h2></div>
    {err&&<div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:12,padding:'12px',marginBottom:16,textAlign:'center',color:'#ef4444',fontSize:13,fontWeight:600}}>{err}</div>}
    <Inp label="اسم المستخدم" ph="admin" val={login.user} set={v=>setLogin({...login,user:v})}/>
    <div style={{marginTop:14}}><Inp label="كلمة المرور" ph="••••••••" type="password" val={login.pass} set={v=>setLogin({...login,pass:v})}/></div>
    <button onClick={doLogin} style={{width:'100%',padding:'15px',borderRadius:14,border:'none',cursor:'pointer',background:`linear-gradient(135deg,${P},${PD})`,color:'white',fontSize:16,fontWeight:800,fontFamily:"'Tajawal',sans-serif",marginTop:20}}>تسجيل الدخول</button>
    <p style={{textAlign:'center',fontSize:11,color:GR,marginTop:16}}>admin / admin123</p>
  </div>
</section>)}

function Admin({appts,updS,tab,setTab,logout}){const m=useM();const[sO,setSO]=useState(false);
  const today=new Date().toISOString().split('T')[0];
  const stats={total:appts.length,confirmed:appts.filter(a=>a.status==='confirmed').length,pending:appts.filter(a=>a.status==='pending').length,cancelled:appts.filter(a=>a.status==='cancelled').length,completed:appts.filter(a=>a.status==='completed').length,todayCount:appts.filter(a=>a.date===today).length};
  const svcS=SERVICES.map(s=>({name:s.title,count:appts.filter(a=>a.service===s.title).length})).sort((a,b)=>b.count-a.count);
  const sides=[{k:'overview',i:'📊',l:'نظرة عامة'},{k:'appointments',i:'📋',l:'المواعيد'},{k:'calendar',i:'📅',l:'التقويم'},{k:'patients',i:'👥',l:'المرضى'}];
  return(<div style={{display:'flex',minHeight:'100vh',direction:'rtl',fontFamily:"'Tajawal',sans-serif"}}>
    {(!m||sO)&&<>{m&&<div onClick={()=>setSO(false)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.4)',zIndex:99}}/>}
      <div style={{width:240,background:DK,padding:'20px 14px',display:'flex',flexDirection:'column',position:'fixed',top:0,right:0,bottom:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:30,padding:'0 6px'}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}><span style={{fontSize:22}}>🦷</span><div><div style={{fontSize:14,fontWeight:800,color:'white'}}>لوحة التحكم</div><div style={{fontSize:10,color:AC}}>د. دانيا عوض</div></div></div>
          {m&&<button onClick={()=>setSO(false)} style={{background:'none',border:'none',color:'white',fontSize:20,cursor:'pointer'}}>✕</button>}
        </div>
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:4}}>
          {sides.map(s=><button key={s.k} onClick={()=>{setTab(s.k);if(m)setSO(false)}} style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',borderRadius:10,border:'none',cursor:'pointer',background:tab===s.k?`${P}30`:'transparent',color:tab===s.k?AC:'#9ca3af',fontSize:14,fontWeight:600,fontFamily:"'Tajawal',sans-serif",width:'100%',textAlign:'right'}}><span>{s.i}</span>{s.l}</button>)}
        </div>
        <button onClick={logout} style={{display:'flex',alignItems:'center',gap:8,padding:'12px 14px',borderRadius:10,border:'1px solid #374151',cursor:'pointer',background:'transparent',color:'#ef4444',fontSize:13,fontWeight:600,fontFamily:"'Tajawal',sans-serif",width:'100%'}}><span>🚪</span>خروج</button>
      </div>
    </>}
    <div style={{flex:1,marginRight:m?0:240,background:GL,minHeight:'100vh'}}>
      <div style={{padding:m?'12px 16px':'16px 32px',background:WH,borderBottom:`1px solid ${GB}`,display:'flex',alignItems:'center',justifyContent:'space-between',position:m?'sticky':'static',top:0,zIndex:50}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          {m&&<button onClick={()=>setSO(true)} style={{background:'none',border:'none',fontSize:22,cursor:'pointer',color:DK}}>☰</button>}
          <h2 style={{fontSize:m?16:22,fontWeight:800,color:DK}}>{sides.find(s=>s.k===tab)?.l}</h2>
        </div>
        <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${P},${PD})`,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:13}}>د</div>
      </div>
      <div style={{padding:m?16:32}}>
        {tab==='overview'&&<Ov stats={stats} svcS={svcS} appts={appts} m={m}/>}
        {tab==='appointments'&&<Appts appts={appts} updS={updS} m={m}/>}
        {tab==='calendar'&&<Cal appts={appts} m={m}/>}
        {tab==='patients'&&<Pts appts={appts} m={m}/>}
      </div>
    </div>
  </div>);
}

function Ov({stats,svcS,appts,m}){
  const cards=[{l:'الإجمالي',v:stats.total,i:'📊',c:P,bg:PL},{l:'اليوم',v:stats.todayCount,i:'📅',c:'#3b82f6',bg:'#eff6ff'},{l:'مؤكدة',v:stats.confirmed,i:'✅',c:'#10b981',bg:'#ecfdf5'},{l:'انتظار',v:stats.pending,i:'⏳',c:'#f59e0b',bg:'#fffbeb'},{l:'مكتملة',v:stats.completed,i:'🏆',c:'#8b5cf6',bg:'#f5f3ff'},{l:'ملغاة',v:stats.cancelled,i:'❌',c:'#ef4444',bg:'#fef2f2'}];
  const mx=Math.max(...svcS.map(s=>s.count),1);
  return(<div>
    <div style={{display:'grid',gridTemplateColumns:m?'repeat(2,1fr)':'repeat(3,1fr)',gap:m?10:20,marginBottom:m?16:28}}>
      {cards.map((c,i)=><div key={i} style={{background:WH,borderRadius:m?14:18,padding:m?14:24,border:`1px solid ${GB}`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'start'}}><div><div style={{fontSize:m?11:13,color:GR,fontWeight:600,marginBottom:m?4:8}}>{c.l}</div><div style={{fontSize:m?24:38,fontWeight:900,color:c.c}}>{c.v}</div></div>
        <div style={{width:m?36:50,height:m?36:50,borderRadius:m?10:14,background:c.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:m?16:24}}>{c.i}</div></div>
      </div>)}
    </div>
    <div style={{display:'grid',gridTemplateColumns:m?'1fr':'1.5fr 1fr',gap:m?12:20}}>
      <div style={{background:WH,borderRadius:m?14:18,padding:m?16:28,border:`1px solid ${GB}`}}>
        <h3 style={{fontSize:m?14:17,fontWeight:800,color:DK,marginBottom:m?14:24}}>📊 حسب الخدمة</h3>
        {svcS.map((s,i)=><div key={i} style={{marginBottom:m?12:18}}><div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}><span style={{fontSize:m?11:13,fontWeight:600,color:DM}}>{s.name}</span><span style={{fontSize:m?12:14,fontWeight:800,color:P}}>{s.count}</span></div>
        <div style={{height:m?8:12,background:GL,borderRadius:6,overflow:'hidden'}}><div style={{height:'100%',borderRadius:6,background:`linear-gradient(90deg,${P},${AC})`,width:`${(s.count/mx)*100}%`,transition:'width 1s'}}/></div></div>)}
      </div>
      <div style={{background:WH,borderRadius:m?14:18,padding:m?16:28,border:`1px solid ${GB}`}}>
        <h3 style={{fontSize:m?14:17,fontWeight:800,color:DK,marginBottom:m?14:24}}>📈 الحالات</h3>
        <Donut stats={stats} m={m}/>
      </div>
    </div>
    <div style={{background:WH,borderRadius:m?14:18,padding:m?16:28,border:`1px solid ${GB}`,marginTop:m?12:20}}>
      <h3 style={{fontSize:m?14:17,fontWeight:800,color:DK,marginBottom:m?12:20}}>🕐 آخر المواعيد</h3>
      <div style={{display:'flex',flexDirection:'column',gap:10}}>{appts.slice(-4).reverse().map(a=><div key={a.id} style={{padding:m?10:14,borderRadius:10,background:LT,border:`1px solid ${GB}`,display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:6}}>
        <span style={{fontWeight:700,fontSize:m?13:14,color:DK}}>{a.name}</span>
        <span style={{fontSize:12,color:GR}}>{a.service} • {a.date}</span>
        <Badge s={a.status}/>
      </div>)}</div>
    </div>
  </div>);
}

function Donut({stats,m}){
  const data=[{l:'مؤكدة',v:stats.confirmed,c:'#10b981'},{l:'انتظار',v:stats.pending,c:'#f59e0b'},{l:'مكتملة',v:stats.completed,c:'#8b5cf6'},{l:'ملغاة',v:stats.cancelled,c:'#ef4444'}].filter(d=>d.v>0);
  const total=data.reduce((s,d)=>s+d.v,0);let cum=0;const sz=m?130:180,sw=m?20:30,r=(sz-sw)/2,ci=2*Math.PI*r;
  return(<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
    <svg width={sz} height={sz} style={{transform:'rotate(-90deg)'}}>
      {data.map((d,i)=>{const da=`${(d.v/total)*ci} ${ci}`;const off=-(cum/total)*ci;cum+=d.v;return<circle key={i} cx={sz/2} cy={sz/2} r={r} fill="none" stroke={d.c} strokeWidth={sw} strokeDasharray={da} strokeDashoffset={off} strokeLinecap="round"/>})}
      <text x={sz/2} y={sz/2} textAnchor="middle" dominantBaseline="central" style={{transform:'rotate(90deg)',transformOrigin:'center',fontSize:m?20:30,fontWeight:900,fill:DK}}>{total}</text>
    </svg>
    <div style={{display:'flex',flexWrap:'wrap',gap:m?8:14,marginTop:m?10:20,justifyContent:'center'}}>{data.map((d,i)=><div key={i} style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:8,height:8,borderRadius:2,background:d.c}}/><span style={{fontSize:m?10:12,color:GR}}>{d.l}({d.v})</span></div>)}</div>
  </div>);
}

function Appts({appts,updS,m}){const[f,setF]=useState('all');const list=f==='all'?appts:appts.filter(a=>a.status===f);
  return(<div>
    <div style={{display:'flex',gap:6,marginBottom:m?12:20,flexWrap:'wrap'}}>
      {[{k:'all',l:'الكل'},{k:'pending',l:'انتظار'},{k:'confirmed',l:'مؤكدة'},{k:'completed',l:'مكتملة'},{k:'cancelled',l:'ملغاة'}].map(x=><button key={x.k} onClick={()=>setF(x.k)} style={{padding:m?'6px 12px':'9px 22px',borderRadius:8,border:'none',cursor:'pointer',background:f===x.k?P:WH,color:f===x.k?'white':DM,fontSize:m?12:13,fontWeight:600,fontFamily:"'Tajawal',sans-serif"}}>{x.l}</button>)}
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:10}}>
      {list.map(a=><div key={a.id} style={{background:WH,borderRadius:14,padding:m?14:18,border:`1px solid ${GB}`}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}><span style={{fontWeight:700,fontSize:m?14:16,color:DK}}>{a.name}</span><Badge s={a.status}/></div>
        <div style={{fontSize:m?12:13,color:GR,marginBottom:4}}>{a.service}</div>
        <div style={{fontSize:m?12:13,color:GR,marginBottom:8}}>📅 {a.date} • ⏰ {a.time} • 📞 <span style={{direction:'ltr',display:'inline-block'}}>{a.phone}</span></div>
        <div style={{display:'flex',gap:6}}>
          {a.status==='pending'&&<><MBtn c="#10b981" onClick={()=>updS(a.id,'confirmed')}>✓ تأكيد</MBtn><MBtn c="#ef4444" onClick={()=>updS(a.id,'cancelled')}>✕ إلغاء</MBtn></>}
          {a.status==='confirmed'&&<MBtn c="#8b5cf6" onClick={()=>updS(a.id,'completed')}>🏆 اكتمل</MBtn>}
        </div>
      </div>)}
    </div>
  </div>);
}

function Cal({appts,m}){const[mo,setMo]=useState(new Date().getMonth());const yr=new Date().getFullYear();
  const mN=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  const dN=m?['أحد','إثن','ثلث','أربع','خمس','جمع','سبت']:['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  const fd=new Date(yr,mo,1).getDay();const dm=new Date(yr,mo+1,0).getDate();
  const cells=[...Array(fd).fill(null),...Array.from({length:dm},(_,i)=>i+1)];
  const td=new Date().getDate();const tm=new Date().getMonth();
  const getA=d=>d?appts.filter(a=>a.date===`${yr}-${String(mo+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`):[];
  return(<div style={{background:WH,borderRadius:m?14:18,padding:m?14:28,border:`1px solid ${GB}`}}>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:m?16:28}}>
      <h3 style={{fontSize:m?18:24,fontWeight:800,color:DK}}>{mN[mo]} {yr}</h3>
      <div style={{display:'flex',gap:6}}><button onClick={()=>setMo(mo>0?mo-1:11)} style={{width:32,height:32,borderRadius:8,border:`1px solid ${GB}`,background:WH,cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>→</button><button onClick={()=>setMo(mo<11?mo+1:0)} style={{width:32,height:32,borderRadius:8,border:`1px solid ${GB}`,background:WH,cursor:'pointer',fontSize:14,display:'flex',alignItems:'center',justifyContent:'center'}}>←</button></div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:m?2:4,marginBottom:6}}>{dN.map(d=><div key={d} style={{textAlign:'center',fontSize:m?9:12,fontWeight:700,color:GR,padding:m?4:8}}>{d}</div>)}</div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:m?2:4}}>
      {cells.map((d,i)=>{const da=getA(d);const isT=d===td&&mo===tm;
        return<div key={i} style={{minHeight:m?44:95,borderRadius:m?6:12,padding:m?3:8,background:isT?PL:d?LT:'transparent',border:isT?`2px solid ${P}`:`1px solid ${d?GB:'transparent'}`}}>
          {d&&<><div style={{fontSize:m?11:14,fontWeight:isT?800:600,color:isT?P:DM,marginBottom:2}}>{d}</div>
            {m?da.length>0&&<div style={{display:'flex',gap:2,flexWrap:'wrap'}}>{da.slice(0,3).map((_,j)=><div key={j} style={{width:5,height:5,borderRadius:'50%',background:P}}/>)}</div>:
            <>{da.slice(0,2).map((a,j)=>{const bg={confirmed:'#dcfce7',pending:'#fef3c7',completed:'#ede9fe',cancelled:'#fecaca'}[a.status];const cl={confirmed:'#166534',pending:'#92400e',completed:'#5b21b6',cancelled:'#991b1b'}[a.status];
              return<div key={j} style={{fontSize:10,padding:'2px 4px',borderRadius:4,marginBottom:2,background:bg,color:cl,fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.time} {a.name}</div>})}{da.length>2&&<div style={{fontSize:9,color:P,fontWeight:700}}>+{da.length-2}</div>}</>}
          </>}
        </div>})}
    </div>
  </div>);
}

function Pts({appts,m}){const pts={};appts.forEach(a=>{if(!pts[a.phone])pts[a.phone]={name:a.name,phone:a.phone,v:0,s:new Set()};pts[a.phone].v++;pts[a.phone].s.add(a.service)});
  const list=Object.values(pts).sort((a,b)=>b.v-a.v);
  return(<div style={{display:'flex',flexDirection:'column',gap:10}}>
    <div style={{fontSize:m?14:17,fontWeight:800,color:DK,marginBottom:4}}>👥 المرضى ({list.length})</div>
    {list.map((p,i)=><div key={i} style={{background:WH,borderRadius:14,padding:m?14:18,border:`1px solid ${GB}`}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
        <div style={{width:m?34:40,height:m?34:40,borderRadius:m?8:12,background:`linear-gradient(135deg,${P},${PD})`,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:m?14:16}}>{p.name[0]}</div>
        <div style={{flex:1}}><div style={{fontWeight:700,fontSize:m?14:15,color:DK}}>{p.name}</div><div style={{fontSize:11,color:GR,direction:'ltr'}}>{p.phone}</div></div>
        <span style={{background:PL,color:P,padding:'4px 12px',borderRadius:6,fontSize:12,fontWeight:700}}>{p.v} زيارة</span>
      </div>
      <div style={{display:'flex',flexWrap:'wrap',gap:4}}>{Array.from(p.s).map(s=><span key={s} style={{fontSize:10,padding:'3px 8px',borderRadius:4,background:GL,color:DM,fontWeight:600}}>{s}</span>)}</div>
    </div>)}
  </div>);
}

function Inp({label,ph,val,set,type='text'}){return(<div><label style={{display:'block',fontSize:14,fontWeight:700,color:DK,marginBottom:6}}>{label}</label><input type={type} placeholder={ph} value={val} onChange={e=>set(e.target.value)} style={{width:'100%',padding:'12px 14px',borderRadius:12,border:`1px solid ${GB}`,fontSize:15,fontFamily:"'Tajawal',sans-serif",outline:'none',background:LT}} onFocus={e=>e.target.style.borderColor=P} onBlur={e=>e.target.style.borderColor=GB}/></div>)}
function Badge({s}){const x=ST[s]||ST.pending;return<span style={{padding:'4px 12px',borderRadius:6,fontSize:11,fontWeight:700,background:x.bg,color:x.c}}>{x.l}</span>}
function MBtn({children,c,onClick}){return<button onClick={onClick} style={{padding:'6px 14px',borderRadius:8,border:'none',cursor:'pointer',background:`${c}15`,color:c,fontSize:11,fontWeight:700,fontFamily:"'Tajawal',sans-serif"}}>{children}</button>}
function Foot(){const m=useM();return(<footer style={{background:DK,color:'white',padding:m?'40px 16px 20px':'60px 24px 30px',direction:'rtl'}}><div style={{maxWidth:1200,margin:'0 auto'}}>
  <div style={{display:'grid',gridTemplateColumns:m?'1fr':'repeat(auto-fit,minmax(250px,1fr))',gap:m?24:40,marginBottom:m?24:40}}>
    <div><div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}><span style={{fontSize:22}}>🦷</span><span style={{fontSize:m?16:20,fontWeight:800}}>عيادة د. دانيا عوض</span></div><p style={{color:'#9ca3af',lineHeight:1.9,fontSize:m?12:14}}>عيادة متخصصة في طب الأسنان التجميلي والزراعة مع خبرة +12 عاماً</p></div>
    <div><h4 style={{fontSize:m?14:16,fontWeight:700,marginBottom:12,color:AC}}>تواصل معنا</h4><div style={{display:'flex',flexDirection:'column',gap:8,color:'#9ca3af',fontSize:m?12:14}}><span>📍 الدوار السابع، بناية نصار (1)</span><span>📞 0776565200</span><span>🕒 السبت-الخميس: 9ص-6م</span></div></div>
    {!m&&<div><h4 style={{fontSize:16,fontWeight:700,marginBottom:12,color:AC}}>خدماتنا</h4><div style={{display:'flex',flexDirection:'column',gap:8,color:'#9ca3af',fontSize:14}}>{SERVICES.slice(0,4).map(s=><span key={s.id}>{s.title}</span>)}</div></div>}
  </div>
  <div style={{borderTop:'1px solid #374151',paddingTop:16,textAlign:'center',color:'#6b7280',fontSize:m?11:13}}>© {new Date().getFullYear()} عيادة د. دانيا عوض</div>
</div></footer>)}