'use strict';

// Two ways to reach the owner, both to the owner only: a phone push through ntfy (topic from the environment, text kept generic)
// and one email through Resend to OWNER_EMAIL. No tracking pixel, no link wrapping. A missing setting is reported, never faked.

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

function inboxUrl(env) {
  if (env.INBOX_URL) return env.INBOX_URL.replace(/\/$/, '');
  if (env.VERCEL_PROJECT_PRODUCTION_URL) return 'https://' + env.VERCEL_PROJECT_PRODUCTION_URL;
  return '';
}

async function push(env, o, fetchImpl) {
  const f = fetchImpl || fetch;
  if (!env.NTFY_TOPIC) return { sent: false, why: 'NTFY_TOPIC not set' };
  const server = (env.NTFY_SERVER || 'https://ntfy.sh').replace(/\/$/, '');
  const headers = { Title: String(o.title || 'Growth Desk').slice(0, 80), Priority: o.priority || 'default', Tags: o.tags || 'mailbox' };
  if (o.click) headers.Click = o.click;
  const r = await f(server + '/' + encodeURIComponent(env.NTFY_TOPIC), { method: 'POST', headers: headers, body: String(o.message || '').slice(0, 300) });
  return { sent: r.ok, status: r.status };
}

async function email(env, o, fetchImpl) {
  const f = fetchImpl || fetch;
  if (!env.RESEND_API_KEY || !env.PRO_MAIL_FROM || !env.OWNER_EMAIL) return { sent: false, why: 'RESEND_API_KEY, PRO_MAIL_FROM or OWNER_EMAIL not set' };
  const addr = (/<([^>]+)>/.exec(env.PRO_MAIL_FROM) || [null, env.PRO_MAIL_FROM])[1];
  const link = o.link ? '<p><a href="' + esc(o.link) + '">Open in inbox</a></p>' : '';
  const html = '<div style="font:16px/1.5 -apple-system,Segoe UI,sans-serif;max-width:640px">' + String(o.text || '').split(/\n{2,}/).map((p) => '<p>' + esc(p).replace(/\n/g, '<br>') + '</p>').join('') + link + '</div>';
  const r = await f('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: 'Growth Desk <' + addr + '>', to: [env.OWNER_EMAIL], subject: String(o.subject || 'Growth Desk').slice(0, 150), html: html, text: String(o.text || '') + (o.link ? '\n\nOpen in inbox: ' + o.link : '') })
  });
  return { sent: r.ok, status: r.status };
}

module.exports = { push, email, inboxUrl, esc };
