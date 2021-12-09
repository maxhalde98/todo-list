import './style.css';
import _ from 'lodash';
import { initialLoad, updateListMenu } from "./dom";

const todoFactory = (title, description, dueDate, priority) => {
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const setPriority = (newPriority) => priority = newPriority;
    return {getTitle, getDescription, getDueDate, getPriority, setPriority}
};

const todoListFactory = (title) => {
    const TODO_LIST = [];

    const getTitle = () => title;
    const addToList = (item) => TODO_LIST.push(item);
    const removeFromList = (item) => {
        let index = TODO_LIST.indexOf(item);
        if (index >= 0) {
            TODO_LIST.splice(index, 1);
        }
    }
    const displayList = () => {TODO_LIST.forEach(todo => {
        console.log(todo.getTitle());
    })}

    return {getTitle, addToList, displayList, removeFromList}
}

const myLists = () => {
    const MY_LISTS = [todoListFactory('default')];

    const addList = (list) => {
        MY_LISTS.push(todoListFactory(list));
        updateListMenu();
    }
    const getListTitles = () => {
        const TITLES = [];
        MY_LISTS.forEach(list => {
            TITLES.push(list.getTitle());
        })
        return TITLES;
    };
    return {addList, getListTitles};
}

const TASK_ONE = todoFactory('Dishes', 'Washing dishes', 'today', 'high');

// TASK_ONE.setPriority('low');
// console.log(TASK_ONE.getPriority());

// const DEFAULT = todoListFactory('default');
// DEFAULT.addToList(TASK_ONE);
// DEFAULT.displayList();
// DEFAULT.removeFromList(TASK_ONE);
// DEFAULT.displayList();

const MY_LISTS = myLists();
initialLoad();

export {myLists, MY_LISTS}

