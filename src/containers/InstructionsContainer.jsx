import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import muiThemeable from 'material-ui/styles/muiThemeable';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Joyride from 'react-joyride';
import 'react-joyride/lib/react-joyride-compiled.css';
import { translate } from '../localization';
import { showInstructions } from '../actionCreators/instructions';


// TODO: move to selectors
function getScheduledInstructions(state) {
  const scheduledInstructionIds = state.flocsComponents.instructionLayer.scheduledInstructions;
  const instructions = scheduledInstructionIds.map(id => state.flocsComponents.instructions[id]);
  return instructions;
}

const getProps = (state) => ({
  // activeInstruction: state.instructionLayer.activeInstruction,
  scheduledInstructions: getScheduledInstructions(state),
});
const actionCreators = { showInstructions };

@connect(getProps, actionCreators)
@muiThemeable()
class InstructionsContainer extends React.Component {
  static propTypes = {
    muiTheme: PropTypes.object,
    scheduledInstructions: PropTypes.array,
    showInstructions: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.showInstructions = props.showInstructions.bind(this);
    this.setInstructions(props.scheduledInstructions);
  }

  componentWillReceiveProps(nextProps) {
    this.setInstructions(nextProps.scheduledInstructions);
  }

  setInstructions(instructions) {
    this.steps = instructions.map(instruction => ({
      text: translate(`instruction.${instruction.instructionId}`),
      selector: instruction.selector,  // '.instructionable-spaceworld',
      position: instruction.position, // 'bottom-left',
      type: 'hover',
      style: {
        mainColor: this.props.muiTheme.palette.primary1Color,
        beacon: {
          // offsetX: 15, offsetY: -20,
          inner: this.props.muiTheme.palette.accent1Color,
          outer: this.props.muiTheme.palette.accent1Color,
        },
      },
    }));
  }

  render() {
    return (
      <div>
        <Joyride
          ref={(ref) => { this.joyride = ref; }}
          steps={this.steps}
          type="continuous"
          run={this.steps.length > 0}
          autoStart={this.steps.length > 0}
          debug={false}
          locale={{
            back: translate('Previous'),
            close: translate('I understand'),
            next: translate('I understand'),
            last: translate('I understand'),
            skip: 'Skip',
          }}
        />
        <FloatingActionButton
          onClick={this.showInstructions}
          style={{
            position: 'fixed',
            bottom: 34,
            right: 110,
            zIndex: 100,
          }}
        >
          <span style={{ fontSize: 25 }}>?</span>
        </FloatingActionButton>
      </div>
    );
  }

}


export default InstructionsContainer;
