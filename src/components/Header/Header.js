import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';
import withStyles from 'material-ui/styles/withStyles';
import Button from 'material-ui/Button';
import Lens from '@material-ui/icons/Lens';
import styles from './styles';
import CreateContract from '../CreateContract';
import {web3, factory} from '../../ethereum';

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  state = {
    previousActive: '',
    active: '',
    open: false,
    web3: false,
  };

  componentDidMount() {
    if (!web3) {
      return this.setState({web3: false});
    }

    this.setState({web3: true});
  }

  onClick = link => {
    if (link === 'Create Contract') {
      this.openCreateContract();
    }

    this.setState({active: link});
  };

  openCreateContract = () => {
    this.setState({open: true, previousActive: this.state.active});
  };

  closeCreateContract = () => {
    this.setState({
      open: false,
      active: this.state.previousActive,
    });
  };

  renderHeaderLinks = () => {
    const {classes} = this.props;
    const urls = ['portfolio', 'exchange', '', 'cash_out'];
    return ['My Portfolio', 'Exchange', 'Create Contract', 'Cash Out', 'How To'].map(
      (link, i) => {
        const component = (
          <Grid className={classes.gridItem} key={link} item>
            <Button
              className={
                this.state.active === link
                  ? classes.buttonActive
                  : classes.button
              }
              onClick={() => this.onClick(link)}
            >
              <Typography
                key={link}
                className={
                  this.state.active === link
                    ? classes.linkTextActive
                    : classes.linkText
                }
              >
                {link}
              </Typography>
            </Button>
          </Grid>
        );

        if (i !== 2) {
          return (
            <Link className={classes.link} to={`/${urls[i]}`} key={link}>
              {component}
            </Link>
          );
        }

        return component;
      }
    );
  };

  render() {
    const {classes} = this.props;

    return (
      <AppBar className={classes.appBar} position="static">
        <Grid
          container
          className={classes.container}
          direction="row"
          alignItems="stretch"
          justify="space-between"
        >
          <Grid item>
            <Grid
              container
              className={classes.container}
              alignItems="stretch"
              direction="row"
            >
              <Grid className={classes.logo} item />
              {this.renderHeaderLinks()}
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              className={classes.connectedContainer}
              direction="row"
              alignItems="center"
            >
              <Grid item>
                <Typography className={classes.connected}>Connected</Typography>
              </Grid>

              <Grid item>
                <Lens
                  className={this.state.web3 ? classes.lens : classes.lensOff}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <CreateContract
          open={this.state.open}
          toggle={this.closeCreateContract}
        />
      </AppBar>
    );
  }
}

export default withStyles(styles)(Header);