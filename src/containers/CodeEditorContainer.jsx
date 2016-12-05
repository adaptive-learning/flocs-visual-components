import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CodeEditor from '../components/CodeEditor';
import { changeCode } from '../actions/taskEnvironment';


class CodeEditorWrapper extends React.Component {
  render() {
    return (
      <CodeEditor
        code={this.props.code}
        onChange={this.props.changeCode.bind(this, this.props.taskEnvironmentId)}
      />
    );
  }
}


function mapStateToProps(state, props) {
  const { taskEnvironmentId } = props;
  const taskEnvironment = state.flocsComponents.taskEnvironments[taskEnvironmentId];
  const code = taskEnvironment.code;
  return { taskEnvironmentId, code };
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCode }, dispatch);
}


const CodeEditorContainer = connect(mapStateToProps, mapDispatchToProps)(CodeEditorWrapper);
export default CodeEditorContainer;
