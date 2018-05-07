import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'material-ui/styles/withStyles';
import Grid from 'material-ui/Grid';
import styles from './styles';
import Table from '../Table';
import PriceChart from '../PriceChart';
import ContractDetails from '../ContractDetails';
import {Factory, Exchange, web3} from '../../ethereum';

class MyPortfolio extends Component {
    state = {
    previousActive: '',
    active: '',
    open: false
  };

  fetchData = () => {};

    onClickRow = link => {
    this.openContractDetails();
    this.setState({active: link});
  };


    openContractDetails = () => {
    this.setState({open: true, previousActive: this.state.active});
  };

  closeContractDetails = () => {
    this.setState({
      open: false,
      active: this.state.previousActive,
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <Grid
        container
        className={classes.container}
        direction="row"
        alignItems="stretch"
        justify="center"
      >
               <Grid item className={classes.item}>
          <Table
            titles={['My Transactions', 'Type', 'Amount', 'Date']}
            rows={[
              ['DRCT Exchange', 'Trade/Buy', '.1 Ether', '6/1/2018'],
              ['One-week BTC/USD', 'Trade/Buy', '5 Ether', '5/30/2018'],
              ['DRCT Exchange', 'Trade/Buy', '.3 Ether', '5/28/2018'],
            ]}
            tableWidth="950px"
            clickFunction = {this.onClickRow}
          />
        </Grid>
        <Grid item className={classes.item}>
          <Table 
            titles={['Recent Trades', 'Volume', 'Price']}
            rows={[
              ['17:51:27', '0.00287487', '8,932,000'],
              ['17:51:27', '0.00287487', '8,932,000'],
              ['17:51:27', '0.00287487', '8,932,000'],
              ['17:51:27', '0.00287487', '8,932,000'],
              ['17:51:27', '0.00287487', '8,932,000'],
            ]}
            tableWidth="400px"
            cellHeight="15px"
            fontSize="12px"
            clickFunction = {this.onClickRow}
          />
        </Grid>
         <ContractDetails
          open={this.state.open}
          toggle={this.closeContractDetails}
      />
      </Grid>

    );
  }
}

MyPortfolio.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MyPortfolio);
