import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { ocean } from 'react-syntax-highlighter/dist/esm/styles/hljs/index';

class CodeBlockHljs extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string
  };

  static defaultProps = {
    language: null
  };

  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter language={language} style={ocean}>
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlockHljs;