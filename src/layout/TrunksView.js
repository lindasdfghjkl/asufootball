import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


const styles = {
  center: {
    position: 'absolute',
    top: '10%',
    left: '50%',
    width: '100%',
    transform: 'translate(-50%, 0%)',
    textAlign: 'center',
  },
};

class TrunksView extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { addButton, dialog, cards} = this.props;

    return (
      <Box className={classes.center}>
        {addButton}
        <Box display="flex" alignContent="flex-start" justifyContent="flex-start" flexDirection="row" flexWrap="wrap">
          {cards}
        </Box>
        {dialog}
      </Box>
    );
  }
}

TrunksView.propTypes = {
  classes: PropTypes.object.isRequired,
  addButton: PropTypes.element,
  dialog: PropTypes.element,
  cards: PropTypes.element
};

export default withStyles(styles)(TrunksView);