import '../css/particles.scss';

const $fireParticles = document.getElementById('fire-particles');

for (let i = 0; i < 25; i++) {
  $fireParticles.appendChild(document.createElement('div'));
}

const $headerMenu = document.querySelector('.header__menu');
const $headerMenuLinks = document.querySelectorAll('.header__menu a');
let isMenuVisible = false;

for (let $headerMenuLink of $headerMenuLinks) {
  $headerMenuLink.addEventListener('click', () => {
    isMenuVisible = false;
    updateMenuVisibility();
  });
}

function updateMenuVisibility() {
  if (isMenuVisible) {
    $headerMenu.classList.add('visible');
  } else {
    $headerMenu.classList.remove('visible');
  }
}

let vw,
  vwh,
  mx = 0;
const $prxImages = document.querySelectorAll('[data-parallax-x]');
const prxImages = [];
for (let $prxImage of $prxImages) {
  prxImages.push({
    $el: $prxImage,
    px: Number($prxImage.getAttribute('data-parallax-x')),
    pAlign: $prxImage.getAttribute('data-parallax-align'),
  });
}

window.addEventListener('resize', handleWindowResize);
document.addEventListener('mousemove', handleDocumentMouseMove);

function handleWindowResize() {
  const ratio = mx / vw;
  vw = window.innerWidth;
  vwh = vw * 0.5;
  handleDocumentMouseMove({ clientX: ratio * vw });
}

function handleDocumentMouseMove(event) {
  const { clientX } = event;
  mx = clientX;
  const len = prxImages.length;
  let prxImage;
  let x, ox, px;
  for (let i = 0; i < len; i++) {
    prxImage = prxImages[i];
    ox = 0;
    if (prxImage.pAlign) {
      px = prxImage.px * 0.005 * vw * 1;
      if (prxImage.pAlign === 'all' || prxImage.pAlign.includes('w')) {
        ox = -px;
      } else if (prxImage.pAlign === 'all' || prxImage.pAlign.includes('e')) {
        ox = px;
      }
    }
    x = ox + prxImage.px * 0.005 * (clientX - vwh);
    prxImage.$el.style.transform = `translate(${x}px, 0)`;
  }
}

handleWindowResize();

const $ssPreview = document.querySelector('#screenshotPreview');
const $ssPrevButton = document.querySelector('#screenshotPreview #btnPrev');
const $ssNextButton = document.querySelector('#screenshotPreview #btnNext');
const $ssCloseButton = document.querySelector('#screenshotPreview #btnClose');

const $ssThumbs = document.querySelectorAll('.about .content img');
const ssThumbs = Array.from($ssThumbs).map((i) => i.src);
const $ssImages = document.querySelectorAll('.screenshotPreview__image img');

const ssLen = ssThumbs.length;
let ssIndex = null;

for (let $ssThumb of $ssThumbs) {
  $ssThumb.addEventListener('click', () => {
    ssIndex = ssThumbs.indexOf($ssThumb.src);
    previewScreenshot();
  });
}

$ssPrevButton.addEventListener('click', () => {
  if (--ssIndex < 0) ssIndex = ssLen - 1;
  previewScreenshot();
});

$ssNextButton.addEventListener('click', () => {
  if (++ssIndex >= ssLen) ssIndex = 0;
  previewScreenshot();
});

$ssCloseButton.addEventListener('click', () => {
  ssIndex = null;
  previewScreenshot();
});

function setScreenshotImage(index) {
  $ssImages.forEach(($image, i) => {
    if (index === i) {
      $image.classList.add('visible');
    } else {
      $image.classList.remove('visible');
    }
  });
}

function previewScreenshot() {
  if (ssIndex !== null && ssIndex >= 0 && ssIndex < ssLen) {
    setScreenshotImage(ssIndex);
    $ssPreview.classList.add('visible');
  } else {
    $ssPreview.classList.remove('visible');
    setScreenshotImage(null);
  }
}
