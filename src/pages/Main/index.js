import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Map from "../../components/Map";
import ModalApp from "../../components/Modal";
import UserList from "../../components/UserList";
import Loading from "../../components/Loading";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

class Main extends Component {
  state = {
    name: "",
    longitude: null,
    latitude: null
  };

  handleAddUser = e => {
    const { name, latitude, longitude } = this.state;
    e.preventDefault();

    this.setState({
      modalState: false,
      latitude: null,
      longitude: null,
      name: ""
    });
  };

  render() {
    const { users } = this.props;

    return (
      <Fragment>
        {users.loading && <Loading />}
        <UserList />
        <Map />
        <ModalApp />
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(Main);
