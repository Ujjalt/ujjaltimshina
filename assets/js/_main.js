/* ==========================================================================
   PROFESSIONAL MULTI-THEME SYSTEM
   Supports: light, dark, brown
   ========================================================================== */

/* --------------------------
   Determine saved theme
--------------------------- */
let determineThemeSetting = () => {
  let theme = localStorage.getItem("theme");
  return ["light", "dark", "brown", "system"].includes(theme)
    ? theme
    : "system";
};

/* --------------------------
   Detect system preference
--------------------------- */
const browserPref = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

/* --------------------------
   Compute actual theme in use
--------------------------- */
let determineComputedTheme = () => {
  let setting = determineThemeSetting();
  if (setting !== "system") return setting;
  return browserPref;
};

/* --------------------------
   Apply theme to the website
--------------------------- */
let setTheme = (theme) => {
  const chosen =
    theme ||
    localStorage.getItem("theme") ||
    $("html").attr("data-theme") ||
    browserPref;

  // update <html> attribute
  $("html").attr("data-theme", chosen);

  // update icon
  $("#theme-icon")
    .removeClass("fa-sun fa-moon fa-leaf")
    .addClass(
      chosen === "dark"
        ? "fa-moon"
        : chosen === "brown"
        ? "fa-leaf"
        : "fa-sun"
    );
};

/* --------------------------
   Toggle sequence
   light → dark → brown → light
--------------------------- */
let toggleTheme = () => {
  const current = determineComputedTheme();
  const next =
    current === "light"
      ? "dark"
      : current === "dark"
      ? "brown"
      : "light";

  localStorage.setItem("theme", next);
  setTheme(next);
};

/* ==========================================================================
   PLOTLY THEME HANDLING
   ========================================================================== */

import {
  plotlyDarkLayout,
  plotlyLightLayout,
  plotlyBrownLayout,
} from "./theme.js";

let plotlyElements = document.querySelectorAll("pre>code.language-plotly");

if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      plotlyElements.forEach((elem) => {
        let jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        const mode = determineComputedTheme();
        const template =
          mode === "dark"
            ? plotlyDarkLayout
            : mode === "brown"
            ? plotlyBrownLayout
            : plotlyLightLayout;

        jsonData.layout = jsonData.layout || {};
        jsonData.layout.template = {
          ...(template.layout.template || {}),
          ...(jsonData.layout.template || {}),
        };

        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }
  });
}

/* ==========================================================================
   PAGE LOAD ACTIONS
   ========================================================================== */

$(document).ready(function () {
  const scssLarge = 925;
  const scssMastheadHeight = 70;

  // Initial theme
  setTheme();

  // Auto-update when system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (localStorage.getItem("theme") === null) {
        setTheme(e.matches ? "dark" : "light");
      }
    });

  // Toggle button
  $("#theme-toggle").on("click", toggleTheme);

  // Sticky footer
  var bumpIt = function () {
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  };

  $(window).resize(function () {
    didResize = true;
  });

  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);

  var didResize = false;
  bumpIt();

  // FitVids (responsive videos)
  fitvids();

  // Author menu dropdown
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast");
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore menu on desktop resize
  jQuery(window).on("resize", function () {
    if (
      $(".author__urls.social-icons").css("display") == "none" &&
      $(window).width() >= scssLarge
    ) {
      $(".author__urls").css("display", "block");
    }
  });

  // Smooth scroll
  $("a").smoothScroll({
    offset: -scssMastheadHeight,
    preventDefault: false,
  });
});
