(() => {
  const key = "garden-theme";
  const system = matchMedia("(prefers-color-scheme: dark)");
  const valid = (value) =>
    ["light", "dark"].includes(value) ? value : "system";
  let preference = "system";
  try {
    preference = valid(localStorage.getItem(key));
  } catch {}
  function apply() {
    const theme =
      preference === "system"
        ? system.matches
          ? "dark"
          : "light"
        : preference;
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#1c211e" : "#f5f6f0");
    const select = document.querySelector("#theme-preference");
    if (select) select.value = preference;
  }
  apply();
  system.addEventListener("change", apply);
  window.addEventListener("storage", (event) => {
    if (event.key === key || event.key === null) {
      preference = valid(event.newValue);
      apply();
    }
  });
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      const select = document.querySelector("#theme-preference");
      if (!select) return;
      select.value = preference;
      select.closest("[data-theme-control]").hidden = false;
      select.addEventListener("change", () => {
        preference = valid(select.value);
        try {
          if (preference === "system") localStorage.removeItem(key);
          else localStorage.setItem(key, preference);
        } catch {}
        apply();
      });
    },
    { once: true },
  );
})();
