import Logo from './images/check-logo.png'

const CONTENT = document.querySelector('#content');

const initialLoad = () => {
    populateHeader();
    populateBody();
};

const populateHeader = () => {
    //create an empty div for header
    const HEADER = document.createElement('div');
    HEADER.id = 'header';
    //append header div to content div
    CONTENT.appendChild(HEADER);

    //create an empty div for image holder
    const LOGO_DIV = document.createElement('div');
    //create new logo image object
    const LOGO_IMG = new Image();
    LOGO_IMG.src = Logo;
    LOGO_IMG.classList.add('logo');
    //append image to image holder
    LOGO_DIV.appendChild(LOGO_IMG);
    
    //create div that will hold our page title
    const TITLE = document.createElement('div');
    TITLE.id = 'title';
    TITLE.textContent = 'JUST DO IT';

    //append logo and title to the header
    HEADER.appendChild(LOGO_DIV);
    HEADER.appendChild(TITLE);
}

const populateBody = () => {
    //create div to hold other content panes
    const CONTENT_BODY = document.createElement('div');
    CONTENT_BODY.id = 'content-body';
    //append to content div
    CONTENT.appendChild(CONTENT_BODY);

    const LIST_MENU = document.createElement('div');
    LIST_MENU.id = 'list-menu';

    const ACTIVE_LIST_DIV = document.createElement('div');

    const ACTIVE_LIST = document.createElement('div');
    ACTIVE_LIST.id = 'active-list';

    CONTENT_BODY.appendChild(LIST_MENU);
    CONTENT_BODY.appendChild(ACTIVE_LIST);
}

export {initialLoad}