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
    pendingDays,
    availableDaysForNewBooking,
  } = props;

  return (
    (getMessage(
      remainingHolidays,
      booked,
      potentialHolidays,
      pendingDays,
      availableDaysForNewBooking,
      booking
    ) !== '')
      ? (
        <View style={styles.warningMessage}>
          <P style={{ color: RED }}>
            {getMessage(
              remainingHolidays,
              booked,
              potentialHolidays,
              pendingDays,
              availableDaysForNewBooking,
              booking
            )}
          </P>
        </View>)
      : null
  );
};

const getMessage = (
  remainingHolidays,
  booked,
  potentialHolidays,
  pendingDays,
  availableDaysForNewBooking,
  booking,
) => {
  const { duration = 0 } = booking;

  const RemainingHolidaysForNewBookings = booked
    ? ((availableDaysForNewBooking - potentialHolidays + duration).toFixed(1))
    : ((availableDaysForNewBooking - potentialHolidays).toFixed(1));

  let message = '';
  const bookingWarning = `You do not have enough holidays to ${booked ? 'extend' : 'make'} this booking.`;

  if (booked && RemainingHolidaysForNewBookings < 0) {
    message = (remainingHolidays > 0 && pendingDays === 0)
      ? `You do not have enough holidays left. You can only extend this booking by ${remainingHolidays} day(s).`
      : `${bookingWarning} Please amend any future bookings.`;
  }

  if (!booked && RemainingHolidaysForNewBookings < 0) {
    message = (pendingDays === 0)
      ? `${bookingWarning} You only have ${remainingHolidays} day(s) annual leave left.`
      : `${bookingWarning} Please amend any future bookings.`;
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
    duration: PT.number,
  }).isRequired,
  pendingDays: PT.number.isRequired,
  availableDaysForNewBooking: PT.number.isRequired,
};

export default WarningMessage;
