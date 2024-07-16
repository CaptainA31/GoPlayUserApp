// import React, { useCallback, useState } from 'react'
// import { StyleSheet, Text, View } from 'react-native'
// import Slider from 'rn-range-slider';
// import Thumb from './Slider/Thumb';
// import Rail from './Slider/Rail';
// import RailSelected from './Slider/RailSelected';
// import Notch from './Slider/Notch';
// import Label from './Slider/Label';
// import { RFValue } from 'react-native-responsive-fontsize';


// const RangeSlider = ({setAge}) => {
//     const [rangeDisabled, setRangeDisabled] = useState(false);
//   const [low, setLow] = useState(0);
//   const [high, setHigh] = useState(100);
//   const [min, setMin] = useState(13);
//   const [max, setMax] = useState(80);
//   const [floatingLabel, setFloatingLabel] = useState(false);

//   const renderThumb = useCallback((value) => <Thumb low = {low} text={value}/>, [low]);
//   const renderRail = useCallback(() => <Rail/>, []);
//   const renderRailSelected = useCallback(() => <RailSelected/>, []);
//   const renderLabel = useCallback(value => <Label text={value}/>, []);
//   const renderNotch = useCallback(() => <Notch/>, []);
//   const handleValueChange = useCallback((low, high) => {
//     setLow(low);
//     setHigh(high);
//     let data = {
//       from  : low,
//       to  : high 
//     }
//     setAge(data)
//   }, []);
//   const toggleRangeEnabled = useCallback(() => setRangeDisabled(!rangeDisabled), [rangeDisabled]);
//   const setMinTo50 = useCallback(() => setMin(50), []);
//   const setMinTo0 = useCallback(() => setMin(0), []);
//   const setMaxTo100 = useCallback(() => setMax(100), []);
//   const setMaxTo500 = useCallback(() => setMax(500), []);
//   const toggleFloatingLabel = useCallback(() => setFloatingLabel(!floatingLabel), [floatingLabel]);



//     return (
//         <View style = {{top : "-7%"}}>
//           <Text style={{position : "absolute" , fontSize : RFValue(13),top : "35%"}}>{low}</Text>
//           <Text style={{position : "absolute"  , alignSelf : "flex-end" , fontSize : RFValue(13),top : "35%"}}>{high}</Text>

//             <Slider
//              min={min}
//              max={max}
//              step={1}
//              disableRange={rangeDisabled}
//              floatingLabel={floatingLabel}
//              renderThumb={renderThumb}
//              renderRail={renderRail}
//              renderRailSelected={renderRailSelected}
//              renderLabel={renderLabel}
//              renderNotch={renderNotch}
//              onValueChanged={handleValueChange}
//            />
//         </View>
//     )
// }

// export default RangeSlider

// const styles = StyleSheet.create({})
import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {RFValue} from 'react-native-responsive-fontsize';
import {colors} from '../../../GlobalStyles';

const RangeSlider = ({setAge}) => {
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');

  const handleMinAgeChange = text => {
    setMinAge(text);
    updateAgeRange(text, maxAge);
  };

  const handleMaxAgeChange = text => {
    setMaxAge(text);
    updateAgeRange(minAge, text);
  };

  const updateAgeRange = (min, max) => {
    if (min && max) {
      let data = {
        from: parseInt(min),
        to: parseInt(max),
      };
      setAge(data);
    }
  };

  return (
  <View> 
    <View style={styles.confirmTitle}>
      <Text style={styles.sectionsubTitle}>Min Age</Text>
      <Text style={styles.sectionsubTitle}>Max Age</Text>
    </View>
    <View style={styles.inputRow}>
        <OutlinedTextField
          lineWidth={1}
          tintColor={colors.light}
          baseColor="grey"
          textColor="black"
          keyboardType="numeric"
          value={minAge}
          containerStyle={styles.inputContainer}
          // inputContainerStyle={{paddingHorizontal: '5%', height: RFValue(45)}}
          onChangeText={handleMinAgeChange}
          // label="Min Age"
        />
        <OutlinedTextField
          lineWidth={1}
          tintColor={colors.light}
          baseColor="grey"
          textColor="black"
          keyboardType="numeric"
          value={maxAge}
          containerStyle={styles.inputContainer}
          // inputContainerStyle={{paddingHorizontal: '5%', height: RFValue(45)}}
          onChangeText={handleMaxAgeChange}
          // label="Max Age"
          />
          </View>
    </View>
  );
};

export default RangeSlider;


const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: RFValue(14),
    marginBottom: 10,
  },
  sectionsubTitle: {
    fontSize: RFValue(12),
    marginBottom: 2,
    flex: 1,
    flexDirection: 'row',
  },
  confirmTitle: {
    flex: 1,
    flexDirection: 'row',
    fontSize: RFValue(12),
    marginBottom: 2,
  },
  sectionContainer: {
    marginTop: '4%',
  },
  selected: {
    backgroundColor: colors.light,
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2%',
  },
  inputContainer: {
    width: '49%',
    height: RFValue(45),
  },
})