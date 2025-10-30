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
let destinationId22 = '';
let subscriptionId = '';
let subscriptionId1 = '';
let subscriptionId2 = '';
let subscriptionId3 = '';
let subscriptionId4 = '';
let subscriptionId5 = '';
let subscriptionId6 = '';
let subscriptionId7 = '';
let subscriptionId8 = '';
let subscriptionId9 = '';
let subscriptionId10 = '';
const subscriptionId22 = '';
let fcmServerKey = '';
let fcmSenderId = '';
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
let huaweiClientId = '';
let huaweiClientSecret = '';
let templateInvitationID = '';
let templateNotificationID = '';
let slackTemplateID = '';
let templateBody = '';
let slackTemplateBody = '';
let cosInstanceCRN = '';
let cosIntegrationId = '';
const cosEndPoint = '';
const cosBucketName = '';
let cosInstanceId = '';
let codeEngineProjectCRN = '';
let smtpConfigID = '';
let smtpUserID = '';
let notificationID = '';
let slackDmToken = '';
let slackChannelID = '';
let webhookTemplateID = '';
let webhookTemplateBody = '';
let pagerdutyTemplateID = '';
let pagerdutyTemplateBody = '';
let eventStreamsTemplateID = '';
let eventStreamsTemplateBody = '';
let eventStreamsCRN = '';
let eventStreamsTopic = '';
let eventStreamsEndPoint = '';
let appConfigTemplateBody = '';
let appConfigCRN = '';
let appConfigTemplateID = '';
let smtpUserToClone = '';
let smtpUserID2 = '';

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
  templateBody = config.templateBody;
  cosInstanceCRN = config.cosInstanceCRN;
  cosInstanceId = config.cosInstance;
  codeEngineProjectCRN = config.codeEngineProjectCrn;
  slackTemplateBody = config.slackTemplateBody;
  slackDmToken = config.slackDmToken;
  slackChannelID = config.slackChannelId;
  webhookTemplateBody = config.webhookTemplateBody;
  pagerdutyTemplateBody = config.pagerdutyTemplateBody;
  eventStreamsTemplateBody = config.eventStreamsTemplateBody;
  eventStreamsCRN = config.eventStreamsCrn;
  eventStreamsTopic = config.eventStreamsTopic;
  eventStreamsEndPoint = config.eventStreamsEndpoint;
  appConfigTemplateBody = config.appConfigTemplateBody;
  appConfigCRN = config.appConfigCrn;
  smtpUserToClone = config.smtpUserToClone;

  let eventNotificationsService = EventNotificationsV1.newInstance({});

  test('Initialize services', async () => {
    // begin-common

    eventNotificationsService = EventNotificationsV1.newInstance({});

    // end-common
  });

  test('createIntegration request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createIntegration() result:');
    // begin-create_integration
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
    let res;
    try {
      res = await eventNotificationsService.createIntegration(params);
      console.log(JSON.stringify(res.result, null, 2));
      cosIntegrationId = res.result.id;
    } catch (err) {
      console.warn(err);
    }
    // end-create_integration
  });

  test('listIntegrations request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listIntegrations() result:');
    // begin-list_integrations
    const offset = 0;
    const limit = 1;
    const search = '';

    const params = {
      instanceId,
      offset,
      limit,
      search,
    };

    let res;
    try {
      res = await eventNotificationsService.listIntegrations(params);
      console.log(JSON.stringify(res.result, null, 2));
      integrationId = res.result.integrations[0].id;
    } catch (err) {
      console.warn(err);
    }
    // end-list_integrations
  });

  test('getIntegration request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getIntegration() result:');
    // begin-get_integration
    const params = {
      instanceId,
      id: integrationId,
    };

    let res;
    try {
      res = await eventNotificationsService.getIntegration(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_integration
  });

  test('updateIntegration request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateIntegration() result:');
    // begin-replace_integration

    let metadata = {
      endpoint: 'https://private.us-south.kms.cloud.ibm.com',
      crn: 'insert crn',
      root_key_id: 'insert root key id',
    };

    let params = {
      instanceId,
      id: integrationId,
      type: 'kms/hs-crypto',
      metadata,
    };

    let res;
    try {
      res = await eventNotificationsService.replaceIntegration(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // COS integration

    metadata = {
      endpoint: cosEndPoint,
      crn: cosInstanceCRN,
      bucket_name: cosBucketName,
    };

    params = {
      instanceId,
      id: cosIntegrationId,
      type: 'collect_failed_events',
      metadata,
    };

    try {
      res = await eventNotificationsService.replaceIntegration(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-replace_integration
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
    let destinationConfigParamsModel = {
      server_key: fcmServerKey,
      sender_id: fcmSenderId,
    };

    let destinationConfigModel = {
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

    // chrome
    const destinationConfigModelChrome = {
      params: {
        website_url: 'https://cloud.ibm.com',
        api_key: 'apikey',
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
        api_key: 'insert API key here',
        routing_key: 'insert Routing Key here',
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

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId11 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    destinationConfigParamsModel = {
      private_key: fcmPrivateKey,
      project_id: fcmProjectId,
      client_email: fcmClientEmail,
    };

    destinationConfigModel = {
      params: destinationConfigParamsModel,
    };

    name = 'FCM_V1_destination';
    description = 'FCM V1 Destination';
    type = 'push_android';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationConfigModel,
    };

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId12 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId13 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    const cosdestinationConfigModel = {
      params: {
        bucket_name: 'encosbucket',
        instance_id: 'e8a6b5a3-3ff4-xxxx-xxxx-ea86a4d4a3b6',
        endpoint: 'https://s3.us-west.cloud-object-storage.test.appdomain.cloud',
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

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId14 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId15 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    const customdestinationConfigModel = {
      params: {
        domain: 'abc.event-notifications.test.cloud.ibm.com',
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

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId16 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    name = 'Custom_sms_destination';
    description = 'Custom sms Destination';
    type = 'sms_custom';
    let collectFailedEvents = false;

    collectFailedEvents = false;
    params = {
      instanceId,
      name,
      type,
      description,
      collectFailedEvents,
    };

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId17 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId18 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      res = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
      destinationId19 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      const eventStreamsRes = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(eventStreamsRes.result, null, 2));
      destinationId20 = eventStreamsRes.result.id;
    } catch (err) {
      console.warn(err);
    }

    const destinationAppConfigParamsModel = {
      crn: appConfigCRN,
      type: 'features',
      environment_id: 'dev',
      feature_id: 'flag_test',
    };

    const destinationAppConfigModel = {
      params: destinationAppConfigParamsModel,
    };

    name = 'app_config_destination';
    description = 'app_config Destination';
    type = 'app_configuration';
    params = {
      instanceId,
      name,
      type,
      description,
      config: destinationAppConfigModel,
    };

    try {
      const appConfigRes = await eventNotificationsService.createDestination(params);
      console.log(JSON.stringify(appConfigRes.result, null, 2));
      destinationId22 = appConfigRes.result.id;
    } catch (err) {
      console.warn(err);
    }
    // end-create_destination
  });

  test('testDestination()', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('testDestination() result:');
    // begin-test_destination
    const testDestinationParams = {
      instanceId,
      id: destinationId10,
    };
    try {
      const testDestinationResult =
        await eventNotificationsService.testDestination(testDestinationParams);
      console.log(JSON.stringify(testDestinationResult.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-test_destination
  });

  test('testDWebhookestination()', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('testDWebhookestination() result:');
    // begin-test_webhhook_destination
    let webhookNotificationId;
    const testDestinationParams = {
      instanceId,
      id: destinationId,
    };

    try {
      const testDestinationResult =
        await eventNotificationsService.testDestination(testDestinationParams);
      webhookNotificationId = testDestinationResult.result.notification_id;
      console.log(JSON.stringify(testDestinationResult.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    const getNotificationsStatusParams = {
      instanceId,
      id: webhookNotificationId,
    };

    const getNotificationsStatusResult = await eventNotificationsService.getNotificationsStatus(
      getNotificationsStatusParams
    );
    // end-test_webhhook_destination
  });

  test('createTemplate()', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createTemplate() result:');
    // begin-create_template
    const templateConfigModel = {
      params: {
        body: templateBody,
        subject: 'Hi this is invitation for invitation message',
      },
    };
    let name = 'template name invitation';
    let description = 'template destination';
    let type = 'smtp_custom.invitation';
    let createTemplateParams = {
      instanceId,
      name,
      type,
      templateConfigModel,
      description,
    };
    let createTemplateResult;
    try {
      createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
      console.log(JSON.stringify(createTemplateResult.result, null, 2));
      templateInvitationID = createTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

    name = 'template name notification';
    description = 'template destination';
    type = 'smtp_custom.notification';
    createTemplateParams = {
      instanceId,
      name,
      type,
      templateConfigModel,
      description,
    };

    try {
      createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
      console.log(JSON.stringify(createTemplateResult.result, null, 2));
      templateNotificationID = createTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
      console.log(JSON.stringify(createTemplateResult.result, null, 2));
      slackTemplateID = createTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
      console.log(JSON.stringify(createTemplateResult.result, null, 2));
      webhookTemplateID = createTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
      console.log(JSON.stringify(createTemplateResult.result, null, 2));
      pagerdutyTemplateID = createTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
      console.log(JSON.stringify(createTemplateResult.result, null, 2));
      eventStreamsTemplateID = createTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

    const appConfigTemplateConfigModel = {
      body: appConfigTemplateBody,
    };

    name = 'App Config template name';
    description = 'App Config template description';
    type = 'app_configuration.notification';
    createTemplateParams = {
      instanceId,
      name,
      type,
      params: appConfigTemplateConfigModel,
      description,
    };

    try {
      createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
      console.log(JSON.stringify(createTemplateResult.result, null, 2));
      appConfigTemplateID = createTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }
    // end-create_template
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

  test('getTemplate()', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getTemplate() result:');
    // begin-get_template
    const params = {
      instanceId,
      id: templateInvitationID,
    };

    let res;
    try {
      res = await eventNotificationsService.getTemplate(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_template
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
    let destinationConfigParamsModel = {
      server_key: fcmServerKey,
      sender_id: fcmSenderId,
    };

    // FCM
    let destinationConfigModel = {
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
        password: 'password',
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
    // chrome
    const destinationConfigModelChrome = {
      params: {
        website_url: 'https://cloud.ibm.com',
        api_key: 'apikey',
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
      },
    };

    name = 'Firefox_destination_update';
    description = 'Firefox Destination updated';

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
        api_key: 'insert API Key here',
        routing_key: 'insert Routing Key here',
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

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // FCM V1

    destinationConfigParamsModel = {
      private_key: fcmPrivateKey,
      project_id: fcmProjectId,
      client_email: fcmClientEmail,
    };

    destinationConfigModel = {
      params: destinationConfigParamsModel,
    };

    params = {
      instanceId,
      id: destinationId12,
      name: 'Admin FCM V1 Compliance',
      description:
        'This destination is for creating admin FCM V1 to receive compliance notifications',
      config: destinationConfigModel,
    };

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

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

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    const destinationConfigModelCOS = {
      params: {
        bucket_name: 'encosbucket',
        instance_id: 'e8a6b5a3-xxxx-xxxx-ad88-ea86a4d4a3b6',
        endpoint: 'https://s3.us-west.cloud-object-storage.test.appdomain.cloud',
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

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

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

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    const customDestinationConfigModel = {
      params: {
        domain: 'abc.event-notifications.test.cloud.ibm.com',
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

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    const updateSpfVerifyDestinationParams = {
      instanceId,
      id: destinationId16,
      type: 'spf/dkim',
    };

    try {
      res = await eventNotificationsService.updateVerifyDestination(
        updateSpfVerifyDestinationParams
      );
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    name = 'custom_sms_destination_update';
    description = 'custom sms Destination_update';

    params = {
      instanceId,
      id: destinationId17,
      name,
      description,
    };

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

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

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

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

    try {
      res = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

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

    try {
      const eventStreamsRes = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(eventStreamsRes.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    const destAppConfigParamsModel = {
      crn: appConfigCRN,
      type: 'features',
      environment_id: 'dev',
      feature_id: 'flag_test',
    };

    const destinationAppConfigParamsModel = {
      params: destAppConfigParamsModel,
    };

    name = 'App Config updated';
    description = 'This destination is for App config';

    params = {
      instanceId,
      id: destinationId22,
      name,
      description,
      config: destinationAppConfigParamsModel,
    };

    try {
      const appConfigRes = await eventNotificationsService.updateDestination(params);
      console.log(JSON.stringify(appConfigRes.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-update_destination
  });

  test('updateTemplate()', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateTemplate() result:');
    // begin-update_template
    const templateConfigModel = {
      params: {
        body: templateBody,
        subject: 'Hi this is invitation for invitation message',
      },
    };
    let name = 'template name invitation update';
    let description = 'template destination update';
    let type = 'smtp_custom.invitation';
    let replaceTemplateParams = {
      instanceId,
      name,
      type,
      params: templateConfigModel,
      description,
    };
    let replaceTemplateResult;
    try {
      replaceTemplateResult =
        await eventNotificationsService.replaceTemplate(replaceTemplateParams);
      console.log(JSON.stringify(replaceTemplateResult.result, null, 2));
      templateInvitationID = replaceTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

    name = 'template name notification update';
    description = 'template destination update';
    type = 'smtp_custom.notification';
    replaceTemplateParams = {
      instanceId,
      name,
      type,
      params: templateConfigModel,
      description,
    };

    try {
      replaceTemplateResult =
        await eventNotificationsService.replaceTemplate(replaceTemplateParams);
      console.log(JSON.stringify(replaceTemplateResult.result, null, 2));
      templateNotificationID = replaceTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      replaceTemplateResult =
        await eventNotificationsService.replaceTemplate(replaceTemplateParams);
      console.log(JSON.stringify(replaceTemplateResult.result, null, 2));
      slackTemplateID = replaceTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      replaceTemplateResult =
        await eventNotificationsService.replaceTemplate(replaceTemplateParams);
      console.log(JSON.stringify(replaceTemplateResult.result, null, 2));
      webhookTemplateID = replaceTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      replaceTemplateResult =
        await eventNotificationsService.replaceTemplate(replaceTemplateParams);
      console.log(JSON.stringify(replaceTemplateResult.result, null, 2));
      webhookTemplateID = replaceTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

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
    try {
      replaceTemplateResult =
        await eventNotificationsService.replaceTemplate(replaceTemplateParams);
      console.log(JSON.stringify(replaceTemplateResult.result, null, 2));
      eventStreamsTemplateID = replaceTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }

    const appConfigJobTemplateConfigModel = {
      body: appConfigTemplateBody,
    };

    name = 'app config template name update';
    description = 'app config template description update';
    type = 'app_configuration.notification';
    replaceTemplateParams = {
      instanceId,
      id: appConfigTemplateID,
      name,
      type,
      params: appConfigJobTemplateConfigModel,
      description,
    };

    try {
      replaceTemplateResult =
        await eventNotificationsService.replaceTemplate(replaceTemplateParams);
      console.log(JSON.stringify(replaceTemplateResult.result, null, 2));
      appConfigTemplateID = replaceTemplateResult.result.id;
    } catch (err) {
      console.warn(err);
    }
    // end-update_template
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
      template_id_notification: webhookTemplateID,
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

    // ServiceNow
    const subscriptionSNowCreateAttributesModel = {
      assigned_to: 'user',
      assignment_group: 'group',
    };

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

    try {
      res = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
      subscriptionId4 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      res = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
      subscriptionId5 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

    const subscriptionCreateCustomAttributesModel = {
      invited: ['abc@gmail.com', 'tester3@ibm.com'],
      add_notification_payload: true,
      reply_to_mail: 'tester1@gmail.com',
      reply_to_name: 'US news',
      from_name: 'IBM',
      from_email: 'test@xyz.event-notifications.test.cloud.ibm.com',
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

    try {
      res = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
      subscriptionId6 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    let resCustomSMS;
    try {
      resCustomSMS = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(resCustomSMS.result, null, 2));
      subscriptionId7 = resCustomSMS.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      res = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
      subscriptionId8 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

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

    try {
      res = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
      subscriptionId9 = res.result.id;
    } catch (err) {
      console.warn(err);
    }

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
    try {
      const eventStreamsRes = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(eventStreamsRes.result, null, 2));
      subscriptionId10 = eventStreamsRes.result.id;
    } catch (err) {
      console.warn(err);
    }

    name = 'App Configuration subscription';
    description = 'Subscription for App Configuration';
    params = {
      instanceId,
      name,
      destinationId: destinationId22,
      topicId,
      description,
      attributes: {
        feature_flag_enabled: true,
      },
    };

    try {
      const appConfigRes = await eventNotificationsService.createSubscription(params);
      console.log(JSON.stringify(appConfigRes.result, null, 2));
      subscriptionId10 = appConfigRes.result.id;
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

  test('listTemplates()', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listTemplates() result:');
    // begin-list_templates
    const params = {
      instanceId,
    };

    let res;
    try {
      res = await eventNotificationsService.listTemplates(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-list_templates
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
      template_id_notification: webhookTemplateID,
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

    // ServceNow
    const subscriptionSNowCreateAttributesModel = {
      assigned_to: 'user',
      assignment_group: 'group',
    };

    name = 'Service Now subscription update';
    description = 'Subscription for the Service Now update';
    params = {
      instanceId,
      name,
      id: subscriptionId4,
      description,
      attributes: subscriptionSNowCreateAttributesModel,
    };

    try {
      res = await eventNotificationsService.updateSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // slack
    name = 'slack subscription update';
    description = 'Subscription for the slack update';
    params = {
      instanceId,
      name,
      id: subscriptionId5,
      description,
      attributes: {
        attachment_color: '#0000FF',
        template_id_notification: slackTemplateID,
      },
    };

    try {
      res = await eventNotificationsService.updateSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

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
      from_email: 'test@xyz.event-notifications.test.cloud.ibm.com',
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
      id: subscriptionId6,
      attributes: subscriptionUpdateCustomAttributesModel,
      description: customEmailDescription,
    };

    try {
      res = await eventNotificationsService.updateSubscription(customParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

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
      id: subscriptionId7,
      attributes: SubscriptionUpdateAttributesCustomSMSUpdateAttributes,
      description: descriptionCustomSMS,
    };

    try {
      res = await eventNotificationsService.updateSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    const channelUpdateAttribute = {
      id: slackChannelID,
      operation: 'add',
    };

    const channelDetails = [channelUpdateAttribute];

    name = 'slack DM subscription update';
    description = 'Subscription for the slack DM update';
    params = {
      instanceId,
      id: subscriptionId8,
      name,
      description,
      attributes: {
        channels: channelDetails,
        template_id_notification: slackTemplateID,
      },
    };

    try {
      res = await eventNotificationsService.updateSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    // PagerDuty
    name = 'Pager Duty subscription update';
    description = 'Subscription for the Pager Duty update';
    params = {
      instanceId,
      name,
      id: subscriptionId9,
      description,
      attributes: {
        template_id_notification: pagerdutyTemplateID,
      },
    };

    try {
      res = await eventNotificationsService.updateSubscription(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    name = 'Event Streams subscription update';
    description = 'Subscription for the Event Streams update';
    params = {
      instanceId,
      name,
      id: subscriptionId10,
      description,
      attributes: {
        template_id_notification: eventStreamsTemplateID,
      },
    };
    try {
      const eventStreamsRes = await eventNotificationsService.updateSubscription(params);
      console.log(JSON.stringify(eventStreamsRes.result, null, 2));
    } catch (err) {
      console.warn(err);
    }

    name = 'App configuration subscription update';
    description = 'Subscription for the App configuration update';
    params = {
      instanceId,
      name,
      id: subscriptionId22,
      description,
      attributes: {
        template_id_notification: appConfigTemplateID,
      },
    };

    try {
      const appConfigRes = await eventNotificationsService.updateSubscription(params);
      console.log(JSON.stringify(appConfigRes.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-update_subscription
  });

  test('getEnabledCountries()', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getEnabledCountries() result:');
    // begin-get_enabled_countries
    const params = {
      instanceId,
      id: destinationId17,
    };

    let res;
    try {
      res = await eventNotificationsService.getEnabledCountries(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_enabled_countries
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

    const uniqueID = '1234-1234-sdfs-234';
    const notificationSeverity = 'MEDIUM';
    const typeValue = 'com.acme.offer:new';
    const date = '2019-01-01T12:00:00.000Z';
    const userId = 'userId';
    const notificationsSouce = '1234-1234-sdfs-234:test';
    const htmlBody =
      '"Hi  ,<br/>Certificate expiring in 90 days.<br/><br/>Please login to <a href="https: //cloud.ibm.com/security-compliance/dashboard">Security and Complaince dashboard</a> to find more information<br/>"';
    const markdownContent =
      '**Event Summary** \n\n**Toolchain ID:** `4414af34-a5c7-47d3-8f05-add4af6d78a6`  \n**Content Type:** `application/json`\n\n---\n\n *Pipeline Run Details*\n\n- **Namespace:** `PR`\n- **Trigger Name:** `manual`\n- **Triggered By:** `nitish.kulkarni3@ibm.com`\n- **Build Number:** `343`\n- **Pipeline Link:** [View Pipeline Run](https://cloud.ibm.com/devops/pipelines/tekton/e9cd5aa3-a3f2-4776-8acc-26a35922386e/runs/f29ac6f5-bd2f-4a26-abb8-4249be8dbab7?env_id=ibm:yp:us-south)';
    const mms =
      '{"content": "iVBORw0KGgoAAAANSUhEUgAAAFoAAAA4CAYAAAB9lO9TAAAAAXNSR0IArs4c6QAAActpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+QWRvYmUgSW1hZ2VSZWFkeTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KKS7NPQAABO9JREFUeAHtW81x2zoQBhgn46NLYCpISpA6cCowfYjn3ZJUELmC5Og4h0AVPKeC8HWgDh5L8DGTTMR8KxoSBCzAX3us8WKGJrg/34KfqF2AkJWSJgwIA8KAMCAMCAPCgDAgDAgDwoAw8LQZ0GfFRT2egrpcmq9zwpkGzx9RXWqllsZ8Nb7GXg+Pq83SfDm3OKlzUVy8B1mfUjYxXRZTPC65ntVKfwOZ/xfFP7Npx1afFkVx0gUTJJ91seNsjvCkXHKKnrLK2k+EZ+GY83oGYlbGmFtXOS7uMRG9h+di2z5ifEefDmmPlQE9zVfxzy3y54puchq8rnT93D7Z4+PusLjoY/GParX+wQH3lJWwn5PPRHgE1dq0evEBRp/JcGxcrZ6fA8YQlt+K4u3rsfgHUgz9W2+uxxQnHxHF9p0vs9fQDS6CFgPFMNs8iVYw7PxnW0imwes/ivuMq1W9VOqZFMH+H8vDe2guJCbmC07eyLLSmKsyrg81aby6Si1E0r4UK8NM76oKo1JhTt0H56FQ1K83Od9qkZ8LpXSuerVwTEecP3LfR05OMq3WdCrpT9eWwgNGicPgYFuLL8Yz3JcLiNnFjfvBIT/TSvCEs43JMKYSusrVH3QxpBtxSXFvbHh/fWp98Y2gfi+Sra9/Zp/olsJS+SBt12m8XSHlcO7Pl4tGMnc82QpP5zxmGZf/XMV1orlXBvCBhe2sePsjlDYSOCTfonF+KTzOvotMK/3dL1y+39C4hA2sqlZ1dG7tx3KvwdEHu1K2cjZ1oOTNrAFz/o+RtYiSeC2+rLpS6pdhNXvCYXFRgHPA4Osf9b+FPpG7s0B3iMUQebN+gzkd3eyIVpdwriIAOeSnER3E+iauE40w8BQYQN4OW2pbCA6XKEKL0CsuSeHFvaIaSh3nfrHhrNNxm+032rWBb875czJMN18qtS6Qxz9yepLRlNRfPR9ijsYrS/0vdlmCghO78RZ5n3y7t2pswd1TR2Ydm0KxZ+hcVE6/YzeJ1xHDN3vxHpKFL92/TsXVK7KlN3N4Ol/v+/FXmPYtG01d4Vw2fe6vu+jh9CK7NwaQcsPWsm2Dt21XVegVl6TxdttgHMJD+DZp6Ljtqd7eN8aUY6x0RFq4LcamjtS2DT6ZS6AvIhFYcQoPDiWOOesIYdoXo6Fvf6Slfd24z/MWW0ox5whjmlBtxfCY7qdsbJu/h1gM3fHTZnC+JxhwcTeDqdKuv2/S+rSWfaLxiFzG3bIyruM1abzo6mwD1uLLB7yTtvhWrjNsaaM3kj5oc8JdiWbl3Xt5F8LtV+6F9B+QAfyu42IxPt5uO2oavO4jsoun/nF3Y7bRYttWNsbOjn6WtsbRveF3HfEVTneYTeI3ZD8RXtfQKxguyHhA3BJuBofT9AmDw+Tm9Yyxc3DC7kEXQ+TVZXhLYyRZQOpUMQ78dx27LaP0lhdHfrh6o/UBZjFz19p/Z9HoMoMPoHTtpP9IGMAP0ePbVt3HqFdLc03TI/wQfQq8dGStnuHt3VXlWvWPuxuzi0N9i4WnNtiSIj0VTeToM+p3bZhHR7drumLADmG3bQq8LZjfqZAiApIbo75x3TH7YfQJJDlmG1RsmaZzCGc4Ojd2wdLZ++EMb7AExmZs/F8rphwKFUC8in01JaZgCQPCgDAgDAgDwoAwIAwIA8KAMCAMPHUG/gKC0oz7fm25ogAAAABJRU5ErkJggg==", "content_type": "image/png"}';

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

    const notificationHuaweiBodyMessageDataModel = {
      'android': {
        'notification': {
          'title': 'Alert message',
          'body': 'Bob wants to play cricket',
        },
        'data': {
          'name': 'Robert',
          'description': 'notification for the cricket',
        },
      },
    };

    const notificationHuaweiBodyModel = {
      message: notificationHuaweiBodyMessageDataModel,
    };

    const notificationCreateModel = {
      instanceId,
      ibmenseverity: notificationSeverity,
      id: uniqueID,
      source: notificationsSouce,
      ibmensourceid: sourceId,
      type: typeValue,
      time: date,
      ibmenpushto: JSON.stringify(notificationFcmDevicesModel),
      ibmenmailto: JSON.stringify(['abc@ibm.com', 'def@us.ibm.com']),
      ibmensmsto: JSON.stringify(['+911234567890', '+911224567890']),
      ibmensmstext: 'this is a sample text message',
      ibmentemplates: JSON.stringify(['149b0e11-8a7c-4fda-a847-5d79e01b71dc']),
      ibmensubject: 'certificate expire',
      ibmenhtmlbody: htmlBody,
      ibmenmarkdown: markdownContent,
      ibmenmms: JSON.stringify(mms),
      ibmenfcmbody: JSON.stringify(notificationFcmBodyModel),
      ibmenapnsbody: JSON.stringify(notificationApnsBodyModel),
      ibmensafaribody: JSON.stringify(notificationSafariBodymodel),
      ibmenhuaweibody: JSON.stringify(notificationHuaweiBodyModel),
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
      notificationID = res.notification_id;
    } catch (err) {
      console.warn(err);
    }

    // end-send_notifications
  });

  test('getMetrics request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getMetrics() result:');
    // begin-metrics
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

    try {
      const res = await eventNotificationsService.getMetrics(getMetricsParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-metrics
  });

  test('createSMTPConfiguration request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createSMTPConfiguration() result:');
    // begin-create_smtp_configuration
    const name = 'SMTP Configuration';
    const domain = 'mailx.event-notifications.test.cloud.ibm.com';
    const description = 'SMTP Configuration description';
    const createSmtpConfigurationParams = {
      instanceId,
      name,
      domain,
      description,
    };

    try {
      const res = await eventNotificationsService.createSmtpConfiguration(
        createSmtpConfigurationParams
      );
      smtpConfigID = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-create_smtp_configuration
  });

  test('verifySMTP request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('verifySMTP() result:');
    // begin-verify_smtp
    const type = 'dkim,spf,en_authorization';
    const updateVerifySmtpParams = {
      instanceId,
      id: smtpConfigID,
      type,
    };

    try {
      const res = await eventNotificationsService.updateVerifySmtp(updateVerifySmtpParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-verify-smtp
  });

  test('createSMTPUser request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('createSMTPUser() result:');
    // begin-create_smtp_user
    const description = 'SMTP user description';
    const createSmtpUserParams = {
      instanceId,
      id: smtpConfigID,
      description,
    };

    try {
      const res = await eventNotificationsService.createSmtpUser(createSmtpUserParams);
      smtpUserID = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-create_smtp_user
  });

  test('cloneSMTPUser request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('cloneSMTPUser() result:');
    // begin-clone_smtp_user
    const cloneSMTPUserParams = {
      instanceId,
      id: smtpConfigID,
      usernameToClone: smtpUserToClone,
    };

    try {
      const res = await eventNotificationsService.createSmtpUser(cloneSMTPUserParams);
      smtpUserID2 = res.result.id;
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-clone_smtp_user
  });

  test('listSMTPConfigurations request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listSMTPConfigurations() result:');
    // begin-list_smtp_configurations
    const limit = 1;
    const offset = 0;
    const search = '';
    const listSmtpConfigurationsParams = {
      instanceId,
      limit,
      offset,
      search,
    };
    try {
      const res = await eventNotificationsService.listSmtpConfigurations(
        listSmtpConfigurationsParams
      );
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-list_smtp_configurations
  });

  test('listSMTPUsers request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listSMTPUsers() result:');
    // begin-list_smtp_users
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
    try {
      const res = await eventNotificationsService.listSmtpUsers(listSmtpUsersParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-list_configurations
  });

  test('getSMTPConfiguration request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getSMTPConfiguration() result:');
    // begin-get_smtp_configuration
    const getSmtpConfigurationParams = {
      instanceId,
      id: smtpConfigID,
    };
    try {
      const res = await eventNotificationsService.getSmtpConfiguration(getSmtpConfigurationParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_smtp_configuration
  });

  test('getSMTPAllowedIPs request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getSMTPAllowedIPs() result:');
    // begin-get_smtp_allowed_ips
    const getSmtpAllowedIpsParams = {
      instanceId,
      id: smtpConfigID,
    };
    try {
      const res = await eventNotificationsService.getSmtpAllowedIps(getSmtpAllowedIpsParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_smtp_allowed_ips
  });

  test('getSMTPUser request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getSMTPUser() result:');
    // begin-get_smtp_user
    const getSmtpUserParams = {
      instanceId,
      id: smtpConfigID,
      userId: smtpUserID,
    };
    try {
      const res = await eventNotificationsService.getSmtpUser(getSmtpUserParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_smtp_user
  });

  test('updateSMTPConfiguration request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateSMTPConfiguration() result:');
    // begin-update_smtp_configuration
    const name = 'SMTP configuration update';
    const description = 'SMTP description update';
    const updateSmtpConfigurationParams = {
      instanceId,
      id: smtpConfigID,
      name,
      description,
    };

    try {
      const res = await eventNotificationsService.updateSmtpConfiguration(
        updateSmtpConfigurationParams
      );
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-update_smtp_configuration
  });

  test('updateSMTPUser request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('updateSMTPUser() result:');
    // begin-update_smtp_user
    const description = 'SMTP description update';
    const updateSmtpUserParams = {
      instanceId,
      id: smtpConfigID,
      userId: smtpUserID,
      description,
    };

    try {
      const res = await eventNotificationsService.updateSmtpUser(updateSmtpUserParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-update_smtp_user
  });

  test('listPredefinedTemplates request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('listPredefinedTemplates() result:');
    // begin-list_predefined-templates
    const source = 'logs';
    const type = 'slack.notification';
    const listPreDefinedTemplatesParams = {
      instanceId,
      source,
      type,
    };

    try {
      const res = await eventNotificationsService.listPreDefinedTemplates(
        listPreDefinedTemplatesParams
      );
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-list_predefined-templates
  });

  test('getPredefinedTemplates request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('getPredefinedTemplate() result:');
    // begin-get_predefined-template
    const id = '0cacb9a0-d43a-4042-920d-d4a3f7d4cbd5'; // from dev

    const getPreDefinedTemplateParams = {
      instanceId,
      id,
    };

    try {
      const res = await eventNotificationsService.getPreDefinedTemplate(
        getPreDefinedTemplateParams
      );
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-get_predefined-template
  });

  test('deleteSMTPUser request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteSMTPUser() result:');
    // begin-delete_smtp_user
    const deleteSmtpUserParams = {
      instanceId,
      id: smtpConfigID,
      userId: smtpUserID,
    };

    try {
      const res = await eventNotificationsService.deleteSmtpUser(deleteSmtpUserParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-delete_smtp_user

    const deleteSmtpClonedUserParams = {
      instanceId,
      id: smtpConfigID,
      userId: smtpUserID2,
    };

    try {
      const res = await eventNotificationsService.deleteSmtpUser(deleteSmtpClonedUserParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
  });

  test('deleteSMTPConfiguration  request example', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    originalLog('deleteSMTPConfiguration() result:');
    // begin-delete_smtp_configuration
    const deleteSmtpConfigurationParams = {
      instanceId,
      id: smtpConfigID,
    };
    try {
      const res = await eventNotificationsService.deleteSmtpConfiguration(
        deleteSmtpConfigurationParams
      );
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
    // end-delete_smtp_configuration
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
    const subscriptions = [
      subscriptionId1,
      subscriptionId2,
      subscriptionId3,
      subscriptionId4,
      subscriptionId5,
      subscriptionId6,
      subscriptionId7,
      subscriptionId8,
      subscriptionId9,
      subscriptionId10,
      subscriptionId22,
    ];

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
      destinationId22,
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

  test('deleteTemplate()', async () => {
    consoleLogMock.mockImplementation((output) => {
      originalLog(output);
    });
    consoleWarnMock.mockImplementation((output) => {
      // if an error occurs, display the message and then fail the test
      originalWarn(output);
      expect(true).toBeFalsy();
    });

    const templates = [
      templateInvitationID,
      templateNotificationID,
      slackTemplateID,
      webhookTemplateID,
      pagerdutyTemplateID,
      eventStreamsTemplateID,
      appConfigTemplateID,
    ];

    for (let i = 0; i < templates.length; i += 1) {
      // begin-delete_template
      const params = {
        instanceId,
        id: templates[i],
      };

      try {
        await eventNotificationsService.deleteTemplate(params);
      } catch (err) {
        console.warn(err);
      }
    }
    // end-delete_template
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
