import React, { createContext } from "react";
// import { calcTotalPrice } from "../../utilites/utilites"

const dataBase = localStorage.getItem("dataBase");
if (dataBase && typeof dataBase === "string") {
    try {
        const parseData = JSON.parse(dataBase);
        if (!!parseData && parseData.length < 1) {
            throw console.log("Error2");
        }
    } catch (e) {
        localStorage.setItem("dataBase", "[]");
    }
}
const testData = JSON.parse(localStorage.getItem("testingData"));

const DataContext = createContext({
    listData: [],
    updateData: () => {},
    testData: []
});

export class DataProvider extends React.Component {
    state = {
        listData: [],
        testData: testData,
        updateData: () => {}
    };

    componentWillMount() {
        const dataBase = JSON.parse(localStorage.getItem("dataBase"));

        this.setState({ listData: dataBase });
    }

    componentDidUpdate() {
        const { listData } = this.state;
        localStorage.setItem("dataBase", JSON.stringify(listData));
    }

    updateData = (newData, list, id) => {
        if (id) {
            const shoppingList = newData.find(item => item.id === id) || { list: [] };
            shoppingList.list = list;
        }
        this.setState({ listData: newData });
    };

    render() {
        return (
            <DataContext.Provider
                value={{
                    listData: this.state.listData,
                    updateData: this.updateData,
                    testData: this.state.testData
                }}
            >
                {this.props.children}
            </DataContext.Provider>
        );
    }
}

export const DataConsumer = DataContext.Consumer;
