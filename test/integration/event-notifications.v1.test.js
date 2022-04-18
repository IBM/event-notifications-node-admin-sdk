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
const EventNotificationsV1 = require('../../dist/event-notifications/v1');

const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = `${__dirname}/../../event_notifications_v1.env`;

const describe = authHelper.prepareTests(configFile);

// EN test configuration values
let instanceId = '';
const topicName = 'WebhookTopic';
let sourceId = '';
let topicId = '';
let topicId2 = '';
let topicId3 = '';
let destinationId = '';
let destinationId2 = '';
let destinationId3 = '';
let subscriptionId = '';
let subscriptionId2 = '';
let subscriptionId3 = '';
let fcmServerKey = '';
let fcmSenderId = '';

describe('EventNotificationsV1_integration', () => {
  jest.setTimeout(timeout);

  let eventNotificationsService = EventNotificationsV1.newInstance({});

  test('Initialise service', async () => {
    eventNotificationsService = EventNotificationsV1.newInstance({});

    expect(eventNotificationsService).not.toBeNull();

    const config = readExternalSources(EventNotificationsV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    instanceId = config.guid;
    fcmSenderId = config.fcmId;
    fcmServerKey = config.fcmKey;

    eventNotificationsService.enableRetries();
  });
  test('createSources()', async () => {
    const params = {
      instanceId,
      name: 'Event Notification Create Source Acme',
      description: 'This source is used for Acme Bank',
      enabled: false,
    };

    const res = await eventNotificationsService.createSources(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();

    sourceId = res.result.id;

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 404
    // 409
    // 415
    // 500
    //
  });
  test('listSources()', async () => {
    let offset = 0;
    const limit = 1;
    let hasMore = true;
    const search = '';
    do {
      const params = {
        instanceId,
        limit,
        offset,
        search,
      };

      const res = await eventNotificationsService.listSources(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
      offset += 1;
      if (res.result.total_count <= offset) {
        hasMore = false;
      }
    } while (hasMore);

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 500
    //
  });
  test('getSource()', async () => {
    const params = {
      instanceId,
      id: sourceId,
    };

    const res = await eventNotificationsService.getSource(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 404
    // 500
    //
  });
  test('updateSource()', async () => {
    const params = {
      instanceId,
      id: sourceId,
      name: 'Event Notification update Source Acme',
      description: 'This source is used for updated Acme Bank',
      enabled: true,
    };

    const res = await eventNotificationsService.updateSource(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 404
    // 409
    // 415
    // 500
    //
  });
  test('createTopic()', async () => {
    // Request models needed by this operation.

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

    let description = 'Topic for Webhook notifications';
    const params = {
      instanceId,
      name: topicName,
      description,
      sources: [topicUpdateSourcesItemModel],
    };

    const res = await eventNotificationsService.createTopic(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    expect(res.result.name).toBe(topicName);
    expect(res.result.description).toBe(description);
    topicId = res.result.id;

    // Second topic
    description = 'Topic 2 for GCM notifications';
    let name = `${topicName}_2`;

    let paramsSecond = {
      instanceId,
      name,
      description,
      sources: [topicUpdateSourcesItemModel],
    };

    const resSecond = await eventNotificationsService.createTopic(paramsSecond);
    expect(resSecond).toBeDefined();
    expect(resSecond.status).toBe(201);
    expect(resSecond.result).toBeDefined();
    expect(resSecond.result.name).toBe(name);
    expect(resSecond.result.description).toBe(description);
    topicId2 = resSecond.result.id;

    // third topic
    description =
      'This topic is used for routing all compliance related notifications to the appropriate destinations';
    name = `FCM_topic`;

    paramsSecond = {
      instanceId,
      name,
      description,
      sources: [topicUpdateSourcesItemModel],
    };

    const resThird = await eventNotificationsService.createTopic(paramsSecond);
    expect(resThird).toBeDefined();
    expect(resThird.status).toBe(201);
    expect(resThird.result).toBeDefined();
    expect(resThird.result.name).toBe(name);
    expect(resThird.result.description).toBe(description);
    topicId3 = resThird.result.id;

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 404
    // 409
    // 415
    // 500
    //
  });
  test('listTopics()', async () => {
    let offset = 0;
    const limit = 1;
    let hasMore = true;
    const search = '';
    do {
      const params = {
        instanceId,
        limit,
        offset,
        search,
      };

      const res = await eventNotificationsService.listTopics(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
      offset += 1;
      if (res.result.total_count <= offset) {
        hasMore = false;
      }
    } while (hasMore);

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 500
    //
  });
  test('getTopic()', async () => {
    const params = {
      instanceId,
      id: topicId,
    };

    const res = await eventNotificationsService.getTopic(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 404
    // 500
    //
  });
  test('replaceTopic()', async () => {
    // Request models needed by this operation.

    // Rules
    const rulesModel = {
      enabled: true,
      event_type_filter: "$.notification_event_info.event_type == 'cert_manager'",
      notification_filter: "$.notification.findings[0].severity == 'MODERATE'",
    };

    // TopicUpdateSourcesItem
    const topicUpdateSourcesItemModel = {
      id: sourceId,
      rules: [rulesModel],
    };

    const description = 'Updated Topic for GCM notifications';
    const name = 'Updated Admin Topic Compliance';
    const params = {
      instanceId,
      id: topicId,
      name,
      description,
      sources: [topicUpdateSourcesItemModel],
    };

    const res = await eventNotificationsService.replaceTopic(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.id).toBe(topicId);
    expect(res.result.name).toBe(name);
    expect(res.result.description).toBe(description);

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 404
    // 409
    // 415
    // 500
    //
  });
  test('createDestination()', async () => {
    // Request models needed by this operation.

    // DestinationConfigParamsWebhookDestinationConfig
    const destinationConfigParamsModel = {
      url: 'https://gcm.com',
      verb: 'get',
      custom_headers: { 'Authorization': 'aaa-r-t-fdsfs-55kfjsd-fsdfs' },
      sensitive_headers: ['Authorization'],
    };

    // DestinationConfig
    const destinationConfigModel = {
      params: destinationConfigParamsModel,
    };

    let name = 'GCM_destination';
    let description = 'GCM  Destination';
    let type = 'webhook';
    let params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModel,
    };

    const res = await eventNotificationsService.createDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();

    expect(res.result.type).toBe(type);
    expect(res.result.name).toBe(name);
    expect(res.result.description).toBe(description);
    destinationId = res.result.id;

    // second destination

    const destinationConfigParamsModelFCM = {
      server_key: fcmServerKey,
      sender_id: fcmSenderId,
    };

    // DestinationConfig
    const destinationConfigModelFCM = {
      params: destinationConfigParamsModelFCM,
    };

    name = 'FCM_destination';
    description = 'FCM Destination';
    type = 'push_android';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModelFCM,
    };

    const resNew = await eventNotificationsService.createDestination(params);
    expect(resNew).toBeDefined();
    expect(resNew.status).toBe(201);
    expect(resNew.result).toBeDefined();

    expect(resNew.result.type).toBe(type);
    expect(resNew.result.name).toBe(name);
    expect(resNew.result.description).toBe(description);
    destinationId3 = resNew.result.id;

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 409
    // 415
    // 500
    //
  });
  test('listDestinations()', async () => {
    let offset = 0;
    const limit = 1;
    let hasMore = true;
    const search = '';
    do {
      const params = {
        instanceId,
        limit,
        offset,
        search,
      };

      const res = await eventNotificationsService.listDestinations(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();

      const destination = res.result.destinations[0];
      if (destination.id !== destinationId && destination.type === 'smtp_ibm') {
        destinationId2 = destination.id;
      }
      offset += 1;
      if (res.result.total_count <= offset) {
        hasMore = false;
      }
    } while (hasMore);

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 500
    //
  });
  test('getDestination()', async () => {
    const params = {
      instanceId,
      id: destinationId,
    };

    const res = await eventNotificationsService.getDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 404
    // 500
    //
  });
  test('updateDestination()', async () => {
    // Request models needed by this operation.

    // DestinationConfigParamsWebhookDestinationConfig
    const destinationConfigParamsModel = {
      url: 'https://cloud.ibm.com/nhwebhook/sendwebhook',
      verb: 'post',
      custom_headers: { authorization: 'xxx-tye67-yyy' },
      sensitive_headers: ['authorization'],
    };

    // DestinationConfig
    const destinationConfigModel = {
      params: destinationConfigParamsModel,
    };

    const name = 'Admin Webhook Compliance';
    const description =
      'This destination is for creating admin webhook to receive compliance notifications';

    const params = {
      instanceId,
      id: destinationId,
      name,
      description,
      config: destinationConfigModel,
    };

    const res = await eventNotificationsService.updateDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.name).toBe(name);
    expect(res.result.description).toBe(description);

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 404
    // 409
    // 415
    // 500
    //
  });
  test('listDestinationDevices()', async () => {
    const params = {
      instanceId,
      id: destinationId3,
      limit: 1,
      offset: 0,
      search: '',
    };

    const res = await eventNotificationsService.listDestinationDevices(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 404
    // 500
    //
  });
  test('getDestinationDevicesReport()', async () => {
    const params = {
      instanceId,
      id: destinationId3,
      days: 1,
    };

    const res = await eventNotificationsService.getDestinationDevicesReport(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 404
    // 500
    //
  });

  test('createSubscription()', async () => {
    // Request models needed by this operation.

    const subscriptionCreateAttributesModel = {
      signing_enabled: false,
    };

    const name = 'subscription_web';
    const description = 'Subscription for web';
    const params = {
      instanceId,
      name,
      destinationId,
      topicId,
      attributes: subscriptionCreateAttributesModel,
      description,
    };

    const res = await eventNotificationsService.createSubscription(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    expect(res.result.name).toBe(name);
    expect(res.result.description).toBe(description);
    subscriptionId = res.result.id;

    // second subscription
    const subscriptionCreateAttributesModelSecond = {
      to: ['tester1@gmail.com', 'tester3@ibm.com'],
      add_notification_payload: true,
      reply_to_mail: 'tester1@gmail.com',
      reply_to_name: 'US news',
      from_name: 'IBM',
    };

    let nameSecond = 'subscription_email';
    let descriptionSecond = 'Subscription for email';
    let paramsSecond = {
      instanceId,
      name: nameSecond,
      destinationId: destinationId2,
      topicId,
      attributes: subscriptionCreateAttributesModelSecond,
      description: descriptionSecond,
    };

    const resSecond = await eventNotificationsService.createSubscription(paramsSecond);
    expect(resSecond).toBeDefined();
    expect(resSecond.status).toBe(201);
    expect(resSecond.result).toBeDefined();
    expect(resSecond.result.name).toBe(nameSecond);
    expect(resSecond.result.description).toBe(descriptionSecond);
    subscriptionId2 = resSecond.result.id;

    nameSecond = 'FCM subscription';
    descriptionSecond = 'Subscription for the FCM';
    paramsSecond = {
      instanceId,
      name: nameSecond,
      destinationId: destinationId3,
      topicId: topicId3,
      description: descriptionSecond,
    };

    const resThird = await eventNotificationsService.createSubscription(paramsSecond);
    expect(resThird).toBeDefined();
    expect(resThird.status).toBe(201);
    expect(resThird.result).toBeDefined();
    expect(resThird.result.name).toBe(nameSecond);
    expect(resThird.result.description).toBe(descriptionSecond);
    subscriptionId3 = resThird.result.id;

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 404
    // 409
    // 415
    // 500
    //
  });
  test('listSubscriptions()', async () => {
    let offset = 0;
    const limit = 1;
    let hasMore = true;
    const search = '';
    do {
      const params = {
        instanceId,
        limit,
        offset,
        search,
      };

      const res = await eventNotificationsService.listSubscriptions(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
      offset += 1;
      if (res.result.total_count <= offset) {
        hasMore = false;
      }
    } while (hasMore);

    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 500
    //
  });
  test('getSubscription()', async () => {
    const params = {
      instanceId,
      id: subscriptionId,
    };

    const res = await eventNotificationsService.getSubscription(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 404
    // 500
    //
  });
  test('updateSubscription()', async () => {
    // Request models needed by this operation.

    // SubscriptionUpdateAttributesSMSAttributes
    const subscriptionUpdateAttributesModel = {
      signing_enabled: true,
    };

    const name = 'GCM_sub_updated';
    const description = 'Update GCM subscription';
    const params = {
      instanceId,
      id: subscriptionId,
      name,
      description,
      attributes: subscriptionUpdateAttributesModel,
    };

    const res = await eventNotificationsService.updateSubscription(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.name).toBe(name);
    expect(res.result.description).toBe(description);

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 404
    // 409
    // 415
    // 500
    //
  });

  test('sendNotifications()', async () => {
    // Request models needed by this operation.

    // NotificationFCMDevices
    const notificationFcmDevicesModel = {
      user_ids: ['userId'],
    };

    // Lights
    const lightsModel = {
      led_argb: 'RED',
      led_on_ms: 0,
      led_off_ms: '20',
    };

    // Style
    const styleModel = {
      type: 'picture_notification',
      title: 'hello',
      url: 'url.ibm.com',
    };

    // NotificationFCMBodyMessageData
    const notificationFcmBodyMessageDataModel = {
      alert: 'Alert message',
      collapse_key: 'collapse_key',
      interactive_category: 'category_test',
      icon: 'test.png',
      delay_while_idle: true,
      sync: true,
      visibility: '0',
      redact: 'redact test alert',
      payload: { 'item': 'test message' },
      priority: 'MIN',
      sound: 'newSound',
      time_to_live: 0,
      lights: lightsModel,
      android_title: 'IBM test title',
      group_id: 'Group_ID_1',
      style: styleModel,
      type: 'DEFAULT',
    };

    // notificationFcmBodyModel
    const notificationFcmBodyModel = {
      en_data: notificationFcmBodyMessageDataModel,
    };

    const notificationApnsBodyMessageDataModel = {
      alert: 'testString',
      badge: 38,
      interactiveCategory: 'testString',
      iosActionKey: 'testString',
      payload: { foo: 'bar' },
      sound: 'testString',
      titleLocKey: 'testString',
      locKey: 'testString',
      launchImage: 'testString',
      titleLocArgs: ['testString'],
      locArgs: ['testString'],
      title: 'testString',
      subtitle: 'testString',
      attachmentUrl: 'testString',
      type: 'DEFAULT',
      apnsCollapseId: 'testString',
      apnsThreadId: 'testString',
      apnsGroupSummaryArg: 'testString',
      apnsGroupSummaryArgCount: 38,
    };

    // NotificationAPNSBodyMessageENData
    const notificationApnsBodyModel = {
      en_data: notificationApnsBodyMessageDataModel,
    };

    const notificationID = '1234-1234-sdfs-234';
    const notificationSubject = 'FCM_Subject';
    const notificationSeverity = 'MEDIUM';
    const typeValue = 'com.acme.offer:new';
    const notificationsSouce = '1234-1234-sdfs-234:test';

    const params = {
      instanceId,
      ceIbmenseverity: notificationSeverity,
      ceId: notificationID,
      ceSource: notificationsSouce,
      ceIbmensourceid: sourceId,
      ceType: typeValue,
      ceTime: '2019-01-01T12:00:00.000Z',
      ceIbmenpushto: notificationFcmDevicesModel,
      ceIbmenfcmbody: notificationFcmBodyModel,
      ceIbmenapnsbody: notificationApnsBodyModel,
      ceIbmenapnsheaders: { 'key1': 'testString' },
      ceSpecversion: '1.0',
    };

    const res = await eventNotificationsService.sendNotifications(params);

    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();

    const apnsOptions = {
      aps: {
        alert: 'Game Request',
        badge: 5,
      },
    };

    const fcmOptions = {
      notification: {
        title: 'Portugal vs. Denmark',
        badge: 'great match!',
      },
    };

    const apnsHeaders = {
      'apns-collapse-id': '123',
    };

    const newParams = {
      instanceId,
      ceIbmenseverity: notificationSeverity,
      ceId: notificationID,
      ceSource: notificationsSouce,
      ceIbmensourceid: sourceId,
      ceType: typeValue,
      ceTime: '2019-01-01T12:00:00.000Z',
      ceIbmenpushto: notificationFcmDevicesModel,
      ceIbmenfcmbody: fcmOptions,
      ceIbmenapnsbody: apnsOptions,
      ceIbmenapnsheaders: apnsHeaders,
      ceSpecversion: '1.0',
    };

    const rewRes = await eventNotificationsService.sendNotifications(newParams);
    expect(rewRes).toBeDefined();
    expect(rewRes.status).toBe(202);
    expect(rewRes.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 400
    // 401
    // 415
    // 500
    //
  });
  test('deleteSubscription()', async () => {
    let params = {
      instanceId,
      id: subscriptionId,
    };

    let res = await eventNotificationsService.deleteSubscription(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();

    params = {
      instanceId,
      id: subscriptionId2,
    };

    res = await eventNotificationsService.deleteSubscription(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();

    params = {
      instanceId,
      id: subscriptionId3,
    };

    res = await eventNotificationsService.deleteSubscription(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 404
    // 500
    //
  });
  test('deleteTopic()', async () => {
    let params = {
      instanceId,
      id: topicId,
    };

    let res = await eventNotificationsService.deleteTopic(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();

    params = {
      instanceId,
      id: topicId2,
    };

    res = await eventNotificationsService.deleteTopic(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();

    params = {
      instanceId,
      id: topicId3,
    };

    res = await eventNotificationsService.deleteTopic(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 404
    // 500
    //
  });
  test('deleteDestination()', async () => {
    let params = {
      instanceId,
      id: destinationId,
    };

    let res = await eventNotificationsService.deleteDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();

    params = {
      instanceId,
      id: destinationId3,
    };

    res = await eventNotificationsService.deleteDestination(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 404
    // 500
    //
  });
  test('deleteSource()', async () => {
    const params = {
      instanceId,
      id: sourceId,
    };

    const res = await eventNotificationsService.deleteSource(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(204);
    expect(res.result).toBeDefined();

    //
    // The following status codes aren't covered by tests.
    // Please provide integration tests for these too.
    //
    // 401
    // 404
    // 500
    //
  });
});
