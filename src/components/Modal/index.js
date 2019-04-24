import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as UserCreators } from "../../store/ducks/users";
import { actionCreators as ModalCreators } from "../../store/ducks/modal";

import "./index.css";

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
          <button onClick={() => this.props.closeModal()}>cancelar</button>
          <button
            onClick={() => this.props.addUserRequest(name, modal.cordinates)}
          >
            adicionar
          </button>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...UserCreators, ...ModalCreators }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalApp);
