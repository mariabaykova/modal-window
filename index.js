const wrapperElem = document.querySelector(".wrapper");
const modalWindowElem = document.querySelector("#modal-window-id");
const buttonElem = document.querySelector("#button-open");
const shadowElem = document.querySelector("#wrapper-shadow");
const bodyElem = document.querySelector("body");

shadowElem.style.display = "none";

buttonElem.addEventListener( "click", (event) => {
    let btnTarget = event.target;
    clearBlock(modalWindowElem);
    openModalWindow(modalWindowElem, "Сообщение в модальное окно");

    // включить прослушку клика всего документа
    document.addEventListener( "click", ( e ) => {
        let target = e.target;
        // первое условие проверяет, есть ли блок в нашем окне, по идее, если нет, то мы не вызывали его,
        // btnTarget != target - а это исключает немедленное закрытие нашего окна по событию "клик по кнопке", которое по сути является кликом вне модального окна
        if ( !isEmpty(modalWindowElem) && ( btnTarget != target ) ) {
            if ( modalWindowElem.contains(target) ) {
                // alert("Click inside target element!");
                // кликнули по модальному окну, ничего не делать пока
              } else {
                // alert("Click outside target element!");
                clearBlock( modalWindowElem );
                closeModalWindow( modalWindowElem );
                // убрать прослушку всего документа
                document.removeEventListener('click', (event) => {});
              }
        }
    } 
    );
}
);

// открыть модальное окно
function openModalWindow( elem, message ) {
    // затемнить страницу
    shadowElem.style.display = "";
    // отменить прокрутку
    bodyElem.classList.add("scroll-cancel");

    // elem.classList.add("message");
    const messageBox = document.createElement("span");
    messageBox.classList.add("message");

    messageBox.textContent = message;
    elem.appendChild(messageBox);

    // показать модальное окно
    elem.classList.add("modal-window_open");


}
// закрыть модальное окно
function closeModalWindow( elem ) { 
    // окно убрать
    elem.classList.remove("modal-window_open");
     // растемнить страницу
    shadowElem.style.display = "none";
    // включить прокрутку
    bodyElem.classList.remove("scroll-cancel");
}

// очистка блока
function clearBlock( block ) {
    let blockLength = block.children.length;
    for ( let ii = 0; ii < blockLength; ii++ ) {
        block.removeChild(block.lastElementChild);
    }
}

// поверка на наличие дочерних блоков элемента
function isEmpty( block ) {
    return !block.children.length;
}