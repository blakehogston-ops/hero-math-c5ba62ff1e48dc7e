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
  var KEY = 'hma_progress_queue_v1', MAX = 500, busy = false, timer = null;
  var cfg = window.HMA_PROGRESS || {};
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
        venom: String(s.venom || '').slice(0, 30)
      });
      save(q);
      soon(1500);
    } catch (e) {}
  }

  function soon(ms) { try { clearTimeout(timer); timer = setTimeout(flush, ms); } catch (e) {} }

  function flush() {
    try {
      if (busy || !cfg.url || !cfg.token) return;
      if (navigator.onLine === false) return;
      var q = load(); if (!q.length) return;
      var batch = q.slice(0, 50), ids = {};
      batch.forEach(function (s) { ids[s.id] = 1; });
      busy = true;
      // text/plain = "simple" CORS request (no preflight); no-cors since Apps Script
      // redirects. We can't read the reply, so remove only after fetch resolves;
      // the script de-dupes by session id, so a resend is harmless.
      fetch(cfg.url, {
        method: 'POST', mode: 'no-cors', keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ token: cfg.token, sessions: batch })
      }).then(function () {
        save(load().filter(function (s) { return !ids[s.id]; }));
        busy = false;
        if (load().length) soon(2000);
      }, function () { busy = false; soon(60000); });
    } catch (e) { busy = false; }
  }

  function config(c) { try { for (var k in c) cfg[k] = c[k]; soon(500); } catch (e) {} }

  window.HMA = window.HMA || {};
  window.HMA.progress = { log: log, flush: flush, config: config, pending: function () { return load().length; } };
  try {
    window.addEventListener('online', function () { soon(1000); });
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); });
    soon(3000);
  } catch (e) {}
})();
