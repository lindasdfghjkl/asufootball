import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';


// import Fab from '@material-ui/core/Fab';

import EmptyState from '../layout/EmptyState/EmptyState';
// import Button from '@material-ui/core/Button';
 
// import AddTrunkDialog from '../../dialogs/AddTrunkDialog/AddTrunkDialog';
// import TrunksView from '../../layout/TrunksView';
// import TrunkCard from '../../layout/TrunkCard';


import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from '@material-ui/core/Button';

import QR from 'qrcode.react';




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
      data: []
    }

    this.fb = global.firebaseApp
    this.renderEditable = this.renderEditable.bind(this);
    this.addRow = this.addRow.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.renderStatus = this.renderStatus.bind(this);
    this.viewQRCode = this.viewQRCode.bind(this);
    this.createQRCode = this.createQRCode.bind(this);
    this.getID = this.getID.bind(this);
    this.showActions = this.showActions.bind(this);

  }

  
  componentDidMount() {
    var data = [];
    if (this.props.trunk.items !== undefined) {
      data = this.props.trunk.items.map(function (item) {
          return {id: item.id, name: item.name, quantity: item.quantity, status: item.status}
      });
    } 
    this.setState({data: data});
  }

  updateDatabase(newData) {
    var postData = this.props.trunk;
    postData.items = newData;
    var updates = {};
    updates['trunks/' + postData.key] = postData;
    this.fb.database().ref().update(updates, 
        function(error) {
            if (error) {
                console.log(error)
            } else {
                console.log("Success")
            }
        }
    );
  } 

  renderEditable(cellInfo) {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
        //  data[cellInfo.index].id = cellInfo.index;
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
          this.updateDatabase(data);
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  renderStatus(cellInfo) {
    return (
        <select 
          value={this.state.data[cellInfo.index].status} 
          onChange={(e) => {
            var data = this.state.data;
            data[cellInfo.index].status = e.target.value;
            this.setState({data});
            this.updateDatabase(data);
          }}>
            <option value="0">Not loaded</option>
            <option value="1">Loaded</option>
          </select>
    );
  }

  addRow() { 
    var d = this.state.data;
    var id = this.getID(d);
    d.push({id: id, name: '', quantity: '', status: ''});
    this.setState({data: d});
  }

  deleteRow(row) {

  }

  viewQRCode(cellInfo) {
    var url = "34.214.162.117:3000/" + this.props.trunk.key; 
    url += "?id=" + this.state.data[cellInfo.index].id;
    return (
        <QR value={url} />
    )
  }

  createQRCode() {
    return 
  }

  getID(items) {
    var ids = [];
    items.forEach(item => {
      ids.push(item.id);
    });
    if (ids.length === 0) {
      return 0;
    } else {
      var id =  Math.max(...ids) + 1;
      return id;
    }
  }

  showActions(cellInfo) {
    return (
      <div>
        <Button onClick={this.viewQRCode}>print qr</Button> 
        <Button onClick={ (e) => {
              let data = this.state.data;
              data.splice(cellInfo.index, 1);
              this.setState({data});
              this.updateDatabase(data);
            }
        }>delete</Button> 
      </div>
    )
  }
  render() {
    // Styling
    // const { classes } = this.props;

    // Properties
    const { isSignedIn, title, trunk} = this.props;
    

    if (isSignedIn) {
        return (
        <div 
          style={{width: '90%', marginLeft: '5%'}}
        
        >
          <h1>{trunk.name}</h1>
          <Button onClick={this.addRow}>+ ADD ITEM</Button>
          <ReactTable
            style={{textAlign: 'center'}}
            data={this.state.data}
            columns={[
              // {
              //   Header: "QR",
              //   // accessor: "id",
              //   Cell: this.viewQRCode
              // },
              {
                Header: "ID",
                accessor: "id",
                // Cell: this.getID
              },
              {
                Header: "Item",
                accessor: "name",
                Cell: this.renderEditable
              },
              {
                Header: "Quantity",
                accessor: "quantity",
                Cell: this.renderEditable
              },
              {
                Header: "Status",
                Cell: this.renderStatus
              },
              {
                Header: "Actions",
                Cell: this.showActions,
                maxWidth: 300
              }
            ]}
            minRows={this.state.data.length}
            showPageSizeOptions={false}
            sortable={true}
          />
      </div>
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