import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { getRecentTrades } from '../actions/contractActions';

// Use named export for unconnected component for testing
export class RecentTrades extends Component {
  renderRows() {
    this.state.recentTrades.map(trade => {
      const { address, volume, price } = trade;

      const symbol = 'BTC/USD';

      return (
        <tr>
          <td>
            <a
              className="token-address-link"
              onClick={this.handleRowClick}
              data-token-address={address}
            >
              {symbol} - {this.props.contractDuration} Days -{' '}
              {this.porps.contractMultiplier}X
            </a>
          </td>
          <td>{volume}</td>
          <td>{price}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <Table className="recent-trades-table">
          <thead>
            <tr>
              <th>Recent Trades</th>
            </tr>
            <tr>
              <th>Address</th>
              <th>Volume</th>
              <th>Price (ETH)</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </Table>
      </div>
    );
  }
}

RecentTrades.propTypes = {
  handleRowClick: PropTypes.func.isRequired,
  recentTrades: PropTypes.array.isRequired,
  contractDuration: PropTypes.string.isRequired,
  contractMultiplier: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  recentTrades: state.contract.recentTrades,
  contractDuration: state.contract.contractDuration,
  contractMultiplier: state.contract.contractMultiplier
});

export default connect(
  mapStateToProps,
  { getRecentTrades }
)(RecentTrades);
