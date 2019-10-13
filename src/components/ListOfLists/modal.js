import React from 'react';
import { Modal, Button } from 'antd';
import { InputModal } from "../../styles/styles"
import { ReactDadata } from 'react-dadata';

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
            dateOfCreate: '',
            address: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name,
            dateOfCreate: nextProps.dateOfCreate,
            address: nextProps.address,
        });
    }

    nameSet(e) {
        this.setState({ name: e.target.value });
    }

    dateOfCreateSet(e) {
        this.setState({ dateOfCreate: e.target.value });
    }

    saveModal = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const { item } = this.props;
        const { name, dateOfCreate, address} = this.state;
        this.props.saveModal({ ...item, name, dateOfCreate ,address });
        this.setState({ loading: false, visible: false ,name: '',dateOfCreate: '', address:''})
    };

    handleCancel = () => {
        this.props.closeModal();
        setTimeout(() => {
            this.setState({ loading: false, visible: false , name: '',dateOfCreate: '', address:''});
        }, );
    };
    fakeSubmit = () => {
        let submitInput = document.getElementById('submitInput');
        submitInput.click();
    };
    handleType = e => this.setState({ address: e.target.value });

    handleChange = data => {
        this.setState(
            { address: data ? data.value : '' }
        );
    };


    render() {
        const {  visible } = this.props;
        const { name, dateOfCreate, address } = this.state;

        return (
            <div>
                <p onChange={this.handleType} />

                <Modal
                    visible={visible}
                    title="Меню редактирования"
                    onOk={this.saveModal}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button
                            type="primary"
                            onClick={this.fakeSubmit} >
                            Отправить
                        </Button>,
                        <Button
                            key="back"
                            onClick={this.handleCancel} >
                            Закрыть
                        </Button>
                    ]}>
                    <div className="modal-body">
                        <form className="form"
                              onSubmit={this.saveModal}
                        >
                            <InputModal
                                placeholder="Наименование"
                                value={name}
                                required
                                onChange={(e) => this.nameSet(e)}
                            />
                            <InputModal
                                type="date"
                                placeholder="Дата создания"
                                value={dateOfCreate}
                                required
                                onChange={(e) => this.dateOfCreateSet(e)}
                            />
                            <ReactDadata
                                component={'input'}
                                className="data"
                                token={token}
                                placeholder="Адрес"
                                type="address"
                                query={address}
                                onChange={this.handleChange}
                                allowClear
                                required
                            />
                            <input
                                type="submit"
                                id="submitInput"
                                hidden
                            />
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ModalWindow








