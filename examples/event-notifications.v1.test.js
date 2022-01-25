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
let destinationDeviceID = '';
let	fcmServerKey = '';
let	fcmSenderId = '';

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
  fcmSenderId = config.fcmId
  fcmServerKey = config.fcmKey

  var eventNotificationsService = EventNotificationsV1.newInstance({});

  test('Initialize services', async () => {
  // begin-common

    eventNotificationsService = EventNotificationsV1.newInstance({});

  // end-common
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
      sourceId = res.result.sources[0].id;
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
      event_type_filter: "$.*",
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

  test('createDestinationDevices request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createDestinationDevices() result:');
    let deviceId = "9bb4b029-a684-4a2e-baf5-19275e4002fd"
		let deviceToken = "9bb4b029-a684-4a2e-baf5-19275e4002fd"
		let userId = "example_user"

    // begin-create_destination_devices

    const params = {
      instanceId: instanceId,
      id: destinationId,
      deviceId: deviceId,
      token: deviceToken,
      platform: 'G',
      userId: userId,
    };

    let res;
    try {
      res = await eventNotificationsService.createDestinationDevices(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationDeviceID = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    // end-create_destination_devices
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
      instanceId: instanceId,
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
      instanceId: instanceId,
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

  test('getDestinationDevice request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getDestinationDevice() result:');
    // begin-get_destination_device

    const params = {
      instanceId: instanceId,
      id: destinationId,
      deviceId: destinationDeviceID,
    };

    let res;
    try {
      res = await eventNotificationsService.getDestinationDevice(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-get_destination_device
  });

  test('updateDestinationDevices request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateDestinationDevices() result:');
    let newDeviceToken = "9bb4b029-a684-4a2e-baf5-19275e4002fd-fds"
		let newUserId = "new_userId"

    // begin-update_destination_devices

    const params = {
      instanceId: instanceId,
      id: destinationId,
      deviceId: destinationDeviceID,
      newToken: newDeviceToken,
      newPlatform: 'G',
      newUserId: newUserId,
    };

    let res;
    try {
      res = await eventNotificationsService.updateDestinationDevices(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-update_destination_devices
  });

  test('createTagsSubscription request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createTagsSubscription() result:');
    let tagName = "IBM_test"

    // begin-create_tags_subscription

    const params = {
      instanceId: instanceId,
      id: destinationId,
      deviceId: destinationDeviceID,
      tagName: tagName,
    };

    let res;
    try {
      res = await eventNotificationsService.createTagsSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-create_tags_subscription
  });

  test('listTagsSubscription request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listTagsSubscription() result:');
    // begin-list_tags_subscription

    const params = {
      instanceId: instanceId,
      id: destinationId,
    };

    let res;
    try {
      res = await eventNotificationsService.listTagsSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_tags_subscription
  });

  test('listTagsSubscriptionsDevice request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listTagsSubscriptionsDevice() result:');
    // begin-list_tags_subscriptions_device

    const params = {
      instanceId: instanceId,
      id: destinationId,
      deviceId: destinationDeviceID,
    };

    let res;
    try {
      res = await eventNotificationsService.listTagsSubscriptionsDevice(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // end-list_tags_subscriptions_device
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
    let subscriptionName = "FCM subscription"
    let subscriptionDescription = "Subscription for the FCM"
    // begin-create_subscription

    const params = {
      instanceId: instanceId,
      name: subscriptionName,
      destinationId: destinationId,
      topicId: topicId,
      description: subscriptionDescription,
    };

    let res;
    try {
      res = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
      subscriptionId = res.result.id
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
      instanceId: instanceId,
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
      instanceId: instanceId,
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
    let subscriptionName = "Update_FCM_subscription"
    let subscriptionDescription = "Update FCM subscription"
    // begin-update_subscription

    const params = {
      instanceId: instanceId,
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

    let notificationID = "1234-1234-sdfs-234"
		let notificationSubject = "FCM_Subject"
		let notificationSeverity = "MEDIUM"
		let typeValue = "com.acme.offer:new"
		let date = "2019-01-01T12:00:00.000Z"
		let userId = "userId"
		let alertMessage = "Message"
		let notificationsSouce = "1234-1234-sdfs-234:test"


    // begin-send_notifications

    // NotificationFCMDevices
    const notificationFcmDevicesModel = {
      user_ids: [userId],
    };
    // NotificationFCMBodyMessageData
    const notificationFcmBodyMessageDataModel = {
      alert: 'testString',
      delay_while_idle: true,
      time_to_live: 100,
    };

    // NotificationFCMBodyMessage
    const notificationFcmBodyMessageModel = {
      data: notificationFcmBodyMessageDataModel,
    };

    // NotificationFCMBody
    const notificationFcmBodyModel = {
      message: notificationFcmBodyMessageModel,
    };

    const params = {
      instanceId: instanceId,
      subject: notificationSubject,
      severity: notificationSeverity,
      id: notificationID,
      source: notificationsSouce,
      enSourceId: sourceId,
      type: typeValue,
      time: date,
      pushTo: notificationFcmDevicesModel,
      messageFcmBody: notificationFcmBodyModel,
    };

    let res;
    try {
      res = await eventNotificationsService.sendNotifications(params);
      console.log(JSON.stringify(res.result, null, 2));
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
      instanceId: instanceId,
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
      instanceId: instanceId,
      id: topicId,
    };

    try {
      await eventNotificationsService.deleteTopic(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_topic
  });

  test('deleteTagsSubscription request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    let tagName = "IBM_test"

    // begin-delete_tags_subscription

    const params = {
      instanceId: instanceId,
      id: destinationId,
      deviceId: destinationDeviceID,
      tagName: tagName
    };

    try {
      await eventNotificationsService.deleteTagsSubscription(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_tags_subscription
  });

  test('deleteDestinationDevices request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    // begin-delete_destination_devices

    const params = {
      instanceId: instanceId,
      id: destinationId,
      deviceId: destinationDeviceID,
    };

    try {
      await eventNotificationsService.deleteDestinationDevices(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_destination_devices
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
      instanceId: instanceId,
      id: destinationId,
    };

    try {
      await eventNotificationsService.deleteDestination(params);
    } catch (err) {
      console.warn(err);
    }

    // end-delete_destination
  });
});
