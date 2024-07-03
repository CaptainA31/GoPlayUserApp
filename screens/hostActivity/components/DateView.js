import moment from 'moment';
import React from 'react';
import { StyleSheet , View , Text } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { RFValue } from 'react-native-responsive-fontsize';
import { colors } from '../../../GlobalStyles';



const DateView = ({onDateSelected , selectedMonth , dateRef , handleDateChange ,  setSelectedMonth})=> {
    let date = new Date()
    let maxDate = new Date(2022)
   

    return (
      <View style={styles.container}>
        <CalendarStrip
          showMonth={true}
          ref={dateRef}
          // minDate = {date}
          responsiveSizingOffset={25}
          dayComponentHeight={RFValue(70)}
          scrollable
          style={{height: '100%'}}
          dateNameStyle={{fontSize: 15, color: '#828282', fontFamily: 'Poppins-Regular'}}
          dateNumberStyle={{opacity: 0.5, color: '#828282'}}
          highlightDateNameStyle={{color: 'white'}}
          highlightDateNumberStyle={{color: 'white', width: '50%'}}
          dayContainerStyle={{
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#DFDFDF',
          }}
          daySelectionAnimation={{
            type: 'background',
            duration: 200,
            highlightColor: '#38B000',
          }}
          leftSelector={[]}
          rightSelector={[]}
          scrollToOnSetSelectedDate={true}
          startingDate={date}
          selectedDate={selectedMonth}
          shouldAllowFontScaling={false}
          onDateSelected={event => {
            handleDateChange(event);
          }}
          calendarColor={'white'}
          calendarHeaderStyle={{
            color: 'grey',
            fontSize: RFValue(16),
            fontFamily: 'Poppins-Regular',
            top: '-5%',
          }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    
    container: { height : 110 },
 
  
})

export default DateView