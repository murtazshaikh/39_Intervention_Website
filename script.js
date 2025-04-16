/////////////////////////////// navbar ////////////////////////////////////////
let MenuItems = document.getElementById("MenuItems");
MenuItems.style.maxHeight = "0px";

function menutoggle() {
  if (MenuItems.style.maxHeight == "0px") {
    MenuItems.style.maxHeight = "200px";
  } else {
    MenuItems.style.maxHeight = "0px";
  }
}


//////////////////////////////  slider ///////////////////////////////////////

const carousel = document.querySelector('.carousel')
const slider = carousel.querySelector('.carousel_track')
let slides = [...slider.children]

// Initial slides position, so user can go from first to last slide (click to the left first)
slider.prepend(slides[slides.length - 1])

// Creating dot for each slide
const createDots = (carousel, initSlides) => {
  const dotsContainer = document.createElement('div')
  dotsContainer.classList.add('carousel_nav')

  initSlides.forEach((slide, index) => {
    const dot = document.createElement('button')
    dot.type = 'button'
    dot.classList.add('carousel_dot')
    dot.setAttribute('aria-label', `Slide number ${index + 1}`)
    slide.dataset.position = index
    slide.classList.contains('is-selected') && dot.classList.add('is-selected')
    dotsContainer.appendChild(dot)
  })

  carousel.appendChild(dotsContainer)

  return dotsContainer
}

// Updating relevant dot
const updateDot = slide => {
  const currDot = dotNav.querySelector('.is-selected')
  const targetDot = slide.dataset.position

  currDot.classList.remove('is-selected')
  dots[targetDot].classList.add('is-selected')
}

// Handling arrow buttons
const handleArrowClick = arrow => {
  arrow.addEventListener('click', () => {
    slides = [...slider.children]
    const currSlide = slider.querySelector('.is-selected')
    currSlide.classList.remove('is-selected')
    let targetSlide

    if (arrow.classList.contains('jsPrev')) {
      targetSlide = currSlide.previousElementSibling
      slider.prepend(slides[slides.length - 1])
    }

    if (arrow.classList.contains('jsNext')) {
      targetSlide = currSlide.nextElementSibling
      slider.append(slides[0])
    }

    targetSlide.classList.add('is-selected')
    updateDot(targetSlide)
  })
}

const buttons = carousel.querySelectorAll('.carousel_btn')
buttons.forEach(handleArrowClick)

// Handling dot buttons
const handleDotClick = dot => {
  const dotIndex = dots.indexOf(dot)
  const currSlidePos = slider.querySelector('.is-selected').dataset.position
  const targetSlidePos = slider.querySelector(`[data-position='${dotIndex}']`).dataset.position

  if (currSlidePos < targetSlidePos) {
    const count = targetSlidePos - currSlidePos
    for (let i = count; i > 0; i--) nextBtn.click()
  }

  if (currSlidePos > targetSlidePos) {
    const count = currSlidePos - targetSlidePos
    for (let i = count; i > 0; i--) prevBtn.click()
  }
}

const dotNav = createDots(carousel, slides)
const dots = [...dotNav.children]
const prevBtn = buttons[0]
const nextBtn = buttons[1]

dotNav.addEventListener('click', e => {
  const dot = e.target.closest('button')
  if (!dot) return
  handleDotClick(dot)
})


////////////////////////////// video ////////////////////////////////////////

function playVideo() {
  const section = document.getElementById('videoSection');
  section.innerHTML = `
    <video autoplay controls>
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Your browser does not support HTML video.
    </video>
    <div class="cta">GET AN <span>INTERVENTION</span></div>
  `;
}

/////////////////////////////// modal ////////////////////////////////////////

function openModal() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("popupVideo");
  modal.classList.add("active");
  video.currentTime = 0;
  video.play();
}

function closeModal() {
  const modal = document.getElementById("videoModal");
  const video = document.getElementById("popupVideo");
  video.pause();
  modal.classList.remove("active");
}

function overlayClick(event) {
  closeModal();
}


//////////////////////////////// select /////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  const countries = [
    "United States", "Canada", "United Kingdom", "Germany", "France", "India", "Australia",
    "Brazil", "Japan", "South Korea", "South Africa", "Italy", "Spain", "Netherlands", "Mexico"
  ];

  const selectMate = document.querySelector(".select_mate");
  const nativeSelect = selectMate.querySelector("select");
  const selectedDisplay = selectMate.querySelector(".selecionado_opcion");
  const icon = selectMate.querySelector(".icon_select_mate");
  const optionsContainer = selectMate.querySelector(".cont_select_int");

  // 1. Clear default <option> (except placeholder) and populate dynamically
  nativeSelect.innerHTML = `<option value="">Country</option>`;
  countries.forEach((country, index) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    nativeSelect.appendChild(option);
  });

  // 2. Populate custom dropdown
  countries.forEach((country, index) => {
    const li = document.createElement("li");
    li.textContent = country;
    li.dataset.value = country;
    li.addEventListener("click", () => {
      selectedDisplay.textContent = country;
      nativeSelect.selectedIndex = index + 1; // +1 because placeholder is index 0
      nativeSelect.dispatchEvent(new Event("change"));
      closeDropdown();
    });
    optionsContainer.appendChild(li);
  });

  // 3. Open dropdown function
  window.open_select = function () {
    const isOpen = selectMate.getAttribute("data-selec-open") === "true";
    isOpen ? closeDropdown() : openDropdown();
  };

  function openDropdown() {
    selectMate.setAttribute("data-selec-open", "true");
    const totalHeight = Array.from(optionsContainer.children)
      .map((li) => li.offsetHeight)
      .reduce((sum, h) => sum + h, 0);
    optionsContainer.style.height = totalHeight + "px";
    icon.style.transform = "rotate(180deg)";
  }

  function closeDropdown() {
    selectMate.setAttribute("data-selec-open", "false");
    optionsContainer.style.height = "0px";
    icon.style.transform = "rotate(0deg)";
  }

  document.addEventListener("click", (e) => {
    if (!selectMate.contains(e.target)) {
      closeDropdown();
    }
  });

  // Set default display
  selectedDisplay.textContent = nativeSelect.options[0].textContent;
});


/////////////////////////////// form /////////////////////////////////////////

document.querySelector(".contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("business-email").value.trim();
  const company = document.getElementById("company").value.trim();
  const country = document.querySelector(".select_mate select").value;

  if (!firstName || !lastName || !email || !company || !country) {
    alert("Please fill in all fields and select a country.");
    return;
  }

  // Redirect to thank you page
  window.location.href = "thankyou.html";
});


// Clear form on page load (in case browser restores cached values)
window.addEventListener("pageshow", function (event) {
  if (event.persisted || performance.getEntriesByType("navigation")[0].type === "back_forward") {
    const form = document.querySelector(".contact-form");
    if (form) {
      form.reset();
      // Reset custom country select too
      document.querySelector(".select_mate select").selectedIndex = 0;
      document.querySelector(".selecionado_opcion").textContent = "Country";
    }
  }
});

