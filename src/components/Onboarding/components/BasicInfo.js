import React from "react";
import { connect } from "react-redux";
import InputGroupWithIcon from "./InputGroupWithIcon";
import { Row, Col, PillButton, H2, Form } from "../../Global/styled";
import { CalendarSVG, RulerSVG, ScaleSVG } from "../../Global/icons";
import { updateBasicInfo } from "../../../store/actions/onboardingActions";
import { Redirect } from "react-router-dom";

class BasicInfo extends React.Component {
  state = {
    date_of_birth: "",
    feet: 0,
    inches: 0,
    weight: 0
  };

  // Handles basic info to onboarding reducer state
  handleSubmit = () => {
    const { date_of_birth, feet, inches, weight } = this.state;

    // Action to add basic info to onboarding reducer
    this.props.updateBasicInfo({
      date_of_birth: date_of_birth,
      height: heightToMetric(feet, inches),
      weight: weightToMetic(weight)
    });

    // pushes us to next route after basic info was updated
    this.props.history.push(`${this.props.path}/weight-goal`);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // If no data from previous route, sends you back to landing
    if (!this.props.activityLevel) return <Redirect to="/landing" />;

    return (
      <>
        <Row>
          <Col justify="center" align="center" height="80px">
            <H2>Let's get some basic info!</H2>
          </Col>
        </Row>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col direction="column" align="flex-start">
              <h3>Birth Date</h3>
              <InputGroupWithIcon
                type="date"
                name="date_of_birth"
                icon={CalendarSVG}
                placeholder="MM/DD/YYYY"
                handleChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col direction="column" align="flex-start">
              <h3>Height</h3>
              <InputGroupWithIcon
                type="number"
                name="feet"
                icon={RulerSVG}
                placeholder="ft."
                handleChange={this.handleChange}
              />
            </Col>
            <Col direction="column" align="flex-start" justify="flex-end">
              <InputGroupWithIcon
                type="number"
                name="inches"
                icon={RulerSVG}
                placeholder="in."
                handleChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col direction="column" align="flex-start">
              <h3>Weight</h3>
              <InputGroupWithIcon
                type="number"
                name="weight"
                icon={ScaleSVG}
                placeholder="lbs."
                handleChange={this.handleChange}
              />
            </Col>
          </Row>
          <Row className="fixed-bottom">
            <Col>
              <PillButton type="submit" color="success">
                Next
              </PillButton>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

// Converts height to centimeters
function heightToMetric(feet, inches) {
  const feetInches = feet * 12;
  const totalInches = feetInches + Number(inches);
  return Math.round(totalInches * 2.54);
}

// Converts weight to kilograms
function weightToMetic(lbs) {
  return Math.round(lbs * 0.453592);
}

const mapStateToProps = state => {
  return {
    activityLevel: state.onboarding.activityLevel
  };
};

export default connect(mapStateToProps, { updateBasicInfo })(BasicInfo);