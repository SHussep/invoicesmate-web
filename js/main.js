const themeButton = document.querySelector(".theme-toggle");
const systemTheme = matchMedia("(prefers-color-scheme: dark)");
function isDark() {
  return (
    (document.documentElement.dataset.theme ||
      (systemTheme.matches ? "dark" : "light")) === "dark"
  );
}
function updateThemeLabel() {
  if (themeButton)
    themeButton.setAttribute(
      "aria-label",
      `Switch to ${isDark() ? "light" : "dark"} theme`,
    );
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", isDark() ? "#101722" : "#f7f9fc");
}
if (themeButton) {
  themeButton.hidden = false;
  themeButton.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("invoice-mate-theme", next);
    } catch (_) {}
    updateThemeLabel();
  });
}
systemTheme.addEventListener("change", updateThemeLabel);
updateThemeLabel();
const menuButton = document.getElementById("navToggle");
const menu = document.getElementById("navLinks");
if (menuButton && menu) {
  menuButton.hidden = false;
  document.documentElement.classList.add("has-menu");
  const closeMenu = () => {
    menu.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  };
  menuButton.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      closeMenu();
      menuButton.focus();
    }
  });
}
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectTab(tab) {
  tabs.forEach((t) => {
    const active = t === tab;
    t.setAttribute("aria-selected", String(active));
    t.tabIndex = active ? 0 : -1;
    document.getElementById(t.getAttribute("aria-controls")).hidden = !active;
  });
}
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (e) => {
    let next;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (i - 1 + tabs.length) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      e.preventDefault();
      selectTab(tabs[next]);
      tabs[next].focus();
    }
  });
});
const lightbox = document.querySelector(".lightbox");
if (lightbox) {
  document.querySelectorAll(".screen-zoom").forEach((button) =>
    button.addEventListener("click", () => {
      const image = lightbox.querySelector("img");
      image.src = button.dataset.image;
      image.alt = button.querySelector("img").alt;
      lightbox.showModal();
    }),
  );
  lightbox
    .querySelector("button")
    .addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });
}
