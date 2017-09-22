import React from 'react';
import styled from 'styled-components';
import {TransitionMotion, spring} from 'react-motion';
import $ from "jquery";

const willLeave = () => ({
  borderWidth: 0
})

class Test extends React.Component {
  static defaultProps = {
    itemBorder: [0,0,0]
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
        defaultheStyles: [
            { key: 'one', style: {borderWidth: 10}},
            { key: 'two', style: {borderWidth: 10}},
            { key: 'three', style: {borderWidth: 10}}
            ],
        styles: [
            { key: 'one', style: { borderWidth: spring(20) }},
            { key: 'two', style: { borderWidth: spring(20) }},
            { key: 'three', style: { borderWidth: spring(20)}}
            ]
    }
  }

  componentWillReceiveProps(nextProps) {
    let {current} = this.props.itemBorder;
    let {next} = nextProps.itemBorder;
    let defaultheStyles = [
            { key: 'one', style: {borderWidth: current[0]}},
            { key: 'two', style: {borderWidth: current[1]}},
            { key: 'three', style: {borderWidth: current[2]}}
    ]

    let styles = [
            { key: 'one', style: { borderWidth: spring(next[0]) }},
            { key: 'two', style: { borderWidth: spring(next[1]) }},
            { key: 'three', style: { borderWidth: spring(next[2]) }}
            ]
    this.setState({defaultheStyles: defaultheStyles, styles: styles});
  }

  render() {
    return (
        <TransitionMotion
            defaultStyles={this.state.defaultheStyles}
            styles={this.state.styles}
            willLeave={willLeave}
        >
            {(styles) => (
            <div>
                { styles.map(({ key, style}) => (
                <div key={key} style={{
                    borderColor: 'black',
                    borderStyle: 'solid',
                    margin: '10px',
                    ...style
                }} />
                ))}
            </div>
            )}
        </TransitionMotion>
    );
  }
}

export default Test;
