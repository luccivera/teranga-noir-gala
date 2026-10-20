// Teranga Noir: fills content from content.js + mobile menu
(function(){
  var C = window.GALA || {};
  var get = function(path){ return path.split('.').reduce(function(o,k){ return o==null?undefined:o[k]; }, C); };

  // ---- times ----
  var t = function(hm){ if(!hm) return ''; var x=hm.split(':').map(Number), dt=new Date(2000,0,1,x[0],x[1]);
      return dt.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit'}); };
  C.doorsTime = t(C.doors); C.programTime = t(C.program);
  // ---- dates ----
  if (C.date) {
    var p = C.date.split('-').map(Number), d = new Date(p[0], p[1]-1, p[2]);
    var fmt = function(opts){ return d.toLocaleDateString('en-CA', opts); };
    C.dateLong = fmt({weekday:'long', month:'long', day:'numeric'});
    C.dateShort = fmt({weekday:'short', month:'short', day:'numeric'});
    C.dateMonthDay = fmt({month:'long', day:'numeric'});
    C.year = String(p[0]);
    C.dateFull = fmt({month:'long', day:'numeric', year:'numeric'});
  }

  // ---- text ----
  document.querySelectorAll('[data-g]').forEach(function(el){
    var v = get(el.getAttribute('data-g'));
    if (v === undefined || v === null || v === '') return;
    if (typeof v === 'string' && v.indexOf('\n') > -1) {
      el.textContent = ''; v.split('\n').forEach(function(line,i){ if(i) el.appendChild(document.createElement('br')); el.appendChild(document.createTextNode(line)); });
    } else el.textContent = v;
  });
  // ---- links ----
  document.querySelectorAll('[data-href]').forEach(function(a){
    var v=get(a.getAttribute('data-href'));
    if(!v && a.hasAttribute('data-fallback')) v=get(a.getAttribute('data-fallback'));
    if(v){ a.href=v; if(/^https?:/.test(v)){ a.target='_blank'; a.rel='noopener'; } return; }
    var m=a.getAttribute('data-fallback-mail'); var e=m && get(m);
    if(e) a.href='mailto:'+e+(a.getAttribute('data-q')||'');
  });
  document.querySelectorAll('[data-mail]').forEach(function(a){ var v=get(a.getAttribute('data-mail')); if(v) a.href='mailto:'+v+(a.getAttribute('data-q')||''); });
  document.querySelectorAll('[data-tel]').forEach(function(a){ var v=get(a.getAttribute('data-tel')); if(v) a.href='tel:'+v.replace(/[^\d+]/g,''); });
  // external links open in a new tab
  document.querySelectorAll('a[data-href="ticketLink"],a[data-href="instagram"],a[data-href="facebook"],a[data-href="taibuWebsite"]').forEach(function(a){ a.target='_blank'; a.rel='noopener'; });

  // ---- add to calendar (.ics built from content.js) ----
  if (C.date) {
    var stamp = function(hm){ return C.date.replace(/-/g,'') + 'T' + (hm||'18:00').replace(':','') + '00'; };
    var ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//TAIBU//Teranga Noir//EN','BEGIN:VEVENT',
      'UID:teranga-noir-'+C.date+'@taibugala','DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z',
      'DTSTART;TZID=America/Toronto:'+stamp(C.doors),'DTEND;TZID=America/Toronto:'+stamp(C.ends),
      'SUMMARY:Teranga Noir','LOCATION:'+(C.venueName||'')+'\\, '+(C.venueAddress||'').replace(/,/g,'\\,'),
      'DESCRIPTION:Celebrating 18 years of TAIBU Community Health Centre.','END:VEVENT','END:VCALENDAR'].join('\r\n');
    var url = URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));
    document.querySelectorAll('[data-ics]').forEach(function(a){ a.href=url; a.download='teranga-noir-gala.ics'; });
  }

  // ---- mobile menu ----
  var btn=document.querySelector('.tn-menu-btn'), menu=document.getElementById('m-menu');
  if(btn&&menu){
    var close=menu.querySelector('.tn-menu-close');
    var open=function(){menu.hidden=false;btn.setAttribute('aria-expanded','true');document.body.style.overflow='hidden';close.focus();};
    var shut=function(focusBtn){menu.hidden=true;btn.setAttribute('aria-expanded','false');document.body.style.overflow='';if(focusBtn)btn.focus();};
    btn.addEventListener('click',open); close.addEventListener('click',function(){shut(true);});
    menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){shut(false);});});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden) shut(true);});
  }
})();
