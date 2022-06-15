import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home/Home';
import SearchUser from '../screens/SearchUser/SearchUser';
import AddPost from '../screens/AddPost/AddPost';
import ChatUser from '../screens/Chat/ChatUser';
import Profile from '../screens/Profile/Profile';

const Tab = createBottomTabNavigator();

export default function MainStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SearchUser" component={SearchUser} />
      <Tab.Screen name="AddPost" component={AddPost} />
      <Tab.Screen name="ChatUser" component={ChatUser} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

// const Stack = createNativeStackNavigator();

// export function PostStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="AddPost" component={AddPost} />
//       <Stack.Screen name="HomeFeed" component={Home} />
//     </Stack.Navigator>
//   );
// }
