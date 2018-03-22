import PropTypes from 'prop-types';
import React from 'react';
import '../../../styles/Navigation.css';

export default function TopNavigation(props) {
  const { onClickMenu } = props;
  return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
                type="button"
                id="sidebarCollapse"
                className="btn btn-primary navbar-btn"
                onClick={onClickMenu}
            >
              <i className="fa fa-bars" />
            </button>
          </div>
        </div>
      </nav>
  );
}

TopNavigation.propTypes = {
  onClickMenu: PropTypes.func.isRequired,
};
