// Progressive enhancement: no script or reduced motion means all content stays visible.
(() => {
  if (
    !("IntersectionObserver" in window) ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;

  const elements = [...document.querySelectorAll("[data-reveal]")];
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
  );

  // Do not hide anything already visible when the page loads.
  const visible = (el) => el.getBoundingClientRect().top < window.innerHeight;
  elements.forEach((el) => {
    if (visible(el)) el.classList.add("is-visible");
  });
  document.documentElement.classList.add("motion-ready");
  elements.forEach((el) => {
    if (!el.classList.contains("is-visible")) observer.observe(el);
  });
})();
