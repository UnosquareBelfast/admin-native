import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { ScrollView, View, StyleSheet, FlatList } from 'react-native';
import { Calendar } from 'react-native-calendars';
import ListItem from '../ListItem';
import CustomDay from '../CustomDay';
import { H3 } from '../../Common';
import { LIGHTGREY, ACTIVECOLOR, BLACK, GREY } from '../../../styles/colors';
import { H1_SIZE } from '../../../styles/text';
import { container } from '../../../styles/layout';
import { getDuration } from '../../../utilities/dates';
import eventType from '../../../constants/eventTypes';
import { holidayStatus } from '../../../constants/holidayStatus';

const HomeView = (props) => {
  const {
    events,
    upcomingEvents,
    onDayPress,
    onMonthChange,
  } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Calendar
        style={[styles.calendar]}
        markedDates={events}
        markingType="period"
        dayComponent={dayProps => <CustomDay {...dayProps} />}
        theme={{
          textMonthFontFamily: 'oswaldRegular',
          textDayFontFamily: 'openSansLight',
          textDayHeaderFontFamily: 'openSansRegular',
          textMonthFontSize: H1_SIZE,
          todayTextColor: ACTIVECOLOR,
          arrowColor: ACTIVECOLOR,
          monthTextColor: BLACK,
          dayTextColor: BLACK,
          textSectionTitleColor: BLACK,
          'stylesheet.calendar.header': {
            week: {
              marginTop: 20,
              paddingBottom: 13,
              flexDirection: 'row',
              justifyContent: 'space-around',
              borderBottomWidth: 1,
              borderColor: LIGHTGREY,
            },
          },
        }}
        onDayPress={day => onDayPress(day)}
        onMonthChange={month => onMonthChange(month)}
      />
      <View style={styles.upcoming}>
        <H3 style={{ color: GREY }}>Upcoming</H3>
        <FlatList
          keyExtractor={item => item.eventId.toString()}
          data={upcomingEvents}
          renderItem={({ item }) => {
            const isWfh = (item.eventType.description === eventType.WFH);
            return (
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
          }}
        />
      </View>
    </ScrollView>
  );
};

HomeView.propTypes = {
  events: PT.shape({
    text: PT.string,
    color: PT.string,
  }).isRequired,
  onDayPress: PT.func.isRequired,
  onMonthChange: PT.func.isRequired,
  upcomingEvents: PT.arrayOf(PT.object).isRequired,
};

const styles = StyleSheet.create({
  container: {
    ...container,
  },
  calendar: {
    paddingBottom: 30,
  },
  upcoming: {
    flex: 1,
    backgroundColor: '#fcfcfc',
    paddingHorizontal: 20,
  },
});

export default HomeView;
