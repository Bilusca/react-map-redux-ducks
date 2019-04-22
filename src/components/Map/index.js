import React, { Component } from "react";
import MapGL, { Marker } from "react-map-gl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as ModalCreators } from "../../store/ducks/modal";

class Map extends Component {
  state = {
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight,
      latitude: -16.6799,
      longitude: -49.255,
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

    this.props.openModal({ latitude, longitude });
  };

  render() {
    const { users } = this.props;

    return (
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
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ModalCreators, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
