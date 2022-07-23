import '../css/particles.scss';

const $fireParticles = document.getElementById('fire-particles');

for (let i = 0; i < 25; i++) {
  $fireParticles.appendChild(document.createElement('div'));
}

const $ssPreview = document.querySelector('#screenshotPreview');
const $ssImageContainer = document.querySelector(
  '#screenshotPreview .screenshotPreview__image',
);
const $ssPrevButton = document.querySelector('#screenshotPreview #btnPrev');
const $ssNextButton = document.querySelector('#screenshotPreview #btnNext');
const $ssCloseButton = document.querySelector('#screenshotPreview #btnClose');

const $ssThumbs = document.querySelectorAll('.screenshots .content img');
const ssThumbs = Array.from($ssThumbs).map((i) => i.src);
const ssImages = ssThumbs.map((i) => i.replace('thumb-', 'screenshot-'));

// preload images
const $ssImages = ssImages.map((src) => {
  const img = new Image();
  img.src = src;
  $ssImageContainer.appendChild(img);
  return img;
});

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
