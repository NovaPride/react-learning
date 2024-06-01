import { Component } from "react"

export default class ErrorBoundary extends Component {
  state = {
    error: false,
  }

  componentDidCatch(error, errorInfo){
    console.log(error, errorInfo);
    this.setState({error: true});
  }

  render() {
    return (
      <>
        {this.state.error ? (
          <h2>
            Something went wrong...
          </h2>
        ) : this.props.children} 
      </>
    )
  }
}