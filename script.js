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
    /* Ключи вида "page.section.subkey" — иерархические, чтобы не путать страницы. */
    var translations = {
        /* ============================================== */
        /* ----- Английские строки ----- */
        /* ============================================== */
        en: {
            /* ----- Главная: <title>/<meta description> ----- */
            "home.title": "AS-Pavlov — Game and app developer",
            "home.description": "AS-Pavlov — mobile game and app developer for Android. Tanya rescues the cats, Any Training.",

            /* ----- Privacy: Tanya — заголовок вкладки и SEO-описание ----- */
            "privacy-tanya.title": "Privacy Policy — Tanya rescues the cats — AS-Pavlov",
            "privacy-tanya.description": "Privacy Policy for the mobile game Tanya rescues the cats by AS-Pavlov.",

            /* ----- Privacy: Any Training — заголовок вкладки и SEO-описание ----- */
            "privacy-any-training.title": "Privacy Policy — Any Training — AS-Pavlov",
            "privacy-any-training.description": "Privacy Policy for the mobile fitness application Any Training by AS-Pavlov.",

            /* ----- Шапка/навигация (общая для всех страниц) ----- */
            "nav.works": "Games & apps",
            "nav.home": "Home",

            /* ----- Hero на главной ----- */
            "hero.subtitle": "Game and app developer",
            "hero.text": "I make mobile games and apps for Android with Unity. Two of my projects are on Google Play — a casual kids game and a fitness workout app.",
            "hero.cta": "My work on Google Play",

            /* ----- Секция "Игры и приложения" ----- */
            "works.title": "Games & apps",
            "card1.desc": "Jump from island to island. Rescue kittens. Shoot down the monsters with ball.",
            "card2.desc": "Application for creating your own fitness workouts.",
            "card.privacy": "Privacy Policy",

            /* ----- Подвал ----- */
            "footer.privacy.tanya": "Privacy: Tanya",
            "footer.privacy.at": "Privacy: Any Training",

            /* ----- Общие строки для всех legal-страниц ----- */
            "legal.effective.label": "Effective date:",
            "legal.effective.date": "May 28, 2026",
            "legal.privacyLink": "Privacy Policy",
            "legal.contact.title": "Contact",
            "legal.changes.title": "Changes to this policy",
            "legal.changes.text": "If this Privacy Policy changes, the new version will be published on this URL with an updated effective date.",

            /* ============================================== */
            /* ----- Privacy Policy: Tanya rescues the cats ----- */
            /* ============================================== */
            "privacy-tanya.h1": "Tanya rescues the cats — Privacy Policy",
            "privacy-tanya.intro": "This Privacy Policy describes how the mobile game \"Tanya rescues the cats\" (the \"App\") handles information about its users. The App is developed and published by AS-Pavlov (Andrey Pavlov) (\"I\", \"we\").",

            "privacy-tanya.audience.title": "Children's audience",
            "privacy-tanya.audience.text": "This App is designed for children. It is built and operated in compliance with the Children's Online Privacy Protection Act (COPPA), the Google Play Families Policy, and the EU GDPR rules for children.",

            "privacy-tanya.collect.title": "Information I collect",
            "privacy-tanya.collect.text": "I do not directly collect, store or process any personally identifiable information (PII) on my own servers. The App does not contain user accounts, does not ask the user for their name, email, phone number or any other personal data, and does not contain user-generated content shared with other users.",

            "privacy-tanya.adid.title": "Android Advertising ID",
            "privacy-tanya.adid.text": "The App does NOT request the Android Advertising ID (AD_ID). The corresponding permission is explicitly removed from the App's manifest. As a result, advertising shown in the App is contextual (non-personalized) only.",

            "privacy-tanya.local.title": "Local data on the device",
            "privacy-tanya.local.text": "The App stores game progress, settings and similar information in the local storage of your device. This data never leaves your device. To delete it, uninstall the App or use Android: Settings → Apps → Tanya rescues the cats → Storage → Clear data.",

            "privacy-tanya.purchases.title": "In-app purchases",
            "privacy-tanya.purchases.text": "In-app purchases are processed by Google Play Billing. I do not see your payment details — they are handled entirely by Google. To request a refund or manage purchases, use your Google Account.",

            "privacy-tanya.sdks.title": "Third-party advertising SDKs",
            "privacy-tanya.sdks.text": "To monetise the App, the following third-party advertising SDKs are integrated. These SDKs may collect non-personal technical information (such as device model, OS version, IP address, ad performance data) to serve contextual advertisements. They do not receive personal data from me. Each SDK is configured for child-directed (COPPA-compliant) mode where applicable.",
            "privacy-tanya.sdks.is.desc": " — mediation platform with bidders ironSource, Unity Ads, InMobi, Yandex bidder. ",
            "privacy-tanya.sdks.yandex.desc": " — uses AppMetrica internally for attribution and anti-fraud. ",
            "privacy-tanya.sdks.kidoz.desc": " — kid-safe contextual-only advertising network. ",
            "privacy-tanya.sdks.topon.desc": " — advertising mediation platform. ",
            "privacy-tanya.sdks.tradplus.desc": " — advertising mediation platform. ",

            "privacy-tanya.permissions.title": "Permissions",
            "privacy-tanya.permissions.text": "The App requests only the standard network permissions required for advertising delivery (INTERNET, ACCESS_NETWORK_STATE).",

            "privacy-tanya.deletion.title": "Data deletion and parental rights",
            "privacy-tanya.deletion.text1": "Because I do not store any personal data on my side, there is nothing for me to delete on my servers. To remove all local data on the device, uninstall the App.",
            "privacy-tanya.deletion.text2": "If you are a parent and want me to coordinate a data-deletion request to one of the third-party advertising networks listed above, please email me. I will forward the request to the corresponding network's privacy team. Per GDPR I will respond within 30 days.",

            /* ============================================== */
            /* ----- Privacy Policy: Any Training ----- */
            /* ============================================== */
            "privacy-at.h1": "Any Training — Privacy Policy",
            "privacy-at.intro": "This Privacy Policy describes how the mobile fitness application \"Any Training\" (the \"App\") handles information about its users. The App is developed and published by AS-Pavlov (Andrey Pavlov) (\"I\", \"we\").",

            "privacy-at.audience.title": "Audience",
            "privacy-at.audience.text": "This App is intended for adult users. It is not directed at children under the age of 13.",

            "privacy-at.collect.title": "Information I collect",
            "privacy-at.collect.text": "I do not directly collect, store or process any personally identifiable information (PII) on my own servers. The App does not require an account and does not ask for your name, email or phone number. All workout data you create in the App (exercises, sessions, training programs) is stored locally on your device.",

            "privacy-at.local.title": "Local data on the device",
            "privacy-at.local.text": "Workout data, settings and similar information are stored in the local storage of your device. This data never leaves your device. To delete it, uninstall the App or use Android: Settings → Apps → Any Training → Storage → Clear data.",

            "privacy-at.health.title": "Health-related data",
            "privacy-at.health.text": "The App does not connect to Google Fit, Apple Health or any external health platform. No biometric or medical data is collected.",

            "privacy-at.sdks.title": "Third-party advertising SDKs",
            "privacy-at.sdks.text": "To monetise the App, the following third-party advertising SDK is integrated. The SDK may collect non-personal technical information (device model, OS version, IP address, advertising identifier, ad performance data) to serve advertisements.",
            "privacy-at.sdks.is.desc": " — mediation platform with bidders ironSource, Unity Ads, InMobi, Yandex bidder. ",
            "privacy-at.sdks.optout": "You can opt out of personalised advertising on Android: Settings → Privacy / Google → Ads → Delete advertising ID.",

            "privacy-at.permissions.title": "Permissions",
            "privacy-at.permissions.text": "The App requests only the standard network permissions required for advertising delivery (INTERNET, ACCESS_NETWORK_STATE).",

            "privacy-at.deletion.title": "Data deletion",
            "privacy-at.deletion.text1": "Because I do not store any personal data on my side, there is nothing for me to delete on my servers. To remove all local data, uninstall the App.",
            "privacy-at.deletion.text2": "To request data deletion from the advertising SDK, please refer to the IronSource Privacy Policy linked above. If you need help coordinating such a request, you can email me. Per GDPR I will respond within 30 days."
        },

        /* ============================================== */
        /* ----- Русские строки ----- */
        /* ============================================== */
        ru: {
            /* ----- Главная: <title>/<meta description> ----- */
            "home.title": "AS-Pavlov — Разработчик игр и приложений",
            "home.description": "AS-Pavlov — разработчик мобильных игр и приложений для Android. Tanya rescues the cats, Any Training.",

            /* ----- Privacy: Tanya — заголовок вкладки и SEO-описание ----- */
            "privacy-tanya.title": "Политика конфиденциальности — Tanya rescues the cats — AS-Pavlov",
            "privacy-tanya.description": "Политика конфиденциальности мобильной игры Tanya rescues the cats от AS-Pavlov.",

            /* ----- Privacy: Any Training — заголовок вкладки и SEO-описание ----- */
            "privacy-any-training.title": "Политика конфиденциальности — Any Training — AS-Pavlov",
            "privacy-any-training.description": "Политика конфиденциальности мобильного фитнес-приложения Any Training от AS-Pavlov.",

            /* ----- Шапка/навигация ----- */
            "nav.works": "Игры и приложения",
            "nav.home": "Главная",

            /* ----- Hero на главной ----- */
            "hero.subtitle": "Разработчик игр и приложений",
            "hero.text": "Делаю мобильные игры и приложения для Android на Unity. В Google Play две моих работы — детская казуальная игра и приложение для фитнес-тренировок.",
            "hero.cta": "Мои работы в Google Play",

            /* ----- Секция "Игры и приложения" ----- */
            "works.title": "Игры и приложения",
            "card1.desc": "Прыгай с острова на остров. Спасай котят. Сбивай монстров мячом.",
            "card2.desc": "Приложение для создания собственных фитнес-тренировок.",
            "card.privacy": "Политика конфиденциальности",

            /* ----- Подвал ----- */
            "footer.privacy.tanya": "Privacy: Tanya",
            "footer.privacy.at": "Privacy: Any Training",

            /* ----- Общие строки для всех legal-страниц ----- */
            "legal.effective.label": "Дата вступления в силу:",
            "legal.effective.date": "28 мая 2026 г.",
            "legal.privacyLink": "Политика конфиденциальности",
            "legal.contact.title": "Контакты",
            "legal.changes.title": "Изменения в политике",
            "legal.changes.text": "Если эта Политика конфиденциальности изменится, новая версия будет опубликована по этому же адресу с обновлённой датой вступления в силу.",

            /* ============================================== */
            /* ----- Privacy Policy: Tanya rescues the cats ----- */
            /* ============================================== */
            "privacy-tanya.h1": "Tanya rescues the cats — Политика конфиденциальности",
            "privacy-tanya.intro": "Настоящая Политика описывает, как мобильная игра «Tanya rescues the cats» (далее «Приложение») обращается с информацией о пользователях. Приложение разработано и публикуется AS-Pavlov (Андрей Павлов) (далее «я», «мы»).",

            "privacy-tanya.audience.title": "Детская аудитория",
            "privacy-tanya.audience.text": "Приложение предназначено для детей. Оно создано и эксплуатируется с учётом требований COPPA (Закон США о защите конфиденциальности детей в интернете), Google Play Families Policy и норм GDPR в отношении детей.",

            "privacy-tanya.collect.title": "Какие данные я собираю",
            "privacy-tanya.collect.text": "Я не собираю, не храню и не обрабатываю персональные данные (PII) на своих серверах. Приложение не содержит учётных записей, не запрашивает у пользователя имя, email, телефон или другие персональные данные, и не содержит пользовательского контента, которым делятся с другими пользователями.",

            "privacy-tanya.adid.title": "Android Advertising ID",
            "privacy-tanya.adid.text": "Приложение НЕ запрашивает Android Advertising ID (AD_ID). Соответствующее разрешение явно удалено из манифеста приложения. Поэтому реклама в приложении показывается только в контекстном (не-персонализированном) виде.",

            "privacy-tanya.local.title": "Локальные данные на устройстве",
            "privacy-tanya.local.text": "Приложение сохраняет прогресс игры, настройки и похожую информацию в локальном хранилище вашего устройства. Эти данные никогда не покидают устройство. Чтобы их удалить, удалите приложение или используйте: Настройки Android → Приложения → Tanya rescues the cats → Хранилище → Очистить данные.",

            "privacy-tanya.purchases.title": "Покупки в приложении",
            "privacy-tanya.purchases.text": "Покупки в приложении обрабатываются Google Play Billing. Я не вижу ваших платёжных данных — они полностью обрабатываются Google. Чтобы запросить возврат или управлять покупками, используйте свой Google-аккаунт.",

            "privacy-tanya.sdks.title": "Сторонние рекламные SDK",
            "privacy-tanya.sdks.text": "Для монетизации в приложении используются сторонние рекламные SDK, перечисленные ниже. Эти SDK могут собирать обезличенную техническую информацию (модель устройства, версия ОС, IP-адрес, статистика показов рекламы) для показа контекстной рекламы. Они не получают от меня персональные данные. Где это применимо, каждый SDK сконфигурирован в детском (COPPA-совместимом) режиме.",
            "privacy-tanya.sdks.is.desc": " — медиационная платформа с биддерами ironSource, Unity Ads, InMobi, Yandex bidder. ",
            "privacy-tanya.sdks.yandex.desc": " — внутри использует AppMetrica для атрибуции и антифрода. ",
            "privacy-tanya.sdks.kidoz.desc": " — рекламная сеть для детских приложений, только контекстная реклама. ",
            "privacy-tanya.sdks.topon.desc": " — рекламная медиационная платформа. ",
            "privacy-tanya.sdks.tradplus.desc": " — рекламная медиационная платформа. ",

            "privacy-tanya.permissions.title": "Разрешения",
            "privacy-tanya.permissions.text": "Приложение запрашивает только стандартные сетевые разрешения, необходимые для доставки рекламы (INTERNET, ACCESS_NETWORK_STATE).",

            "privacy-tanya.deletion.title": "Удаление данных и права родителей",
            "privacy-tanya.deletion.text1": "Поскольку я не храню персональные данные у себя, удалять на моей стороне нечего. Чтобы удалить локальные данные на устройстве, удалите приложение.",
            "privacy-tanya.deletion.text2": "Если вы родитель и хотите, чтобы я помог скоординировать запрос на удаление данных в одну из перечисленных выше рекламных сетей, напишите мне на email. Я перенаправлю запрос в команду по приватности соответствующей сети. Согласно GDPR я отвечу в течение 30 дней.",

            /* ============================================== */
            /* ----- Privacy Policy: Any Training ----- */
            /* ============================================== */
            "privacy-at.h1": "Any Training — Политика конфиденциальности",
            "privacy-at.intro": "Настоящая Политика описывает, как мобильное фитнес-приложение «Any Training» (далее «Приложение») обращается с информацией о пользователях. Приложение разработано и публикуется AS-Pavlov (Андрей Павлов) (далее «я», «мы»).",

            "privacy-at.audience.title": "Аудитория",
            "privacy-at.audience.text": "Приложение предназначено для взрослых пользователей. Оно не направлено на детей младше 13 лет.",

            "privacy-at.collect.title": "Какие данные я собираю",
            "privacy-at.collect.text": "Я не собираю, не храню и не обрабатываю персональные данные (PII) на своих серверах. Приложение не требует учётной записи и не запрашивает имя, email или телефон. Все данные тренировок, которые вы создаёте в приложении (упражнения, сессии, программы), хранятся локально на вашем устройстве.",

            "privacy-at.local.title": "Локальные данные на устройстве",
            "privacy-at.local.text": "Данные тренировок, настройки и похожая информация хранятся в локальном хранилище вашего устройства. Эти данные никогда не покидают устройство. Чтобы их удалить, удалите приложение или используйте: Настройки Android → Приложения → Any Training → Хранилище → Очистить данные.",

            "privacy-at.health.title": "Данные о здоровье",
            "privacy-at.health.text": "Приложение не подключается к Google Fit, Apple Health или другим внешним сервисам по здоровью. Биометрические и медицинские данные не собираются.",

            "privacy-at.sdks.title": "Сторонние рекламные SDK",
            "privacy-at.sdks.text": "Для монетизации в приложении используется указанный ниже сторонний рекламный SDK. Этот SDK может собирать обезличенную техническую информацию (модель устройства, версию ОС, IP-адрес, рекламный идентификатор, статистику показов) для показа рекламы.",
            "privacy-at.sdks.is.desc": " — медиационная платформа с биддерами ironSource, Unity Ads, InMobi, Yandex bidder. ",
            "privacy-at.sdks.optout": "Вы можете отказаться от персонализированной рекламы в Android: Настройки → Конфиденциальность / Google → Реклама → Удалить рекламный идентификатор.",

            "privacy-at.permissions.title": "Разрешения",
            "privacy-at.permissions.text": "Приложение запрашивает только стандартные сетевые разрешения, необходимые для доставки рекламы (INTERNET, ACCESS_NETWORK_STATE).",

            "privacy-at.deletion.title": "Удаление данных",
            "privacy-at.deletion.text1": "Поскольку я не храню персональные данные у себя, удалять на моей стороне нечего. Чтобы удалить локальные данные, удалите приложение.",
            "privacy-at.deletion.text2": "Чтобы запросить удаление данных у рекламного SDK, используйте Privacy Policy IronSource (ссылка выше). Если нужна помощь со скоординированным запросом — напишите мне на email. Согласно GDPR я отвечу в течение 30 дней."
        }
    };

    /**
     * Возвращает идентификатор текущей страницы из <html data-page="...">.
     * По умолчанию — "home" (главная), если атрибут отсутствует.
     * Используется как префикс для ключей title/description (per-page SEO).
     */
    function getPageId() {
        /* Достаём data-page с корневого <html> */
        var pageId = document.documentElement.getAttribute("data-page");

        /* Если атрибута нет или пусто — считаем что это главная */
        if (!pageId) {
            return "home";
        }

        /* Возвращаем как есть */
        return pageId;
    }

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

        /* Берём префикс страницы (home / privacy-tanya / privacy-any-training) */
        var pageId = getPageId();

        /* Per-page ключи для <title> и <meta description> */
        var titleKey = pageId + ".title";
        var descKey = pageId + ".description";

        /* Заголовок вкладки */
        if (dict[titleKey]) {
            document.title = dict[titleKey];
        }

        /* Meta description для поисковиков */
        var descMeta = document.querySelector('meta[name="description"]');
        if (descMeta && dict[descKey]) {
            descMeta.setAttribute("content", dict[descKey]);
        }

        /* Open Graph: title и description (для шеринга) */
        var ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && dict[titleKey]) {
            ogTitle.setAttribute("content", dict[titleKey]);
        }
        var ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc && dict[descKey]) {
            ogDesc.setAttribute("content", dict[descKey]);
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
