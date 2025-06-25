document.addEventListener("DOMContentLoaded", () => {
  console.log("Sitio VISTA QA cargado correctamente.");
});

const toggleLang = document.querySelector('.toggle-lang');
const toggleMode = document.querySelector('.toggle-mode');
let currentLang = 'es';

toggleLang.addEventListener('click', () => {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  document.querySelectorAll('[data-es]').forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
  toggleLang.textContent = currentLang === 'es' ? 'English' : 'Español';
});

toggleMode.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleMode.textContent = document.body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';

  // Cambiar clases de títulos y tarjetas
  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(title => {
    title.classList.toggle('dark-mode');
  });

  document.querySelectorAll('.card').forEach(card => {
    card.classList.toggle('dark-mode');
  });
});


    document.addEventListener("DOMContentLoaded", function() {
      fetch('translations.json')
        .then(response => response.json())
        .then(translations => {
          const lang = 'es'; // Change to 'en' for English
          
          document.getElementById('page-title').innerText = translations[lang].mainTitle;
          document.getElementById('main-description').innerText = translations[lang].mainDescription;
          document.getElementById('cta-button').innerText = translations[lang].ctaButton;
          document.getElementById('nav-home').innerText = translations[lang].nav.home;
          document.getElementById('why-vista-title').innerText = translations[lang].sections.why_vista_title;
          document.getElementById('why-vista-p1').innerText = translations[lang].sections.why_vista_p1;
          document.getElementById('impact-title').innerText = translations[lang].sections.impact_title;
          document.getElementById('impact-p').innerText = translations[lang].sections.impact_p;
          document.getElementById('community-title').innerText = translations[lang].sections.community_title;
          document.getElementById('community-p').innerText = translations[lang].sections.community_p;
        })
        .catch(error => console.error('Error loading translations:', error));
    });