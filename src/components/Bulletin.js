import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderBook from './OrderBook';
import RecentTrades from './RecentTrades';
import ContractDetails from './ContractDetails';
import PriceChart from './PriceChart';
import List from './List';
import Unlist from './Unlist';
import Buy from './Buy';
import {
  getUserAccount,
  getUserTokenPositions,
  getUserOrders
} from '../actions/userActions';
import {
  getOrderBook,
  getRecentTrades,
  getContractDetails
} from '../actions/contractActions';
import { setSelectedToken } from '../actions/selectedActions';
import requireConnection from './requireConnection';

// Use named export for unconnected component for testing
export class Bulletin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsOpen: false
    };
  }

  async componentDidMount() {
    await this.props.getUserAccount();
    if (!this.props.userAccount) { return };
    this.props.getOrderBook();
    this.props.getRecentTrades();
    this.props.getUserTokenPositions(this.props.userAccount);
    this.props.getUserOrders(this.props.userAccount);
    this.orderBookInterval = setInterval(() => this.props.getOrderBook(this.props.userAccount, true), 30000);
    this.recentTradesInterval = setInterval(() => this.props.getRecentTrades(this.props.userAccount, true), 30000);
  }
  componentWillUnmount() {
    clearInterval(this.orderBookInterval);
    clearInterval(this.recentTradesInterval);
  }

  handleRowClick = async (tokenAddress, symbol, e) => {
    e.preventDefault();
    await this.props.setSelectedToken(tokenAddress);
    this.openContractDetails(symbol);
  };

  openContractDetails = async (symbol) => {
    await this.props.getContractDetails(symbol);
    this.setState({
      detailsOpen: true
    });
  };
  renderContractDetails = () => {
    return this.state.detailsOpen ? (
      <ContractDetails close={this.closeContractDetails.bind(this)} />
    ) : null;
  };
  closeContractDetails = () => {
    this.setState({
      detailsOpen: false
    });
  };

  render() {
    return (
      <div id="bulletin">
        <OrderBook onRowClick={this.handleRowClick.bind(this)} />

        <div className="order-buttons">
          <Buy />
          <List />
          <Unlist />
        </div>

        <div className="table-container price-chart">
          {this.props.userAccount ? <PriceChart /> : ''}
        </div>
        <RecentTrades onRowClick={this.handleRowClick.bind(this)} />

        {this.renderContractDetails()}
      </div>
    );
  }
}
Bulletin.propTypes = {
  getUserAccount: PropTypes.func.isRequired,
  getOrderBook: PropTypes.func.isRequired,
  getRecentTrades: PropTypes.func.isRequired,
  getContractDetails: PropTypes.func.isRequired,
  getUserTokenPositions: PropTypes.func.isRequired,
  getUserOrders: PropTypes.func.isRequired,
  setSelectedToken: PropTypes.func.isRequired,
  orderId: PropTypes.string,
  userAccount: PropTypes.string
};

const mapStateToProps = state => ({
  userAccount: state.user.userAccount
});

export default connect(
  mapStateToProps,
  {
    getUserAccount,
    getOrderBook,
    getRecentTrades,
    setSelectedToken,
    getContractDetails,
    getUserTokenPositions,
    getUserOrders
  }
)(requireConnection(Bulletin));
