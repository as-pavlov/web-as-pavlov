/* =============================================================
   AS-Pavlov landing — клиентский i18n (EN / RU)

   Логика:
   - При загрузке читаем язык из localStorage; если нет — EN.
   - Все переводимые узлы в HTML помечены data-i18n="ключ".
   - applyLang(lang) проходит по этим узлам и подставляет текст из словаря.
   - Кнопки переключателя — элементы с data-lang="en"|"ru".
   - Выбор языка сохраняется в localStorage и применяется сразу.
   ============================================================= */

(function () {
    "use strict";

    /* ---------- Константы ---------- */
    /* Ключ под который сохраняем выбранный язык в localStorage */
    var STORAGE_KEY = "lang";

    /* Язык по умолчанию, если пользователь раньше не выбирал */
    var DEFAULT_LANG = "en";

    /* ---------- Словари переводов ---------- */
    var translations = {
        /* ----- Английские строки ----- */
        en: {
            "title": "AS-Pavlov — Game and app developer",
            "description": "AS-Pavlov — mobile game and app developer for Android. Tanya rescues the cats, Any Training.",
            "nav.works": "Games & apps",
            "nav.privacy": "Privacy",
            "hero.subtitle": "Game and app developer",
            "hero.text": "I make mobile games and apps for Android with Unity. Two of my projects are on Google Play — a casual kids game and a fitness workout app.",
            "hero.cta": "My work on Google Play",
            "works.title": "Games & apps",
            "card1.desc": "Jump from island to island. Rescue kittens. Shoot down the monsters with ball.",
            "card2.desc": "Application for creating your own fitness workouts.",
            "footer.privacy": "Privacy Policy",
            "footer.terms": "Terms of Service"
        },

        /* ----- Русские строки ----- */
        ru: {
            "title": "AS-Pavlov — Разработчик игр и приложений",
            "description": "AS-Pavlov — разработчик мобильных игр и приложений для Android. Tanya rescues the cats, Any Training.",
            "nav.works": "Игры и приложения",
            "nav.privacy": "Privacy",
            "hero.subtitle": "Разработчик игр и приложений",
            "hero.text": "Делаю мобильные игры и приложения для Android на Unity. В Google Play две моих работы — детская казуальная игра и приложение для фитнес-тренировок.",
            "hero.cta": "Мои работы в Google Play",
            "works.title": "Игры и приложения",
            "card1.desc": "Прыгай с острова на остров. Спасай котят. Сбивай монстров мячом.",
            "card2.desc": "Приложение для создания собственных фитнес-тренировок.",
            "footer.privacy": "Политика конфиденциальности",
            "footer.terms": "Условия использования"
        }
    };

    /**
     * Возвращает стартовый язык: из localStorage, иначе DEFAULT_LANG.
     * Допустимые значения: "en" | "ru".
     */
    function getInitialLang() {
        /* Достаём ранее сохранённый выбор пользователя */
        var saved = null;
        try {
            saved = localStorage.getItem(STORAGE_KEY);
        } catch (e) {
            /* localStorage может быть запрещён (приватный режим и т.п.) — игнорируем */
            saved = null;
        }

        /* Принимаем только известные коды языков */
        if (saved === "en" || saved === "ru") {
            return saved;
        }

        /* Иначе — язык по умолчанию */
        return DEFAULT_LANG;
    }

    /**
     * Применяет выбранный язык ко всему DOM.
     * @param {string} lang — "en" | "ru"
     */
    function applyLang(lang) {
        /* Берём словарь под нужный язык */
        var dict = translations[lang];

        /* Если словаря нет — выходим, ничего не ломаем */
        if (!dict) {
            return;
        }

        /* Обновляем атрибут lang у <html> для корректного SEO/скринридеров */
        document.documentElement.lang = lang;

        /* Заголовок вкладки */
        if (dict["title"]) {
            document.title = dict["title"];
        }

        /* Meta description для поисковиков */
        var descMeta = document.querySelector('meta[name="description"]');
        if (descMeta && dict["description"]) {
            descMeta.setAttribute("content", dict["description"]);
        }

        /* Open Graph: title и description (для шеринга) */
        var ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && dict["title"]) {
            ogTitle.setAttribute("content", dict["title"]);
        }
        var ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc && dict["description"]) {
            ogDesc.setAttribute("content", dict["description"]);
        }

        /* Главный проход: подменяем текст у всех элементов с data-i18n */
        var nodes = document.querySelectorAll("[data-i18n]");
        for (var i = 0; i < nodes.length; i++) {
            var el = nodes[i];
            var key = el.getAttribute("data-i18n");

            /* Если в словаре есть строка под этот ключ — подставляем */
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }
        }

        /* Подсветка активной кнопки переключателя */
        var btns = document.querySelectorAll("[data-lang]");
        for (var j = 0; j < btns.length; j++) {
            var btn = btns[j];
            /* Активна кнопка, чей data-lang совпадает с текущим языком */
            if (btn.getAttribute("data-lang") === lang) {
                btn.classList.add("active");
                btn.setAttribute("aria-pressed", "true");
            } else {
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            }
        }
    }

    /**
     * Сохраняет выбранный язык и сразу применяет его.
     * @param {string} lang — "en" | "ru"
     */
    function setLang(lang) {
        /* Сохраняем выбор пользователя на следующее посещение */
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            /* Хранилище недоступно — продолжаем без сохранения */
        }

        /* Применяем язык немедленно */
        applyLang(lang);
    }

    /* ---------- Инициализация после загрузки DOM ---------- */
    document.addEventListener("DOMContentLoaded", function () {
        /* Применяем стартовый язык */
        applyLang(getInitialLang());

        /* Навешиваем обработчики на все кнопки переключателя */
        var langBtns = document.querySelectorAll("[data-lang]");
        for (var k = 0; k < langBtns.length; k++) {
            /* Используем замыкание через IIFE-обёртку, чтобы захватить актуальный элемент */
            (function (btn) {
                btn.addEventListener("click", function () {
                    /* Берём целевой язык из data-lang кнопки */
                    var target = btn.getAttribute("data-lang");
                    setLang(target);
                });
            })(langBtns[k]);
        }
    });
})();
