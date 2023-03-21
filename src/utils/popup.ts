interface Popup {
    description: string;
    status: number;
}

export const popup = (popup: Popup): void  => {
    let element: HTMLElement = document.createElement('div');
    element.setAttribute("class", "popup");
    document.querySelector("#app").appendChild(element)
    document.querySelector(".popup").innerHTML = popupContent({status: popup.status, description: popup.description});
}

export const popupClose = (setButton: boolean = false): string | void => {
    if( setButton === true ) return `document.querySelectorAll('.popup')[ document.querySelectorAll('.popup').length-1].remove();`
    const popup: NodeListOf<Element> = document.querySelectorAll('.popup');
    popup[ popup.length-1 ].remove();
    
}

const popupContent = (popup: Popup): string => {
    
    let popupImg: string = `<i class="fa-solid fa-circle-check"></i>`;
    let title: string = "완료"
    let color: string = "popup-success";
    let contents: string = `
        <div class="popup__cover"></div>
        <div class="popup__box">
            <div class="popup__box__image ${color}">${popupImg}</div>
            <div class="popup__box__title ${color}">${title}</div>
            <div class="popup__box__description">${popup.description}</div>
            <button type="button" onclick="${popupClose(true)}">확인</button>
        </div>
    `;

    if (popup.status === 0) {
        popupImg = `<i class="fa-solid fa-circle-exclamation"></i>`
        title = "오류"
        color = "popup-fail";

    } else if (popup.status === 2) {
        popupImg = `<i class="fa-solid fa-circle-question"></i>`
        title = "확인"
        color = "popup-confirm";
        contents = `
            <div class="popup__box">
                <div class="popup__box__image ${color}">${popupImg}</div>
                <div class="popup__box__title ${color}">${title}</div>
                <div class="popup__box__description">${popup.description}</div>
                <div class="popup__box__button">      
                    <button type="button" onclick="${popupClose(true)}">취소</button>
                    <button type="button" onclick="${popupClose(true)}">확인</button>
                </div>
            </div>
        `
    }

    return contents
}
