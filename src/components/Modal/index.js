import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";

class ModalApp extends Component {
  state = {
    name: ""
  };

  render() {
    const { name } = this.state;
    const { modal } = this.props;

    return (
      <Modal
        isOpen={modal.open}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <input
          type="text"
          value={name}
          onChange={e => this.setState({ name: e.target.value })}
        />
        <div className="actions">
          <button onClick={() => this.setState({ modalState: false })}>
            cancelar
          </button>
          <button onClick={this.handleAddUser}>adicionar</button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal
});

export default connect(mapStateToProps)(ModalApp);
