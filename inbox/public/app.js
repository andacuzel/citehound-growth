(function () {
  'use strict';
  var view = document.getElementById('view');
  var tabs = document.getElementById('tabs');
  var login = document.getElementById('login');
  var tab = 'pending';

  function api(route, opt) {
    opt = opt || {};
    return fetch('/api?r=' + encodeURIComponent(route), {
      method: opt.body ? 'POST' : 'GET', credentials: 'same-origin',
      headers: opt.body ? { 'Content-Type': 'application/json' } : {}, body: opt.body ? JSON.stringify(opt.body) : undefined
    }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j._status = r.status; return j; }); });
  }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function btn(label, cls, fn) { var b = el('button', cls, label); b.type = 'button'; b.addEventListener('click', fn); return b; }

  var LABEL = { x: 'X', linkedin_personal: 'LinkedIn (personal)', linkedin_page: 'LinkedIn (page)', instagram: 'Instagram', reddit: 'Reddit', hn: 'Hacker News', other: 'Other' };
  function shareUrl(d) {
    var t = encodeURIComponent(d.text + (d.url && d.text.indexOf(d.url) < 0 ? '\n' + d.url : ''));
    if (d.platform === 'x') return 'https://twitter.com/intent/tweet?text=' + t;
    if (d.platform === 'linkedin_personal' || d.platform === 'linkedin_page') return 'https://www.linkedin.com/feed/?shareActive=true&text=' + t;
    return '';
  }
  function copy(text, b) {
    var done = function () { var o = b.textContent; b.textContent = 'Copied'; setTimeout(function () { b.textContent = o; }, 1200); };
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {}); 
  }

  function head(c) {
    var m = el('div', 'meta');
    if (c.hot) m.appendChild(el('span', 'pill hot', 'HOT'));
    m.appendChild(el('span', 'pill', c.type));
    if (c.pillar) m.appendChild(el('span', 'pill', c.pillar));
    if (c.score !== null && c.score !== undefined) m.appendChild(el('span', 'pill', 'score ' + c.score));
    m.appendChild(el('span', 'pill', c.status));
    return m;
  }
  function drafts(c, withShare) {
    var box = el('div');
    c.drafts.forEach(function (d) {
      var w = el('div', 'draft');
      w.appendChild(el('b', '', LABEL[d.platform] || d.platform));
      w.appendChild(el('p', '', d.text));
      (d.thread || []).forEach(function (t, i) { w.appendChild(el('p', '', (i + 2) + '/ ' + t)); });
      if (withShare) {
        var row = el('div', 'row');
        var u = shareUrl(d);
        if (u) { var a = el('a', 'btn primary', 'Open in ' + (LABEL[d.platform] || 'app')); a.href = u; a.target = '_blank'; a.rel = 'noopener noreferrer'; row.appendChild(a); }
        row.appendChild(btn('Copy text', '', function (ev) { copy(d.text + (d.thread && d.thread.length ? '\n\n' + d.thread.map(function (t, i) { return (i + 2) + '/ ' + t; }).join('\n\n') : ''), ev.target); }));
        w.appendChild(row);
      }
      box.appendChild(w);
    });
    return box;
  }

  function decide(c, payload, after) {
    payload.id = c.id;
    api('decide', { body: payload }).then(function (j) { if (j.error) { alert(j.error); return; } after(j.card); });
  }

  function pendingCard(c) {
    var card = el('article', 'card' + (c.hot ? ' hot' : ''));
    card.id = c.id;
    card.appendChild(head(c));
    card.appendChild(el('h2', '', c.title));
    if (c.why || c.summary) card.appendChild(el('p', 'why', c.why || c.summary));
    if (c.source_url) { var a = el('a', '', 'Source'); a.href = c.source_url; a.target = '_blank'; a.rel = 'noopener noreferrer'; card.appendChild(a); }
    if (c.drafts.length) card.appendChild(drafts(c, false));
    if (c.body) card.appendChild(el('div', 'body', c.body));
    var actions = el('div', 'row');
    var chips = el('div', 'chips'); chips.hidden = true;
    var edit = el('div'); edit.hidden = true;
    actions.appendChild(btn('Approve', 'primary', function () { decide(c, { decision: 'approve' }, function () { render(); }); }));
    actions.appendChild(btn('Edit request', '', function () { edit.hidden = !edit.hidden; chips.hidden = true; }));
    actions.appendChild(btn('Reject', 'warn', function () { chips.hidden = !chips.hidden; edit.hidden = true; }));
    ['too bold', 'off-topic', 'boring', 'factually wrong', 'other'].forEach(function (r) {
      chips.appendChild(btn(r, '', function () { decide(c, { decision: 'reject', reason: r }, function () { render(); }); }));
    });
    var inp = el('input'); inp.maxLength = 200; inp.placeholder = 'One line: what should change?';
    edit.appendChild(inp);
    var send = btn('Send request', 'primary', function () { if (!inp.value.trim()) return; decide(c, { decision: 'edit', note: inp.value }, function () { render(); }); });
    var er = el('div', 'row'); er.appendChild(send); edit.appendChild(er);
    card.appendChild(actions); card.appendChild(chips); card.appendChild(edit);
    return card;
  }

  function approvedCard(c) {
    var card = el('article', 'card');
    card.id = c.id;
    card.appendChild(head(c));
    card.appendChild(el('h2', '', c.title));
    if (c.drafts.length) card.appendChild(drafts(c, true));
    if (c.body) card.appendChild(el('div', 'body', c.body));
    var row = el('div', 'row');
    row.appendChild(btn('Done', 'primary', function () { decide(c, { decision: 'done', platforms: c.drafts.map(function (d) { return d.platform; }) }, function () { render(); }); }));
    card.appendChild(row);
    return card;
  }

  function load(status) { return fetch('/api?r=cards&status=' + status, { credentials: 'same-origin' }).then(function (r) { return r.json(); }); }

  function render() {
    view.textContent = '';
    if (tab === 'pending' || tab === 'approved') {
      load(tab).then(function (j) {
        var cards = j.cards || [];
        document.getElementById('n-' + tab).textContent = cards.length ? '(' + cards.length + ')' : '';
        if (!cards.length) { view.appendChild(el('p', 'empty', tab === 'pending' ? 'Nothing waiting for a decision.' : 'Nothing approved and waiting to be posted.')); return; }
        cards.forEach(function (c) { view.appendChild(tab === 'pending' ? pendingCard(c) : approvedCard(c)); });
        if (location.hash.length > 1) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
      });
      counts();
    } else if (tab === 'history') {
      load('all').then(function (j) {
        (j.cards || []).filter(function (c) { return ['done', 'rejected', 'edit_requested', 'superseded'].indexOf(c.status) >= 0; }).forEach(function (c) {
          var card = el('article', 'card'); card.appendChild(head(c)); card.appendChild(el('h2', '', c.title));
          if (c.reason || c.note) card.appendChild(el('p', 'why', [c.reason, c.note].filter(Boolean).join(': ')));
          view.appendChild(card);
        });
        if (!view.children.length) view.appendChild(el('p', 'empty', 'No history yet.'));
      });
    } else if (tab === 'brief') {
      api('brief').then(function (j) {
        if (!j.brief) { view.appendChild(el('p', 'empty', 'No brief yet.')); return; }
        var card = el('article', 'card'); card.appendChild(el('h2', '', j.brief.subject)); card.appendChild(el('div', 'body', j.brief.text)); view.appendChild(card);
      });
    } else if (tab === 'numbers') {
      numbers();
    } else if (tab === 'settings') {
      api('settings').then(function (j) {
        var card = el('article', 'card');
        card.appendChild(el('h2', '', 'Phone push'));
        card.appendChild(el('p', 'why', j.push === 'set' ? 'Install the ntfy app and subscribe to this topic on server ' + j.ntfy_server + ':' : 'Not configured.'));
        if (j.ntfy_topic) card.appendChild(el('div', 'body', j.ntfy_topic));
        card.appendChild(el('p', 'why', 'Email to your own address: ' + j.email));
        card.appendChild(btn('Log out', 'warn', function () { api('logout').then(function () { location.reload(); }); }));
        view.appendChild(card);
      });
    }
  }

  function counts() {
    ['pending', 'approved'].forEach(function (s) { if (s === tab) return; load(s).then(function (j) { var n = (j.cards || []).length; document.getElementById('n-' + s).textContent = n ? '(' + n + ')' : ''; }); });
  }

  function numbers() {
    var card = el('article', 'card');
    card.appendChild(el('h2', '', 'Weekly numbers'));
    card.appendChild(el('p', 'why', 'Impressions and clicks come from each platform; scans, waitlist joins, quote requests and applications from your own dashboards. Conversions are waitlist, quote and application, not sales.'));
    var f = el('form'); var fields = {};
    [['week', 'Week starting (YYYY-MM-DD)'], ['platform', 'Platform'], ['pillar', 'Pillar'], ['impressions', 'Impressions'], ['clicks', 'Clicks'], ['scans', 'Scans'], ['waitlist', 'Waitlist joins'], ['quotes', 'Quote requests'], ['applications', 'Applications']].forEach(function (p) {
      var l = el('label', '', p[1]); var i = el('input'); fields[p[0]] = i; f.appendChild(l); f.appendChild(i);
    });
    var s = el('button', 'primary', 'Add row'); s.type = 'submit'; f.appendChild(s);
    f.addEventListener('submit', function (e) {
      e.preventDefault(); var b = {}; Object.keys(fields).forEach(function (k) { b[k] = fields[k].value; });
      api('metrics-add', { body: b }).then(function () { render(); });
    });
    card.appendChild(f); view.appendChild(card);
    api('metrics').then(function (j) {
      var rows = j.rows || []; if (!rows.length) return;
      var t = el('table'); var th = el('tr');
      ['week', 'platform', 'pillar', 'impressions', 'clicks', 'scans', 'waitlist', 'quotes', 'applications'].forEach(function (h) { th.appendChild(el('th', '', h)); }); t.appendChild(th);
      rows.slice(-30).reverse().forEach(function (r) { var tr = el('tr'); ['week', 'platform', 'pillar', 'impressions', 'clicks', 'scans', 'waitlist', 'quotes', 'applications'].forEach(function (k) { tr.appendChild(el('td', '', String(r[k]))); }); t.appendChild(tr); });
      var w = el('div', 'card'); w.appendChild(t); view.appendChild(w);
    });
  }

  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-tab]'); if (!b) return;
    tab = b.getAttribute('data-tab');
    Array.prototype.forEach.call(tabs.querySelectorAll('button'), function (x) { x.classList.toggle('on', x === b); });
    render();
  });

  function enter() { login.hidden = true; view.hidden = false; tabs.hidden = false; render(); }

  login.addEventListener('submit', function (e) {
    e.preventDefault();
    var err = document.getElementById('login-err'); err.hidden = true;
    api('login', { body: { passphrase: document.getElementById('pw').value } }).then(function (j) {
      document.getElementById('pw').value = '';
      if (j.ok) enter(); else { err.textContent = j.error || 'Could not log in'; err.hidden = false; }
    });
  });

  api('me').then(function (j) { if (j.ok) enter(); });
})();
