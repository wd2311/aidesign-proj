import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';

class RecList extends Component {

  render() {
    return (
      <div>
        {this.props.recs.map(function(item) {
            return (
                <Segment>
                    <p>{item.title}</p>
                    <p><i>Can add description, etc.</i></p>
                    <button>Add to Shopping List [This button doesn't work yet]</button>
                    <div>I added this!</div>
                </Segment>
            )
        })}
      </div>
    );
  }
}

export default RecList;
