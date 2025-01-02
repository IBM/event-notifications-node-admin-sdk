/**
 * (C) Copyright IBM Corp. 2025.
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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const sdkCorePackage = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = sdkCorePackage;

const nock = require('nock');
const EventNotificationsV1 = require('../../dist/event-notifications/v1');

/* eslint-disable no-await-in-loop */

const { getOptions, checkUrlAndMethod, checkMediaHeaders, expectToBePromise } = unitTestUtils;

const eventNotificationsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us-south.event-notifications.cloud.ibm.com/event-notifications',
};

const eventNotificationsService = new EventNotificationsV1(eventNotificationsServiceOptions);

let createRequestMock = null;
function mock_createRequest() {
  if (!createRequestMock) {
    createRequestMock = jest.spyOn(eventNotificationsService, 'createRequest');
    createRequestMock.mockImplementation(() => Promise.resolve());
  }
}
function unmock_createRequest() {
  if (createRequestMock) {
    createRequestMock.mockRestore();
    createRequestMock = null;
  }
}

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(sdkCorePackage, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

describe('EventNotificationsV1', () => {
  beforeEach(() => {
    mock_createRequest();
  });

  afterEach(() => {
    if (createRequestMock) {
      createRequestMock.mockClear();
    }
    getAuthenticatorMock.mockClear();
  });

  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = EventNotificationsV1.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(EventNotificationsV1.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(EventNotificationsV1.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(EventNotificationsV1);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = EventNotificationsV1.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(EventNotificationsV1);
    });
  });

  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new EventNotificationsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new EventNotificationsV1(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(EventNotificationsV1.DEFAULT_SERVICE_URL);
    });
  });

  describe('getMetrics', () => {
    describe('positive tests', () => {
      function __getMetricsTest() {
        // Construct the params object for operation getMetrics
        const instanceId = 'testString';
        const destinationType = 'smtp_custom';
        const gte = 'testString';
        const lte = 'testString';
        const destinationId = 'testString';
        const sourceId = 'testString';
        const emailTo = 'testString';
        const notificationId = 'testString';
        const subject = 'testString';
        const getMetricsParams = {
          instanceId,
          destinationType,
          gte,
          lte,
          destinationId,
          sourceId,
          emailTo,
          notificationId,
          subject,
        };

        const getMetricsResult = eventNotificationsService.getMetrics(getMetricsParams);

        // all methods should return a Promise
        expectToBePromise(getMetricsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/metrics', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.destination_type).toEqual(destinationType);
        expect(mockRequestOptions.qs.gte).toEqual(gte);
        expect(mockRequestOptions.qs.lte).toEqual(lte);
        expect(mockRequestOptions.qs.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.qs.source_id).toEqual(sourceId);
        expect(mockRequestOptions.qs.email_to).toEqual(emailTo);
        expect(mockRequestOptions.qs.notification_id).toEqual(notificationId);
        expect(mockRequestOptions.qs.subject).toEqual(subject);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getMetricsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getMetricsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getMetricsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const destinationType = 'smtp_custom';
        const gte = 'testString';
        const lte = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getMetricsParams = {
          instanceId,
          destinationType,
          gte,
          lte,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getMetrics(getMetricsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getMetrics({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getMetrics();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('sendNotifications', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NotificationCreate
      const notificationCreateModel = {
        specversion: '1.0',
        time: '2019-01-01T12:00:00.000Z',
        id: 'testString',
        source: 'testString',
        type: 'testString',
        ibmenseverity: 'testString',
        ibmensourceid: 'testString',
        ibmendefaultshort: 'testString',
        ibmendefaultlong: 'testString',
        ibmensubject: 'testString',
        ibmentemplates: 'testString',
        ibmenmailto: 'testString',
        ibmenslackto: 'testString',
        ibmensmstext: 'testString',
        ibmensmsto: 'testString',
        ibmenhtmlbody: 'testString',
        subject: 'testString',
        ibmenmms: 'testString',
        data: { foo: 'bar' },
        datacontenttype: 'application/json',
        ibmenpushto:
          '{"platforms":["push_android", "push_ios", "push_firefox", "push_chrome", "push_safari", "push_huawei"]}',
        ibmenfcmbody: 'testString',
        ibmenapnsbody: 'testString',
        ibmenapnsheaders: 'testString',
        ibmenchromebody: 'testString',
        ibmenchromeheaders: '{"TTL":3600,"Topic":"test","Urgency":"high"}',
        ibmenfirefoxbody: 'testString',
        ibmenfirefoxheaders: '{"TTL":3600,"Topic":"test","Urgency":"high"}',
        ibmenhuaweibody: 'testString',
        ibmensafaribody: 'testString',
        foo: 'testString',
      };

      function __sendNotificationsTest() {
        // Construct the params object for operation sendNotifications
        const instanceId = 'testString';
        const body = notificationCreateModel;
        const sendNotificationsParams = {
          instanceId,
          body,
        };

        const sendNotificationsResult =
          eventNotificationsService.sendNotifications(sendNotificationsParams);

        // all methods should return a Promise
        expectToBePromise(sendNotificationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/notifications', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body).toEqual(body);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __sendNotificationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __sendNotificationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __sendNotificationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const sendNotificationsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.sendNotifications(sendNotificationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.sendNotifications({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.sendNotifications();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSources', () => {
    describe('positive tests', () => {
      function __createSourcesTest() {
        // Construct the params object for operation createSources
        const instanceId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const enabled = true;
        const createSourcesParams = {
          instanceId,
          name,
          description,
          enabled,
        };

        const createSourcesResult = eventNotificationsService.createSources(createSourcesParams);

        // all methods should return a Promise
        expectToBePromise(createSourcesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/sources', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSourcesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __createSourcesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __createSourcesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSourcesParams = {
          instanceId,
          name,
          description,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createSources(createSourcesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.createSources({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.createSources();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSources', () => {
    describe('positive tests', () => {
      function __listSourcesTest() {
        // Construct the params object for operation listSources
        const instanceId = 'testString';
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const listSourcesParams = {
          instanceId,
          limit,
          offset,
          search,
        };

        const listSourcesResult = eventNotificationsService.listSources(listSourcesParams);

        // all methods should return a Promise
        expectToBePromise(listSourcesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/sources', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSourcesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __listSourcesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __listSourcesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSourcesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listSources(listSourcesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.listSources({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.listSources();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('SourcesPager tests', () => {
      const serviceUrl = eventNotificationsServiceOptions.url;
      const path = '/v1/instances/testString/sources';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"sources":[{"id":"id","name":"name","description":"description","type":"type","enabled":false,"updated_at":"2019-01-01T12:00:00.000Z","topic_count":0}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"sources":[{"id":"id","name":"name","description":"description","type":"type","enabled":false,"updated_at":"2019-01-01T12:00:00.000Z","topic_count":0}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const allResults = [];
        const pager = new EventNotificationsV1.SourcesPager(eventNotificationsService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const pager = new EventNotificationsV1.SourcesPager(eventNotificationsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getSource', () => {
    describe('positive tests', () => {
      function __getSourceTest() {
        // Construct the params object for operation getSource
        const instanceId = 'testString';
        const id = 'testString';
        const getSourceParams = {
          instanceId,
          id,
        };

        const getSourceResult = eventNotificationsService.getSource(getSourceParams);

        // all methods should return a Promise
        expectToBePromise(getSourceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/sources/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSourceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getSourceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getSourceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSourceParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getSource(getSourceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getSource({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getSource();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSource', () => {
    describe('positive tests', () => {
      function __deleteSourceTest() {
        // Construct the params object for operation deleteSource
        const instanceId = 'testString';
        const id = 'testString';
        const deleteSourceParams = {
          instanceId,
          id,
        };

        const deleteSourceResult = eventNotificationsService.deleteSource(deleteSourceParams);

        // all methods should return a Promise
        expectToBePromise(deleteSourceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/sources/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSourceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __deleteSourceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __deleteSourceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSourceParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.deleteSource(deleteSourceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.deleteSource({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.deleteSource();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSource', () => {
    describe('positive tests', () => {
      function __updateSourceTest() {
        // Construct the params object for operation updateSource
        const instanceId = 'testString';
        const id = 'testString';
        const name = 'testString';
        const description = 'testString';
        const enabled = true;
        const updateSourceParams = {
          instanceId,
          id,
          name,
          description,
          enabled,
        };

        const updateSourceResult = eventNotificationsService.updateSource(updateSourceParams);

        // all methods should return a Promise
        expectToBePromise(updateSourceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/sources/{id}', 'PATCH');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.enabled).toEqual(enabled);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSourceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __updateSourceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __updateSourceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSourceParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.updateSource(updateSourceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.updateSource({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.updateSource();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createTopic', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EventScheduleFilterAttributes
      const eventScheduleFilterAttributesModel = {
        starts_at: '2019-01-01T12:00:00.000Z',
        ends_at: '2019-01-01T12:00:00.000Z',
        expression: 'testString',
      };

      // Rules
      const rulesModel = {
        enabled: true,
        event_type_filter: "$.notification_event_info.event_type == 'cert_manager'",
        notification_filter: "$.notification.findings[0].severity == 'MODERATE'",
        event_schedule_filter: eventScheduleFilterAttributesModel,
      };

      // SourcesItems
      const sourcesItemsModel = {
        id: 'e7c3b3ee-78d9-4e02-95c3-c001a05e6ea5:api',
        rules: [rulesModel],
      };

      function __createTopicTest() {
        // Construct the params object for operation createTopic
        const instanceId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const sources = [sourcesItemsModel];
        const createTopicParams = {
          instanceId,
          name,
          description,
          sources,
        };

        const createTopicResult = eventNotificationsService.createTopic(createTopicParams);

        // all methods should return a Promise
        expectToBePromise(createTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/topics', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.sources).toEqual(sources);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTopicTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __createTopicTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __createTopicTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const name = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTopicParams = {
          instanceId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createTopic(createTopicParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.createTopic({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.createTopic();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTopics', () => {
    describe('positive tests', () => {
      function __listTopicsTest() {
        // Construct the params object for operation listTopics
        const instanceId = 'testString';
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const listTopicsParams = {
          instanceId,
          limit,
          offset,
          search,
        };

        const listTopicsResult = eventNotificationsService.listTopics(listTopicsParams);

        // all methods should return a Promise
        expectToBePromise(listTopicsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/topics', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTopicsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __listTopicsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __listTopicsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTopicsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listTopics(listTopicsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.listTopics({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.listTopics();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('TopicsPager tests', () => {
      const serviceUrl = eventNotificationsServiceOptions.url;
      const path = '/v1/instances/testString/topics';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"topics":[{"id":"id","name":"name","description":"description","source_count":0,"sources_names":["sources_names"],"subscription_count":0}],"limit":1}';
      const mockPagerResponse2 =
        '{"total_count":2,"topics":[{"id":"id","name":"name","description":"description","source_count":0,"sources_names":["sources_names"],"subscription_count":0}],"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const allResults = [];
        const pager = new EventNotificationsV1.TopicsPager(eventNotificationsService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const pager = new EventNotificationsV1.TopicsPager(eventNotificationsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getTopic', () => {
    describe('positive tests', () => {
      function __getTopicTest() {
        // Construct the params object for operation getTopic
        const instanceId = 'testString';
        const id = 'testString';
        const include = 'testString';
        const getTopicParams = {
          instanceId,
          id,
          include,
        };

        const getTopicResult = eventNotificationsService.getTopic(getTopicParams);

        // all methods should return a Promise
        expectToBePromise(getTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/topics/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.include).toEqual(include);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTopicTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getTopicTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getTopicTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTopicParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getTopic(getTopicParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getTopic({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getTopic();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceTopic', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // EventScheduleFilterAttributes
      const eventScheduleFilterAttributesModel = {
        starts_at: '2019-01-01T12:00:00.000Z',
        ends_at: '2019-01-01T12:00:00.000Z',
        expression: 'testString',
      };

      // Rules
      const rulesModel = {
        enabled: true,
        event_type_filter: "$.notification_event_info.event_type == 'cert_manager'",
        notification_filter: "$.notification.findings[0].severity == 'MODERATE'",
        event_schedule_filter: eventScheduleFilterAttributesModel,
      };

      // SourcesItems
      const sourcesItemsModel = {
        id: 'e7c3b3ee-78d9-4e02-95c3-c001a05e6ea5:api',
        rules: [rulesModel],
      };

      function __replaceTopicTest() {
        // Construct the params object for operation replaceTopic
        const instanceId = 'testString';
        const id = 'testString';
        const name = 'testString';
        const description = 'testString';
        const sources = [sourcesItemsModel];
        const replaceTopicParams = {
          instanceId,
          id,
          name,
          description,
          sources,
        };

        const replaceTopicResult = eventNotificationsService.replaceTopic(replaceTopicParams);

        // all methods should return a Promise
        expectToBePromise(replaceTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/topics/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.sources).toEqual(sources);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceTopicTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __replaceTopicTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __replaceTopicTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceTopicParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.replaceTopic(replaceTopicParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.replaceTopic({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.replaceTopic();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTopic', () => {
    describe('positive tests', () => {
      function __deleteTopicTest() {
        // Construct the params object for operation deleteTopic
        const instanceId = 'testString';
        const id = 'testString';
        const deleteTopicParams = {
          instanceId,
          id,
        };

        const deleteTopicResult = eventNotificationsService.deleteTopic(deleteTopicParams);

        // all methods should return a Promise
        expectToBePromise(deleteTopicResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/topics/{id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTopicTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __deleteTopicTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __deleteTopicTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTopicParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.deleteTopic(deleteTopicParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.deleteTopic({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.deleteTopic();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TemplateConfigOneOfEmailTemplateConfig
      const templateConfigOneOfModel = {
        body: 'testString',
        subject: 'testString',
      };

      function __createTemplateTest() {
        // Construct the params object for operation createTemplate
        const instanceId = 'testString';
        const name = 'testString';
        const type = 'testString';
        const params = templateConfigOneOfModel;
        const description = 'testString';
        const createTemplateParams = {
          instanceId,
          name,
          type,
          params,
          description,
        };

        const createTemplateResult = eventNotificationsService.createTemplate(createTemplateParams);

        // all methods should return a Promise
        expectToBePromise(createTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/templates', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.params).toEqual(params);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __createTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __createTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const name = 'testString';
        const type = 'testString';
        const params = templateConfigOneOfModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTemplateParams = {
          instanceId,
          name,
          type,
          params,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createTemplate(createTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.createTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.createTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTemplates', () => {
    describe('positive tests', () => {
      function __listTemplatesTest() {
        // Construct the params object for operation listTemplates
        const instanceId = 'testString';
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const listTemplatesParams = {
          instanceId,
          limit,
          offset,
          search,
        };

        const listTemplatesResult = eventNotificationsService.listTemplates(listTemplatesParams);

        // all methods should return a Promise
        expectToBePromise(listTemplatesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/templates', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTemplatesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __listTemplatesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __listTemplatesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTemplatesParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listTemplates(listTemplatesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.listTemplates({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.listTemplates();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('TemplatesPager tests', () => {
      const serviceUrl = eventNotificationsServiceOptions.url;
      const path = '/v1/instances/testString/templates';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"templates":[{"id":"id","name":"name","description":"description","type":"type","subscription_count":18,"subscription_names":["subscription_names"],"updated_at":"2019-01-01T12:00:00.000Z"}],"limit":1}';
      const mockPagerResponse2 =
        '{"total_count":2,"templates":[{"id":"id","name":"name","description":"description","type":"type","subscription_count":18,"subscription_names":["subscription_names"],"updated_at":"2019-01-01T12:00:00.000Z"}],"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const allResults = [];
        const pager = new EventNotificationsV1.TemplatesPager(eventNotificationsService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const pager = new EventNotificationsV1.TemplatesPager(eventNotificationsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getTemplate', () => {
    describe('positive tests', () => {
      function __getTemplateTest() {
        // Construct the params object for operation getTemplate
        const instanceId = 'testString';
        const id = 'testString';
        const getTemplateParams = {
          instanceId,
          id,
        };

        const getTemplateResult = eventNotificationsService.getTemplate(getTemplateParams);

        // all methods should return a Promise
        expectToBePromise(getTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/templates/{id}', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getTemplateParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getTemplate(getTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceTemplate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // TemplateConfigOneOfEmailTemplateConfig
      const templateConfigOneOfModel = {
        body: 'testString',
        subject: 'testString',
      };

      function __replaceTemplateTest() {
        // Construct the params object for operation replaceTemplate
        const instanceId = 'testString';
        const id = 'testString';
        const name = 'testString';
        const description = 'testString';
        const type = 'testString';
        const params = templateConfigOneOfModel;
        const replaceTemplateParams = {
          instanceId,
          id,
          name,
          description,
          type,
          params,
        };

        const replaceTemplateResult =
          eventNotificationsService.replaceTemplate(replaceTemplateParams);

        // all methods should return a Promise
        expectToBePromise(replaceTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/templates/{id}', 'PUT');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.params).toEqual(params);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __replaceTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __replaceTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceTemplateParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.replaceTemplate(replaceTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.replaceTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.replaceTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteTemplate', () => {
    describe('positive tests', () => {
      function __deleteTemplateTest() {
        // Construct the params object for operation deleteTemplate
        const instanceId = 'testString';
        const id = 'testString';
        const deleteTemplateParams = {
          instanceId,
          id,
        };

        const deleteTemplateResult = eventNotificationsService.deleteTemplate(deleteTemplateParams);

        // all methods should return a Promise
        expectToBePromise(deleteTemplateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/templates/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTemplateTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __deleteTemplateTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __deleteTemplateTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTemplateParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.deleteTemplate(deleteTemplateParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.deleteTemplate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.deleteTemplate();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createDestination', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DKIMAttributes
      const dkimAttributesModel = {
        public_key: 'testString',
        selector: 'testString',
        verification: 'testString',
      };

      // SPFAttributes
      const spfAttributesModel = {
        txt_name: 'testString',
        txt_value: 'testString',
        verification: 'testString',
      };

      // DestinationConfigOneOfCustomDomainEmailDestinationConfig
      const destinationConfigOneOfModel = {
        domain: 'testString',
        dkim: dkimAttributesModel,
        spf: spfAttributesModel,
      };

      // DestinationConfig
      const destinationConfigModel = {
        params: destinationConfigOneOfModel,
      };

      function __createDestinationTest() {
        // Construct the params object for operation createDestination
        const instanceId = 'testString';
        const name = 'testString';
        const type = 'webhook';
        const description = 'testString';
        const collectFailedEvents = false;
        const config = destinationConfigModel;
        const certificate = Buffer.from('This is a mock file.');
        const certificateContentType = 'testString';
        const icon16x16 = Buffer.from('This is a mock file.');
        const icon16x16ContentType = 'testString';
        const icon16x162x = Buffer.from('This is a mock file.');
        const icon16x162xContentType = 'testString';
        const icon32x32 = Buffer.from('This is a mock file.');
        const icon32x32ContentType = 'testString';
        const icon32x322x = Buffer.from('This is a mock file.');
        const icon32x322xContentType = 'testString';
        const icon128x128 = Buffer.from('This is a mock file.');
        const icon128x128ContentType = 'testString';
        const icon128x1282x = Buffer.from('This is a mock file.');
        const icon128x1282xContentType = 'testString';
        const createDestinationParams = {
          instanceId,
          name,
          type,
          description,
          collectFailedEvents,
          config,
          certificate,
          certificateContentType,
          icon16x16,
          icon16x16ContentType,
          icon16x162x,
          icon16x162xContentType,
          icon32x32,
          icon32x32ContentType,
          icon32x322x,
          icon32x322xContentType,
          icon128x128,
          icon128x128ContentType,
          icon128x1282x,
          icon128x1282xContentType,
        };

        const createDestinationResult =
          eventNotificationsService.createDestination(createDestinationParams);

        // all methods should return a Promise
        expectToBePromise(createDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/destinations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.name).toEqual(name);
        expect(mockRequestOptions.formData.type).toEqual(type);
        expect(mockRequestOptions.formData.description).toEqual(description);
        expect(mockRequestOptions.formData.collect_failed_events).toEqual(collectFailedEvents);
        expect(mockRequestOptions.formData.config).toEqual(config);
        expect(mockRequestOptions.formData.certificate.data).toEqual(certificate);
        expect(mockRequestOptions.formData.certificate.contentType).toEqual(certificateContentType);
        expect(mockRequestOptions.formData.icon_16x16.data).toEqual(icon16x16);
        expect(mockRequestOptions.formData.icon_16x16.contentType).toEqual(icon16x16ContentType);
        expect(mockRequestOptions.formData.icon_16x16_2x.data).toEqual(icon16x162x);
        expect(mockRequestOptions.formData.icon_16x16_2x.contentType).toEqual(
          icon16x162xContentType
        );
        expect(mockRequestOptions.formData.icon_32x32.data).toEqual(icon32x32);
        expect(mockRequestOptions.formData.icon_32x32.contentType).toEqual(icon32x32ContentType);
        expect(mockRequestOptions.formData.icon_32x32_2x.data).toEqual(icon32x322x);
        expect(mockRequestOptions.formData.icon_32x32_2x.contentType).toEqual(
          icon32x322xContentType
        );
        expect(mockRequestOptions.formData.icon_128x128.data).toEqual(icon128x128);
        expect(mockRequestOptions.formData.icon_128x128.contentType).toEqual(
          icon128x128ContentType
        );
        expect(mockRequestOptions.formData.icon_128x128_2x.data).toEqual(icon128x1282x);
        expect(mockRequestOptions.formData.icon_128x128_2x.contentType).toEqual(
          icon128x1282xContentType
        );
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __createDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __createDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const name = 'testString';
        const type = 'webhook';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createDestinationParams = {
          instanceId,
          name,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createDestination(createDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.createDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.createDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listDestinations', () => {
    describe('positive tests', () => {
      function __listDestinationsTest() {
        // Construct the params object for operation listDestinations
        const instanceId = 'testString';
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const listDestinationsParams = {
          instanceId,
          limit,
          offset,
          search,
        };

        const listDestinationsResult =
          eventNotificationsService.listDestinations(listDestinationsParams);

        // all methods should return a Promise
        expectToBePromise(listDestinationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/destinations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listDestinationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __listDestinationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __listDestinationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDestinationsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listDestinations(listDestinationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.listDestinations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.listDestinations();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('DestinationsPager tests', () => {
      const serviceUrl = eventNotificationsServiceOptions.url;
      const path = '/v1/instances/testString/destinations';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"destinations":[{"id":"id","name":"name","description":"description","type":"webhook","collect_failed_events":false,"subscription_count":18,"subscription_names":["subscription_names"],"updated_at":"2019-01-01T12:00:00.000Z"}],"limit":1}';
      const mockPagerResponse2 =
        '{"total_count":2,"destinations":[{"id":"id","name":"name","description":"description","type":"webhook","collect_failed_events":false,"subscription_count":18,"subscription_names":["subscription_names"],"updated_at":"2019-01-01T12:00:00.000Z"}],"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const allResults = [];
        const pager = new EventNotificationsV1.DestinationsPager(eventNotificationsService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const pager = new EventNotificationsV1.DestinationsPager(eventNotificationsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getDestination', () => {
    describe('positive tests', () => {
      function __getDestinationTest() {
        // Construct the params object for operation getDestination
        const instanceId = 'testString';
        const id = 'testString';
        const getDestinationParams = {
          instanceId,
          id,
        };

        const getDestinationResult = eventNotificationsService.getDestination(getDestinationParams);

        // all methods should return a Promise
        expectToBePromise(getDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDestinationParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getDestination(getDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateDestination', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DKIMAttributes
      const dkimAttributesModel = {
        public_key: 'testString',
        selector: 'testString',
        verification: 'testString',
      };

      // SPFAttributes
      const spfAttributesModel = {
        txt_name: 'testString',
        txt_value: 'testString',
        verification: 'testString',
      };

      // DestinationConfigOneOfCustomDomainEmailDestinationConfig
      const destinationConfigOneOfModel = {
        domain: 'testString',
        dkim: dkimAttributesModel,
        spf: spfAttributesModel,
      };

      // DestinationConfig
      const destinationConfigModel = {
        params: destinationConfigOneOfModel,
      };

      function __updateDestinationTest() {
        // Construct the params object for operation updateDestination
        const instanceId = 'testString';
        const id = 'testString';
        const name = 'testString';
        const description = 'testString';
        const collectFailedEvents = false;
        const config = destinationConfigModel;
        const certificate = Buffer.from('This is a mock file.');
        const certificateContentType = 'testString';
        const icon16x16 = Buffer.from('This is a mock file.');
        const icon16x16ContentType = 'testString';
        const icon16x162x = Buffer.from('This is a mock file.');
        const icon16x162xContentType = 'testString';
        const icon32x32 = Buffer.from('This is a mock file.');
        const icon32x32ContentType = 'testString';
        const icon32x322x = Buffer.from('This is a mock file.');
        const icon32x322xContentType = 'testString';
        const icon128x128 = Buffer.from('This is a mock file.');
        const icon128x128ContentType = 'testString';
        const icon128x1282x = Buffer.from('This is a mock file.');
        const icon128x1282xContentType = 'testString';
        const updateDestinationParams = {
          instanceId,
          id,
          name,
          description,
          collectFailedEvents,
          config,
          certificate,
          certificateContentType,
          icon16x16,
          icon16x16ContentType,
          icon16x162x,
          icon16x162xContentType,
          icon32x32,
          icon32x32ContentType,
          icon32x322x,
          icon32x322xContentType,
          icon128x128,
          icon128x128ContentType,
          icon128x1282x,
          icon128x1282xContentType,
        };

        const updateDestinationResult =
          eventNotificationsService.updateDestination(updateDestinationParams);

        // all methods should return a Promise
        expectToBePromise(updateDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'multipart/form-data';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.formData.name).toEqual(name);
        expect(mockRequestOptions.formData.description).toEqual(description);
        expect(mockRequestOptions.formData.collect_failed_events).toEqual(collectFailedEvents);
        expect(mockRequestOptions.formData.config).toEqual(config);
        expect(mockRequestOptions.formData.certificate.data).toEqual(certificate);
        expect(mockRequestOptions.formData.certificate.contentType).toEqual(certificateContentType);
        expect(mockRequestOptions.formData.icon_16x16.data).toEqual(icon16x16);
        expect(mockRequestOptions.formData.icon_16x16.contentType).toEqual(icon16x16ContentType);
        expect(mockRequestOptions.formData.icon_16x16_2x.data).toEqual(icon16x162x);
        expect(mockRequestOptions.formData.icon_16x16_2x.contentType).toEqual(
          icon16x162xContentType
        );
        expect(mockRequestOptions.formData.icon_32x32.data).toEqual(icon32x32);
        expect(mockRequestOptions.formData.icon_32x32.contentType).toEqual(icon32x32ContentType);
        expect(mockRequestOptions.formData.icon_32x32_2x.data).toEqual(icon32x322x);
        expect(mockRequestOptions.formData.icon_32x32_2x.contentType).toEqual(
          icon32x322xContentType
        );
        expect(mockRequestOptions.formData.icon_128x128.data).toEqual(icon128x128);
        expect(mockRequestOptions.formData.icon_128x128.contentType).toEqual(
          icon128x128ContentType
        );
        expect(mockRequestOptions.formData.icon_128x128_2x.data).toEqual(icon128x1282x);
        expect(mockRequestOptions.formData.icon_128x128_2x.contentType).toEqual(
          icon128x1282xContentType
        );
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __updateDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __updateDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateDestinationParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.updateDestination(updateDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.updateDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.updateDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteDestination', () => {
    describe('positive tests', () => {
      function __deleteDestinationTest() {
        // Construct the params object for operation deleteDestination
        const instanceId = 'testString';
        const id = 'testString';
        const deleteDestinationParams = {
          instanceId,
          id,
        };

        const deleteDestinationResult =
          eventNotificationsService.deleteDestination(deleteDestinationParams);

        // all methods should return a Promise
        expectToBePromise(deleteDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __deleteDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __deleteDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteDestinationParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.deleteDestination(deleteDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.deleteDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.deleteDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getEnabledCountries', () => {
    describe('positive tests', () => {
      function __getEnabledCountriesTest() {
        // Construct the params object for operation getEnabledCountries
        const instanceId = 'testString';
        const id = 'testString';
        const getEnabledCountriesParams = {
          instanceId,
          id,
        };

        const getEnabledCountriesResult =
          eventNotificationsService.getEnabledCountries(getEnabledCountriesParams);

        // all methods should return a Promise
        expectToBePromise(getEnabledCountriesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}/enabled_countries',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getEnabledCountriesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getEnabledCountriesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getEnabledCountriesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getEnabledCountriesParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getEnabledCountries(getEnabledCountriesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getEnabledCountries({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getEnabledCountries();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('testDestination', () => {
    describe('positive tests', () => {
      function __testDestinationTest() {
        // Construct the params object for operation testDestination
        const instanceId = 'testString';
        const id = 'testString';
        const testDestinationParams = {
          instanceId,
          id,
        };

        const testDestinationResult =
          eventNotificationsService.testDestination(testDestinationParams);

        // all methods should return a Promise
        expectToBePromise(testDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}/test',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __testDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __testDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __testDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const testDestinationParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.testDestination(testDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.testDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.testDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateVerifyDestination', () => {
    describe('positive tests', () => {
      function __updateVerifyDestinationTest() {
        // Construct the params object for operation updateVerifyDestination
        const instanceId = 'testString';
        const id = 'testString';
        const type = 'testString';
        const updateVerifyDestinationParams = {
          instanceId,
          id,
          type,
        };

        const updateVerifyDestinationResult = eventNotificationsService.updateVerifyDestination(
          updateVerifyDestinationParams
        );

        // all methods should return a Promise
        expectToBePromise(updateVerifyDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}/verify',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateVerifyDestinationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __updateVerifyDestinationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __updateVerifyDestinationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const type = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateVerifyDestinationParams = {
          instanceId,
          id,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.updateVerifyDestination(updateVerifyDestinationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.updateVerifyDestination({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.updateVerifyDestination();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createTagsSubscription', () => {
    describe('positive tests', () => {
      function __createTagsSubscriptionTest() {
        // Construct the params object for operation createTagsSubscription
        const instanceId = 'testString';
        const id = 'testString';
        const deviceId = 'testString';
        const tagName = 'testString';
        const createTagsSubscriptionParams = {
          instanceId,
          id,
          deviceId,
          tagName,
        };

        const createTagsSubscriptionResult = eventNotificationsService.createTagsSubscription(
          createTagsSubscriptionParams
        );

        // all methods should return a Promise
        expectToBePromise(createTagsSubscriptionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}/tag_subscriptions',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.device_id).toEqual(deviceId);
        expect(mockRequestOptions.body.tag_name).toEqual(tagName);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createTagsSubscriptionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __createTagsSubscriptionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __createTagsSubscriptionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const deviceId = 'testString';
        const tagName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createTagsSubscriptionParams = {
          instanceId,
          id,
          deviceId,
          tagName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createTagsSubscription(createTagsSubscriptionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.createTagsSubscription({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.createTagsSubscription();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listTagsSubscription', () => {
    describe('positive tests', () => {
      function __listTagsSubscriptionTest() {
        // Construct the params object for operation listTagsSubscription
        const instanceId = 'testString';
        const id = 'testString';
        const deviceId = 'testString';
        const userId = 'testString';
        const tagName = 'testString';
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const listTagsSubscriptionParams = {
          instanceId,
          id,
          deviceId,
          userId,
          tagName,
          limit,
          offset,
          search,
        };

        const listTagsSubscriptionResult = eventNotificationsService.listTagsSubscription(
          listTagsSubscriptionParams
        );

        // all methods should return a Promise
        expectToBePromise(listTagsSubscriptionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}/tag_subscriptions',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.device_id).toEqual(deviceId);
        expect(mockRequestOptions.qs.user_id).toEqual(userId);
        expect(mockRequestOptions.qs.tag_name).toEqual(tagName);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTagsSubscriptionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __listTagsSubscriptionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __listTagsSubscriptionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTagsSubscriptionParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listTagsSubscription(listTagsSubscriptionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.listTagsSubscription({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.listTagsSubscription();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('TagsSubscriptionPager tests', () => {
      const serviceUrl = eventNotificationsServiceOptions.url;
      const path = '/v1/instances/testString/destinations/testString/tag_subscriptions';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"limit":1,"tag_subscriptions":[{"id":"id","device_id":"device_id","tag_name":"tag_name","user_id":"user_id","updated_at":"2019-01-01T12:00:00.000Z"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"tag_subscriptions":[{"id":"id","device_id":"device_id","tag_name":"tag_name","user_id":"user_id","updated_at":"2019-01-01T12:00:00.000Z"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'testString',
          id: 'testString',
          deviceId: 'testString',
          userId: 'testString',
          tagName: 'testString',
          limit: 10,
          search: 'testString',
        };
        const allResults = [];
        const pager = new EventNotificationsV1.TagsSubscriptionPager(
          eventNotificationsService,
          params
        );
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          instanceId: 'testString',
          id: 'testString',
          deviceId: 'testString',
          userId: 'testString',
          tagName: 'testString',
          limit: 10,
          search: 'testString',
        };
        const pager = new EventNotificationsV1.TagsSubscriptionPager(
          eventNotificationsService,
          params
        );
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('deleteTagsSubscription', () => {
    describe('positive tests', () => {
      function __deleteTagsSubscriptionTest() {
        // Construct the params object for operation deleteTagsSubscription
        const instanceId = 'testString';
        const id = 'testString';
        const deviceId = 'testString';
        const tagName = 'testString';
        const deleteTagsSubscriptionParams = {
          instanceId,
          id,
          deviceId,
          tagName,
        };

        const deleteTagsSubscriptionResult = eventNotificationsService.deleteTagsSubscription(
          deleteTagsSubscriptionParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteTagsSubscriptionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}/tag_subscriptions',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.device_id).toEqual(deviceId);
        expect(mockRequestOptions.qs.tag_name).toEqual(tagName);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteTagsSubscriptionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __deleteTagsSubscriptionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __deleteTagsSubscriptionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteTagsSubscriptionParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.deleteTagsSubscription(deleteTagsSubscriptionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.deleteTagsSubscription({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.deleteTagsSubscription();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSubscription', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SubscriptionCreateAttributesSMSAttributes
      const subscriptionCreateAttributesModel = {
        invited: ['testString'],
      };

      function __createSubscriptionTest() {
        // Construct the params object for operation createSubscription
        const instanceId = 'testString';
        const name = 'testString';
        const destinationId = 'testString';
        const topicId = 'testString';
        const description = 'testString';
        const attributes = subscriptionCreateAttributesModel;
        const createSubscriptionParams = {
          instanceId,
          name,
          destinationId,
          topicId,
          description,
          attributes,
        };

        const createSubscriptionResult =
          eventNotificationsService.createSubscription(createSubscriptionParams);

        // all methods should return a Promise
        expectToBePromise(createSubscriptionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/subscriptions', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.destination_id).toEqual(destinationId);
        expect(mockRequestOptions.body.topic_id).toEqual(topicId);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.attributes).toEqual(attributes);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSubscriptionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __createSubscriptionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __createSubscriptionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const name = 'testString';
        const destinationId = 'testString';
        const topicId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSubscriptionParams = {
          instanceId,
          name,
          destinationId,
          topicId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createSubscription(createSubscriptionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.createSubscription({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.createSubscription();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSubscriptions', () => {
    describe('positive tests', () => {
      function __listSubscriptionsTest() {
        // Construct the params object for operation listSubscriptions
        const instanceId = 'testString';
        const offset = 0;
        const limit = 1;
        const search = 'testString';
        const listSubscriptionsParams = {
          instanceId,
          offset,
          limit,
          search,
        };

        const listSubscriptionsResult =
          eventNotificationsService.listSubscriptions(listSubscriptionsParams);

        // all methods should return a Promise
        expectToBePromise(listSubscriptionsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/subscriptions', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSubscriptionsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __listSubscriptionsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __listSubscriptionsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSubscriptionsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listSubscriptions(listSubscriptionsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.listSubscriptions({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.listSubscriptions();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('SubscriptionsPager tests', () => {
      const serviceUrl = eventNotificationsServiceOptions.url;
      const path = '/v1/instances/testString/subscriptions';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"subscriptions":[{"id":"id","name":"name","description":"description","destination_id":"destination_id","destination_name":"destination_name","destination_type":"sms_ibm","topic_id":"topic_id","topic_name":"topic_name","updated_at":"2019-01-01T12:00:00.000Z"}],"total_count":2,"limit":1}';
      const mockPagerResponse2 =
        '{"subscriptions":[{"id":"id","name":"name","description":"description","destination_id":"destination_id","destination_name":"destination_name","destination_type":"sms_ibm","topic_id":"topic_id","topic_name":"topic_name","updated_at":"2019-01-01T12:00:00.000Z"}],"total_count":2,"limit":1}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const allResults = [];
        const pager = new EventNotificationsV1.SubscriptionsPager(
          eventNotificationsService,
          params
        );
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const pager = new EventNotificationsV1.SubscriptionsPager(
          eventNotificationsService,
          params
        );
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getSubscription', () => {
    describe('positive tests', () => {
      function __getSubscriptionTest() {
        // Construct the params object for operation getSubscription
        const instanceId = 'testString';
        const id = 'testString';
        const getSubscriptionParams = {
          instanceId,
          id,
        };

        const getSubscriptionResult =
          eventNotificationsService.getSubscription(getSubscriptionParams);

        // all methods should return a Promise
        expectToBePromise(getSubscriptionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/subscriptions/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSubscriptionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getSubscriptionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getSubscriptionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSubscriptionParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getSubscription(getSubscriptionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getSubscription({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getSubscription();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSubscription', () => {
    describe('positive tests', () => {
      function __deleteSubscriptionTest() {
        // Construct the params object for operation deleteSubscription
        const instanceId = 'testString';
        const id = 'testString';
        const deleteSubscriptionParams = {
          instanceId,
          id,
        };

        const deleteSubscriptionResult =
          eventNotificationsService.deleteSubscription(deleteSubscriptionParams);

        // all methods should return a Promise
        expectToBePromise(deleteSubscriptionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/subscriptions/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSubscriptionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __deleteSubscriptionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __deleteSubscriptionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSubscriptionParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.deleteSubscription(deleteSubscriptionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.deleteSubscription({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.deleteSubscription();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSubscription', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // UpdateAttributesInvited
      const updateAttributesInvitedModel = {
        add: ['testString'],
        remove: ['testString'],
      };

      // UpdateAttributesSubscribed
      const updateAttributesSubscribedModel = {
        remove: ['testString'],
      };

      // UpdateAttributesUnsubscribed
      const updateAttributesUnsubscribedModel = {
        remove: ['testString'],
      };

      // SubscriptionUpdateAttributesSMSUpdateAttributes
      const subscriptionUpdateAttributesModel = {
        invited: updateAttributesInvitedModel,
        subscribed: updateAttributesSubscribedModel,
        unsubscribed: updateAttributesUnsubscribedModel,
      };

      function __updateSubscriptionTest() {
        // Construct the params object for operation updateSubscription
        const instanceId = 'testString';
        const id = 'testString';
        const name = 'testString';
        const description = 'testString';
        const attributes = subscriptionUpdateAttributesModel;
        const updateSubscriptionParams = {
          instanceId,
          id,
          name,
          description,
          attributes,
        };

        const updateSubscriptionResult =
          eventNotificationsService.updateSubscription(updateSubscriptionParams);

        // all methods should return a Promise
        expectToBePromise(updateSubscriptionResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/subscriptions/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.attributes).toEqual(attributes);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSubscriptionTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __updateSubscriptionTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __updateSubscriptionTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSubscriptionParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.updateSubscription(updateSubscriptionParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.updateSubscription({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.updateSubscription();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createIntegration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // IntegrationCreateMetadata
      const integrationCreateMetadataModel = {
        endpoint: 'testString',
        crn: 'testString',
        bucket_name: 'testString',
      };

      function __createIntegrationTest() {
        // Construct the params object for operation createIntegration
        const instanceId = 'testString';
        const type = 'collect_failed_events';
        const metadata = integrationCreateMetadataModel;
        const createIntegrationParams = {
          instanceId,
          type,
          metadata,
        };

        const createIntegrationResult =
          eventNotificationsService.createIntegration(createIntegrationParams);

        // all methods should return a Promise
        expectToBePromise(createIntegrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/integrations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createIntegrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __createIntegrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __createIntegrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const type = 'collect_failed_events';
        const metadata = integrationCreateMetadataModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createIntegrationParams = {
          instanceId,
          type,
          metadata,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createIntegration(createIntegrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.createIntegration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.createIntegration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listIntegrations', () => {
    describe('positive tests', () => {
      function __listIntegrationsTest() {
        // Construct the params object for operation listIntegrations
        const instanceId = 'testString';
        const offset = 0;
        const limit = 1;
        const search = 'testString';
        const listIntegrationsParams = {
          instanceId,
          offset,
          limit,
          search,
        };

        const listIntegrationsResult =
          eventNotificationsService.listIntegrations(listIntegrationsParams);

        // all methods should return a Promise
        expectToBePromise(listIntegrationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/integrations', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listIntegrationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __listIntegrationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __listIntegrationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listIntegrationsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listIntegrations(listIntegrationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.listIntegrations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.listIntegrations();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('IntegrationsPager tests', () => {
      const serviceUrl = eventNotificationsServiceOptions.url;
      const path = '/v1/instances/testString/integrations';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"limit":1,"integrations":[{"id":"9fab83da-98cb-4f18-a7ba-b6f0435c9673","type":"type","metadata":{"endpoint":"endpoint","crn":"crn","root_key_id":"root_key_id","bucket_name":"bucket_name"},"created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"integrations":[{"id":"9fab83da-98cb-4f18-a7ba-b6f0435c9673","type":"type","metadata":{"endpoint":"endpoint","crn":"crn","root_key_id":"root_key_id","bucket_name":"bucket_name"},"created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const allResults = [];
        const pager = new EventNotificationsV1.IntegrationsPager(eventNotificationsService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const pager = new EventNotificationsV1.IntegrationsPager(eventNotificationsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getIntegration', () => {
    describe('positive tests', () => {
      function __getIntegrationTest() {
        // Construct the params object for operation getIntegration
        const instanceId = 'testString';
        const id = 'testString';
        const getIntegrationParams = {
          instanceId,
          id,
        };

        const getIntegrationResult = eventNotificationsService.getIntegration(getIntegrationParams);

        // all methods should return a Promise
        expectToBePromise(getIntegrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/integrations/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getIntegrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getIntegrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getIntegrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getIntegrationParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getIntegration(getIntegrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getIntegration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getIntegration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('replaceIntegration', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // IntegrationMetadata
      const integrationMetadataModel = {
        endpoint: 'testString',
        crn: 'testString',
        root_key_id: 'testString',
        bucket_name: 'testString',
      };

      function __replaceIntegrationTest() {
        // Construct the params object for operation replaceIntegration
        const instanceId = 'testString';
        const id = 'testString';
        const type = 'testString';
        const metadata = integrationMetadataModel;
        const replaceIntegrationParams = {
          instanceId,
          id,
          type,
          metadata,
        };

        const replaceIntegrationResult =
          eventNotificationsService.replaceIntegration(replaceIntegrationParams);

        // all methods should return a Promise
        expectToBePromise(replaceIntegrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/integrations/{id}',
          'PUT'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.metadata).toEqual(metadata);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __replaceIntegrationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __replaceIntegrationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __replaceIntegrationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const type = 'testString';
        const metadata = integrationMetadataModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const replaceIntegrationParams = {
          instanceId,
          id,
          type,
          metadata,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.replaceIntegration(replaceIntegrationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.replaceIntegration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.replaceIntegration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('createSmtpConfiguration', () => {
    describe('positive tests', () => {
      function __createSmtpConfigurationTest() {
        // Construct the params object for operation createSmtpConfiguration
        const instanceId = 'testString';
        const name = 'testString';
        const domain = 'testString';
        const description = 'testString';
        const createSmtpConfigurationParams = {
          instanceId,
          name,
          domain,
          description,
        };

        const createSmtpConfigurationResult = eventNotificationsService.createSmtpConfiguration(
          createSmtpConfigurationParams
        );

        // all methods should return a Promise
        expectToBePromise(createSmtpConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/smtp/config', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.domain).toEqual(domain);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSmtpConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __createSmtpConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __createSmtpConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const name = 'testString';
        const domain = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSmtpConfigurationParams = {
          instanceId,
          name,
          domain,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createSmtpConfiguration(createSmtpConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.createSmtpConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.createSmtpConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSmtpConfigurations', () => {
    describe('positive tests', () => {
      function __listSmtpConfigurationsTest() {
        // Construct the params object for operation listSmtpConfigurations
        const instanceId = 'testString';
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const listSmtpConfigurationsParams = {
          instanceId,
          limit,
          offset,
          search,
        };

        const listSmtpConfigurationsResult = eventNotificationsService.listSmtpConfigurations(
          listSmtpConfigurationsParams
        );

        // all methods should return a Promise
        expectToBePromise(listSmtpConfigurationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/smtp/config', 'GET');
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSmtpConfigurationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __listSmtpConfigurationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __listSmtpConfigurationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSmtpConfigurationsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listSmtpConfigurations(listSmtpConfigurationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.listSmtpConfigurations({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.listSmtpConfigurations();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('SmtpConfigurationsPager tests', () => {
      const serviceUrl = eventNotificationsServiceOptions.url;
      const path = '/v1/instances/testString/smtp/config';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"limit":1,"smtp_configurations":[{"id":"id","name":"name","description":"description","domain":"domain","config":{"dkim":{"txt_name":"txt_name","txt_value":"txt_value","verification":"verification"},"en_authorization":{"verification":"verification"},"spf":{"txt_name":"txt_name","txt_value":"txt_value","verification":"verification"}},"updated_at":"2019-01-01T12:00:00.000Z"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"smtp_configurations":[{"id":"id","name":"name","description":"description","domain":"domain","config":{"dkim":{"txt_name":"txt_name","txt_value":"txt_value","verification":"verification"},"en_authorization":{"verification":"verification"},"spf":{"txt_name":"txt_name","txt_value":"txt_value","verification":"verification"}},"updated_at":"2019-01-01T12:00:00.000Z"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const allResults = [];
        const pager = new EventNotificationsV1.SmtpConfigurationsPager(
          eventNotificationsService,
          params
        );
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          instanceId: 'testString',
          limit: 10,
          search: 'testString',
        };
        const pager = new EventNotificationsV1.SmtpConfigurationsPager(
          eventNotificationsService,
          params
        );
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('createSmtpUser', () => {
    describe('positive tests', () => {
      function __createSmtpUserTest() {
        // Construct the params object for operation createSmtpUser
        const instanceId = 'testString';
        const id = 'testString';
        const description = 'testString';
        const createSmtpUserParams = {
          instanceId,
          id,
          description,
        };

        const createSmtpUserResult = eventNotificationsService.createSmtpUser(createSmtpUserParams);

        // all methods should return a Promise
        expectToBePromise(createSmtpUserResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/smtp/config/{id}/users',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __createSmtpUserTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __createSmtpUserTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __createSmtpUserTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const createSmtpUserParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createSmtpUser(createSmtpUserParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.createSmtpUser({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.createSmtpUser();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('listSmtpUsers', () => {
    describe('positive tests', () => {
      function __listSmtpUsersTest() {
        // Construct the params object for operation listSmtpUsers
        const instanceId = 'testString';
        const id = 'testString';
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const listSmtpUsersParams = {
          instanceId,
          id,
          limit,
          offset,
          search,
        };

        const listSmtpUsersResult = eventNotificationsService.listSmtpUsers(listSmtpUsersParams);

        // all methods should return a Promise
        expectToBePromise(listSmtpUsersResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/smtp/config/{id}/users',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.qs.search).toEqual(search);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listSmtpUsersTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __listSmtpUsersTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __listSmtpUsersTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listSmtpUsersParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listSmtpUsers(listSmtpUsersParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.listSmtpUsers({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.listSmtpUsers();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });

    describe('SmtpUsersPager tests', () => {
      const serviceUrl = eventNotificationsServiceOptions.url;
      const path = '/v1/instances/testString/smtp/config/testString/users';
      const mockPagerResponse1 =
        '{"next":{"href":"https://myhost.com/somePath?offset=1"},"total_count":2,"limit":1,"users":[{"id":"id","smtp_config_id":"smtp_config_id","description":"description","domain":"domain","username":"username","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z"}]}';
      const mockPagerResponse2 =
        '{"total_count":2,"limit":1,"users":[{"id":"id","smtp_config_id":"smtp_config_id","description":"description","domain":"domain","username":"username","created_at":"2019-01-01T12:00:00.000Z","updated_at":"2019-01-01T12:00:00.000Z"}]}';

      beforeEach(() => {
        unmock_createRequest();
        const scope = nock(serviceUrl)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse1)
          .get((uri) => uri.includes(path))
          .reply(200, mockPagerResponse2);
      });

      afterEach(() => {
        nock.cleanAll();
        mock_createRequest();
      });

      test('getNext()', async () => {
        const params = {
          instanceId: 'testString',
          id: 'testString',
          limit: 10,
          search: 'testString',
        };
        const allResults = [];
        const pager = new EventNotificationsV1.SmtpUsersPager(eventNotificationsService, params);
        while (pager.hasNext()) {
          const nextPage = await pager.getNext();
          expect(nextPage).not.toBeNull();
          allResults.push(...nextPage);
        }
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });

      test('getAll()', async () => {
        const params = {
          instanceId: 'testString',
          id: 'testString',
          limit: 10,
          search: 'testString',
        };
        const pager = new EventNotificationsV1.SmtpUsersPager(eventNotificationsService, params);
        const allResults = await pager.getAll();
        expect(allResults).not.toBeNull();
        expect(allResults).toHaveLength(2);
      });
    });
  });

  describe('getSmtpConfiguration', () => {
    describe('positive tests', () => {
      function __getSmtpConfigurationTest() {
        // Construct the params object for operation getSmtpConfiguration
        const instanceId = 'testString';
        const id = 'testString';
        const getSmtpConfigurationParams = {
          instanceId,
          id,
        };

        const getSmtpConfigurationResult = eventNotificationsService.getSmtpConfiguration(
          getSmtpConfigurationParams
        );

        // all methods should return a Promise
        expectToBePromise(getSmtpConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/smtp/config/{id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSmtpConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getSmtpConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getSmtpConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSmtpConfigurationParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getSmtpConfiguration(getSmtpConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getSmtpConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getSmtpConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSmtpConfiguration', () => {
    describe('positive tests', () => {
      function __updateSmtpConfigurationTest() {
        // Construct the params object for operation updateSmtpConfiguration
        const instanceId = 'testString';
        const id = 'testString';
        const name = 'testString';
        const description = 'testString';
        const updateSmtpConfigurationParams = {
          instanceId,
          id,
          name,
          description,
        };

        const updateSmtpConfigurationResult = eventNotificationsService.updateSmtpConfiguration(
          updateSmtpConfigurationParams
        );

        // all methods should return a Promise
        expectToBePromise(updateSmtpConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/smtp/config/{id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSmtpConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __updateSmtpConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __updateSmtpConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSmtpConfigurationParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.updateSmtpConfiguration(updateSmtpConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.updateSmtpConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.updateSmtpConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSmtpConfiguration', () => {
    describe('positive tests', () => {
      function __deleteSmtpConfigurationTest() {
        // Construct the params object for operation deleteSmtpConfiguration
        const instanceId = 'testString';
        const id = 'testString';
        const deleteSmtpConfigurationParams = {
          instanceId,
          id,
        };

        const deleteSmtpConfigurationResult = eventNotificationsService.deleteSmtpConfiguration(
          deleteSmtpConfigurationParams
        );

        // all methods should return a Promise
        expectToBePromise(deleteSmtpConfigurationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/smtp/config/{id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSmtpConfigurationTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __deleteSmtpConfigurationTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __deleteSmtpConfigurationTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSmtpConfigurationParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.deleteSmtpConfiguration(deleteSmtpConfigurationParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.deleteSmtpConfiguration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.deleteSmtpConfiguration();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSmtpUser', () => {
    describe('positive tests', () => {
      function __getSmtpUserTest() {
        // Construct the params object for operation getSmtpUser
        const instanceId = 'testString';
        const id = 'testString';
        const userId = 'testString';
        const getSmtpUserParams = {
          instanceId,
          id,
          userId,
        };

        const getSmtpUserResult = eventNotificationsService.getSmtpUser(getSmtpUserParams);

        // all methods should return a Promise
        expectToBePromise(getSmtpUserResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/smtp/config/{id}/users/{user_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.user_id).toEqual(userId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSmtpUserTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getSmtpUserTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getSmtpUserTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSmtpUserParams = {
          instanceId,
          id,
          userId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getSmtpUser(getSmtpUserParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getSmtpUser({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getSmtpUser();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateSmtpUser', () => {
    describe('positive tests', () => {
      function __updateSmtpUserTest() {
        // Construct the params object for operation updateSmtpUser
        const instanceId = 'testString';
        const id = 'testString';
        const userId = 'testString';
        const description = 'testString';
        const updateSmtpUserParams = {
          instanceId,
          id,
          userId,
          description,
        };

        const updateSmtpUserResult = eventNotificationsService.updateSmtpUser(updateSmtpUserParams);

        // all methods should return a Promise
        expectToBePromise(updateSmtpUserResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/smtp/config/{id}/users/{user_id}',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.user_id).toEqual(userId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateSmtpUserTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __updateSmtpUserTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __updateSmtpUserTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateSmtpUserParams = {
          instanceId,
          id,
          userId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.updateSmtpUser(updateSmtpUserParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.updateSmtpUser({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.updateSmtpUser();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('deleteSmtpUser', () => {
    describe('positive tests', () => {
      function __deleteSmtpUserTest() {
        // Construct the params object for operation deleteSmtpUser
        const instanceId = 'testString';
        const id = 'testString';
        const userId = 'testString';
        const deleteSmtpUserParams = {
          instanceId,
          id,
          userId,
        };

        const deleteSmtpUserResult = eventNotificationsService.deleteSmtpUser(deleteSmtpUserParams);

        // all methods should return a Promise
        expectToBePromise(deleteSmtpUserResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/smtp/config/{id}/users/{user_id}',
          'DELETE'
        );
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.user_id).toEqual(userId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __deleteSmtpUserTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __deleteSmtpUserTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __deleteSmtpUserTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const deleteSmtpUserParams = {
          instanceId,
          id,
          userId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.deleteSmtpUser(deleteSmtpUserParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.deleteSmtpUser({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.deleteSmtpUser();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('getSmtpAllowedIps', () => {
    describe('positive tests', () => {
      function __getSmtpAllowedIpsTest() {
        // Construct the params object for operation getSmtpAllowedIps
        const instanceId = 'testString';
        const id = 'testString';
        const getSmtpAllowedIpsParams = {
          instanceId,
          id,
        };

        const getSmtpAllowedIpsResult =
          eventNotificationsService.getSmtpAllowedIps(getSmtpAllowedIpsParams);

        // all methods should return a Promise
        expectToBePromise(getSmtpAllowedIpsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/smtp/config/{id}/allowed_ips',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getSmtpAllowedIpsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getSmtpAllowedIpsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getSmtpAllowedIpsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getSmtpAllowedIpsParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getSmtpAllowedIps(getSmtpAllowedIpsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getSmtpAllowedIps({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getSmtpAllowedIps();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });

  describe('updateVerifySmtp', () => {
    describe('positive tests', () => {
      function __updateVerifySmtpTest() {
        // Construct the params object for operation updateVerifySmtp
        const instanceId = 'testString';
        const id = 'testString';
        const type = 'testString';
        const updateVerifySmtpParams = {
          instanceId,
          id,
          type,
        };

        const updateVerifySmtpResult =
          eventNotificationsService.updateVerifySmtp(updateVerifySmtpParams);

        // all methods should return a Promise
        expectToBePromise(updateVerifySmtpResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/smtp/config/{id}/verify',
          'PATCH'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.type).toEqual(type);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __updateVerifySmtpTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __updateVerifySmtpTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __updateVerifySmtpTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const type = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const updateVerifySmtpParams = {
          instanceId,
          id,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.updateVerifySmtp(updateVerifySmtpParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.updateVerifySmtp({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.updateVerifySmtp();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
});
