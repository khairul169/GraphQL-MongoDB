import ItemsModel from './models/itemsModel';

const items = async () => {
    const items = await ItemsModel.find();
    return items;
}

const item = async ({id}) => {
    const item = await ItemsModel.findById(id);
    return item;
}

const addItem = ({input}) => {
    const item = new ItemsModel(input);
    item.save();
    return item;
}

export default {
    items,
    item,
    addItem
}
