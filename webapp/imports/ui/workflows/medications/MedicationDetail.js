import React from 'react';
import ReactMixin from 'react-mixin';
import { ReactMeteorData } from 'meteor/react-meteor-data';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import { insertMedication, updateMedication, removeMedicationById } from '../../../api/medications/methods';
import { Bert } from 'meteor/themeteorchef:bert';

import { CardText, CardActions } from 'material-ui/Card';

let defaultState = false;

Session.setDefault('medicationDetailState', defaultState);


export default class MedicationDetail extends React.Component {
  getMeteorData() {
    let data = {
      medicationId: false,
      medication: {
        id: "",
        username: "",
        gender: "",
        active: "",
        email: "",
        name: "",
        photo: ""
      }
    };

    if (Session.get('selectedMedication')) {
      data.medicationId = Session.get('selectedMedication');

      let selectedMedication = Medications.findOne({_id: Session.get('selectedMedication')});
      if (selectedMedication) {
        data.medication = {
          id: selectedMedication._id,
          username: selectedMedication.username,
          gender: selectedMedication.gender,
          active: selectedMedication.active.toString(),
          email: selectedMedication.emails ? selectedMedication.emails[0].address : "",
          name: selectedMedication.name ? selectedMedication.name.text : "",
          given: selectedMedication.name ? selectedMedication.name.given : "",
          family: selectedMedication.name ? selectedMedication.name.family : ""
        };
      }
    }

    if (Session.get('medicationDetailState')) {
      data.medication = Session.get('medicationDetailState');
    }

    return data;
  }


  // this could be a mixin
  changeState(field, value){

    if(process.env.NODE_ENV === "test") console.log("changeState", value);

    // by default, assume there's no other data and we're creating a new medication
    let medicationUpdate = {
      id: "",
      username: "",
      gender: "",
      active: "",
      email: "",
      name: "",
      photo: ""
    };

    // if there's an existing medication, use them
    if (Session.get('selectedMedication')) {
      medicationUpdate = this.data.medication;
    }

    if (typeof Session.get('medicationDetailState') === "object") {
      medicationUpdate = Session.get('medicationDetailState');
    }

    medicationUpdate[field] = value;
    if(process.env.NODE_ENV === "test") console.log("medicationUpdate", medicationUpdate);

    Session.set('medicationDetailState', medicationUpdate);
  }
  openTab(index){
    // set which tab is selected
    let state = Session.get('medicationCardState');
    state["index"] = index;
    Session.set('medicationCardState', state);
  }

  // this could be a mixin
  handleSaveButton(){
    let medicationFormData = {
      'name': {
        'text': this.refs.name.refs.input.value
      },
      'identifier': [],
      'gender': this.refs.gender.refs.input.value,
      'photo': [{
        url: this.refs.photo.refs.input.value
      }]
    };

    if (this.refs.active.refs.input.value === "true") {
      medicationFormData.active = true;
    } else {
      medicationFormData.active = false;
    }

    if(process.env.NODE_ENV === "test") console.log("medicationFormData", medicationFormData);


    if (Session.get('selectedMedication')) {
      if(process.env.NODE_ENV === "test") console.log("update practioner");

      updateMedication.call(
        {_id: Session.get('selectedMedication'), update: medicationFormData }, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Medication updated!', 'success');
          this.openTab(1);
        }
      });
    } else {

      if(process.env.NODE_ENV === "test") console.log("create a new medication", medicationFormData);

      insertMedication.call(medicationFormData, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Medication added!', 'success');
          this.openTab(1);
        }
      });
    }
  }

  // this could be a mixin
  handleCancelButton(){
    if(process.env.NODE_ENV === "test") console.log("handleCancelButton");
  }

  handleDeleteButton(){
    removeMedicationById.call(
      {_id: Session.get('selectedMedication')}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Medication deleted!', 'success');
        this.openTab(1);
      }
    });
  }

  determineButtons(medicationId){
    if (medicationId) {
      return (
        <div>
          <RaisedButton id="saveMedicationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
          <RaisedButton id="deleteMedicationButton" label="Delete" onClick={this.handleDeleteButton.bind(this)} />
        </div>
      );
    } else {
      return(
        <RaisedButton id="saveMedicationButton" label="Save" primary={true} onClick={this.handleSaveButton.bind(this)} />
      );
    }
  }

  render() {
    return (
      <div className="medicationDetail">
        <CardText>
          <TextField
            id='nameInput'
            ref='name'
            name='name'
            floatingLabelText='name'
            defaultValue={this.data.medication.name}
            onChange={ this.changeState.bind(this, 'name')}
            fullWidth
            /><br/>
          <TextField
            id='genderInput'
            ref='gender'
            name='gender'
            floatingLabelText='gender'
            defaultValue={this.data.medication.gender}
            onChange={ this.changeState.bind(this, 'gender')}
            fullWidth
            /><br/>
          <TextField
            id='activeInput'
            ref='active'
            name='active'
            floatingLabelText='active'
            defaultValue={this.data.medication.active}
            onChange={ this.changeState.bind(this, 'active')}
            fullWidth
            /><br/>
        </CardText>
        <CardActions>
          { this.determineButtons(this.data.medicationId) }
        </CardActions>
      </div>
    );
  }
}


MedicationDetail.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(MedicationDetail.prototype, ReactMeteorData);
