import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { times } from 'lodash';
import PropTypes from 'prop-types';
import StepIcon from './StepIcon';

class ProgressSteps extends Component {
  state = {
    stepCount: 0,
    activeStep: this.props.activeStep,
  };

  componentDidMount() {
    this.setState({ stepCount: React.Children.count(this.props.children) });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activeStep !== this.props.activeStep) {
      this.setActiveStep(this.props.activeStep);
    }
  }

  getChildProps() {
    return { ...this.props, ...this.state };
  }

  renderStepIcons = () => {
    let step = [];

    times(this.state.stepCount, (i) => {
      const isCompletedStep = this.props.isComplete ? true : i < this.state.activeStep;
      const isActiveStep = this.props.isComplete ? false : i === this.state.activeStep;

      step.push(
        <View key={i} style={styles.stepContainer}>
          <StepIcon
            {...this.getChildProps()}
            stepNum={i + 1}
            label={this.props.children[i].props.label}
            isFirstStep={i === 0}
            isLastStep={i === this.state.stepCount - 1}
            isCompletedStep={isCompletedStep}
            isActiveStep={isActiveStep}
          />
          {/* <Text style={styles.stepLabel}>{this.props.children[i].props.label}</Text> */}
        </View>
      );
    });

    return step;
  };

  setActiveStep = (step) => {
    if (step >= this.state.stepCount - 1) {
      this.setState({ activeStep: this.state.stepCount - 1 });
    }

    if (step > -1 && step < this.state.stepCount - 1) {
      this.setState({ activeStep: step });
    }
  };

  render() {
    const progressPercentage = ((this.state.activeStep + 1) / this.state.stepCount) * 100;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]}>
            <Text style={styles.progressText}>{`${Math.round(progressPercentage)}%`}</Text>
          </View>
        </View>
        <View style={styles.stepIconsContainer}>{this.renderStepIcons()}</View>
        <View style={{ flex: 1 }}>
          {React.cloneElement(this.props.children[this.state.activeStep], {
            setActiveStep: this.setActiveStep,
            activeStep: this.state.activeStep,
            stepCount: this.state.stepCount,
          })}
        </View>
      </View>
    );
  }
}

ProgressSteps.propTypes = {
  isComplete: PropTypes.bool,
  activeStep: PropTypes.number,
  topOffset: PropTypes.number,
  marginBottom: PropTypes.number,
};

ProgressSteps.defaultProps = {
  isComplete: false,
  activeStep: 0,
  topOffset: 30,
  marginBottom: 50,
};

const styles = StyleSheet.create({
  progressContainer: {
    height: 10,
    backgroundColor: '#EDEDED',
    borderRadius: 5,
    marginBottom: 20,
    position: 'relative',
    marginTop: 50
  },
  progressBar: {
    height: 10,
    backgroundColor: '#38b000',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    position: 'absolute',
    top: -20,
    color: '#38b000',
    fontWeight: 'bold',
  },
  stepIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginBottom: 20,
    marginRight: -36
  },
  stepContainer: {
    alignItems: 'center',
  },
  stepLabel: {
    marginTop: 5,
    textAlign: 'center',
  },
});

export default ProgressSteps;
