//--------------------------swiper--------------------------------------

/*

3D Carousel images gallery. inspired from David DeSandro's tutorial (https://3dtransforms.desandro.com/)

*/

window.addEventListener(
  'load',
  function () {
    carouselRUN();
  },
  false
);

function carouselRUN() {
  let carousel = document.getElementById('carousel');
  let scene = document.getElementById('scene');
  let carousel_items_Arrey = document.getElementsByClassName('carousel__item');
  let carousel_btn = document.getElementById('carousel__btn');
  let n = carousel_items_Arrey.length;
  let curr_carousel_items_Arrey = 0;
  let theta = (Math.PI * 2) / n;
  let interval = null;
  let autoCarousel = carousel.dataset.auto;

  setupCarousel(n, parseFloat(getComputedStyle(carousel_items_Arrey[0]).width));
  window.addEventListener(
    'resize',
    function () {
      clearInterval(interval);
      setupCarousel(
        n,
        parseFloat(getComputedStyle(carousel_items_Arrey[0]).width)
      );
    },
    false
  );
  setupNavigation();

  function setupCarousel(n, width) {
    let apothem = width / (2 * Math.tan(Math.PI / n));
    scene.style.transformOrigin = `50% 50% ${-apothem}px`;

    for (let i = 1; i < n; i += 1) {
      carousel_items_Arrey[i].style.transformOrigin = `50% 50% ${-apothem}px`;
      carousel_items_Arrey[i].style.transform = `rotateY(${i * theta}rad)`;
    }

    if (autoCarousel === 'true') {
      setCarouselInterval();
    }
  }

  function setCarouselInterval() {
    interval = setInterval(function () {
      curr_carousel_items_Arrey++;
      scene.style.transform = `rotateY(${
        curr_carousel_items_Arrey * -theta
      }rad)`;
    }, 10000);
  }

  function setupNavigation() {
    carousel_btn.addEventListener(
      'click',
      function (e) {
        e.stopPropagation();
        let target = e.target;

        if (target.classList.contains('next')) {
          curr_carousel_items_Arrey++;
        } else if (target.classList.contains('prev')) {
          curr_carousel_items_Arrey--;
        }
        clearInterval(interval);
        scene.style.transform = `rotateY(${
          curr_carousel_items_Arrey * -theta
        }rad)`;

        if (autoCarousel === 'true') {
          setTimeout(setCarouselInterval(), 3000);
        }
      },
      true
    );
  }
}
