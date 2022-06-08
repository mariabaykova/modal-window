const wrapperElem = document.querySelector(".wrapper");
// const modalWindowElem = document.querySelector("#modal-window-id");
const buttonElem = document.querySelector("#button-open");
const buttonElem1 = document.querySelector("#button-open1");
const shadowElem = document.querySelector("#wrapper-shadow");
const bodyElem = document.querySelector("body");

let modalWindowElem;

const buttonElems = document.querySelectorAll(".button");
console.log("buttonElems " + buttonElems);

const modalWindowMessages = {
    "button-open1" :
    {
        id: "button-open1",
        message : "Кнопка нажата, может быть что-то произойдет, ждите."
    },
    "button-open" : { 
        id: "button-open", 
        message: "Заявка успешно отправлена! Менеджер с вами свяжется."
    },
};

shadowElem.style.display = "none";

let btnTarget; // это кнопка, на которую нажали
let btn;
for ( let i = 0; i < buttonElems.length; i++ ) {
    btn = buttonElems[i];
    // console.log("btn " + btn.id);
    // console.log("modalWindowMessages[btn.id][message] " + modalWindowMessages[btn.id]["message"] );
    btn.addEventListener( "click", handleButtonClick);
        
}


// buttonElem.addEventListener( "click", handleButtonClick);
// buttonElem1.addEventListener( "click", handleButtonClick);

function handleButtonClick( e ) {
    console.log("this " + this);
    // console.log("создание окна с сообщением " + modalWindowMessages[btn.id]["message"]);
    // запоминаем кнопку, на которую нажали
    btnTarget = e.target; 
    try {
        modalWindowElem = openModalWindow(modalWindowMessages[this.id]["message"]);
    } catch (error) {
        console.error(error);
        modalWindowElem = openModalWindow("Здравствуйте!");
    }



    // включить прослушку клика всего документа
    document.addEventListener( "click", handleDocumentClick);

}

function handleDocumentClick( e1 ) {
    let target = e1.target;
    // если окно уже открыто и клик - это не нажатие на кнопку
    if ( modalWindowElem && ( btnTarget != target ) ) {
        if ( modalWindowElem.contains(target) ) {
            // alert(" Click inside target element! Do nothing");
            // кликнули по модальному окну, ничего не делать пока
          } else {
            // alert(" Click outside target element! I will close the window and remove document listener");
            closeModalWindow( modalWindowElem );
            // убрать прослушку всего документа
            document.removeEventListener('click', handleDocumentClick);
          }
    }

}

// открыть модальное окно
function openModalWindow( message ) {
    // создать окно
    const modalWin = document.createElement("div");
    modalWin.classList.add("modal-window");
    modalWin.classList.add("modal-window_open");

    // затемнить страницу
    shadowElem.style.display = "";
    // отменить прокрутку
    bodyElem.classList.add("scroll-cancel");

    const messageBox = document.createElement("div");
    messageBox.classList.add("message");

    messageBox.textContent = message;
    modalWin.appendChild(messageBox);

      //добавить окно в документ
      wrapperElem.appendChild(modalWin);

      return modalWin;
}
// закрыть модальное окно
function closeModalWindow( elem ) { 
    // окно убрать
    elem.remove();
     // растемнить страницу
    shadowElem.style.display = "none";
    // включить прокрутку
    bodyElem.classList.remove("scroll-cancel");
}

// очистка блока
// function clearBlock( block ) {
//     if ( block ) {
        
    
//         let blockLength = block.children.length;
//         for ( let ii = 0; ii < blockLength; ii++ ) {
//             block.removeChild(block.lastElementChild);
//         }
//     }        
// }

// поверка на наличие дочерних блоков элемента
// function isEmpty( block ) {
//     return !block.children.length;
// }