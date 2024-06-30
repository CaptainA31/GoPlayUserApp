import React, {useEffect, useRef, useState} from 'react';
import backIcon from '../../assets/back.png';
import logo from '../../assets/logo.png';
import BackgroundLogo from '../../assets/backgroundLogo.png';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';
import {RFValue} from 'react-native-responsive-fontsize';
import nextIcon from '../../assets/nextIcon.png';
import PhoneInput from 'react-native-phone-number-input';
import {colors, imageStyle} from '../../GlobalStyles';
import {getAllSports, UpdateSports} from '../../services/signin';
import {webURL} from '../../services/BaseURL';
import AlertBox from '../../components/AlertBox';
import {useNavigation} from '@react-navigation/native';

const SelectSport = ({route}) => {
  const navigation = useNavigation();
  const {phone} = route.params;
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState([]);

  const [message, setMessage] = useState('');
  const [alertBox, setAlertBox] = useState(false);
  const [title, setTitle] = useState('');

  const pageView = useRef();

  useEffect(() => {
    getAllSports().then(res => {
      setSports(res.data.sports);
    });
  }, []);

//   React.useEffect(
//     () =>
//       navigation.addListener('beforeRemove', e => {
//         // Prevent default behavior of leaving the screen
//         e.preventDefault();
//       }),
//     [navigation],
//   );

  const handleSelection = item => {
    let array = selectedSport.find(current => current == item);
    if (array) {
      let data = selectedSport.filter(current => current !== item);
      return setSelectedSport(data);
    }
    setSelectedSport([...selectedSport, item]);
  };

  const checkMultiple = item => {
    if (selectedSport.length == 0) {
      return false;
    } else {
      let data = selectedSport.find(element => element == item);
      if (data) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleNext = () => {
    const data = [];
    selectedSport.forEach(element => {
      data.push(element._id);
    });
    let update = {
      sportsInterest: data,
      phone: phone,
    };
    UpdateSports(update)
      .then(res => {
        setTitle('Success');
        setAlertBox(true);
        setMessage('Your profile is completed');
        setTimeout(() => {
          navigation.navigate('signin');
        }, 3000);
      })
      .catch(ex => {
        console.log(ex);
      });
  };

  return (
    <ScreenLayout>
      <View style={styles.headerContainer}>
        <AlertBox
          alertBox={alertBox}
          setAlertBox={setAlertBox}
          title={title}
          message={message}
        />
      </View>
      <View style={{paddingHorizontal: '3%'}}>
        <Text style={styles.h2}>Which Sports are you interested in?</Text>
      </View>
      <View
        style={{
          height: '83%',
          paddingTop: '5%',
          alignSelf: 'center',
          width: '80%',
        }}>
        <FlatList
          data={sports}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.name}
          contentContainerStyle={{}}
          renderItem={({item, index}) => (
            //  <Text>{item.name}</Text>
            <View style={{height: RFValue(120), width: '50%'}}>
              <TouchableOpacity
                onPress={() => handleSelection(item)}
                style={[styles.cardLogo]}>
                <View
                  style={[
                    styles.ballCircle,
                    {
                      borderColor: checkMultiple(item) ? 'white' : 'grey',
                      backgroundColor: checkMultiple(item) ? 'grey' : null,
                    },
                  ]}>
                  <Image
                    source={{uri: `${webURL}${item.logo}`}}
                    style={{
                      width: '60%',
                      height: '60%',
                      resizeMode: 'contain',
                      tintColor: checkMultiple(item) ? 'white' : 'grey',
                    }}
                  />
                </View>
                <Text style={{color: checkMultiple(item) ? 'grey' : 'grey'}}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingHorizontal: '3%',
        }}>
        <TouchableOpacity onPress={() => handleNext()}>
          <View style={styles.button}>
            <Image
              style={{
                width: '40%',
                height: '40%',
                resizeMode: 'contain',
                tintColor: 'grey',
              }}
              source={nextIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};
const styles = StyleSheet.create({
  backlogo: {
    resizeMode: 'center',
    width: 18,
    height: 22,
  },
  h2: {
    alignSelf: 'center',
    marginLeft: '3%',
    top: '0.5%',
    fontSize: RFValue(17),
    color: 'grey',
  },
  headerContainer: {
    width: '90%',
    paddingVertical: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    marginTop: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    position: 'absolute',
  },
  formContainer: {
    paddingHorizontal: '5%',
    height: '90%',
    marginTop: '10%',
    justifyContent: 'center',
  },
  h3: {
    paddingBottom: '10%',
    fontSize: RFValue(18),
    color: 'grey',
  },
  backButton: {
    right: '50%',
    paddingHorizontal: '4%',
    paddingTop: '2%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardLogo: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  ballCircle: {
    height: RFValue(70),
    width: RFValue(70),
    borderRadius: 100,
    borderColor: colors.light,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  button: {
    width: RFValue(50),
    height: RFValue(50),
    borderColor: 'grey',
    borderWidth: 3,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectSport;
