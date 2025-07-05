const githubBtns = document.querySelectorAll(".github-btn");

const ghBtnsArray = Array.from(githubBtns);

ghBtnsArray.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    // Stop event form bubbling up and triggering the link tag default behavior
    e.preventDefault();
    e.stopPropagation();

    const url = e.target?.dataset?.url || "";

    if (url) {
      window.open(url);
    }
  });
});

const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

if (isTouchDevice()) {
  const projects = document.querySelectorAll(".project");

  const projectsArray = Array.from(projects);

  const handleProjectInView = () => {
    projectsArray.forEach((p) => {
      const rect = p.getBoundingClientRect();
      const top = rect.top;
      const bottom = rect.bottom;
      const windowHeight = window.innerHeight;

      if (top < windowHeight / 2 && bottom > windowHeight / 2) {
        p.classList.add("transform");
      } else {
        p.classList.remove("transform");
      }
    });
  };

  window.addEventListener("scroll", handleProjectInView);
}

const enableShare = (div) => {
  if (!div) return;

  div.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    const url = div.getAttribute("data-shareURL");
    if (!url) {
      console.error("No data-shareURL attribute found on div.");
      return;
    }

    if (navigator.share) {
      navigator
        .share({
          title: document.title,
          url: url,
        })
        .catch((err) => console.error("Share failed:", err));
    } else {
      const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}`;
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
  });
};

const shareBtns = document.querySelectorAll(".share-btn-container");
const shareBtnsArray = Array.from(shareBtns);

shareBtns.forEach((b) => {
  enableShare(b);
});
