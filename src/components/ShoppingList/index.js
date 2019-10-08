import React, { Component } from "react";
import { Link } from "react-router-dom"
import "./index.css";
import "./sortInput.css";
import ModalWindow from "./modal.js";
import uuid from "uuid";
import { Button } from "../../styles/styles"


class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            itemId: "",
            visible: false,
            direction: {
                price: 'asc',
                piecesInGram: 'asc',
                pieces: 'asc',

            }
        }
    }

    componentDidMount() {
        const { listData, id } = this.props;
        const allData = listData || [];
        const shoppingList = allData.find(item => item.id === id) || { list: []};

        this.setState({
            data: shoppingList.list,
        })
    }

    componentWillUnmount() {
        const { data } = this.state;
        const { listData, id , updateData } = this.props;
        const exitData =  listData.map(item => {
            if (item.id === id) {
                item.list = data;
                item.totalPrice = data.reduce((total, currentValue) => {
                    return total + (currentValue.price*currentValue.pieces  );}, 0);
                if (item.totalPrice >= 0 ){
                    item.totalPrice = item.totalPrice + " RUB"
                }
                else {
                   item.totalPrice = ""
                }
            }
            return item;
        });

    /// update
        updateData(exitData);
    }
    sortBy = ( key ) => {
        const { data } = this.state;
        this.setState({
            data: data.sort( ( a, b ) => (
                this.state.direction[key] === 'asc'
                    ? parseFloat(a[key]) - parseFloat(b[key])
                    : parseFloat(b[key]) - parseFloat(a[key])
            )),
            direction: {
                [key]: this.state.direction[key] === 'asc'
                    ? 'desc'
                    : 'asc'
            }
        })
    }

    replaceModalItem = ( id ) => {
        this.setState({
            itemId: id,
            visible: true
        });
    }

    saveModal = ( item ) => {
        const { itemId, data } = this.state;

        if(!itemId){
            data.push({ ...item , id:uuid(),});
        }
        this.setState({
            data: itemId ? data.map(el => itemId === el.id ? item : el): data,
            itemId: undefined,
            visible: false
        });
        // update
    }
    closeModal = () => {
        this.setState({
            visible: false
        })
    }
    deleteItem = ( id ) => {
        const { data } = this.state;
        const { updateData } = this.props;
        const filteredData = data.filter(item => item.id !== id)
        this.setState({ data: filteredData });
        updateData(data);

    }

    addItem = () =>{
        this.replaceModalItem();
    }

    render() {
        const { itemId, visible, data } = this.state;
        const { updateData, listData, id } = this.props;
        let modalData = data.find(el => el.id ===itemId ) || {};

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>
                            <div>
                                <div className="sort">
                                    <div className="text">Цена</div>
                                    <input onClick={() => this.sortBy('price')} type="checkbox" id="priceInput"/>
                                    <label htmlFor="priceInput" className="arrows"/>
                                </div>
                            </div>
                        </th>
                        <th>Город</th>
                        <th>Дата создания</th>
                        <th>
                            <div>
                                <div className="sort">
                                    <div className="text">Количество</div>
                                    <input onClick={() => this.sortBy('pieces')} type="checkbox" id="piecesInput"/>
                                    <label htmlFor="piecesInput" className="arrows"/>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div>
                                <div className="sort">
                                    <div className="text">Граммы</div>
                                    <input onClick={() => this.sortBy('piecesInGram')} type="checkbox" id="piecesInGramInput"/>
                                    <label  htmlFor="piecesInGramInput" className="arrows"/>
                                </div>
                            </div>
                        </th>
                        <th>
                            <Button className="btn btn-primary" onClick={() => this.addItem()}>
                                Добавить Предмет
                            </Button>
                        </th>
                    </tr>
                    </thead>
                    <tbody >
                    {data.map((item,id) => (
                        <tr key={id} >
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.city}</td>
                            <td>{item.dateOfCreate}</td>
                            <td>{item.pieces}</td>
                            <td>{item.piecesInGram}</td>
                            <td>
                                <Button id="idModal" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => this.replaceModalItem(item.id)}
                                >
                                    Редактировать
                                </Button>
                                <Button className="btn btn-danger" onClick={() => this.deleteItem(item.id)}
                                >
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div>
                <Link to={`/`}>
                    <Button className="btn btn-primary" onClick={() => updateData(listData, data, id)}>
                        Вернуться
                    </Button>
                </Link>
                <Button className="btn btn-success" onClick={() => updateData(listData, data, id)}>
                    Обновить данные
                </Button>
                </div>

                    <ModalWindow
                    item={modalData || {}}
                    visible = {visible}
                    name={modalData.name || ''}
                    price={modalData.price || ''}
                    city={modalData.city || ''}
                    dateOfCreate={modalData.dateOfCreate || ''}
                    pieces={modalData.pieces || ''}
                    piecesInGram={modalData.piecesInGram || ''}
                    saveModal={this.saveModal}
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}

export default ShoppingList;
