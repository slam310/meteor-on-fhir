import { IndexLinkContainer } from 'react-router-bootstrap';
import { List, ListItem } from 'material-ui/List';
import React from 'react';
import ReactMixin from 'react-mixin';

import { ReactMeteorData } from 'meteor/react-meteor-data';

export class PractitionerSidebar extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        position: 'fixed',
        top: '0px',
        width: '100%',
        display: 'flex',
        // height: '6.4rem',
        alignItems: 'center',
        padding: '0 2.4rem',
        opacity: Session.get('globalOpacity')
      },
      listItem: {
        display: 'inline-block',
        position: 'relative'
      }
    };

    return data;
  }
  handleLogout() {
    Meteor.logout();
  }

  render () {
    return(
      <div id="practitionerSidebar">
        <List style={{paddingLeft: '20px', position: 'static'}}>

          <IndexLinkContainer to='/dashboard'>
             <ListItem primaryText='Dashboard' href='/dashboard' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/patients'>
             <ListItem primaryText='Patients' href='/patients' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/practitioners'>
             <ListItem primaryText='Practitioners' href='/practitioners' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/medications'>
             <ListItem primaryText='Medications' href='/medications' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/users'>
             <ListItem primaryText='Users' href='/users' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/observation-history'>
             <ListItem primaryText='Observation History' href='/observation-history' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/careplan-designer'>
             <ListItem primaryText='Careplan Designer' href='/careplan-designer' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/careplan-history'>
             <ListItem primaryText='Careplan History' href='/careplan-history' />
          </IndexLinkContainer>

          <IndexLinkContainer to='/login'>
             <ListItem className='logoutMenuItem' primaryText='Logout' href='/login' onClick={this.handleLogout} />
          </IndexLinkContainer>

        </List>

      </div>
    );
  }
}
PractitionerSidebar.propTypes = {};
PractitionerSidebar.defaultProps = {};
ReactMixin(PractitionerSidebar.prototype, ReactMeteorData);
