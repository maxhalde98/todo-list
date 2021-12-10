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
    CONTENT_BODY.appendChild(LIST_MENU);

    //create div for title (i.e. My Lists)
    const LIST_MENU_TITLE = document.createElement('div');
    LIST_MENU_TITLE.id = 'list-menu-title';
    LIST_MENU_TITLE.textContent = 'My Lists';
    LIST_MENU.appendChild(LIST_MENU_TITLE);

    //create div to hold my list titles 
    const LIST_TITLES_DIV = document.createElement('div');
    LIST_TITLES_DIV.id = 'list-titles-div';
    // append titles div to menu div
    LIST_MENU.appendChild(LIST_TITLES_DIV);

    //populate with lists titles
    updateListMenu();

    // create button to add a new todo list
    const ADD_LIST_BTN = document.createElement('button');
    ADD_LIST_BTN.id = 'add-list-btn';
    ADD_LIST_BTN.textContent = '+';
    ADD_LIST_BTN.addEventListener('click', () => {
        let newListTitle = prompt('Add a new list: ', 'title');
        myLists.addList(newListTitle);
    })
    LIST_MENU.appendChild(ADD_LIST_BTN);

    // create div to hold active list and its items
    const ACTIVE_LIST = document.createElement('div');
    ACTIVE_LIST.id = 'active-list';
    CONTENT_BODY.appendChild(ACTIVE_LIST);
    // create div to hold active list's title
    const ACTIVE_LIST_TITLE = document.createElement('div');
    ACTIVE_LIST_TITLE.id = 'active-list-title';
    //create div to hold active list's items
    const ACTIVE_LIST_ITEMS = document.createElement('div');
    ACTIVE_LIST_ITEMS.id = 'active-list-items';
    // create div to to hold text and add item button
    const ADD_ITEM_DIV = document.createElement('div');
    ADD_ITEM_DIV.id = 'add-item';
    ADD_ITEM_DIV.textContent = 'Add an item';
    const ADD_ITEM_BTN = document.createElement('button');
    ADD_ITEM_BTN.id='add-item-btn';
    ADD_ITEM_BTN.textContent = '+';
    ADD_ITEM_BTN.addEventListener('click', () => {
        
    })

    ADD_ITEM_DIV.appendChild(ADD_ITEM_BTN);
    ACTIVE_LIST.appendChild(ACTIVE_LIST_TITLE);
    ACTIVE_LIST.appendChild(ACTIVE_LIST_ITEMS);
    ACTIVE_LIST_ITEMS.appendChild(ADD_ITEM_DIV);

    updateActiveList();
}

const updateListMenu = () => {
    //retrieve div element that holds our list titles
    const LIST_TITLES_DIV = document.getElementById('list-titles-div');
    //clear div
    LIST_TITLES_DIV.innerHTML = '';
    //retrieve current lists titles
    const LIST_TITLES = myLists.getListTitles();
    //loop through my list titles, create div with text content = title, then append to titles div
    LIST_TITLES.forEach(title => {
        //create div to hold our list title
        let myDiv = document.createElement('div');
        myDiv.textContent = title;
        myDiv.id = title;
        myDiv.classList.add('list-title');
        //create remove button to remove list from our lists
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-list-btn');
        removeBtn.textContent = '-';
        removeBtn.addEventListener('click', () => {
            myLists.removeList(title);
        })
        //append button to title div
        if (myDiv.id !== 'default') {myDiv.appendChild(removeBtn)};
        LIST_TITLES_DIV.appendChild(myDiv);
    })
}

const updateActiveList = () => {
    const ACTIVE_LIST_TITLE = document.querySelector('#active-list-title');
    const ACTIVE_LIST_ITEMS = document.querySelector('#active-list-items');
    const ADD_ITEM_DIV = document.querySelector('#add-item');

    ACTIVE_LIST_TITLE.textContent = myLists.getActiveListTitle();
    if (myLists.getActiveList().isEmpty() === true) {
        const ACTIVE_LIST_EMPTY = document.createElement('div');
        ACTIVE_LIST_EMPTY.textContent = 'This list is empty!';
        ACTIVE_LIST_EMPTY.id = 'empty-list-item';
        ACTIVE_LIST_ITEMS.insertBefore(ACTIVE_LIST_EMPTY, ADD_ITEM_DIV);
    }
    else {

    }
}

export {initialLoad, updateListMenu}