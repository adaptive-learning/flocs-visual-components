import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import BlocklyEditor from '../components/BlocklyEditor';
import { getRoboAst } from '../selectors/taskEnvironment';
import { changeRoboAst } from '../actions/taskEnvironment';


class BlocklyEditorWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.changeRoboAst = this.props.changeRoboAst.bind(this, this.props.taskEnvironmentId);
  }

  render() {
    return (
      <BlocklyEditor
        roboAst={this.props.roboAst}
        onChange={this.changeRoboAst}
      />
    );
  }
}

BlocklyEditorWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  roboAst: PropTypes.object.isRequired,
  changeRoboAst: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const { taskEnvironmentId } = props;
  const roboAst = getRoboAst(state, taskEnvironmentId);
  return { taskEnvironmentId, roboAst };
}


const actionCreators = { changeRoboAst };
const BlocklyEditorContainer = connect(mapStateToProps, actionCreators)(BlocklyEditorWrapper);
export default BlocklyEditorContainer;
