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
