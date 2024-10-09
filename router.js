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

    for(let i = 0; i < draggableElements.length; i++){
        dragElement(draggableElements[i]);
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
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            console.log(elmnt.offsetTop)
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}//1'st task function


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