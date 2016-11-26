import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CodeEditor from '../components/CodeEditor';
import { changeCode } from '../actions/taskSessions';


class CodeEditorWrapper extends React.Component {
  render() {
    return (
      <CodeEditor
        code={this.props.code}
        onChange={this.props.changeCode.bind(this, this.props.taskSessionId)}
      />
    );
  }
}


function mapStateToProps(state, props) {
  const { taskSessionId } = props;
  const taskSession = state.flocsComponents.taskSessions[taskSessionId];
  const code = taskSession.code;
  return { taskSessionId, code };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCode }, dispatch);
}


const CodeEditorContainer = connect(mapStateToProps, mapDispatchToProps)(CodeEditorWrapper);
export default CodeEditorContainer;
