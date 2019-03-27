import React, { Component, Fragment } from "react";
import MapGL, { Marker } from "react-map-gl";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as UserCreators } from "../../store/ducks/users";

import "./index.css";
import UserList from "../../components/UserList";
// import "mapbox/dist/mapbox-gl.css";

class Main extends Component {
  state = {
    name: "",
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -23.5439948,
      longitude: -46.6065452,
      zoom: 14
    }
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

    alert(`Lat: ${latitude} Long: ${longitude}`);
  };

  handleAddUser = e => {
    e.preventDefault();
    this.props.addUserRequest(this.state.name);
  };

  render() {
    const { name } = this.state;

    return (
      <Fragment>
        <div style={{ width: window.innerWidth, height: window.innerHeight }}>
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
            <Marker
              latitude={-23.5439948}
              longitude={-46.6065452}
              onClick={this.handleMapClick}
              captureClick={true}
            >
              <img
                style={{
                  borderRadius: 100,
                  width: 48,
                  height: 48
                }}
                src="https://avatars2.githubusercontent.com/u/2254731?v=4"
              />
            </Marker>
          </MapGL>
        </div>
        <Modal isOpen={true} className="modal" overlayClassName="modal-overlay">
          <input
            type="text"
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          <div className="actions">
            <button>cancelar</button>
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
