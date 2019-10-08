import React from "react";
import { DataConsumer } from "../../router/context/DataContext";
import ListOfLists from './index'

const ListOfListsWC = () => {
    return (
        <DataConsumer>
            {({ listData, updateData }) =>
                <ListOfLists listData={listData} updateData={updateData}/>
            }
        </DataConsumer>
    );
}
export default ListOfListsWC

