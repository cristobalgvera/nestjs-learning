import { useShoppingList } from '../../../hooks';
import { FormEvent } from 'react';
import { ShoppingList } from '../../../store/interfaces';

const shoppingList: ShoppingList = {
    id: 15,
    products: [
        {
            id: 1,
            name: 'Item 1',
            price: 6000,
            checked: false,
            amount: 15,
        },
        {
            id: 2,
            name: 'Item 2',
            price: 12000,
            checked: true,
            amount: 10,
        },
        {
            id: 3,
            name: 'Item 3',
            price: 3000,
            checked: false,
            amount: 30,
        },
    ],
};

function List() {
    const {
        data: { products },
        logic: {
            checkItemHandler,
            addItem,
            removeItem,
            increaseItem,
            decreaseItem,
            clearShoppingList,
            setShoppingList,
        },
    } = useShoppingList();

    const productsList = () => {
        return products.map(( { id, name, amount, checked, price } ) => {
            return (
                <li key={id}>
                    <p>
                        ID: {id} - Name: {name} - Amount: {amount} - Checked: {checked ? 'true' : 'false'} -
                        Price: {price}
                    </p>
                    <button onClick={() => checkItemHandler(id, checked)}>{checked ? 'Uncheck' : 'Check'}</button>
                    <button onClick={() => removeItem(id)}>Remove</button>
                    <button onClick={() => increaseItem(id)}>Increase</button>
                    <button onClick={() => decreaseItem(id)}>Decrease</button>
                </li>
            );
        });
    };

    const submitFormHandler = ( event: FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        addItem(Math.random() * 10000);
    };

    return (
        <div>
            <h1>
                List
            </h1>
            <form onSubmit={submitFormHandler}>
                <button type="submit">Add product!</button>
            </form>
            <button onClick={() => clearShoppingList()}>Clear list</button>
            <button onClick={() => setShoppingList(shoppingList)}>Set list</button>
            <ul>
                {products.length > 0 && productsList()}
            </ul>
        </div>
    );
}

export default List;