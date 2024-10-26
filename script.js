let score = 0;
const playTimeLimit = 5 * 60 * 1000; // 5 хвилин у мілісекундах
let timerInterval;

// Функція для завантаження очок та перевірки часу гри
function loadGame() {
    const savedScore = localStorage.getItem('raccoonCoinScore');
    const lastPlayTime = localStorage.getItem('lastPlayTime');
    const currentTime = Date.now();
    const remainingTime = parseInt(localStorage.getItem('remainingTime'), 10);

    // Завантажуємо очки
    if (savedScore !== null) {
        score = parseInt(savedScore, 10);
        document.getElementById("score").innerText = "Очки: " + score;
    }

    // Перевіряємо, чи минула доба з моменту останньої гри
    if (lastPlayTime === null || currentTime - lastPlayTime >= 24 * 60 * 60 * 1000) {
        localStorage.setItem('lastPlayTime', currentTime); // Оновлюємо час гри
        localStorage.setItem('timePlayed', 0); // Скидаємо час гри
        updateTimer(playTimeLimit);
    } else {
        const timePlayed = parseInt(localStorage.getItem('timePlayed'), 10);
        const timeLeft = remainingTime || (playTimeLimit - timePlayed);

        if (timePlayed >= playTimeLimit) {
            alert("Час гри на сьогодні закінчився. Поверніться завтра!");
            document.getElementById("coin").style.display = "none"; // Приховуємо монету
        } else {
            updateTimer(timeLeft); // Оновлюємо таймер, якщо час ще залишився
        }
    }
}

// Функція для збільшення очок
function increaseScore() {
    const currentTime = Date.now();
    const lastPlayTime = parseInt(localStorage.getItem('lastPlayTime'), 10);
    let timePlayed = parseInt(localStorage.getItem('timePlayed'), 10);

    // Перевіряємо, чи не вичерпаний ліміт часу
    if (currentTime - lastPlayTime < 24 * 60 * 60 * 1000 && timePlayed >= playTimeLimit) {
        alert("Час гри на сьогодні закінчився. Поверніться завтра!");
        return;
    }

    // Збільшуємо очки та зберігаємо
    score++;
    document.getElementById("score").innerText = "Очки: " + score;
    localStorage.setItem('raccoonCoinScore', score);

    // Зберігаємо оновлений час гри
    localStorage.setItem('timePlayed', timePlayed + 1000); // Додаємо 1 секунду до часу гри

    // Зміна позиції монети
    const coin = document.getElementById("coin");
    const x = Math.floor(Math.random() * (window.innerWidth - 100));
    const y = Math.floor(Math.random() * (window.innerHeight - 100));
    coin.style.left = x + "px";
    coin.style.top = y + "px";
}

// Функція для оновлення таймера
function updateTimer(timeLeft) {
    const timeDisplay = document.getElementById("time-left");
    clearInterval(timerInterval); // Скидаємо попередній таймер

    timerInterval = setInterval(() => {
        timeLeft -= 1000;
        localStorage.setItem('remainingTime', timeLeft); // Зберігаємо залишок часу у localStorage

        const minutes = Math.floor(timeLeft / (60 * 1000));
        const seconds = Math.floor((timeLeft % (60 * 1000)) / 1000);
        timeDisplay.innerText = `Час залишився: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Час гри на сьогодні закінчився. Поверніться завтра!");
            document.getElementById("coin").style.display = "none"; // Приховуємо монету
        }
    }, 1000);
}

// Завантаження гри при завантаженні сторінки
window.onload = loadGame;

// Додаємо стиль для позиціонування монети
const coin = document.getElementById("coin");
coin.style.position = "absolute";
coin.style.left = "50%";
coin.style.top = "50%";
coin.style.transform = "translate(-50%, -50%)";
