  
import React, { createContext } from 'react';

export const LoginContext = createContext({
  open: false,
  setOpen: (o : boolean)=>{}
});

export class LoginProvider extends React.Component {

  setOpen = (open : boolean)=> this.setState({ open });
  
  state = {
    open : false,
    setOpen: this.setOpen
  };

  render() {
    return (
      <LoginContext.Provider value={this.state}>
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}

export const LoginConsumer = LoginContext.Consumer;