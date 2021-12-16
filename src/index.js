import './style.css';
import _, { update } from 'lodash';
import { initialLoad, updateListMenu } from "./dom";

// factory function to create todo items
const todoFactory = (title, description, dueDate, priority) => {
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const setPriority = (newPriority) => priority = newPriority;
    return {getTitle, getDescription, getDueDate, getPriority, setPriority}
};

// factory function to create todo lists
const todoListFactory = (title) => {
    //empty array to hold list items
    const TODO_LIST = [];
    const getTitle = () => title;
    // function to add item to list
    const addToList = (item) => TODO_LIST.push(item);
    const isEmpty = () => {
        if (TODO_LIST.length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
    // function to remove item from list
    const removeFromList = (item) => {
        let index = TODO_LIST.indexOf(item);
        if (index >= 0) {
            TODO_LIST.splice(index, 1);
        }
    }

    return {getTitle, addToList, isEmpty, removeFromList, TODO_LIST}
}

// myLists module that is a
const myLists = (() => {
    const MY_LISTS = [todoListFactory('default')];
    let activeList = MY_LISTS[0];
    const getActiveListTitle = () => {
        return activeList.getTitle();
    }
    const getActiveList = () => {
        return activeList;
    }
    const setActiveList = (title) => {
        MY_LISTS.forEach(curr => {
            if (curr.getTitle() === title) {activeList = curr;}
        })
    }
    
    const addList = (list) => {
        let index = -1; 
        MY_LISTS.forEach(curr => {
            if (curr.getTitle() === list) {index = MY_LISTS.indexOf(curr)};
        })

        if (index === -1 && list !== 'title' && list !== '') {
            MY_LISTS.push(todoListFactory(list));
            updateListMenu();
        }
        else if (list === 'title' || list === '') {
            alert('Please enter a valid title.');
        }
        else {
            alert('This list already exists! Please choose another name.')
        }
        activeList = MY_LISTS[MY_LISTS.length-1];
    }
    const removeList = (list) => {
        let index = -1;
        MY_LISTS.forEach(curr => {
            if (curr.getTitle() === list) {index = MY_LISTS.indexOf(curr)};
        })
        MY_LISTS.splice(index, 1);
        activeList = MY_LISTS[index-1];
        updateListMenu();
    }
    const getListTitles = () => {
        const TITLES = [];
        MY_LISTS.forEach(list => {
            TITLES.push(list.getTitle());
        })
        return TITLES;
    };
    return {addList, getListTitles, removeList, getActiveListTitle, getActiveList, setActiveList};
})();

const TASK_ONE = todoFactory('Dishes', 'Washing dishes', 'today', 'high');

// TASK_ONE.setPriority('low');
// console.log(TASK_ONE.getPriority());

// const DEFAULT = todoListFactory('default');
// DEFAULT.addToList(TASK_ONE);
// DEFAULT.displayList();
// DEFAULT.removeFromList(TASK_ONE);
// DEFAULT.displayList();


initialLoad();

export {myLists, todoFactory, todoListFactory}

