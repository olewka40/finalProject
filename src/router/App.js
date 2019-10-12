import React from "react";
import { Switch, Route } from "react-router-dom";
import "../styles.css";
import Header from "../components/MainHeader";
import NavBar from "../components/NavBar";
import ListOfListsWC from "../components/ListOfLists/ListOfListsWithContext";
import ShoppingListWC from "../components/ShoppingList/ShoppingListWithContext";
import uuid from "uuid";

const defaultData = () => {
    const shoppingList = [
        {
            id: uuid(),
            name: "Картофель",
            city: "Калуга",
            dateOfCreate: "2019-02-07",
            price: 120,
            pieces: 21,
            piecesInGram: 1000,
            changed: 1
        },
        {
            id: uuid(),
            name: "Мука",
            country: "Russia",
            city: "Калуга",
            dateOfCreate: "2019-02-07",
            price: 1022,
            pieces: 1,
            piecesInGram: 102,
            changed: 1
        },
        {
            id: uuid(),
            name: "Гречка",
            country: "Russia",
            city: "Калуга",
            dateOfCreate: "2019-02-07",
            price: 2220,
            pieces: 133,
            piecesInGram: 102,
            changed: 1
        },
        {
            id: uuid(),
            name: "Кофе",
            country: "Russia",
            city: "Калуга",
            dateOfCreate: "2019-02-07",
            price: 120,
            pieces: 13,
            piecesInGram: 1110,
            changed: 1
        }
    ];
    const renderList = shoppingList.map(item => item);
    let totalPrice = renderList.reduce((total, currentValue) => {
        return total + currentValue.price * currentValue.pieces;
    }, 0);
    if (totalPrice >= 0) {
        totalPrice = totalPrice + " RUB";
    } else {
        totalPrice = "";
    }

    return [
        {
            id: uuid(),
            name: "Дикси",
            dateOfCreate: "2019-02-07",
            totalPrice: totalPrice,
            address: "Москва",
            list: renderList
        },
        {
            id: uuid(),
            name: "Магнит",
            dateOfCreate: "2018-08-07",
            address: "Калуга",
            totalPrice: "",
            list: []
        }
    ];
};
const data = defaultData();
localStorage.setItem("testingData", JSON.stringify(data));

const App = () => (
    <div className="main">
        <Header />
        <NavBar />
        <Switch>
            <Route exact path="/" component={ListOfListsWC} />
            <Route path="/:id" component={ShoppingListWC} />
        </Switch>
    </div>
);
export default App;

// TODO:
// ЧЕ ХОЧЕ ДОДЕЛАТЬ
// я криворукий не могу сделать апдейт, пробовал как только можно
