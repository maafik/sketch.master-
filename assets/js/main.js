/**
* Template Name: PhotoFolio
* Template URL: https://bootstrapmade.com/photofolio-bootstrap-photography-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 1000);
      setTimeout(() => {
        preloader.remove();
      }, 2000);
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();

// Функция для открытия формы
function openForm() {
  document.getElementById('formOverlay').style.display = 'flex';
  history.pushState(null, '', location.href); // Добавляем в историю браузера
}

// Функция для перехода ко второму шагу
function nextForm() {
  document.getElementById('formOverlay').style.display = 'none';
  document.getElementById('nextFormOverlay').style.display = 'flex';
}

// Функция для закрытия формы
function closeForm() {
  document.getElementById('formOverlay').style.display = 'none';
  document.getElementById('nextFormOverlay').style.display = 'none';
  document.getElementById('thankYouOverlay').style.display = 'none';
}

// Закрытие формы при клике на фон
function closeOnBackground(event) {
  if (event.target.classList.contains('overlay')) {
    closeForm();
  }
}

// Закрытие формы при нажатии клавиши Escape
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeForm();
  }
});

// Перехват кнопки "Назад" браузера
window.addEventListener('popstate', function (event) {
  closeForm(); // При нажатии кнопки "Назад" скрываем форму
});

// Отправка формы
async function submitForm(event) {
  event.preventDefault();

  const formData = new FormData(document.getElementById('orderForm'));

  // Ваши действия для отправки в Telegram
  const message = `
    Новый заказ:
    Имя: ${formData.get('name')}
    Тип заказа: ${formData.get('orderType')}
    Телефон: ${formData.get('phone')}
    Контакт: ${formData.get('contactPref')}
    Описание работы: ${formData.get('workDescription')}
  `;
  const files = formData.getAll('examplePhoto');
  const chatId = '5929919501';
  const token = '7349206398:AAEthCsuxGhjdrvUOnFwFD478q7y474kRMM';

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });

  for (const file of files) {
    const fileFormData = new FormData();
    fileFormData.append('chat_id', chatId);
    fileFormData.append('document', file);

    await fetch(`https://api.telegram.org/bot${token}/sendDocument`, {
      method: 'POST',
      body: fileFormData,
    });
  }

  // Показываем сообщение об успехе
  document.getElementById('nextFormOverlay').style.display = 'none';
  document.getElementById('thankYouOverlay').style.display = 'flex';
}

// Для кнопки Telegram
document.getElementById('telegramLink').addEventListener('click', function () {
  ym(99130561, 'reachGoal', 'telegram_click');
});

// Для кнопки WhatsApp
document.getElementById('whatsappLink').addEventListener('click', function () {
  ym(99130561, 'reachGoal', 'whatsapp_click');
});