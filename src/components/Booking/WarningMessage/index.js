import React from 'react';
import { View } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { P } from '../../Common';
import styles from '../View/styles';
import { RED } from '../../../styles/colors';

const WarningMessage = (props) => {
  const {
    remainingHolidays,
    booked,
    potentialHolidays,
    booking,
  } = props;

  const gettingMessage = getMessage(
    remainingHolidays,
    booked,
    potentialHolidays,
    booking
  );

  return (
    (gettingMessage !== '')
      ? (
        <View style={styles.warningMessage}>
          <P style={{ color: RED }}>
            {gettingMessage}
          </P>
        </View>)
      : null
  );
};

const getMessage = (
  remainingHolidays,
  booked,
  potentialHolidays,
  booking,
) => {
  const { duration = 0 } = booking;

  const remainingHolidaysForNewBookings = booked
    ? ((remainingHolidays - potentialHolidays + duration).toFixed(1))
    : ((remainingHolidays - potentialHolidays).toFixed(1));

  let message = '';
  const bookingWarning = 'You are unable to book this holiday due to not having enough available hoildays. Please contact HR.';

  if ((booked && remainingHolidaysForNewBookings < 0)
    || (!booked && remainingHolidaysForNewBookings < 0)) {
    message = bookingWarning;
  }

  if (!booked && remainingHolidays === 0) {
    message = 'No holidays remaining.';
  }

  return message;
};

WarningMessage.propTypes = {
  remainingHolidays: PT.number.isRequired,
  booked: PT.bool.isRequired,
  potentialHolidays: PT.number.isRequired,
  booking: PT.shape({
    duration: PT.number,
  }).isRequired,
};

export default WarningMessage;
