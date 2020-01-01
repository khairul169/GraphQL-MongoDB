class ItemType {
    constructor(id, name = '') {
        this.id = id;
        this.name = name;
    }

    test() {
        return this.id + ' - ' + this.name;
    }
}

export {ItemType}
