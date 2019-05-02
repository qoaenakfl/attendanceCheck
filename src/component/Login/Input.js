import React from "react";
import { Input, Tooltip } from 'antd';

function formatNumber(value) {
  value += '';

  if(value.length === 11) {
    return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
 }else{
  return 11-value.length+"자리 더 넣어주세요.";
 }
}

class NumericInput extends React.Component {
  onChange = (e) => {
    const { value } = e.target;
    //const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    const reg = /^[0-9]{1,11}$/;
    if ((!Number.isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  }

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value.charAt(value.length - 1) === '.' || value === '-') {
      onChange(value.slice(0, -1));
    }
    if (onBlur) {
      onBlur();
    }
  }

  render() {
    const { value } = this.props;
    const title = value ? (
      <span className="numeric-input-title">
        {value !== '-' ? formatNumber(value) : '-'}
      </span>
    ) : '전화번호 11자리를 넣어주세요.';
    return (
      <Tooltip
        trigger={['focus']}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder="000-0000-0000"
          maxLength={11}
        />
      </Tooltip>
    );
  }
}

class NumericInputDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    this.props.onPhoneNumChange(e);
  }

  render() {
    return <NumericInput style={{ width: 120 }} value={this.props.value} onChange={this.onChange} />;
  }
}

export default NumericInputDemo;