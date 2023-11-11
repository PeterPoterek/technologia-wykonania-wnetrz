// Scroll to section
function scrollToSection(sectionId, offset) {
  const section = document.getElementById(sectionId);
  const offsetAmount = offset || 150;
  const options = {
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  };
  window.scrollTo({
    top: section.offsetTop - offsetAmount,
    ...options,
  });
}
//Smoth page transition
function smoothPageTransition(url) {
  document.body.classList.add("page-transition");

  setTimeout(function () {
    window.location.href = url;
  }, 300);
}
if (window.location.pathname.includes("gallery.html")) {
  document.querySelector(".header__title").onclick = function (event) {
    event.preventDefault();
    smoothPageTransition("index.html");
  };
} else if (window.location.pathname.includes("index.html")) {
  document.querySelector(".header__logo").onclick = function () {
    scrollToSection("welcome");
  };
}

//Handle gallery click
const images = document.querySelectorAll(".gallery__item");

images.forEach((image) => {
  image.addEventListener("click", toggleFullscreen);
});

function toggleFullscreen(event) {
  const image = event.target;
  image.classList.toggle("fullscreen");
}

//lazy loading
const lazyImages = document.querySelectorAll(".lazy");
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("loading");
      img.classList.add("loaded");
      observer.unobserve(img);
    }
  });
});

lazyImages.forEach((img) => {
  observer.observe(img);
});

// mobile menu
(() => {
  const mobileMenu = document.querySelector("#mobile-menu");
  const openMenuBtn = document.querySelector("#mobile-open");
  const closeMenuBtn = document.querySelector("#mobile-close");
  const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");

  const toggleMenu = () => {
    const isMenuOpen = openMenuBtn.getAttribute("aria-expanded") === "true" || false;
    openMenuBtn.setAttribute("aria-expanded", !isMenuOpen);
    mobileMenu.classList.toggle("is-open");

    if (isMenuOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const closeMoblieMenu = () => {
    mobileMenu.classList.remove("is-open");
    openMenuBtn.setAttribute("aria-expanded", false);
    document.body.style.overflow = "auto";
  };

  openMenuBtn.addEventListener("click", toggleMenu);
  closeMenuBtn.addEventListener("click", toggleMenu);

  console.dir(mobileMenu);
  console.dir(openMenuBtn);
  console.dir(closeMenuBtn);
  console.dir(mobileMenuLinks);

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMoblieMenu);
  });

  window.matchMedia("(min-width: 768px)").addEventListener("change", (e) => {
    if (!e.matches) return;
    mobileMenu.classList.remove("is-open");
    openMenuBtn.setAttribute("aria-expanded", false);

    document.body.style.overflow = "auto";
  });
})();
