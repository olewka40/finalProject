import React from 'react';
import { Modal, Button } from 'antd';
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
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Наименование</span>
                                </div>
                                <input type="text"
                                       className="form-control"
                                       aria-describedby="basic-addon1"
                                       placeholder="Наименование"
                                       value={name}
                                       required
                                       onChange={(e) => this.nameSet(e)}/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Дата создания</span>
                                </div>
                                <input className="form-control"
                                       aria-describedby="basic-addon1"
                                       type="date"
                                       placeholder="Дата создания"
                                       value={dateOfCreate}
                                       required
                                       onChange={(e) => this.dateOfCreateSet(e)}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">Адрес</span>
                                </div>
                                <ReactDadata
                                    className="form-control"
                                    aria-describedby="basic-addon1"
                                    component={'input'}
                                    token={token}
                                    placeholder="Адрес"
                                    type="address"
                                    query={address}
                                    onChange={this.handleChange}
                                    allowClear
                                    required
                                />
                            </div>

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








