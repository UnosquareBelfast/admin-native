import React from 'react';
import { Button } from 'react-native-elements';
import { PropTypes as PT } from 'prop-types';
import { UNOBLUE } from '../../../styles/colors';

const RequestButton = (props) => {
  const {
    updateHoliday,
    booked,
    submitRequest,
    loading,
    remainingHolidays,
    potentialHolidays,
    booking,
  } = props;

  const { duration } = booking;
  const availableDays = booked
    ? (remainingHolidays - potentialHolidays + duration)
    : (remainingHolidays - potentialHolidays);

  return (
    booked ? (
      <Button
        disabled={(availableDays < 0)}
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
          || availableDays < 0)}
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
    duration: PT.number,
  }).isRequired,
};
