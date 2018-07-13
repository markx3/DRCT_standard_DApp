import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';
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
    this.props.getOrderBook(this.props.userAccount);
    this.props.getRecentTrades(this.props.userAccount);
    this.props.getUserTokenPositions(this.props.userAccount);
    this.props.getUserOrders(this.props.userAccount);
  }

  // async componentDidUpdate() {
  //   await this.props.getOrderBook();
  //   await this.props.getRecentTrades();
  // }

  handleRowClick = async e => {
    e.preventDefault();

    let addressEl = e.target.getElementsByClassName('link__token-address')[0];

    if (typeof addressEl !== 'undefined') {
      const token_address = addressEl.getAttribute('data-token-address');

      await this.props.setSelectedToken(token_address);

      this.openContractDetails(e.target, token_address);
    }
  };

  openContractDetails = async (link, token_address = false) => {
    await this.props.getContractDetails(link);

    this.setState({
      detailsOpen: true
    });
  };

  closeContractDetails = () => {
    this.setState({
      detailsOpen: false
    });
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <OrderBook onRowClick={this.handleRowClick.bind(this)} />

          <div className="order-buttons">
            <Buy />
            <List />
            <Unlist />
          </div>

          <RecentTrades onRowClick={this.handleRowClick.bind(this)} />

          <Collapse isOpen={this.state.detailsOpen}>
            <ContractDetails onClick={this.closeContractDetails.bind(this)} />
          </Collapse>

          <div className="price-chart">
            <PriceChart />
          </div>
        </div>
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
  orderID: PropTypes.string,
  userAccount: PropTypes.string.isRequired
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
