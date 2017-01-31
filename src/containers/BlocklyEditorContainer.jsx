import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import BlocklyEditor from '../components/BlocklyEditor';
import { getRoboAst, getEditorSessionId } from '../selectors/taskEnvironment';
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
        editorSessionId={this.props.editorSessionId}
        onChange={this.changeRoboAst}
      />
    );
  }
}

BlocklyEditorWrapper.propTypes = {
  taskEnvironmentId: PropTypes.string.isRequired,
  editorSessionId: PropTypes.number,
  roboAst: PropTypes.object.isRequired,
  changeRoboAst: PropTypes.func.isRequired,
};

function mapStateToProps(state, props) {
  const { taskEnvironmentId } = props;
  const roboAst = getRoboAst(state, taskEnvironmentId);
  const editorSessionId = getEditorSessionId(state, taskEnvironmentId);
  return { taskEnvironmentId, roboAst, editorSessionId };
}


const actionCreators = { changeRoboAst };
const BlocklyEditorContainer = connect(mapStateToProps, actionCreators)(BlocklyEditorWrapper);
export default BlocklyEditorContainer;
