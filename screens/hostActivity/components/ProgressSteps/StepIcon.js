import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class StepIcon extends Component {
  getStyles() {
    const { isActiveStep, isCompletedStep } = this.props;

    let styles;

    if (isActiveStep || isCompletedStep) {
      styles = StyleSheet.create({
        circleStyle: {
          width: 35,
          height: 35,
          borderRadius: 20,
          backgroundColor: "#38B000",
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5
        },
        circleText: {
          color: 'white',
          fontSize: 16,
          fontWeight: "bold"
        },
        labelText: {
          textAlign: 'center',
          flexWrap: 'wrap',
          width: 100,
          paddingTop: 4,
          fontSize: 12
        },
        leftBar: {
          position: 'absolute',
          top: 40 / 2.22,
          left: 0,
          right: 40 + 8,
          // borderTopWidth: 2,
          borderTopColor: isCompletedStep ? "#38B000" : "#c4c4c4",
          marginRight: 40 / 2 + 2,
        },
        rightBar: {
          position: 'absolute',
          top: 40 / 2.22,
          right: 0,
          left: 40 + 8,
          // borderTopWidth: 2,
          borderTopColor: "#c4c4c4",
          marginLeft: 40 / 2 + 2,
        },
      });
    } else {
      styles = StyleSheet.create({
        circleStyle: {
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: "#EDEDED",
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10
        },
        labelText: {
          textAlign: 'center',
          flexWrap: 'wrap',
          width: 100,
          paddingTop: 4,
          marginTop: 10,
          fontSize: 12
        },
        leftBar: {
          position: 'absolute',
          top: 20 / 2,
          left: 0,
          right: 20 + 8,
          // borderTopWidth: 2,
          borderTopColor: "#c4c4c4",
          marginRight: 20 / 2 + 4,
        },
        rightBar: {
          position: 'absolute',
          top: 20 / 2,
          right: 0,
          left: 20 + 8,
          // borderTopWidth: 2,
          borderTopColor: "#c4c4c4",
          marginLeft: 20 / 2 + 4,
        },
      });
    }

    return styles;
  }

  render() {
    const styles = this.getStyles();

    return (
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <View style={styles.circleStyle}>
          {this.props.isCompletedStep || this.props.isActiveStep ? (
            <Text style={styles.circleText}>
              {this.props.isCompletedStep ? (
                <Text style={{ color: this.props.completedCheckColor }}>{this.props.stepNum}</Text>
              ) : (
                this.props.stepNum
              )}
            </Text>
          ) : null}
        </View>
        <Text style={styles.labelText}>{this.props.label}</Text>
        {!this.props.isFirstStep && <View style={styles.leftBar} />}
        {!this.props.isLastStep && <View style={styles.rightBar} />}
      </View>
    );
  }
}

StepIcon.propTypes = {
  stepCount: PropTypes.number.isRequired,
  stepNum: PropTypes.number.isRequired,
  isFirstStep: PropTypes.bool.isRequired,
  isLastStep: PropTypes.bool.isRequired,
  borderStyle: PropTypes.string,
  activeStepIconBorderColor: PropTypes.string,
  progressBarColor: PropTypes.string,
  completedProgressBarColor: PropTypes.string,
  activeStepIconColor: PropTypes.string,
  disabledStepIconColor: PropTypes.string,
  completedStepIconColor: PropTypes.string,
  labelFontFamily: PropTypes.string,
  labelColor: PropTypes.string,
  labelFontSize: PropTypes.number,
  activeLabelColor: PropTypes.string,
  completedLabelColor: PropTypes.string,
  activeStepNumColor: PropTypes.string,
  completedStepNumColor: PropTypes.string,
  disabledStepNumColor: PropTypes.string,
  // completedCheckColor: PropTypes.string,
};

StepIcon.defaultProps = {
  borderStyle: 'solid',
  completedCheckColor: 'white',
};

export default StepIcon;
