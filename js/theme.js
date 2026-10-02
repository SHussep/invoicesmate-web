// Apply appearance before first paint. Storage may be disabled in private browsing.
try {
  const saved = localStorage.getItem("invoice-mate-theme");
  if (saved === "light" || saved === "dark")
    document.documentElement.dataset.theme = saved;
} catch (_) {}
