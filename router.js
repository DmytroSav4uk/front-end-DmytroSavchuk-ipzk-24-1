// router class
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '';

        // Слушаем изменения в URL
        window.addEventListener('hashchange', () => {
            this.handleRoute(window.location.hash.slice(1));
        });

        // Обрабатываем маршрут при первой загрузке страницы
        this.handleRoute(window.location.hash.slice(1) || '/');
    }

    addRoute(path, handler) {
        this.routes[path] = handler;
    }

    navigate(path) {
        window.location.hash = path; // Изменяем хеш в URL
        this.handleRoute(path);
    }

    handleRoute(path) {
        this.currentRoute = path;
        const routeHandler = this.routes[path];

        if (routeHandler) {
            routeHandler();
        } else {
            console.error(`Route not found: ${path}`);
        }
    }
}

const router = new Router();

//constructor functions


function time(){
    const timeElement = document.getElementById("clock");

    function updateTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const clockStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeElement.innerText = clockStr;
    }

    updateTime();
    setInterval(updateTime, 1000);
}

time()




function addRoute(routeName, paramsObject) {
    router.addRoute(`/${routeName}`, () => {
        createTask(
            paramsObject.taskNumber,
            paramsObject.taskTitle,
            paramsObject.taskDescription,
            paramsObject.htmlMarkUp,
            paramsObject.codeFunction
        );
    });
}

function createTask(taskNumber, taskTitle, taskDescription, htmlMarkUp, codeFunction) {
    document.getElementById('content').innerHTML = `
        <h1>${taskTitle}</h1>
        <p>${taskDescription}</p>
        ${htmlMarkUp}
        <h2>Code:</h2>
        <pre><code class="language-javascript">${escapeHtml(codeFunction.toString())}</code></pre>
    `;
    codeFunction();
    Prism.highlightAll();
}


router.addRoute('/', () => {
    document.getElementById('content').innerHTML = '<h1>Лабораторна робота №7. Савчук Дмитро. ІПЗк-24-1</h1>';
});

let task1Params = {
    taskNumber: 1,
    taskTitle: 'Task 1: clock',
    taskDescription: 'Реалізуйте відображення годинника, що відображає поточний час у правому верхньому кутку екрана.',
    htmlMarkUp: `
<div class="clockFather">
    
</div>
    </div>      
    `,
    codeFunction: task1
};
addRoute('task1', task1Params)
function task1() {

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        const clockStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        timeElement.innerText = clockStr;

}




let task2Params = {
    taskNumber: 1,
    taskTitle: 'Task 2: timer',
    taskDescription: 'Реалізуйте таймери зворотного відліку. Розмістіть на сторінці 3 таймери, які мають певне початкове значення часу (години, хвилини та секунди). Кожний таймер повинен містити три кнопки: «Старт», «Стоп», «Скидання». При натисканні на кнопку «Старт», таймер починає зворотній відлік від початкового значення часу до «00:00:00». Досягаючи нульового значення часу таймер повинен зупинитися. При натисканні на кнопку «Стоп» таймер повинен зупинитися. Натискання на кнопку «Скидання» призводить до ініціалізації таймера початковим значенням часу.\n',
    htmlMarkUp: `
<div class="timers">
    <div class="timer">
        <p class="time">00:01:00</p>
        <button class="start">Start</button>
        <button class="stop">Stop</button>
        <button class="reset">Reset</button>
    </div>

    <div class="timer">
        <p class="time">00:02:00</p>
        <button class="start">Start</button>
        <button class="stop">Stop</button>
        <button class="reset">Reset</button>
    </div>

    <div class="timer">
        <p class="time">00:05:00</p>
        <button class="start">Start</button>
        <button class="stop">Stop</button>
        <button class="reset">Reset</button>
    </div>
</div>

      
    `,
    codeFunction: task2
};
addRoute('task2', task2Params)
function task2() {

    function timeToSeconds(timeStr) {
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    function secondsToTime(seconds) {
        const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    document.querySelectorAll('.timer').forEach(timer => {
        let intervalId;
        const timeElement = timer.querySelector('.time');
        const startButton = timer.querySelector('.start');
        const stopButton = timer.querySelector('.stop');
        const resetButton = timer.querySelector('.reset');
        const initialTime = timeToSeconds(timeElement.textContent);
        let currentTime = initialTime;

        startButton.addEventListener('click', () => {
            if (intervalId) return;
            intervalId = setInterval(() => {
                if (currentTime > 0) {
                    currentTime--;
                    timeElement.textContent = secondsToTime(currentTime);
                } else {
                    clearInterval(intervalId);
                    intervalId = null;
                }
            }, 1000);
        });

        stopButton.addEventListener('click', () => {
            clearInterval(intervalId);
            intervalId = null;
        });

        resetButton.addEventListener('click', () => {
            clearInterval(intervalId);
            intervalId = null;
            currentTime = initialTime;
            timeElement.textContent = secondsToTime(initialTime);
        });
    });


}

let task3Params = {
    taskNumber: 1,
    taskTitle: 'Task 3: carousel',
    taskDescription: 'Створіть просте слайд-шоу графічних зображень, яке буде автоматично змінювати картинки через певний інтервал часу.\t\n',
    htmlMarkUp: `

<div>

<div class="owl-carousel">
  <div class="item"><img  src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg">
  </div>
  <div class="item">  <img src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg">
   </div>
  <div class="item"> <img  src="https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?cs=srgb&dl=pexels-soldiervip-1308881.jpg&fm=jpg">
</div>

</div>

      
    `,
    codeFunction: task3
};
addRoute('task3', task3Params)
function task3() {
    $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
            loop: true,
            autoplay:true,
            autoPlaySpeed:10,
            autoPlayTimeout:10,
            autoPlayHoverPause:true,
            margin: 10,
            nav: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    });

}

let task4Params = {
    taskNumber: 1,
    taskTitle: 'Task 4: moving blocks',
    taskDescription: 'Реалізуйте автоматичне переміщення декількох блоків по екрану. Блоки повинні починати рухатися у випадкових напрямках. Досягаючи границь вікна браузера блоки повинні починати рух у зворотному напрямку.\n',
    htmlMarkUp: `

<div class="container">
    <div class="block" style="background-color: #ff5733;"></div>
    <div class="block" style="background-color: #33c1ff;"></div>
    <div class="block" style="background-color: #75ff33;"></div>
</div>
     
    `,
    codeFunction: task4
};
addRoute('task4', task4Params)
function task4() {
// Отримуємо всі блоки та запускаємо анімацію для кожного з них.
    document.querySelectorAll('.block').forEach(block => {
        let x = Math.random() * (window.innerWidth - 50); // Випадкова початкова позиція (X)
        let y = Math.random() * (window.innerHeight - 50); // Випадкова початкова позиція (Y)
        let dx = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 3); // Швидкість та напрямок по X
        let dy = (Math.random() < 0.5 ? -1 : 1) * (2 + Math.random() * 3); // Швидкість та напрямок по Y

        // Встановлюємо початкову позицію блока.
        block.style.transform = `translate(${x}px, ${y}px)`;

        function moveBlock() {
            // Оновлюємо координати.
            x += dx;
            y += dy;

            if (x <= 0 || x >= window.innerWidth - 50) {
                dx = -dx; // Змінюємо напрямок по X.
            }
            if (y <= 0 || y >= window.innerHeight - 50) {
                dy = -dy; // Змінюємо напрямок по Y.
            }

            block.style.transform = `translate(${x}px, ${y}px)`;

            requestAnimationFrame(moveBlock);
        }
        moveBlock();
    });

}



//code highlights
function escapeHtml(html) {
    return html
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.getElementById('navbar').addEventListener('click', (event) => {
    if (event.target.matches('a')) {
        event.preventDefault();
        const path = event.target.getAttribute('href').slice(1);
        router.navigate(path);
    }
});

router.handleRoute(window.location.hash.slice(1) || '/');




