import React from 'react';
import { PropTypes as PT } from 'prop-types';
import {
  View,
  SectionList,
  SafeAreaView,
} from 'react-native';
import { isEmpty } from 'lodash';
import ListItem from './ListItem';
import { H1, H3, SummaryOfDays, P } from '../../Common';
import { WHITE } from '../../../styles/colors';
import styles from './styles';
import { getDuration } from '../../../utilities/dates';
import * as holidayOverview from '../../../constants/holidayOverview';
import eventType from '../../../constants/eventTypes';
import { holidayStatus } from '../../../constants/holidayStatus';

const UserView = (props) => {
  const {
    events,
    remainingHolidays,
    employee,
    approvedHolidays,
    pendingDays,
  } = props;

  const itemList = (item) => {
    const emptyItem = isEmpty(item);
    const isWfh = !emptyItem && (item.eventType.description === eventType.WFH);
    const renderItem = emptyItem
      ? (<P style={styles.noItems}>Nothing to Show</P>)
      : (
        <ListItem
          statusId={isWfh
            ? holidayStatus.WFH
            : item.eventStatus.eventStatusId}
          status={isWfh
            ? eventType.WFH
            : item.eventStatus.description}
          startDate={item.start}
          endDate={item.end}
          duration={item.halfDay ? 0.5 : getDuration(item.start, item.end)}
        />);

    return renderItem;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
      <View style={styles.container}>
        <View style={styles.profileName}>
          <H1>
            {employee.forename}&nbsp;
            {employee.surname}
          </H1>
          <H3 style={styles.holidayText}>Holidays</H3>
        </View>
        <View style={styles.summaryOfDays}>
          <SummaryOfDays
            numberOfDays={approvedHolidays}
            holidayOverview={holidayOverview.BOOKED}
          />
          <SummaryOfDays
            numberOfDays={remainingHolidays}
            holidayOverview={holidayOverview.REMAINING}
          />
          <SummaryOfDays
            numberOfDays={pendingDays}
            holidayOverview={holidayOverview.PENDING}
          />
        </View>
        <View style={styles.flatListView}>
          <SectionList
            renderItem={({ item }) => (
              itemList(item)
            )}
            renderSectionHeader={({ section }) => (
              <H3 style={styles.sectionListHeader}>{section.title}</H3>
            )}
            sections={events}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

UserView.propTypes = {
  events: PT.arrayOf(PT.object).isRequired,
  remainingHolidays: PT.number.isRequired,
  employee: PT.shape({
    forename: PT.string,
    surname: PT.string,
  }).isRequired,
  approvedHolidays: PT.number.isRequired,
  pendingDays: PT.number.isRequired,
};

export default UserView;
