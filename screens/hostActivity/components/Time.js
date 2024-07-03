import moment from 'moment';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, View, Image, Pressable, Alert} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {colors} from '../../../GlobalStyles';
import DateView from './DateView';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import time from '../../../assets/clock.png';
import info from '../../../assets/info.png';
import calendar from '../../../assets/calendar.png';
import AlertBox from '../../../components/AlertBox';

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

  const onDateSelected = date => {
    setSelectedDate(date);
    //     let data = {
    //         date : moment(date).format('MM-DD-YYYY')
    //     }
    //    getSlotsByDate(data).then((res) =>{
    //        if (res.data.status === true) {
    //            setScheduleList(res.data.slots)
    //        }else {
    //            setScheduleList([])
    //        }

    //    } )
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
              onPress: () => {},
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

  return (
    <View style={{paddingHorizontal: '3%'}}>
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

      <View style={{marginTop: '-4%'}}>
        <Pressable
          onPress={() => setCalendarVisible(true)}
          style={{
            position: 'absolute',
            width: '100%',
            height: '25%',
            top: '5%',
            zIndex: 1000,
          }}></Pressable>

        <Pressable
          onPress={() => setCalendarVisible(true)}
          style={{
            alignSelf: 'flex-end',
            zIndex: 100,
            width: 22,
            height: 22,
            top: '16%',
          }}>
          <Image
            source={calendar}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </Pressable>
        <DateView
          onDateSelected={onDateSelected}
          setSelectedMonth={setSelectedMonth}
          dateRef={dateRef}
          handleDateChange={handleDateChange}
          selectedMonth={selectedMonth}
        />
      </View>

      <View style={{marginTop: '5%'}}>
        <Text style={{fontSize: RFValue(14), fontWeight: 'bold'}}>
          Activity will set at
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: '5%',
          }}>
          <Pressable
            onPress={() => setStartTimeVisible(true)}
            style={{width: '49%'}}>
            <View style={styles.outlineField}>
              <View style={styles.outlineText}>
                <Text>Start Time</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: '5%',
                }}>
                <Text>{startTime}</Text>
                <View style={{width: RFValue(14), height: RFValue(14)}}>
                  <Image
                    source={time}
                    style={{
                      resizeMode: 'contain',
                      width: '100%',
                      height: '100%',
                      tintColor: colors.light,
                    }}
                  />
                </View>
              </View>
            </View>
          </Pressable>
          <Pressable
            onPress={() => setEndTimeVisible(true)}
            style={{width: '49%'}}>
            <View style={styles.outlineField}>
              <View style={styles.outlineText}>
                <Text>End Time</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: '5%',
                }}>
                <Text>{endTime}</Text>
                <View style={{width: RFValue(14), height: RFValue(14)}}>
                  <Image
                    source={time}
                    style={{
                      resizeMode: 'contain',
                      width: '100%',
                      height: '100%',
                      tintColor: colors.light,
                    }}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={{marginTop: '5%'}}>
        {/* <Text style={{fontSize: RFValue(14)}}>Pitch/Court Details</Text> */}

        <View style={{marginTop: '2%'}}>
          <OutlinedTextField
            lineWidth={1}
            tintColor={colors.light}
            baseColor="grey"
            textColor="grey"
            value={pitchDetail}
            containerStyle={{height: RFValue(45)}}
            inputContainerStyle={{paddingRight: '20%', height: RFValue(50)}}
            onChangeText={event => setPitchDetail(event)}
            label="Pitch/Court Details"
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
  pitch: {
    borderColor: colors.light,
    borderRadius: RFValue(5),
    height: RFValue(30),
    paddingHorizontal: '5%',
    width: RFValue(60),
    borderWidth: 1,
    justifyContent: 'center',
    marginTop: '2%',
  },
  outlineField: {
    borderColor: colors.light,
    height: RFValue(45),
    borderRadius: 5,
    borderWidth: 2,
  },
  outlineText: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingLeft: '2%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
    top: '-20%',
  },
});
