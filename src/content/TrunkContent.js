import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';


// import Fab from '@material-ui/core/Fab';

import EmptyState from '../layout/EmptyState/EmptyState';
// import Button from '@material-ui/core/Button';
 
// import AddTrunkDialog from '../../dialogs/AddTrunkDialog/AddTrunkDialog';
// import TrunksView from '../../layout/TrunksView';
// import TrunkCard from '../../layout/TrunkCard';



// import ReactDataGrid from 'react-data-grid';


import MaterialTable from 'material-table';




const styles = (theme) => ({
  emptyStateIcon: {
    fontSize: theme.spacing(12)
  },

  button: {
    marginTop: theme.spacing(1)
  },

  buttonIcon: {
    marginRight: theme.spacing(1)
  },

  buttonTop: {
    marginTop: 0
  },
});



class TrunkContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { title: 'Item', field: 'name' },
        { title: 'Quantity', field: 'quantity' },
      ],
      data: [],
      fb: global.firebaseApp
    }
  }

  
  componentDidMount() {
    var data = [];
    if (this.props.trunk.items != undefined) {
      data = this.props.trunk.items.map(function (item) {
          return {name: item.name, quantity: item.quantity}
      });
    } 
    this.setState({data: data});
    console.log(data)
    // this.onGridRowsUpdated = this.onGridRowsUpdated.bind(this)
  }


  // addItem = (event) => {  
  //   var postData = this.props.trunk;
  //   if (postData.items === undefined) {
  //     postData.items = []
  //   }
  //   postData.items.push({name: "item name", quantity: 10});
    
  //   var updates = {};
  //   updates['trunks/' + postData.key] = postData;

  //   global.firebaseApp.database().ref().update(updates, 
  //       function(error) {
  //           if (error) {
  //               console.log(error)
  //           } else {
  //               console.log("Success")
  //           }
  //       }
  //   );
  // }

  // onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
  //   this.setState(state => {
  //     const rows = state.rows.slice();
  //     for (let i = fromRow; i <= toRow; i++) {
  //       rows[i] = { ...rows[i], ...updated };
  //     }

  //     var updatedItems = rows.map(function (row) {
  //       return {name: row.item, quantity: row.quantity}
  //     });
  //     var postData = this.props.trunk;
  //     postData.items =  updatedItems;
  //     var updates = {};
  //     updates['trunks/' + postData.key] = postData;
  //     global.firebaseApp.database().ref().update(updates, 
  //         function(error) {
  //             if (error) {
  //                 console.log(error)
  //             } else {
  //                 console.log("Success")
  //             }
  //         }
  //     );

  //     return { rows };
  //   });
  // };

  updateDatabase(newData) {
    var postData = this.props.trunk;
    postData.items = newData;
    var updates = {};
    updates['trunks/' + postData.key] = postData;
    this.state.fb.database().ref().update(updates, 
        function(error) {
            if (error) {
                console.log(error)
            } else {
                console.log("Success")
            }
        }
    );
  } 


  render() {
    // Styling
    const { classes } = this.props;

    // Properties
    const { isSignedIn, title, trunk} = this.props;
    
    
    // const columns = [
    // // { key: 'id', name: 'ID' },
    // { key: 'item', name: 'Item', editable: true},
    // { key: 'quantity', name: 'Quantity', editable: true}, 
    // ];
    

    

    if (isSignedIn) {
        return (
          // <ReactDataGrid
          //     columns={columns}
          //     rowGetter={i => this.state.rows[i]}
          //     rowsCount={3}
          //     minHeight={150} 
          //     onGridRowsUpdated={this.onGridRowsUpdated}
          //     enableCellSelect={true}
          //   />
        <MaterialTable
          title={trunk.name}
          columns={this.state.columns}
          data={this.state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = this.state.data;
                  data.push(newData);
                  this.setState({data});

                  this.updateDatabase(data);
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = this.state.data;
                  data[data.indexOf(oldData)] = newData;
                  this.setState({ data });

                  this.updateDatabase(data);
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = this.state.data;
                  data.splice(data.indexOf(oldData), 1);
                  this.setState({data});

                  this.updateDatabase(data);
                }, 600);
              }),
          }}
        />
      )
    } else {
        return (
        <EmptyState
            title={title}
            description="Sign up or sign in to edit this trunk"
        />
        );
    }
  }
}

TrunkContent.propTypes = {
  classes: PropTypes.object.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  title: PropTypes.string,
  trunk: PropTypes.object.isRequired
};

export default withStyles(styles)(TrunkContent);