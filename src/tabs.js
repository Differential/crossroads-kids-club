import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme, Icon, Touchable, H6 } from '@apollosproject/ui-kit';
import { createFeatureFeedTab } from '@apollosproject/ui-connected';
import SplashScreen from 'react-native-splash-screen';

const HeaderLogo = () => {
  const theme = useTheme();
  return (
    <>
      <Icon name="brand-icon" size={theme.sizing.baseUnit * 3} />
      <H6>By Crossroads Church</H6>
    </>
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
    showTitle: false,
  },
  tabName: 'Home',
  feedName: 'HOME',
});

const ReadTab = createFeatureFeedTab({
  options: {
    headerLeft: HeaderLogo,
    showTitle: false,
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
        name="Recently Added"
        component={HomeTab}
        options={{ tabBarIcon: tabBarIcon('play-square') }}
      />
      <Screen
        name="Explore"
        component={ReadTab}
        options={{ tabBarIcon: tabBarIcon('compass') }}
      />
    </Navigator>
  );
};

export default TabNavigator;
