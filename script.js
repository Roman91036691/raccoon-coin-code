let score = localStorage.getItem('score') ? parseInt(localStorage.getItem('score')) : 0;
let clickPower = localStorage.getItem('clickPower') ? parseInt(localStorage.getItem('clickPower')) : 1;
let energy = localStorage.getItem('energy') ? parseInt(localStorage.getItem('energy')) : 3000;
const maxEnergy = 3000;
const energyReplenishTime = 24 * 60 * 60 * 1000; // 24 години у мілісекундах
let lastReplenishTime = localStorage.getItem('lastReplenishTime') ? parseInt(localStorage.getItem('lastReplenishTime')) : Date.now();

function updateDisplay() {
  document.getElementById("score").textContent = `Очки: ${score}`;
  document.getElementById("points").textContent = `Ваші очки: ${score}`;
  document.getElementById("energy").textContent = `Енергія: ${energy} / ${maxEnergy} 🔋`;
}

// Функція для показу повідомлень
function showMessage(message, isShop = false) {
  const messageElement = isShop ? document.getElementById("message-shop") : document.getElementById("message");
  messageElement.textContent = message;
  messageElement.style.display = "block";
  setTimeout(() => { messageElement.style.display = "none"; }, 3000); // Сховати через 3 секунди
}

function increaseScore() {
  if (energy > 0) {
    score += clickPower;
    energy--;
    updateDisplay();
    localStorage.setItem('score', score);
    localStorage.setItem('energy', energy);
  } else {
    showMessage("У вас закінчилась енергія! Зачекайте на відновлення через 24 години.");
  }
}

// Функція відновлення енергії
function replenishEnergy() {
  const currentTime = Date.now();
  if (currentTime - lastReplenishTime >= energyReplenishTime) {
    energy = maxEnergy;
    lastReplenishTime = currentTime;
    localStorage.setItem('energy', energy);
    localStorage.setItem('lastReplenishTime', lastReplenishTime);
    updateDisplay();
    showMessage("Енергія відновлена до максимуму!");
  }
}

function showGame() {
  document.getElementById("game").style.display = "block";
  document.getElementById("shop").style.display = "none";
}

function showShop() {
  document.getElementById("game").style.display = "none";
  document.getElementById("shop").style.display = "block";
}

// Функція покупки сили кліку
function buyClickPower() {
  const clickPowerCost = 930;
  if (score >= clickPowerCost) {
    score -= clickPowerCost;
    clickPower++;
    updateDisplay();
    localStorage.setItem('score', score);
    localStorage.setItem('clickPower', clickPower);
    showMessage(`Ви придбали силу кліку! Тепер за кожне натискання ви отримуєте ${clickPower} очок.`, true);
  } else {
    showMessage("Недостатньо очок для покупки цього товару.", true);
  }
}

// Виконується при завантаженні сторінки
replenishEnergy();
updateDisplay();
