import React from 'react';

export class Video extends React.Component {
  render() {
    return (
      <div>
        <video controls autostart autoplay src={this.props.src} />
      </div>
    );
  }
}
