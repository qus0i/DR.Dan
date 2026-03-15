'use client';
import { useState, useEffect } from 'react';

// ═══════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════
const SERVICES = [
  { id:1,icon:'🦷',title:'زراعة الأسنان',titleEn:'Dental Implants',desc:'حلول متقدمة لزراعة الأسنان باستخدام أحدث التقنيات العالمية لاستعادة ابتسامتك الطبيعية بثقة تامة',price:'يبدأ من 400 د.أ',dur:'60 دقيقة',grad:'linear-gradient(135deg,#0f766e,#064e3b,#0d9488)' },
  { id:2,icon:'✨',title:'تجميل الأسنان',titleEn:'Cosmetic Dentistry',desc:'ابتسامة هوليوود، فينيرز، وتبييض الأسنان بأحدث الطرق لمنحك ابتسامة مثالية وطبيعية',price:'يبدأ من 200 د.أ',dur:'45 دقيقة',grad:'linear-gradient(135deg,#7c3aed,#4f46e5,#6366f1)' },
  { id:3,icon:'👑',title:'التركيبات والتيجان',titleEn:'Crowns & Bridges',desc:'تركيبات ثابتة ومتحركة بجودة عالية تعيد لأسنانك وظيفتها وجمالها الطبيعي',price:'يبدأ من 150 د.أ',dur:'40 دقيقة',grad:'linear-gradient(135deg,#b45309,#d97706,#f59e0b)' },
  { id:4,icon:'🔧',title:'العلاج التحفظي',titleEn:'Conservative Treatment',desc:'حشوات تجميلية وعلاج جذور الأسنان بتقنيات حديثة للحفاظ على أسنانك الطبيعية',price:'يبدأ من 50 د.أ',dur:'30 دقيقة',grad:'linear-gradient(135deg,#0369a1,#0284c7,#38bdf8)' },
  { id:5,icon:'💉',title:'البوتكس التجميلي',titleEn:'Botox Treatment',desc:'علاجات البوتكس لتقليل التجاعيد واستعادة نضارة البشرة بأيدي خبيرة ومتخصصة',price:'يبدأ من 100 د.أ',dur:'20 دقيقة',grad:'linear-gradient(135deg,#be185d,#e11d48,#f43f5e)' },
  { id:6,icon:'😁',title:'تبييض الأسنان',titleEn:'Teeth Whitening',desc:'تبييض الأسنان بالليزر والتقنيات المتقدمة للحصول على ابتسامة بيضاء ناصعة ومشرقة',price:'يبدأ من 120 د.أ',dur:'35 دقيقة',grad:'linear-gradient(135deg,#0f766e,#c8a960,#0d9488)' },
];
const SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
const REVIEWS = [
  { name:'أحمد م.',text:'دكتورة رائعة جداً، أسلوب تعامل راقي من أروع الأطباء. النتيجة كانت مذهلة والعيادة مجهزة بأحدث الأجهزة!',rating:5 },
  { name:'سارة خ.',text:'تجربة ممتازة مع الدكتورة دانيا. زراعة الأسنان كانت بدون أي ألم والنتيجة طبيعية جداً. أنصح الجميع بزيارتها.',rating:5 },
  { name:'محمد ع.',text:'أنصح الجميع بزيارة العيادة. الدكتورة محترفة والعيادة نظيفة ومجهزة. تعامل راقي ونتائج مبهرة.',rating:5 },
];
const ST = {
  confirmed:{l:'مؤكد',bg:'#dcfce7',c:'#166534'},
  pending:{l:'قيد الانتظار',bg:'#fef3c7',c:'#92400e'},
  cancelled:{l:'ملغى',bg:'#fecaca',c:'#991b1b'},
  completed:{l:'مكتمل',bg:'#ede9fe',c:'#5b21b6'},
};
const P = '#0f766e', PL = '#e6f5f3', PD = '#064e3b', AC = '#c8a960', ACL = '#fdf8ed',
  DK = '#111827', DM = '#374151', GR = '#6b7280', GL = '#f3f4f6', GB = '#e5e7eb',
  WH = '#ffffff', LT = '#f8faf9';

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function DentalApp() {
  const [page, setPage] = useState('home');
  const [admin, setAdmin] = useState(false);
  const [appts, setAppts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bk, setBk] = useState({ name:'',phone:'',service:'',date:'',time:'' });
  const [bkOk, setBkOk] = useState(false);
  const [bkLoading, setBkLoading] = useState(false);
  const [aTab, setATab] = useState('overview');
  const [login, setLogin] = useState({ user:'',pass:'' });
  const [loginErr, setLoginErr] = useState('');

  // Fetch appointments from Supabase via API
  const fetchAppts = async () => {
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setAppts(data);
      }
    } catch (e) {
      console.error('Error fetching appointments:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppts(); }, []);

  const doBook = async () => {
    if (!bk.name||!bk.phone||!bk.service||!bk.date||!bk.time) return;
    setBkLoading(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bk),
      });
      if (res.ok) {
        const newAppt = await res.json();
        setAppts(prev => [...prev, newAppt]);
        setBkOk(true);
        setTimeout(() => { setBkOk(false); setBk({ name:'',phone:'',service:'',date:'',time:'' }); }, 3000);
      }
    } catch (e) {
      console.error('Booking error:', e);
    } finally {
      setBkLoading(false);
    }
  };

  const updStatus = async (id, status) => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setAppts(prev => prev.map(a => a.id === updated.id ? updated : a));
      }
    } catch (e) {
      console.error('Update error:', e);
    }
  };

  const doLogin = () => {
    if (login.user==='admin'&&login.pass==='admin123') { setAdmin(true); setLoginErr(''); }
    else setLoginErr('اسم المستخدم أو كلمة المرور غير صحيحة');
  };

  if (admin) return <Admin appts={appts} updStatus={updStatus} tab={aTab} setTab={setATab} logout={()=>setAdmin(false)} />;

  return (
    <div style={{ fontFamily:"'Tajawal',sans-serif",direction:'rtl',background:LT,minHeight:'100vh' }}>
      <Nav page={page} setPage={setPage}/>
      <div style={{ paddingTop:72 }}>
        {page==='home'&&<Home nav={setPage}/>}
        {page==='services'&&<Services nav={setPage}/>}
        {page==='booking'&&<Booking bk={bk} setBk={setBk} doBook={doBook} ok={bkOk} appts={appts} loading={bkLoading}/>}
        {page==='about'&&<About/>}
        {page==='login'&&<Login login={login} setLogin={setLogin} doLogin={doLogin} err={loginErr}/>}
      </div>
      <Footer/>
    </div>
  );
}

// ═══════════════════════════════════════════
// NAV
// ═══════════════════════════════════════════
function Nav({page,setPage}){
  const [open,setOpen]=useState(false);
  return(
    <nav style={{position:'fixed',top:0,left:0,right:0,zIndex:1000,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(20px)',borderBottom:`1px solid ${GB}`}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:72}}>
        <div style={{display:'flex',alignItems:'center',gap:12,cursor:'pointer'}} onClick={()=>setPage('home')}>
          <div style={{width:46,height:46,borderRadius:13,background:`linear-gradient(135deg,${P},${PD})`,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span style={{fontSize:24}}>🦷</span>
          </div>
          <div>
            <div style={{fontSize:17,fontWeight:800,color:DK,lineHeight:1.2}}>د. دانيا عوض</div>
            <div style={{fontSize:10,color:AC,fontWeight:700,letterSpacing:2}}>DENTAL & IMPLANT CLINIC</div>
          </div>
        </div>
        {/* Mobile menu button */}
        <button onClick={()=>setOpen(!open)} style={{display:'none',background:'none',border:'none',fontSize:24,cursor:'pointer'}} className="mobile-menu-btn">☰</button>
        <div style={{display:'flex',alignItems:'center',gap:6}}>
          {[{k:'home',l:'الرئيسية'},{k:'services',l:'الخدمات'},{k:'booking',l:'حجز موعد'},{k:'about',l:'عن الدكتورة'}].map(i=>(
            <button key={i.k} onClick={()=>setPage(i.k)} style={{padding:'8px 18px',border:'none',borderRadius:8,cursor:'pointer',fontSize:14,fontWeight:600,fontFamily:"'Tajawal',sans-serif",background:page===i.k?PL:'transparent',color:page===i.k?P:GR,transition:'all .2s'}}>{i.l}</button>
          ))}
          <button onClick={()=>setPage('login')} style={{padding:'9px 20px',border:`2px solid ${P}`,borderRadius:10,cursor:'pointer',fontSize:13,fontWeight:700,fontFamily:"'Tajawal',sans-serif",background:'transparent',color:P,marginRight:8}}>لوحة التحكم</button>
        </div>
      </div>
    </nav>
  );
}

// ═══════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════
function Home({nav}){
  return(
    <>
      {/* Hero */}
      <section style={{minHeight:'92vh',position:'relative',overflow:'hidden',background:`linear-gradient(135deg,${DK} 0%,#0c2f2a 40%,${PD} 70%,${P} 100%)`,display:'flex',alignItems:'center'}}>
        <div style={{position:'absolute',top:-120,left:-80,width:400,height:400,borderRadius:'50%',background:`${AC}08`,filter:'blur(80px)'}}/>
        <div style={{position:'absolute',bottom:-60,right:-60,width:350,height:350,borderRadius:'50%',background:`${P}15`,filter:'blur(60px)'}}/>
        <div style={{position:'absolute',top:'15%',right:'8%',width:220,height:220,borderRadius:'50%',border:`1px solid ${AC}15`}} className="animate-float"/>

        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 24px',position:'relative',zIndex:2,width:'100%',display:'grid',gridTemplateColumns:'1fr 1fr',alignItems:'center',gap:60}}>
          <div className="animate-fade-up">
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:`${AC}18`,borderRadius:100,padding:'8px 22px',marginBottom:28}}>
              <span style={{fontSize:14}}>⭐</span>
              <span style={{color:AC,fontSize:14,fontWeight:600}}>+12 عام من الخبرة المتميزة</span>
            </div>
            <h1 style={{fontSize:54,fontWeight:900,color:'white',lineHeight:1.3,marginBottom:22}}>
              ابتسامة <span style={{color:AC}}>مثالية</span><br/>تبدأ من هنا
            </h1>
            <p style={{fontSize:18,color:'#9dbbb5',lineHeight:2,marginBottom:40,maxWidth:500}}>
              مع الدكتورة دانيا عوض، أخصائية طب الأسنان التجميلي والزراعة والتركيبات. نقدم لك أعلى معايير الرعاية في بيئة مريحة وآمنة
            </p>
            <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
              <button onClick={()=>nav('booking')} style={{padding:'17px 44px',borderRadius:14,border:'none',cursor:'pointer',background:`linear-gradient(135deg,${AC},#d4b76a)`,color:DK,fontSize:17,fontWeight:800,fontFamily:"'Tajawal',sans-serif",boxShadow:`0 8px 32px ${AC}35`}}>
                احجز موعدك الآن ←
              </button>
              <button onClick={()=>nav('services')} style={{padding:'17px 36px',borderRadius:14,cursor:'pointer',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.15)',color:'white',fontSize:16,fontWeight:600,fontFamily:"'Tajawal',sans-serif",backdropFilter:'blur(10px)'}}>
                اكتشف خدماتنا
              </button>
            </div>
            <div style={{display:'flex',gap:48,marginTop:52}}>
              {[{n:'+2000',l:'مريض سعيد'},{n:'+12',l:'سنة خبرة'},{n:'98%',l:'نسبة رضا'}].map((s,i)=>(
                <div key={i}><div style={{fontSize:30,fontWeight:900,color:AC}}>{s.n}</div><div style={{fontSize:13,color:'#7da39c',fontWeight:500}}>{s.l}</div></div>
              ))}
            </div>
          </div>
          <div className="animate-fade-up" style={{position:'relative'}}>
            <div style={{width:'100%',aspectRatio:'4/5',borderRadius:28,overflow:'hidden',position:'relative',background:`linear-gradient(160deg,${P}20,${PD},${P})`,boxShadow:'0 30px 80px rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:20}}>
              <div style={{position:'absolute',inset:0,opacity:0.05}}>
                {Array.from({length:12}).map((_,i)=>(
                  <div key={i} style={{position:'absolute',top:`${10+Math.random()*80}%`,left:`${10+Math.random()*80}%`,width:60+Math.random()*80,height:60+Math.random()*80,borderRadius:'50%',border:'1px solid white'}}/>
                ))}
              </div>
              <span style={{fontSize:120,filter:'drop-shadow(0 8px 24px rgba(0,0,0,0.3))',position:'relative',zIndex:2}}>🦷</span>
              <div style={{color:'white',fontSize:22,fontWeight:800,textAlign:'center',padding:'0 30px'}}>عيادة متخصصة في<br/>طب الأسنان التجميلي والزراعة</div>
              <div style={{display:'flex',gap:12,marginTop:10}}>
                {['🦷','✨','👑','😁'].map((e,i)=>(
                  <div key={i} style={{width:48,height:48,borderRadius:14,background:'rgba(255,255,255,0.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.1)'}}>{e}</div>
                ))}
              </div>
            </div>
            <div style={{position:'absolute',bottom:40,right:-24,background:'rgba(255,255,255,0.97)',backdropFilter:'blur(20px)',borderRadius:18,padding:'18px 26px',boxShadow:'0 20px 50px rgba(0,0,0,0.15)'}} className="animate-float">
              <div style={{display:'flex',alignItems:'center',gap:14}}>
                <div style={{width:48,height:48,borderRadius:14,background:PL,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22}}>🏆</div>
                <div><div style={{fontSize:15,fontWeight:800,color:DK}}>البورد الأردني</div><div style={{fontSize:12,color:GR}}>معالجة تحفظية وتجميل</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section style={{padding:'100px 24px',background:WH}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:60}}>
            <span style={{display:'inline-block',fontSize:13,fontWeight:700,color:P,background:PL,padding:'8px 22px',borderRadius:100,marginBottom:16}}>خدماتنا المتميزة</span>
            <h2 style={{fontSize:40,fontWeight:900,color:DK,marginBottom:12}}>رعاية شاملة <span style={{color:P}}>لابتسامتك</span></h2>
            <p style={{color:GR,fontSize:16,maxWidth:520,margin:'0 auto',lineHeight:1.8}}>نقدم مجموعة متكاملة من خدمات طب الأسنان بأحدث التقنيات</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:24}}>
            {SERVICES.map((s)=>(
              <div key={s.id} style={{borderRadius:22,overflow:'hidden',background:WH,border:`1px solid ${GB}`,transition:'all .35s',cursor:'pointer'}}
                onMouseOver={e=>{e.currentTarget.style.transform='translateY(-8px)';e.currentTarget.style.boxShadow=`0 20px 50px ${P}10`}}
                onMouseOut={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none'}}>
                <div style={{height:200,background:s.grad,position:'relative',overflow:'hidden',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <div style={{position:'absolute',top:-30,right:-30,width:120,height:120,borderRadius:'50%',background:'rgba(255,255,255,0.1)'}}/>
                  <div style={{position:'absolute',bottom:-20,left:-20,width:80,height:80,borderRadius:'50%',background:'rgba(255,255,255,0.08)'}}/>
                  <span style={{fontSize:64,filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',position:'relative',zIndex:2}}>{s.icon}</span>
                </div>
                <div style={{padding:24}}>
                  <h3 style={{fontSize:20,fontWeight:800,color:DK,marginBottom:4}}>{s.title}</h3>
                  <p style={{fontSize:11,color:P,fontWeight:600,letterSpacing:1,marginBottom:10}}>{s.titleEn}</p>
                  <p style={{fontSize:14,color:GR,lineHeight:1.9,marginBottom:16}}>{s.desc}</p>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <span style={{fontSize:16,fontWeight:800,color:P}}>{s.price}</span>
                    <span style={{fontSize:12,color:GR,background:GL,padding:'5px 14px',borderRadius:8,fontWeight:600}}>⏱ {s.dur}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{padding:'80px 24px',background:PL}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <span style={{display:'inline-block',fontSize:13,fontWeight:700,color:P,background:WH,padding:'8px 22px',borderRadius:100,marginBottom:16}}>آراء مرضانا</span>
            <h2 style={{fontSize:36,fontWeight:900,color:DK}}>ماذا يقول مرضانا عنا</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gap:24}}>
            {REVIEWS.map((r,i)=>(
              <div key={i} style={{background:WH,borderRadius:22,padding:32,boxShadow:'0 4px 20px rgba(0,0,0,0.03)',border:`1px solid ${GB}`,transition:'transform .3s'}}
                onMouseOver={e=>e.currentTarget.style.transform='translateY(-4px)'}
                onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{display:'flex',gap:3,marginBottom:16}}>
                  {Array.from({length:r.rating}).map((_,j)=><span key={j} style={{fontSize:20,color:'#facc15'}}>★</span>)}
                </div>
                <p style={{fontSize:15,color:DM,lineHeight:2,marginBottom:20}}>"{r.text}"</p>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:42,height:42,borderRadius:12,background:`linear-gradient(135deg,${P},${PD})`,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:17}}>{r.name[0]}</div>
                  <span style={{fontWeight:700,color:DK,fontSize:15}}>{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section style={{padding:'80px 24px',background:WH}}>
        <div style={{maxWidth:1000,margin:'0 auto',textAlign:'center'}}>
          <h2 style={{fontSize:36,fontWeight:900,color:DK,marginBottom:48}}>لماذا <span style={{color:P}}>تختارنا؟</span></h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:28}}>
            {[{icon:'🎓',title:'خبرة أكاديمية',desc:'محاضر في الجامعة الأردنية'},{icon:'🏅',title:'البورد الأردني',desc:'شهادة اختصاص عليا معتمدة'},{icon:'⚡',title:'تقنيات حديثة',desc:'أحدث أجهزة طب الأسنان'},{icon:'💎',title:'جودة عالية',desc:'مواد عالمية بمعايير دولية'}].map((w,i)=>(
              <div key={i} style={{padding:32,borderRadius:20,background:LT,border:`1px solid ${GB}`,transition:'all .3s'}}
                onMouseOver={e=>{e.currentTarget.style.borderColor=P;e.currentTarget.style.background=PL}}
                onMouseOut={e=>{e.currentTarget.style.borderColor=GB;e.currentTarget.style.background=LT}}>
                <div style={{fontSize:40,marginBottom:16}}>{w.icon}</div>
                <h4 style={{fontSize:17,fontWeight:800,color:DK,marginBottom:8}}>{w.title}</h4>
                <p style={{fontSize:14,color:GR,lineHeight:1.7}}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'80px 24px',textAlign:'center',background:`linear-gradient(135deg,${P},${PD})`,position:'relative',overflow:'hidden'}}>
        <div style={{maxWidth:600,margin:'0 auto',position:'relative',zIndex:2}}>
          <span style={{fontSize:60}}>😁</span>
          <h2 style={{fontSize:38,fontWeight:900,color:'white',marginBottom:16,marginTop:20}}>جاهز لابتسامة أجمل؟</h2>
          <p style={{fontSize:17,color:'#a0d4c8',marginBottom:36,lineHeight:1.9}}>احجز موعدك الآن واحصل على استشارة مع الدكتورة دانيا</p>
          <button onClick={()=>nav('booking')} style={{padding:'17px 52px',borderRadius:14,border:'none',cursor:'pointer',background:`linear-gradient(135deg,${AC},#d4b76a)`,color:DK,fontSize:18,fontWeight:800,fontFamily:"'Tajawal',sans-serif",boxShadow:'0 8px 30px rgba(0,0,0,0.2)'}}>
            احجز موعدك الآن
          </button>
        </div>
      </section>
    </>
  );
}

// ═══════════════════════════════════════════
// SERVICES PAGE
// ═══════════════════════════════════════════
function Services({nav}){
  return(
    <section style={{padding:'60px 24px 100px',background:LT}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:60}}>
          <h1 style={{fontSize:44,fontWeight:900,color:DK,marginBottom:14}}>خدماتنا <span style={{color:P}}>المتخصصة</span></h1>
          <p style={{color:GR,fontSize:16,maxWidth:560,margin:'0 auto',lineHeight:1.9}}>نقدم مجموعة شاملة من خدمات طب الأسنان المتقدمة بأعلى المعايير</p>
        </div>
        {SERVICES.map((s,i)=>(
          <div key={s.id} style={{display:'grid',gridTemplateColumns:i%2===0?'1fr 1.2fr':'1.2fr 1fr',gap:0,marginBottom:28,background:WH,borderRadius:24,overflow:'hidden',border:`1px solid ${GB}`}}>
            {i%2===1&&<SvcDetail s={s} nav={nav}/>}
            <div style={{minHeight:300,background:s.grad,display:'flex',alignItems:'center',justifyContent:'center',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',inset:0,opacity:0.08}}>
                {Array.from({length:6}).map((_,j)=>(<div key={j} style={{position:'absolute',top:`${Math.random()*80}%`,left:`${Math.random()*80}%`,width:50+Math.random()*60,height:50+Math.random()*60,borderRadius:'50%',border:'1px solid white'}}/>))}
              </div>
              <span style={{fontSize:90,filter:'drop-shadow(0 6px 20px rgba(0,0,0,0.2))',position:'relative',zIndex:2}}>{s.icon}</span>
            </div>
            {i%2===0&&<SvcDetail s={s} nav={nav}/>}
          </div>
        ))}
      </div>
    </section>
  );
}

function SvcDetail({s,nav}){
  return(
    <div style={{padding:48}}>
      <span style={{fontSize:42,display:'block',marginBottom:14}}>{s.icon}</span>
      <h3 style={{fontSize:30,fontWeight:800,color:DK,marginBottom:6}}>{s.title}</h3>
      <p style={{fontSize:12,fontWeight:700,color:P,marginBottom:18,letterSpacing:1.5}}>{s.titleEn}</p>
      <p style={{fontSize:16,color:GR,lineHeight:2,marginBottom:28}}>{s.desc}</p>
      <div style={{display:'flex',gap:16,marginBottom:28}}>
        <div style={{background:PL,padding:'12px 22px',borderRadius:12}}><div style={{fontSize:17,fontWeight:800,color:P}}>{s.price}</div></div>
        <div style={{background:ACL,padding:'12px 22px',borderRadius:12}}><div style={{fontSize:17,fontWeight:800,color:AC}}>⏱ {s.dur}</div></div>
      </div>
      <button onClick={()=>nav('booking')} style={{padding:'13px 36px',borderRadius:12,border:'none',cursor:'pointer',background:`linear-gradient(135deg,${P},${PD})`,color:'white',fontSize:15,fontWeight:700,fontFamily:"'Tajawal',sans-serif",boxShadow:`0 6px 20px ${P}25`}}>احجز هذه الخدمة</button>
    </div>
  );
}

// ═══════════════════════════════════════════
// BOOKING PAGE
// ═══════════════════════════════════════════
function Booking({bk,setBk,doBook,ok,appts,loading}){
  const booked=appts.filter(a=>a.date===bk.date&&a.status!=='cancelled').map(a=>a.time);
  const ready=bk.name&&bk.phone&&bk.service&&bk.date&&bk.time;
  return(
    <section style={{padding:'60px 24px 100px',background:LT}}>
      <div style={{maxWidth:800,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <h1 style={{fontSize:40,fontWeight:900,color:DK,marginBottom:12}}>احجز <span style={{color:P}}>موعدك</span></h1>
          <p style={{color:GR,fontSize:15}}>اختر الخدمة والوقت المناسب لك</p>
        </div>
        {ok&&(
          <div style={{background:'#ecfdf5',border:'1px solid #6ee7b740',borderRadius:18,padding:28,marginBottom:24,textAlign:'center'}} className="animate-fade-up">
            <span style={{fontSize:44,display:'block',marginBottom:8}}>✅</span>
            <h3 style={{color:'#10b981',fontWeight:800,fontSize:22,marginBottom:6}}>تم الحجز بنجاح!</h3>
            <p style={{color:'#065f46',fontSize:14}}>سنتواصل معك قريباً لتأكيد الموعد</p>
          </div>
        )}
        <div style={{background:WH,borderRadius:26,padding:44,border:`1px solid ${GB}`,boxShadow:'0 4px 24px rgba(0,0,0,0.03)'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:24}}>
            <Inp label="الاسم الكامل" ph="أدخل اسمك" val={bk.name} set={v=>setBk({...bk,name:v})}/>
            <Inp label="رقم الهاتف" ph="07XXXXXXXX" val={bk.phone} set={v=>setBk({...bk,phone:v})}/>
          </div>
          <div style={{marginBottom:24}}>
            <label style={{display:'block',fontSize:14,fontWeight:700,color:DK,marginBottom:10}}>الخدمة المطلوبة</label>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
              {SERVICES.map(s=>(
                <button key={s.id} onClick={()=>setBk({...bk,service:s.title})} style={{padding:'14px 10px',borderRadius:14,cursor:'pointer',border:bk.service===s.title?`2px solid ${P}`:`1px solid ${GB}`,background:bk.service===s.title?PL:WH,fontSize:13,fontWeight:700,color:bk.service===s.title?P:DM,fontFamily:"'Tajawal',sans-serif",display:'flex',alignItems:'center',gap:8,justifyContent:'center',transition:'all .2s'}}>
                  <span>{s.icon}</span>{s.title}
                </button>
              ))}
            </div>
          </div>
          <div style={{marginBottom:24}}>
            <label style={{display:'block',fontSize:14,fontWeight:700,color:DK,marginBottom:10}}>التاريخ</label>
            <input type="date" value={bk.date} onChange={e=>setBk({...bk,date:e.target.value,time:''})} style={{width:'100%',padding:'14px 16px',borderRadius:14,border:`1px solid ${GB}`,fontSize:15,fontFamily:"'Tajawal',sans-serif",outline:'none',background:LT}}/>
          </div>
          {bk.date&&(
            <div style={{marginBottom:32}}>
              <label style={{display:'block',fontSize:14,fontWeight:700,color:DK,marginBottom:10}}>الوقت المتاح</label>
              <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8}}>
                {SLOTS.map(t=>{
                  const bkd=booked.includes(t);const sel=bk.time===t;
                  return(<button key={t} disabled={bkd} onClick={()=>setBk({...bk,time:t})} style={{padding:'11px 8px',borderRadius:10,cursor:bkd?'not-allowed':'pointer',border:sel?`2px solid ${P}`:`1px solid ${bkd?'#fecaca':GB}`,background:bkd?'#fef2f2':sel?PL:WH,color:bkd?'#fca5a5':sel?P:DM,fontSize:14,fontWeight:700,fontFamily:"'Tajawal',sans-serif",textDecoration:bkd?'line-through':'none',opacity:bkd?0.5:1,transition:'all .2s'}}>{t}</button>);
                })}
              </div>
            </div>
          )}
          <button onClick={doBook} disabled={!ready||loading} style={{width:'100%',padding:'17px',borderRadius:14,border:'none',cursor:ready?'pointer':'default',background:ready?`linear-gradient(135deg,${P},${PD})`:GL,color:ready?'white':GR,fontSize:18,fontWeight:800,fontFamily:"'Tajawal',sans-serif",boxShadow:ready?`0 8px 24px ${P}18`:'none',transition:'all .3s',opacity:loading?0.7:1}}>
            {loading?'جاري الحجز...':'تأكيد الحجز'}
          </button>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// ABOUT PAGE
// ═══════════════════════════════════════════
function About(){
  return(
    <section style={{padding:'60px 24px 100px',background:LT}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1.5fr',gap:48,background:WH,borderRadius:28,padding:48,border:`1px solid ${GB}`}}>
          <div>
            <div style={{aspectRatio:'3/4',borderRadius:22,overflow:'hidden',background:`linear-gradient(160deg,${PL},${P},${PD})`,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16}}>
              <div style={{width:120,height:120,borderRadius:'50%',background:'rgba(255,255,255,0.15)',display:'flex',alignItems:'center',justifyContent:'center',border:'3px solid rgba(255,255,255,0.3)'}}>
                <span style={{fontSize:52}}>👩‍⚕️</span>
              </div>
              <div style={{color:'white',fontSize:22,fontWeight:800,textAlign:'center'}}>د. دانيا عوض</div>
              <div style={{color:'rgba(255,255,255,0.7)',fontSize:13,textAlign:'center',padding:'0 20px'}}>أخصائية طب الأسنان التجميلي والزراعة</div>
            </div>
            <div style={{marginTop:20,background:PL,borderRadius:18,padding:22}}>
              <h4 style={{fontSize:15,fontWeight:700,color:P,marginBottom:14}}>معلومات التواصل</h4>
              <div style={{display:'flex',flexDirection:'column',gap:12,fontSize:13,color:DM}}>
                <span>📍 الدوار السابع، بناية نصار (1) مقابل العابدين</span>
                <span>📞 0776565200</span>
                <span>🕒 السبت - الخميس: 9:00 ص - 6:00 م</span>
              </div>
            </div>
          </div>
          <div>
            <span style={{display:'inline-block',fontSize:12,fontWeight:700,color:AC,background:ACL,padding:'6px 18px',borderRadius:100,marginBottom:18}}>تعرف على الدكتورة</span>
            <h1 style={{fontSize:38,fontWeight:900,color:DK,marginBottom:8}}>د. دانيا عوض</h1>
            <p style={{fontSize:14,color:P,fontWeight:700,marginBottom:24}}>أخصائية العلاج التحفظي والتركيبات والزراعة وتجميل الأسنان</p>
            <p style={{fontSize:15,color:GR,lineHeight:2.1,marginBottom:30}}>
              الدكتورة دانيا عوض هي أخصائية متميزة في طب الأسنان مع خبرة تزيد عن 12 عاماً في مجالات العلاج التحفظي والتركيبات وزراعة الأسنان والتجميل. تعمل حالياً في عيادتها الخاصة في منطقة الدوار السابع بعمّان، وتشغل منصب محاضر بدوام جزئي في الجامعة الأردنية.
            </p>
            <h3 style={{fontSize:19,fontWeight:800,color:DK,marginBottom:18}}>المؤهلات العلمية</h3>
            <div style={{display:'flex',flexDirection:'column',gap:14,marginBottom:30}}>
              {['بكالوريوس طب وجراحة الفم والأسنان - الجامعة الأردنية','شهادة الاختصاص العالي في العلاج التحفظي - الخدمات الطبية الملكية','شهادة البورد الأردني في العلاج التحفظي والتجميل والتركيبات والزراعة','محاضر بدوام جزئي في الجامعة الأردنية'].map((q,i)=>(
                <div key={i} style={{display:'flex',alignItems:'start',gap:12}}>
                  <span style={{width:26,height:26,borderRadius:8,background:PL,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,color:P,flexShrink:0,marginTop:2}}>✓</span>
                  <span style={{fontSize:14,color:DM,lineHeight:1.8}}>{q}</span>
                </div>
              ))}
            </div>
            <h3 style={{fontSize:19,fontWeight:800,color:DK,marginBottom:16}}>التخصصات</h3>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {['زراعة الأسنان','تجميل الأسنان','التركيبات','العلاج التحفظي','هوليوود سمايل','البوتكس','تبييض الأسنان'].map(s=>(
                <span key={s} style={{padding:'9px 18px',borderRadius:10,fontSize:13,fontWeight:700,background:PL,color:P}}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════
function Login({login,setLogin,doLogin,err}){
  return(
    <section style={{minHeight:'85vh',display:'flex',alignItems:'center',justifyContent:'center',background:`linear-gradient(135deg,${DK},${PD})`,padding:24}}>
      <div style={{width:420,background:WH,borderRadius:28,padding:48,boxShadow:'0 30px 60px rgba(0,0,0,0.2)'}}>
        <div style={{textAlign:'center',marginBottom:36}}>
          <div style={{width:68,height:68,borderRadius:20,margin:'0 auto 16',background:`linear-gradient(135deg,${P},${PD})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:32}}>🔒</div>
          <h2 style={{fontSize:26,fontWeight:900,color:DK,marginBottom:6}}>لوحة التحكم</h2>
          <p style={{fontSize:14,color:GR}}>سجل الدخول للوصول إلى لوحة الإدارة</p>
        </div>
        {err&&<div style={{background:'#fef2f2',border:'1px solid #fecaca',borderRadius:14,padding:'14px 18px',marginBottom:20,textAlign:'center',color:'#ef4444',fontSize:14,fontWeight:600}}>{err}</div>}
        <Inp label="اسم المستخدم" ph="admin" val={login.user} set={v=>setLogin({...login,user:v})}/>
        <div style={{marginTop:16}}><Inp label="كلمة المرور" ph="••••••••" type="password" val={login.pass} set={v=>setLogin({...login,pass:v})}/></div>
        <button onClick={doLogin} style={{width:'100%',padding:'17px',borderRadius:14,border:'none',cursor:'pointer',background:`linear-gradient(135deg,${P},${PD})`,color:'white',fontSize:17,fontWeight:800,fontFamily:"'Tajawal',sans-serif",marginTop:24}}>تسجيل الدخول</button>
        <p style={{textAlign:'center',fontSize:12,color:GR,marginTop:20}}>اسم المستخدم: admin | كلمة المرور: admin123</p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
// ADMIN DASHBOARD
// ═══════════════════════════════════════════
function Admin({appts,updStatus,tab,setTab,logout}){
  const today=new Date().toISOString().split('T')[0];
  const stats={
    total:appts.length,
    confirmed:appts.filter(a=>a.status==='confirmed').length,
    pending:appts.filter(a=>a.status==='pending').length,
    cancelled:appts.filter(a=>a.status==='cancelled').length,
    completed:appts.filter(a=>a.status==='completed').length,
    todayCount:appts.filter(a=>a.date===today).length,
  };
  const svcStats=SERVICES.map(s=>({name:s.title,count:appts.filter(a=>a.service===s.title).length})).sort((a,b)=>b.count-a.count);
  const sides=[{k:'overview',i:'📊',l:'نظرة عامة'},{k:'appointments',i:'📋',l:'المواعيد'},{k:'calendar',i:'📅',l:'التقويم'},{k:'patients',i:'👥',l:'المرضى'}];

  return(
    <div style={{display:'flex',minHeight:'100vh',direction:'rtl',fontFamily:"'Tajawal',sans-serif"}}>
      <div style={{width:260,background:DK,padding:'24px 16px',display:'flex',flexDirection:'column',position:'fixed',top:0,right:0,bottom:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:40,padding:'0 8px'}}>
          <span style={{fontSize:26}}>🦷</span>
          <div><div style={{fontSize:16,fontWeight:800,color:'white'}}>لوحة التحكم</div><div style={{fontSize:11,color:AC}}>د. دانيا عوض</div></div>
        </div>
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:4}}>
          {sides.map(s=>(
            <button key={s.k} onClick={()=>setTab(s.k)} style={{display:'flex',alignItems:'center',gap:12,padding:'13px 16px',borderRadius:12,border:'none',cursor:'pointer',background:tab===s.k?`${P}30`:'transparent',color:tab===s.k?AC:'#9ca3af',fontSize:14,fontWeight:600,fontFamily:"'Tajawal',sans-serif",width:'100%',textAlign:'right',transition:'all .2s'}}>
              <span style={{fontSize:18}}>{s.i}</span>{s.l}
            </button>
          ))}
        </div>
        <button onClick={logout} style={{display:'flex',alignItems:'center',gap:10,padding:'13px 16px',borderRadius:12,border:'1px solid #374151',cursor:'pointer',background:'transparent',color:'#ef4444',fontSize:14,fontWeight:600,fontFamily:"'Tajawal',sans-serif",width:'100%'}}>
          <span>🚪</span>تسجيل الخروج
        </button>
      </div>
      <div style={{flex:1,marginRight:260,background:GL,minHeight:'100vh'}}>
        <div style={{padding:'16px 32px',background:WH,borderBottom:`1px solid ${GB}`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div>
            <h2 style={{fontSize:22,fontWeight:800,color:DK}}>{sides.find(s=>s.k===tab)?.l}</h2>
            <p style={{fontSize:13,color:GR}}>اليوم: {new Date().toLocaleDateString('ar-JO',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:40,height:40,borderRadius:12,background:`linear-gradient(135deg,${P},${PD})`,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700}}>د</div>
            <span style={{fontWeight:700,color:DK,fontSize:14}}>د. دانيا عوض</span>
          </div>
        </div>
        <div style={{padding:32}}>
          {tab==='overview'&&<Overview stats={stats} svcStats={svcStats} appts={appts}/>}
          {tab==='appointments'&&<Appointments appts={appts} updStatus={updStatus}/>}
          {tab==='calendar'&&<Calendar appts={appts}/>}
          {tab==='patients'&&<Patients appts={appts}/>}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// ADMIN TABS
// ═══════════════════════════════════════════
function Overview({stats,svcStats,appts}){
  const cards=[
    {l:'إجمالي المواعيد',v:stats.total,i:'📊',c:P,bg:PL},
    {l:'مواعيد اليوم',v:stats.todayCount,i:'📅',c:'#3b82f6',bg:'#eff6ff'},
    {l:'مؤكدة',v:stats.confirmed,i:'✅',c:'#10b981',bg:'#ecfdf5'},
    {l:'قيد الانتظار',v:stats.pending,i:'⏳',c:'#f59e0b',bg:'#fffbeb'},
    {l:'مكتملة',v:stats.completed,i:'🏆',c:'#8b5cf6',bg:'#f5f3ff'},
    {l:'ملغاة',v:stats.cancelled,i:'❌',c:'#ef4444',bg:'#fef2f2'},
  ];
  const mx=Math.max(...svcStats.map(s=>s.count),1);
  return(
    <div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20,marginBottom:28}}>
        {cards.map((c,i)=>(
          <div key={i} style={{background:WH,borderRadius:18,padding:24,border:`1px solid ${GB}`,transition:'transform .2s'}} onMouseOver={e=>e.currentTarget.style.transform='translateY(-3px)'} onMouseOut={e=>e.currentTarget.style.transform='translateY(0)'}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'start'}}>
              <div><div style={{fontSize:13,color:GR,fontWeight:600,marginBottom:8}}>{c.l}</div><div style={{fontSize:38,fontWeight:900,color:c.c}}>{c.v}</div></div>
              <div style={{width:50,height:50,borderRadius:14,background:c.bg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:24}}>{c.i}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1.5fr 1fr',gap:20}}>
        <div style={{background:WH,borderRadius:18,padding:28,border:`1px solid ${GB}`}}>
          <h3 style={{fontSize:17,fontWeight:800,color:DK,marginBottom:24}}>📊 المواعيد حسب الخدمة</h3>
          {svcStats.map((s,i)=>(
            <div key={i} style={{marginBottom:18}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                <span style={{fontSize:13,fontWeight:600,color:DM}}>{s.name}</span>
                <span style={{fontSize:14,fontWeight:800,color:P}}>{s.count}</span>
              </div>
              <div style={{height:12,background:GL,borderRadius:6,overflow:'hidden'}}>
                <div style={{height:'100%',borderRadius:6,background:`linear-gradient(90deg,${P},${AC})`,width:`${(s.count/mx)*100}%`,transition:'width 1s'}}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:WH,borderRadius:18,padding:28,border:`1px solid ${GB}`}}>
          <h3 style={{fontSize:17,fontWeight:800,color:DK,marginBottom:24}}>📈 حالة المواعيد</h3>
          <Donut stats={stats}/>
        </div>
      </div>
      <div style={{background:WH,borderRadius:18,padding:28,border:`1px solid ${GB}`,marginTop:20}}>
        <h3 style={{fontSize:17,fontWeight:800,color:DK,marginBottom:20}}>🕐 آخر المواعيد</h3>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr>{['المريض','الخدمة','التاريخ','الوقت','الحالة'].map(h=><th key={h} style={{padding:'12px 16px',textAlign:'right',fontSize:12,fontWeight:700,color:GR,borderBottom:`1px solid ${GB}`,background:GL}}>{h}</th>)}</tr></thead>
          <tbody>{appts.slice(-5).reverse().map(a=>(
            <tr key={a.id} style={{borderBottom:`1px solid ${GB}`}}>
              <td style={{padding:'14px 16px',fontSize:14,fontWeight:700,color:DK}}>{a.name}</td>
              <td style={{padding:'14px 16px',fontSize:13,color:DM}}>{a.service}</td>
              <td style={{padding:'14px 16px',fontSize:13,color:DM}}>{a.date}</td>
              <td style={{padding:'14px 16px',fontSize:13,color:DM}}>{a.time}</td>
              <td style={{padding:'14px 16px'}}><Badge s={a.status}/></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function Donut({stats}){
  const data=[{l:'مؤكدة',v:stats.confirmed,c:'#10b981'},{l:'قيد الانتظار',v:stats.pending,c:'#f59e0b'},{l:'مكتملة',v:stats.completed,c:'#8b5cf6'},{l:'ملغاة',v:stats.cancelled,c:'#ef4444'}].filter(d=>d.v>0);
  const total=data.reduce((s,d)=>s+d.v,0);
  let cum=0;const sz=180,sw=30,r=(sz-sw)/2,circ=2*Math.PI*r;
  return(
    <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
      <svg width={sz} height={sz} style={{transform:'rotate(-90deg)'}}>
        {data.map((d,i)=>{const da=`${(d.v/total)*circ} ${circ}`;const off=-(cum/total)*circ;cum+=d.v;return<circle key={i} cx={sz/2} cy={sz/2} r={r} fill="none" stroke={d.c} strokeWidth={sw} strokeDasharray={da} strokeDashoffset={off} strokeLinecap="round"/>})}
        <text x={sz/2} y={sz/2} textAnchor="middle" dominantBaseline="central" style={{transform:'rotate(90deg)',transformOrigin:'center',fontSize:30,fontWeight:900,fill:DK}}>{total}</text>
      </svg>
      <div style={{display:'flex',flexWrap:'wrap',gap:14,marginTop:20,justifyContent:'center'}}>
        {data.map((d,i)=>(<div key={i} style={{display:'flex',alignItems:'center',gap:6}}><div style={{width:10,height:10,borderRadius:3,background:d.c}}/><span style={{fontSize:12,color:GR}}>{d.l} ({d.v})</span></div>))}
      </div>
    </div>
  );
}

function Appointments({appts,updStatus}){
  const[f,setF]=useState('all');
  const list=f==='all'?appts:appts.filter(a=>a.status===f);
  return(
    <div>
      <div style={{display:'flex',gap:8,marginBottom:20}}>
        {[{k:'all',l:'الكل'},{k:'pending',l:'قيد الانتظار'},{k:'confirmed',l:'مؤكدة'},{k:'completed',l:'مكتملة'},{k:'cancelled',l:'ملغاة'}].map(x=>(
          <button key={x.k} onClick={()=>setF(x.k)} style={{padding:'9px 22px',borderRadius:10,border:'none',cursor:'pointer',background:f===x.k?P:WH,color:f===x.k?'white':DM,fontSize:13,fontWeight:600,fontFamily:"'Tajawal',sans-serif",boxShadow:f===x.k?'none':`0 1px 3px ${GB}`}}>{x.l}</button>
        ))}
      </div>
      <div style={{background:WH,borderRadius:18,overflow:'hidden',border:`1px solid ${GB}`}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead><tr>{['#','المريض','الهاتف','الخدمة','التاريخ','الوقت','الحالة','إجراءات'].map(h=><th key={h} style={{padding:'14px 16px',textAlign:'right',fontSize:12,fontWeight:700,color:GR,background:GL,borderBottom:`1px solid ${GB}`}}>{h}</th>)}</tr></thead>
          <tbody>{list.map(a=>(
            <tr key={a.id} style={{borderBottom:`1px solid ${GB}`}}>
              <td style={{padding:'14px 16px',fontSize:13,color:GR}}>{a.id}</td>
              <td style={{padding:'14px 16px',fontSize:14,fontWeight:700,color:DK}}>{a.name}</td>
              <td style={{padding:'14px 16px',fontSize:13,color:DM,direction:'ltr'}}>{a.phone}</td>
              <td style={{padding:'14px 16px',fontSize:13,color:DM}}>{a.service}</td>
              <td style={{padding:'14px 16px',fontSize:13,color:DM}}>{a.date}</td>
              <td style={{padding:'14px 16px',fontSize:13,color:DM}}>{a.time}</td>
              <td style={{padding:'14px 16px'}}><Badge s={a.status}/></td>
              <td style={{padding:'14px 16px'}}>
                <div style={{display:'flex',gap:6}}>
                  {a.status==='pending'&&<><MBtn c="#10b981" onClick={()=>updStatus(a.id,'confirmed')}>✓ تأكيد</MBtn><MBtn c="#ef4444" onClick={()=>updStatus(a.id,'cancelled')}>✕ إلغاء</MBtn></>}
                  {a.status==='confirmed'&&<MBtn c="#8b5cf6" onClick={()=>updStatus(a.id,'completed')}>🏆 اكتمل</MBtn>}
                </div>
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}

function Calendar({appts}){
  const[mo,setMo]=useState(new Date().getMonth());
  const yr=new Date().getFullYear();
  const mN=['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
  const dN=['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
  const fd=new Date(yr,mo,1).getDay();const dm=new Date(yr,mo+1,0).getDate();
  const cells=[...Array(fd).fill(null),...Array.from({length:dm},(_,i)=>i+1)];
  const todayD=new Date().getDate();const todayM=new Date().getMonth();
  const getA=d=>{if(!d)return[];return appts.filter(a=>a.date===`${yr}-${String(mo+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`)};
  return(
    <div style={{background:WH,borderRadius:18,padding:28,border:`1px solid ${GB}`}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:28}}>
        <h3 style={{fontSize:24,fontWeight:800,color:DK}}>{mN[mo]} {yr}</h3>
        <div style={{display:'flex',gap:8}}>
          <button onClick={()=>setMo(mo>0?mo-1:11)} style={{width:38,height:38,borderRadius:10,border:`1px solid ${GB}`,background:WH,cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>→</button>
          <button onClick={()=>setMo(mo<11?mo+1:0)} style={{width:38,height:38,borderRadius:10,border:`1px solid ${GB}`,background:WH,cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>←</button>
        </div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4,marginBottom:8}}>
        {dN.map(d=><div key={d} style={{textAlign:'center',fontSize:12,fontWeight:700,color:GR,padding:8}}>{d}</div>)}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(7,1fr)',gap:4}}>
        {cells.map((d,i)=>{
          const da=getA(d);const isT=d===todayD&&mo===todayM;
          return(<div key={i} style={{minHeight:95,borderRadius:12,padding:8,background:isT?PL:d?LT:'transparent',border:isT?`2px solid ${P}`:`1px solid ${d?GB:'transparent'}`}}>
            {d&&<><div style={{fontSize:14,fontWeight:isT?800:600,color:isT?P:DM,marginBottom:4}}>{d}</div>
              {da.slice(0,2).map((a,j)=>{
                const stMap={confirmed:'#dcfce7',pending:'#fef3c7',completed:'#ede9fe',cancelled:'#fecaca'};
                const txMap={confirmed:'#166534',pending:'#92400e',completed:'#5b21b6',cancelled:'#991b1b'};
                return<div key={j} style={{fontSize:10,padding:'3px 6px',borderRadius:4,marginBottom:2,background:stMap[a.status]||'#f3f4f6',color:txMap[a.status]||'#374151',fontWeight:600,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{a.time} {a.name}</div>
              })}
              {da.length>2&&<div style={{fontSize:10,color:P,fontWeight:700}}>+{da.length-2} المزيد</div>}
            </>}
          </div>);
        })}
      </div>
      <div style={{display:'flex',gap:20,marginTop:20,justifyContent:'center'}}>
        {[{l:'مؤكد',c:'#dcfce7'},{l:'قيد الانتظار',c:'#fef3c7'},{l:'مكتمل',c:'#ede9fe'},{l:'ملغى',c:'#fecaca'}].map(x=>(<div key={x.l} style={{display:'flex',alignItems:'center',gap:6}}><div style={{width:12,height:12,borderRadius:3,background:x.c}}/><span style={{fontSize:12,color:GR}}>{x.l}</span></div>))}
      </div>
    </div>
  );
}

function Patients({appts}){
  const pts={};
  appts.forEach(a=>{if(!pts[a.phone])pts[a.phone]={name:a.name,phone:a.phone,visits:0,svcs:new Set()};pts[a.phone].visits++;pts[a.phone].svcs.add(a.service)});
  const list=Object.values(pts).sort((a,b)=>b.visits-a.visits);
  return(
    <div style={{background:WH,borderRadius:18,overflow:'hidden',border:`1px solid ${GB}`}}>
      <div style={{padding:'20px 24px',borderBottom:`1px solid ${GB}`}}>
        <h3 style={{fontSize:17,fontWeight:800,color:DK}}>👥 قائمة المرضى ({list.length})</h3>
      </div>
      <table style={{width:'100%',borderCollapse:'collapse'}}>
        <thead><tr>{['المريض','رقم الهاتف','عدد الزيارات','الخدمات'].map(h=><th key={h} style={{padding:'14px 20px',textAlign:'right',fontSize:12,fontWeight:700,color:GR,background:GL}}>{h}</th>)}</tr></thead>
        <tbody>{list.map((p,i)=>(
          <tr key={i} style={{borderBottom:`1px solid ${GB}`}}>
            <td style={{padding:'16px 20px'}}>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div style={{width:40,height:40,borderRadius:12,background:`linear-gradient(135deg,${P},${PD})`,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:16}}>{p.name[0]}</div>
                <span style={{fontWeight:700,fontSize:14,color:DK}}>{p.name}</span>
              </div>
            </td>
            <td style={{padding:'16px 20px',fontSize:13,color:DM,direction:'ltr'}}>{p.phone}</td>
            <td style={{padding:'16px 20px'}}><span style={{background:PL,color:P,padding:'5px 16px',borderRadius:8,fontSize:14,fontWeight:700}}>{p.visits}</span></td>
            <td style={{padding:'16px 20px'}}>
              <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                {Array.from(p.svcs).map(s=><span key={s} style={{fontSize:11,padding:'4px 10px',borderRadius:6,background:GL,color:DM,fontWeight:600}}>{s}</span>)}
              </div>
            </td>
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}

// ═══════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════
function Inp({label,ph,val,set,type='text'}){
  return(
    <div>
      <label style={{display:'block',fontSize:14,fontWeight:700,color:DK,marginBottom:8}}>{label}</label>
      <input type={type} placeholder={ph} value={val} onChange={e=>set(e.target.value)}
        style={{width:'100%',padding:'14px 16px',borderRadius:14,border:`1px solid ${GB}`,fontSize:15,fontFamily:"'Tajawal',sans-serif",outline:'none',background:LT,transition:'border-color .2s'}}
        onFocus={e=>e.target.style.borderColor=P} onBlur={e=>e.target.style.borderColor=GB}/>
    </div>
  );
}

function Badge({s}){
  const x=ST[s]||ST.pending;
  return<span style={{padding:'5px 16px',borderRadius:8,fontSize:12,fontWeight:700,background:x.bg,color:x.c}}>{x.l}</span>;
}

function MBtn({children,c,onClick}){
  return<button onClick={onClick} style={{padding:'6px 14px',borderRadius:8,border:'none',cursor:'pointer',background:`${c}15`,color:c,fontSize:11,fontWeight:700,fontFamily:"'Tajawal',sans-serif",transition:'all .2s'}}
    onMouseOver={e=>e.currentTarget.style.background=`${c}25`} onMouseOut={e=>e.currentTarget.style.background=`${c}15`}>{children}</button>;
}

function Footer(){
  return(
    <footer style={{background:DK,color:'white',padding:'60px 24px 30px',direction:'rtl'}}>
      <div style={{maxWidth:1200,margin:'0 auto'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:40,marginBottom:40}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:16}}>
              <span style={{fontSize:26}}>🦷</span>
              <span style={{fontSize:20,fontWeight:800}}>عيادة د. دانيا عوض</span>
            </div>
            <p style={{color:'#9ca3af',lineHeight:1.9,fontSize:14}}>عيادة متخصصة في طب الأسنان التجميلي والزراعة والعلاج التحفظي مع خبرة تزيد عن 12 عاماً</p>
          </div>
          <div>
            <h4 style={{fontSize:16,fontWeight:700,marginBottom:16,color:AC}}>تواصل معنا</h4>
            <div style={{display:'flex',flexDirection:'column',gap:12,color:'#9ca3af',fontSize:14}}>
              <span>📍 الدوار السابع، بناية نصار (1) مقابل العابدين، الطابق الأول</span>
              <span>📞 0776565200</span>
              <span>🕒 السبت - الخميس: 9:00 صباحاً - 6:00 مساءً</span>
            </div>
          </div>
          <div>
            <h4 style={{fontSize:16,fontWeight:700,marginBottom:16,color:AC}}>خدماتنا</h4>
            <div style={{display:'flex',flexDirection:'column',gap:10,color:'#9ca3af',fontSize:14}}>
              {SERVICES.slice(0,4).map(s=><span key={s.id}>{s.title}</span>)}
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid #374151',paddingTop:20,textAlign:'center',color:'#6b7280',fontSize:13}}>© {new Date().getFullYear()} عيادة د. دانيا عوض. جميع الحقوق محفوظة</div>
      </div>
    </footer>
  );
}
