import React, { Component, Fragment } from "react";
import MapGL, { Marker } from "react-map-gl";

import "./index.css";
import UserList from "../../components/UserList";
// import "mapbox/dist/mapbox-gl.css";

export default class Main extends Component {
  state = {
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

  render() {
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
      </Fragment>
    );
  }
}
