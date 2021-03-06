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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');

const { NoAuthAuthenticator, unitTestUtils } = core;

const EventNotificationsV1 = require('../../dist/event-notifications/v1');

const { getOptions, checkUrlAndMethod, checkMediaHeaders, expectToBePromise, checkUserHeader } =
  unitTestUtils;

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
  describe('sendNotifications', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NotificationCreate
      const notificationCreateModel = {
        data: { 'key1': 'testString' },
        ibmenseverity: 'testString',
        ibmenfcmbody: 'testString',
        ibmenapnsbody: 'testString',
        ibmensafaribody: 'testString',
        ibmenpushto:
          '{"fcm_devices":["9c75975a-37d0-3898-905d-3b5ee0d7c172","C9CACDF5-6EBF-49E1-AD60-E25BA23E954C"],"apns_devices":["3423-37d0-3898-905d-42342","432423-6EBF-49E1-AD60-4234"],"user_ids":["user-1","user-2"],"tags":["tag-1","tag-2"],"platforms":["push_android","push_ios","push_chrome","push_firefox"]}',
        ibmenapnsheaders: 'testString',
        ibmendefaultshort: 'testString',
        ibmendefaultlong: 'testString',
        ibmenchromebody: 'testString',
        ibmenfirefoxbody: 'testString',
        ibmenchromeheaders: 'testString',
        ibmenfirefoxheaders: 'testString',
        ibmensourceid: 'testString',
        datacontenttype: 'application/json',
        subject: 'testString',
        id: 'testString',
        source: 'testString',
        type: 'testString',
        specversion: '1.0',
        time: 'testString',
        foo: 'testString',
      };

      function __sendNotificationsTest() {
        // Construct the params object for operation sendNotifications
        const instanceId = 'testString';
        const body = notificationCreateModel;
        const ceIbmenseverity = 'testString';
        const ceIbmendefaultshort = 'testString';
        const ceIbmendefaultlong = 'testString';
        const ceIbmenfcmbody = 'testString';
        const ceIbmenapnsbody = 'testString';
        const ceIbmensafaribody = 'testString';
        const ceIbmenpushto =
          '{"fcm_devices":["9c75975a-37d0-3898-905d-3b5ee0d7c172","C9CACDF5-6EBF-49E1-AD60-E25BA23E954C"],"apns_devices":["3423-37d0-3898-905d-42342","432423-6EBF-49E1-AD60-4234"],"user_ids":["user-1","user-2"],"tags":["tag-1","tag-2"],"platforms":["push_android","push_ios","push_chrome","push_firefox"]}';
        const ceIbmenapnsheaders = 'testString';
        const ceIbmenchromebody = 'testString';
        const ceIbmenfirefoxbody = 'testString';
        const ceIbmenchromeheaders = 'testString';
        const ceIbmenfirefoxheaders = 'testString';
        const ceIbmensourceid = 'testString';
        const ceId = 'testString';
        const ceSource = 'testString';
        const ceType = 'testString';
        const ceSpecversion = '1.0';
        const ceTime = 'testString';
        const sendNotificationsParams = {
          instanceId,
          body,
          ceIbmenseverity,
          ceIbmendefaultshort,
          ceIbmendefaultlong,
          ceIbmenfcmbody,
          ceIbmenapnsbody,
          ceIbmensafaribody,
          ceIbmenpushto,
          ceIbmenapnsheaders,
          ceIbmenchromebody,
          ceIbmenfirefoxbody,
          ceIbmenchromeheaders,
          ceIbmenfirefoxheaders,
          ceIbmensourceid,
          ceId,
          ceSource,
          ceType,
          ceSpecversion,
          ceTime,
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
        checkUserHeader(createRequestMock, 'ce-ibmenseverity', ceIbmenseverity);
        checkUserHeader(createRequestMock, 'ce-ibmendefaultshort', ceIbmendefaultshort);
        checkUserHeader(createRequestMock, 'ce-ibmendefaultlong', ceIbmendefaultlong);
        checkUserHeader(createRequestMock, 'ce-ibmenfcmbody', ceIbmenfcmbody);
        checkUserHeader(createRequestMock, 'ce-ibmenapnsbody', ceIbmenapnsbody);
        checkUserHeader(createRequestMock, 'ce-ibmensafaribody', ceIbmensafaribody);
        checkUserHeader(createRequestMock, 'ce-ibmenpushto', ceIbmenpushto);
        checkUserHeader(createRequestMock, 'ce-ibmenapnsheaders', ceIbmenapnsheaders);
        checkUserHeader(createRequestMock, 'ce-ibmenchromebody', ceIbmenchromebody);
        checkUserHeader(createRequestMock, 'ce-ibmenfirefoxbody', ceIbmenfirefoxbody);
        checkUserHeader(createRequestMock, 'ce-ibmenchromeheaders', ceIbmenchromeheaders);
        checkUserHeader(createRequestMock, 'ce-ibmenfirefoxheaders', ceIbmenfirefoxheaders);
        checkUserHeader(createRequestMock, 'ce-ibmensourceid', ceIbmensourceid);
        checkUserHeader(createRequestMock, 'ce-id', ceId);
        checkUserHeader(createRequestMock, 'ce-source', ceSource);
        checkUserHeader(createRequestMock, 'ce-type', ceType);
        checkUserHeader(createRequestMock, 'ce-specversion', ceSpecversion);
        checkUserHeader(createRequestMock, 'ce-time', ceTime);
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
  describe('sendBulkNotifications', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // NotificationCreate
      const notificationCreateModel = {
        data: { 'key1': 'testString' },
        ibmenseverity: 'testString',
        ibmenfcmbody: 'testString',
        ibmenapnsbody: 'testString',
        ibmensafaribody: 'testString',
        ibmenpushto:
          '{"fcm_devices":["9c75975a-37d0-3898-905d-3b5ee0d7c172","C9CACDF5-6EBF-49E1-AD60-E25BA23E954C"],"apns_devices":["3423-37d0-3898-905d-42342","432423-6EBF-49E1-AD60-4234"],"user_ids":["user-1","user-2"],"tags":["tag-1","tag-2"],"platforms":["push_android","push_ios","push_chrome","push_firefox"]}',
        ibmenapnsheaders: 'testString',
        ibmendefaultshort: 'testString',
        ibmendefaultlong: 'testString',
        ibmenchromebody: 'testString',
        ibmenfirefoxbody: 'testString',
        ibmenchromeheaders: 'testString',
        ibmenfirefoxheaders: 'testString',
        ibmensourceid: 'testString',
        datacontenttype: 'application/json',
        subject: 'testString',
        id: 'testString',
        source: 'testString',
        type: 'testString',
        specversion: '1.0',
        time: 'testString',
        foo: 'testString',
      };

      function __sendBulkNotificationsTest() {
        // Construct the params object for operation sendBulkNotifications
        const instanceId = 'testString';
        const bulkMessages = [notificationCreateModel];
        const sendBulkNotificationsParams = {
          instanceId,
          bulkMessages,
        };

        const sendBulkNotificationsResult = eventNotificationsService.sendBulkNotifications(
          sendBulkNotificationsParams
        );

        // all methods should return a Promise
        expectToBePromise(sendBulkNotificationsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/notifications/bulk',
          'POST'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = 'application/json';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.body.bulk_messages).toEqual(bulkMessages);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __sendBulkNotificationsTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __sendBulkNotificationsTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __sendBulkNotificationsTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const sendBulkNotificationsParams = {
          instanceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.sendBulkNotifications(sendBulkNotificationsParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.sendBulkNotifications({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.sendBulkNotifications();
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
        expect(mockRequestOptions.formData.config).toEqual(config);
        expect(mockRequestOptions.formData.certificate.data).toEqual(certificate);
        expect(mockRequestOptions.formData.certificate.contentType).toEqual(certificateContentType);
        expect(mockRequestOptions.formData.icon_16x16.data).toEqual(icon16x16);
        expect(mockRequestOptions.formData.icon_16x16.contentType).toEqual(icon16x16ContentType);
        expect(mockRequestOptions.formData['icon_16x16@2x'].data).toEqual(icon16x162x);
        expect(mockRequestOptions.formData['icon_16x16@2x'].contentType).toEqual(
          icon16x162xContentType
        );
        expect(mockRequestOptions.formData.icon_32x32.data).toEqual(icon32x32);
        expect(mockRequestOptions.formData.icon_32x32.contentType).toEqual(icon32x32ContentType);
        expect(mockRequestOptions.formData['icon_32x32@2x'].data).toEqual(icon32x322x);
        expect(mockRequestOptions.formData['icon_32x32@2x'].contentType).toEqual(
          icon32x322xContentType
        );
        expect(mockRequestOptions.formData.icon_128x128.data).toEqual(icon128x128);
        expect(mockRequestOptions.formData.icon_128x128.contentType).toEqual(
          icon128x128ContentType
        );
        expect(mockRequestOptions.formData['icon_128x128@2x'].data).toEqual(icon128x1282x);
        expect(mockRequestOptions.formData['icon_128x128@2x'].contentType).toEqual(
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
        expect(mockRequestOptions.formData.config).toEqual(config);
        expect(mockRequestOptions.formData.certificate.data).toEqual(certificate);
        expect(mockRequestOptions.formData.certificate.contentType).toEqual(certificateContentType);
        expect(mockRequestOptions.formData.icon_16x16.data).toEqual(icon16x16);
        expect(mockRequestOptions.formData.icon_16x16.contentType).toEqual(icon16x16ContentType);
        expect(mockRequestOptions.formData['icon_16x16@2x'].data).toEqual(icon16x162x);
        expect(mockRequestOptions.formData['icon_16x16@2x'].contentType).toEqual(
          icon16x162xContentType
        );
        expect(mockRequestOptions.formData.icon_32x32.data).toEqual(icon32x32);
        expect(mockRequestOptions.formData.icon_32x32.contentType).toEqual(icon32x32ContentType);
        expect(mockRequestOptions.formData['icon_32x32@2x'].data).toEqual(icon32x322x);
        expect(mockRequestOptions.formData['icon_32x32@2x'].contentType).toEqual(
          icon32x322xContentType
        );
        expect(mockRequestOptions.formData.icon_128x128.data).toEqual(icon128x128);
        expect(mockRequestOptions.formData.icon_128x128.contentType).toEqual(
          icon128x128ContentType
        );
        expect(mockRequestOptions.formData['icon_128x128@2x'].data).toEqual(icon128x1282x);
        expect(mockRequestOptions.formData['icon_128x128@2x'].contentType).toEqual(
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
  describe('listDestinationDevices', () => {
    describe('positive tests', () => {
      function __listDestinationDevicesTest() {
        // Construct the params object for operation listDestinationDevices
        const instanceId = 'testString';
        const id = 'testString';
        const limit = 1;
        const offset = 0;
        const search = 'testString';
        const listDestinationDevicesParams = {
          instanceId,
          id,
          limit,
          offset,
          search,
        };

        const listDestinationDevicesResult = eventNotificationsService.listDestinationDevices(
          listDestinationDevicesParams
        );

        // all methods should return a Promise
        expectToBePromise(listDestinationDevicesResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}/devices',
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
        __listDestinationDevicesTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __listDestinationDevicesTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __listDestinationDevicesTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listDestinationDevicesParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listDestinationDevices(listDestinationDevicesParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.listDestinationDevices({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.listDestinationDevices();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('getDestinationDevicesReport', () => {
    describe('positive tests', () => {
      function __getDestinationDevicesReportTest() {
        // Construct the params object for operation getDestinationDevicesReport
        const instanceId = 'testString';
        const id = 'testString';
        const days = 1;
        const getDestinationDevicesReportParams = {
          instanceId,
          id,
          days,
        };

        const getDestinationDevicesReportResult =
          eventNotificationsService.getDestinationDevicesReport(getDestinationDevicesReportParams);

        // all methods should return a Promise
        expectToBePromise(getDestinationDevicesReportResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}/devices/report',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.days).toEqual(days);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __getDestinationDevicesReportTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __getDestinationDevicesReportTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __getDestinationDevicesReportTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const getDestinationDevicesReportParams = {
          instanceId,
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.getDestinationDevicesReport(getDestinationDevicesReportParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.getDestinationDevicesReport({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.getDestinationDevicesReport();
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });
    });
  });
  describe('listTagsSubscriptionsDevice', () => {
    describe('positive tests', () => {
      function __listTagsSubscriptionsDeviceTest() {
        // Construct the params object for operation listTagsSubscriptionsDevice
        const instanceId = 'testString';
        const id = 'testString';
        const deviceId = 'testString';
        const tagName = 'testString';
        const limit = 1;
        const offset = 0;
        const listTagsSubscriptionsDeviceParams = {
          instanceId,
          id,
          deviceId,
          tagName,
          limit,
          offset,
        };

        const listTagsSubscriptionsDeviceResult =
          eventNotificationsService.listTagsSubscriptionsDevice(listTagsSubscriptionsDeviceParams);

        // all methods should return a Promise
        expectToBePromise(listTagsSubscriptionsDeviceResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const mockRequestOptions = getOptions(createRequestMock);

        checkUrlAndMethod(
          mockRequestOptions,
          '/v1/instances/{instance_id}/destinations/{id}/tag_subscriptions/devices/{device_id}',
          'GET'
        );
        const expectedAccept = 'application/json';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(mockRequestOptions.qs.tag_name).toEqual(tagName);
        expect(mockRequestOptions.qs.limit).toEqual(limit);
        expect(mockRequestOptions.qs.offset).toEqual(offset);
        expect(mockRequestOptions.path.instance_id).toEqual(instanceId);
        expect(mockRequestOptions.path.id).toEqual(id);
        expect(mockRequestOptions.path.device_id).toEqual(deviceId);
      }

      test('should pass the right params to createRequest with enable and disable retries', () => {
        // baseline test
        __listTagsSubscriptionsDeviceTest();

        // enable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.enableRetries();
        __listTagsSubscriptionsDeviceTest();

        // disable retries and test again
        createRequestMock.mockClear();
        eventNotificationsService.disableRetries();
        __listTagsSubscriptionsDeviceTest();
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const instanceId = 'testString';
        const id = 'testString';
        const deviceId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const listTagsSubscriptionsDeviceParams = {
          instanceId,
          id,
          deviceId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        eventNotificationsService.listTagsSubscriptionsDevice(listTagsSubscriptionsDeviceParams);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async () => {
        let err;
        try {
          await eventNotificationsService.listTagsSubscriptionsDevice({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
      });

      test('should reject promise when required params are not given', async () => {
        let err;
        try {
          await eventNotificationsService.listTagsSubscriptionsDevice();
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
        to: ['testString'],
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
});
