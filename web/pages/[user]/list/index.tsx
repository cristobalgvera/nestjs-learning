import { useShoppingList } from '../../../hooks';
import { FormEvent } from 'react';
import { ShoppingList } from '../../../store/interfaces';
import { useProductsQuery } from '../../../shared/graphql/generated/hooks';

const shoppingList: ShoppingList = {
    id: 15,
    products: [
        {
            id: '1',
            name: 'Item 1',
            price: 6000,
            checked: false,
            amount: 15,
            category: {
                id: '1',
                name: 'Test category',
                products: [],
            },
        },
        {
            id: '2',
            name: 'Item 2',
            price: 12000,
            checked: true,
            amount: 10,
            category: {
                id: '1',
                name: 'Test category',
                products: [],
            },
        },
        {
            id: '3',
            name: 'Item 3',
            price: 3000,
            checked: false,
            amount: 30,
            category: {
                id: '1',
                name: 'Test category',
                products: [],
            },
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

    const { data, loading, error } = useProductsQuery();

    const productsList = () => {
        return products.map(( { id, name, amount, checked, price, measure, category } ) => {
            return (
                <li key={id}>
                    <p>
                        ID: {id} - Name: {name} - Amount: {amount} - Checked: {checked ? 'true' : 'false'} -
                        Price: {price} - Measure: {measure} Category ID: {category.id} - Category name: {category.name}
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
        addItem((Math.random() * 10000).toString());
    };

    return (
        <div>
            <h1>
                List
            </h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {data.products.map(( { id, name } ) => {
                        return <p key={id}>{name}</p>;
                    })}
                </>
            )}
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