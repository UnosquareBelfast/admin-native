import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { PropTypes as PT } from 'prop-types';
import { Icon } from 'react-native-elements';
import { GREY, WHITE } from '../../../styles/colors';
import type from '../../../constants/eventTypes';

class EventTypeGroup extends Component {
  static propTypes = {
    selectEventType: PT.func.isRequired,
  }

  constructor() {
    super();
    this.state = {
      eventType: [
        { type: type.ANNUAL_LEAVE, icon: 'suitcase', color: '#A7BF35' },
        { type: type.WFH, icon: 'home', color: '#399BB6' },
        { type: type.SICK_LEAVE, icon: 'bed', color: '#A2798F' },
        { type: type.WORK_TRAVEL, icon: 'plane', color: '#FF544E' },
      ],
      selectedIndex: 0,
    };
  }

  selected = (i, eventType) => {
    const { selectEventType } = this.props;
    this.setState({ selectedIndex: i });
    selectEventType(eventType[i].type);
  };

  render() {
    const { eventType, selectedIndex } = this.state;
    const checkBox = eventType.map((event, index) => {
      const isSelected = selectedIndex === index;
      const isOdd = index % 2 === 1;

      return (
        <TouchableOpacity
          key={index}
          onPress={() => this.selected(index, eventType)}
          style={[styles.box,
            {
              backgroundColor: isSelected ? event.color : WHITE,
              marginRight: isOdd ? 0 : 10,
            },
          ]}
        >
          <Icon
            name={event.icon}
            type="font-awesome"
            size={20}
            color={isSelected ? WHITE : event.color}
            containerStyle={{ width: 30, aspectRatio: 1, paddingRight: 5 }}
          />
          <Text
            style={[styles.textStyle,
              {
                color: isSelected ? WHITE : 'grey',
              },
            ]}
          >
            {event.type}
          </Text>
        </TouchableOpacity>
      );
    });

    return (
      <View style={styles.container}>
        {checkBox}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  box: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
    paddingHorizontal: 10,
    minWidth: 120,
    maxHeight: 40,
    borderRadius: 4,
    shadowRadius: 2,
    shadowColor: '#F7F7F7',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    elevation: 2,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 12,
    color: GREY,
  },
});

export default EventTypeGroup;
