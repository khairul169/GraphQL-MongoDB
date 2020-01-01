import {items} from './mocks';
import {ItemType} from './types';

const hello = () => {
    return "Hello world!";
}

const getItems = () => {
    return items;
}

const addItem = ({input}) => {
    const item = new ItemType(items.length + 1, input.name);
    items.push(item);
    return item;
}

export default {
    hello,
    items: getItems,
    addItem
}
