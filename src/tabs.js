import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationService,
  useTheme,
  Icon,
  Touchable,
} from '@apollosproject/ui-kit';
import { useApolloClient } from '@apollo/client';
import { createFeatureFeedTab } from '@apollosproject/ui-connected';
import { checkOnboardingStatusAndNavigate } from '@apollosproject/ui-onboarding';
import SplashScreen from 'react-native-splash-screen';

const HeaderLogo = () => {
  const theme = useTheme();
  return (
    <Icon
      name="brand-icon"
      size={theme.sizing.baseUnit * 1.5}
      fill={theme.colors.primary}
    />
  );
};

const SearchButton = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  return (
    <Touchable
      onPress={() => {
        navigation.navigate('Search');
      }}
    >
      <Icon
        name="search"
        size={theme.sizing.baseUnit * 2}
        fill={theme.colors.primary}
      />
    </Touchable>
  );
};

const tabBarIcon = (name) => {
  function TabBarIcon({ color }) {
    return <Icon name={name} fill={color} size={24} />;
  }
  TabBarIcon.propTypes = {
    color: PropTypes.string,
  };
  return TabBarIcon;
};

// we nest stack inside of tabs so we can use all the fancy native header features
const HomeTab = createFeatureFeedTab({
  screenOptions: {
    headerHideShadow: true,
    headerRight: SearchButton,
    headerLeft: HeaderLogo,
    headerLargeTitle: false,
  },
  tabName: 'Home',
  feedName: 'HOME',
});

const ReadTab = createFeatureFeedTab({
  options: {
    headerLeft: HeaderLogo,
  },
  tabName: 'Read',
  feedName: 'READ',
});

const { Navigator, Screen } = createBottomTabNavigator();

const TabNavigator = () => {
  SplashScreen.hide();
  return (
    <Navigator lazy>
      <Screen
        name="Home"
        component={HomeTab}
        options={{ tabBarIcon: tabBarIcon('home') }}
      />
      <Screen
        name="Read"
        component={ReadTab}
        options={{ tabBarIcon: tabBarIcon('sections') }}
      />
    </Navigator>
  );
};

export default TabNavigator;
