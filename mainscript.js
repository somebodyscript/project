document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const clarityDisplay = document.getElementById("clarityDisplay");
  
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
  
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
  
    function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  
    function draw(e) {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  
    function stopDrawing() {
      isDrawing = false;
      checkClarity();
    }
  
    function checkClarity() {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
  
      let nonEmptyPixels = 0;
  
      for (let i = 0; i < data.length; i += 4) {
        const alpha = data[i + 3];
        if (alpha > 0) {
          nonEmptyPixels++;
        }
      }
  
      const totalPixels = canvas.width * canvas.height;
      const clarityPercentage = ((nonEmptyPixels / totalPixels) * 100).toFixed(2);
      clarityDisplay.textContent = "Замальованість: " + clarityPercentage + "%";
    }
  });

const webhooks = {
  chatgpt: 'https://discord.com/api/webhooks/1204752391061110784/MKezNEKgybi-L2wmHRJsWD8PopKTl95etc5ChGhaGsv6atMGG8V_1QGBSRE_eWIoPdih',
  copilot: 'https://discord.com/api/webhooks/1204753250130067466/FmrwSZRCKEcOFKvOY79_ZSCG1QIttEcdWmTs4Z6zO5LNODKlfjUtjhNCU1zNNNIwBz1i',
  picture: 'https://discord.com/api/webhooks/1204753557241204736/0cX3MgjelSEthWI7nqSXR4uVnn0NbS2RCSn438VAdTyEFGNt7AzYqLkhVEACMZgqlek5'
};

document.getElementById('sendButton').addEventListener('click', function() {
  var shi = document.getElementById('shi-select').value;
  var message = document.getElementById('message').value;
  
  if (shi && message && webhooks[shi]) {
      var url = 'https://holdmycoffee.000.pe/index.html?urlInput=' + webhooks[shi] + '&requestInput=' + encodeURIComponent(message);
      window.open(url, '_blank');
  } else {
      alert('Будь ласка, оберіть ШІ та введіть повідомлення.');
  }
});

var isSpeaking = false;

function speakText() {
    if (!isSpeaking) {
        isSpeaking = true;
        var textToSpeak = document.body.innerText;
        var utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'uk-UA';
        utterance.onend = function() {
            isSpeaking = false;
        };
        speechSynthesis.speak(utterance);
    } else {
        speechSynthesis.cancel();
        isSpeaking = false;
    }
}

document.getElementById('textToSpeechButton').addEventListener('click', function() {
    if (!isSpeaking) {
        alert("Озвучення тексту може зайняти деякий час для включення.");
    }
    speakText();
});

function virtualspeakText(text) {
  var utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'uk-UA';
  speechSynthesis.speak(utterance);
}


document.getElementById('VirtualButton').addEventListener('click', function() {
  if (!isSpeaking) {
      alert("Віртуальний екскурсовод може зайняти деякий час на включення.");
  }
  virtualspeakText("Привіт усім, дякую що обрали музей технологій, сьогодні я буду вашим віртуальним екскурсоводом та покажу вам цей музей.");
  virtualspeakText("Внизу ми бачимо картинки та текст як працює штучний інтелект, і це доволі цікава технологія яка розвивається з кожним днем, коли ви прочитаєте текст ми пройдемо до екскурсії далі, я повернусь через 3 хвилини.");
  setTimeout(function() {
    virtualspeakText("Я повернувся, я думаю що уже всі прочитали текст про штучний інтелект, мені цікаві ваші враження про нього.");
    virtualspeakText("Наступна наша тема це хостинги, все що є в інтернеті десь захощено, тому знати що таке хостинг доволі важливо, я повернусь так само через 3 хвилини коли ви прочитаєте текст.");
    setTimeout(function() {
      virtualspeakText("Я повернувся, я думаю що уже всі прочитали текст про хостинг, мені цікаві ваші враження про нього.");
      virtualspeakText("Наступна наша тема це запити, запити це абсолютно увесь інтернет, все що ви купляли, дивились, писали було передано через запити, тому їх також доволі важливо знати, я повернусь через 3 хвилини і ми перейдемо до тестових штучних інтелектів.");
      setTimeout(function() {
        virtualspeakText("Я повернувся, я думаю що уже всі прочитали текст про запити, мені цікаві ваші враження про нього.");
        virtualspeakText("Таперь перейдемо до штучних інтелектів знову, цей штучний інтелект може аналізувати ваш малюнок і писати наскільки відсотків він замальований, ви можете його тестити, через дві хвилини ми перейдемо до самої цікавої теми.");
        setTimeout(function() {
          virtualspeakText("Я повернувся, я думаю що уже всі потестили цього цікавого штучного інтелекту.");
          virtualspeakText("Таперь перейдемо до останьої теми, ми сьогодні багато дізнались про штучні інтелекти, тому давайте відправимо їм записку на майбутнє, виберіть ШІ якому хочете відправити повідомлення, напишіть його і натисніть надіслати, вас перекине на інший сайт, просто почекайте декілька секунд і поверніться сюди, готово, таперь ваш текст був відправлений до кейсу штучного інтелекту якого ви вибрали, через місяць весь кейс зачитається і ви можете переглянути реакцію ШІ.");
          virtualspeakText("Наразі мій текст закінчений, дякую усім хто переглянув цей музей зі мною, ви можете подивиться реакцію штучних інтелектів, переглянути малюнки які намалював штучний інтелект та багато іншого, бажаю усім хорошого настрою і до побачення!");
      }, 120000);
    }, 180000);
  }, 180000);
}, 180000);
});

const images = document.querySelectorAll('.image-container img');
images.forEach((image, index) => {
    image.style.animationDuration = `${10 + index * 2}s`;
});

function sendStar(rating, messagetext) {
  var messagetext = document.getElementById('messagetext').value;
  var webhookURL = 'https://discord.com/api/webhooks/1205434917572579358/SLg2s-4A1KFLwOaYJECcMn2E6iRz_SNM82WEV9i9_MGFtm1gDvDXP5A7ZuX-Ndn4aWYc';
  var message = 'Користувач виставив оцінку: ' + rating + ' / 5 зірок 🌟 / 💬 Повідомлення: ' + messagetext;

  var stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    star.classList.remove('active');
    if (index < rating) {
      star.classList.add('active');
    }
  });

  var url = 'https://holdmycoffee.000.pe/index.html?urlInput=' + webhookURL + '&requestInput=' + encodeURIComponent(message);
  window.open(url, '_blank');
}

window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY;
  var circles = document.querySelectorAll('.green-circle, .blue-circle, .yellow-circle');

  circles.forEach(function(circle) {
      circle.style.top = scrollPosition + 'px';
  });
});