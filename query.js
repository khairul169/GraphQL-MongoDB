import ItemsModel from './models/itemsModel';

const items = async () => {
    return await ItemsModel.find();
}

const item = async ({id}) => {
    return await ItemsModel.findById(id);
}

const createItem = async ({input}) => {
    const item = new ItemsModel(input);
    await item.save();
    return item;
}

const setItem = async ({id, input}) => {
    return await ItemsModel.findByIdAndUpdate(id, input, {new: true});
}

const deleteItem = async ({id}) => {
    return await ItemsModel.findByIdAndDelete(id);
}

export default {
    items,
    item,
    createItem,
    setItem,
    deleteItem
}
