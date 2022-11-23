/**
 * @jest-environment node
 */
/**
 * (C) Copyright IBM Corp. 2022.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable no-console */

const { readExternalSources } = require('ibm-cloud-sdk-core');
const fs = require('fs');
const EventNotificationsV1 = require('../dist/event-notifications/v1');

// eslint-disable-next-line node/no-unpublished-require
const authHelper = require('../test/resources/auth-helper.js');
// You can use the readExternalSources method to access additional configuration values
// const { readExternalSources } = require('ibm-cloud-sdk-core');

//
// This file provides an example of how to use the Event Notifications service.
//
// The following configuration properties are assumed to be defined:
// EVENT_NOTIFICATIONS_URL=<service base url>
// EVENT_NOTIFICATIONS_AUTH_TYPE=iam
// EVENT_NOTIFICATIONS_APIKEY=<IAM apikey>
// EVENT_NOTIFICATIONS_AUTH_URL=<IAM token service base URL - omit this if using the production environment>
//
// These configuration properties can be exported as environment variables, or stored
// in a configuration file and then:
// export IBM_CREDENTIALS_FILE=<name of configuration file>
//
const configFile = `${__dirname}/../event_notifications_v1.env`;

const describe = authHelper.prepareTests(configFile);

// EN config values
let instanceId = '';
const topicName = 'Admin Topic Compliance';
let sourceId = '';
let topicId = '';
let destinationId = '';
let destinationId1 = '';
let destinationId2 = '';
let destinationId3 = '';
let destinationId4 = '';
let destinationId5 = '';
let destinationId6 = '';
let destinationId7 = '';
let destinationId8 = '';
let destinationId9 = '';
let destinationId10 = '';
let subscriptionId = '';
let subscriptionId1 = '';
let subscriptionId2 = '';
let subscriptionId3 = '';
let fcmServerKey = '';
let fcmSenderId = '';
let safariCertificatePath = '';

// Save original console.log
const originalLog = console.log;
const originalWarn = console.warn;

// Mocks for console.log and console.warn
const consoleLogMock = jest.spyOn(console, 'log');
const consoleWarnMock = jest.spyOn(console, 'warn');

describe('EventNotificationsV1', () => {
  // To access additional configuration values, uncomment this line and extract the values from config
  // const config = readExternalSources(EventNotificationsV1.DEFAULT_SERVICE_NAME);

  const config = readExternalSources(EventNotificationsV1.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();

  instanceId = config.guid;
  fcmSenderId = config.fcmId;
  fcmServerKey = config.fcmKey;
  safariCertificatePath = config.safariCertificate;

  let eventNotificationsService = EventNotificationsV1.newInstance({});

  test('Initialize services', async () => {
    // begin-common

    eventNotificationsService = EventNotificationsV1.newInstance({});

    // end-common
  });
  test('createSources request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createSources() result:');
    // begin-create_sources

    const params = {
      instanceId,
      name: 'Event Notification Create Source Acme',
      description: 'This source is used for Acme Bank',
      enabled: false,
    };

    let res;
    try {
      res = await eventNotificationsService.createSources(params);
      console.log(JSON.stringify(res.result, null, 2));
      sourceId = res.result.id;
    } catch (err) {
      console.warn(err);
    }
    // end-create_sources
  });
  test('listSources request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listSources() result:');
    // begin-list_sources

    const params = {
      instanceId,
    };

    let res;
    try {
      res = await eventNotificationsService.listSources(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_sources
  });

  test('getSource request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getSource() result:');
    // begin-get_source

    const params = {
      instanceId,
      id: sourceId,
    };

    let res;
    try {
      res = await eventNotificationsService.getSource(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_source
  });
  test('updateSource request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateSource() result:');
    // begin-update_source

    const params = {
      instanceId,
      id: sourceId,
      name: 'Event Notification update Source Acme',
      description: 'This source is used for updated Acme Bank',
      enabled: true,
    };

    let res;
    try {
      res = await eventNotificationsService.updateSource(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_source
  });
  test('createTopic request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createTopic() result:');
    // begin-create_topic

    // Rules
    const rulesModel = {
      enabled: false,
      event_type_filter: "$.notification_event_info.event_type == 'cert_manager'",
      notification_filter: "$.notification.findings[0].severity == 'MODERATE'",
    };

    // TopicUpdateSourcesItem
    const topicUpdateSourcesItemModel = {
      id: sourceId,
      rules: [rulesModel],
    };

    const params = {
      instanceId,
      name: topicName,
      description:
        'This topic is used for routing all compliance related notifications to the appropriate destinations',
      sources: [topicUpdateSourcesItemModel],
    };

    let res;
    try {
      res = await eventNotificationsService.createTopic(params);
      console.log(JSON.stringify(res.result, null, 2));
      topicId = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    // end-create_topic
  });

  test('listTopics request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listTopics() result:');
    // begin-list_topics

    const params = {
      instanceId,
    };

    let res;
    try {
      res = await eventNotificationsService.listTopics(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_topics
  });

  test('getTopic request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getTopic() result:');
    // begin-get_topic

    const params = {
      instanceId,
      id: topicId,
    };

    let res;
    try {
      res = await eventNotificationsService.getTopic(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_topic
  });

  test('replaceTopic request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('replaceTopic() result:');
    // begin-replace_topic

    // Rules
    const rulesModel = {
      enabled: true,
      event_type_filter: '$.*',
    };

    // TopicUpdateSourcesItem
    const topicUpdateSourcesItemModel = {
      id: sourceId,
      rules: [rulesModel],
    };

    const params = {
      instanceId,
      id: topicId,
      name: 'Updated Admin Topic Compliance',
      description: 'Updated Topic for FCM notifications',
      sources: [topicUpdateSourcesItemModel],
    };

    let res;
    try {
      res = await eventNotificationsService.replaceTopic(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-replace_topic
  });

  test('createDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDestination() result:');
    // begin-create_destination

    // FCM
    const destinationConfigParamsModel = {
      server_key: fcmServerKey,
      sender_id: fcmSenderId,
    };

    const destinationConfigModel = {
      params: destinationConfigParamsModel,
    };

    let params = {
      instanceId,
      name: 'FCM_destination',
      type: 'push_android',
      description: 'FCM Destination',
      config: destinationConfigModel,
    };

    let res;
    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    // webhook
    const webDestinationConfigParamsModel = {
      url: 'https://gcm.com',
      verb: 'get',
      custom_headers: { 'Authorization': 'aaa-r-t-fdsfs-55kfjsd-fsdfs' },
      sensitive_headers: ['Authorization'],
    };

    const webDestinationConfigModel = {
      params: webDestinationConfigParamsModel,
    };

    let name = 'GCM_destination';
    let description = 'GCM  Destination';
    let type = 'webhook';
    params = {
      instanceId,
      name,
      type,
      description,
      config: webDestinationConfigModel,
    };

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId3 = res.result.id;
    } catch (err) {
      console.warn(err);
    }
    // slack
    const destinationConfigModelSlack = {
      params: {
        url: 'https://api.slack.com/myslack',
      },
    };

    name = 'slack_destination';
    description = 'Slack Destination';
    type = 'slack';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModelSlack,
    };

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId4 = res.result.id;
    } catch (err) {
      console.warn(err);
    }
    // safari
    const destinationConfigModelSafari = {
      params: {
        cert_type: 'p12',
        password: 'safari',
        website_url: 'https://ensafaripush.mybluemix.net',
        website_name: 'NodeJS Starter Application',
        url_format_string: 'https://ensafaripush.mybluemix.net/%@/?flight=%@',
        website_push_id: 'web.net.mybluemix.ensafaripush',
      },
    };

    let readStream = '';
    try {
      readStream = fs.createReadStream(safariCertificatePath);
      console.log(readStream);
    } catch (err) {
      console.error(err);
    }

    description = 'Safari Destination';
    type = 'push_safari';
    const safariparams = {
      instanceId,
      name: 'safari_destination',
      type,
      description,
      config: destinationConfigModelSafari,
      certificate: readStream,
    };

    try {
      res = await eventNotificationsService.createDestination(safariparams);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId5 = res.result.id;
    } catch (err) {
      console.warn(err);
    }
    // MSTeams
    const destinationConfigModelMSTeams = {
      params: {
        url: 'https://teams.microsoft.com',
      },
    };

    name = 'MSTeams_destination';
    description = 'MSTeams Destination';
    type = 'msteams';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModelMSTeams,
    };
    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId6 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    // cloud functions
    const destinationConfigModelCloudFunctions = {
      params: {
        url: 'https://www.ibmcfendpoint.com/',
        api_key: '2323242342429hewihew',
      },
    };

    const cfname = 'CloudFunctions_destination';
    const cfdescription = 'Cloud Functions Destination';
    const cftype = 'ibmcf';
    const cfParams = {
      instanceId,
      name: cfname,
      type: cftype,
      description: cfdescription,
      config: destinationConfigModelCloudFunctions,
    };

    try {
      res = await eventNotificationsService.createDestination(cfParams);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId7 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    // chrome
    const destinationConfigModelChrome = {
      params: {
        website_url: 'https://cloud.ibm.com',
        api_key: 'efwewerwerkwer89werj',
        public_key: 'ksddkasjdaksd',
        pre_prod: false,
      },
    };

    name = 'Chrome_destination';
    description = 'Chrome Destination';
    type = 'push_chrome';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModelChrome,
    };

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId8 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    // Firefox
    const destinationConfigModelFirefox = {
      params: {
        website_url: 'https://cloud.ibm.com',
        public_key: 'ksddkasjdaksd',
        pre_prod: false,
      },
    };

    name = 'Firefox_destination';
    description = 'Firefox Destination';
    type = 'push_firefox';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModelFirefox,
    };

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId9 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    const destinationConfigModelPagerDuty = {
      params: {
        api_key: 'sdjnaskjdajsdnaksnd',
        routing_key: 'ksddkasjdaksd',
      },
    };

    name = 'PagerDuty_destination';
    description = 'Pager Duty Destination';
    type = 'pagerduty';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModelPagerDuty,
    };
    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId10 = res.result.id;
    } catch (err) {
      console.warn(err);
    }
    // end-create_destination
  });

  test('listDestinations request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listDestinations() result:');
    // begin-list_destinations

    let params = {
      instanceId,
    };

    let res;
    try {
      res = await eventNotificationsService.listDestinations(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_destinations
    let offset = 0;
    const limit = 1;
    let hasMore = true;
    const search = '';
    do {
      params = {
        instanceId,
        limit,
        offset,
        search,
      };

      res = await eventNotificationsService.listDestinations(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();

      const destination = res.result.destinations[0];
      if (destination.id !== destinationId && destination.type === 'smtp_ibm') {
        destinationId2 = destination.id;
        if (destinationId1 !== '') {
          break;
        }
      }
      if (destination.type === 'sms_ibm') {
        destinationId1 = destination.id;
        if (destinationId2 !== '') {
          break;
        }
      }
      offset += 1;
      if (res.result.total_count <= offset) {
        hasMore = false;
      }
    } while (hasMore);
  });

  test('getDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDestination() result:');
    // begin-get_destination

    const params = {
      instanceId,
      id: destinationId,
    };

    let res;
    try {
      res = await eventNotificationsService.getDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_destination
  });

  test('updateDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateDestination() result:');
    // begin-update_destination

    // DestinationConfigParamsWebhookDestinationConfig
    const destinationConfigParamsModel = {
      server_key: fcmServerKey,
      sender_id: fcmSenderId,
    };

    // FCM
    const destinationConfigModel = {
      params: destinationConfigParamsModel,
    };

    let params = {
      instanceId,
      id: destinationId,
      name: 'Admin FCM Compliance',
      description: 'This destination is for creating admin FCM to receive compliance notifications',
      config: destinationConfigModel,
    };

    let res;
    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // webhook
    const webDestinationConfigParamsModel = {
      url: 'https://cloud.ibm.com/nhwebhook/sendwebhook',
      verb: 'post',
      custom_headers: { authorization: 'xxx-tye67-yyy' },
      sensitive_headers: ['authorization'],
    };

    const webDestinationConfigModel = {
      params: webDestinationConfigParamsModel,
    };

    let name = 'Admin Webhook Compliance';
    let description =
      'This destination is for creating admin webhook to receive compliance notifications';

    params = {
      instanceId,
      id: destinationId3,
      name,
      description,
      config: webDestinationConfigModel,
    };

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // slack
    const destinationConfigModelSlack = {
      params: {
        url: 'https://api.slack.com/myslack',
      },
    };

    name = 'slack_destination_update';
    description = 'Slack Destination update';

    params = {
      instanceId,
      id: destinationId4,
      name,
      description,
      config: destinationConfigModelSlack,
    };
    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // safari
    const safariDestinationConfigModel = {
      params: {
        cert_type: 'p12',
        password: 'safari',
        website_url: 'https://ensafaripush.mybluemix.net',
        website_name: 'NodeJS Starter Application',
        url_format_string: 'https://ensafaripush.mybluemix.net/%@/?flight=%@',
        website_push_id: 'web.net.mybluemix.ensafaripush',
      },
    };

    description = 'This Destination is for safari';

    let readStream = '';
    try {
      readStream = fs.createReadStream(safariCertificatePath);
      console.log(readStream);
    } catch (err) {
      console.error(err);
    }

    params = {
      instanceId,
      id: destinationId5,
      name: 'safari_Dest',
      description,
      config: safariDestinationConfigModel,
      certificate: readStream,
    };

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // MSTeams
    const destinationConfigModelMSTeams = {
      params: {
        url: 'https://teams.microsoft.com',
      },
    };

    name = 'MSTeams_destination_update';
    description = 'MSTeams Destination_updated';

    params = {
      instanceId,
      id: destinationId6,
      name,
      description,
      config: destinationConfigModelMSTeams,
    };

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // cloud functions
    const destinationConfigModelCloudFunctions = {
      params: {
        url: 'https://us-south.functions.test.cloud.ibm.com/api/v1/namespaces/940dfa37-061a-46bd-9781-e584ed4bef18/actions/Action-CF',
        api_key: 'amZzYVDnBbTSu2Bx27dUG73QYXWz0SGyR_PQE8UoZCen',
      },
    };

    const cfname = 'Cloud Functions';
    const cfdescription = 'This destination is for cloud functions';

    const cfParams = {
      instanceId,
      id: destinationId7,
      name: cfname,
      description: cfdescription,
      config: destinationConfigModelCloudFunctions,
    };

    try {
      res = await eventNotificationsService.updateDestination(cfParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // chrome
    const destinationConfigModelChrome = {
      params: {
        website_url: 'https://cloud.ibm.com',
        api_key: 'efwewerwerkwer89werj',
        public_key: 'ksddkasjdaksd',
        pre_prod: false,
      },
    };

    name = 'Chrome_destination_update';
    description = 'Chrome Destination update';

    params = {
      instanceId,
      id: destinationId8,
      name,
      description,
      config: destinationConfigModelChrome,
    };

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // Firefox
    const destinationConfigModelFirefox = {
      params: {
        website_url: 'https://cloud.ibm.com',
        public_key: 'ksddkasjdaksd',
        pre_prod: false,
      },
    };

    name = 'Firefox_destination';
    description = 'Firefox Destination';

    params = {
      instanceId,
      id: destinationId9,
      name,
      description,
      config: destinationConfigModelFirefox,
    };
    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    const destinationConfigModelPagerDuty = {
      params: {
        api_key: 'asdsaasakjbdakjsdaksjda',
        routing_key: 'ksddkasjdaksdsdsf',
      },
    };

    name = 'Pager_Duty_destination';
    description = 'PagerDuty Destination';

    params = {
      instanceId,
      id: destinationId10,
      name,
      description,
      config: destinationConfigModelPagerDuty,
    };

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-update_destination
  });

  test('createSubscription request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createSubscription() result:');
    const subscriptionName = 'FCM subscription';
    const subscriptionDescription = 'Subscription for the FCM';
    // begin-create_subscription

    let params = {
      instanceId,
      name: subscriptionName,
      destinationId,
      topicId,
      description: subscriptionDescription,
    };

    let res;
    try {
      res = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
      subscriptionId = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    const subscriptionCreateAttributesModelSecond = {
      invited: ['tester1@gmail.com', 'tester3@ibm.com'],
      add_notification_payload: true,
      reply_to_mail: 'tester1@gmail.com',
      reply_to_name: 'US news',
      from_name: 'IBM',
    };

    let name = 'subscription_email';
    let description = 'Subscription for email';
    params = {
      instanceId,
      name,
      destinationId: destinationId2,
      topicId,
      attributes: subscriptionCreateAttributesModelSecond,
      description,
    };

    try {
      res = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
      subscriptionId2 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    const subscriptionCreateAttributesModelSMS = {
      invited: ['+12064563059', '+12267054625'],
    };

    name = 'subscription_sms';
    description = 'Subscription for sms';
    params = {
      instanceId,
      name,
      destinationId: destinationId1,
      topicId,
      attributes: subscriptionCreateAttributesModelSMS,
      description,
    };

    const resSMS = await eventNotificationsService.createSubscription(params);
    expect(resSMS).toBeDefined();
    expect(resSMS.status).toBe(201);
    expect(resSMS.result).toBeDefined();
    expect(resSMS.result.name).toBe(name);
    expect(resSMS.result.description).toBe(description);
    subscriptionId1 = resSMS.result.id;

    const subscriptionCreateAttributesModel = {
      signing_enabled: false,
    };

    name = 'subscription_web';
    description = 'Subscription for web';
    params = {
      instanceId,
      name,
      destinationId: destinationId3,
      topicId,
      attributes: subscriptionCreateAttributesModel,
      description,
    };

    try {
      res = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
      subscriptionId3 = res.result.id;
    } catch (err) {
      console.warn(err);
    }
    // end-create_subscription
  });

  test('listSubscriptions request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listSubscriptions() result:');
    // begin-list_subscriptions

    const params = {
      instanceId,
    };

    let res;
    try {
      res = await eventNotificationsService.listSubscriptions(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_subscriptions
  });

  test('getSubscription request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getSubscription() result:');
    // begin-get_subscription

    const params = {
      instanceId,
      id: subscriptionId,
    };

    let res;
    try {
      res = await eventNotificationsService.getSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_subscription
  });

  test('updateSubscription request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateSubscription() result:');
    const subscriptionName = 'Update_FCM_subscription';
    const subscriptionDescription = 'Update FCM subscription';
    // begin-update_subscription

    let params = {
      instanceId,
      id: subscriptionId,
      name: subscriptionName,
      description: subscriptionDescription,
    };

    let res;
    try {
      res = await eventNotificationsService.updateSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    const emailUpdateAttributesInvited = {
      add: ['tester4@ibm.com'],
    };

    const emailUpdateAttributesToRemove = {
      remove: ['tester3@ibm.com'],
    };

    const subscriptionUpdateAttributesModelSecond = {
      invited: emailUpdateAttributesInvited,
      add_notification_payload: true,
      reply_to_mail: 'tester1@gmail.com',
      reply_to_name: 'US news',
      from_name: 'IBM',
      subscribed: emailUpdateAttributesToRemove,
      unsubscribed: emailUpdateAttributesToRemove,
    };

    let name = 'subscription_email';
    let description = 'Subscription for email';
    params = {
      instanceId,
      name,
      id: subscriptionId2,
      attributes: subscriptionUpdateAttributesModelSecond,
      description,
    };

    try {
      res = await eventNotificationsService.updateSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // SMS
    const smsUpdateAttributesInvited = {
      add: ['+12064512559'],
    };

    const smsUpdateAttributesToRemove = {
      remove: ['+12064512559'],
    };

    const subscriptionUpdateAttributesModelSMS = {
      invited: smsUpdateAttributesInvited,
      subscribed: smsUpdateAttributesToRemove,
      unsubscribed: smsUpdateAttributesToRemove,
    };

    const nameSMS = 'subscription_sms_update';
    const descriptionSMS = 'Subscription for sms update';
    params = {
      instanceId,
      name: nameSMS,
      id: subscriptionId1,
      attributes: subscriptionUpdateAttributesModelSMS,
      description: descriptionSMS,
    };

    const resSMS = await eventNotificationsService.updateSubscription(params);
    expect(resSMS).toBeDefined();
    expect(resSMS.status).toBe(200);
    expect(resSMS.result).toBeDefined();
    expect(resSMS.result.name).toBe(nameSMS);
    expect(resSMS.result.description).toBe(descriptionSMS);

    // webhook
    const subscriptionUpdateAttributesModel = {
      signing_enabled: true,
    };

    name = 'webhook_sub_updated';
    description = 'Update webhook subscription';
    params = {
      instanceId,
      id: subscriptionId3,
      name,
      description,
      attributes: subscriptionUpdateAttributesModel,
    };

    try {
      res = await eventNotificationsService.updateSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_subscription
  });
  test('sendNotifications request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('sendNotifications() result:');

    const notificationID = '1234-1234-sdfs-234';
    const notificationSeverity = 'MEDIUM';
    const typeValue = 'com.acme.offer:new';
    const date = '2019-01-01T12:00:00.000Z';
    const userId = 'userId';
    const notificationsSouce = '1234-1234-sdfs-234:test';

    // begin-send_notifications

    // NotificationFCMDevices
    const notificationFcmDevicesModel = {
      user_ids: [userId],
    };

    const notificationApnsBodyModel = {
      aps: {
        alert: 'Game Request',
        badge: 5,
      },
    };

    const notificationFcmBodyModel = {
      notification: {
        title: 'Portugal vs. Denmark',
        badge: 'great match!',
      },
    };

    const apnsHeaders = {
      'apns-collapse-id': '123',
    };

    const notificationSafariBodymodel = {
      saf: {
        alert: 'Game Request',
        badge: 5,
      },
    };

    const notificationCreateModel = {
      instanceId,
      ibmenseverity: notificationSeverity,
      id: notificationID,
      source: notificationsSouce,
      ibmensourceid: sourceId,
      type: typeValue,
      time: date,
      ibmenpushto: JSON.stringify(notificationFcmDevicesModel),
      ibmenfcmbody: JSON.stringify(notificationFcmBodyModel),
      ibmenapnsbody: JSON.stringify(notificationApnsBodyModel),
      ibmensafaribody: JSON.stringify(notificationSafariBodymodel),
      ibmendefaultshort: 'testString',
      ibmendefaultlong: 'testString',
      specversion: '1.0',
    };

    const body = notificationCreateModel;
    const sendNotificationsParams = {
      instanceId,
      body,
    };

    let res;
    try {
      res = await eventNotificationsService.sendNotifications(sendNotificationsParams);
    } catch (err) {
      console.warn(err);
    }

    // end-send_notifications
  });

  test('deleteSubscription request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_subscription

    let params = {
      instanceId,
      id: subscriptionId,
    };

    try {
      await eventNotificationsService.deleteSubscription(params);
    } catch (err) {
      console.warn(err);
    }
    // end-delete_subscription
    const subscriptions = [subscriptionId1, subscriptionId2, subscriptionId3];

    for (let i = 0; i < subscriptions.length; i += 1) {
      params = {
        instanceId,
        id: subscriptions[i],
      };

      try {
        await eventNotificationsService.deleteSubscription(params);
      } catch (err) {
        console.warn(err);
      }
    }
  });

  test('deleteTopic request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_topic

    const params = {
      instanceId,
      id: topicId,
    };

    try {
      await eventNotificationsService.deleteTopic(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_topic
  });

  test('deleteDestination request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_destination

    let params = {
      instanceId,
      id: destinationId,
    };

    try {
      await eventNotificationsService.deleteDestination(params);
    } catch (err) {
      console.warn(err);
    }
    // end-delete_destination

    const destinations = [
      destinationId3,
      destinationId4,
      destinationId5,
      destinationId6,
      destinationId7,
      destinationId8,
      destinationId9,
      destinationId10,
    ];

    for (let i = 0; i < destinations.length; i += 1) {
      params = {
        instanceId,
        id: destinations[i],
      };

      try {
        await eventNotificationsService.deleteDestination(params);
      } catch (err) {
        console.warn(err);
      }
    }
  });

  test('deleteSource request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_source

    const params = {
      instanceId,
      id: sourceId,
    };

    try {
      await eventNotificationsService.deleteSource(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_source
  });
});
