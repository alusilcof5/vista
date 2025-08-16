// Estado de la aplicación
    let currentLang = 'es';
    let isDarkMode = false;
    let translations = {};

    // Referencias DOM
    const toggleLang = document.querySelector('.toggle-lang');
    const toggleMode = document.querySelector('.toggle-mode');
    const body = document.body;

    // Función para cargar traducciones desde JSON
    async function loadTranslations() {
      try {
        const response = await fetch('./translations.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
        console.log('Translations loaded successfully');
        return true;
      } catch (error) {
        console.error('Error loading translations:', error);
        // Fallback translations in case JSON file is not available
        translations = {
          es: {
            hero: {
              title: "VISTA QA: Calidad Inclusiva, Software para Todos",
              description: "Un marco que prioriza la accesibilidad digital en QA garantizando software conforme a estándares globales.",
              cta: "Explora Componentes"
            },
            buttons: {
              english: "English",
              darkMode: "Modo Oscuro",
              lightMode: "Modo Claro"
            },
            footer: {
              copyright: "© 2025 VISTA QA. Todos los derechos reservados."
            }
          },
          en: {
            hero: {
              title: "VISTA QA: Inclusive Quality, Software for Everyone",
              description: "A framework that prioritizes digital accessibility in QA, ensuring globally compliant software.",
              cta: "Explore Components"
            },
            buttons: {
              english: "Español",
              darkMode: "Dark Mode",
              lightMode: "Light Mode"
            },
            footer: {
              copyright: "© 2025 VISTA QA. All rights reserved."
            }
          }
        };
        console.warn('Using fallback translations');
        return false;
      }
    }

    // Función recursiva para obtener valores anidados
    function getNestedValue(obj, path) {
      return path.split('.').reduce((current, key) => current && current[key], obj);
    }

    // Función para aplicar traducciones
    function applyTranslations(lang) {
      if (!translations[lang]) {
        console.error(`Translation for language '${lang}' not found`);
        return;
      }

      const t = translations[lang];

      // Aplicar traducciones a elementos con data-translate
      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const value = getNestedValue(t, key);
        if (value) {
          element.textContent = value;
        } else {
          console.warn(`Translation key '${key}' not found for language '${lang}'`);
        }
      });

      // Actualizar botón de idioma
      if (toggleLang && t.buttons && t.buttons.english) {
        toggleLang.textContent = t.buttons.english;
      }
      
      // Actualizar botón de modo
      if (toggleMode && t.buttons) {
        toggleMode.textContent = isDarkMode ? t.buttons.lightMode : t.buttons.darkMode;
      }

      // Actualizar atributo lang del HTML
      document.documentElement.lang = lang;
    }

    // Función para cambiar idioma
    function toggleLanguage() {
      const newLang = currentLang === 'es' ? 'en' : 'es';
      
      if (translations[newLang]) {
        currentLang = newLang;
        applyTranslations(currentLang);
        
        // Guardar preferencia
        localStorage.setItem('vista-qa-lang', currentLang);
      } else {
        console.error(`Cannot switch to language '${newLang}' - translations not available`);
      }
    }

    // Función para cambiar modo oscuro
    function toggleDarkMode() {
      isDarkMode = !isDarkMode;
      body.classList.toggle('dark-mode', isDarkMode);
      
      // Actualizar texto del botón
      if (translations[currentLang] && translations[currentLang].buttons) {
        const t = translations[currentLang];
        toggleMode.textContent = isDarkMode ? t.buttons.lightMode : t.buttons.darkMode;
      }
      
      // Guardar preferencia
      localStorage.setItem('vista-qa-dark-mode', isDarkMode);
    }

    // Función para mostrar estado de carga
    function showLoadingState(show = true) {
      document.body.classList.toggle('loading', show);
    }

    // Función de inicialización principal
    async function initialize() {
      showLoadingState(true);
      
      // Cargar traducciones
      await loadTranslations();
      
      // Cargar preferencias guardadas
      const savedLang = localStorage.getItem('vista-qa-lang');
      const savedDarkMode = localStorage.getItem('vista-qa-dark-mode') === 'true';
      
      // Aplicar idioma guardado si es válido
      if (savedLang && translations[savedLang]) {
        currentLang = savedLang;
      }
      
      // Aplicar modo oscuro guardado
      if (savedDarkMode) {
        isDarkMode = true;
        body.classList.add('dark-mode');
      }
      
      // Aplicar configuración inicial
      applyTranslations(currentLang);
      
      // Configurar event listeners
      if (toggleLang) {
        toggleLang.addEventListener('click', toggleLanguage);
      }
      
      if (toggleMode) {
        toggleMode.addEventListener('click', toggleDarkMode);
      }
      
      showLoadingState(false);
      console.log('VISTA QA homepage initialized successfully');
    }

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initialize);
    } else {
      initialize();
    }
