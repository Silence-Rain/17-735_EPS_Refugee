import React from "react";
import { withRouter } from "react-router-dom";

class Forum extends React.Component {
  render () {
    const { category } = this.props.match.params;
    return (
      <div>Forum: { category }</div>
    )
  }
}

export default withRouter(Forum);