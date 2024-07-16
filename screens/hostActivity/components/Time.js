import moment from 'moment';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert, Switch } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import time from '../../../assets/clock.png';
import info from '../../../assets/info.png';
import calendar from '../../../assets/calendar.png';
import AlertBox from '../../../components/AlertBox';
import { colors } from '../../../GlobalStyles';

const Time = ({
  setStartTime,
  setEndTime,
  pitchDetail,
  startTime,
  setSelectedDate,
  setPitchDetail,
  endTime,
}) => {
  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [endTimeVisible, setEndTimeVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(moment(new Date()));
  const dateRef = useRef(null);

  const [executable, setExecutable] = useState(true);

  const [message, setMessage] = useState('');
  const [alertBox, setAlertBox] = useState(false);
  const [alertBox2, setAlertBox2] = useState(false);
  const [title, setTitle] = useState('');
  const [back, setBack] = useState();
  const [isReminderSet, setIsReminderSet] = useState(false);

  const onDateSelected = date => {
    setSelectedDate(date);
  };

  const onDismissStart = React.useCallback(() => {
    setStartTimeVisible(false);
  }, [setStartTimeVisible]);

  const onConfirmStart = React.useCallback(
    date => {
      setStartTimeVisible(false);
      let time = moment(date).format('hh:mm A');
      setStartTime(time);
    },
    [setStartTimeVisible],
  );

  const onDismissEnd = React.useCallback(() => {
    setEndTimeVisible(false);
  }, [setEndTimeVisible]);

  const onConfirmEnd = React.useCallback(
    date => {
      setEndTimeVisible(false);
      let time = moment(date).format('hh:mm A');
      setEndTime(time);
    },
    [setEndTimeVisible],
  );

  const onDismissCalendar = React.useCallback(() => {
    setCalendarVisible(false);
  }, [setCalendarVisible]);

  const onConfirmCalendar = React.useCallback(
    params => {
      setCalendarVisible(false);
      let selectedDated = moment(params);
      let tempDate = moment(params).format('MM-DD-YYYY');
      let todayDate = moment(new Date());
      if (selectedDated.isSameOrAfter(todayDate)) {
        setSelectedDate(selectedDated);
        dateRef.current.setSelectedDate(selectedDated);
        dateRef.current.updateWeekView(selectedDated);
      } else {
        Alert.alert(
          'Error',
          "Date should be same or greater than today's date",
          [
            {
              text: 'Back',
              style: 'destructive',
              onPress: () => { },
            },
          ],
        );
      }
    },
    [setCalendarVisible],
  );

  const handleDateChange = event => {
    console.log(event);
    if (executable) {
      let todayDate = moment(new Date());
      let selectedDated = moment(event);
      if (selectedDated.isSameOrAfter(todayDate)) {
        onDateSelected(event);
        setSelectedMonth(moment(event));
      } else {
        setExecutable(false);
        setTitle('Error');
        setAlertBox(true);
        setMessage("Date should be same or greater than today's date");
        setTimeout(() => {
          dateRef.current.setSelectedDate(todayDate);
          dateRef.current.updateWeekView(todayDate);
        }, 1000);

        setTimeout(() => {
          setExecutable(true);
        }, 2000);
      }
    }
  };

  const formatTimeWithAMPM = (time) => {
    const [timePart, ampm] = time.split(' ');
    return (
      <Text style={styles.timeText}>
        {timePart} <Text style={styles.ampmText}>     | {ampm}</Text>
      </Text>
    );
  };

  return (
    <View style={{ paddingHorizontal: '1%', backgroundColor: '#fff', flex: 1 }}>
      <DateTimePickerModal
        isVisible={startTimeVisible}
        onCancel={onDismissStart}
        onConfirm={onConfirmStart}
        mode={'time'}
      />
      <DateTimePickerModal
        isVisible={endTimeVisible}
        onCancel={onDismissEnd}
        onConfirm={onConfirmEnd}
        mode={'time'}
      />
      <DateTimePickerModal
        isVisible={calendarVisible}
        onCancel={onDismissCalendar}
        onConfirm={onConfirmCalendar}
        mode={'date'}
      />
      <AlertBox
        alertBox={alertBox}
        setAlertBox={setAlertBox}
        title={title}
        message={message}
      />

      <Text style={styles.headerText}>Activity will set at</Text>

      <View style={styles.timePickerContainer}>
        <Pressable
          onPress={() => setStartTimeVisible(true)}
          style={styles.timePicker}
        >
          <Text style={styles.timePickerLabel}>Start Time</Text>
          <View style={styles.timePickerContent}>
            {formatTimeWithAMPM(startTime)}
            {/* <Image source={time} style={styles.icon} /> */}
          </View>
        </Pressable>

        <Pressable
          onPress={() => setEndTimeVisible(true)}
          style={styles.timePicker}
        >
          <Text style={styles.timePickerLabel}>End Time</Text>
          <View style={styles.timePickerContent}>
            {formatTimeWithAMPM(endTime)}
            {/* <Image source={time} style={styles.icon} /> */}
          </View>
        </Pressable>
      </View>

      <View style={styles.datePickerContainer}>
        <Pressable
          onPress={() => setCalendarVisible(true)}
          style={styles.datePicker}
        >
          <Text style={styles.datePickerLabel}>Date</Text>
          <View style={styles.datePickerContent}>
            <Text style={styles.timeText}>{selectedMonth.format('MM/DD/YYYY')}</Text>
            <Image source={calendar} style={styles.icon} />
          </View>
        </Pressable>
      </View>

      <View style={styles.reminderContainer}>
        <Switch
          value={isReminderSet}
          onValueChange={setIsReminderSet}
          thumbColor={isReminderSet ? colors.dark : colors.light}
          trackColor={{ false: '#767577', true: colors.light }}
          style={{ marginLeft: 5}}
        />
        <Text style={styles.reminderText}>Set Reminder</Text>
        <Text style={styles.reminderSubText}>Reminder will be set on your Google calendar</Text>
      </View>



      <View style={{marginTop: '5%'}}>
        <Text style={{fontSize: RFValue(14)}}>Pitch/Court Details</Text>

        <View style={{marginTop: '2%'}}>
          <OutlinedTextField
            lineWidth={1}
            tintColor={"#D8DADC"}
            baseColor="grey"
            textColor="grey"
            value={pitchDetail}
            containerStyle={{height: RFValue(45)}}
            // inputContainerStyle={{paddingRight: '20%', height: RFValue(50)}}
            onChangeText={event => setPitchDetail(event)}
            // label="Pitch/Court Details"
          />
        </View>
      </View>
      <View
        style={{marginTop: '5%', flexDirection: 'row', alignItems: 'center'}}>
        <View style={{width: 25, height: 25, marginRight: '2%'}}>
          <Image
            source={info}
            resizeMode="contain"
            style={{width: '100%', height: '100%', tintColor: colors.light}}
          />
        </View>
        <Text style={{fontSize: RFValue(11), color: 'black', paddingRight: 50, }}>
          Please add details for the Pitch/Court to assist the players identify
          the pitch/court at the venue.Example for football : 7x7 pitch 1
        </Text>
      </View>

    </View>
  );
};

export default Time;

const styles = StyleSheet.create({
  headerText: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: '#000',
    marginTop: '5%',
    marginBottom: 30
  },
  timePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
    marginBottom: 30
  },
  timePicker: {
    width: '48%',
    borderColor: '#D8DADC',
    borderWidth: 2,
    borderRadius: 5,
    padding: '3%',
  },
  timePickerLabel: {
    position: 'absolute',
    top: -30,
    left: -6,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontSize: RFValue(14),
    color: 'black',
  },
  timePickerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: RFValue(16),
    color: '#000',
  },
  ampmText: {
    fontSize: RFValue(16),
    color: colors.light, // Change to your preferred color
    borderColor: colors.light,
    borderLeftWidth: 1
  },
  icon: {
    width: RFValue(18),
    height: RFValue(18),
    tintColor: colors.light,
  },
  datePickerContainer: {
    marginTop: '5%',
  },
  datePicker: {
    width: '100%',
    borderColor: '#D8DADC',
    borderWidth: 2,
    borderRadius: 5,
    padding: '3%',
  },
  datePickerLabel: {
    position: 'absolute',
    top: -30,
    left: -6,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontSize: RFValue(14),
    color: 'black',
  },
  datePickerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  reminderText: {
    fontSize: RFValue(12),
    color: '#000',
    marginRight: 'auto',
    fontWeight: "bold"
  },
  reminderSubText: {
    fontSize: RFValue(10),
    color: 'black',
    marginTop: 50,
    marginRight: -1
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  infoIcon: {
    width: 25,
    height: 25,
    tintColor: colors.light,
    marginRight: '2%',
  },
  infoText: {
    fontSize: RFValue(12),
    color: 'grey',
    paddingRight: 50,
  },
});
