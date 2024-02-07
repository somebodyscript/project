function openCertificate() {
    var certificateWindow = window.open('', 'certificateWindow', 'width=400,height=300');
    certificateWindow.document.write('<h1>Ваш цифровий чек успішно надрукований!</h1>');
    certificateWindow.document.write('<h1>Сертифікат підписується за допомогої цифрової отпечатки</h1>');

    setTimeout(function() {
        var fingerprintName = generateFingerprintName();
        certificateWindow.document.body.innerHTML = '<h1>Назва цифрової отпечатки: ' + fingerprintName + '</h1>';
    }, 6000);

    setTimeout(function() {
        window.location.href = 'main.html';
    }, 7000);
}

function generateFingerprintName() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    for (var i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}