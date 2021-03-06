import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import AuthModal from './auth-modal';
import PlanDropdownMenu from './plan-dropdown-menu';
import UserDropdownMenu from './user-dropdown-menu';
import SaveButton from './save-button';
import '../css/header.css';

const logoStyle = {
  fontSize: '1.5rem',
  padding: '0.9rem',
  marginTop: '-0.3rem',
};

const Header = ({ user }) => (
  <Menu inverted style={{ borderRadius: 0 }}>
    <Menu.Item header style={logoStyle}>
      { user ?
        <Link to="/home">cp</Link> :
        <Link to="/">cp</Link> }
    </Menu.Item>
    <Menu.Item>[ALPHA]</Menu.Item>
    <div style={{ flex: 1 }} />
    {user ?
      <Menu.Menu position="right">
        <Route exact path="/plan/:id?" component={SaveButton} />
        <Route exact path="/plan/:id?" component={PlanDropdownMenu} />
        <UserDropdownMenu />
      </Menu.Menu>

      :

      <Menu.Item>
        <AuthModal login={true}/>
      </Menu.Item>
    }
  </Menu>
);

Header.propTypes = {
  user: PropTypes.object,
};

const HeaderContainer = connect(
  state => ({ user: state.auth.user }),
  dispatch => ({}),
)(withRouter(Header));

export default HeaderContainer;
