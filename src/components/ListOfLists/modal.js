import React from 'react';
import { Modal, Button } from 'antd';
import { InputModal } from "../../styles/styles"

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
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name: nextProps.name,
            dateOfCreate: nextProps.dateOfCreate,
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
        const { name, dateOfCreate } = this.state;
        this.props.saveModal({ ...item, name, dateOfCreate })
        this.setState({ loading: false, visible: false ,name: '',dateOfCreate: '',})
    };

    handleCancel = () => {
        this.props.closeModal()
        setTimeout(() => {
            this.setState({ loading: false, visible: false , name: '',dateOfCreate: '', });
        }, );
    };
    fakeSubmit = () => {
        let submitInput = document.getElementById('submitInput');
        submitInput.click();
    };

    render() {
        const {  visible } = this.props;
        const { name, dateOfCreate } = this.state;

        return (
            <div>
                <Modal
                    visible={visible}
                    title="Меню редактирования"
                    onOk={this.saveModal}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button type="primary" onClick={this.fakeSubmit} > Отправить </Button>,
                        <Button key="back" onClick={this.handleCancel} > Закрыть </Button>
                    ]}>
                    <div className="modal-body">
                        <form className="form" onSubmit={this.saveModal} >
                            <InputModal placeholder="Наименование" value={name}  required onChange={(e) => this.nameSet(e)} />
                            <InputModal type="date" placeholder="Дата создания" value={dateOfCreate} required onChange={(e) => this.dateOfCreateSet(e)} />
                            <input type="submit" id="submitInput" hidden/>
                        </form>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ModalWindow








