var style = document.createElement('style');
style.innerHTML = `
    body {
        font-family: Arial, sans-serif;
    }
    .loading-message {
        background-color: #ffffcc;
        border: 1px solid #ffcc00;
        color: #ffcc00;
        padding: 20px;
        margin: 20px;
        border-radius: 5px;
    }
    .success-message {
        background-color: #ccffcc;
        border: 1px solid #00cc00;
        color: #00cc00;
        padding: 20px;
        margin: 20px;
        border-radius: 5px;
    }
    .warning-message {
        background-color: #ffcc00;
        border: 1px solid #ff9900;
        color: #ff9900;
        padding: 20px;
        margin: 20px;
        border-radius: 5px;
    }
    .danger-message {
        background-color: #ff6666;
        border: 1px solid #ff0000;
        color: #ff0000;
        padding: 20px;
        margin: 20px;
        border-radius: 5px;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    .fadeIn {
        animation: fadeIn 1s ease-in-out;
    }
`;
document.head.appendChild(style);

function checkUserOnVisit() {
    var hasChecked = sessionStorage.getItem("hasChecked");

    if (!hasChecked) {
        var visitCount = parseInt(localStorage.getItem("visitCount")) || 0;
        if (visitCount >= 100) {
            showDangerMessage("Перевищено допустиму кількість візитів. Доступ заборонено.");
            return;
        }
        var lastVisitTime = parseInt(localStorage.getItem("lastVisitTime")) || 0;
        var currentTime = new Date().getTime();
        var timeDiff = currentTime - lastVisitTime;
        if (timeDiff < 60000) {
            var visitFrequency = parseInt(localStorage.getItem("visitFrequency")) || 0;
            visitFrequency++;
            localStorage.setItem("visitFrequency", visitFrequency);

            if (visitFrequency >= 50) {
                showWarningMessage("Здається, ви заходите на сайт занадто часто. Будь ласка, зачекайте кілька хвилин і спробуйте ще раз.");
                handleWarning();
                return;
            }
        } else {
            localStorage.setItem("visitFrequency", 1);
        }

        var loadingMessage = document.createElement("div");
        loadingMessage.className = "loading-message fadeIn";
        loadingMessage.innerHTML = "<h2>Анти-рейд система</h2><p>Йде перевірка на рейд...</p>";
        document.body.innerHTML = "";
        document.body.appendChild(loadingMessage);

        setTimeout(function() {
            var successMessage = document.createElement("div");
            successMessage.className = "success-message fadeIn";
            successMessage.innerHTML = "<h2>Анти-рейд система</h2><p>Перевірка успішно пройшла.</p>";
            document.body.innerHTML = "";
            document.body.appendChild(successMessage);

            visitCount++;
            localStorage.setItem("visitCount", visitCount);

            localStorage.setItem("lastVisitTime", currentTime);

            sessionStorage.setItem("hasChecked", true);

            document.cookie = "hasChecked=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";

            setTimeout(function() {
                window.location.reload();
            }, 3000);
        }, 2000);
    }
}

function handleWarning() {
    var warningCount = parseInt(localStorage.getItem("warningCount")) || 0;
    warningCount++;

    var warningSentBeforeReload = sessionStorage.getItem("warningSentBeforeReload");

    if (warningSentBeforeReload) {
        window.location.replace("https://www.google.com");
    } else {
        if (warningCount === 1) {
            showWarningMessage("Ви були помічені як рейдер. Очікуйте 4 секунди перед переадресацією.");
            localStorage.setItem("warningCount", warningCount);

            setTimeout(function() {
                window.location.replace("https://www.google.com");
            }, 4000);
        } else if (warningCount === 2) {
            showDangerMessage("Третє попередження. Переадресація відбудеться прямо зараз.");
            localStorage.removeItem("sessionCount");
            localStorage.removeItem("hasChecked");
            window.location.replace("https://www.google.com");
        }
        sessionStorage.setItem("warningSentBeforeReload", true);
    }
}

setInterval(function() {
    localStorage.removeItem("visitCount");
    localStorage.removeItem("lastVisitTime");
}, 600000);

window.onload = function() {
    checkUserOnVisit();
};


function checkRaid() {
    var sessionCount = parseInt(localStorage.getItem("sessionCount")) || 0;

    var lastVisit = sessionStorage.getItem("lastVisit");
    if (!lastVisit || (new Date() - new Date(lastVisit)) > 24 * 60 * 60 * 1000) {
        localStorage.removeItem("sessionCount");
        sessionStorage.setItem("lastVisit", new Date());
    }

    if (sessionCount > 300) {
        showWarningMessage("Перевищено допустиму кількість сесій. Перше попередження.");
        handleWarning();
    }
}

function showWarningMessage(message) {
    var warningMessage = document.createElement("div");
    warningMessage.className = "warning-message fadeIn";
    warningMessage.innerHTML = "<h2>Анти-рейд система</h2><p>" + message + "</p>";
    document.body.innerHTML = "";
    document.body.appendChild(warningMessage);
}

function showDangerMessage(message) {
    var dangerMessage = document.createElement("div");
    dangerMessage.className = "danger-message fadeIn";
    dangerMessage.innerHTML = "<h2>Анти-рейд система</h2><p>" + message + "</p>";
    document.body.innerHTML = "";
    document.body.appendChild(dangerMessage);
}