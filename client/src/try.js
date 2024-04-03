import React, { Component } from "react";
import SimpleMDEReact from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import * as Showdown from "showdown";

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

class MarkdownEditor extends Component {
  static defaultProps = {
    delay: 1000,
    value: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "***Hello World***"
    };
  }

  convertValue = value => converter.makeHtml(value);

  handleEditorChange = value =>
    this.setState(prevState => ({ ...prevState, value }));

  render() {
    const { options, delay, id, ...rest } = this.props;
    return (
      <div>
        <SimpleMDEReact
          {...rest}
          id={id}
          value={this.state.value}
          options={{
            autosave: {
              enabled: false,
              uniqueId: id,
              delay
            },
            spellChecker: false,
            status: false,
            ...options
          }}
          onChange={this.handleEditorChange}
        />

        <div
          className="mde-preview"
          style={{ width: "50%", overflowY: "scroll" }}
        >
          <div
            className="mde-preview-content"
            dangerouslySetInnerHTML={{
              __html: this.convertValue(this.state.value)
            }}
          />
        </div>
      </div>
    );
  }
}

export default MarkdownEditor;
