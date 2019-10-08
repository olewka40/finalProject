import React from "react";
import { DataConsumer } from "../../router/context/DataContext";
import ShoppingList from './index'

const ShoppingListWC = ({ match }) => {
    return (
        <DataConsumer>
            {({ listData, updateData }) =>
                <ShoppingList listData={listData} updateData={updateData} id={match.params.id} />
            }
        </DataConsumer>
    );
}
export default ShoppingListWC
