
/* LEGION_WAVE_25_session_counter */
try{if(!sessionStorage.getItem('lw_p31_clip_fac_session_counter')){sessionStorage.setItem('lw_p31_clip_fac_session_counter','1');localStorage.setItem('lw_p31_clip_fac_session_counter',String((+(localStorage.getItem('lw_p31_clip_fac_session_counter')||0))+1));}}catch(e){}
(function(){
  var HOOK_KINDS=[
    {id:'q',l:'질문',pool:['이 실수 하고 있지 않나요?','이거 모르고 있었지?','무료인데 왜?','저장 안 하면 후회?','3초 넘겼어?']},
    {id:'r',l:'반박',pool:['아무도 안 알려준 팁.','결과는 충격적이었습니다.','반박 불가 훅','그 방법, 틀렸어.','잘이 기본']},
    {id:'f',l:'FOMO',pool:['오늘만 이 창.','오늘 밤만','오늘부터 바뀌는 것.','창 닫히기 전.','지금 아니면 내일 없음.']},
    {id:'n',l:'숫자',pool:['3초만 보세요.','맥 배경 30초 컷','분야 1위 노림','7일 만에 루프.','정진 한 치 더']},
    {id:'c',l:'명령',pool:['친구 태그하고 봐.','저장 각.','한 판만 해봐','가자가자','ㄱㄱ 모드']}
  ];
  function hookKind(){
    var id; try{id=localStorage.getItem('clip_hk')||'q';}catch(e){id='q';}
    return HOOK_KINDS.filter(function(x){return x.id===id;})[0]||HOOK_KINDS[0];
  }
  function hookPool(){return hookKind().pool;}
  function clip18(s){
    s=String(s||'');
    if(s.length<=18) return {h:s, n:s.length, rest:''};
    return {h:s.slice(0,18), n:18, rest:s.slice(18)};
  }
  /* WAVE11: 릴스/숏츠/틱톡 말투만. API 0. 18자컷 불변 */
  var PLATS=[
    {id:'reels',l:'릴스',line:function(t){return t+' — 분위기 저장.';},cta:'링크는 고정댓글.'},
    {id:'shorts',l:'숏츠',line:function(t){return t+' — 끝까지 보면 끝.';},cta:'설명란에 링크.'},
    {id:'tt',l:'틱톡',line:function(t){return t+' — 지금 ㄱㄱ.';},cta:'고정댓글 ㄱㄱ.'}
  ];
  /* WAVE29 GOLD50 #5: CTA 3칩. 렌더 0 · 점수 0 · 18자/3말투 유지 */
  var CTAS=[
    {id:'link',l:'링크',line:'링크는 고정댓글.'},
    {id:'save',l:'저장',line:'저장하고 나중에 따라해.'},
    {id:'tag',l:'태그',line:'친구 태그하고 봐.'}
  ];
  /* WAVE108: 훅 프리셋 = 각 분류 첫문장. 렌더 0 · 점수 0 · 18자/3말투/A/B 유지 */
  var HOOK_PRESETS=HOOK_KINDS.map(function(k){
    var h=clip18(k.pool[0]).h;
    return {id:k.id, l:k.l, h:h};
  });
  /* WAVE117: 프리셋 핀. 렌더 0 · 점수 0 · 18자/3말투 유지 */
  /* WAVE165: 핀 칩 empty면 dim. 렌더 0 · 점수 발명 0 · 18자/3말투 유지 */
  function pinChipDim(n){ return n ? '' : 'opacity:.45'; }
  function loadHprePins(){
    try{
      var a=JSON.parse(localStorage.getItem('clip_hpre_pins')||'[]');
      if(!Array.isArray(a)) return [];
      return a.filter(function(id){return HOOK_PRESETS.some(function(p){return p.id===id;});}).slice(0,5);
    }catch(e){return [];}
  }
  function saveHprePins(a){try{localStorage.setItem('clip_hpre_pins',JSON.stringify((a||[]).slice(0,5)));}catch(e){}}
  function plat(){
    var id; try{id=localStorage.getItem('clip_plat')||'reels';}catch(e){id='reels';}
    return PLATS.filter(function(x){return x.id===id;})[0]||PLATS[0];
  }
  function cta(){
    var id; try{id=localStorage.getItem('clip_cta')||'link';}catch(e){id='link';}
    return CTAS.filter(function(x){return x.id===id;})[0]||CTAS[0];
  }
  function formatHook(kind,h0,topic){
    var c=clip18(h0);
    var p=plat();
    var k=cta();
    return c.h+'\n['+kind.l+'·'+p.l+'·'+k.l+'] '+(c.rest?c.rest+' · ':'')+p.line(topic)+'\n'+k.line+'\n'+c.n+'/18';
  }
  function pickTwo(pool,lastH){
    var a=pool[Math.floor(Math.random()*pool.length)];
    var b=a, tries=0;
    do{ b=pool[Math.floor(Math.random()*pool.length)]; tries++; }
    while((b===a || (lastH && lastH.indexOf(b)>=0)) && tries<12);
    if(b===a && pool.length>1) b=pool[(pool.indexOf(a)+1)%pool.length];
    return [a,b];
  }
  function loadAb(){
    try{ var a=JSON.parse(localStorage.getItem('clip_ab')||'[]'); return Array.isArray(a)?a:[]; }
    catch(e){ return []; }
  }
  var hooks=HOOK_KINDS.reduce(function(a,k){return a.concat(k.pool);},[]);
  var gens=+(localStorage.getItem('clip_gens')||0);
  var copyn=+(localStorage.getItem('clip_copy')||0);
  var hist=(function(){try{return JSON.parse(localStorage.getItem('clip_hist')||'[]');}catch(e){return[];}})();
  var pins=(function(){try{return JSON.parse(localStorage.getItem('clip_pins')||'[]');}catch(e){return[];}})();
  var root=document.getElementById('app');
  function dayKey(off){
    var d=new Date(); d.setDate(d.getDate()+(off||0));
    return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  }
  function todayN(){try{return +(localStorage.getItem('clip_day_'+dayKey(0))||0);}catch(e){return 0;}}
  function bumpToday(){try{localStorage.setItem('clip_day_'+dayKey(0),String(todayN()+1));}catch(e){}}
  function bumpStreak(){
    try{
      var st=JSON.parse(localStorage.getItem('clip_streak')||'{}');
      var t=dayKey(0);
      if(st.last===t) return st;
      st.count=(st.last===dayKey(-1))?(st.count||0)+1:1;
      st.last=t;
      localStorage.setItem('clip_streak',JSON.stringify(st));
      return st;
    }catch(e){return {count:0};}
  }
  function saveHist(){try{localStorage.setItem('clip_hist',JSON.stringify(hist.slice(0,12)));}catch(e){}}
  function savePins(){try{localStorage.setItem('clip_pins',JSON.stringify(pins.slice(0,8)));}catch(e){}}
  function render(){
    setTimeout(function(){
      try{
        var el=document.getElementById('clipSpark'); if(!el)return;
        var vals=[],max=1;
        for(var i=6;i>=0;i--){
          var n=+(localStorage.getItem('clip_day_'+dayKey(-i))||0); vals.push(n); if(n>max)max=n;
        }
        el.innerHTML=vals.map(function(n){var h=Math.max(3,Math.round(n/max*24));return '<div style="flex:1;height:'+h+'px;background:'+(n>0?'#e0b552':'#2a2438')+';border-radius:2px"></div>';}).join('');
      }catch(e){}
    },0);
    var st=JSON.parse(localStorage.getItem('clip_streak')||'{}');
    var sc=st.count||0;
    var tn=todayN();
    var last=localStorage.getItem('lastHook')||'';
    var fomo=function(){var e=new Date();e.setHours(24,0,0,0);var ms=Math.max(0,e-Date.now());return Math.floor(ms/3600000)+'h '+Math.floor((ms%3600000)/60000)+'m';}();
    var tn=todayN(), ydn=+(localStorage.getItem('clip_day_'+dayKey(-1))||0);
    var goal=5, gPct=Math.min(100,Math.round(tn/goal*100));
    var weekSum=0; for(var wi=0;wi<7;wi++) weekSum+=+(localStorage.getItem('clip_day_'+dayKey(-wi))||0);
    var wAvg=Math.round(weekSum/7*10)/10;
    var presets=['사주 미니앱','Mac 월페이퍼','에코특공대','타로 1장','Budget Pulse'];
    root.innerHTML='<div class="card"><div class="sub">템플릿 '+hooks.length+'개 · 생성 '+gens+' · 오늘 '+tn+'/'+goal+' · 전일 '+(tn-ydn>=0?'+':'')+(tn-ydn)+' · 7일평균 '+wAvg+' · 복사 '+copyn+' · 🔥'+sc+'일 · 목표 '+Math.min(5,todayN())+'/5 · 핀 '+pins.length+' · 창 '+fomo+'</div>'
      +'<div class="sub" id="persistChip">재로드 유지 · <span id="pinChip" style="'+pinChipDim(pins.length)+'">핀 '+pins.length+'/8</span> · 히스토리 '+hist.length+'/12 · lastHook '+(last?'복원':'없음')+'</div>'
      +'<div style="height:6px;background:#1c1826;border-radius:4px;margin:8px 0;overflow:hidden"><i style="display:block;height:100%;width:'+gPct+'%;background:linear-gradient(90deg,#e0b552,#f472b6)"></i></div>'
      +'<div class="row" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">'+presets.map(function(p){return '<button class="sec" data-pre="'+p+'" style="padding:6px 8px;font-size:12px">'+p+'</button>';}).join('')+'</div>'
      +'<div class="sub" style="margin:0 0 6px">훅 분류 · 선택한 풀에서만 뽑음 · 영상 렌더 없음</div>'
      +'<div class="row" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">'+HOOK_KINDS.map(function(k){
        var on=hookKind().id===k.id;
        return '<button type="button" data-hk="'+k.id+'" style="padding:6px 12px;font-size:12px;border-radius:999px;cursor:pointer;border:1px solid '+(on?'#e0b552':'#2a2438')+';background:'+(on?'#e0b552':'#1c1826')+';color:'+(on?'#111':'#ece8f1')+'">'+k.l+'</button>';
      }).join('')+'</div>'
      +'<div class="sub" id="hookPresetLabel" style="margin:0 0 6px">훅 프리셋 · 탭=그 문장 · ☆=핀 · 점수 없음 · 영상렌더 없음 · <span id="hprePinChip" style="'+pinChipDim(loadHprePins().length)+'">핀 '+loadHprePins().length+'/5</span></div>'
      +'<div class="row" id="hookPresets" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">'+(function(){
        var hpins=loadHprePins();
        var shown=HOOK_PRESETS.slice().sort(function(a,b){
          var pa=hpins.indexOf(a.id)>=0?0:1, pb=hpins.indexOf(b.id)>=0?0:1;
          return pa-pb;
        });
        return shown.map(function(p){
          var on=hookKind().id===p.id && (last.split('\n')[0]===p.h);
          var pinned=hpins.indexOf(p.id)>=0;
          return '<span style="display:inline-flex;gap:2px;align-items:center">'
            +'<button type="button" data-hpre="'+p.id+'" style="padding:6px 10px;font-size:11px;border-radius:999px;cursor:pointer;border:1px solid '+(on?'#e0b552':'#2a2438')+';background:'+(on?'#241d15':'#1c1826')+';color:#ece8f1">'+(pinned?'📌 ':'')+p.l+' · '+p.h+'</button>'
            +'<button type="button" class="sec" data-hpin="'+p.id+'" aria-label="프리셋 핀" style="padding:6px 8px;font-size:11px;'+pinChipDim(pinned?1:0)+'">'+(pinned?'★':'☆')+'</button>'
            +'</span>';
        }).join('');
      })()+'</div>'
      +'<div class="sub" style="margin:0 0 6px">말투 · 릴스/숏츠/틱톡 · API 없음 · 1행 18자 유지</div>'
      +'<div class="row" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">'+PLATS.map(function(p){
        var on=plat().id===p.id;
        return '<button type="button" data-plat="'+p.id+'" style="padding:6px 12px;font-size:12px;border-radius:999px;cursor:pointer;border:1px solid '+(on?'#e0b552':'#2a2438')+';background:'+(on?'#e0b552':'#1c1826')+';color:'+(on?'#111':'#ece8f1')+'">'+p.l+'</button>';
      }).join('')+'</div>'
      +'<div class="sub" style="margin:0 0 6px">CTA · 링크/저장/태그 · 로컬만 · 영상렌더 없음</div>'
      +'<div class="row" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">'+CTAS.map(function(c){
        var on=cta().id===c.id;
        return '<button type="button" data-cta="'+c.id+'" style="padding:6px 12px;font-size:12px;border-radius:999px;cursor:pointer;border:1px solid '+(on?'#e0b552':'#2a2438')+';background:'+(on?'#e0b552':'#1c1826')+';color:'+(on?'#111':'#ece8f1')+'">'+c.l+'</button>';
      }).join('')+'</div>'
      +'<input id="topic" placeholder="주제/제품" value="'+(localStorage.getItem('clip_topic')||'').replace(/"/g,'&quot;')+'"/>'
      +'<button id="go">훅 생성</button><button class="sec" id="x3">3연 훅</button><button class="sec" id="copy">복사</button>'
      +'<button class="sec" id="again">변형 재생성</button><button class="sec" id="pin">📌 핀</button><button class="sec" id="undoClip">↩ 직전</button>'
      +(function(){
        var ab=loadAb();
        if(ab.length<2) return '';
        var pick=last||ab[0];
        return '<div class="sub" style="margin:10px 0 6px">A/B 두 장 · 탭으로 채택 · 점수 없음 · 영상렌더 없음</div>'
          +'<div class="row" style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">'
          +ab.slice(0,2).map(function(body,i){
            var on=pick===body;
            var line=String(body).split('\n')[0];
            return '<button type="button" data-ab="'+i+'" style="text-align:left;padding:10px;border-radius:12px;cursor:pointer;border:1px solid '+(on?'#e0b552':'#2a2438')+';background:'+(on?'#241d15':'#1c1826')+';color:#ece8f1">'
              +'<b style="color:#e0b552">'+(i?'B':'A')+'</b> · 채택'
              +'<div style="margin-top:6px;font-size:12px;white-space:pre-wrap;font-weight:400">'+line.replace(/</g,'&lt;')+'</div>'
              +'</button>';
          }).join('')+'</div>';
      })()
      +'<pre id="out" style="margin-top:12px;white-space:pre-wrap;font-size:13px">'+last.replace(/</g,'&lt;')+'</pre></div>'
      +(pins.length?'<div class="card"><b>핀 훅</b><div id="pins" class="sub" style="margin-top:8px"></div></div>':'')
      +'<div class="card"><b>7일 생성</b><div id="clipSpark" style="display:flex;align-items:flex-end;gap:3px;height:28px;margin-top:8px"></div></div>'+'<div class="card"><b>최근 훅</b><div id="hist" class="sub" style="margin-top:8px"></div></div>';
    var h=document.getElementById('hist');
    if(h) h.innerHTML=hist.length?hist.map(function(x,i){
      return '<div data-h="'+i+'" style="padding:6px 0;border-bottom:1px solid #2a2438;cursor:pointer">'+String(x).slice(0,80).replace(/</g,'&lt;')+(String(x).length>80?'…':'')+'</div>';
    }).join(''):'생성하면 여기 쌓임 · 재로드해도 유지';
    Array.prototype.forEach.call(document.querySelectorAll('[data-h]'),function(el){
      el.onclick=function(){
        var i=+el.getAttribute('data-h');
        document.getElementById('out').textContent=hist[i]||'';
        try{localStorage.setItem('lastHook',hist[i]||'');}catch(e){}
      };
    });
    var pb=document.getElementById('pins');
    if(pb){
      pb.innerHTML=pins.map(function(x,i){
        return '<div style="display:flex;gap:8px;align-items:flex-start;padding:6px 0;border-bottom:1px solid #2a2438">'
          +'<div data-p="'+i+'" style="flex:1;cursor:pointer">📌 '+String(x).slice(0,70).replace(/</g,'&lt;')+'</div>'
          +'<button type="button" class="sec" data-unpin="'+i+'" style="padding:4px 8px;font-size:11px">해제</button>'
          +'</div>';
      }).join('');
      Array.prototype.forEach.call(document.querySelectorAll('[data-p]'),function(el){
        el.onclick=function(){
          var i=+el.getAttribute('data-p');
          document.getElementById('out').textContent=pins[i]||'';
          try{localStorage.setItem('lastHook',pins[i]||'');}catch(e){}
        };
      });
      Array.prototype.forEach.call(document.querySelectorAll('[data-unpin]'),function(el){
        el.onclick=function(ev){
          if(ev) ev.stopPropagation();
          var i=+el.getAttribute('data-unpin');
          if(i>=0 && i<pins.length){ pins.splice(i,1); savePins(); render(); }
        };
      });
    }
    function gen(forceDiff){
      var topicEl=document.getElementById('topic');
      var topic=(topicEl&&topicEl.value)||'우리 앱';
      try{localStorage.setItem('clip_topic',topic);}catch(e){}
      var lastH=localStorage.getItem('lastHook')||'';
      var kind=hookKind();
      var pool=kind.pool;
      var pair=pickTwo(pool, forceDiff?lastH:'');
      var bodies=[formatHook(kind,pair[0],topic), formatHook(kind,pair[1],topic)];
      gens++; localStorage.setItem('clip_gens',gens);
      hist.unshift(bodies[0]); saveHist();
      try{
        localStorage.setItem('clip_ab', JSON.stringify(bodies));
        localStorage.setItem('lastHook', bodies[0]);
      }catch(e){}
      bumpToday(); bumpStreak();
      try{legionTrack('activate',{diff:!!forceDiff,ab:1})}catch(e){}
      render();
      document.getElementById('out').textContent=bodies[0];
    }
    document.getElementById('go').onclick=function(){gen(false);};
    document.getElementById('again').onclick=function(){gen(true);};
    var x3=document.getElementById('x3');
    if(x3) x3.onclick=function(){
      var topicEl=document.getElementById('topic');
      var topic=(topicEl&&topicEl.value)||'우리 앱';
      try{localStorage.setItem('clip_topic',topic);}catch(e){}
      var batch=[];
      var kind=hookKind();
      var pool=kind.pool;
      for(var n=0;n<3;n++){
        var h0=pool[Math.floor(Math.random()*pool.length)];
        var body=formatHook(kind,h0,topic);
        batch.push(body); hist.unshift(body); gens++; bumpToday();
      }
      localStorage.setItem('clip_gens',gens); saveHist();
      try{localStorage.setItem('lastHook',batch.join('\n---\n'));}catch(e){}
      bumpStreak(); render();
      document.getElementById('out').textContent=batch.join('\n---\n');
      try{legionTrack('activate',{batch:3})}catch(e){}
    };
    Array.prototype.forEach.call(document.querySelectorAll('[data-pre]'),function(b){
      b.onclick=function(){
        document.getElementById('topic').value=b.getAttribute('data-pre');
        try{localStorage.setItem('clip_topic',b.getAttribute('data-pre'));}catch(e){}
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-hk]'),function(b){
      b.onclick=function(){
        try{localStorage.setItem('clip_hk',b.getAttribute('data-hk'));}catch(e){}
        var keep=(document.getElementById('out')&&document.getElementById('out').textContent)||'';
        render();
        if(keep){var o=document.getElementById('out'); if(o) o.textContent=keep;}
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-hpre]'),function(b){
      b.onclick=function(){
        var id=b.getAttribute('data-hpre');
        var pre=HOOK_PRESETS.filter(function(x){return x.id===id;})[0];
        if(!pre)return;
        try{localStorage.setItem('clip_hk',pre.id);}catch(e){}
        var topicEl=document.getElementById('topic');
        var topic=(topicEl&&topicEl.value)||localStorage.getItem('clip_topic')||'우리 앱';
        var kind=HOOK_KINDS.filter(function(k){return k.id===pre.id;})[0]||HOOK_KINDS[0];
        var body=formatHook(kind,pre.h,topic);
        try{localStorage.setItem('lastHook',body);}catch(e){}
        render();
        var o=document.getElementById('out'); if(o) o.textContent=body;
        try{legionTrack('hook_preset',{id:pre.id})}catch(e){}
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-hpin]'),function(b){
      b.onclick=function(ev){
        if(ev) ev.stopPropagation();
        var id=b.getAttribute('data-hpin');
        if(!HOOK_PRESETS.some(function(p){return p.id===id;})) return;
        var a=loadHprePins();
        var ix=a.indexOf(id);
        if(ix>=0) a.splice(ix,1); else { a.unshift(id); if(a.length>5) a=a.slice(0,5); }
        saveHprePins(a);
        var keep=(document.getElementById('out')&&document.getElementById('out').textContent)||'';
        render();
        if(keep){var o=document.getElementById('out'); if(o) o.textContent=keep;}
        try{legionTrack('hook_preset_pin',{id:id,on:ix<0?1:0})}catch(e){}
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-plat]'),function(b){
      b.onclick=function(){
        try{localStorage.setItem('clip_plat',b.getAttribute('data-plat'));}catch(e){}
        var keep=(document.getElementById('out')&&document.getElementById('out').textContent)||'';
        render();
        if(keep){var o=document.getElementById('out'); if(o) o.textContent=keep;}
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-cta]'),function(b){
      b.onclick=function(){
        try{localStorage.setItem('clip_cta',b.getAttribute('data-cta'));}catch(e){}
        var keep=(document.getElementById('out')&&document.getElementById('out').textContent)||'';
        render();
        if(keep){var o=document.getElementById('out'); if(o) o.textContent=keep;}
      };
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-ab]'),function(b){
      b.onclick=function(){
        var i=+b.getAttribute('data-ab');
        var pair=loadAb();
        var body=pair[i]||'';
        if(!body)return;
        try{localStorage.setItem('lastHook',body);}catch(e){}
        render();
        var o=document.getElementById('out'); if(o) o.textContent=body;
      };
    });
    document.getElementById('pin').onclick=function(){
      var o=document.getElementById('out');
      var body=(o&&o.textContent)||localStorage.getItem('lastHook')||'';
      if(!body)return;
      var ix=pins.indexOf(body);
      if(ix>=0){ pins.splice(ix,1); }
      else { pins.unshift(body); if(pins.length>8) pins=pins.slice(0,8); }
      savePins();
      render(); document.getElementById('out').textContent=body;
      try{legionTrack('pin',{on:ix<0?1:0})}catch(e){}
    };
    var uc=document.getElementById('undoClip');
    if(uc) uc.onclick=function(){
      if(!hist.length)return;
      hist.shift(); saveHist();
      try{
        var n=Math.max(0,todayN()-1);
        localStorage.setItem('clip_day_'+dayKey(0),String(n));
        gens=Math.max(0,gens-1); localStorage.setItem('clip_gens',gens);
        localStorage.setItem('lastHook',hist[0]||'');
      }catch(e){}
      render();
      try{legionTrack('undo',{})}catch(e){}
    };
    document.getElementById('copy').onclick=function(){
      var o=document.getElementById('out');
      if(!o||!o.textContent)return;
      if(navigator.clipboard) navigator.clipboard.writeText(o.textContent);
      copyn++; localStorage.setItem('clip_copy',copyn);
      try{legionTrack('share_peak',{copy:1})}catch(e){}
      var b=document.getElementById('copy'); if(b){b.textContent='복사됨 ✓'; setTimeout(function(){b.textContent='복사';},1000);}
    };
  }
  try{legionTrack('session_start',{})}catch(e){}
  render();

  (function(){try{
    if(document.getElementById('moneyPipe'))return;
    var d=document.createElement('div');
    d.innerHTML='\n<div id="moneyPipe" style="margin-top:12px;padding:10px;border:1px solid #c5a46e44;border-radius:12px;background:#16121c;text-align:center;font-size:12px">\n  <div style="color:#e0b552;font-weight:700;margin-bottom:4px">💎 후원 · 파이프 (엔터 18+)</div>\n  <p style="opacity:.75;margin:0 0 6px">가상 체험 · 실결제 백엔드 없음 · 문의만</p>\n\n  \n</div>\n';
    var app=document.getElementById('app')||document.body;
    app.appendChild(d.firstElementChild||d);
    try{legionTrack('money_pipe_shown',{app:'auto'})}catch(e){}
  }catch(e){}})();
})();

/* LEGION_WAVE_70_wave_stamp */ /* ship wave 70 2026-07-21T07:43:42 */
