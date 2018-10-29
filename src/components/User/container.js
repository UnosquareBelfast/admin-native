import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { flattenDeep } from 'lodash';
import { getUserEvents, getRemainingHolidays } from '../../utilities/holidays';
import { userProfile } from '../../utilities/currentUser';
import { getDays } from '../../utilities/dates';
import * as eventDescription from '../../constants/eventDescription';
import eventTypes from '../../constants/eventTypes';

export default Container => class extends Component {
  static propTypes = {
    navigation: PT.shape({
      navigate: PT.func,
    }),
  }

  static defaultProps = {
    navigation: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      events: [],
      remainingHolidays: 0,
      employee: {
        forename: '',
        surname: '',
      },
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.sub = navigation.addListener('didFocus', () => {
      getUserEvents()
        .then(events => this.setState({ events }));

      getRemainingHolidays()
        .then(remainingHolidays => this.setState({ remainingHolidays }));

      userProfile()
        .then(employee => this.setState({ employee }));
    });
  }

  componentWillUnmount() {
    this.sub.remove();
  }

  sortingEvents = (events) => {
    const { createArray } = this;
    let eventArray = [];
    const approvedArray = createArray(events, eventDescription.APPROVED, eventTypes.ANNUAL_LEAVE);
    const awaitApprovalArray = createArray(events, eventDescription.PENDING, eventTypes.ANNUAL_LEAVE);
    const rejectedArray = createArray(events, eventDescription.REJECTED, eventTypes.ANNUAL_LEAVE);
    const wfhArray = createArray(events, eventDescription.PENDING, eventTypes.WFH);
    const cancelledArray = createArray(events, eventDescription.CANCELLED, eventTypes.ANNUAL_LEAVE);

    eventArray = [
      { title: eventDescription.APPROVED, data: approvedArray },
      { title: eventDescription.PENDING, data: awaitApprovalArray },
      { title: eventDescription.REJECTED, data: rejectedArray },
      { title: eventTypes.WFH, data: wfhArray },
      { title: eventDescription.CANCELLED, data: cancelledArray },
    ];

    return eventArray;
  }

  createArray = (events, description, eventType) => {
    let arr = [];
    arr.push(events.filter(event => event.eventType.description === eventType
      && event.eventStatus.description === description));
    arr = flattenDeep(arr);
    return arr.length === 0 ? [{}] : arr;
  };

  render() {
    const { events, remainingHolidays, employee } = this.state;
    const approvedHolidays = getDays(events, eventDescription.APPROVED, eventTypes.ANNUAL_LEAVE);
    const eventObject = this.sortingEvents(events);
    const pendingDays = getDays(events, eventDescription.PENDING, eventTypes.ANNUAL_LEAVE);

    return (
      <Container
        employee={employee}
        events={eventObject}
        remainingHolidays={remainingHolidays - approvedHolidays - pendingDays}
        approvedHolidays={approvedHolidays}
        pendingDays={pendingDays}
      />
    );
  }
};
