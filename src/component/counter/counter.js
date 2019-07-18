import React from "react";
import RoundButton from "../roundButton/roundButton";
import InputText from "../ipnutText/inputText";
import Label from "../label/label";
import "./counter.css";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0, // 현재 위치 값
      input: "" // 입력값
    };
  }

  history = [0];
  UndoAvailable = false;
  RedoAvailable = false;

  checkInputValue = value => {
    if (value === null || value === "") {
      alert("this inputValue is null");
      this.setState({ input: "" });
      return false;
    }

    const regExp = new RegExp(/[0-9]/g);

    if (regExp.test(value) === false) {
      alert("Enter number, not character");
      this.setState({ input: "" });
      return false;
    }
    return true;
  };

  onClickOp = type => {
    const { position, input } = this.state;

    if (this.checkInputValue(input)) {
      const currentValue = this.history[position];

      const result =
        type === "add"
          ? currentValue + parseInt(input)
          : currentValue - parseInt(input);

      if (position + 1 === 1) {
        this.UndoAvailable = true;
      }

      if (position !== this.history.length - 1) {
        this.history = this.history.slice(0, position + 1);

        this.history.push(result);
        this.RedoAvailable = false;
        this.setState({
          position: position + 1
        });
      } else {
        this.history.push(result);
        this.setState({
          position: position + 1
        });
      }
      this.setState({ input: "" });
    }
  };

  onClickUndo = () => {
    const { position } = this.state;

    if (this.UndoAvailable) {
      if (position - 1 === 0) {
        // 배열의 맨 처음 위치
        this.UndoAvailable = false;
      }
      if (position === this.history.length - 1) {
        // 배열의 맨끝에서 실행
        this.RedoAvailable = true;
      }

      this.setState({ position: position - 1 });
    }
  };

  onClickRedo = () => {
    const { position } = this.state;

    if (this.RedoAvailable) {
      if (position === 0) {
        this.UndoAvailable = true;
      }

      if (position + 1 === this.history.length - 1) {
        this.RedoAvailable = false;
      }

      this.setState({ position: position + 1 });
    }
  };

  onSetInput = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    const { position, input } = this.state;
    return (
      <div className="layout">
        <Label value={this.history[position]} />
        <InputText data={input} onChange={this.onSetInput} />
        <div>
          <RoundButton title="undo" onClick={this.onClickUndo} />
          <RoundButton title="+" onClick={() => this.onClickOp("add")} />
          <RoundButton title="-" onClick={() => this.onClickOp("min")} />
          <RoundButton title="redo" onClick={this.onClickRedo} />
        </div>
      </div>
    );
  }
}

export default Counter;
