import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Joyride from 'react-joyride';
import 'react-joyride/lib/react-joyride-compiled.css';
import { translate } from '../localization';


@muiThemeable()
class InstructionsWrapper extends React.Component {
  constructor() {
    super();
    console.log('constructor...');
  }

  render() {
    const steps = [
      {
        text: 'Tvým úkolem je dostat vesmírnou loď na druhou stranu vesmírného světa',
        selector: '.instructionable-spaceworld',
        position: 'bottom-left',
        type: 'hover',
        style: {
          mainColor: this.props.muiTheme.palette.primary1Color,
          beacon: {
            offsetX: 15,
            offsetY: -20,
            inner: this.props.muiTheme.palette.accent1Color,
            outer: this.props.muiTheme.palette.accent1Color,
          },
        },
      },
      {
        text: 'Tvůj program spustíš kliknutím na toto tlačítko',
        selector: '.instructionable-controls',
        position: 'bottom-left',
        type: 'hover',
        style: {
          mainColor: this.props.muiTheme.palette.primary1Color,
          beacon: {
            inner: this.props.muiTheme.palette.accent1Color,
            outer: this.props.muiTheme.palette.accent1Color,
          },
        },
      },
    ];
    return (
      <Joyride
        ref={(ref) => { this.joyride = ref; }}
        steps={steps}
        type="continuous"
        run={true}
        debug={true}
        locale={{
          back: translate('Previous'),
          close: translate('I understand'),
          next: translate('I understand'),
          last: translate('I understand'),
          skip: 'Skip',
        }}
      />
    );
  }

}

InstructionsWrapper.propTypes = {
  muiTheme: PropTypes.object,
};

function getProps(state) {
  return { };
}

const actionCreators = { };
const InstructionsContainer = connect(getProps, actionCreators)(InstructionsWrapper);
export default InstructionsContainer;
