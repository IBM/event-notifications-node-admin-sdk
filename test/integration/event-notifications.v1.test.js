/**
 * (C) Copyright IBM Corp. 2021.
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
const configFile = `${__dirname}/../../event_notifications.env`;

const describe = authHelper.prepareTests(configFile);

// EN test configuration values
let instanceId = '';
const topicName = 'Admin Topic Compliance';
let sourceId = '';
let topicId = '';
let topicId2 = '';
let destinationId = '';
let destinationId2 = '';
let subscriptionId = '';
let destinationIDSMS = '';
let subscriptionIDSMS = '';
let subscriptionId2 = '';

describe('EventNotificationsV1_integration', () => {
  jest.setTimeout(timeout);

  let eventNotificationsService;

  test('Initialise service', async () => {
    eventNotificationsService = EventNotificationsV1.newInstance({});

    expect(eventNotificationsService).not.toBeNull();

    const config = readExternalSources(EventNotificationsV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
    instanceId = config.guid;

    eventNotificationsService.enableRetries();
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

      if (sourceId === '') {
        sourceId = res.result.sources[0].id;
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

    let description =
      'This topic is used for routing all compliance related notifications to the appropriate destinations';
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
    const name = `${topicName}_2`;

    const paramsSecond = {
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

    const name = 'GCM_destination';
    const description = 'GCM  Destination';
    const type = 'webhook';
    const params = {
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
      } else if (destination.id !== destinationId && destination.type === 'sms_ibm') {
        destinationIDSMS = destination.id;
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
    let subscriptionCreateAttributesModelSecond = {
      to: ['tester1@gmail.com', 'tester3@ibm.com'],
      add_notification_payload: true,
      reply_to_mail: 'tester1@gmail.com',
      reply_to_name: 'US news',
      from_name: 'IBM',
    };

    let nameSecond = 'subscription_web_2';
    let descriptionSecond = 'Subscription 2 for web';
    let paramsSecond = {
      instanceId,
      name: nameSecond,
      destinationId: destinationId2,
      topicId,
      attributes: subscriptionCreateAttributesModelSecond,
      description: descriptionSecond,
    };

    let resSecond = await eventNotificationsService.createSubscription(paramsSecond);
    expect(resSecond).toBeDefined();
    expect(resSecond.status).toBe(201);
    expect(resSecond.result).toBeDefined();
    expect(resSecond.result.name).toBe(nameSecond);
    expect(resSecond.result.description).toBe(descriptionSecond);
    subscriptionId2 = resSecond.result.id;

    // third subscription
    subscriptionCreateAttributesModelSecond = {
      to: ['+12048089972', '+12014222730'],
    };

    nameSecond = 'subscription_sms';
    descriptionSecond = 'Subscription for sms';
    paramsSecond = {
      instanceId,
      name: nameSecond,
      destinationId: destinationIDSMS,
      topicId,
      attributes: subscriptionCreateAttributesModelSecond,
      description: descriptionSecond,
    };

    resSecond = await eventNotificationsService.createSubscription(paramsSecond);
    expect(resSecond).toBeDefined();
    expect(resSecond.status).toBe(201);
    expect(resSecond.result).toBeDefined();
    expect(resSecond.result.name).toBe(nameSecond);
    expect(resSecond.result.description).toBe(descriptionSecond);
    subscriptionIDSMS = resSecond.result.id;

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

    //
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

    let subscriptionUpdateAttributesModel = {
      signing_enabled: true,
    };

    let name = 'GCM_sub_updated';
    let description = 'Update GCM subscription';
    let params = {
      instanceId,
      id: subscriptionId,
      name,
      description,
      attributes: subscriptionUpdateAttributesModel,
    };

    let res = await eventNotificationsService.updateSubscription(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.name).toBe(name);
    expect(res.result.description).toBe(description);

    // update email
    subscriptionUpdateAttributesModel = {
      to: {
        add: ['testereq1@gmail.com', 'tester553@ibm.com'],
        remove: ['tester1@gmail.com'],
      },
      add_notification_payload: true,
      reply_to_mail: 'tester1@gmail.com',
      reply_to_name: 'US news',
      from_name: 'IBM',
      unsubscribed: {
        remove: ['tester3@ibm.com'],
      },
    };

    name = 'subscription_email_3';
    description = 'Update email subscription';
    params = {
      instanceId,
      id: subscriptionId2,
      name,
      description,
      attributes: subscriptionUpdateAttributesModel,
    };

    res = await eventNotificationsService.updateSubscription(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.name).toBe(name);
    expect(res.result.description).toBe(description);

    // update sms
    subscriptionUpdateAttributesModel = {
      to: ['+120480009972', '+1201499990'],
    };

    name = 'subscription_sms+1';
    description = 'update Subscription for sms';
    params = {
      instanceId,
      id: subscriptionIDSMS,
      name,
      description,
      attributes: subscriptionUpdateAttributesModel,
    };

    res = await eventNotificationsService.updateSubscription(params);
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
      id: subscriptionIDSMS,
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
    const params = {
      instanceId,
      id: destinationId,
    };

    const res = await eventNotificationsService.deleteDestination(params);
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
