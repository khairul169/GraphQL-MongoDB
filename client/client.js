const API_URL = "http://localhost:5050/";

const FETCH_ITEMS = `{
    items {
        id,
        name,
        amount
    }
}`;

const CREATE_ITEM = `mutation CreateItem($name: String!, $amount: Int) {
    createItem(input: {
        name: $name,
        amount: $amount
    }) {
        id
    }
}`;

const READ_ITEM = `query ReadItem($id: ID!) {
    item(id: $id) {
        id,
        name,
        amount
    }
}`;

const UPDATE_ITEM = `mutation SetItem($id: ID!, $name: String!, $amount: Int!) {
    setItem(id: $id, input: {
        name: $name,
        amount: $amount
    }) {
        id
    }
}`;

const DELETE_ITEM = `mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
        id
    }
}`;

const doQuery = async (query, variables) => {
    return await $.ajax({
        url: API_URL,
        method: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({query, variables})
    });
}

const refreshItems = async () => {
    const content = $('#content');
    content.html('<p>Loading...</p>');

    const {data} = await doQuery(FETCH_ITEMS);
    content.html(data.items.map(item => {
        return `<p style="cursor: pointer;" class="item" data-itemid="${item.id}">${item.name} (${item.amount})</p>`;
    }));
    $('.item').click(async function () {
        try {
            const item = $(this);
            const itemId = item.data('itemid');

            // Fetch item data
            const {data} = await doQuery(READ_ITEM, {id: itemId});

            // Set form value
            $('#itemid').val(data.item.id);
            $('#name').val(data.item.name);
            $('#amount').val(data.item.amount);

            toggleButtonState(true);
        } catch (error) {
            console.log(error);
        }
    });
}

const toggleButtonState = (active) => {
    if (active) {
        $('#submit').text('Update');
        $("#delete").show();
    } else {
        $('#submit').text('Create');
        $("#delete").hide();
        $('#itemid').val(null);
        $('#name').val('');
        $('#amount').val('');
    }
}

const onReady = () => {
    toggleButtonState(false);

    $("#reset").click(() => {
        toggleButtonState(false);
    });

    $('#form').submit(async (e) => {
        e.preventDefault();

        const itemId = $('#itemid').val();
        const name = $('#name').val();
        const amount = parseInt($('#amount').val(), 10) || 1;

        try {
            if (itemId) {
                // Update item
                await doQuery(UPDATE_ITEM, {id: itemId, name, amount});
            } else {
                // Create new item
                await doQuery(CREATE_ITEM, {name, amount});
            }
            toggleButtonState(false);
            refreshItems();
        } catch (error) {
            console.log(error);
        }
    });

    $("#delete").click(async () => {
        try {
            let itemId = $('#itemid').val();
            if (!itemId) {
                return;
            }

            // Remove item and refresh data
            await doQuery(DELETE_ITEM, {id: itemId});
            toggleButtonState(false);
            refreshItems();
        } catch (error) {
            console.log(error);
        }
    });

    // Load data
    refreshItems();
}

$(document).ready(onReady);
