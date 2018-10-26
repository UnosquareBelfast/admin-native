import moment from 'moment';

export const getDuration = (startDate, endDate) => moment(endDate).diff(startDate, 'days') + 1;

export const getDays = (events, description, eventType) => {
  let totalDays = 0;
  events.forEach((event) => {
    if (event.eventType.description === eventType) {
      if (event.halfDay) {
        totalDays += event.eventStatus.description === description
          ? 0.5 : 0;
      } else {
        totalDays += event.eventStatus.description === description
          ? getDuration(event.start, event.end) : 0;
      }
    }
  });

  return totalDays;
};
