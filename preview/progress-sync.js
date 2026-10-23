/* Hero Math Academy – progress-sync.js (self-contained, no deps).
 * Queues session summaries in localStorage and POSTs them to the parent's
 * Google Apps Script web app when online. Never throws, never blocks play.
 * Config (set BEFORE this script loads, or call HMA.progress.config({...})):
 *   window.HMA_PROGRESS = { url: 'https://script.google.com/macros/s/XXX/exec', token: 'word' };
 * API: HMA.progress.log({kid, mode, skill, questions, firstTry, hints, minutes, venom})
 *      HMA.progress.flush()   HMA.progress.pending()
 */
(function () {
  'use strict';
  var KEY = 'hma_progress_queue_v1', AKEY = 'hma_answers_queue_v1', MAX = 500, AMAX = 2000, busy = false, timer = null;
  var cfg = window.HMA_PROGRESS || {};
  function isTest() { try { return !!(navigator.webdriver || /[?&]test=1\b/.test(location.search) || window.TAE || window.__TAE || localStorage.getItem('hma_test') === '1'); } catch (e) { return false; } }
  function loadA() { try { return JSON.parse(localStorage.getItem(AKEY) || '[]') || []; } catch (e) { return []; } }
  function saveA(q) { try { localStorage.setItem(AKEY, JSON.stringify(q.slice(-AMAX))); } catch (e) {} }
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]') || []; } catch (e) { return []; } }
  function save(q) { try { localStorage.setItem(KEY, JSON.stringify(q.slice(-MAX))); } catch (e) {} }
  function n(v) { v = Number(v); return isFinite(v) && v >= 0 ? v : 0; }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

  function log(s) {
    try {
      s = s || {};
      var q = load();
      q.push({
        id: uid(), ts: Date.now(),
        kid: s.kid === 'Sadie' ? 'Sadie' : 'Samuel',
        mode: String(s.mode || 'mission').slice(0, 30),
        skill: String(s.skill || '').slice(0, 60),
        questions: n(s.questions), firstTry: n(s.firstTry), hints: n(s.hints),
        minutes: Math.round(n(s.minutes) * 10) / 10,
        venom: String(s.venom || '').slice(0, 30),
        level: n(s.level), stuck: n(s.stuck), sense: n(s.sense)
      });
      if (isTest()) q[q.length - 1].test = true;
      save(q);
      soon(1500);
    } catch (e) {}
  }

  // One row per answered question; batched (sent with sessions or after a short idle), never one POST per tap.
  function answer(a) {
    try {
      a = a || {};
      var q = loadA(), T = ['warmup', 'review', 'yourturn', 'normal'];
      var r = { id: uid(), ts: Date.now(), kid: a.kid === 'Sadie' ? 'Sadie' : 'Samuel',
        skill: String(a.skill || '').slice(0, 60), fact: String(a.fact || '').slice(0, 40),
        firstTryRight: a.firstTryRight ? 1 : 0, rightSecondOrAfterHint: a.rightSecondOrAfterHint ? 1 : 0,
        type: T.indexOf(a.type) >= 0 ? a.type : 'normal', level: n(a.level) };
      if (isTest()) r.test = true;
      q.push(r); saveA(q);
      if (q.length >= 25) soon(1500); else if (!timer) soon(20000);
    } catch (e) {}
  }

  function soon(ms) { try { clearTimeout(timer); timer = setTimeout(function () { timer = null; flush(); }, ms); } catch (e) {} }

  function flush() {
    try {
      if (busy || !cfg.url || !cfg.token) return;
      if (navigator.onLine === false) return;
      var q = load(), qa = loadA(); if (!q.length && !qa.length) return;
      var batch = q.slice(0, 50), ids = {}, abatch = qa.slice(0, 200), aids = {};
      batch.forEach(function (s) { ids[s.id] = 1; });
      abatch.forEach(function (s) { aids[s.id] = 1; });
      busy = true;
      // text/plain = "simple" CORS request (no preflight); no-cors since Apps Script
      // redirects. We can't read the reply, so remove only after fetch resolves;
      // the script de-dupes by session id, so a resend is harmless.
      fetch(cfg.url, {
        method: 'POST', mode: 'no-cors', keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ token: cfg.token, sessions: batch, answers: abatch })
      }).then(function () {
        save(load().filter(function (s) { return !ids[s.id]; }));
        saveA(loadA().filter(function (s) { return !aids[s.id]; }));
        busy = false; timer = null;
        if (load().length || loadA().length) soon(2000);
      }, function () { busy = false; soon(60000); });
    } catch (e) { busy = false; }
  }

  function config(c) { try { for (var k in c) cfg[k] = c[k]; soon(500); } catch (e) {} }

  window.HMA = window.HMA || {};
  window.HMA.progress = { log: log, answer: answer, isTest: isTest, pendingAnswers: function () { return loadA().length; }, flush: flush, config: config, pending: function () { return load().length; } };
  try {
    window.addEventListener('online', function () { soon(1000); });
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); });
    soon(3000);
  } catch (e) {}
})();
