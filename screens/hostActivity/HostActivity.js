import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Platform,
} from 'react-native';
import Header from '../../components/Header';
import {colors, screen} from '../../GlobalStyles';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Button from '../../components/Button';
import SelectSports from './components/SelectSports';
import Venue from './components/Venue';
import {RFValue} from 'react-native-responsive-fontsize';
import Time from './components/Time';
import Player from './components/Player';
import Pricing from './components/Pricing';
import Summary from './components/Summary';
import wallpaper from '../../assets/wallpaper.png';
import PlacePicker from './components/PlacePicker';
import {
  createHostActivity,
  deleteHostActivity,
} from '../../services/HostActivity';
import Invites from './components/Invites';
import Loader from '../../components/Loader';
// import {useDispatch} from 'react-redux';
// import {fetchMyGames} from '../../redux/myGamesSlice';
import AlertBox from '../../components/AlertBox';
import AlertBox2 from '../../components/AlertBox2';

const HostActivity = ({navigation}) => {
  const [activeSlot, setActiveSlot] = useState(0);
  const [facilityId, setFacilityId] = useState(null);
  const [selectedSport, setSelectedSport] = useState();
  const [location, setLocation] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [venueFacility, setVenueFacility] = useState(['Parking , Shower']);
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('00:00 AM');
  const [endTime, setEndTime] = useState('00:00 AM');
  const [skills, setSkills] = useState();
  const [total, setTotal] = useState();
  const [age, setAge] = useState();
  const [confirmed, setConfirmed] = useState();
  const [gender, setGender] = useState();
  const [eventType, setEventType] = useState({value: 0});
  const [paymentType, setPaymentType] = useState('cash');
  const [price, setPrice] = useState();
  const [pitchDetail, setPitchDetail] = useState();
  const [isCompleted, setIsCompleted] = useState(false);
  const [activityName, setActivityName] = useState();
  const [inviteVisible, setInviteVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState([]);
  const [message, setMessage] = useState('');
  const [alertBox2, setAlertBox2] = useState(false);
  const [title, setTitle] = useState('');
  const [alertBox, setAlertBox] = useState(false);
  const [back, setBack] = useState();

  // const dispatch = useDispatch();

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        if (isCompleted) {
          return navigation.dispatch(e.data.action);
        }
        // Prompt the user before leaving the screen
        if (activeSlot > 0) {
          setActiveSlot(activeSlot - 1);
        } else {
          setTitle('Discard changes?');
          setAlertBox2(true);
          setMessage(
            'You have unsaved changes. Are you sure to discard them and leave the screen?',
          );
          setBack(e.data.action);
        }
      }),
    [navigation, activeSlot, isCompleted],
  );

  const handleSelection = item => {
    let array = selectedFacility.find(current => current == item);
    if (array) {
      let data = selectedFacility.filter(current => current !== item);
      return setSelectedFacility(data);
    }
    setSelectedFacility([...selectedFacility, item]);
  };

  const checkMultiple = item => {
    if (selectedFacility.length == 0) {
      return false;
    } else {
      let data = selectedFacility.find(element => element == item);
      if (data) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleAbort = () => {
    setAlertBox2(false);
    navigation.dispatch(back);
  };

  const handleNext = () => {
    if (activeSlot == 0) {
      return SelectSportValidation();
    }
    if (activeSlot == 1) {
      return venueValidation();
    }
    if (activeSlot == 2) {
      return timeValidation();
    }
    if (activeSlot == 3) {
      return playerValidation();
    }
    if (activeSlot == 4) {
      return pricingValidation();
    }

    if (activeSlot == 5) {
      let tempSelected = [];
      let tempGroup = [];
      let result = [];
      setLoading(true);
      if (eventType !== 0) {
        selectedUser.forEach(element => {
          tempSelected.push(element._id);
        });
        if (selectedGroup.length > 0) {
          console.log(selectedGroup);
          selectedGroup.members.map(element => {
            tempGroup.push(element._id);
          });
        }

        let concat = tempSelected.concat(tempGroup); // join arrays => [ 'a', 'b', 'c', 'd', 'e', 'f', 'c', 'e', 'g' ]
        let set = new Set(concat);
        result = [...set];
      }

      let data = {
        activityName: activityName,
        selectedSport: selectedSport._id,
        location: location,
        venueFacility: selectedFacility,
        additionalInfo: additionalInfo,
        startTime: startTime,
        endTime: endTime,
        selectedDate: selectedDate,
        skills: skills,
        ageGroup: age,
        total: total,
        confirmed: confirmed,
        gender: gender,
        isPublic: eventType == 0 ? true : false,
        paymentType: paymentType,
        price: price,
        pitchDetail: pitchDetail,
        invitedUsers: result,
      };
      createHostActivity(data)
        .then(res => {
          setLoading(false);
          if (res.data.status) {
            setIsCompleted(true);
            setFacilityId(res.data.facilityId);
            // dispatch(fetchMyGames());
          }
        })
        .catch(res => {
          setLoading(false);
        });
    } else {
      setActiveSlot(activeSlot + 1);
      console.log(selectedUser);
    }
  };

  const handleDelete = () => {
    let data = {
      facilityId: facilityId,
    };
    deleteHostActivity(data).then(res => {
      console.log(res.data);
    });
  };

  const handleBack = () => {
    navigation.navigate('Home');
  };

  const SelectSportValidation = () => {
    if (!selectedSport) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please select sports to continue');
      return;
    } else {
      setActiveSlot(activeSlot + 1);
    }
  };

  const venueValidation = () => {
    if (!activityName) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please select activity name to continue');
      return;
    }
    if (!location) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please select location to continue');
      return;
    }
    setActiveSlot(activeSlot + 1);
  };

  const timeValidation = () => {
    if (startTime == '00:00 AM' || endTime == '00:00 AM') {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please select available time to continue');
      return;
    }
    if (!pitchDetail) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please provide pitch details');
      return;
    }
    setActiveSlot(activeSlot + 1);
  };

  const playerValidation = () => {
    if (!skills) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please select skills to continue');
      return;
    }
    if (!total || !confirmed) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please provide players to continue');
      return;
    }
    if (Number(confirmed) > Number(total)) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Confirmed player can not be greater than total player');
      return;
    }
    if (Number(confirmed) > 99 || Number(total) > 99) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Confirmed player can not be greater than 99 players');
      return;
    }
    if (!gender) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please select gender to continue');
      return;
    }
    if (eventType.value == 0) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please select event type to continue');
      return;
    }
    setActiveSlot(activeSlot + 1);
  };

  const pricingValidation = () => {
    if (!price) {
      setTitle('Error');
      setAlertBox(true);
      setMessage('Please provide cost per player');
      return;
    }
    setActiveSlot(activeSlot + 1);
  };

  return (
    <ImageBackground source={wallpaper} style={[screen]}>
      <Header onBack={() => navigation.pop()} heading={'Host an Activity'} />

      <AlertBox
        alertBox={alertBox}
        setAlertBox={setAlertBox}
        title={title}
        message={message}
      />

      <AlertBox2
        alertBox={alertBox2}
        setAlertBox={setAlertBox2}
        title={title}
        message={message}
        onAbort={handleAbort}
      />

      <PlacePicker
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setLocation={setLocation}
        location={location}
      />
      <Invites
        setSelectedUser={setSelectedUser}
        navigation={navigation}
        modalVisible={inviteVisible}
        setModalVisible={setInviteVisible}
        setSelectedGroup={setSelectedGroup}
      />

      <View style={{height: '80%', width: '100%', paddingHorizontal: '5%'}}>
        <ProgressSteps
          activeStep={activeSlot}
          activeLabelColor={colors.light}
          activeStepIconBorderColor={colors.light}
          progressBarColor={colors.light}
          completedProgressBarColor={colors.light}
          completedStepIconColor={colors.light}
          labelFontSize={12}>
          <ProgressStep label={'Sports'} removeBtnRow>
            <SelectSports
              setSelectedSport={setSelectedSport}
              selectedSport={selectedSport}
            />
          </ProgressStep>
          <ProgressStep label={'Venue'} removeBtnRow>
            <Venue
              activityName={activityName}
              handleSelection={handleSelection}
              checkMultiple={checkMultiple}
              setActivityName={setActivityName}
              additionalInfo={additionalInfo}
              setAdditionalInfo={setAdditionalInfo}
              setModalVisible={setModalVisible}
              location={location}
              setLocation={setLocation}
            />
          </ProgressStep>
          <ProgressStep label={'Time'} removeBtnRow>
            <Time
              startTime={startTime}
              endTime={endTime}
              pitchDetail={pitchDetail}
              setSelectedDate={setSelectedDate}
              setPitchDetail={setPitchDetail}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
            />
          </ProgressStep>
          <ProgressStep label={'Player'} removeBtnRow>
            <Player
              skills={skills}
              setSkills={setSkills}
              setTotal={setTotal}
              setGender={setGender}
              setConfirmed={setConfirmed}
              gender={gender}
              setEventType={setEventType}
              eventType={eventType}
              setAge={setAge}
              setInviteVisible={setInviteVisible}
              total={total}
              confirmed={confirmed}
            />
          </ProgressStep>
          <ProgressStep label={'Pricing'} removeBtnRow>
            <Pricing
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              price={price}
              setPrice={setPrice}
            />
          </ProgressStep>
          <ProgressStep label={'Summary'} removeBtnRow>
            <Summary
              selectedSport={selectedSport}
              location={location}
              additionalInfo={additionalInfo}
              selectedDate={selectedDate}
              startTime={startTime}
              endTime={endTime}
              skills={skills}
              total={total}
              confirmed={confirmed}
              gender={gender}
              age={age}
              eventType={eventType}
              paymentType={paymentType}
              price={price}
              pitchDetail={pitchDetail}
              selectedFacility={selectedFacility}
            />
          </ProgressStep>
        </ProgressSteps>
      </View>
      <View
        style={{
          height: '12%',
          justifyContent: 'center',
          paddingHorizontal: '10%',
          borderTopLeftRadius: RFValue(25),
          borderTopRightRadius: RFValue(25),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: Platform.OS === 'android' ? 4 : 0, // Use elevation for Android
          // iOS shadow properties
          ...(Platform.OS === 'ios' && {
            shadowOffset: {width: 0, height: -3},
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }),
        }}>
        {isCompleted ? (
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={handleBack}
              style={{height: RFValue(45), width: '49%'}}>
              <Button text={'Go Back'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={{height: RFValue(45), width: '49%'}}>
              <Button text={'Delete Activity'} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{}}>
            <TouchableOpacity
              onPress={handleNext}
              disabled={loading}
              style={{height: RFValue(45)}}>
              {loading ? (
                <Loader />
              ) : (
                <>
                  <Button text={activeSlot == 5 ? 'Create Activity' : 'Next'} />
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default HostActivity;

const styles = StyleSheet.create({});
// do the same here
