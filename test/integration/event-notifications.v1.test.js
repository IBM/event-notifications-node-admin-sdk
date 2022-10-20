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
let destinationId4 = '';
let destinationId5 = '';
let destinationId6 = '';
let destinationId7 = '';
let destinationId8 = '';
let destinationId9 = '';

let subscriptionId = '';
let subscriptionId2 = '';
let subscriptionId3 = '';
let subscriptionId4 = '';
let subscriptionId5 = '';
let subscriptionId6 = '';
let subscriptionId7 = '';
let subscriptionId8 = '';
let subscriptionId9 = '';
let fcmServerKey = '';
let fcmSenderId = '';
let safariCertificatePath = '';

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
    safariCertificatePath = config.safariCertificate;

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

    // FCM

    const destinationConfigParamsModelFCM = {
      server_key: fcmServerKey,
      sender_id: fcmSenderId,
    };

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

    const resslack = await eventNotificationsService.createDestination(params);
    expect(resslack).toBeDefined();
    expect(resslack.status).toBe(201);
    expect(resslack.result).toBeDefined();

    expect(resslack.result.type).toBe(type);
    expect(resslack.result.name).toBe(name);
    expect(resslack.result.description).toBe(description);
    destinationId4 = resslack.result.id;

    // Safari
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

    name = 'safari_destination';
    description = 'Safari Destination';
    type = 'push_safari';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModelSafari,
      certificate: readStream,
    };

    const ressafari = await eventNotificationsService.createDestination(params);
    expect(ressafari).toBeDefined();
    expect(ressafari.status).toBe(201);
    expect(ressafari.result).toBeDefined();

    expect(ressafari.result.type).toBe(type);
    expect(ressafari.result.name).toBe(name);
    expect(ressafari.result.description).toBe(description);
    destinationId5 = ressafari.result.id;

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

    const resmsteams = await eventNotificationsService.createDestination(params);
    expect(resmsteams).toBeDefined();
    expect(resmsteams.status).toBe(201);
    expect(resmsteams.result).toBeDefined();

    expect(resmsteams.result.type).toBe(type);
    expect(resmsteams.result.name).toBe(name);
    expect(resmsteams.result.description).toBe(description);
    destinationId6 = resmsteams.result.id;

    const destinationConfigModelCloudFunctions = {
      params: {
        url: 'https://www.ibmcfendpoint.com/',
        api_key: 'efwewerwerkwer89werj',
      },
    };

    name = 'CloudFunctions_destination';
    description = 'Cloud Functions Destination';
    type = 'ibmcf';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModelCloudFunctions,
    };

    const rescloudfunctions = await eventNotificationsService.createDestination(params);
    expect(rescloudfunctions).toBeDefined();
    expect(rescloudfunctions.status).toBe(201);
    expect(rescloudfunctions.result).toBeDefined();

    expect(rescloudfunctions.result.type).toBe(type);
    expect(rescloudfunctions.result.name).toBe(name);
    expect(rescloudfunctions.result.description).toBe(description);
    destinationId7 = rescloudfunctions.result.id;

    // chrome
    const destinationConfigModelChrome = {
      params: {
        website_url: 'https://cloud.ibm.com',
        api_key: 'efwewerwerkwer89werj',
        public_key: 'ksddkasjdaksd',
        preProd: false,
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

    const resChrome = await eventNotificationsService.createDestination(params);
    expect(resChrome).toBeDefined();
    expect(resChrome.status).toBe(201);
    expect(resChrome.result).toBeDefined();

    expect(resChrome.result.type).toBe(type);
    expect(resChrome.result.name).toBe(name);
    expect(resChrome.result.description).toBe(description);
    destinationId8 = resChrome.result.id;

    // Firefox
    const destinationConfigModelFirefox = {
      params: {
        website_url: 'https://cloud.ibm.com',
        public_key: 'ksddkasjdaksd',
        preProd: false,
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

    const fireRes = await eventNotificationsService.createDestination(params);
    expect(fireRes).toBeDefined();
    expect(fireRes.status).toBe(201);
    expect(fireRes.result).toBeDefined();

    expect(fireRes.result.type).toBe(type);
    expect(fireRes.result.name).toBe(name);
    expect(fireRes.result.description).toBe(description);
    destinationId9 = fireRes.result.id;

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
    let readStream = '';
    const destinationConfigModel = {
      params: destinationConfigParamsModel,
    };

    let name = 'Admin Webhook Compliance';
    let description =
      'This destination is for creating admin webhook to receive compliance notifications';

    let params = {
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

    // FCM
    const destinationConfigParamsModelFCM = {
      server_key: fcmServerKey,
      sender_id: fcmSenderId,
    };

    const destinationConfigModelFCM = {
      params: destinationConfigParamsModelFCM,
    };

    name = 'FCM_destination_update';
    description = 'FCM Destination update';

    params = {
      instanceId,
      id: destinationId3,
      name,
      description,
      config: destinationConfigModelFCM,
    };

    const fcmRes = await eventNotificationsService.updateDestination(params);
    expect(fcmRes).toBeDefined();
    expect(fcmRes.status).toBe(200);
    expect(fcmRes.result).toBeDefined();
    expect(fcmRes.result.name).toBe(name);
    expect(fcmRes.result.description).toBe(description);

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

    const slackRes = await eventNotificationsService.updateDestination(params);
    expect(slackRes).toBeDefined();
    expect(slackRes.status).toBe(200);
    expect(slackRes.result).toBeDefined();
    expect(slackRes.result.name).toBe(name);
    expect(slackRes.result.description).toBe(description);

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

    name = 'safari_Dest';
    description = 'This Destination is for safari';

    try {
      readStream = fs.createReadStream(safariCertificatePath);
      console.log(readStream);
    } catch (err) {
      console.error(err);
    }

    params = {
      instanceId,
      id: destinationId5,
      name,
      description,
      config: safariDestinationConfigModel,
      certificate: readStream,
    };

    const safariRes = await eventNotificationsService.updateDestination(params);
    expect(safariRes).toBeDefined();
    expect(safariRes.status).toBe(200);
    expect(safariRes.result).toBeDefined();
    expect(safariRes.result.name).toBe(name);
    expect(safariRes.result.description).toBe(description);

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

    const teamsRes = await eventNotificationsService.updateDestination(params);
    expect(teamsRes).toBeDefined();
    expect(teamsRes.status).toBe(200);
    expect(teamsRes.result).toBeDefined();
    expect(teamsRes.result.name).toBe(name);
    expect(teamsRes.result.description).toBe(description);

    // cloud functions
    const cfDestinationConfigParamsModel = {
      url: 'https://www.ibmcfendpoint.com/',
      api_key: 'sdfknlsnfoejfwprpweoporw89',
    };

    const cfDestinationConfigModel = {
      params: cfDestinationConfigParamsModel,
    };

    name = 'Cloud Functions';
    description = 'This destination is for cloud functions';

    params = {
      instanceId,
      id: destinationId7,
      name,
      description,
      config: cfDestinationConfigModel,
    };

    const cloudFcuntionsRes = await eventNotificationsService.updateDestination(params);
    expect(cloudFcuntionsRes).toBeDefined();
    expect(cloudFcuntionsRes.status).toBe(200);
    expect(cloudFcuntionsRes.result).toBeDefined();
    expect(cloudFcuntionsRes.result.name).toBe(name);
    expect(cloudFcuntionsRes.result.description).toBe(description);

    // Chrome
    const destinationConfigModelChrome = {
      params: {
        website_url: 'https://cloud.ibm.com',
        api_key: 'efwewerwerkwer89werj',
        public_key: 'ksddkasjdaksd',
        preProd: false,
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

    const chromeRes = await eventNotificationsService.updateDestination(params);
    expect(chromeRes).toBeDefined();
    expect(chromeRes.status).toBe(200);
    expect(chromeRes.result).toBeDefined();
    expect(chromeRes.result.name).toBe(name);
    expect(chromeRes.result.description).toBe(description);

    // Firefox
    const destinationConfigModelFirefox = {
      params: {
        website_url: 'https://cloud.ibm.com',
        public_key: 'ksddkasjdaksd',
        preProd: false,
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

    const fireRes = await eventNotificationsService.updateDestination(params);
    expect(fireRes).toBeDefined();
    expect(fireRes.status).toBe(200);
    expect(fireRes.result).toBeDefined();
    expect(fireRes.result.name).toBe(name);
    expect(fireRes.result.description).toBe(description);

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

    // webhook
    const subscriptionCreateAttributesModel = {
      signing_enabled: false,
    };

    let name = 'subscription_web';
    let description = 'Subscription for web';
    let params = {
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

    // Email
    const subscriptionCreateAttributesModelSecond = {
      invited: ['tester1@gmail.com', 'tester3@ibm.com'],
      add_notification_payload: true,
      reply_to_mail: 'tester1@gmail.com',
      reply_to_name: 'US news',
      from_name: 'IBM',
    };

    name = 'subscription_email';
    description = 'Subscription for email';
    params = {
      instanceId,
      name,
      destinationId: destinationId2,
      topicId,
      attributes: subscriptionCreateAttributesModelSecond,
      description,
    };

    const resSecond = await eventNotificationsService.createSubscription(params);
    expect(resSecond).toBeDefined();
    expect(resSecond.status).toBe(201);
    expect(resSecond.result).toBeDefined();
    expect(resSecond.result.name).toBe(name);
    expect(resSecond.result.description).toBe(description);
    subscriptionId2 = resSecond.result.id;

    // FCM
    name = 'FCM subscription';
    description = 'Subscription for the FCM';
    params = {
      instanceId,
      name,
      destinationId: destinationId3,
      topicId: topicId3,
      description,
    };

    const resThird = await eventNotificationsService.createSubscription(params);
    expect(resThird).toBeDefined();
    expect(resThird.status).toBe(201);
    expect(resThird.result).toBeDefined();
    expect(resThird.result.name).toBe(name);
    expect(resThird.result.description).toBe(description);
    subscriptionId3 = resThird.result.id;

    // slack
    name = 'slack subscription';
    description = 'Subscription for the slack';
    params = {
      instanceId,
      name,
      destinationId: destinationId4,
      topicId,
      description,
    };

    const slackRes = await eventNotificationsService.createSubscription(params);
    expect(slackRes).toBeDefined();
    expect(slackRes.status).toBe(201);
    expect(slackRes.result).toBeDefined();
    expect(slackRes.result.name).toBe(name);
    expect(slackRes.result.description).toBe(description);
    subscriptionId4 = slackRes.result.id;

    // safari
    name = 'safari subscription';
    description = 'Subscription for the safari';
    params = {
      instanceId,
      name,
      destinationId: destinationId5,
      topicId,
      description,
    };

    const safariRes = await eventNotificationsService.createSubscription(params);
    expect(safariRes).toBeDefined();
    expect(safariRes.status).toBe(201);
    expect(safariRes.result).toBeDefined();
    expect(safariRes.result.name).toBe(name);
    expect(safariRes.result.description).toBe(description);
    subscriptionId5 = safariRes.result.id;

    // MSTeams
    name = 'MSTeams subscription';
    description = 'Subscription for the MSTeams';
    params = {
      instanceId,
      name,
      destinationId: destinationId6,
      topicId,
      description,
    };

    const teamsRes = await eventNotificationsService.createSubscription(params);
    expect(teamsRes).toBeDefined();
    expect(teamsRes.status).toBe(201);
    expect(teamsRes.result).toBeDefined();
    expect(teamsRes.result.name).toBe(name);
    expect(teamsRes.result.description).toBe(description);
    subscriptionId6 = teamsRes.result.id;

    // cloudfunctions
    name = 'cloud functions subscription';
    description = 'Subscription for the cloud functions';
    params = {
      instanceId,
      name,
      destinationId: destinationId7,
      topicId,
      description,
    };

    const cfRes = await eventNotificationsService.createSubscription(params);
    expect(cfRes).toBeDefined();
    expect(cfRes.status).toBe(201);
    expect(cfRes.result).toBeDefined();
    expect(cfRes.result.name).toBe(name);
    expect(cfRes.result.description).toBe(description);
    subscriptionId7 = cfRes.result.id;

    // chrome
    name = 'chrome subscription';
    description = 'Subscription for the chrome';
    params = {
      instanceId,
      name,
      destinationId: destinationId8,
      topicId,
      description,
    };

    const chromeRes = await eventNotificationsService.createSubscription(params);
    expect(chromeRes).toBeDefined();
    expect(chromeRes.status).toBe(201);
    expect(chromeRes.result).toBeDefined();
    expect(chromeRes.result.name).toBe(name);
    expect(chromeRes.result.description).toBe(description);
    subscriptionId8 = chromeRes.result.id;

    // Firefox
    name = 'Firefox subscription';
    description = 'Subscription for the Firefox';
    params = {
      instanceId,
      name,
      destinationId: destinationId9,
      topicId,
      description,
    };

    const fireRes = await eventNotificationsService.createSubscription(params);
    expect(fireRes).toBeDefined();
    expect(fireRes.status).toBe(201);
    expect(fireRes.result).toBeDefined();
    expect(fireRes.result.name).toBe(name);
    expect(fireRes.result.description).toBe(description);
    subscriptionId9 = fireRes.result.id;

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

    // webhook
    const subscriptionUpdateAttributesModel = {
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

    const res = await eventNotificationsService.updateSubscription(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
    expect(res.result.name).toBe(name);
    expect(res.result.description).toBe(description);

    // email
    const smsUpdateAttributesInvited = {
      add: ['tester4@ibm.com'],
    };

    const smsUpdateAttributesToRemove = {
      remove: ['tester3@ibm.com'],
    };

    const subscriptionUpdateAttributesModelSecond = {
      invited: smsUpdateAttributesInvited,
      add_notification_payload: true,
      reply_to_mail: 'tester1@gmail.com',
      reply_to_name: 'US news',
      from_name: 'IBM',
      subscribed: smsUpdateAttributesToRemove,
      unsubscribed: smsUpdateAttributesToRemove,
    };

    const nameSecond = 'subscription_email';
    const descriptionSecond = 'Subscription for email';
    const paramsSecond = {
      instanceId,
      name: nameSecond,
      id: subscriptionId2,
      attributes: subscriptionUpdateAttributesModelSecond,
      description: descriptionSecond,
    };

    const resSecond = await eventNotificationsService.updateSubscription(paramsSecond);
    expect(resSecond).toBeDefined();
    expect(resSecond.status).toBe(200);
    expect(resSecond.result).toBeDefined();
    expect(resSecond.result.name).toBe(nameSecond);
    expect(resSecond.result.description).toBe(descriptionSecond);

    // FCM
    name = 'FCM subscription update';
    description = 'Subscription for the FCM update';
    params = {
      instanceId,
      name,
      id: subscriptionId3,
      description,
    };

    const fcmRes = await eventNotificationsService.updateSubscription(params);
    expect(fcmRes).toBeDefined();
    expect(fcmRes.status).toBe(200);
    expect(fcmRes.result).toBeDefined();
    expect(fcmRes.result.name).toBe(name);
    expect(fcmRes.result.description).toBe(description);

    // slack
    name = 'slack subscription update';
    description = 'Subscription for the slack update';
    params = {
      instanceId,
      name,
      id: subscriptionId4,
      description,
    };

    const slackRes = await eventNotificationsService.updateSubscription(params);
    expect(slackRes).toBeDefined();
    expect(slackRes.status).toBe(200);
    expect(slackRes.result).toBeDefined();
    expect(slackRes.result.name).toBe(name);
    expect(slackRes.result.description).toBe(description);

    // safari
    name = 'safari subscription update';
    description = 'Subscription for the safari update';
    params = {
      instanceId,
      name,
      id: subscriptionId5,
      description,
    };

    const safariRes = await eventNotificationsService.updateSubscription(params);
    expect(safariRes).toBeDefined();
    expect(safariRes.status).toBe(200);
    expect(safariRes.result).toBeDefined();
    expect(safariRes.result.name).toBe(name);
    expect(safariRes.result.description).toBe(description);

    // MSTeams
    name = 'MSTeams subscription update';
    description = 'Subscription for the MSTeams update';
    params = {
      instanceId,
      name,
      id: subscriptionId6,
      description,
    };

    const teamsRes = await eventNotificationsService.updateSubscription(params);
    expect(teamsRes).toBeDefined();
    expect(teamsRes.status).toBe(200);
    expect(teamsRes.result).toBeDefined();
    expect(teamsRes.result.name).toBe(name);
    expect(teamsRes.result.description).toBe(description);

    // cloud functions
    name = 'cloud funstions subscription update';
    description = 'Subscription for the cloud functions update';
    params = {
      instanceId,
      name,
      id: subscriptionId7,
      description,
    };

    const cfRes = await eventNotificationsService.updateSubscription(params);
    expect(cfRes).toBeDefined();
    expect(cfRes.status).toBe(200);
    expect(cfRes.result).toBeDefined();
    expect(cfRes.result.name).toBe(name);
    expect(cfRes.result.description).toBe(description);

    // chrome
    name = 'chrome subscription update';
    description = 'Subscription for the chrome update';
    params = {
      instanceId,
      name,
      id: subscriptionId8,
      description,
    };

    const chromeRes = await eventNotificationsService.updateSubscription(params);
    expect(chromeRes).toBeDefined();
    expect(chromeRes.status).toBe(200);
    expect(chromeRes.result).toBeDefined();
    expect(chromeRes.result.name).toBe(name);
    expect(chromeRes.result.description).toBe(description);

    // Firefox
    name = 'cloud funstions subscription update';
    description = 'Subscription for the cloud functions update';
    params = {
      instanceId,
      name,
      id: subscriptionId9,
      description,
    };

    const fireRes = await eventNotificationsService.updateSubscription(params);
    expect(fireRes).toBeDefined();
    expect(fireRes.status).toBe(200);
    expect(fireRes.result).toBeDefined();
    expect(fireRes.result.name).toBe(name);
    expect(fireRes.result.description).toBe(description);
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

    const notificationSafariBodymodel = {
      saf: {
        alert: 'Game Request',
        badge: 5,
      },
    };

    const notificationID = '1234-1234-sdfs-234';
    const notificationSeverity = 'MEDIUM';
    const typeValue = 'com.acme.offer:new';
    const notificationsSouce = '1234-1234-sdfs-234:test';

    const notificationCreateModel = {
      instanceId,
      ibmenseverity: notificationSeverity,
      id: notificationID,
      source: notificationsSouce,
      ibmensourceid: sourceId,
      type: typeValue,
      time: '2019-01-01T12:00:00.000Z',
      ibmenpushto: JSON.stringify(notificationFcmDevicesModel),
      ibmenfcmbody: JSON.stringify(notificationFcmBodyModel),
      ibmenapnsbody: JSON.stringify(notificationApnsBodyModel),
      ibmensafaribody: JSON.stringify(notificationSafariBodymodel),
      ibmendefaultshort: 'Alert on offer',
      ibmendefaultlong: 'Offer is going to expire soon',
      specversion: '1.0',
    };

    let body = notificationCreateModel;
    const sendNotificationsParams = {
      instanceId,
      body,
    };

    const res = await eventNotificationsService.sendNotifications(sendNotificationsParams);

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
      ibmenseverity: notificationSeverity,
      id: notificationID,
      source: notificationsSouce,
      ibmensourceid: sourceId,
      type: typeValue,
      time: '2019-01-01T12:00:00.000Z',
      ibmenpushto: JSON.stringify(notificationFcmDevicesModel),
      ibmenfcmbody: JSON.stringify(fcmOptions),
      ibmenapnsbody: JSON.stringify(apnsOptions),
      ibmensafaribody: JSON.stringify(notificationSafariBodymodel),
      ibmendefaultshort: 'testString',
      ibmendefaultlong: 'testString',
      specversion: '1.0',
    };

    body = newParams;
    const sendNotificationsParamsnew = {
      instanceId,
      body,
    };

    const newres = await eventNotificationsService.sendNotifications(sendNotificationsParamsnew);
    expect(newres).toBeDefined();
    expect(newres.status).toBe(202);
    expect(newres.result).toBeDefined();

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
  test('sendBulkNotifications()', async () => {
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

    const notificationSafariBodymodel = {
      saf: {
        alert: 'Game Request',
        badge: 5,
      },
    };

    const notificationID = '1234-1234-sdfs-234';
    const notificationSeverity = 'MEDIUM';
    const typeValue = 'com.acme.offer:new';
    const notificationsSouce = '1234-1234-sdfs-234:test';

    // NotificationCreate
    const notificationCreateModel = {
      ibmenseverity: notificationSeverity,
      id: notificationID,
      source: notificationsSouce,
      ibmensourceid: sourceId,
      type: typeValue,
      time: '2019-01-01T12:00:00.000Z',
      ibmenpushto: JSON.stringify(notificationFcmDevicesModel),
      ibmenfcmbody: JSON.stringify(fcmOptions),
      ibmenapnsbody: JSON.stringify(apnsOptions),
      ibmensafaribody: JSON.stringify(notificationSafariBodymodel),
      specversion: '1.0',
    };

    const params = {
      instanceId,
      bulkMessages: [notificationCreateModel],
    };

    const res = await eventNotificationsService.sendBulkNotifications(params);

    expect(res).toBeDefined();
    expect(res.status).toBe(202);
    expect(res.result).toBeDefined();

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
    const subscriptions = [
      subscriptionId,
      subscriptionId2,
      subscriptionId3,
      subscriptionId4,
      subscriptionId5,
      subscriptionId6,
      subscriptionId7,
      subscriptionId8,
      subscriptionId9,
    ];

    for (let i = 0; i < subscriptions.length; i += 1) {
      const params = {
        instanceId,
        id: subscriptions[i],
      };

      const res = await eventNotificationsService.deleteSubscription(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(204);
      expect(res.result).toBeDefined();
    }

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
    const destinations = [
      destinationId,
      destinationId3,
      destinationId4,
      destinationId5,
      destinationId6,
      destinationId7,
      destinationId8,
      destinationId9,
    ];

    for (let i = 0; i < destinations.length; i += 1) {
      const params = {
        instanceId,
        id: destinations[i],
      };

      const res = await eventNotificationsService.deleteDestination(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(204);
      expect(res.result).toBeDefined();
    }

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
