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
import BottomTabView from '../components/BottomTabView';
import ChangePassword from '../screens/ChangePassword/ChangePassword';
import {ProfileBody} from '../components/ProfileBody';
import SearchBox from '../components/SearchBox';
import ShowSearchedUsers from '../components/ShowSearchedUsers';
import FollowingUsers from '../screens/FollowingUsers/FollowingUsers';
import OtherUserProfile from '../screens/OtherUserProfile/OtherUserProfile';
import Comments from '../components/Comments';
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
        <Stack.Screen
          name="FollowingUsers"
          component={FollowingUsers}
          options={({route}) => ({title: route.params.name, headerShown: true})}
        />
        <Stack.Screen name="ProfileBody" component={ProfileBody} />
        <Stack.Screen name="BottomTabView" component={BottomTabView} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="DisplayImage"
          component={DisplayImage}
          options={{title: 'Posts', headerShown: true}}
        />
      </Stack.Navigator>
    );
  }

  function SearchUserStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}>
        <Stack.Screen
          name="SearchUser"
          component={SearchUser}
          options={{headerShown: false}}
        />
        <Stack.Screen name="SearchBox" component={SearchBox} />
        <Stack.Screen
          name="ShowSearchedUsers"
          component={ShowSearchedUsers}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtherUserProfile"
          component={OtherUserProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="FollowingUsers"
          component={FollowingUsers}
          options={({route}) => ({title: route.params.name, headerShown: true})}
        />
        <Stack.Screen
          name="DisplayImage"
          component={DisplayImage}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={BottomTabScreen} />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{headerShown: true}}
      />
      <Stack.Screen name="Status" component={Status} />
    </Stack.Navigator>
  );
}

export default MainStack;
