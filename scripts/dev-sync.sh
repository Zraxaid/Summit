#!/usr/bin/env bash
#
# Runs the site locally and keeps it in sync with the remote branch.
#
#   ./scripts/dev-sync.sh            # port 3000, syncs the current branch
#   PORT=5000 ./scripts/dev-sync.sh  # different port
#
# Leave it running. When new commits land on the branch, they are pulled in and
# Next.js hot-reloads the page in your browser. Ctrl-C stops everything.
#
# Local edits are never discarded: if the working tree is dirty, or the branch
# has diverged from the remote, the pull is skipped with a warning.

set -uo pipefail
cd "$(dirname "$0")/.."

PORT="${PORT:-3000}"
REMOTE="${REMOTE:-origin}"
INTERVAL="${INTERVAL:-10}"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"

bold() { printf '\033[1m%s\033[0m\n' "$1"; }
warn() { printf '\033[33m%s\033[0m\n' "$1"; }
info() { printf '\033[36m%s\033[0m\n' "$1"; }

command -v node >/dev/null 2>&1 || { warn "node is not installed — get it from https://nodejs.org (v20+)"; exit 1; }

bold "Summit — local dev"
echo "  branch:   $BRANCH"
echo "  tracking: $REMOTE/$BRANCH"
echo "  url:      http://localhost:$PORT"
echo

[ -d node_modules ] || { info "Installing dependencies (first run, takes a minute)…"; npm install; }

if [ ! -f .env.local ] && [ -f .env.example ]; then
  warn "No .env.local — lead submissions will log a warning and not be saved (Supabase/Resend not configured)."
  warn "See .env.example / README.md if you want that wired up. The site itself works fine without it."
fi

npx next dev -p "$PORT" &
DEV_PID=$!

cleanup() {
  echo
  info "Shutting down…"
  kill "$DEV_PID" 2>/dev/null
  wait "$DEV_PID" 2>/dev/null
  exit 0
}
trap cleanup INT TERM

# Poll the remote and fast-forward when there is something new.
while true; do
  sleep "$INTERVAL"
  kill -0 "$DEV_PID" 2>/dev/null || { warn "Dev server stopped."; exit 1; }

  git fetch --quiet "$REMOTE" "$BRANCH" 2>/dev/null || continue

  local_sha="$(git rev-parse HEAD)"
  remote_sha="$(git rev-parse FETCH_HEAD 2>/dev/null)" || continue
  [ "$local_sha" = "$remote_sha" ] && continue

  # Only move if the remote strictly contains what we have.
  if ! git merge-base --is-ancestor "$local_sha" "$remote_sha" 2>/dev/null; then
    warn "Branch has diverged from $REMOTE/$BRANCH — skipping auto-pull. Resolve by hand."
    continue
  fi

  if [ -n "$(git status --porcelain)" ]; then
    warn "You have uncommitted changes — skipping auto-pull so nothing is lost."
    continue
  fi

  lock_before="$(git rev-parse HEAD:package-lock.json 2>/dev/null || true)"
  info "New changes — updating…"
  git merge --ff-only "$remote_sha" --quiet || { warn "Pull failed."; continue; }
  lock_after="$(git rev-parse HEAD:package-lock.json 2>/dev/null || true)"

  if [ "$lock_before" != "$lock_after" ]; then
    info "Dependencies changed — installing…"
    npm install
  fi

  git --no-pager log --oneline "$local_sha..$remote_sha" | sed 's/^/  /'
  info "Updated. Your browser should refresh on its own."
done
