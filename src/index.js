import './style.css';
import _ from 'lodash';
import { initialLoad } from "./dom";

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

const DOMController = () => {
    const ACTIVE_LIST = todoListFactory('default');

    const getActiveList = () => {
        return ACTIVE_LIST.getTitle;
    }

    const setActiveList = (list) => {
        ACTIVE_LIST = list;
    }
}
const TASK_ONE = todoFactory('Dishes', 'Washing dishes', 'today', 'high');

// TASK_ONE.setPriority('low');
// console.log(TASK_ONE.getPriority());

const DEFAULT = todoListFactory('default');
DEFAULT.addToList(TASK_ONE);
DEFAULT.displayList();
DEFAULT.removeFromList(TASK_ONE);
DEFAULT.displayList();

initialLoad();

