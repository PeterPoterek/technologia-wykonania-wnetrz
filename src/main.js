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

  // Wait for the transition effect to complete
  setTimeout(function () {
    window.location.href = url;
  }, 300);
}

document.querySelector(".header__title").onclick = function (event) {
  event.preventDefault();
  smoothPageTransition("index.html");
};

//Toggle images in gallery to fullscreen when clicked
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
