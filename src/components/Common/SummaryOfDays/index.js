import React from 'react';
import { View } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import styles from './styles';
import H1 from '../H1';
import H3 from '../H3';

const SummaryOfDays = (props) => {
  const { numberOfDays, holidayStatus } = props;
  return (
    <View style={styles.holidayContainer}>
      <View style={styles.holidayText}>
        <H1>
          {numberOfDays}
          &nbsp;
        </H1>
        <H1>DAYS</H1>
      </View>
      <H3 style={styles.textGrey}>{holidayStatus}</H3>
    </View>
  );
};

SummaryOfDays.propTypes = {
  numberOfDays: PT.number.isRequired,
  holidayStatus: PT.string.isRequired,
};

export default SummaryOfDays;
