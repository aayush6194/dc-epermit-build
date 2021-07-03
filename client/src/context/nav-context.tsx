  
import React, { createContext } from 'react';

const initialState = {
  sidebar: false,
  toggleSidebar: ()=>{},
  collapsed: true,
  toggleCollapsed : (b = false)=>{}
}
export const NavContext = createContext(initialState);

export class NavProvider extends React.Component {

  toggleSidebar = ()=> {this.setState({ sidebar : !this.state.sidebar})};
  
  toggleCollapsed = (collapsed = false)=> this.setState({ collapsed });
  state = {
    ...initialState,
    toggleSidebar : this.toggleSidebar,
    toggleCollapsed: this.toggleCollapsed
  };

  render() {
    return (
      <NavContext.Provider value={this.state}>
        {this.props.children}
      </NavContext.Provider>
    );
  }
}

export const NavConsumer = NavContext.Consumer;