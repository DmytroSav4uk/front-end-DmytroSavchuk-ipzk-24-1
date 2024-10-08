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
    document.getElementById('content').innerHTML = '<h1>Лабораторна робота №6. Савчук Дмитро. ІПЗк-24-1</h1>';
});

let task1Params = {
    taskNumber: 1,
    taskTitle: 'Task 1: add users to table',
    taskDescription: 'Дана таблиця з користувачами: номер, ім\'я та прізвище. Під таблицею зробіть форму, з допомогою якої можна буде додати нового користувача в таблицю.',
    htmlMarkUp: `
     
        <table id="userTable">
        <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Surname</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>Dmytro</td>
                <td>Savchuk</td>
            </tr>
            <tr>
                <td>2</td>
                <td>Robert</td>
                <td>Bob</td>
            </tr>
        </tbody>     
        </table>
        
        
        <div class="form-container form-group">
            <form  id="userForm">           
            <input class="form-control" type="text" id="firstName" required placeholder="name">       
            <input class="form-control" type="text" id="lastName" required placeholder="surname">
            <button class="btn btn-dark" type="submit">submit</button>
        </form>
    </div>
        
    `,
    codeFunction: task1
};
addRoute('task1', task1Params) //1'st route with 1'st task
function task1() {
    let userCount = 2;

    document.getElementById('userForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;

        userCount++;

        const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();

        const numberCell = newRow.insertCell(0);
        const firstNameCell = newRow.insertCell(1);
        const lastNameCell = newRow.insertCell(2);

        numberCell.textContent = userCount;
        firstNameCell.textContent = firstName;
        lastNameCell.textContent = lastName;

        document.getElementById('userForm').reset();
    });
}//1'st task function

let task2Params = {
    taskNumber: 2,
    taskTitle: 'Task 2: textarea table color background',
    taskDescription: 'В елемент textarea вводяться нулі та одиниці і з них потрібно сформувати квадратики чорного і білого кольору',
    htmlMarkUp: `
     
     <textarea id="binaryInput" rows="5" cols="30"></textarea>
    <table id="gridTable"></table>
        
    `,
    codeFunction: task2
};
addRoute('task2', task2Params)
function task2() {
    const binaryInput = document.getElementById('binaryInput');
    const gridTable = document.getElementById('gridTable');

    binaryInput.addEventListener('input', generateGrid);

    function generateGrid() {

// сердечко для копіювання
        //       11111       11111
        //      1111111     1111111
        //     111111111   111111111
        //    11111111111 11111111111
        //   111111111111111111111111
        //  11111111111111111111111111
        //  11111111111111111111111111
        //   111111111111111111111111
        //    1111111111111111111111
        //     11111111111111111111
        //      111111111111111111
        //       1111111111111111
        //        11111111111111
        //         111111111111
        //          1111111111
        //           11111111
        //            111111
        //             1111
        //              11
        const input = binaryInput.value;
        gridTable.innerHTML = '';
        const rows = input.split('\n');


        rows.forEach(row => {

            const tableRow = document.createElement('tr');

            for (let i = 0; i < row.length; i++) {
                const char = row[i];
                const tableCell = document.createElement('td');
                if (char === '1') {
                    tableCell.classList.add('black');
                } else if (char === '0') {
                    tableCell.classList.add('white');
                }
                tableRow.appendChild(tableCell);
            }


            gridTable.appendChild(tableRow);
        });
    }
}

let task3Params = {
    taskNumber: 3,
    taskTitle: 'Task 3: color picker',
    taskDescription: 'Вибрати потрібні кольори з палітри кольорів та залити ними даний прямокутник (блок).\n' +
        'Кольори в палітрі повинні вибиратись клацанням. Повторне клацання повинно відміняти вибір. Заливка прямокутника відбувається одночасно з вибором кольорів. Якщо вибрано декілька кольорів, то заливка градієнтна.\n',
    htmlMarkUp: `
     
<div class="palette">
    <div class="color-box" style="background-color: red;" data-color="red"></div>
    <div class="color-box" style="background-color: blue;" data-color="blue"></div>
    <div class="color-box" style="background-color: green;" data-color="green"></div>
    <div class="color-box" style="background-color: deeppink;" data-color="deeppink"></div>
    <div class="color-box" style="background-color: violet;" data-color="violet"></div>
    <div class="color-box" style="background-color: bisque;" data-color="bisque"></div>
    <div class="color-box" style="background-color: olive;" data-color="olive"></div>
</div>

<div id="rectangle"></div>
        
    `,
    codeFunction: task3
};
addRoute('task3', task3Params)
function task3() {
    const colorBoxes = document.querySelectorAll('.color-box');
    const rectangle = document.getElementById('rectangle');
    let selectedColors = [];

    colorBoxes.forEach(box => {
        box.addEventListener('click', function() {
            const color = this.dataset.color;

            if (selectedColors.includes(color)) {
                selectedColors = selectedColors.filter(c => c !== color);
                this.classList.remove('selected');
            } else {

                selectedColors.push(color);
                this.classList.add('selected');
            }

            updateRectangleBackground();
        });
    });

    function updateRectangleBackground() {
        if (selectedColors.length === 0) {
            rectangle.style.background = 'white';
        } else if (selectedColors.length === 1) {
            rectangle.style.background = selectedColors[0];
        } else {

            const gradient = `linear-gradient(180deg, ${selectedColors.join(', ')})`;
            rectangle.style.background = gradient;
        }
    }
}

let task4Params = {
    taskNumber: 4,
    taskTitle: 'Task 4: text editing and deleting',
    taskDescription: 'Є блоки з текстом. В кожному з блоків є кнопки Видалити та Редагувати\n' +
        'При натисканні на кнопку Видалити, даний блок зникає. При натисканні на Редагувати блок переходить в стан редагування (наприклад, з допомогою textarea). При знятті фокуса з textarea, блок повертається в звичайний стан.\n',
    htmlMarkUp: `
     
<div class="block">
    <p class="block-text">Жили собі дід та баба, та такі убогі, що нічого в них не було. Одного разу дід і каже:
– Бабусю! Піди у хижку та назмітай у засіці борошна, та спечи мені колобок.
Баба так і зробила. Спекла колобок і залишила на вікні, щоб простиг. А він з вікна та на призьбу, а з призьби та на землю, та й покотився дорогою.
Котиться, котиться, а назустріч йому зайчик-побігайчик:
– Колобок, колобок, я тебе з’їм!
– Не їж мене, зайчику-побігайчику, я тобі пісню заспіваю.
– Ану, якої?
Я по коробу метений, На яйцях спечений, Я від баби втік, я від діда втік, І від тебе втечу!</p>
    <div class="block-buttons">
        <button class="edit-btn">Редагувати</button>
        <button class="delete-btn">Видалити</button>
    </div>
</div>

<div class="block">
    <p class="block-text">Та й покотився. Котиться, котиться, зустрічає його вовк:
– Колобок, колобок, я тебе з’їм!
– Не їж мене, вовчику-братику, я тобі пісню заспіваю.
– Ану, якої? Я по коробу метений, На яйцях спечений, Я від баби втік, я від діда втік, І від тебе втечу!</p>
    <div class="block-buttons">
        <button class="edit-btn">Редагувати</button>
        <button class="delete-btn">Видалити</button>
    </div>
</div>

<div class="block">
    <p class="block-text">Та й побіг. Знову біжить та й біжить, зустрічає його ведмідь:
– Колобок, колобок, я тебе з’їм!
– Не їж мене, ведмедику-братику, я тобі пісню заспіваю.
– Ану!
Я по коробу метений, На яйцях спечений, Я від баби втік, я від діда втік, І від тебе втечу!</p>
    <div class="block-buttons">
        <button class="edit-btn">Редагувати</button>
        <button class="delete-btn">Видалити</button>
    </div>
</div>
        
    `,
    codeFunction: task4
};
addRoute('task4', task4Params)
function task4() {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.block').remove();
        });
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', function() {
            const block = this.closest('.block');
            const blockText = block.querySelector('.block-text');
            const originalText = blockText.textContent;

            const textarea = document.createElement('textarea');
            textarea.value = originalText;

            blockText.replaceWith(textarea);
            textarea.focus();

            textarea.addEventListener('blur', function() {
                const newText = textarea.value;

                const newParagraph = document.createElement('p');
                newParagraph.className = 'block-text';
                newParagraph.textContent = newText;

                textarea.replaceWith(newParagraph);
            });
        });
    });
}

let task5Params = {
    taskNumber: 5,
    taskTitle: 'Task 5: drawing',
    taskDescription:'Задати можливість заливати квадратики вибраним кольором.\n' +
        'Є палітра кольорів, в якій клацанням можна вибрати лише один колір. І є прямокутне полотно (контейнер, блок), яке заповнене маленькими блоками-квадратиками. При клацанні курсором на ці квадратики, вони повинні заливатись вибраним кольором.\n',
    htmlMarkUp: `
     
<div class="palette">
    <div class="color-box" style="background-color: red;" data-color="red"></div>
    <div class="color-box" style="background-color: blue;" data-color="blue"></div>
    <div class="color-box" style="background-color: green;" data-color="green"></div>
    <div class="color-box" style="background-color: yellow;" data-color="yellow"></div>
</div>

<div class="canvas">
</div>
        
    `,
    codeFunction: task5
};
addRoute('task5', task5Params)
function task5() {
    const palette = document.querySelectorAll('.color-box');
    const canvas = document.querySelector('.canvas');
    let selectedColor = null;

    for (let i = 0; i < 100; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        canvas.appendChild(square);


        square.addEventListener('click', function() {
            if (selectedColor) {
                this.style.backgroundColor = selectedColor;
            }
        });
    }
    palette.forEach(box => {
        box.addEventListener('click', function() {
            palette.forEach(box => box.classList.remove('selected'));
            this.classList.add('selected');
            selectedColor = this.dataset.color;
        });
    });
}


let task6Params = {
    taskNumber: 6,
    taskTitle: 'Task 6: cards',
    taskDescription:'Є ряд гральних карт, повернутих до нас «сорочкою». При клацанні на карту, вона повертається до нас  лицьовим боком протягом 1-2 секунд (повинен бути саме поворот). При повторному клацанні, карта знову повертається «сорочкою».\n',
    htmlMarkUp: `

<div class="with-css">
<div class="card-container">
    <div class="card" data-card="A">
        <div class="card-inner">
            <div class="card-face card-front">
            
            <img src="https://w7.pngwing.com/pngs/902/280/png-transparent-ace-of-spades-playing-card-ace-of-hearts-spades-game-angle-king-thumbnail.png">
            
</div>
            <div class="card-face card-back">  <img src="https://media.istockphoto.com/id/459234653/photo/back-side-of-playing-card.jpg?s=612x612&w=0&k=20&c=U1YUsBOZuuKgeXW6yT3dUZmQFBuzEooRUQJrmvGT1DA=">
           </div>
        </div>
    </div>
    <div class="card" data-card="K">
        <div class="card-inner">
            <div class="card-face card-front">
             <img src="https://w7.pngwing.com/pngs/902/280/png-transparent-ace-of-spades-playing-card-ace-of-hearts-spades-game-angle-king-thumbnail.png">           
</div>
            <div class="card-face card-back">  <img src="https://media.istockphoto.com/id/459234653/photo/back-side-of-playing-card.jpg?s=612x612&w=0&k=20&c=U1YUsBOZuuKgeXW6yT3dUZmQFBuzEooRUQJrmvGT1DA=">
           </div>
        </div>
    </div>
    <div class="card" data-card="Q">
        <div class="card-inner">
            <div class="card-face card-front">
             <img src="https://w7.pngwing.com/pngs/902/280/png-transparent-ace-of-spades-playing-card-ace-of-hearts-spades-game-angle-king-thumbnail.png">          
</div>
            <div class="card-face card-back">  <img src="https://media.istockphoto.com/id/459234653/photo/back-side-of-playing-card.jpg?s=612x612&w=0&k=20&c=U1YUsBOZuuKgeXW6yT3dUZmQFBuzEooRUQJrmvGT1DA=">
           </div>
        </div>
    </div>
    <div class="card" data-card="J">
        <div class="card-inner">
            <div class="card-face card-front">
             <img src="https://w7.pngwing.com/pngs/902/280/png-transparent-ace-of-spades-playing-card-ace-of-hearts-spades-game-angle-king-thumbnail.png">           
</div>
            <div class="card-face card-back">           
            <img src="https://media.istockphoto.com/id/459234653/photo/back-side-of-playing-card.jpg?s=612x612&w=0&k=20&c=U1YUsBOZuuKgeXW6yT3dUZmQFBuzEooRUQJrmvGT1DA=">   
</div>
        </div>
    </div>
</div>
<div class="css">
 <pre style="padding: 1em;
  margin: 0;
  overflow: auto;
  height: 100%;"><code class="language-css">.card-container {
    display: flex;
    gap: 120px;
    margin: 100px 100px 100px 100px;
}

.card {
    cursor: pointer;
    height: 100px;
    perspective: 1000px;
}

.card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 1s;
}

.card-inner img {
    width: 100px;
}

.card.flipped .card-inner {
    transform: rotateY(180deg);
}

.card-face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.card-back {
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotateY(180deg);
}


.card-front {
    display: flex;
    align-items: center;
    justify-content: center;
}</code></pre>
</div>
</div>
     



        
    `,
    codeFunction: task6
};
addRoute('task6', task6Params)
function task6() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

let task7Params = {
    taskNumber: 7,
    taskTitle: 'Task 7: forum',
    taskDescription:'Створити html-сторінку зі списком повідомлень на форумі та формою для додавання нового повідомлення. Після заповнення форми додати повідомлення до списку на екрані',
    htmlMarkUp: `



<div id="messageList" class="message-list"></div>     

<div class="form-container">
    <form class="" id="messageForm">
        <input style="width: 200px!important;" type="text" id="userName" placeholder="Ваше ім'я" required />
        <textarea style="width: 500px!important; height: 300px" id="messageText" placeholder="Введіть ваше повідомлення" required></textarea>
        <br>
        <button type="submit">Додати повідомлення</button>
    </form>
</div>

    `,
    codeFunction: task7
};
addRoute('task7', task7Params)
function task7() {
    document.getElementById('messageForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const userName = document.getElementById('userName').value;
        const messageText = document.getElementById('messageText').value;


        document.getElementById('userName').value = '';
        document.getElementById('messageText').value = '';

        const currentTime = new Date();
        const formattedTime = currentTime.toLocaleString();

        const newMessage = document.createElement('div');
        newMessage.className = 'message-item';

        newMessage.innerHTML = `

<div class="message">
    <div class="sender">
   <p>${userName}</p>
   <p>${formattedTime}</p>
    </div>
    <div class="msg">
    <p>${messageText} </p>
    </div>
</div>     
        `;
        document.getElementById('messageList').appendChild(newMessage);
    });
}

let task8Params = {
    taskNumber: 8,
    taskTitle: 'Task 8: books',
    taskDescription:'Створити html-сторінку зі списком книг. При натисканні на книгу, колір фону повинен змінюватися на зелений. Врахуйте, що при повторному натисканні на іншу книгу, попередньої – необхідно повертати колишній колір.\n',
    htmlMarkUp: `
<ul id="bookList" class="book-list">
    <li class="book-item">Тореадори з Васюківки</li>
    <li class="book-item">Пригоди Тома Сойера</li>
    <li class="book-item">Моя подруга Нокотан</li>
    <li class="book-item">Хоббіт</li>
    <li class="book-item">Енциклопедія: Динозаври</li>
</ul>
    `,
    codeFunction: task8
};
addRoute('task8', task8Params)
function task8() {
    const bookItems = document.querySelectorAll('.book-item');
    let activeBook = null;

    bookItems.forEach(item => {
        item.addEventListener('click', function() {
            if (activeBook) {
                activeBook.classList.remove('active');
            }
            this.classList.add('active');
            activeBook = this;
        });
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