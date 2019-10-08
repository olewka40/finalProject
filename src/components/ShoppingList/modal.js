import React from 'react';
import { Modal, Button } from 'antd';
import "./index.css";
import { ReactDadata } from 'react-dadata';
import { InputModal } from '../../styles/styles';



const token = '939c4943fe50952cc56bdee4a1c729d7759ca6d1';

class ModalWindow extends React.Component {
    state = {
        loading: false,
        visible: false,
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            dateOfCreate: '',
            city: '',
            pieces: '',
            piecesInGram: ''
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name,
            price: nextProps.price,
            dateOfCreate: nextProps.dateOfCreate,
            city: nextProps.city,
            pieces: nextProps.pieces,
            piecesInGram: nextProps.piecesInGram
        });
    }

    nameSet =(e) => {
        this.setState({ name: e.target.value });
    }

    priceSet = (e) => {
        this.setState({ price: e.target.value });
    }

    piecesInGramSet = (e) => {
        this.setState({ piecesInGram: e.target.value });
    }

    dateOfCreateSet = (e) => {
        this.setState({ dateOfCreate: e.target.value });
    }

    piecesSet= (e) =>{
        this.setState({ pieces: e.target.value });
    }

    closeModal = () => {
        this.setState({
            visible: false
        })
    }

    saveModal = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const { item } = this.props;
        const { name, price, dateOfCreate, city , pieces, piecesInGram } = this.state;
        this.props.saveModal({ ...item, name, price, dateOfCreate, city , pieces, piecesInGram })
        this.setState({ loading: false, visible: false ,name: '', price: '', dateOfCreate: '', city: '', pieces: '', piecesInGram: ''})
    }

    handleCancel = () => {
        this.props.closeModal()
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, );
    };

    handleType = e => this.setState({ city: e.target.value });

    handleChange = data => {
        this.setState(
            { city: data ? data.value : '' }
        );
    };

    fakeSubmit = () => {
        let submitInput = document.getElementById('submitInput');

        submitInput.click();
    };


    render() {
        const { visible } = this.props;
        const { name, price, dateOfCreate, city, pieces, piecesInGram } = this.state;
        return (
            <div>
                <p onChange={this.handleType} />
                <Modal
                    visible={visible}
                    title="Меню редактирования"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button type="primary" onClick={this.fakeSubmit} > Отправить </Button>,
                        <Button key="back" onClick={this.handleCancel}>Закрыть</Button>,
                    ]}
                >
                <form className="form" onSubmit={this.saveModal} >
                    <InputModal value={name} required placeholder="Наименование" onChange={(e) => this.nameSet(e)} />
                    <InputModal value={price} type="number" min="0" required placeholder="Цена" onChange={(e) => this.priceSet(e)} />
                        <ReactDadata
                            component={'span'}
                            value={city}
                            className="data"
                            token={token}
                            placeholder="Адрес"
                            type="address"
                            query={this.state.city}
                            onChange={this.handleChange}
                            allowClear
                        />
                    <InputModal value={dateOfCreate} type="date" required placeholder="Дата создания" onChange={(e) => this.dateOfCreateSet(e)} />
                    <InputModal value={pieces} type="number" min="0" required  placeholder="Количество(шт)" onChange={(e) => this.piecesSet(e)} />
                    <InputModal value={piecesInGram} type="number" min="0"  placeholder="Количество(грамм)" onChange={(e) => this.piecesInGramSet(e)} />
                    <input type="submit" id="submitInput" hidden/>
                </form>
                </Modal>
            </div>
        );
    }
}
export default ModalWindow






