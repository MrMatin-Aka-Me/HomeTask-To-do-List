const inputEl = document.querySelector('.taskInput');
const addTaskForm = document.querySelector('.addTaskForm');
const taskListEl = document.querySelector('.taskList');

//опции для форматирования даты
var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
};

//обработка нажатия на кнопку "Добавить"
addTaskForm.onsubmit = (evt) => {
    evt.preventDefault();

    //создаем объект Date
    const createDate = new Date();

    //создаем объект task
    const task = {
        id: Date.now(), //число (миллисекунды от 1.01.1970)
        title: inputEl.value,
        createDate: `${createDate.toLocaleString('ru', options)}`, //локализация и форматирование даты создания
        completeDate: '', //дата выполнения
    }

    inputEl.value = '';
    inputEl.focus();

    //вызываем функцию taskRender для отрисовки компонента для новой задачи
    taskRender(task);
};

function taskRender(task) {

    //создаем элемент div и присваиваем переменной taskDiv
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    //создаем элемент h5 для названия задачи и присваиваем переменной titleEl
    const titleEl = document.createElement('h5');
    titleEl.textContent = task.title;
    taskDiv.appendChild(titleEl);

    const createDateEl = document.createElement('div');
    createDateEl.textContent = `Дата создания: ${task.createDate}`;
    taskDiv.appendChild(createDateEl);

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('btn', 'btn-primary', 'completeBtn');
    completeBtn.textContent = 'Выполнено';

    //обработка нажатия на кнопку 'Выполнено'
    completeBtn.onclick = (evt) => {
        //создаем completedTaskDiv, который является выполненной версией задачи taskDiv
        const completedTaskDiv = document.createElement('div');

        //удаляем кнопку 'Выполнено' из taskDiv
        taskDiv.removeChild(evt.target);

        //копируем содержимое taskDiv в completedTaskDiv
        completedTaskDiv.innerHTML = taskDiv.innerHTML;

        //добавляем элементу completedTaskDiv класс taskCompleted, который перекрашивает этот элемент в зеленый цвет 
        completedTaskDiv.classList.add('task', 'taskCompleted');

        //создаем объект Date (дату выполнения)
        const completeDate = new Date();
        task.completeDate = `${completeDate.toLocaleString('ru', options)}`;

        //'рисуем' дату выполнения
        const completeDateEl = document.createElement('div');
        completeDateEl.textContent = `Дата выполнения: ${task.completeDate}`;
        completedTaskDiv.appendChild(completeDateEl);

        //добавляем элементу taskDiv класс removingEl, который в течение 1 секунды плавно делает прозрачным элемент taskDiv
        taskDiv.classList.add('removingEl');

        //по истечению 1 секунды удаляем элемент taskDiv и добавляем элемент completedTaskDiv в конец taskListEl  
        setTimeout(() => {
            taskListEl.removeChild(taskDiv);
            taskListEl.appendChild(completedTaskDiv);
        }, 1000);
    };

    //добавляем кнопку 'Выполнено' в taskDiv
    taskDiv.appendChild(completeBtn);

    //добавляем кнопку taskDiv перед первым элементом taskListEl
    taskListEl.insertBefore(taskDiv, taskListEl.firstChild);
}