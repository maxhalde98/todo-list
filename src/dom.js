import Logo from './images/check-logo.png'
import {myLists, MY_LISTS} from './index'

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

    //create div for list menu content (left pane)
    const LIST_MENU = document.createElement('div');
    LIST_MENU.id = 'list-menu';

    //create div for title (i.e. My Lists)
    const LIST_MENU_TITLE = document.createElement('div');
    LIST_MENU_TITLE.id = 'list-menu-title';
    LIST_MENU_TITLE.textContent = 'My Lists';
    LIST_MENU.appendChild(LIST_MENU_TITLE);

    //create div to hold my list titles 
    const LIST_TITLES_DIV = document.createElement('div');
    LIST_TITLES_DIV.id = 'list-titles-div';

    updateListMenu(LIST_TITLES_DIV);
    // append titles div to menu div
    LIST_MENU.appendChild(LIST_TITLES_DIV);

    // create button to add a new todo list
    const ADD_LIST_BTN = document.createElement('button');
    ADD_LIST_BTN.id = 'add-list-btn';
    ADD_LIST_BTN.textContent = '+';
    ADD_LIST_BTN.addEventListener('click', () => {
        let newListTitle = prompt('Add a new list: ', 'title');
        MY_LISTS.addList(newListTitle);
    })
    LIST_MENU.appendChild(ADD_LIST_BTN);

    const ACTIVE_LIST = document.createElement('div');
    ACTIVE_LIST.id = 'active-list';

    CONTENT_BODY.appendChild(LIST_MENU);
    CONTENT_BODY.appendChild(ACTIVE_LIST);
}

const updateListMenu = (LIST_TITLES_DIV) => {
    const LIST_TITLES = MY_LISTS.getListTitles();
    // // //loop through my list titles, create div with text content = title, then append to titles div
    LIST_TITLES.forEach(title => {
        let myDiv = document.createElement('div');
        myDiv.textContent = title;
        myDiv.id = title;
        myDiv.classList.add('list-title');
        LIST_TITLES_DIV.appendChild(myDiv);
    })
}

export {initialLoad, updateListMenu}