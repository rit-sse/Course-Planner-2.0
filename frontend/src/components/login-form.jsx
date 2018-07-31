import React from 'react';

class LoginForm extends React.Component {
  submit() {
    fetch('https://auth.cp-api.tech/login', {
      method: 'post',
      body: JSON.stringify(this.state),
      mode: 'no-cors'
    })
      .then(data => console.log(data)) //eslint-disable-line
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  Input = ({ name, type='input' }) => (
    <input name={name} type={type} onChange={e => this.onChange(e)}
      placeholder={name}/>
  );

  render() {
    const Input = this.Input;
    return (
      <div>
        <Input name="email" type="email" />
        <Input name="password" type="password" />
        <button onClick={this.submit.bind(this)}>Submit</button>
      </div>
    );
  }
}

export default LoginForm;
