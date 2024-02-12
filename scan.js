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
    var hasSeenAttackMessage = localStorage.getItem("hasSeenAttackMessage");

    if (underAttack && hasSeenAttackMessage) {
        showDangerMessage("The site is under attack. Please try again later.");
        setTimeout(function() {
            window.location.replace("https://www.google.com");
        }, 1000);
        return;
    }

    if (underAttack && !hasSeenAttackMessage) {
        localStorage.setItem("hasSeenAttackMessage", true);
        document.cookie = "hasSeenAttackMessage=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    }

    var hasChecked = sessionStorage.getItem("hasChecked");

    if (!hasChecked) {
        var visitCount = parseInt(localStorage.getItem("visitCount")) || 0;

        if (visitCount >= 100) {
            showDangerMessage("Exceeded the allowable number of visits. Access denied.");
            return;
        }

        var lastVisitTime = parseInt(localStorage.getItem("lastVisitTime")) || 0;
        var currentTime = new Date().getTime();
        var timeDiff = currentTime - lastVisitTime;
        if (timeDiff < 60000) {
            var visitFrequency = parseInt(localStorage.getItem("visitFrequency")) || 0;
            visitFrequency++;
            localStorage.setItem("visitFrequency", visitFrequency);

            if (visitFrequency >= 10) {
                showWarningMessage("Seems like you are visiting the site too often. Please wait a few minutes and try again.");
                handleWarning();
                return;
            }
        } else {
            localStorage.setItem("visitFrequency", 1);
        }

        var loadingMessage = document.createElement("div");
        loadingMessage.className = "loading-message fadeIn";
        loadingMessage.innerHTML = "<h2>Anti-raid system</h2><p>Checking for raid...</p>";
        document.body.innerHTML = "";
        document.body.appendChild(loadingMessage);

        setTimeout(function() {
            var successMessage = document.createElement("div");
            successMessage.className = "success-message fadeIn";
            successMessage.innerHTML = "<h2>Anti-raid system</h2><p>Check successful.</p>";
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

    var logo = document.createElement("img");
    logo.src = "./logo.png";
    logo.style.width = "200px";
    logo.style.height = "auto";

    logo.onclick = function() {
        window.location.href = "https://github.com/somebodyscript/HotTea";
    };
    var securedByHotTea = document.createElement("div");
    securedByHotTea.innerHTML = "Secured by HotTea";
    securedByHotTea.style.fontSize = "12px";
    securedByHotTea.style.color = "#777";
    securedByHotTea.style.position = "absolute";
    securedByHotTea.style.bottom = "10px";
    securedByHotTea.style.left = "20px";
    securedByHotTea.appendChild(logo);
    loadingMessage.appendChild(securedByHotTea);
}



function handleWarning() {
    var warningCount = parseInt(localStorage.getItem("warningCount")) || 0;
    warningCount++;

    var warningSentBeforeReload = sessionStorage.getItem("warningSentBeforeReload");

    if (warningSentBeforeReload) {
        window.location.replace("https://www.google.com");
    } else {
        if (warningCount === 1) {
            showWarningMessage("You have been flagged as a raider. Please wait 4 seconds before redirection.");
            localStorage.setItem("warningCount", warningCount);

            setTimeout(function() {
                window.location.replace("https://www.google.com");
            }, 4000);
        } else if (warningCount === 2) {
            showDangerMessage("Third warning. Redirection will occur now.");
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
    localStorage.removeItem("refreshCount");
}, 600000);

window.onload = function() {
    checkUserOnVisit();
};


function checkRaid() {
    var hasSeenAttackMessage = localStorage.getItem("hasSeenAttackMessage");

    if (underAttack && hasSeenAttackMessage) {
        showDangerMessage("The site is under attack. Please try again later.");
        setTimeout(function() {
            window.location.replace("https://www.google.com");
        }, 1000);
        return;
    }

    if (underAttack && !hasSeenAttackMessage) {
        localStorage.setItem("hasSeenAttackMessage", true);
        document.cookie = "hasSeenAttackMessage=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
    }

    var lastVisit = sessionStorage.getItem("lastVisit");
    if (!lastVisit || (new Date() - new Date(lastVisit)) > 24 * 60 * 60 * 1000) {
        localStorage.removeItem("sessionCount");
        sessionStorage.setItem("lastVisit", new Date());
    }

    if (sessionCount > 100) {
        showWarningMessage("Exceeded the allowable number of sessions. First warning.");
        handleWarning();
    }
}

var refreshCount = parseInt(localStorage.getItem("refreshCount")) || 0;
refreshCount++;

if (refreshCount >= 150) {
    showWarningMessage("You are refreshing the page too frequently. Please wait for some time and try again.");
    localStorage.setItem("refreshCount", 0);
    handleWarning();
} else {
    localStorage.setItem("refreshCount", refreshCount);
}

var underAttack = false;

function setUnderAttack(isUnderAttack) {
    underAttack = isUnderAttack;

    if (isUnderAttack) {
        document.querySelectorAll('script').forEach(function(script) {
            script.remove();
        });

        window.XMLHttpRequest = function() {
            throw new Error('Requests are blocked. The website is under attack.');
        };

        document.body.innerHTML = "<h2>The site is under attack.</h2><p>Please try again later.</p>";

        setTimeout(function() {
            window.location.replace("https://www.google.com");
        }, 5000);
    }
}


function showWarningMessage(message) {
    var warningMessage = document.createElement("div");
    warningMessage.className = "warning-message fadeIn";
    warningMessage.innerHTML = "<h2>Anti-raid system</h2><p>" + message + "</p>";
    var logo = document.createElement("img");
    logo.src = "./logo.png";
    logo.onclick = function() {
        window.location.href = "https://github.com/somebodyscript/HotTea";
    };
    warningMessage.appendChild(logo);
    document.body.innerHTML = "";
    document.body.appendChild(warningMessage);
}

function showDangerMessage(message) {
    var dangerMessage = document.createElement("div");
    dangerMessage.className = "danger-message fadeIn";
    dangerMessage.innerHTML = "<h2>Anti-raid system</h2><p>" + message + "</p>";
    var logo = document.createElement("img");
    logo.src = "./logo.png";
    logo.onclick = function() {
        window.location.href = "https://github.com/somebodyscript/HotTea";
    };
    dangerMessage.appendChild(logo);
    document.body.innerHTML = "";
    document.body.appendChild(dangerMessage);
}
