import React, { Component } from 'react';
import { PropTypes as PT } from 'prop-types';
import { flattenDeep } from 'lodash';
import { getUserEvents, getRemainingHolidays } from '../../utilities/holidays';
import { userProfile } from '../../utilities/currentUser';
import { getDays } from '../../utilities/dates';

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
    const approvedArray = createArray(events, 'Approved');
    const awaitApprovalArray = createArray(events, 'Awaiting approval');
    const rejectedArray = createArray(events, 'Rejected');
    const cancelledArray = createArray(events, 'Cancelled');

    eventArray = [
      { title: 'Approved', data: approvedArray },
      { title: 'Awaiting approval', data: awaitApprovalArray },
      { title: 'Rejected', data: rejectedArray },
      { title: 'Cancelled', data: cancelledArray },
    ];

    return eventArray;
  }

  createArray = (events, description) => {
    let arr = [];

    arr.push(events.filter(event => event.eventStatus.description === description));
    arr = flattenDeep(arr);
    return arr.length === 0 ? [{}] : arr;
  }

  render() {
    const { events, remainingHolidays, employee } = this.state;
    const approvedHolidays = getDays(events, 'Approved');
    const eventObject = this.sortingEvents(events);
    const pendingDays = getDays(events, 'Awaiting approval');

    return (
      <Container
        employee={employee}
        events={eventObject}
        remainingHolidays={remainingHolidays - approvedHolidays - pendingDays}
        approvedHolidays={approvedHolidays}
      />
    );
  }
};
