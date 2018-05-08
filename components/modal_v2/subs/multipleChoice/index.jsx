import React from 'react';

class Choice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      readChecked: false,
      writeChecked: false
    };
  }

  readChange = () => {
    this.setState({
      readChecked: !this.state.readChecked
    }, () => this.props.onAction && this.props.onAction(this.props.field, this.state));
  }

  writeChange = () => {
    this.setState({
      writeChecked: !this.state.writeChecked
    }, () => this.props.onAction && this.props.onAction(this.props.field, this.state));
  }

  render() {
    let props = this.props,
      state = this.state;
    let className = 'modal-row label-row multiple-choice';
    return (
      <div className={className}>
        <span className="title">{props.required && <strong>*</strong>}{props.label}</span>
        <div className="user-competence">
          <div className={state.readChecked ? 'everyone everyone-read readChecked' : 'everyone everyone-read'}><input id="myRead" type="checkbox" name="access" value={props.__['read_permission']} onChange={this.readChange} /><label htmlFor="myRead"></label><span>{props.__['read_permission']}</span></div>
          <div className={state.writeChecked ? 'everyone everyone-write writeChecked' : 'everyone everyone-write'}><input id="myWrite" type="checkbox" name="access" value={props.__['write_permission']} onChange={this.writeChange}/><label htmlFor="myWrite"></label><span>{props.__['write_permission']}</span></div>
          {props['read_write_tip'] ? <p className="read-write-tip">{props.__['read_write_tip']}</p> : null}
        </div>
      </div>
    );
  }
}

export default Choice;

