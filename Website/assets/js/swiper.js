var swiper = new Swiper(".main-page", {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
        delay: 5000, // Set the delay to 5000 milliseconds (5 seconds)
        disableOnInteraction: false, // Allow manual interaction (click/drag) to stop autoplay
      },
  });