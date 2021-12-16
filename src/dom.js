import { forEach } from 'lodash';
import Logo from './images/check-logo.png'
import {myLists, todoFactory, todoListFactory} from './index'

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
        updateActiveList();
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
    
    // call function to dynamically create form to add new item to list
    createAddForm();

    // add event listener to display form to user when clicking on button
    ADD_ITEM_BTN.addEventListener('click', () => {
        const ADD_ITEM_FORM_DIV = document.querySelector('#add-item-form-div');
        ADD_ITEM_FORM_DIV.style.display = 'inline';
    })

    const ITEMS = document.createElement('div');

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
        myDiv.style.cursor = 'pointer';
        myDiv.classList.add('list-title');
        myDiv.addEventListener('click', () => {
            myLists.setActiveList(title);
            updateActiveList();
        })
        //create remove button to remove list from our lists
        let removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-list-btn');
        removeBtn.textContent = '-';
        removeBtn.addEventListener('click', () => {
            myLists.removeList(title);
            updateActiveList();
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

    while (ACTIVE_LIST_ITEMS.firstChild.id !== 'add-item') {
        ACTIVE_LIST_ITEMS.removeChild(ACTIVE_LIST_ITEMS.firstChild);
    }

    ACTIVE_LIST_TITLE.textContent = myLists.getActiveListTitle();
    if (myLists.getActiveList().isEmpty() === true) {
        const ACTIVE_LIST_EMPTY = document.createElement('div');
        ACTIVE_LIST_EMPTY.textContent = 'This list is empty!';
        ACTIVE_LIST_EMPTY.classList.add('list-item');
        ACTIVE_LIST_EMPTY.id = 'empty-list-item';
        ACTIVE_LIST_ITEMS.insertBefore(ACTIVE_LIST_EMPTY, ADD_ITEM_DIV);
    }
    else {
        const ACTIVE_LIST = myLists.getActiveList();
        ACTIVE_LIST.TODO_LIST.forEach(item => {
            ACTIVE_LIST_ITEMS.insertBefore(createItemDiv(item), ADD_ITEM_DIV);
        })
    }
}

const createItemDiv = (item) => {
    const ITEM_DIV = document.createElement('div');
    const ITEM_DIV_TITLE = document.createElement('div');
    const ITEM_DIV_DESCRIPTION = document.createElement('div');
    const ITEM_DIV_DUEDATE = document.createElement('div');
    const ITEM_DIV_PRIORITY = document.createElement('div');
    const REMOVE_ITEM_BTN = document.createElement('button');
    REMOVE_ITEM_BTN.id = 'remove-item-btn';
    REMOVE_ITEM_BTN.textContent = 'done';
    REMOVE_ITEM_BTN.style.marginTop = '12px';

    ITEM_DIV.appendChild(ITEM_DIV_TITLE);
    ITEM_DIV.appendChild(ITEM_DIV_DESCRIPTION);
    ITEM_DIV.appendChild(ITEM_DIV_DUEDATE);
    ITEM_DIV.appendChild(ITEM_DIV_PRIORITY);
    ITEM_DIV.appendChild(REMOVE_ITEM_BTN);

    ITEM_DIV_TITLE.textContent = item.getTitle();
    ITEM_DIV_DESCRIPTION.textContent = item.getDescription();
    ITEM_DIV_DUEDATE.textContent = item.getDueDate();
    if (item.getPriority() === 'high-priority') {
        ITEM_DIV_PRIORITY.textContent = 'high';
    }
    else if (item.getPriority() === 'mid-priority') {
        ITEM_DIV_PRIORITY.textContent = 'mid';
    }
    else {
        ITEM_DIV_PRIORITY.textContent = 'low';
    }

    ITEM_DIV.classList.add('list-item');

    REMOVE_ITEM_BTN.addEventListener('click', () => {
        const ACTIVE_LIST = myLists.getActiveList();
        ACTIVE_LIST.removeFromList(item);
        updateActiveList();
    })

    return ITEM_DIV;

}

const createAddForm = () => {

    const ACTIVE_LIST = document.querySelector('#active-list');

    // create form element that will be hidden until clicked
    const ADD_ITEM_FORM_DIV = document.createElement('div');
    ACTIVE_LIST.appendChild(ADD_ITEM_FORM_DIV);
    ADD_ITEM_FORM_DIV.id = 'add-item-form-div';
    ADD_ITEM_FORM_DIV.style.display = 'none';
    const ADD_ITEM_FORM = document.createElement('form');
    ADD_ITEM_FORM.id = 'add-item-form';
    ADD_ITEM_FORM_DIV.appendChild(ADD_ITEM_FORM);

    // item title input element for form
    const ITEM_TITLE_LABEL = document.createElement('label');
    ITEM_TITLE_LABEL.htmlFor = 'item-title';
    ITEM_TITLE_LABEL.textContent = 'Title: ';
    ADD_ITEM_FORM.appendChild(ITEM_TITLE_LABEL);
    ADD_ITEM_FORM.appendChild(document.createElement('br'));
    const ITEM_TITLE_INPUT = document.createElement('input');
    ITEM_TITLE_INPUT.type = 'text';
    ITEM_TITLE_INPUT.id = 'item-title';
    ITEM_TITLE_INPUT.name = 'item-title';
    ADD_ITEM_FORM.appendChild(ITEM_TITLE_INPUT);
    ADD_ITEM_FORM.appendChild(document.createElement('br'));
    ADD_ITEM_FORM.appendChild(document.createElement('br'));

    // item description input element for form
    const ITEM_DESCRIPTION_LABEL = document.createElement('label');
    ITEM_DESCRIPTION_LABEL.htmlFor = 'item-description';
    ITEM_DESCRIPTION_LABEL.textContent = 'Description: ';
    ADD_ITEM_FORM.appendChild(ITEM_DESCRIPTION_LABEL);
    ADD_ITEM_FORM.appendChild(document.createElement('br'));
    const ITEM_DESCRIPTION_INPUT = document.createElement('input');
    ITEM_DESCRIPTION_INPUT.type = 'text';
    ITEM_DESCRIPTION_INPUT.id = 'item-description';
    ITEM_DESCRIPTION_INPUT.name = 'item-description';
    ADD_ITEM_FORM.appendChild(ITEM_DESCRIPTION_INPUT);
    ADD_ITEM_FORM.appendChild(document.createElement('br'));
    ADD_ITEM_FORM.appendChild(document.createElement('br'));

    // item due date input element for form
    const ITEM_DUEDATE_LABEL = document.createElement('label');
    ITEM_DUEDATE_LABEL.htmlFor = 'item-duedate';
    ITEM_DUEDATE_LABEL.textContent = 'Due date: ';
    ADD_ITEM_FORM.appendChild(ITEM_DUEDATE_LABEL);
    ADD_ITEM_FORM.appendChild(document.createElement('br'));
    const ITEM_DUEDATE_INPUT = document.createElement('input');
    ITEM_DUEDATE_INPUT.type = 'date';
    ITEM_DUEDATE_INPUT.id = 'item-duedate';
    ITEM_DUEDATE_INPUT.name = 'item-duedate';
    ADD_ITEM_FORM.appendChild(ITEM_DUEDATE_INPUT);
    ADD_ITEM_FORM.appendChild(document.createElement('br'));
    ADD_ITEM_FORM.appendChild(document.createElement('br'));

    // item priority 
    const ITEM_PRIORITY_LABEL = document.createElement('span');
    ITEM_PRIORITY_LABEL.textContent = 'Priority: ';
    ADD_ITEM_FORM.appendChild(ITEM_PRIORITY_LABEL);
    // high
    const ITEM_PRIORITY_HIGH_LABEL = document.createElement('label');
    ITEM_PRIORITY_HIGH_LABEL.htmlFor = 'high-priority';
    ITEM_PRIORITY_HIGH_LABEL.textContent = 'High';
    ADD_ITEM_FORM.appendChild(ITEM_PRIORITY_HIGH_LABEL);
    const ITEM_PRIORITY_HIGH = document.createElement('input');
    ITEM_PRIORITY_HIGH.type = 'radio';
    ITEM_PRIORITY_HIGH.id = 'high-priority';
    ITEM_PRIORITY_HIGH.name = 'priority';
    ITEM_PRIORITY_HIGH.value = 'high-priority';
    // ITEM_PRIORITY_HIGH.checked = true;
    ADD_ITEM_FORM.appendChild(ITEM_PRIORITY_HIGH);
    ADD_ITEM_FORM.appendChild(document.createElement('br'));
    const INVISIBLE = document.createElement('span');
    INVISIBLE.textContent = 'Priority: ';
    INVISIBLE.style.visibility = 'hidden';
    ADD_ITEM_FORM.appendChild(INVISIBLE);
    // mid
    const ITEM_PRIORITY_MID_LABEL = document.createElement('label');
    ITEM_PRIORITY_MID_LABEL.htmlFor = 'mid-priority';
    ITEM_PRIORITY_MID_LABEL.textContent = 'Mid';
    ADD_ITEM_FORM.appendChild(ITEM_PRIORITY_MID_LABEL);
    const ITEM_PRIORITY_MID = document.createElement('input');
    ITEM_PRIORITY_MID.type = 'radio';
    ITEM_PRIORITY_MID.id = 'mid-priority';
    ITEM_PRIORITY_MID.name = 'priority';
    ITEM_PRIORITY_MID.value = 'mid-priority';
    ADD_ITEM_FORM.appendChild(ITEM_PRIORITY_MID);
    ADD_ITEM_FORM.appendChild(document.createElement('br'));
    const INVISIBLE_TWO = document.createElement('span');
    INVISIBLE_TWO.textContent = 'Priority: ';
    INVISIBLE_TWO.style.visibility = 'hidden';
    ADD_ITEM_FORM.appendChild(INVISIBLE_TWO);
    //low
    const ITEM_PRIORITY_LOW_LABEL = document.createElement('label');
    ITEM_PRIORITY_LOW_LABEL.htmlFor = 'low-priority';
    ITEM_PRIORITY_LOW_LABEL.textContent = 'Low';
    ADD_ITEM_FORM.appendChild(ITEM_PRIORITY_LOW_LABEL);
    const ITEM_PRIORITY_LOW = document.createElement('input');
    ITEM_PRIORITY_LOW.type = 'radio';
    ITEM_PRIORITY_LOW.id = 'low-priority';
    ITEM_PRIORITY_LOW.name = 'priority';
    ITEM_PRIORITY_LOW.value = 'low-priority';
    ADD_ITEM_FORM.appendChild(ITEM_PRIORITY_LOW);
    ADD_ITEM_FORM.appendChild(document.createElement('br'));
    // submit form button
    const SUBMIT_FORM_BTN = document.createElement('button');
    SUBMIT_FORM_BTN.id = 'submit';
    SUBMIT_FORM_BTN.type = 'button';
    SUBMIT_FORM_BTN.classList.add('form-btn');
    SUBMIT_FORM_BTN.textContent = 'Submit';
    ADD_ITEM_FORM.appendChild(SUBMIT_FORM_BTN);
    // cancel button
    const CANCEL_FORM_BTN = document.createElement('button');
    CANCEL_FORM_BTN.id = 'cancel';
    CANCEL_FORM_BTN.classList.add('form-btn');
    CANCEL_FORM_BTN.textContent = 'Cancel';
    ADD_ITEM_FORM.appendChild(CANCEL_FORM_BTN);

    SUBMIT_FORM_BTN.addEventListener('click', () => {
        const ACTIVE_LIST = myLists.getActiveList();
        let itemTitle = ADD_ITEM_FORM.elements['item-title'].value;
        let itemDescription = ADD_ITEM_FORM.elements['item-description'].value;
        let itemDueDate = ADD_ITEM_FORM.elements['item-duedate'].value;
        let itemPriority = ADD_ITEM_FORM.elements['priority'].value;
        ACTIVE_LIST.addToList(todoFactory(itemTitle, itemDescription, itemDueDate, itemPriority));
        const ADD_ITEM_FORM_DIV = document.querySelector('#add-item-form-div');
        ADD_ITEM_FORM_DIV.style.display = 'none';
        updateActiveList();
    });
}

export { initialLoad, updateListMenu }