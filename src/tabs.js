import PropTypes from 'prop-types';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme, Icon, Touchable, H6 } from '@apollosproject/ui-kit';
import { createFeatureFeedTab } from '@apollosproject/ui-connected';
import SplashScreen from 'react-native-splash-screen';

const Empty = () => null;
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
      <View>
        <Icon
          name="search"
          size={theme.sizing.baseUnit * 2}
          fill={theme.colors.primary}
          weight="bold"
        />
      </View>
    </Touchable>
  );
};

const tabBarIcon = (name) => {
  function TabBarIcon({ color }) {
    return <Icon name={name} fill={color} size={24} weight="bold" />;
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
    headerCenter: Empty,
    headerLargeTitle: false,
  },
  tabName: 'Recently Added',
  feedName: 'HOME',
});

const ReadTab = createFeatureFeedTab({
  options: {
    headerLeft: HeaderLogo,
    headerCenter: Empty,
    headerRight: SearchButton,
    headerLargeTitle: false,
  },
  tabName: 'Explore',
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
