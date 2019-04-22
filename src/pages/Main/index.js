import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as UserCreators } from "../../store/ducks/users";

import "./index.css";
import Map from "../../components/Map";
import UserList from "../../components/UserList";
import Loading from "../../components/Loading";
import "mapbox-gl/dist/mapbox-gl.css";

class Main extends Component {
  state = {
    name: "",
    longitude: null,
    latitude: null,
    modalState: false
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
    const { users } = this.props;

    return (
      <Fragment>
        {users.loading && <Loading />}
        <UserList />
        <Map />
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
