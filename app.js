
/* LEGION_WAVE_25_session_counter */
try{if(!sessionStorage.getItem('lw_p31_clip_fac_session_counter')){sessionStorage.setItem('lw_p31_clip_fac_session_counter','1');localStorage.setItem('lw_p31_clip_fac_session_counter',String((+(localStorage.getItem('lw_p31_clip_fac_session_counter')||0))+1));}}catch(e){}
(function(){
  var hooks=['이 실수 하고 있지 않나요?','3초만 보세요.','오늘부터 바뀌는 것.','아무도 안 알려준 팁.','결과는 충격적이었습니다.','설치 없이 바로.','친구 태그하고 봐.','저장 각.','오늘만 이 창.','이거 모르고 있었지?','홈에 추가하면 더 편해','한 판만 해봐','공유하면 리필','정진 한 치 더','잘이 기본','맥 배경 30초 컷','가자가자','정진 루프','무료인데 왜?','썸네일 클릭 유발','스크롤 멈추게','반박 불가 훅','오늘 밤만','분야 1위 노림','ㄱㄱ 모드'];
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
      +'<div style="height:6px;background:#1c1826;border-radius:4px;margin:8px 0;overflow:hidden"><i style="display:block;height:100%;width:'+gPct+'%;background:linear-gradient(90deg,#e0b552,#f472b6)"></i></div>'
      +'<div class="row" style="flex-wrap:wrap;gap:6px;margin-bottom:8px">'+presets.map(function(p){return '<button class="sec" data-pre="'+p+'" style="padding:6px 8px;font-size:12px">'+p+'</button>';}).join('')+'</div>'
      +'<input id="topic" placeholder="주제/제품" value="'+(localStorage.getItem('clip_topic')||'').replace(/"/g,'&quot;')+'"/>'
      +'<button id="go">훅 생성</button><button class="sec" id="x3">3연 훅</button><button class="sec" id="copy">복사</button>'
      +'<button class="sec" id="again">변형 재생성</button><button class="sec" id="pin">📌 핀</button><button class="sec" id="undoClip">↩ 직전</button>'
      +'<pre id="out" style="margin-top:12px;white-space:pre-wrap;font-size:13px">'+last.replace(/</g,'&lt;')+'</pre></div>'
      +(pins.length?'<div class="card"><b>핀 훅</b><div id="pins" class="sub" style="margin-top:8px"></div></div>':'')
      +'<div class="card"><b>7일 생성</b><div id="clipSpark" style="display:flex;align-items:flex-end;gap:3px;height:28px;margin-top:8px"></div></div>'+'<div class="card"><b>최근 훅</b><div id="hist" class="sub" style="margin-top:8px"></div></div>';
    var h=document.getElementById('hist');
    if(h) h.innerHTML=hist.length?hist.map(function(x,i){
      return '<div data-h="'+i+'" style="padding:6px 0;border-bottom:1px solid #2a2438;cursor:pointer">'+String(x).slice(0,80).replace(/</g,'&lt;')+(String(x).length>80?'…':'')+'</div>';
    }).join(''):'생성하면 여기 쌓임 · 탭=재로드';
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
        return '<div data-p="'+i+'" style="padding:6px 0;border-bottom:1px solid #2a2438;cursor:pointer">📌 '+String(x).slice(0,70).replace(/</g,'&lt;')+'</div>';
      }).join('');
      Array.prototype.forEach.call(document.querySelectorAll('[data-p]'),function(el){
        el.onclick=function(){
          var i=+el.getAttribute('data-p');
          document.getElementById('out').textContent=pins[i]||'';
          try{localStorage.setItem('lastHook',pins[i]||'');}catch(e){}
        };
      });
    }
    function gen(forceDiff){
      var topicEl=document.getElementById('topic');
      var topic=(topicEl&&topicEl.value)||'우리 앱';
      try{localStorage.setItem('clip_topic',topic);}catch(e){}
      var lastH=localStorage.getItem('lastHook')||'';
      var h0, tries=0;
      do{
        h0=hooks[Math.floor(Math.random()*hooks.length)];
        tries++;
      }while(forceDiff && lastH.indexOf(h0)===0 && tries<8);
      var body=h0+'\n\n'+topic+' — 설치 없이 바로.\n링크는 고정댓글.';
      gens++; localStorage.setItem('clip_gens',gens);
      hist.unshift(body); saveHist();
      try{localStorage.setItem('lastHook',body);}catch(e){}
      bumpToday(); bumpStreak();
      try{legionTrack('activate',{diff:!!forceDiff})}catch(e){}
      render();
      document.getElementById('out').textContent=body;
    }
    document.getElementById('go').onclick=function(){gen(false);};
    document.getElementById('again').onclick=function(){gen(true);};
    var x3=document.getElementById('x3');
    if(x3) x3.onclick=function(){
      var topicEl=document.getElementById('topic');
      var topic=(topicEl&&topicEl.value)||'우리 앱';
      try{localStorage.setItem('clip_topic',topic);}catch(e){}
      var batch=[];
      for(var n=0;n<3;n++){
        var h0=hooks[Math.floor(Math.random()*hooks.length)];
        var body=h0+'\n\n'+topic+' — 설치 없이 바로.\n링크는 고정댓글.';
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
    document.getElementById('pin').onclick=function(){
      var o=document.getElementById('out');
      var body=(o&&o.textContent)||localStorage.getItem('lastHook')||'';
      if(!body)return;
      if(pins.indexOf(body)<0){ pins.unshift(body); savePins(); }
      render(); document.getElementById('out').textContent=body;
      try{legionTrack('pin',{})}catch(e){}
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
    d.innerHTML='\n<div id="moneyPipe" style="margin-top:12px;padding:10px;border:1px solid #c5a46e44;border-radius:12px;background:#16121c;text-align:center;font-size:12px">\n  <div style="color:#e0b552;font-weight:700;margin-bottom:4px">💎 후원 · 파이프 (엔터 18+)</div>\n  <p style="opacity:.75;margin:0 0 6px">가상 체험 · 실결제 백엔드 없음 · 문의만</p>\n  <a style="color:#ece8f1;margin:0 6px" href="mailto:hoyashi95@gmail.com?subject=%5BLegion%5D%20support">☕ 후원 문의</a>\n  <a style="color:#e0b552;margin:0 6px" href="https://hosuman08-netizen.github.io/legion-hub/?utm_source=pipe&utm_medium=app">🎮 Arcade</a>\n</div>\n';
    var app=document.getElementById('app')||document.body;
    app.appendChild(d.firstElementChild||d);
    try{legionTrack('money_pipe_shown',{app:'auto'})}catch(e){}
  }catch(e){}})();
})();

/* LEGION_WAVE_70_wave_stamp */ /* ship wave 70 2026-07-21T07:43:42 */
