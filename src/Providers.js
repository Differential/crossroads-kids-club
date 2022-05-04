import querystring from 'querystring';
import PropTypes from 'prop-types';
import { NavigationService } from '@apollosproject/ui-kit';
import { AnalyticsProvider } from '@apollosproject/ui-analytics';
import { NotificationsProvider } from '@apollosproject/ui-notifications';
import { ACCEPT_FOLLOW_REQUEST } from '@apollosproject/ui-connected';
import ApollosConfig from '@apollosproject/config';

import ClientProvider, { client } from './client';
import segment from './segment';

const AppProviders = ({ children }) => (
  <ClientProvider>
    <NotificationsProvider
      // TODO deprecated prop
      navigate={NavigationService.navigate}
      handleExternalLink={(url) => {
        const path = url.split('app-link/')[1];
        const [route, location] = path.split('/');
        if (route === 'content') {
          NavigationService.navigate('ContentSingle', { itemId: location });
        }
        if (route === 'nav') {
          const [component, params] = location.split('?');
          const args = querystring.parse(params);
          NavigationService.navigate(
            // turns "home" into "Home"
            component[0].toUpperCase() + component.substring(1),
            args
          );
        }
      }}
      actionMap={{
        // accept a follow request when someone taps "accept" in a follow request push notification
        acceptFollowRequest: ({ requestPersonId }) =>
          client.mutate({
            mutation: ACCEPT_FOLLOW_REQUEST,
            variables: { personId: requestPersonId },
          }),
      }}
    >
      <AnalyticsProvider
        trackFunctions={[
          ({ eventName, properties }) => segment.track(eventName, properties),
        ]}
      >
        {children}
      </AnalyticsProvider>
    </NotificationsProvider>
  </ClientProvider>
);

AppProviders.propTypes = {
  children: PropTypes.shape({}),
};

export default AppProviders;
