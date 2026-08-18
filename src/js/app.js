function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; samesite=lax`;
}

function toggleDarkTheme() {
  const nextTheme = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", nextTheme);
  setCookie("theme", nextTheme, 365);
}

function updateScrollProgress() {
  const scrollEl = document.documentElement;
  const scrolledRatio = scrollEl.scrollTop / (scrollEl.scrollHeight - scrollEl.clientHeight || 1);
  const progressBar = document.querySelector(".scroll-nav-effect");
  if (progressBar) progressBar.style.width = `${scrolledRatio * 100}%`;
}

function setCopyIconState(button, state) {
  button.querySelectorAll("[data-copy-icon]").forEach((icon) => {
    icon.hidden = icon.dataset.copyIcon !== state;
  });
}

async function copyCodeBlock(button) {
  const code = button.closest(".code-block")?.querySelector("code");
  if (!code) return;

  try {
    await navigator.clipboard.writeText(code.textContent.trim());
    setCopyIconState(button, "done");
  } catch {
    setCopyIconState(button, "error");
  } finally {
    setTimeout(() => setCopyIconState(button, "idle"), 1500);
  }
}

function toggleCommentsVisibility(button, list) {
  const isHidden = list.hasAttribute("hidden");
  list.toggleAttribute("hidden", !isHidden);
  button.textContent = isHidden ? "بستن نظرات" : "مشاهده نظرات";
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("[data-theme-toggle]")?.addEventListener("click", toggleDarkTheme);

  window.addEventListener("scroll", updateScrollProgress, { passive: true });

  document.querySelectorAll("[data-copy-code]").forEach((button) => {
    button.addEventListener("click", () => copyCodeBlock(button));
  });

  const commentsToggle = document.querySelector("[data-comments-toggle]");
  const commentsList = document.querySelector("[data-comments-list]");
  commentsToggle?.addEventListener("click", () => toggleCommentsVisibility(commentsToggle, commentsList));

  document.querySelector("[data-comment-form]")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const notice = document.querySelector("[data-comment-notice]");
    if (notice) notice.hidden = false;
  });
});
