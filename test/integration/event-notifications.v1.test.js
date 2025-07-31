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

const { readExternalSources } = require('ibm-cloud-sdk-core');
const fs = require('fs');
const exp = require('constants');
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
let topicId4 = '';
let destinationId = '';
let destinationId1 = '';
let destinationId2 = '';
let destinationId4 = '';
let destinationId5 = '';
let destinationId6 = '';
let destinationId8 = '';
let destinationId9 = '';
let destinationId10 = '';
let destinationId11 = '';
let destinationId12 = '';
let destinationId13 = '';
let destinationId14 = '';
let destinationId15 = '';
let destinationId16 = '';
let destinationId17 = '';
let destinationId18 = '';
let destinationId19 = '';
let destinationId20 = '';

let subscriptionId = '';
let subscriptionId1 = '';
let subscriptionId2 = '';
let subscriptionId4 = '';
let subscriptionId5 = '';
let subscriptionId6 = '';
let subscriptionId8 = '';
let subscriptionId9 = '';
let subscriptionId10 = '';
let subscriptionId11 = '';
let subscriptionId12 = '';
let subscriptionId13 = '';
let subscriptionId14 = '';
let subscriptionId15 = '';
let subscriptionId16 = '';
let subscriptionId17 = '';
let subscriptionId18 = '';
let subscriptionId19 = '';
let subscriptionId20 = '';
let safariCertificatePath = '';
let integrationId = '';
let sNowClientId = '';
let sNowClientSecret = '';
let sNowUserName = '';
let sNowPassword = '';
let sNowInstanceName = '';
let fcmProjectId = '';
let fcmClientEmail = '';
let fcmPrivateKey = '';
let codeEngineURL = '';
let codeEngineProjectCRN = '';
let huaweiClientId = '';
let huaweiClientSecret = '';
let cosBucketName = '';
let cosInstanceId = '';
let cosEndPoint = '';
let templateInvitationID = '';
let templateNotificationID = '';
let slackTemplateID = '';
let slackURL = '';
let teamsURL = '';
let pagerDutyApiKey = '';
let pagerDutyRoutingKey = '';
let templateBody = '';
let slackTemplateBody = '';
let cosInstanceCRN = '';
let cosIntegrationId = '';
let smtpConfigID = '';
let smtpUserID = '';
let notificationID = '';
let slackDmToken = '';
let slackChannelID = '';
let webhookTemplateID = '';
let webhookTemplateBody = '';
let schedulerSourceId = '';
let pagerdutyTemplateID = '';
let pagerdutyTemplateBody = '';
let eventStreamsTemplateID = '';
let eventStreamsTemplateBody = '';
let eventStreamsCRN = '';
let eventStreamsTopic = '';
let eventStreamsEndPoint = '';
let codeEngineApplicationTemplateID = '';
let codeEngineJobTemplateID = '';
let codeEngineAppTemplateBody = '';
let codeEngineJobTemplateBody = '';

describe('EventNotificationsV1_integration', () => {
  jest.setTimeout(timeout);
  let eventNotificationsService = EventNotificationsV1.newInstance({});

  test('Initialise service', async () => {
    eventNotificationsService = EventNotificationsV1.newInstance({});

    expect(eventNotificationsService).not.toBeNull();

    const config = readExternalSources(EventNotificationsV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();

    instanceId = config.guid;
    safariCertificatePath = config.safariCertificate;
    sNowClientId = config.snowClientId;
    sNowClientSecret = config.snowClientSecret;
    sNowUserName = config.snowUserName;
    sNowPassword = config.snowPassword;
    sNowInstanceName = config.snowInstanceName;
    fcmClientEmail = config.fcmClientEmail;
    fcmPrivateKey = config.fcmPrivateKey;
    fcmProjectId = config.fcmProjectId;
    codeEngineURL = config.codeEngineUrl;
    huaweiClientId = config.huaweiClientId;
    huaweiClientSecret = config.huaweiClientSecret;
    cosBucketName = config.cosBucketName;
    cosInstanceId = config.cosInstance;
    cosEndPoint = config.cosEndpoint;
    slackURL = config.slackUrl;
    teamsURL = config.msTeamsUrl;
    pagerDutyApiKey = config.pdApiKey;
    pagerDutyRoutingKey = config.pdRoutingKey;
    templateBody = config.templateBody;
    slackTemplateBody = config.slackTemplateBody;
    cosInstanceCRN = config.cosInstanceCrn;
    codeEngineProjectCRN = config.codeEngineProjectCrn;
    slackDmToken = config.slackDmToken;
    slackChannelID = config.slackChannelId;
    webhookTemplateBody = config.webhookTemplateBody;
    schedulerSourceId = config.schedulerSourceId;
    pagerdutyTemplateBody = config.pagerdutyTemplateBody;
    eventStreamsTemplateBody = config.eventStreamsTemplateBody;
    eventStreamsCRN = config.eventStreamsCrn;
    eventStreamsTopic = config.eventStreamsTopic;
    eventStreamsEndPoint = config.eventStreamsEndpoint;
    codeEngineAppTemplateBody = config.codeEngineAppTemplateBody;
    codeEngineJobTemplateBody = config.codeEngineJobTemplateBody;

    eventNotificationsService.enableRetries();
  });

  test('createIntegration()', async () => {
    const metadata = {
      endpoint: cosEndPoint,
      crn: cosInstanceCRN,
      bucket_name: cosBucketName,
    };

    const params = {
      instanceId,
      type: 'collect_failed_events',
      metadata,
    };

    const res = await eventNotificationsService.createIntegration(params);
    cosIntegrationId = res.result.id;
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
  });

  test('listIntegrations()', async () => {
    const offset = 0;
    const limit = 1;
    const search = '';

    const params = {
      instanceId,
      offset,
      limit,
      search,
    };
    const res = await eventNotificationsService.listIntegrations(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();

    integrationId = res.result.integrations[0].id;
  });

  test('getIntegration()', async () => {
    const params = {
      instanceId,
      id: integrationId,
    };

    const res = await eventNotificationsService.getIntegration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateIntegration()', async () => {
    const metadata = {
      endpoint: cosEndPoint,
      crn: cosInstanceCRN,
      bucket_name: cosBucketName,
    };

    const params = {
      instanceId,
      id: cosIntegrationId,
      type: 'collect_failed_events',
      metadata,
    };

    const res = await eventNotificationsService.replaceIntegration(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createSources()', async () => {
    const params = {
      instanceId,
      name: 'Event Notification Create Source Acme',
      description: 'This source is used for Acme Bank',
      enabled: true,
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

    const currentInstant = new Date();
    const formattedStartDate = currentInstant.toISOString();

    const formattedEndDate = new Date(currentInstant);
    formattedEndDate.setMinutes(currentInstant.getMinutes() + 1);

    const eventScheduleFilterAttributesModel = {
      starts_at: formattedStartDate,
      ends_at: formattedEndDate,
      expression: '* * * * *',
    };

    const rulesSchedulerModel = {
      enabled: true,
      event_schedule_filter: eventScheduleFilterAttributesModel,
    };

    const topicCreateSchedulerSourcesItemModel = {
      id: schedulerSourceId,
      rules: [rulesSchedulerModel],
    };

    description = 'Topic 4 for cron scheduler';
    name = `topic4`;

    const paramsScheduler = {
      instanceId,
      name,
      description,
      sources: [topicCreateSchedulerSourcesItemModel],
    };

    const resSscheduler = await eventNotificationsService.createTopic(paramsScheduler);
    expect(resSscheduler).toBeDefined();
    expect(resSscheduler.status).toBe(201);
    expect(resSscheduler.result).toBeDefined();
    expect(resSscheduler.result.name).toBe(name);
    expect(resSscheduler.result.description).toBe(description);
    topicId4 = resSscheduler.result.id;

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
    const offset = 0;
    const limit = 1;
    const search = '';
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
      url: codeEngineURL,
      verb: 'post',
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

    // slack
    const destinationConfigModelSlack = {
      params: {
        url: slackURL,
        type: 'incoming_webhook',
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
        password: 'password',
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
        url: teamsURL,
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

    // chrome
    const destinationConfigModelChrome = {
      params: {
        website_url: 'https://www.xyz.pqr',
        api_key: 'AAxxxxxxxxxxxxxxxxx4z',
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

    // Pager Duty
    const destinationConfigModelPagerDuty = {
      params: {
        api_key: pagerDutyApiKey,
        routing_key: pagerDutyRoutingKey,
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

    const pdRes = await eventNotificationsService.createDestination(params);
    expect(pdRes).toBeDefined();
    expect(pdRes.status).toBe(201);
    expect(pdRes.result).toBeDefined();

    expect(pdRes.result.type).toBe(type);
    expect(pdRes.result.name).toBe(name);
    expect(pdRes.result.description).toBe(description);
    destinationId10 = pdRes.result.id;

    // Service Now
    const destinationConfigModelServiceNow = {
      params: {
        client_id: sNowClientId,
        client_secret: sNowClientSecret,
        username: sNowUserName,
        password: sNowPassword,
        instance_name: sNowInstanceName,
      },
    };

    name = 'ServiceNow_destination';
    description = 'Service Now Destination';
    type = 'servicenow';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModelServiceNow,
    };

    const sNowRes = await eventNotificationsService.createDestination(params);
    expect(sNowRes).toBeDefined();
    expect(sNowRes.status).toBe(201);
    expect(sNowRes.result).toBeDefined();

    expect(sNowRes.result.type).toBe(type);
    expect(sNowRes.result.name).toBe(name);
    expect(sNowRes.result.description).toBe(description);
    destinationId11 = sNowRes.result.id;

    const destinationConfigParamsModelFCM = {
      private_key: fcmPrivateKey,
      project_id: fcmProjectId,
      client_email: fcmClientEmail,
    };

    const destinationConfigModelFCM = {
      params: destinationConfigParamsModelFCM,
    };

    name = 'FCM_V1_destination';
    description = 'FCM V1 Destination';
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
    destinationId12 = resNew.result.id;

    const destinationCEConfigParamsModel = {
      url: codeEngineURL,
      verb: 'get',
      type: 'application',
      custom_headers: { 'authorization': 'testString' },
      sensitive_headers: ['authorization'],
    };

    const destinationCEConfigModel = {
      params: destinationCEConfigParamsModel,
    };

    name = 'code_engine_destination';
    description = 'code engine Destination';
    type = 'ibmce';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationCEConfigModel,
    };

    const ceRes = await eventNotificationsService.createDestination(params);
    expect(ceRes).toBeDefined();
    expect(ceRes.status).toBe(201);
    expect(ceRes.result).toBeDefined();

    expect(ceRes.result.type).toBe(type);
    expect(ceRes.result.name).toBe(name);
    expect(ceRes.result.description).toBe(description);
    destinationId13 = ceRes.result.id;

    const cosdestinationConfigModel = {
      params: {
        bucket_name: cosBucketName,
        instance_id: cosInstanceId,
        endpoint: cosEndPoint,
      },
    };
    name = 'COS_destination';
    description = 'COS Destination';
    type = 'ibmcos';
    params = {
      instanceId,
      name,
      type,
      description,
      config: cosdestinationConfigModel,
    };

    const cosRes = await eventNotificationsService.createDestination(params);
    expect(cosRes).toBeDefined();
    expect(cosRes.status).toBe(201);
    expect(cosRes.result).toBeDefined();

    expect(cosRes.result.type).toBe(type);
    expect(cosRes.result.name).toBe(name);
    expect(cosRes.result.description).toBe(description);
    destinationId14 = cosRes.result.id;

    const huaweidestinationConfigModel = {
      params: {
        client_id: huaweiClientId,
        client_secret: huaweiClientSecret,
        pre_prod: false,
      },
    };
    name = 'Huawei_destination';
    description = 'Huawei Destination';
    type = 'push_huawei';
    params = {
      instanceId,
      name,
      type,
      description,
      config: huaweidestinationConfigModel,
    };

    const huaweiRes = await eventNotificationsService.createDestination(params);
    expect(huaweiRes).toBeDefined();
    expect(huaweiRes.status).toBe(201);
    expect(huaweiRes.result).toBeDefined();

    expect(huaweiRes.result.type).toBe(type);
    expect(huaweiRes.result.name).toBe(name);
    expect(huaweiRes.result.description).toBe(description);
    destinationId15 = huaweiRes.result.id;

    const customdestinationConfigModel = {
      params: {
        domain: 'test.event-notifications.test.cloud.ibm.com',
      },
    };
    name = 'Custom_Email_destination';
    description = 'Custom Email Destination';
    type = 'smtp_custom';
    params = {
      instanceId,
      name,
      type,
      description,
      config: customdestinationConfigModel,
    };

    const customEmailRes = await eventNotificationsService.createDestination(params);
    expect(customEmailRes).toBeDefined();
    expect(customEmailRes.status).toBe(201);
    expect(customEmailRes.result).toBeDefined();

    expect(customEmailRes.result.type).toBe(type);
    expect(customEmailRes.result.name).toBe(name);
    expect(customEmailRes.result.description).toBe(description);
    destinationId16 = customEmailRes.result.id;

    name = 'Custom_sms_destination';
    description = 'Custom sms Destination';
    type = 'sms_custom';
    const collectFailedEvents = 'false';
    params = {
      instanceId,
      name,
      type,
      description,
      collectFailedEvents,
    };

    const customSMSRes = await eventNotificationsService.createDestination(params);
    expect(customSMSRes).toBeDefined();
    expect(customSMSRes.status).toBe(201);
    expect(customSMSRes.result).toBeDefined();

    expect(customSMSRes.result.type).toBe(type);
    expect(customSMSRes.result.name).toBe(name);
    expect(customSMSRes.result.description).toBe(description);
    destinationId17 = customSMSRes.result.id;

    const destinationCEJobConfigParamsModel = {
      type: 'job',
      project_crn: codeEngineProjectCRN,
      job_name: 'custom-job',
    };

    const destinationCEJobConfigModel = {
      params: destinationCEJobConfigParamsModel,
    };

    name = 'code_engine_job_destination';
    description = 'code engine job Destination';
    type = 'ibmce';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationCEJobConfigModel,
    };

    const ceJobRes = await eventNotificationsService.createDestination(params);
    expect(ceJobRes).toBeDefined();
    expect(ceJobRes.status).toBe(201);
    expect(ceJobRes.result).toBeDefined();

    expect(ceJobRes.result.type).toBe(type);
    expect(ceJobRes.result.name).toBe(name);
    expect(ceJobRes.result.description).toBe(description);
    destinationId18 = ceJobRes.result.id;

    const destinationConfigModelSlackDM = {
      params: {
        token: slackDmToken,
        type: 'direct_message',
      },
    };

    name = 'slack_DM_destination';
    description = 'Slack DM Destination';
    type = 'slack';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModelSlackDM,
    };

    const resslackDM = await eventNotificationsService.createDestination(params);
    expect(resslackDM).toBeDefined();
    expect(resslackDM.status).toBe(201);
    expect(resslackDM.result).toBeDefined();

    expect(resslackDM.result.type).toBe(type);
    expect(resslackDM.result.name).toBe(name);
    expect(resslackDM.result.description).toBe(description);
    destinationId19 = resslackDM.result.id;

    const destinationEventStreamsConfigParamsModel = {
      crn: eventStreamsCRN,
      endpoint: eventStreamsEndPoint,
      topic: eventStreamsTopic,
    };

    const destinationEventStreamsConfigModel = {
      params: destinationEventStreamsConfigParamsModel,
    };

    name = 'event_streams_destination';
    description = 'event streams Destination';
    type = 'event_streams';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationEventStreamsConfigModel,
    };

    const eventStreamsRes = await eventNotificationsService.createDestination(params);
    expect(eventStreamsRes).toBeDefined();
    expect(eventStreamsRes.status).toBe(201);
    expect(eventStreamsRes.result).toBeDefined();

    expect(eventStreamsRes.result.type).toBe(type);
    expect(eventStreamsRes.result.name).toBe(name);
    expect(eventStreamsRes.result.description).toBe(description);
    destinationId20 = eventStreamsRes.result.id;

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

  test('testDestination()', async () => {
    const destinations = [destinationId4, destinationId6, destinationId10, destinationId14];

    for (let i = 0; i < destinations.length; i += 1) {
      const testDestinationParams = {
        instanceId,
        id: destinations[i],
      };

      const testDestinationResult =
        await eventNotificationsService.testDestination(testDestinationParams);
      expect(testDestinationResult).toBeDefined();
      expect(testDestinationResult.status).toBe(200);
    }
  });

  test('createTemplate()', async () => {
    const templateConfigModel = {
      body: templateBody,
      subject: 'Hi this is invitation for invitation message',
    };

    let name = 'template name invitation';
    let description = 'template description';
    let type = 'smtp_custom.invitation';
    let createTemplateParams = {
      instanceId,
      name,
      type,
      params: templateConfigModel,
      description,
    };

    let createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
    expect(createTemplateResult).toBeDefined();
    expect(createTemplateResult.status).toBe(201);
    expect(createTemplateResult.result).toBeDefined();

    expect(createTemplateResult.result.type).toBe(type);
    expect(createTemplateResult.result.name).toBe(name);
    expect(createTemplateResult.result.description).toBe(description);
    templateInvitationID = createTemplateResult.result.id;

    name = 'template name notification';
    description = 'template description';
    type = 'smtp_custom.notification';
    createTemplateParams = {
      instanceId,
      name,
      type,
      params: templateConfigModel,
      description,
    };

    createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
    expect(createTemplateResult).toBeDefined();
    expect(createTemplateResult.status).toBe(201);
    expect(createTemplateResult.result).toBeDefined();

    expect(createTemplateResult.result.type).toBe(type);
    expect(createTemplateResult.result.name).toBe(name);
    expect(createTemplateResult.result.description).toBe(description);
    templateNotificationID = createTemplateResult.result.id;

    const slackTemplateConfigModel = {
      body: slackTemplateBody,
    };

    name = 'slack template name';
    description = 'slack template description';
    type = 'slack.notification';
    createTemplateParams = {
      instanceId,
      name,
      type,
      params: slackTemplateConfigModel,
      description,
    };

    createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
    expect(createTemplateResult).toBeDefined();
    expect(createTemplateResult.status).toBe(201);
    expect(createTemplateResult.result).toBeDefined();

    expect(createTemplateResult.result.type).toBe(type);
    expect(createTemplateResult.result.name).toBe(name);
    expect(createTemplateResult.result.description).toBe(description);
    slackTemplateID = createTemplateResult.result.id;

    const webhookTemplateConfigModel = {
      body: webhookTemplateBody,
    };

    name = 'webhook template name';
    description = 'webhook template description';
    type = 'webhook.notification';
    createTemplateParams = {
      instanceId,
      name,
      type,
      params: webhookTemplateConfigModel,
      description,
    };

    createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
    expect(createTemplateResult).toBeDefined();
    expect(createTemplateResult.status).toBe(201);
    expect(createTemplateResult.result).toBeDefined();

    expect(createTemplateResult.result.type).toBe(type);
    expect(createTemplateResult.result.name).toBe(name);
    expect(createTemplateResult.result.description).toBe(description);
    webhookTemplateID = createTemplateResult.result.id;

    const pagerdutyTemplateConfigModel = {
      body: pagerdutyTemplateBody,
    };

    name = 'pagerduty template name';
    description = 'pagerduty template description';
    type = 'pagerduty.notification';
    createTemplateParams = {
      instanceId,
      name,
      type,
      params: pagerdutyTemplateConfigModel,
      description,
    };

    createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
    expect(createTemplateResult).toBeDefined();
    expect(createTemplateResult.status).toBe(201);
    expect(createTemplateResult.result).toBeDefined();

    expect(createTemplateResult.result.type).toBe(type);
    expect(createTemplateResult.result.name).toBe(name);
    expect(createTemplateResult.result.description).toBe(description);
    pagerdutyTemplateID = createTemplateResult.result.id;

    const eventStreamsTemplateConfigModel = {
      body: eventStreamsTemplateBody,
    };

    name = 'eventstreams template name';
    description = 'eventstreams template description';
    type = 'event_streams.notification';
    createTemplateParams = {
      instanceId,
      name,
      type,
      params: eventStreamsTemplateConfigModel,
      description,
    };

    createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
    expect(createTemplateResult).toBeDefined();
    expect(createTemplateResult.status).toBe(201);
    expect(createTemplateResult.result).toBeDefined();

    expect(createTemplateResult.result.type).toBe(type);
    expect(createTemplateResult.result.name).toBe(name);
    expect(createTemplateResult.result.description).toBe(description);
    eventStreamsTemplateID = createTemplateResult.result.id;

    const codeEngineAppTemplateConfigModel = {
      body: codeEngineAppTemplateBody,
    };

    name = 'codeengine app template name';
    description = 'codeengine app template description';
    type = 'ibmceapp.notification';
    createTemplateParams = {
      instanceId,
      name,
      type,
      params: codeEngineAppTemplateConfigModel,
      description,
    };

    createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
    expect(createTemplateResult).toBeDefined();
    expect(createTemplateResult.status).toBe(201);
    expect(createTemplateResult.result).toBeDefined();

    expect(createTemplateResult.result.type).toBe(type);
    expect(createTemplateResult.result.name).toBe(name);
    expect(createTemplateResult.result.description).toBe(description);
    codeEngineApplicationTemplateID = createTemplateResult.result.id;

    const codeEngineJobTemplateConfigModel = {
      body: codeEngineJobTemplateBody,
    };

    name = 'codeengine job template name';
    description = 'codeengine job template description';
    type = 'ibmcejob.notification';
    createTemplateParams = {
      instanceId,
      name,
      type,
      params: codeEngineJobTemplateConfigModel,
      description,
    };

    createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
    expect(createTemplateResult).toBeDefined();
    expect(createTemplateResult.status).toBe(201);
    expect(createTemplateResult.result).toBeDefined();

    expect(createTemplateResult.result.type).toBe(type);
    expect(createTemplateResult.result.name).toBe(name);
    expect(createTemplateResult.result.description).toBe(description);
    codeEngineJobTemplateID = createTemplateResult.result.id;
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

  test('getTemplate()', async () => {
    const params = {
      instanceId,
      id: templateInvitationID,
    };

    const res = await eventNotificationsService.getTemplate(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('updateDestination()', async () => {
    // Request models needed by this operation.

    // DestinationConfigParamsWebhookDestinationConfig
    const destinationConfigParamsModel = {
      url: codeEngineURL,
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

    // slack
    const destinationConfigModelSlack = {
      params: {
        url: slackURL,
        type: 'incoming_webhook',
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
        password: 'password',
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
        url: teamsURL,
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

    // Chrome
    const destinationConfigModelChrome = {
      params: {
        website_url: 'https://www.xyz.pqr',
        api_key: 'AAxxxxxxxxxxxxxxxxx4z',
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

    // PagerDuty
    const destinationConfigModelPagerDuty = {
      params: {
        api_key: pagerDutyApiKey,
        routing_key: pagerDutyRoutingKey,
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

    const pdRes = await eventNotificationsService.updateDestination(params);
    expect(pdRes).toBeDefined();
    expect(pdRes.status).toBe(200);
    expect(pdRes.result).toBeDefined();
    expect(pdRes.result.name).toBe(name);
    expect(pdRes.result.description).toBe(description);

    const destinationConfigModelServiceNow = {
      params: {
        client_id: sNowClientId,
        client_secret: sNowClientSecret,
        username: sNowUserName,
        password: sNowPassword,
        instance_name: sNowInstanceName,
      },
    };

    name = 'ServiceNow_destination';
    description = 'Service Now Destination';

    params = {
      instanceId,
      id: destinationId11,
      name,
      description,
      config: destinationConfigModelServiceNow,
    };

    const sNowRes = await eventNotificationsService.updateDestination(params);
    expect(sNowRes).toBeDefined();
    expect(sNowRes.status).toBe(200);
    expect(sNowRes.result).toBeDefined();
    expect(sNowRes.result.name).toBe(name);
    expect(sNowRes.result.description).toBe(description);

    const destinationConfigParamsModelFCM = {
      private_key: fcmPrivateKey,
      project_id: fcmProjectId,
      client_email: fcmClientEmail,
    };

    const destinationConfigModelFCM = {
      params: destinationConfigParamsModelFCM,
    };

    name = 'FCM_destination_V1_update';
    description = 'FCM Destination V1 update';

    params = {
      instanceId,
      id: destinationId12,
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

    const destinationCEConfigParamsModel = {
      url: codeEngineURL,
      verb: 'post',
      type: 'application',
      custom_headers: { authorization: 'xxx-tye67-yyy' },
      sensitive_headers: ['authorization'],
    };
    const destinationCEConfigModel = {
      params: destinationCEConfigParamsModel,
    };

    name = 'code engine updated';
    description = 'This destination is for code engine notifications';

    params = {
      instanceId,
      id: destinationId13,
      name,
      description,
      config: destinationCEConfigModel,
    };

    const ceRes = await eventNotificationsService.updateDestination(params);
    expect(ceRes).toBeDefined();
    expect(ceRes.status).toBe(200);
    expect(ceRes.result).toBeDefined();
    expect(ceRes.result.name).toBe(name);
    expect(ceRes.result.description).toBe(description);

    const destinationConfigModelCOS = {
      params: {
        bucket_name: cosBucketName,
        instance_id: cosInstanceId,
        endpoint: cosEndPoint,
      },
    };

    name = 'COS_destination_update';
    description = 'COS Destination_update';

    params = {
      instanceId,
      id: destinationId14,
      name,
      description,
      config: destinationConfigModelCOS,
    };

    const cosRes = await eventNotificationsService.updateDestination(params);
    expect(cosRes).toBeDefined();
    expect(cosRes.status).toBe(200);
    expect(cosRes.result).toBeDefined();
    expect(cosRes.result.name).toBe(name);
    expect(cosRes.result.description).toBe(description);

    const huaweiDestinationConfigModel = {
      params: {
        client_id: huaweiClientId,
        client_secret: huaweiClientSecret,
        pre_prod: false,
      },
    };

    name = 'Huawei_destination_update';
    description = 'Huawei Destination_update';

    params = {
      instanceId,
      id: destinationId15,
      name,
      description,
      config: huaweiDestinationConfigModel,
    };

    const huaweiRes = await eventNotificationsService.updateDestination(params);
    expect(huaweiRes).toBeDefined();
    expect(huaweiRes.status).toBe(200);
    expect(huaweiRes.result).toBeDefined();
    expect(huaweiRes.result.name).toBe(name);
    expect(huaweiRes.result.description).toBe(description);

    const customDestinationConfigModel = {
      params: {
        domain: 'test.event-notifications.test.cloud.ibm.com',
      },
    };

    name = 'custom_email_destination_update';
    description = 'custom email Destination_update';

    params = {
      instanceId,
      id: destinationId16,
      name,
      description,
      config: customDestinationConfigModel,
    };

    const customemailRes = await eventNotificationsService.updateDestination(params);
    expect(customemailRes).toBeDefined();
    expect(customemailRes.status).toBe(200);
    expect(customemailRes.result).toBeDefined();
    expect(customemailRes.result.name).toBe(name);
    expect(customemailRes.result.description).toBe(description);

    const updateSpfVerifyDestinationParams = {
      instanceId,
      id: destinationId16,
      type: 'spf',
    };

    const updateSpfVerifyDestinationResult =
      await eventNotificationsService.updateVerifyDestination(updateSpfVerifyDestinationParams);

    expect(updateSpfVerifyDestinationResult).toBeDefined();
    expect(updateSpfVerifyDestinationResult.status).toBe(200);

    const updateDkimVerifyDestinationParams = {
      instanceId,
      id: destinationId16,
      type: 'dkim',
    };

    const updateDkimVerifyDestinationResult =
      await eventNotificationsService.updateVerifyDestination(updateDkimVerifyDestinationParams);

    expect(updateDkimVerifyDestinationResult).toBeDefined();
    expect(updateDkimVerifyDestinationResult.status).toBe(200);

    name = 'custom_sms_destination_update';
    description = 'custom sms Destination_update';

    params = {
      instanceId,
      id: destinationId17,
      name,
      description,
    };

    const customSMSRes = await eventNotificationsService.updateDestination(params);
    expect(customSMSRes).toBeDefined();
    expect(customSMSRes.status).toBe(200);
    expect(customSMSRes.result).toBeDefined();
    expect(customSMSRes.result.name).toBe(name);
    expect(customSMSRes.result.description).toBe(description);

    const destinationCEJobConfigParamsModel = {
      type: 'job',
      project_crn: codeEngineProjectCRN,
      job_name: 'custom-job',
    };
    const destinationCEJobConfigModel = {
      params: destinationCEJobConfigParamsModel,
    };

    name = 'code engine job updated';
    description = 'This destination is for code engine job notifications';

    params = {
      instanceId,
      id: destinationId18,
      name,
      description,
      config: destinationCEJobConfigModel,
    };

    const ceJobRes = await eventNotificationsService.updateDestination(params);
    expect(ceJobRes).toBeDefined();
    expect(ceJobRes.status).toBe(200);
    expect(ceJobRes.result).toBeDefined();
    expect(ceJobRes.result.name).toBe(name);
    expect(ceJobRes.result.description).toBe(description);

    const destinationConfigModelSlackDM = {
      params: {
        token: slackDmToken,
        type: 'direct_message',
      },
    };

    name = 'slack_DM_destination_update';
    description = 'Slack DM Destination update';

    params = {
      instanceId,
      id: destinationId19,
      name,
      description,
      config: destinationConfigModelSlackDM,
    };

    const slackDMRes = await eventNotificationsService.updateDestination(params);
    expect(slackDMRes).toBeDefined();
    expect(slackDMRes.status).toBe(200);
    expect(slackDMRes.result).toBeDefined();
    expect(slackDMRes.result.name).toBe(name);
    expect(slackDMRes.result.description).toBe(description);

    const destinationEventStreamsConfigParamsModel = {
      crn: eventStreamsCRN,
      endpoint: eventStreamsEndPoint,
      topic: eventStreamsTopic,
    };

    const destinationEventStreamsConfigModel = {
      params: destinationEventStreamsConfigParamsModel,
    };

    name = 'event streams updated';
    description = 'This destination is for event streams';

    params = {
      instanceId,
      id: destinationId20,
      name,
      description,
      config: destinationEventStreamsConfigModel,
    };

    const eventStreamsRes = await eventNotificationsService.updateDestination(params);
    expect(eventStreamsRes).toBeDefined();
    expect(eventStreamsRes.status).toBe(200);
    expect(eventStreamsRes.result).toBeDefined();
    expect(eventStreamsRes.result.name).toBe(name);
    expect(eventStreamsRes.result.description).toBe(description);
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

  test('updateTemplate()', async () => {
    const templateConfigModel = {
      body: templateBody,
      subject: 'Hi this is invitation for invitation message',
    };
    let name = 'template name invitation update';
    let description = 'template destination update';
    let type = 'smtp_custom.invitation';
    let replaceTemplateParams = {
      instanceId,
      id: templateInvitationID,
      name,
      type,
      params: templateConfigModel,
      description,
    };

    let replaceTemplateResult =
      await eventNotificationsService.replaceTemplate(replaceTemplateParams);
    expect(replaceTemplateResult).toBeDefined();
    expect(replaceTemplateResult.status).toBe(200);
    expect(replaceTemplateResult.result).toBeDefined();

    expect(replaceTemplateResult.result.type).toBe(type);
    expect(replaceTemplateResult.result.name).toBe(name);
    expect(replaceTemplateResult.result.description).toBe(description);

    name = 'template name notification update';
    description = 'template destination update';
    type = 'smtp_custom.notification';
    replaceTemplateParams = {
      instanceId,
      id: templateNotificationID,
      name,
      type,
      params: templateConfigModel,
      description,
    };

    replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
    expect(replaceTemplateResult).toBeDefined();
    expect(replaceTemplateResult.status).toBe(200);
    expect(replaceTemplateResult.result).toBeDefined();

    expect(replaceTemplateResult.result.type).toBe(type);
    expect(replaceTemplateResult.result.name).toBe(name);
    expect(replaceTemplateResult.result.description).toBe(description);

    const slackTemplateConfigModel = {
      body: slackTemplateBody,
    };

    name = 'slack template name update';
    description = 'slack template description update';
    type = 'slack.notification';
    replaceTemplateParams = {
      instanceId,
      id: slackTemplateID,
      name,
      type,
      params: slackTemplateConfigModel,
      description,
    };

    replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
    expect(replaceTemplateResult).toBeDefined();
    expect(replaceTemplateResult.status).toBe(200);
    expect(replaceTemplateResult.result).toBeDefined();

    expect(replaceTemplateResult.result.type).toBe(type);
    expect(replaceTemplateResult.result.name).toBe(name);
    expect(replaceTemplateResult.result.description).toBe(description);

    const webhookTemplateConfigModel = {
      body: webhookTemplateBody,
    };

    name = 'webhook template name update';
    description = 'webhook template description update';
    type = 'webhook.notification';
    replaceTemplateParams = {
      instanceId,
      id: webhookTemplateID,
      name,
      type,
      params: webhookTemplateConfigModel,
      description,
    };

    replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
    expect(replaceTemplateResult).toBeDefined();
    expect(replaceTemplateResult.status).toBe(200);
    expect(replaceTemplateResult.result).toBeDefined();

    expect(replaceTemplateResult.result.type).toBe(type);
    expect(replaceTemplateResult.result.name).toBe(name);
    expect(replaceTemplateResult.result.description).toBe(description);

    const eventStreamsTemplateConfigModel = {
      body: eventStreamsTemplateBody,
    };

    name = 'eventstreams template name update';
    description = 'eventstreams template description update';
    type = 'event_streams.notification';
    replaceTemplateParams = {
      instanceId,
      id: eventStreamsTemplateID,
      name,
      type,
      params: eventStreamsTemplateConfigModel,
      description,
    };

    replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
    expect(replaceTemplateResult).toBeDefined();
    expect(replaceTemplateResult.status).toBe(200);
    expect(replaceTemplateResult.result).toBeDefined();

    expect(replaceTemplateResult.result.type).toBe(type);
    expect(replaceTemplateResult.result.name).toBe(name);
    expect(replaceTemplateResult.result.description).toBe(description);

    const pagerdutyTemplateConfigModel = {
      body: pagerdutyTemplateBody,
    };

    name = 'pagerduty template name update';
    description = 'pagerduty template description update';
    type = 'pagerduty.notification';
    replaceTemplateParams = {
      instanceId,
      id: pagerdutyTemplateID,
      name,
      type,
      params: pagerdutyTemplateConfigModel,
      description,
    };

    replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
    expect(replaceTemplateResult).toBeDefined();
    expect(replaceTemplateResult.status).toBe(200);
    expect(replaceTemplateResult.result).toBeDefined();

    expect(replaceTemplateResult.result.type).toBe(type);
    expect(replaceTemplateResult.result.name).toBe(name);
    expect(replaceTemplateResult.result.description).toBe(description);

    const codeEngineAppTemplateConfigModel = {
      body: codeEngineAppTemplateBody,
    };

    name = 'codeengine app template name update';
    description = 'codeengine app template description update';
    type = 'ibmceapp.notification';
    replaceTemplateParams = {
      instanceId,
      id: codeEngineApplicationTemplateID,
      name,
      type,
      params: codeEngineAppTemplateConfigModel,
      description,
    };

    replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
    expect(replaceTemplateResult).toBeDefined();
    expect(replaceTemplateResult.status).toBe(200);
    expect(replaceTemplateResult.result).toBeDefined();

    expect(replaceTemplateResult.result.type).toBe(type);
    expect(replaceTemplateResult.result.name).toBe(name);
    expect(replaceTemplateResult.result.description).toBe(description);

    const codeEngineJobTemplateConfigModel = {
      body: codeEngineJobTemplateBody,
    };

    name = 'codeengine job template name update';
    description = 'codeengine job template description update';
    type = 'ibmcejob.notification';
    replaceTemplateParams = {
      instanceId,
      id: codeEngineJobTemplateID,
      name,
      type,
      params: codeEngineJobTemplateConfigModel,
      description,
    };

    replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
    expect(replaceTemplateResult).toBeDefined();
    expect(replaceTemplateResult.status).toBe(200);
    expect(replaceTemplateResult.result).toBeDefined();

    expect(replaceTemplateResult.result.type).toBe(type);
    expect(replaceTemplateResult.result.name).toBe(name);
    expect(replaceTemplateResult.result.description).toBe(description);
  });

  test('createSubscription()', async () => {
    // Request models needed by this operation.

    // webhook
    const subscriptionCreateAttributesModel = {
      signing_enabled: false,
      template_id_notification: webhookTemplateID,
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

    // SMS
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

    // slack
    name = 'slack subscription';
    description = 'Subscription for the slack';
    params = {
      instanceId,
      name,
      destinationId: destinationId4,
      topicId,
      description,
      attributes: {
        attachment_color: '#0000FF',
        template_id_notification: slackTemplateID,
      },
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

    // PagerDuty
    name = 'PagerDuty subscription';
    description = 'Subscription for the PagerDuty';
    params = {
      instanceId,
      name,
      destinationId: destinationId10,
      topicId,
      description,
      attributes: {
        template_id_notification: pagerdutyTemplateID,
      },
    };

    const pdRes = await eventNotificationsService.createSubscription(params);
    expect(pdRes).toBeDefined();
    expect(pdRes.status).toBe(201);
    expect(pdRes.result).toBeDefined();
    expect(pdRes.result.name).toBe(name);
    expect(pdRes.result.description).toBe(description);
    subscriptionId10 = pdRes.result.id;

    const subscriptionSNowCreateAttributesModel = {
      assigned_to: 'user',
      assignment_group: 'test',
    };

    // ServiceNow
    name = 'ServiceNow subscription';
    description = 'Subscription for the ServiceNow';
    params = {
      instanceId,
      name,
      destinationId: destinationId11,
      topicId,
      description,
      attributes: subscriptionSNowCreateAttributesModel,
    };

    const sNowRes = await eventNotificationsService.createSubscription(params);
    expect(sNowRes).toBeDefined();
    expect(sNowRes.status).toBe(201);
    expect(sNowRes.result).toBeDefined();
    expect(sNowRes.result.name).toBe(name);
    expect(sNowRes.result.description).toBe(description);
    subscriptionId11 = sNowRes.result.id;

    // FCM V1
    name = 'FCM V1 subscription';
    description = 'Subscription for the V1 FCM';
    params = {
      instanceId,
      name,
      destinationId: destinationId12,
      topicId: topicId3,
      description,
    };

    const resFCMV1 = await eventNotificationsService.createSubscription(params);
    expect(resFCMV1).toBeDefined();
    expect(resFCMV1.status).toBe(201);
    expect(resFCMV1.result).toBeDefined();
    expect(resFCMV1.result.name).toBe(name);
    expect(resFCMV1.result.description).toBe(description);
    subscriptionId12 = resFCMV1.result.id;

    // code engine
    const subscriptionCECreateAttributesModel = {
      template_id_notification: codeEngineApplicationTemplateID,
    };

    name = 'subscription_code_engine';
    description = 'Subscription for code engine';
    params = {
      instanceId,
      name,
      destinationId: destinationId13,
      topicId,
      attributes: subscriptionCECreateAttributesModel,
      description,
    };

    const ceRes = await eventNotificationsService.createSubscription(params);
    expect(ceRes).toBeDefined();
    expect(ceRes.status).toBe(201);
    expect(ceRes.result).toBeDefined();
    expect(ceRes.result.name).toBe(name);
    expect(ceRes.result.description).toBe(description);
    subscriptionId13 = ceRes.result.id;

    name = 'COS subscription';
    description = 'Subscription for the COS destination';
    params = {
      instanceId,
      name,
      destinationId: destinationId14,
      topicId,
      description,
    };

    const cosRes = await eventNotificationsService.createSubscription(params);
    expect(cosRes).toBeDefined();
    expect(cosRes.status).toBe(201);
    expect(cosRes.result).toBeDefined();
    expect(cosRes.result.name).toBe(name);
    expect(cosRes.result.description).toBe(description);
    subscriptionId14 = cosRes.result.id;

    name = 'Huawei subscription';
    description = 'Subscription for the Huawei destination';
    params = {
      instanceId,
      name,
      destinationId: destinationId15,
      topicId,
      description,
    };

    const huaweiRes = await eventNotificationsService.createSubscription(params);
    expect(huaweiRes).toBeDefined();
    expect(huaweiRes.status).toBe(201);
    expect(huaweiRes.result).toBeDefined();
    expect(huaweiRes.result.name).toBe(name);
    expect(huaweiRes.result.description).toBe(description);
    subscriptionId15 = huaweiRes.result.id;

    const subscriptionCreateCustomAttributesModel = {
      invited: ['testuser@in.ibm.com'],
      add_notification_payload: true,
      reply_to_mail: 'tester1@gmail.com',
      reply_to_name: 'US news',
      from_name: 'IBM',
      from_email: 'test@test.event-notifications.test.cloud.ibm.com',
      template_id_notification: templateInvitationID,
      template_id_invitation: templateNotificationID,
    };

    name = 'subscription_custom_email';
    description = 'Subscription for custom email';
    params = {
      instanceId,
      name,
      destinationId: destinationId16,
      topicId,
      attributes: subscriptionCreateCustomAttributesModel,
      description,
    };

    const customEmailres = await eventNotificationsService.createSubscription(params);
    expect(customEmailres).toBeDefined();
    expect(customEmailres.status).toBe(201);
    expect(customEmailres.result).toBeDefined();
    expect(customEmailres.result.name).toBe(name);
    expect(customEmailres.result.description).toBe(description);
    subscriptionId16 = customEmailres.result.id;

    const SubscriptionCreateAttributesCustomSMSAttributes = {
      invited: ['+12064563059', '+12267054625'],
    };

    name = 'subscription_custom_sms';
    description = 'Subscription for custom sms';
    params = {
      instanceId,
      name,
      destinationId: destinationId17,
      topicId,
      attributes: SubscriptionCreateAttributesCustomSMSAttributes,
      description,
    };

    const resCustomSMS = await eventNotificationsService.createSubscription(params);
    expect(resCustomSMS).toBeDefined();
    expect(resCustomSMS.status).toBe(201);
    expect(resCustomSMS.result).toBeDefined();
    expect(resCustomSMS.result.name).toBe(name);
    expect(resCustomSMS.result.description).toBe(description);
    subscriptionId17 = resCustomSMS.result.id;

    // code engine
    const subscriptionCEJobCreateAttributesModel = {
      template_id_notification: codeEngineJobTemplateID,
    };

    name = 'subscription_code_engine_job';
    description = 'Subscription for code engine_job';
    params = {
      instanceId,
      name,
      destinationId: destinationId18,
      topicId,
      attributes: subscriptionCEJobCreateAttributesModel,
      description,
    };

    const ceJobRes = await eventNotificationsService.createSubscription(params);
    expect(ceJobRes).toBeDefined();
    expect(ceJobRes.status).toBe(201);
    expect(ceJobRes.result).toBeDefined();
    expect(ceJobRes.result.name).toBe(name);
    expect(ceJobRes.result.description).toBe(description);
    subscriptionId18 = ceJobRes.result.id;

    const channelCreateAttribute = {
      id: slackChannelID,
    };

    const channelDetails = [channelCreateAttribute];

    name = 'slack DM subscription';
    description = 'Subscription for the slack DM';
    params = {
      instanceId,
      name,
      destinationId: destinationId19,
      topicId,
      description,
      attributes: {
        channels: channelDetails,
        template_id_notification: slackTemplateID,
      },
    };

    const slackDMRes = await eventNotificationsService.createSubscription(params);
    expect(slackDMRes).toBeDefined();
    expect(slackDMRes.status).toBe(201);
    expect(slackDMRes.result).toBeDefined();
    expect(slackDMRes.result.name).toBe(name);
    expect(slackDMRes.result.description).toBe(description);
    subscriptionId19 = slackDMRes.result.id;

    name = 'Event Streams subscription';
    description = 'Subscription for the Event Streams';
    params = {
      instanceId,
      name,
      destinationId: destinationId20,
      topicId,
      description,
      attributes: {
        template_id_notification: eventStreamsTemplateID,
      },
    };

    const eventStreamsRes = await eventNotificationsService.createSubscription(params);
    expect(eventStreamsRes).toBeDefined();
    expect(eventStreamsRes.status).toBe(201);
    expect(eventStreamsRes.result).toBeDefined();
    expect(eventStreamsRes.result.name).toBe(name);
    expect(eventStreamsRes.result.description).toBe(description);
    subscriptionId20 = eventStreamsRes.result.id;

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

  test('listTemplates()', async () => {
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

      const res = await eventNotificationsService.listTemplates(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      expect(res.result).toBeDefined();
      offset += 1;
      if (res.result.total_count <= offset) {
        hasMore = false;
      }
    } while (hasMore);
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
      template_id_notification: webhookTemplateID,
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

    // email
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

    // slack
    name = 'slack subscription update';
    description = 'Subscription for the slack update';
    params = {
      instanceId,
      name,
      id: subscriptionId4,
      description,
      attributes: {
        attachment_color: '#0000FF',
        template_id_notification: slackTemplateID,
      },
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
    name = 'Firefoc subscription update';
    description = 'Subscription for the Firefox update';
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

    // PagerDuty
    name = 'Pager Duty subscription update';
    description = 'Subscription for the Pager Duty update';
    params = {
      instanceId,
      name,
      id: subscriptionId10,
      description,
      attributes: {
        template_id_notification: pagerdutyTemplateID,
      },
    };

    const pdRes = await eventNotificationsService.updateSubscription(params);
    expect(pdRes).toBeDefined();
    expect(pdRes.status).toBe(200);
    expect(pdRes.result).toBeDefined();
    expect(pdRes.result.name).toBe(name);
    expect(pdRes.result.description).toBe(description);

    // ServceNow
    const subscriptionSNowCreateAttributesModel = {
      assigned_to: 'user',
      assignment_group: 'test',
    };

    name = 'Service Now subscription update';
    description = 'Subscription for the Service Now update';
    params = {
      instanceId,
      name,
      id: subscriptionId11,
      description,
      attributes: subscriptionSNowCreateAttributesModel,
    };

    const sNowRes = await eventNotificationsService.updateSubscription(params);
    expect(sNowRes).toBeDefined();
    expect(sNowRes.status).toBe(200);
    expect(sNowRes.result).toBeDefined();
    expect(sNowRes.result.name).toBe(name);
    expect(sNowRes.result.description).toBe(description);

    // FCM
    name = 'FCM subscription V1 update';
    description = 'Subscription for the FCM V1 update';
    params = {
      instanceId,
      name,
      id: subscriptionId12,
      description,
    };

    const fcmRes = await eventNotificationsService.updateSubscription(params);
    expect(fcmRes).toBeDefined();
    expect(fcmRes.status).toBe(200);
    expect(fcmRes.result).toBeDefined();
    expect(fcmRes.result.name).toBe(name);
    expect(fcmRes.result.description).toBe(description);

    const subscriptionCEUpdateAttributesModel = {
      template_id_notification: codeEngineApplicationTemplateID,
    };

    name = 'code_engine_sub_updated';
    description = 'Update code engine subscription';
    params = {
      instanceId,
      id: subscriptionId13,
      name,
      description,
      attributes: subscriptionCEUpdateAttributesModel,
    };

    const ceRes = await eventNotificationsService.updateSubscription(params);
    expect(ceRes).toBeDefined();
    expect(ceRes.status).toBe(200);
    expect(ceRes.result).toBeDefined();
    expect(ceRes.result.name).toBe(name);
    expect(ceRes.result.description).toBe(description);

    name = 'COS Subscription update';
    description = 'Subscription for the COS destination update';
    params = {
      instanceId,
      name,
      id: subscriptionId14,
      description,
    };

    const cosRes = await eventNotificationsService.updateSubscription(params);
    expect(cosRes).toBeDefined();
    expect(cosRes.status).toBe(200);
    expect(cosRes.result).toBeDefined();
    expect(cosRes.result.name).toBe(name);
    expect(cosRes.result.description).toBe(description);

    name = 'Huawei Subscription update';
    description = 'Subscription for the Huawei destination update';
    params = {
      instanceId,
      name,
      id: subscriptionId15,
      description,
    };

    const huaweiRes = await eventNotificationsService.updateSubscription(params);
    expect(huaweiRes).toBeDefined();
    expect(huaweiRes.status).toBe(200);
    expect(huaweiRes.result).toBeDefined();
    expect(huaweiRes.result.name).toBe(name);
    expect(huaweiRes.result.description).toBe(description);

    const customeEmailUpdateAttributesInvited = {
      add: ['abc@gmail.com'],
    };

    const customEmailUpdateAttributesToRemove = {
      remove: ['tester3@ibm.com'],
    };

    const subscriptionUpdateCustomAttributesModel = {
      invited: customeEmailUpdateAttributesInvited,
      add_notification_payload: true,
      reply_to_mail: 'abc@gmail.com',
      reply_to_name: 'US news',
      from_name: 'IBM',
      from_email: 'test@test.event-notifications.test.cloud.ibm.com',
      subscribed: customEmailUpdateAttributesToRemove,
      unsubscribed: customEmailUpdateAttributesToRemove,
      template_id_notification: templateInvitationID,
      template_id_invitation: templateNotificationID,
    };

    const customEmailName = 'subscription_custom_email_updated';
    const customEmailDescription = 'Subscription for custom email updated';
    const customParams = {
      instanceId,
      name: customEmailName,
      id: subscriptionId16,
      attributes: subscriptionUpdateCustomAttributesModel,
      description: customEmailDescription,
    };

    const customEmailRes = await eventNotificationsService.updateSubscription(customParams);
    expect(customEmailRes).toBeDefined();
    expect(customEmailRes.status).toBe(200);
    expect(customEmailRes.result).toBeDefined();
    expect(customEmailRes.result.name).toBe(customEmailName);
    expect(customEmailRes.result.description).toBe(customEmailDescription);

    const customSMSUpdateAttributesInvited = {
      add: ['+12064512559'],
    };

    const customSMSUpdateAttributesToRemove = {
      remove: ['+12064512559'],
    };

    const SubscriptionUpdateAttributesCustomSMSUpdateAttributes = {
      invited: customSMSUpdateAttributesInvited,
      subscribed: customSMSUpdateAttributesToRemove,
      unsubscribed: customSMSUpdateAttributesToRemove,
    };

    const nameCustomSMS = 'subscription_custom_sms_update';
    const descriptionCustomSMS = 'Subscription for sms update';
    params = {
      instanceId,
      name: nameCustomSMS,
      id: subscriptionId17,
      attributes: SubscriptionUpdateAttributesCustomSMSUpdateAttributes,
      description: descriptionCustomSMS,
    };

    const resCustomSMS = await eventNotificationsService.updateSubscription(params);
    expect(resCustomSMS).toBeDefined();
    expect(resCustomSMS.status).toBe(200);
    expect(resCustomSMS.result).toBeDefined();
    expect(resCustomSMS.result.name).toBe(nameCustomSMS);
    expect(resCustomSMS.result.description).toBe(descriptionCustomSMS);

    const subscriptionCEJobUpdateAttributesModel = {
      template_id_notification: codeEngineJobTemplateID,
    };

    name = 'code_engine_job_sub_updated';
    description = 'Update code engine job subscription';
    params = {
      instanceId,
      id: subscriptionId18,
      name,
      description,
      attributes: subscriptionCEJobUpdateAttributesModel,
    };

    const ceJobRes = await eventNotificationsService.updateSubscription(params);
    expect(ceJobRes).toBeDefined();
    expect(ceJobRes.status).toBe(200);
    expect(ceJobRes.result).toBeDefined();
    expect(ceJobRes.result.name).toBe(name);
    expect(ceJobRes.result.description).toBe(description);

    const channelUpdateAttribute = {
      id: slackChannelID,
      operation: 'add',
    };

    const channelDetails = [channelUpdateAttribute];

    name = 'slack DM subscription update';
    description = 'Subscription for the slack DM update';
    params = {
      instanceId,
      id: subscriptionId19,
      name,
      description,
      attributes: {
        channels: channelDetails,
        template_id_notification: slackTemplateID,
      },
    };

    const slackDMRes = await eventNotificationsService.updateSubscription(params);
    expect(slackDMRes).toBeDefined();
    expect(slackDMRes.status).toBe(200);
    expect(slackDMRes.result).toBeDefined();
    expect(slackDMRes.result.name).toBe(name);
    expect(slackDMRes.result.description).toBe(description);

    name = 'Event Streams subscription update';
    description = 'Subscription for the Event Streams update';
    params = {
      instanceId,
      name,
      id: subscriptionId20,
      description,
      attributes: {
        template_id_notification: eventStreamsTemplateID,
      },
    };

    const eventStreamsRes = await eventNotificationsService.updateSubscription(params);
    expect(eventStreamsRes).toBeDefined();
    expect(eventStreamsRes.status).toBe(200);
    expect(eventStreamsRes.result).toBeDefined();
    expect(eventStreamsRes.result.name).toBe(name);
    expect(eventStreamsRes.result.description).toBe(description);
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

  test('getEnabledCountries()', async () => {
    const params = {
      instanceId,
      id: destinationId17,
    };

    const res = await eventNotificationsService.getEnabledCountries(params);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
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
      'android': {
        'notification': {
          'title': 'Alert message',
          'body': 'Bob wants to play Poker',
        },
        'data': {
          'name': 'Robert',
          'description': 'notification for the Poker',
        },
      },
    };

    const notificationHuaweiBodyMessageDataModel = {
      'android': {
        'notification': {
          'title': 'Alert message',
          'body': 'Bob wants to play Poker',
        },
        'data': {
          'name': 'Robert',
          'description': 'notification for the Poker',
        },
      },
    };

    // notificationFcmBodyModel
    const notificationFcmBodyModel = {
      message: notificationFcmBodyMessageDataModel,
    };

    const notificationHuaweiBodyModel = {
      message: notificationHuaweiBodyMessageDataModel,
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

    const uniqueID = '1234-1234-sdfs-234';
    const notificationSeverity = 'MEDIUM';
    const typeValue = 'com.acme.offer:new';
    const notificationsSouce = '1234-1234-sdfs-234:test';
    const htmlBody =
      '"Hi  ,<br/>Certificate expiring in 90 days.<br/><br/>Please login to <a href="https: //cloud.ibm.com/security-compliance/dashboard">Security and Complaince dashboard</a> to find more information<br/>"';
    const markdownContent =
      '**Event Summary** \n\n**Toolchain ID:** `4414af34-a5c7-47d3-8f05-add4af6d78a6`  \n**Content Type:** `application/json`\n\n---\n\n *Pipeline Run Details*\n\n- **Namespace:** `PR`\n- **Trigger Name:** `manual`\n- **Triggered By:** `nitish.kulkarni3@ibm.com`\n- **Build Number:** `343`\n- **Pipeline Link:** [View Pipeline Run](https://cloud.ibm.com/devops/pipelines/tekton/e9cd5aa3-a3f2-4776-8acc-26a35922386e/runs/f29ac6f5-bd2f-4a26-abb8-4249be8dbab7?env_id=ibm:yp:us-south)';
    const mms =
      '{"content": "iVBORw0KGgoAAAANSUhEUgAAAFoAAAA4CAYAAAB9lO9TAAAAAXNSR0IArs4c6QAAActpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgSW1hZ2VSZWFkeTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KKS7NPQAABO9JREFUeAHtW81x2zoQBhgn46NLYCpISpA6cCowfYjn3ZJUELmC5Og4h0AVPKeC8HWgDh5L8DGTTMR8KxoSBCzAX3us8WKGJrg/34KfqF2AkJWSJgwIA8KAMCAMCAPCgDAgDAgDwoAw8LQZ0GfFRT2egrpcmq9zwpkGzx9RXWqllsZ8Nb7GXg+Pq83SfDm3OKlzUVy8B1mfUjYxXRZTPC65ntVKfwOZ/xfFP7Npx1afFkVx0gUTJJ91seNsjvCkXHKKnrLK2k+EZ+GY83oGYlbGmFtXOS7uMRG9h+di2z5ifEefDmmPlQE9zVfxzy3y54puchq8rnT93D7Z4+PusLjoY/GParX+wQH3lJWwn5PPRHgE1dq0evEBRp/JcGxcrZ6fA8YQlt+K4u3rsfgHUgz9W2+uxxQnHxHF9p0vs9fQDS6CFgPFMNs8iVYw7PxnW0imwes/ivuMq1W9VOqZFMH+H8vDe2guJCbmC07eyLLSmKsyrg81aby6Si1E0r4UK8NM76oKo1JhTt0H56FQ1K83Od9qkZ8LpXSuerVwTEecP3LfR05OMq3WdCrpT9eWwgNGicPgYFuLL8Yz3JcLiNnFjfvBIT/TSvCEs43JMKYSusrVH3QxpBtxSXFvbHh/fWp98Y2gfi+Sra9/Zp/olsJS+SBt12m8XSHlcO7Pl4tGMnc82QpP5zxmGZf/XMV1orlXBvCBhe2sePsjlDYSOCTfonF+KTzOvotMK/3dL1y+39C4hA2sqlZ1dG7tx3KvwdEHu1K2cjZ1oOTNrAFz/o+RtYiSeC2+rLpS6pdhNXvCYXFRgHPA4Osf9b+FPpG7s0B3iMUQebN+gzkd3eyIVpdwriIAOeSnER3E+iauE40w8BQYQN4OW2pbCA6XKEKL0CsuSeHFvaIaSh3nfrHhrNNxm+032rWBb875czJMN18qtS6Qxz9yepLRlNRfPR9ijsYrS/0vdlmCghO78RZ5n3y7t2pswd1TR2Ydm0KxZ+hcVE6/YzeJ1xHDN3vxHpKFL92/TsXVK7KlN3N4Ol/v+/FXmPYtG01d4Vw2fe6vu+jh9CK7NwaQcsPWsm2Dt21XVegVl6TxdttgHMJD+DZp6Ljtqd7eN8aUY6x0RFq4LcamjtS2DT6ZS6AvIhFYcQoPDiWOOesIYdoXo6Fvf6Slfd24z/MWW0ox5whjmlBtxfCY7qdsbJu/h1gM3fHTZnC+JxhwcTeDqdKuv2/S+rSWfaLxiFzG3bIyruM1abzo6mwD1uLLB7yTtvhWrjNsaaM3kj5oc8JdiWbl3Xt5F8LtV+6F9B+QAfyu42IxPt5uO2oavO4jsoun/nF3Y7bRYttWNsbOjn6WtsbRveF3HfEVTneYTeI3ZD8RXtfQKxguyHhA3BJuBofT9AmDw+Tm9Yyxc3DC7kEXQ+TVZXhLYyRZQOpUMQ78dx27LaP0lhdHfrh6o/UBZjFz19p/Z9HoMoMPoHTtpP9IGMAP0ePbVt3HqFdLc03TI/wQfQq8dGStnuHt3VXlWvWPuxuzi0N9i4WnNtiSIj0VTeToM+p3bZhHR7drumLADmG3bQq8LZjfqZAiApIbo75x3TH7YfQJJDlmG1RsmaZzCGc4Ojd2wdLZ++EMb7AExmZs/F8rphwKFUC8in01JaZgCQPCgDAgDAgDwoAwIAwIA8KAMCAMPHUG/gKC0oz7fm25ogAAAABJRU5ErkJggg==", "content_type": "image/png"}';
    const notificationCreateModel = {
      instanceId,
      ibmenseverity: notificationSeverity,
      id: uniqueID,
      source: notificationsSouce,
      ibmensourceid: sourceId,
      type: typeValue,
      time: '2019-01-01T12:00:00.000Z',
      ibmenmailto: JSON.stringify(['abc@ibm.com', 'def@us.ibm.com']),
      ibmensmsto: JSON.stringify(['+911234567890', '+911224567890']),
      ibmensmstext: 'this is a sample text message',
      ibmenslackto: JSON.stringify(['C07FALXBH4G', 'C07FALXBU4G']),
      ibmenmms: JSON.stringify(mms),
      ibmentemplates: JSON.stringify([slackTemplateID]),
      ibmensubject: 'certificate expire',
      ibmenhtmlbody: htmlBody,
      ibmenmarkdown: markdownContent,
      ibmenpushto: JSON.stringify(notificationFcmDevicesModel),
      ibmenfcmbody: JSON.stringify(notificationFcmBodyModel),
      ibmenapnsbody: JSON.stringify(notificationApnsBodyModel),
      ibmenhuaweibody: JSON.stringify(notificationHuaweiBodyModel),
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
      id: uniqueID,
      source: notificationsSouce,
      ibmensourceid: sourceId,
      type: typeValue,
      time: '2019-01-01T12:00:00.000Z',
      ibmenpushto: JSON.stringify(notificationFcmDevicesModel),
      ibmenmailto: JSON.stringify(['abc@ibm.com', 'def@us.ibm.com']),
      ibmensubject: 'EventNotifiations Testing',
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
    notificationID = newres.notification_id;

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

  test('getMetrics()', async () => {
    const destination_type = 'smtp_custom';
    const gte = '2024-08-01T17:18:43Z';
    const lte = '2024-08-02T11:55:22Z';
    const email_to = 'testuser@in.ibm.com';
    const subject = 'Test Metrics Subject';
    const getMetricsParams = {
      instanceId,
      destinationType: destination_type,
      gte,
      lte,
      destinationId: destinationId16,
      emailTo: email_to,
      notificationId: notificationID,
      subject,
    };

    const res = await eventNotificationsService.getMetrics(getMetricsParams);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createSMTPConfiguration()', async () => {
    const name = 'SMTP Configuration';
    const domain = 'test.event-notifications.test.cloud.ibm.com';
    const description = 'SMTP Configuration description';
    const createSmtpConfigurationParams = {
      instanceId,
      name,
      domain,
      description,
    };

    const res = await eventNotificationsService.createSmtpConfiguration(
      createSmtpConfigurationParams
    );
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();

    expect(res.result.name).toBe(name);
    expect(res.result.domain).toBe(domain);
    expect(res.result.description).toBe(description);
    smtpConfigID = res.result.id;
  });

  test('verifySMTP()', async () => {
    const type = 'dkim,spf,en_authorization';
    const updateVerifySmtpParams = {
      instanceId,
      id: smtpConfigID,
      type,
    };

    const res = await eventNotificationsService.updateVerifySmtp(updateVerifySmtpParams);

    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result).toBeDefined();
  });

  test('createSMTPUser()', async () => {
    const description = 'SMTP user description';
    const createSmtpUserParams = {
      instanceId,
      id: smtpConfigID,
      description,
    };

    const res = await eventNotificationsService.createSmtpUser(createSmtpUserParams);
    expect(res).toBeDefined();
    expect(res.status).toBe(201);
    expect(res.result).toBeDefined();
    expect(res.result.username).toBeDefined();
    expect(res.result.password).toBeDefined();
    expect(res.result.domain).toBeDefined();
    smtpUserID = res.result.id;
  });

  test('listSMTPConfigurations()', async () => {
    const limit = 1;
    const offset = 0;
    const search = '';
    const listSmtpConfigurationsParams = {
      instanceId,
      limit,
      offset,
      search,
    };

    const res = await eventNotificationsService.listSmtpConfigurations(
      listSmtpConfigurationsParams
    );
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result.total_count).toBe(1);
  });

  test('listSMTPUsers()', async () => {
    const limit = 1;
    const offset = 0;
    const search = '';
    const listSmtpUsersParams = {
      instanceId,
      id: smtpConfigID,
      limit,
      offset,
      search,
    };

    const res = await eventNotificationsService.listSmtpUsers(listSmtpUsersParams);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result.total_count).toBe(1);
  });

  test('getSMTPConfiguration()', async () => {
    const getSmtpConfigurationParams = {
      instanceId,
      id: smtpConfigID,
    };

    const res = await eventNotificationsService.getSmtpConfiguration(getSmtpConfigurationParams);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result.domain).toBeDefined();
    expect(res.result.name).toBeDefined();
    expect(res.result.description).toBeDefined();
    expect(res.result.config.dkim).toBeDefined();
    expect(res.result.config.spf).toBeDefined();
    expect(res.result.config.en_authorization).toBeDefined();
  });

  test('getSMTPAllowedIPs()', async () => {
    const getSmtpAllowedIpsParams = {
      instanceId,
      id: smtpConfigID,
    };

    const res = await eventNotificationsService.getSmtpAllowedIps(getSmtpAllowedIpsParams);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result.subnets[0]).toBeDefined();
  });

  test('getSMTPUser()', async () => {
    const getSmtpUserParams = {
      instanceId,
      id: smtpConfigID,
      userId: smtpUserID,
    };

    const res = await eventNotificationsService.getSmtpUser(getSmtpUserParams);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result.domain).toBeDefined();
    expect(res.result.description).toBeDefined();
    expect(res.result.username).toBeDefined();
  });

  test('updateSMTPConfiguration()', async () => {
    const name = 'SMTP configuration update';
    const description = 'SMTP description update';
    const updateSmtpConfigurationParams = {
      instanceId,
      id: smtpConfigID,
      name,
      description,
    };

    const res = await eventNotificationsService.updateSmtpConfiguration(
      updateSmtpConfigurationParams
    );
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result.name).toBe(name);
    expect(res.result.description).toBe(description);
  });

  test('updateSMTPUser()', async () => {
    const description = 'SMTP description update';
    const updateSmtpUserParams = {
      instanceId,
      id: smtpConfigID,
      userId: smtpUserID,
      description,
    };

    const res = await eventNotificationsService.updateSmtpUser(updateSmtpUserParams);
    expect(res).toBeDefined();
    expect(res.status).toBe(200);
    expect(res.result.description).toBe(description);
  });

  test('listPredefinedTemplates()', async () => {
    const source = 'logs';
    const type = 'slack.notification';
    const listPreDefinedTemplatesParams = {
      instanceId,
      source,
      type,
    };

    const res = await eventNotificationsService.listPreDefinedTemplates(
      listPreDefinedTemplatesParams
    );

    expect(res).toBeDefined();
    expect(res.status).toBe(200);
  });

  test('getPredefinedTemplate()', async () => {
    const id = '0cacb9a0-d43a-4042-920d-d4a3f7d4cbd5'; // from dev

    const getPreDefinedTemplateParams = {
      instanceId,
      id,
    };

    const res = await eventNotificationsService.getPreDefinedTemplate(getPreDefinedTemplateParams);

    expect(res).toBeDefined();
    expect(res.status).toBe(200);
  });

  test('deleteSMTPUser()', async () => {
    const userIDs = [smtpUserID];

    for (let i = 0; i < userIDs.length; i += 1) {
      const deleteSmtpUserParams = {
        instanceId,
        id: smtpConfigID,
        userId: userIDs[i],
      };

      const res = await eventNotificationsService.deleteSmtpUser(deleteSmtpUserParams);
      expect(res).toBeDefined();
      expect(res.status).toBe(204);
      expect(res.result).toBeDefined();
    }
  });

  test('deleteSMTPConfiguration()', async () => {
    const smtpConfigIDs = [smtpConfigID];

    for (let i = 0; i < smtpConfigIDs.length; i += 1) {
      const deleteSmtpConfigurationParams = {
        instanceId,
        id: smtpConfigIDs[i],
      };

      const res = await eventNotificationsService.deleteSmtpConfiguration(
        deleteSmtpConfigurationParams
      );
      expect(res).toBeDefined();
      expect(res.status).toBe(204);
      expect(res.result).toBeDefined();
    }
  });

  test('deleteSubscription()', async () => {
    const subscriptions = [
      subscriptionId,
      subscriptionId1,
      subscriptionId2,
      subscriptionId4,
      subscriptionId5,
      subscriptionId6,
      subscriptionId8,
      subscriptionId9,
      subscriptionId10,
      subscriptionId11,
      subscriptionId12,
      subscriptionId13,
      subscriptionId14,
      subscriptionId15,
      subscriptionId16,
      subscriptionId17,
      subscriptionId18,
      subscriptionId19,
      subscriptionId20,
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

    params = {
      instanceId,
      id: topicId4,
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
      destinationId4,
      destinationId5,
      destinationId6,
      destinationId8,
      destinationId9,
      destinationId10,
      destinationId11,
      destinationId12,
      destinationId13,
      destinationId14,
      destinationId15,
      destinationId16,
      destinationId17,
      destinationId18,
      destinationId19,
      destinationId20,
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

  test('deleteTemplate()', async () => {
    const templates = [
      templateInvitationID,
      templateNotificationID,
      slackTemplateID,
      webhookTemplateID,
      pagerdutyTemplateID,
      eventStreamsTemplateID,
      codeEngineApplicationTemplateID,
      codeEngineJobTemplateID,
    ];

    for (let i = 0; i < templates.length; i += 1) {
      const params = {
        instanceId,
        id: templates[i],
      };

      const res = await eventNotificationsService.deleteTemplate(params);
      expect(res).toBeDefined();
      expect(res.status).toBe(204);
      expect(res.result).toBeDefined();
    }
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
