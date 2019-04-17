import React, { Component, Fragment } from "react";
import MapGL, { Marker } from "react-map-gl";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as UserCreators } from "../../store/ducks/users";

import "./index.css";
import UserList from "../../components/UserList";
import Loading from "../../components/Loading";
import "mapbox-gl/dist/mapbox-gl.css";

class Main extends Component {
  state = {
    name: "",
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -16.6799,
      longitude: -49.255,
      zoom: 14
    },
    longitude: null,
    latitude: null,
    modalState: false
  };

  componentDidMount() {
    window.addEventListener("resize", this._resize);
    this._resize();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._resize);
  }

  _resize = () => {
    this.setState({
      viewport: {
        ...this.state.viewport,
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  };

  handleMapClick = e => {
    const [latitude, longitude] = e.lngLat;

    alert(`latitude: ${latitude} longitude: ${longitude}`);

    this.setState({
      modalState: true,
      latitude: latitude,
      longitude: longitude
    });
  };

  handleAddUser = e => {
    const { name, latitude, longitude } = this.state;
    e.preventDefault();

    this.props.addUserRequest(name, latitude, longitude);

    this.setState({
      modalState: false,
      latitude: null,
      longitude: null,
      name: ""
    });
  };

  render() {
    const { name, modalState } = this.state;
    const { users } = this.props;

    return (
      <Fragment>
        <div style={{ width: window.innerWidth, height: window.innerHeight }}>
          {users.loading && <Loading />}
          <UserList />
          <MapGL
            {...this.state.viewport}
            onClick={this.handleMapClick}
            mapStyle="mapbox://styles/mapbox/basic-v9"
            mapboxApiAccessToken={
              "pk.eyJ1IjoiYmlsdXNjYSIsImEiOiJjanN5bjBxNnowY29iNDVwcDdxYTNsZ3duIn0.fI0oFfFrkrBO6WWUn3eTxA"
            }
            onViewportChange={viewport => this.setState({ viewport })}
          >
            {users.list.map(user => (
              <Marker
                key={user.login}
                latitude={user.latitude}
                longitude={user.longitude}
                onClick={this.handleMapClick}
                captureClick={true}
              >
                <p>
                  {user.latitude} / {user.longitude}
                </p>
              </Marker>
            ))}
          </MapGL>
        </div>
        <Modal
          isOpen={modalState}
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
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
