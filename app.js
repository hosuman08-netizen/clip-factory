
(function(){
  var hooks=['이 실수 하고 있지 않나요?','3초만 보세요.','오늘부터 바뀌는 것.','아무도 안 알려준 팁.','결과는 충격적이었습니다.','설치 없이 바로.','친구 태그하고 봐.','저장 각.','오늘만 이 창.','이거 모르고 있었지?','홈에 추가하면 더 편해','한 판만 해봐','공유하면 리필','정진 한 치 더','잘이 기본'];
  var root=document.getElementById('app');
  function gen(){
    var h=hooks[Math.floor(Math.random()*hooks.length)];
    var topic=document.getElementById('topic').value||'우리 앱';
    var body=h+'\\n\\n'+topic+' — 설치 없이 바로.\\n링크는 고정댓글.';
    document.getElementById('out').textContent=body;
    try{legionTrack('activate',{})}catch(e){}
  }
  root.innerHTML='<div class="card"><input id="topic" placeholder="주제/제품"/><button id="go">훅 생성</button><button class="sec" id="copy">복사</button><pre id="out" style="margin-top:12px;white-space:pre-wrap;font-size:13px"></pre></div>';
  document.getElementById('go').onclick=gen;
  document.getElementById('copy').onclick=function(){var t=document.getElementById('out').textContent;if(navigator.clipboard)navigator.clipboard.writeText(t);try{legionTrack('share_peak',{})}catch(e){}};
  try{legionTrack('session_start',{})}catch(e){}
})();
