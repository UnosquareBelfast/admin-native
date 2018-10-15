import React from 'react';
import { Button } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import { UNOBLUE } from '../../../styles/colors';

const RequestButton = (props) => {
  const { updateHoliday, booked, submitRequest, loading, remainingHolidays, potentialHolidays, booking, availableDaysForNewBooking } = props;
  const { wasHalfDay, duration } = booking;
  const bookedAvailableDays = availableDaysForNewBooking - potentialHolidays + duration;
  const unbookedAvailableDays = availableDaysForNewBooking - potentialHolidays;

  return (
    booked ? (
      <Button
        disabled={(bookedAvailableDays < 0)
          || (wasHalfDay && (bookedAvailableDays < 0))}
        onPress={updateHoliday}
        title="Update"
        backgroundColor={UNOBLUE}
        borderRadius={5}
        containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
        loading={loading}
        loadingRight
      />
    ) : (
      <Button
        disabled={(remainingHolidays <= 0
          || unbookedAvailableDays < 0)}
        onPress={submitRequest}
        title="Request"
        backgroundColor={UNOBLUE}
        borderRadius={5}
        loading={loading}
        loadingRight
        containerViewStyle={{ marginLeft: 0, marginRight: 0 }}
      />
    )
  );
};

export default RequestButton;

RequestButton.propTypes = {
  updateHoliday: PT.func.isRequired,
  booked: PT.bool.isRequired,
  submitRequest: PT.func.isRequired,
  loading: PT.bool.isRequired,
  remainingHolidays: PT.number.isRequired,
  potentialHolidays: PT.number.isRequired,
  booking: PT.shape({
    wasHalfDay: PT.bool,
  }).isRequired,
  availableDaysForNewBooking: PT.number.isRequired,
};
