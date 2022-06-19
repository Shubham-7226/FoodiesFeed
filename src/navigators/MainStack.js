import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import SearchUser from '../screens/SearchUser/SearchUser';
import AddPost from '../screens/AddPost/AddPost';
import ChatUser from '../screens/Chat/ChatUser';
import Profile from '../screens/Profile/Profile';
import Ionic from 'react-native-vector-icons/Ionicons';
import COLORS from '../constants/colors';
import Status from '../components/Status';
import EditProfile from '../components/EditProfile';
import DisplayImage from '../components/DisplayImage';
import SearchContent from '../components/SearchContent';
import ChangePassword from '../screens/ChangePassword/ChangePassword';
// import OnBoardScreen from '../screens/OnBoardScreen/OnBoardScreen';
function MainStack() {
  const Tab = createBottomTabNavigator();

  const Stack = createNativeStackNavigator();

  function BottomTabScreen() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 50,
          },
          tabBarIcon: ({focused, size, color}) => {
            let iconName;
            if (route.name === 'HomeFeed') {
              iconName = focused ? 'home-sharp' : 'home-outline';
              size = focused ? size + 8 : size + 2;
            } else if (route.name === 'SearchUserStack') {
              iconName = focused ? 'search' : 'search-sharp';
              size = focused ? size + 8 : size + 2;
            } else if (route.name === 'AddPost') {
              iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
              size = focused ? size + 26 : size + 25;
            } else if (route.name === 'ChatUser') {
              iconName = focused ? 'fast-food-sharp' : 'fast-food-outline';
              size = focused ? size + 8 : size + 2;
            } else if (route.name === 'ProfileStack') {
              iconName = focused ? 'ios-person-circle' : 'ios-person-outline';
              size = focused ? size + 8 : size + 2;
            }

            return <Ionic name={iconName} size={size} color={COLORS.primary} />;
          },
        })}>
        <Tab.Screen name="HomeFeed" component={Home} />
        <Tab.Screen name="SearchUserStack" component={SearchUserStack} />
        <Tab.Screen name="AddPost" component={AddPost} />
        <Tab.Screen name="ChatUser" component={ChatUser} />
        <Tab.Screen name="ProfileStack" component={ProfileStack} />
      </Tab.Navigator>
    );
  }
  function ProfileStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Navigator>
    );
  }
  function SearchUserStack() {
    return (
      <Stack.Navigator
      // screenOptions={{
      //   headerShown: false,
      // }}
      >
        <Stack.Screen
          name="SearchUser"
          component={SearchUser}
          options={{headerShown: false}}
        />
        <Stack.Screen name="SearchContent" component={SearchContent} />
        <Stack.Screen name="DisplayImage" component={DisplayImage} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={BottomTabScreen} />
      <Stack.Screen name="Status" component={Status} />
    </Stack.Navigator>
  );
}

export default MainStack;
