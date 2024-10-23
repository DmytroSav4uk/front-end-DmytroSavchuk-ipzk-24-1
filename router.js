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
    document.getElementById('content').innerHTML = '<h1>Лабораторна робота №7. Савчук Дмитро. ІПЗк-24-1</h1>';
});

let task1Params = {
    taskNumber: 1,
    taskTitle: 'Task 1: draggable',
    taskDescription: 'Надати квадратикам можливість перетягування (draggable) в межах контейнера. При переміщенні курсора, наведеному на даний блок-квадратик, та утриманні кнопки миші даний елемент повинен перетягуватись. Квадратики не повинні заходити навіть частково за межі контейнера.',
    htmlMarkUp: `
<div class="draggableFather">
    <div class="draggableChild blue"></div>
    <div class="draggableChild pink"></div>
    <div class="draggableChild green"></div>
    <div class="draggableChild yellow"></div>
</div>      
    `,
    codeFunction: task1
};
addRoute('task1', task1Params) //1'st route with 1'st task
function task1() {
    let draggableElements = document.getElementsByClassName("draggableChild");
    let container = document.getElementsByClassName("draggableFather")[0];

    for (let i = 0; i < draggableElements.length; i++) {
        dragElement(draggableElements[i]);
        draggableElements[i].addEventListener('mousedown', function () {
            draggableElements[i].style.cursor = 'grabbing';
        });
        draggableElements[i].addEventListener('mouseup', function () {
            draggableElements[i].style.cursor = 'grab';
        });
    }

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            pos3 = parseInt(e.clientX);
            pos4 = parseInt(e.clientY);
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            return false;
        }

        function elementDrag(e) {
            e = e || window.event;
            pos1 = pos3 - parseInt(e.clientX);
            pos2 = pos4 - parseInt(e.clientY);
            pos3 = parseInt(e.clientX);
            pos4 = parseInt(e.clientY);

            let containerRect = container.getBoundingClientRect();
            let elmntRect = elmnt.getBoundingClientRect();

            let newTop = elmnt.offsetTop - pos2;
            let newLeft = elmnt.offsetLeft - pos1;

            if (newTop < 0) newTop = 0;
            if (newTop + elmntRect.height > containerRect.height) {
                newTop = containerRect.height - elmntRect.height;
            }
            if (newLeft < 0) newLeft = 0;
            if (newLeft + elmntRect.width > containerRect.width) {
                newLeft = containerRect.width - elmntRect.width;
            }
            elmnt.style.top = newTop + "px";
            elmnt.style.left = newLeft + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

let task2Params = {
    taskNumber: 1,
    taskTitle: 'Task 2: circles',
    taskDescription: 'Розмістіть на сторінці випадковим чином 20 кольорових кружечків з радіусами від 10 до 30. Перший з них є активним (реалізуйте візуальне виділення активного кружечка).  Передбачте такі можливості:\n' +
        'при натисканні на клавішу «Tab» повинен ставати активним наступний кружечок. \n' +
        'при натисканні комбінації клавіш “Shift-Tab”, активним повинен ставати попередній кружечок. \n' +
        'клавіші стрілок повинні зміщувати активний кружечок у відповідну сторону на 10 пікселів.\n',
    htmlMarkUp: `
<div class="circleContent">
   
</div>      
    `,
    codeFunction: task2
};
addRoute('task2', task2Params)

function task2() {

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 3; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const content = document.querySelector('.circleContent');
    const circles = [];
    const contentWidth = content.clientWidth;
    const contentHeight = content.clientHeight;

    for (let i = 0; i < 20; i++) {
        const circle = document.createElement('div');
        const size = getRandomNumber(20, 60);
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.backgroundColor = getRandomColor();
        circle.classList.add('circle');

        const maxLeft = contentWidth - size;
        const maxTop = contentHeight - size;
        circle.style.left = `${getRandomNumber(0, maxLeft)}px`;
        circle.style.top = `${getRandomNumber(0, maxTop)}px`;

        content.appendChild(circle);
        circles.push(circle);
    }

    let activeIndex = 0;
    circles[activeIndex].classList.add('active');

    function setActiveCircle(index) {
        circles[activeIndex].classList.remove('active');
        activeIndex = index;
        circles[activeIndex].classList.add('active');
    }


    document.addEventListener('keydown', (event) => {
        event.preventDefault()
        const activeCircle = circles[activeIndex];
        const circleSize = parseInt(activeCircle.style.width);
        let left = parseInt(activeCircle.style.left);
        let top = parseInt(activeCircle.style.top);

        switch (event.key) {
            case 'Tab':
                event.preventDefault();
                if (event.shiftKey) {
                    setActiveCircle((activeIndex - 1 + circles.length) % circles.length);
                } else {
                    setActiveCircle((activeIndex + 1) % circles.length);
                }
                break;
            case 'ArrowUp':
                if (top > 0) {
                    activeCircle.style.top = `${Math.max(top - 10, 0)}px`;
                }
                break;
            case 'ArrowDown':
                if (top < contentHeight - circleSize) {
                    activeCircle.style.top = `${Math.min(top + 10, contentHeight - circleSize)}px`;
                }
                break;
            case 'ArrowLeft':
                if (left > 0) {
                    activeCircle.style.left = `${Math.max(left - 10, 0)}px`;
                }
                break;
            case 'ArrowRight':
                if (left < contentWidth - circleSize) {
                    activeCircle.style.left = `${Math.min(left + 10, contentWidth - circleSize)}px`;
                }
                break;
        }
    });


}

let task3Params = {
    taskNumber: 3,
    taskTitle: 'Task 3: running button',
    taskDescription: 'Реалізуйте «утікаючу» кнопку. В div-елементі знаходиться кнопка. Проте при наведенні на неї курсора миші, вона змінює своє положення так, що унеможливлює натиснення на неї. Кнопка не повинна виходити за межі  div-елемента',
    htmlMarkUp: `
<div class="running">
   <p>Do you like JavaScript?</p>
   
   <div style="display: flex; justify-content: center; gap: 20px;">
    <img id="yesImage" src="https://i.gifer.com/YARz.gif" alt="happy">
    <img id="noImage" src="https://media.tenor.com/njdQSjPlo_oAAAAM/gun-gore.gif" alt="angry">
   </div>
   
   <div style="display: flex; justify-content: center; gap: 20px;">
       <button class="black-button" id="yesButton">Yes</button>
       <button class="black-button no-button" id="noButton">No</button>
   </div>
</div>   
    `,
    codeFunction: task3
};
addRoute('task3', task3Params)

function task3() {

    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    const yesImage = document.getElementById('yesImage');
    const noImage = document.getElementById('noImage');

    yesButton.addEventListener('click', () => {
        yesImage.classList.add('visible');
        noImage.classList.remove('visible');
    });

    noButton.addEventListener('click', () => {
        noImage.classList.add('visible');
        yesImage.classList.remove('visible');
    });

    noButton.addEventListener('mouseenter', () => {
        const content = document.querySelector('.content');
        const contentWidth = content.clientWidth;
        const contentHeight = content.clientHeight;
        const buttonWidth = noButton.offsetWidth;
        const buttonHeight = noButton.offsetHeight;


        let newLeft = Math.random() * (contentWidth - buttonWidth);
        let newTop = Math.random() * (contentHeight - buttonHeight);


        noButton.style.position = 'absolute';
        noButton.style.left = `${newLeft}px`;
        noButton.style.top = `${newTop}px`;
    });

}

let task4Params = {
    taskNumber: 3,
    taskTitle: 'Task 4: file manager',
    taskDescription: 'Розмістіть список з елементів, які можна буде виділяти, як у файлових менеджерах. Передбачте такі можливості:\n' +
        'клік на елементі списку виділяє лише цей елемент (додає клас .selected), та знімає виділення з усіх інших;\n' +
        'клік за допомогою Ctrl (Cmd для Mac) виділяє елемент (або якщо елемент виділений, то знімає виділення з нього), виділення інших елементів при цьому не змінюються.',
    htmlMarkUp: `
 <div class="container">
        <ul id="itemList">
            <li class="item">file 1</li>
            <li class="item">file 2</li>
            <li class="item">file 3</li>
            <li class="item">file 4</li>
            <li class="item">file 5</li>
        </ul>
    </div>
    `,
    codeFunction: task4
};
addRoute('task4', task4Params)
function task4() {
    const itemList = document.getElementById('itemList');

    itemList.addEventListener('click', (event) => {
        if (event.target.classList.contains('item')) {
            const selectedItem = event.target;
            if (event.ctrlKey || event.metaKey) {
                selectedItem.classList.toggle('selected');
            } else {
                const items = itemList.querySelectorAll('.item');
                items.forEach(item => item.classList.remove('selected'));
                selectedItem.classList.add('selected');
            }
        }
    });

    document.addEventListener('click', (event) => {
        if (!itemList.contains(event.target)) {
            const items = itemList.querySelectorAll('.item');
            items.forEach(item => item.classList.remove('selected'));
        }
    });
}

let task5Params = {
    taskNumber: 3,
    taskTitle: 'Task 5: slider',
    taskDescription: 'Реалізуйте елемент “слайдер”, який має такий вигляд:\n' +
        '\n' +
        '\n' +
        'Передбачте такі особливості його роботи:\n' +
        'при наведенні курсору миші на «повзунок», користувач затискає кнопку миші і рухає «повзунок» переміщаючи курсор миші;\n' +
        'при натиснутій кнопці миші, курсор може виходити за межі слайдера, але слайдер все одно має працювати (це зручно для користувача);\n' +
        'слайдер повинен нормально працювати при різкому русі миші ліворуч або праворуч за межі слайдера. При цьому «повзунок» повинен зупинятися чітко біля його краю.\n',
    htmlMarkUp: `
 <div class="slider-container">
        <div class="slider-track">
            <div class="slider-thumb" id="sliderThumb"></div>
        </div>
    </div>
    `,
    codeFunction: task5
};
addRoute('task5', task5Params)
function task5() {
    const sliderThumb = document.getElementById('sliderThumb');
    const sliderTrack = document.querySelector('.slider-track');

    let isDragging = false;

    sliderThumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        sliderThumb.style.cursor = 'grabbing'
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const rect = sliderTrack.getBoundingClientRect();
            let newLeft = e.clientX - rect.left - (sliderThumb.offsetWidth / 2);
            if (newLeft < 0) {
                newLeft = 0;
            }
            if (newLeft > rect.width - sliderThumb.offsetWidth) {
                newLeft = rect.width - sliderThumb.offsetWidth;
            }
            sliderThumb.style.left = `${newLeft}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        sliderThumb.style.cursor = 'grab'
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