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

function addRoute(routeName,paramsObject){
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
function createTask(taskNumber,taskTitle, taskDescription, htmlMarkUp, codeFunction) {
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
    document.getElementById('content').innerHTML = '<h1>Лабораторна робота №5. Савчук Дмитро. ІПЗк-24-1</h1>';
});

let task1Params = {
    taskNumber: 1,
    taskTitle:'Task 1: check boxes countries',
    taskDescription: 'Дано чекбокси і кнопка. По натисканню на кнопку вивести в рядок значення вибраних елементів\n',
    htmlMarkUp: `
        <div class="checkbox-container">
            <label><input type="checkbox" value="ua"> Ukrainian</label><br>
            <label><input type="checkbox" value="en"> English</label><br>
            <label><input type="checkbox" value="sp"> Spanish</label><br>
        </div>
        <button id="submitBtn">ok</button>
        <h2>Chosen elements:</h2>
        <div id="result"></div>
    `,
    codeFunction: task1
};
addRoute('task1',task1Params) //1'st route with 1'st task
function task1() {
    document.getElementById('submitBtn').addEventListener('click', function () {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const selectedValues = [];

        checkboxes.forEach((checkbox) => {
            selectedValues.push(checkbox.value);
        });

        document.getElementById('result').textContent = selectedValues.join(', ') || 'nothing selected';
    });
}//1'st task function

let task2Params = {
    taskNumber: 2,
    taskTitle:'Task 2: check boxes e-mails',
    taskDescription: 'На сторінці розміщені електронні адреси з прапорцями (чекбоксами). Реалізуйте можливість формування рядку з вибраними електронними адресами. При позначенні електронної адреси, вона додається в div-елемент. При знятті чекбокса, адреса видаляється з елементу',
    htmlMarkUp: `
        <div class="checkbox-container">
            <label>
            <input type="checkbox" class="email-checkbox" value="email1@example.com"> email1@example.com
        </label><br>
        <label>
            <input type="checkbox" class="email-checkbox" value="email2@example.com"> email2@example.com
        </label><br>
        <label>
            <input type="checkbox" class="email-checkbox" value="email3@example.com"> email3@example.com
        </label><br>
        </div>
    
      <div id="selectedEmails"></div>
    `,
    codeFunction: task2
};
addRoute('task2',task2Params)
function task2(){
    document.querySelectorAll('.email-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const selectedEmailsDiv = document.getElementById('selectedEmails');
            const selectedEmails = Array.from(document.querySelectorAll('.email-checkbox:checked'))
                .map(checkbox => checkbox.value);

            selectedEmailsDiv.textContent = selectedEmails.join('; ');
        });
    });
}

let task3Params = {
    taskNumber: 3,
    taskTitle:'Task 3: multiplication table with Radio Button',
    taskDescription:'Створити JavaScript, який перевіряє знання таблиці множення. Веб-сторінка текстовий напис для показу загального рахунку, кнопку «наступне завдання», текстовий напис для показу завдання, радіокнопки для вибору правильного варіанту відповіді, та текстовий напис для виводу результатів перевірки. Вибір варіанту відповіді є сигналом до початку перевірки. Для кожного завдання користувач має лише одна спробу вибору.',
    htmlMarkUp: `
       <div id="score">Total score: 0</div>
    
    <div class="question">
        <span id="task"></span>
        <div id="answers"></div>
    </div>
    
    <button id="nextTask">submit</button>
    
    <div class="result" id="result"></div>
    `,
    codeFunction: task3
};
addRoute('task3',task3Params)
function task3(){
    let score = 0;
    let currentTask;
    let correctAnswer;
    let taskCount = 0;
    const maxTasks = 10;

    function generateTask() {
        if (taskCount >= maxTasks) {
            document.getElementById('task').textContent = 'Test completed! Your total score is: ' + score;
            document.getElementById('answers').innerHTML = '';
            document.getElementById('nextTask').disabled = true;
            return;
        }

        const num1 = Math.floor(Math.random() * 10) + 1; // число від 1 до 10
        const num2 = Math.floor(Math.random() * 10) + 1; // число від 1 до 10
        currentTask = `${num1} x ${num2}`;
        correctAnswer = num1 * num2;


        const answers = generateAnswers(correctAnswer);


        document.getElementById('task').textContent = `What is: ${currentTask}?`;

        const answersContainer = document.getElementById('answers');
        answersContainer.innerHTML = '';
        answers.forEach(answer => {
            const label = document.createElement('label');
            label.innerHTML = `<input class="checkbox" type="radio" name="answer" value="${answer}"> ${answer}`;
            answersContainer.appendChild(label);
            answersContainer.appendChild(document.createElement('br'));
        });


        document.getElementById('result').textContent = '';
        document.getElementById('nextTask').disabled = true;
    }

    function generateAnswers(correct) {
        const answers = new Set();
        answers.add(correct);
        while (answers.size < 4) {
            const wrongAnswer = Math.floor(Math.random() * 100);
            answers.add(wrongAnswer);
        }
        return Array.from(answers).sort(() => Math.random() - 0.5); // перемішуємо
    }

    document.getElementById('nextTask').addEventListener('click', function() {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (selected) {
            const userAnswer = parseInt(selected.value);
            if (userAnswer === correctAnswer) {
                score++;
                document.getElementById('result').textContent = 'Correct!';
            } else {
                document.getElementById('result').textContent = `Incorrect! The right answer is: ${correctAnswer}.`;
            }

            document.getElementById('score').textContent = `Total score: ${score}`;

            taskCount++;
            generateTask();
        } else {
            document.getElementById('result').textContent = 'Please, choose an answer!';
        }
    });

    document.getElementById('answers').addEventListener('change', function() {
        document.getElementById('nextTask').disabled = false; // активуємо кнопку
    });

    generateTask();
}


let task4Params = {
    taskNumber: 4,
    taskTitle:'Task 4: multiplication table with Form',
    taskDescription:'Створити JavaScript, який перевіряє знання таблиці множення. Веб-сторінка містить текстовий напис для показу загального рахунку, кнопку «наступне завдання», текстовий напис для показу завдання, текстове поле для вводу відповіді, кнопку «перевірити» та текстовий напис для виводу результатів перевірки.',
    htmlMarkUp: `
     <div id="score">Total score: 0</div>
    
    <div class="question">
        <span id="task"></span>
        <input type="text" id="answerInput" placeholder="answer">
    </div>
    
    <button id="nextTask">submit</button>
    
    <div class="result" id="result"></div>
    `,
    codeFunction: task4
};
addRoute('task4',task4Params)
function task4(){
    let score = 0;
    let currentTask;
    let correctAnswer;
    let taskCount = 0;
    const maxTasks = 10;

    function generateTask() {
        if (taskCount >= maxTasks) {
            document.getElementById('task').textContent = 'Test completed! Your total score: ' + score;
            document.getElementById('answerInput').style.display = 'none';
            document.getElementById('nextTask').disabled = true;
            return;
        }

        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        currentTask = `${num1} x ${num2}`;
        correctAnswer = num1 * num2;


        document.getElementById('task').textContent = `What is: ${currentTask}?`;


        document.getElementById('answerInput').value = '';
        document.getElementById('result').textContent = '';


        document.getElementById('nextTask').disabled = true;
    }


    document.getElementById('nextTask').addEventListener('click', function() {
        const userAnswer = parseInt(document.getElementById('answerInput').value);

        if (!isNaN(userAnswer)) {
            if (userAnswer === correctAnswer) {
                score++;
                document.getElementById('result').textContent = 'Correct!';
            } else {
                document.getElementById('result').textContent = `Incorrect!The right answer is: ${correctAnswer}.`;
            }

            document.getElementById('score').textContent = `Total score: ${score}`;

            taskCount++;

            generateTask();
        } else {
            document.getElementById('result').textContent = 'please, enter a number!';
        }
    });


    document.getElementById('answerInput').addEventListener('input', function() {
        document.getElementById('nextTask').disabled = false;
    });

    generateTask();
}

let task5Params = {
    taskNumber: 5,
    taskTitle:'Task 5: active images',
    taskDescription:`
     <p>  Створіть галерею зображень, кожне з яких неактивне. При клацанні по зображенню, воно стає активним. При наступному клацанні по ньому, воно знову стає неактивним.
   </p>
   
   <p> Для двох станів задайте наступні стилі: </p>
     <p>o   Активний стан: фільтр відтінки сірого(0%); непрозорість 1. </p>
     <p>o   Неактивний стан: фільтр відтінки сірого(100%); непрозорість 0.5.\</p>`,
    htmlMarkUp: `
<div style="display: flex; gap: 20px">
<div class="images">
   <img class="image inactive" src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg">
   <img class="image inactive" src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_640.jpg">
   <img class="image inactive" src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg">
   <img class="image inactive" src="https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-800x525.jpg">
   <img class="image inactive" src="https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?cs=srgb&dl=pexels-soldiervip-1308881.jpg&fm=jpg">
   <img class="image inactive" src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg">
   <img class="image inactive" src="https://cdn.pixabay.com/photo/2024/06/20/17/03/fishing-8842590_640.jpg">
   <img class="image inactive" src="https://img.freepik.com/premium-vector/beautiful-landscape-nature-background-images-free-download-freepik-vector_1305309-83.jpg">
   <img class="image inactive" src="https://t3.ftcdn.net/jpg/09/10/76/72/360_F_910767221_p4HlAC5VIn5W9cLspbf6OKpRvf2l4O5Z.jpg">
</div>

<div>

   <pre style="padding: 1em;
  margin: 0;
  overflow: auto;
  height: 100%;"><code class="language-css">.images {
    display: grid;
    grid-template-columns: repeat(3, 150px);
    grid-gap: 10px;
}

.image {
    cursor: pointer;
    width: 150px;
    height: 150px;
    object-fit: cover;
    transition: opacity 0.3s ease;
}

.inactive{
    filter: grayscale(100%);
    opacity: 0.5;
}</code></pre>

</div>
</div>


    `,
    codeFunction: task5
};
addRoute('task5',task5Params)
function task5(){
    document.querySelector('.images').addEventListener('click', function(event) {
        if (event.target.classList.contains('image')) {
            event.target.classList.toggle('inactive');
        }
    });
}

let task6Params = {
    taskNumber: 6,
    taskTitle:'Task 6: active form section color',
    taskDescription:'Реалізуйте елементи форми. При фокусуванні на елемент, секція, в якому він знаходиться, стає активною (синій колір)',
    htmlMarkUp: `

<div style="display: flex; gap: 20px">
<form class="task6Form">
<div class="input-wrapper">
<input placeholder="login">
</div>

<div class="input-wrapper">
<input placeholder="password">
</div>

<div class="input-wrapper">
<textarea placeholder="description"></textarea>
</div>
</form>

<div>
 <pre style="padding: 1em;
  margin: 0;
  overflow: auto;
  height: 100%;"><code class="language-css">.input-wrapper:focus-within {
    background-color: cornflowerblue;
}</code></pre>
</div>
</div>

    `,
    codeFunction: task6
};
addRoute('task6',task6Params)
function task6(){
   //no javascript
}

let task7Params = {
    taskNumber: 7,
    taskTitle:`Task 7: block's css changing`,
    taskDescription:'Реалізувати можливість змінювати розмір блока, а також його кут повороту:',
    htmlMarkUp: `

<div class="resizable-box" id="box"></div>

<label for="widthRange">widthRange</label>
<input type="range" id="widthRange" min="50" max="300" value="150">

<label for="heightRange">heightRange</label>
<input type="range" id="heightRange" min="50" max="300" value="150">

<label for="rotateRange">rotateRange</label>
<input type="range" id="rotateRange" min="0" max="360" value="0">

    `,
    codeFunction: task7
};
addRoute('task7',task7Params)
function task7(){
    const box = document.getElementById('box');
    const widthRange = document.getElementById('widthRange');
    const heightRange = document.getElementById('heightRange');
    const rotateRange = document.getElementById('rotateRange');

    widthRange.addEventListener('input', function() {
        const newWidth = widthRange.value + 'px';
        box.style.width = newWidth;
    });

    heightRange.addEventListener('input', function() {
        const newHeight = heightRange.value + 'px';
        box.style.height = newHeight;
    });

    rotateRange.addEventListener('input', function() {
        const rotation = rotateRange.value + 'deg';
        box.style.transform = `rotate(${rotation})`;
    });
}

let task8Params = {
    taskNumber: 8,
    taskTitle:`Task 8: mage 2x scale`,
    taskDescription:'Дана картинка в тегу img та кнопка. Зробіть кнопку, за натисканням на яку вперше ширина і висота картинки буде збільшуватися в 2 рази, вдруге – приходити у вихідний стан',
    htmlMarkUp: `

<img style="width: 300px;height: 200px"  id="imageToResize" src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg">
<button style="position: absolute" id="resizeButton">change size</button>
    `,
    codeFunction: task8
};
addRoute('task8',task8Params)
function task8(){
    let isOriginalSize = true;

    document.getElementById('resizeButton').addEventListener('click', function() {
        const img = document.getElementById('imageToResize');

        if (isOriginalSize) {
            img.style.width = 600 + 'px'
            img.style.height = 400 + 'px'
        } else {
            img.style.width = 300 + 'px'
            img.style.height = 200 + 'px'
        }

        isOriginalSize = !isOriginalSize;
    });
}

let task9Params = {
    taskNumber: 9,
    taskTitle:`Task 9: online shopping`,
    taskDescription:'Є список товарів з кнопками Замовити. При натисканні на неї, одиниця даного товару заноситься в кошик.\n',
    htmlMarkUp: `

<h2>Список товарів</h2>

<div class="tableFather">
<table>
  <thead>
    <tr>
      <th>Назва товару</th>
      <th>Ціна</th>
      <th>Дія</th>
    </tr>
  </thead>
  <tbody id="products">
    <tr>
      <td>штани</td>
      <td>40 грн</td>
      <td><button class="order-btn" data-name="штани" data-price="40">Замовити</button></td>
    </tr>
    <tr>
      <td>ноутбук</td>
      <td>20000 грн</td>
      <td><button class="order-btn" data-name="ноутбук" data-price="20000">Замовити</button></td>
    </tr>
    <tr>
      <td>шоколадка велика з орео</td>
      <td>200 грн</td>
      <td><button class="order-btn" data-name="шоколадка велика з орео" data-price="200">Замовити</button></td>
    </tr>
  </tbody>
</table>
</div>


<h2>Кошик</h2>


<div class="tableFather">
<table>
  <thead>
    <tr>
      <th>Назва товару</th>
      <th>Ціна</th>
      <th>Кількість</th>
    </tr>
  </thead>
  <tbody id="cart"></tbody>
</table>
</div>


    `,
    codeFunction: task9
};
addRoute('task9',task9Params)
function task9(){
    let cart = {};

    const orderButtons = document.querySelectorAll('.order-btn');

    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            addToCart(productName, price);
        });
    });

    function addToCart(productName, price) {
        if (cart[productName]) {
            cart[productName].quantity += 1;
        } else {
            cart[productName] = { price: price, quantity: 1 };
        }
        updateCart();
    }

    function updateCart() {
        const cartTable = document.getElementById('cart');
        cartTable.innerHTML = '';

        for (const product in cart) {
            const row = document.createElement('tr');
            row.innerHTML = `
        <td>${product}</td>
        <td>${cart[product].price} грн</td>
        <td>${cart[product].quantity}</td>
      `;
            cartTable.appendChild(row);
        }
    }
}

let task10Params = {
    taskNumber: 10,
    taskTitle:`Task 10: image carousel`,
    taskDescription:'Реалізувати в контейнері можливість переглядати світлини одна за одною при клацанні курсора. Світлини змінюють одна одну з ефектом слайдингу.\n',
    htmlMarkUp: `


<div class="owl-carousel">
  <div class="item"><img  src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg">
  </div>
  <div class="item">  <img src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg">
   </div>
  <div class="item"> <img  src="https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg?cs=srgb&dl=pexels-soldiervip-1308881.jpg&fm=jpg">
</div>
 
</div>


<!--<section class="slider-wrapper">-->
<!--  <button class="slide-arrow" id="slide-arrow-prev">-->
<!--    &#8249;-->
<!--  </button>-->
<!--  <button class="slide-arrow" id="slide-arrow-next">-->
<!--    &#8250;-->
<!--  </button>-->
<!--  <ul class="slides-container" id="slides-container">-->
<!--    <li class="slide"></li>-->
<!--    <li class="slide"></li>-->
<!--    <li class="slide"></li>-->
<!--  </ul>-->
<!--</section>-->

    `,
    codeFunction: task10
};
addRoute('task10',task10Params)
function task10(){
    $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
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


    // const slidesContainer = document.getElementById("slides-container");
    // const slide = document.querySelector(".slide");
    // const prevButton = document.getElementById("slide-arrow-prev");
    // const nextButton = document.getElementById("slide-arrow-next");
    //
    // nextButton.addEventListener("click", () => {
    //     const slideWidth = slide.clientWidth;
    //     slidesContainer.scrollLeft += slideWidth;
    // });
    //
    // prevButton.addEventListener("click", () => {
    //     const slideWidth = slide.clientWidth;
    //     slidesContainer.scrollLeft -= slideWidth;
    // });



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