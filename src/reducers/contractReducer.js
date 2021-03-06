import {
  SET_CONTRACT_DETAILS,
  SET_ORDERBOOK,
  SET_RECENT_TRADES,
  SET_CONTRACT_OPEN_DATES,
  SET_CONTRACT_CREATED,
  SET_CONTRACT_ERROR,
  SET_CONTRACT_FUNDED,
  SET_SEND_FUNDS_ERROR
} from '../actions/types';

const initialState = {
  contractAddress: '',
  contractCurrentPrice: 0,
  contractDuration: 0,
  contractGain: 0,
  contractMultiplier: 0,
  oracleAddress: '',
  orderbook: [],
  recentTrades: [],
  contractOpenDates: {},
  contractStartPrice: 0,
  newContract: {
    id: '',
    address: '',
    duration: '',
    currency: '',
    startDate: '',
    amount: 0,
    funded: false,
    fundedTx: ''
  },
  newContractCreateError: null,
  newContractFundsError: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CONTRACT_DETAILS:
      return {
        ...state,
        ...action.payload
      };
    case SET_ORDERBOOK:
      return {
        ...state,
        orderbook: action.payload
      };
    case SET_RECENT_TRADES:
      return {
        ...state,
        recentTrades: action.payload
      };
    case SET_CONTRACT_OPEN_DATES:
      return {
        ...state,
        contractOpenDates: action.payload
      };
    case SET_CONTRACT_CREATED:
      return {
        ...state,
        newContract: action.payload
      };
    case SET_CONTRACT_ERROR:
      return {
        ...state,
        newContractCreateError: action.payload
      };
    case SET_CONTRACT_FUNDED:
      return {
        ...state,
        newContract:
          Object.assign(
            initialState.newContract,
            { funded: true, fundedTx: action.payload },
            {}
          )
      };
    case SET_SEND_FUNDS_ERROR:
      return {
        ...state,
        newContractFundsError: action.payload
      };
    default:
      return state;
  }
}
