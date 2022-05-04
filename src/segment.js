import ApollosConfig from '@apollosproject/config';
import { createClient } from '@segment/analytics-react-native';

export default createClient({
  writeKey: ApollosConfig.SEGMENT_KEY || '',
  trackAppLifecycleEvents: true,
});
