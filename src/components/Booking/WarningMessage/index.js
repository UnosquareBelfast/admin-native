import React from 'react';
import { View } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { P } from '../../Common';
import styles from '../View/styles';
import { RED } from '../../../styles/colors';

const WarningMessage = (props) => {
  const { remainingHolidays, booked, potentialHolidays, booking, pendingDays, availableDaysForNewBooking } = props;
  const { wasHalfDay } = booking;

  return (
    (getMessage(remainingHolidays, booked, potentialHolidays, wasHalfDay, pendingDays, availableDaysForNewBooking) !== '') ? (
      <View style={styles.warningMessage}>
        <P style={{ color: RED }}>{getMessage(remainingHolidays, booked, potentialHolidays, wasHalfDay, pendingDays, availableDaysForNewBooking)}</P>
      </View>)
      : null
  );
};

const getMessage = (remainingHolidays, booked, potentialHolidays, wasHalfDay, pendingDays, availableDaysForNewBooking) => {

  const newRemainingHolidays = booked
    ? (availableDaysForNewBooking - potentialHolidays + 1)
    : (availableDaysForNewBooking - potentialHolidays);


  let message = '';
  const bookingWarning = `You do not have enough holidays to ${booked ? 'extend' : 'make'} this booking.`;

  if (booked && pendingDays > 0 && newRemainingHolidays < 0) {
    message = (remainingHolidays > 0)
      ? `${bookingWarning} You can only extend this booking by ${remainingHolidays} day(s). Please amend future pending/approved holidays or extend by remaining holidays.`
      : `${bookingWarning} Please amend future approved/pending holidays.`;
  }

  if (booked && pendingDays === 0 && newRemainingHolidays < 0) {
    message = (remainingHolidays > 0)
      ? `You do not have enough holidays left. You can only extend this booking by ${remainingHolidays} day(s).`
      : bookingWarning;
  }

  if (wasHalfDay && booked && (newRemainingHolidays - 0.5).toFixed(1) < 0) {
    message = (remainingHolidays > 0)
      ? `You do not have enough holidays left. You can only extend this booking by ${remainingHolidays} day(s).`
      : bookingWarning;
  }

  if (!booked && pendingDays === 0 && newRemainingHolidays < 0) {
    message = `${bookingWarning} You only have ${remainingHolidays} day(s) annual leave left.`;
  }

  if (!booked && pendingDays > 0 && newRemainingHolidays < 0) {
    message = `${bookingWarning} Please amend a future pending/approved holiday before trying book another holiday`;
  }

  if (!booked && remainingHolidays === 0) {
    message = 'No more holidays remaining.';
  }

  return message;
};

WarningMessage.propTypes = {
  remainingHolidays: PT.number.isRequired,
  booked: PT.bool.isRequired,
  potentialHolidays: PT.number.isRequired,
  booking: PT.shape({
    wasHalfDay: PT.bool,
  }).isRequired,
  pendingDays: PT.number.isRequired,
  availableDaysForNewBooking: PT.number.isRequired,
};

export default WarningMessage;
