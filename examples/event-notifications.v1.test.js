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
let subscriptionId = '';
let fcmServerKey = '';
let fcmSenderId = '';

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

    // DestinationConfigParamsWebhookDestinationConfig
    const destinationConfigParamsModel = {
      server_key: fcmServerKey,
      sender_id: fcmSenderId,
    };

    // DestinationConfig
    const destinationConfigModel = {
      params: destinationConfigParamsModel,
    };

    const params = {
      instanceId,
      name: 'GCM_destination',
      type: 'push_android',
      description: 'GCM Destination',
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

    const params = {
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

    // DestinationConfig
    const destinationConfigModel = {
      params: destinationConfigParamsModel,
    };

    const params = {
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

    // end-update_destination
  });

  test('listDestinationDevices request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listDestinationDevices() result:');
    // begin-list_destination_devices

    const params = {
      instanceId,
      id: destinationId,
    };

    let res;
    try {
      res = await eventNotificationsService.listDestinationDevices(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_destination_devices
  });

  test('getDestinationDevicesReport request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDestinationDevicesReport() result:');
    // begin-get_destination_devices_report

    const params = {
      instanceId,
      id: destinationId,
    };

    let res;
    try {
      res = await eventNotificationsService.getDestinationDevicesReport(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_destination_devices_report
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

    const params = {
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

    const params = {
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

    const params = {
      instanceId,
      ceIbmenseverity: notificationSeverity,
      ceId: notificationID,
      ceSource: notificationsSouce,
      ceIbmensourceid: sourceId,
      ceType: typeValue,
      ceTime: date,
      ceIbmenpushto: JSON.stringify(notificationFcmDevicesModel),
      ceIbmenfcmbody: JSON.stringify(notificationFcmBodyModel),
      ceIbmenapnsbody: JSON.stringify(notificationApnsBodyModel),
      ceIbmenapnsheaders: JSON.stringify(apnsHeaders),
      ceSpecversion: '1.0',
    };

    let res;
    try {
      res = await eventNotificationsService.sendNotifications(params);
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

    const params = {
      instanceId,
      id: subscriptionId,
    };

    try {
      await eventNotificationsService.deleteSubscription(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_subscription
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

    const params = {
      instanceId,
      id: destinationId,
    };

    try {
      await eventNotificationsService.deleteDestination(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_destination
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
