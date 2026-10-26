#!/bin/zsh
# One-time setup of the three values only you can supply. Nothing you type is shown or stored anywhere but in Vercel (as sensitive variables).
# Run from the inbox folder:  ./setup-secrets.sh
cd "$(dirname "$0")" || exit 1
vc() { npx --yes vercel@latest "$@"; }

echo "1/3  Choose the inbox passphrase (12+ characters; it is the only way into the inbox)."
read -s "p?Passphrase: "; echo
if [ ${#p} -lt 12 ]; then echo "Too short. Run again."; exit 1; fi
printf %s "$p" | vc env add INBOX_PASSPHRASE production --sensitive --force --scope cited1 >/dev/null && echo "  saved" || { echo "  FAILED"; exit 1; }
unset p

echo "2/3  Resend API key for the daily email to your own address (Enter to skip; the phone push works without it)."
read -s "k?Resend API key: "; echo
if [ -n "$k" ]; then
  printf %s "$k" | vc env add RESEND_API_KEY production --sensitive --force --scope cited1 >/dev/null && echo "  saved"
  echo "3/3  Sender address, for example: Citehound <reports@mail.getcitehound.com> (same as PRO_MAIL_FROM in the citehound project)."
  read "f?From: "
  printf %s "$f" | vc env add PRO_MAIL_FROM production --force --scope cited1 >/dev/null && echo "  saved"
else echo "  skipped"; fi
unset k f

echo "Deploying..."
vc deploy --prod --yes --scope cited1 2>&1 | grep -E 'Production|Aliased|error' 
echo "Done. Open https://growth-inbox.vercel.app and enter your passphrase."
