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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const EventNotificationsV1 = require('../../dist/event-notifications/v1');

const { getOptions, checkUrlAndMethod, checkMediaHeaders, expectToBePromise } = unitTestUtils;

const eventNotificationsServiceOptions = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://us-south.event-notifications.cloud.ibm.com/event-notifications',
};

const eventNotificationsService = new EventNotificationsV1(eventNotificationsServiceOptions);

// dont actually create a request
const createRequestMock = jest.spyOn(eventNotificationsService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('EventNotificationsV1', () => {
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
  describe('listSources', () => {
    describe('positive tests', () => {
      function __listSourcesTest() {
        // Construct the params object for operation listSources
        const instanceId = 'testString';
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const params = {
          instanceId,
          limit,
          offset,
          search,
        };

        const listSourcesResult = eventNotificationsService.listSources(params);

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
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listSources(params);
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
  });
  describe('getSource', () => {
    describe('positive tests', () => {
      function __getSourceTest() {
        // Construct the params object for operation getSource
        const instanceId = 'testString';
        const id = 'testString';
        const params = {
          instanceId,
          id,
        };

        const getSourceResult = eventNotificationsService.getSource(params);

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
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getSource(params);
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
  describe('createTopic', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Rules
      const rulesModel = {
        enabled: true,
        event_type_filter: "$.notification_event_info.event_type == 'cert_manager'",
        notification_filter: "$.notification.findings[0].severity == 'MODERATE'",
      };

      // TopicUpdateSourcesItem
      const topicUpdateSourcesItemModel = {
        id: 'e7c3b3ee-78d9-4e02-95c3-c001a05e6ea5:api',
        rules: [rulesModel],
      };

      function __createTopicTest() {
        // Construct the params object for operation createTopic
        const instanceId = 'testString';
        const name = 'testString';
        const description = 'testString';
        const sources = [topicUpdateSourcesItemModel];
        const params = {
          instanceId,
          name,
          description,
          sources,
        };

        const createTopicResult = eventNotificationsService.createTopic(params);

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
        const params = {
          instanceId,
          name,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createTopic(params);
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
        const params = {
          instanceId,
          limit,
          offset,
          search,
        };

        const listTopicsResult = eventNotificationsService.listTopics(params);

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
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listTopics(params);
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
  });
  describe('getTopic', () => {
    describe('positive tests', () => {
      function __getTopicTest() {
        // Construct the params object for operation getTopic
        const instanceId = 'testString';
        const id = 'testString';
        const include = 'testString';
        const params = {
          instanceId,
          id,
          include,
        };

        const getTopicResult = eventNotificationsService.getTopic(params);

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
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getTopic(params);
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

      // Rules
      const rulesModel = {
        enabled: true,
        event_type_filter: "$.notification_event_info.event_type == 'cert_manager'",
        notification_filter: "$.notification.findings[0].severity == 'MODERATE'",
      };

      // TopicUpdateSourcesItem
      const topicUpdateSourcesItemModel = {
        id: 'e7c3b3ee-78d9-4e02-95c3-c001a05e6ea5:api',
        rules: [rulesModel],
      };

      function __replaceTopicTest() {
        // Construct the params object for operation replaceTopic
        const instanceId = 'testString';
        const id = 'testString';
        const name = 'testString';
        const description = 'testString';
        const sources = [topicUpdateSourcesItemModel];
        const params = {
          instanceId,
          id,
          name,
          description,
          sources,
        };

        const replaceTopicResult = eventNotificationsService.replaceTopic(params);

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
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.replaceTopic(params);
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
        const params = {
          instanceId,
          id,
        };

        const deleteTopicResult = eventNotificationsService.deleteTopic(params);

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
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.deleteTopic(params);
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
  describe('createDestination', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // DestinationConfigParamsWebhookDestinationConfig
      const destinationConfigParamsModel = {
        url: 'testString',
        verb: 'get',
        custom_headers: { 'key1': 'testString' },
        sensitive_headers: ['testString'],
      };

      // DestinationConfig
      const destinationConfigModel = {
        params: destinationConfigParamsModel,
      };

      function __createDestinationTest() {
        // Construct the params object for operation createDestination
        const instanceId = 'testString';
        const name = 'testString';
        const type = 'webhook';
        const description = 'testString';
        const config = destinationConfigModel;
        const params = {
          instanceId,
          name,
          type,
          description,
          config,
        };

        const createDestinationResult = eventNotificationsService.createDestination(params);

        // all methods should return a Promise
        expectToBePromise(createDestinationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(mockRequestOptions, '/v1/instances/{instance_id}/destinations', 'POST');
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.type).toEqual(type);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.config).toEqual(config);
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
        const params = {
          instanceId,
          name,
          type,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createDestination(params);
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
        const params = {
          instanceId,
          limit,
          offset,
          search,
        };

        const listDestinationsResult = eventNotificationsService.listDestinations(params);

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
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listDestinations(params);
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
  });
  describe('getDestination', () => {
    describe('positive tests', () => {
      function __getDestinationTest() {
        // Construct the params object for operation getDestination
        const instanceId = 'testString';
        const id = 'testString';
        const params = {
          instanceId,
          id,
        };

        const getDestinationResult = eventNotificationsService.getDestination(params);

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
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getDestination(params);
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

      // DestinationConfigParamsWebhookDestinationConfig
      const destinationConfigParamsModel = {
        url: 'testString',
        verb: 'get',
        custom_headers: { 'key1': 'testString' },
        sensitive_headers: ['testString'],
      };

      // DestinationConfig
      const destinationConfigModel = {
        params: destinationConfigParamsModel,
      };

      function __updateDestinationTest() {
        // Construct the params object for operation updateDestination
        const instanceId = 'testString';
        const id = 'testString';
        const name = 'testString';
        const description = 'testString';
        const config = destinationConfigModel;
        const params = {
          instanceId,
          id,
          name,
          description,
          config,
        };

        const updateDestinationResult = eventNotificationsService.updateDestination(params);

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
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.name).toEqual(name);
        expect(mockRequestOptions.body.description).toEqual(description);
        expect(mockRequestOptions.body.config).toEqual(config);
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
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.updateDestination(params);
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
        const params = {
          instanceId,
          id,
        };

        const deleteDestinationResult = eventNotificationsService.deleteDestination(params);

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
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.deleteDestination(params);
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
  describe('createSubscription', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // SubscriptionCreateAttributesSMSAttributes
      const subscriptionCreateAttributesModel = {
        to: ['testString'],
      };

      function __createSubscriptionTest() {
        // Construct the params object for operation createSubscription
        const instanceId = 'testString';
        const name = 'testString';
        const destinationId = 'testString';
        const topicId = 'testString';
        const attributes = subscriptionCreateAttributesModel;
        const description = 'testString';
        const params = {
          instanceId,
          name,
          destinationId,
          topicId,
          attributes,
          description,
        };

        const createSubscriptionResult = eventNotificationsService.createSubscription(params);

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
        expect(mockRequestOptions.body.attributes).toEqual(attributes);
        expect(mockRequestOptions.body.description).toEqual(description);
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
        const attributes = subscriptionCreateAttributesModel;
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          instanceId,
          name,
          destinationId,
          topicId,
          attributes,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.createSubscription(params);
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
        const params = {
          instanceId,
          offset,
          limit,
          search,
        };

        const listSubscriptionsResult = eventNotificationsService.listSubscriptions(params);

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
        const params = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listSubscriptions(params);
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
  });
  describe('getSubscription', () => {
    describe('positive tests', () => {
      function __getSubscriptionTest() {
        // Construct the params object for operation getSubscription
        const instanceId = 'testString';
        const id = 'testString';
        const params = {
          instanceId,
          id,
        };

        const getSubscriptionResult = eventNotificationsService.getSubscription(params);

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
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getSubscription(params);
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
        const params = {
          instanceId,
          id,
        };

        const deleteSubscriptionResult = eventNotificationsService.deleteSubscription(params);

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
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.deleteSubscription(params);
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

      // SubscriptionUpdateAttributesSMSAttributes
      const subscriptionUpdateAttributesModel = {
        to: ['testString'],
      };

      function __updateSubscriptionTest() {
        // Construct the params object for operation updateSubscription
        const instanceId = 'testString';
        const id = 'testString';
        const name = 'testString';
        const description = 'testString';
        const attributes = subscriptionUpdateAttributesModel;
        const params = {
          instanceId,
          id,
          name,
          description,
          attributes,
        };

        const updateSubscriptionResult = eventNotificationsService.updateSubscription(params);

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
        const params = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.updateSubscription(params);
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
});
