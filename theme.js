import { Image } from 'react-native';
import ApollosConfig from '@apollosproject/config';
import Svg, { Path } from 'react-native-svg';
import FRAGMENTS from '@apollosproject/ui-fragments';
import { makeIcon } from '@apollosproject/ui-kit';
import segment from './src/segment';

const mapVideoEventProperties = (properties) => {
  return {
    position: properties?.elapsedTime,
    totalLength: properties?.totalDuration,
    sessionId: properties?.sessionId,
    videoPlayer: "Kids' Club Mobile App",
    livestream: false,
    contentAssetId: properties?.id,
    title: properties?.title,
  };
};

const THEME = {
  colors: { primary: '#C86600', secondary: '#C86600' },
  typography: {},
  overrides: {
    'ui-kit.ContentTitles': { onPressLike: 0, onPressShare: 0 },
    HeroItemComponent: {
      labelText: 'Latest Episode',
    },
    'ui-media-player.ApollosPlayerContainer': () => () => ({
      autoplay: true,
      onPlay: (properties) =>
        segment.track(
          'VideoPlaybackStarted',
          mapVideoEventProperties(properties)
        ),
      onPause: (properties) =>
        segment.track(
          'VideoPlaybackPaused',
          mapVideoEventProperties(properties)
        ),
      onEnd: (properties) =>
        segment.track(
          'VideoPlaybackCompleted',
          mapVideoEventProperties(properties)
        ),
    }),
  },
};

const ICONS = {
  BrandIcon: ({ size = 32 }) => (
    <Image
      style={{ width: size, height: size }}
      source={require('./banner.png')}
    />
  ),
  PlaySquare: makeIcon(({ size = 32, fill, ...otherProps } = {}) => (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill={fill}>
      <Path
        d="M16.7498 12.0705L10.324 8.81968C10.1591 8.71656 9.9694 8.65975 9.77491 8.65522C9.58042 8.65068 9.38829 8.69859 9.21871 8.79392C9.04912 8.88924 8.90832 9.02846 8.81109 9.19697C8.71387 9.36547 8.6638 9.55704 8.66614 9.75157V16.2531C8.6638 16.4477 8.71387 16.6392 8.81109 16.8077C8.90832 16.9763 9.04912 17.1155 9.21871 17.2108C9.38829 17.3061 9.58042 17.354 9.77491 17.3495C9.9694 17.345 10.1591 17.2882 10.324 17.185L16.7498 13.9342C16.9115 13.8383 17.0454 13.7019 17.1384 13.5386C17.2315 13.3752 17.2804 13.1904 17.2804 13.0024C17.2804 12.8143 17.2315 12.6296 17.1384 12.4662C17.0454 12.3028 16.9115 12.1664 16.7498 12.0705Z"
        fill={fill}
      />
      <Path
        d="M25.3102 5.76394C25.2325 5.30538 25.0093 4.88398 24.6737 4.56201C24.3381 4.24004 23.9078 4.03459 23.4464 3.97601C19.9845 3.5011 16.4948 3.25855 13.0005 3.25C9.50602 3.26215 6.01626 3.50831 2.55466 3.98684C2.0948 4.04482 1.66564 4.24869 1.33019 4.56854C0.994739 4.88839 0.770669 5.30736 0.690879 5.76394C-0.230293 10.5419 -0.230293 15.4519 0.690879 20.2299C0.766449 20.6905 0.988666 21.1143 1.32447 21.4384C1.66028 21.7625 2.09174 21.9695 2.55466 22.0287C6.01631 22.5055 9.5062 22.7481 13.0005 22.7547C16.4951 22.7445 19.985 22.4983 23.4464 22.0179C23.9093 21.9587 24.3408 21.7517 24.6766 21.4276C25.0124 21.1035 25.2346 20.6796 25.3102 20.2191C26.2299 15.4446 26.2299 10.5384 25.3102 5.76394ZM23.2513 19.5039C23.2314 19.6181 23.1754 19.7228 23.0915 19.8028C23.0076 19.8827 22.9004 19.9337 22.7854 19.9482C19.5417 20.3793 16.2728 20.5929 13.0005 20.5875C9.73817 20.577 6.48016 20.349 3.24816 19.9049C3.13328 19.8996 3.02306 19.8579 2.93345 19.7858C2.84384 19.7137 2.77949 19.615 2.74971 19.5039C1.95207 15.2062 1.95207 10.7985 2.74971 6.50079C2.77504 6.3845 2.83724 6.2795 2.92705 6.2014C3.01686 6.1233 3.12948 6.07629 3.24816 6.06735C9.72101 5.20304 16.28 5.20304 22.7529 6.06735C22.8672 6.08344 22.9737 6.13494 23.0572 6.21463C23.1408 6.29431 23.1973 6.39817 23.2188 6.51162C24.0259 10.8038 24.0369 15.2078 23.2513 19.5039Z"
        fill={fill}
      />
    </Svg>
  )),
};

ApollosConfig.loadJs({ FRAGMENTS, THEME, ICONS });
