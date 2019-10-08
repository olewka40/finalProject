import React from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import "./index.css";
import ModalWindow from "./modal.js";
import { Link } from "react-router-dom"
import uuid from 'uuid';
import { Button } from "../../styles/styles"


class ListOfLists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            itemId: "",
            visible: false
        }
    }

    componentDidMount() {
        const { listData } = this.props;
        const data = listData || [];

        this.setState({
            data,
        });
    }

    replaceModalItem = ( id ) => {
        this.setState({
            itemId: id,
            visible: true
        });
    }

    saveModal = ( item ) => {
        const { itemId, data } = this.state;
        const { updateData } = this.props;
        if ( !itemId ){
            data.push({ ...item , id:uuid(), list:[] });
         }
        this.setState({
            data: itemId ? data.map(el => itemId === el.id ? item : el): data,
            itemId: undefined,
            visible: false
        });
        updateData(data);

    }

    closeModal = () => {
        this.setState({
            visible: false
        })
    }

    deleteItem = ( id ) => {
        const { data } = this.state;
        const { updateData } = this.props;
        const filteredData = data.filter(item => item.id !== id);

        this.setState({ data: filteredData  });
        updateData(filteredData);
    }

    addItem = () => {
        this.replaceModalItem();
    }

    testData = () => {
        const { testData , updateData} = this.props;
        this.setState({
            data: testData
        });
        updateData(testData);
    }


    render() {
        const { itemId, visible, data } = this.state;
        let modalData = ( data && data.find(el => el.id === itemId)) || {};
        const { updateData } = this.props;
        return (

            <div className="wrap">
                <div>
                    <Button className="btn btn-primary" onClick={() => this.addItem()} >
                        Добавить Предмет
                    </Button>
                    {/*<Button className="btn btn-warning" onClick={this.testData}>*/}
                        {/*Режим отладки*/}
                    {/*</Button>*/}
                    <Button className="btn btn-success" onClick={() => updateData(data)}>
                        Сохранить данные
                    </Button>
                </div>
                <div className="container">

                    {data.map((item, id) => (
                        <Card key={id} className="card"  title={item.name} extra={<Link to={`/${item.id}`} style={{ width: 1400 }} > Открыть </Link>} >
                            <p>Общая цена: {item.totalPrice} </p>
                            <p>Дата создания: {item.dateOfCreate}</p>
                            <Button id="idModal" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => this.replaceModalItem(item.id)} >
                                Редактировать
                            </Button>
                            <Button className="btn btn-danger" onClick={() => this.deleteItem(item.id)} >
                                Удалить
                            </Button>
                        </Card>
                    ))}
                </div>

                <ModalWindow
                    item={modalData || {}}
                    visible = {visible}
                    name={modalData.name || ''}
                    dateOfCreate={modalData.dateOfCreate || ''}
                    saveModal={this.saveModal }
                    closeModal={this.closeModal}
                />
            </div>
        );
    }
}
export default  ListOfLists;