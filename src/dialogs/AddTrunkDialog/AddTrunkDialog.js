import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const initialState = {
    name: '',
};


class AddTrunkDialog extends Component {
    constructor(props) {
        super(props);
    
        this.state = initialState;
    }

    onChangeName = (event) => {
        const name = event.target.value;
        this.setState({ name });
    };
    
    addTrunk = event => {
        global.firebaseRef = global.firebaseApp.database().ref().child('trunks')
        global.firebaseRef.push({ name: this.capitalize(this.state.name), status: 0 }); 
        this.setState(initialState);
        this.props.onTrunkAdded();
    };

    capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }



  render() {
    // Properties
    const { open, onClose} = this.props;
    var { name } = this.state;

    return (
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Trunk</DialogTitle>
                <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    onChange={this.onChangeName}
                    value={this.capitalize(name)}
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.addTrunk} color="primary">
                    Add
                </Button>
                </DialogActions>
            </Dialog> 
    );
  }
}

AddTrunkDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddTrunkDialog;