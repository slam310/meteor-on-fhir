import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import { PageContainer } from '/imports/ui/components/PageContainer';
import { GlassCard } from '/imports/ui/components/GlassCard';
import { CardTitle, CardText } from 'material-ui/Card';

import { Tabs, Tab } from 'material-ui/Tabs';
import PatientDetail from '../workflows/patients/PatientDetail';
import PatientTable from '../workflows/patients/PatientTable';


let defaultState = {
  index: 1,
  id: "",
  username: "",
  email: "",
  given: "",
  family: "",
  gender: ""
};
Session.setDefault('patientCardState', defaultState);

export class PatientsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      state: defaultState
    };

    if (Session.get('patientCardState')) {
      data.state = Session.get('patientCardState');
    }

    // this should all be handled by props
    // or a mixin!
    if (Session.get('darkroomEnabled')) {
      data.style.color = "black";
      data.style.background = "white";
    } else {
      data.style.color = "white";
      data.style.background = "black";
    }

    // this could be another mixin
    if (Session.get('glassBlurEnabled')) {
      data.style.filter = "blur(3px)";
      data.style.webkitFilter = "blur(3px)";
    }

    // this could be another mixin
    if (Session.get('backgroundBlurEnabled')) {
      data.style.backdropFilter = "blur(5px)";
    }

    return data;
  };
  // this could be a mixin
  handleTabChange(index){
    let state = Session.get('patientCardState');
    state["index"] = index;
    Session.set('patientCardState', state);
  };
  // this could be a mixin
  changeState(field, value){
    let state = Session.get('patientCardState');
    console.log("this", this);
    console.log("value", value);

    state[field] = value;
    Session.set('patientCardState', state);
  };

  // this could be a mixin
  onNewTab(){
    console.log("onNewTab");

    Session.set('selectedPatient', false);
    Session.set('patientDetailState', false);
  };

  render() {
    return (
      <div id="patientsPage">
        <PageContainer>
          <GlassCard>
            <CardTitle
              title="Patients"
            />
            <CardText>

            <Tabs default index={this.data.state.index} onChange={this.handleTabChange}>
             <Tab className="newPatientTab" label='New' style={{padded: "20px", color: 'black', borderBottom: '1px solid lightgray'}} onActive={ this.onNewTab } >
               <PatientDetail />
             </Tab>
             <Tab label='Patients' onActive={this.handleActive} style={{color: 'black', borderBottom: '1px solid lightgray'}}>
               <PatientTable />
             </Tab>
             <Tab label='Detail' onActive={this.handleActive} style={{padded: "20px", color: 'black', borderBottom: '1px solid lightgray'}} >
               <PatientDetail />
             </Tab>
           </Tabs>



            </CardText>
          </GlassCard>
        </PageContainer>
      </div>
    );
  }
}


PatientsPage.propTypes = {
  hasUser: React.PropTypes.object,
};
ReactMixin(PatientsPage.prototype, ReactMeteorData);
