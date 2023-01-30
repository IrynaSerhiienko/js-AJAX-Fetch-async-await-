(function () {
  let themeToggle = document.querySelector(".themetoggle");
  let html = document.querySelector("html");
  let icon = document.querySelector(".material-symbols-outlined");

  themeToggle.addEventListener("click", (event) => {
    event.preventDefault();
    if (localStorage.getItem("theme") === "dark") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", "dark");
    }
    addDarkClassToHTML();
  });

  function addDarkClassToHTML() {
    try {
      if (localStorage.getItem("theme") === "dark") {
        html.classList.add("dark");
        icon.textContent = "dark_mode";
        // themeToggle.textContent = "wb_sunny";
      } else {
        html.classList.remove("dark");
        icon.textContent = "wb_sunny";
      }
    } catch (err) {}
  }

  addDarkClassToHTML();
})();
