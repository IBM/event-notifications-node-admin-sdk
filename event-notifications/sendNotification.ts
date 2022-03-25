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

import {
  BaseService,
  validateParams,
  UserOptions,
  getAuthenticatorFromEnvironment,
} from 'ibm-cloud-sdk-core';
import * as extend from 'extend';
import { OutgoingHttpHeaders } from 'http';
import { getSdkHeaders } from '../lib/common';
import EventNotificationsV1 = require('./v1');

class SendNotifications extends BaseService {
  static DEFAULT_SERVICE_URL: string =
    'https://us-south.event-notifications.cloud.ibm.com/event-notifications';

  static DEFAULT_SERVICE_NAME: string = 'event_notifications';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of EventNotificationsV1 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {EventNotificationsV1}
   */

  public static newInstance(options: UserOptions): SendNotifications {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new SendNotifications(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }

  /**
   * Construct a EventNotificationsV1 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {EventNotificationsV1}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(SendNotifications.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * sendNotifications
   ************************/

  /**
   * Send a notification.
   *
   * Send a notification.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.instanceId - Unique identifier for IBM Cloud Event Notifications instance.
   * @param {string} params.ibmenseverity - The Notifications id.
   * @param {string} params.ibmensourceid - The Event Notifications source id.
   * @param {string} params.subject - The Notifications subject.
   * @param {string} params.id - The Notifications id.
   * @param {string} params.source - The source of Notifications.
   * @param {string} params.type - The Notifications type.
   * @param {string} params.time - The Notifications time.
   * @param {JsonObject} [params.data] - The Notifications data for webhook.
   * @param {NotificationFCMBody} [params.ibmenfcmbody] -
   * @param {NotificationAPNSBody} [params.ibmenapnsbody] - Payload describing a APNs Notifications body.
   * @param {NotificationDevices} [params.ibmenpushto] - Payload describing a FCM Notifications targets.
   * @param {JsonObject} [params.ibmenapnsheaders] - The attributes for an FCM/APNs notification.
   * @param {string} [params.datacontenttype] - The Notifications content type.
   * @param {string} [params.specversion] - The Notifications specversion.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<SendNotifications.Response<SendNotifications.NotificationResponse>>}
   */
  public sendNotifications(
    params: SendNotifications.SendNotificationsParams
  ): Promise<EventNotificationsV1.Response<SendNotifications.NotificationResponse>> {
    const _params = { ...params };
    const _requiredParams = [
      'instanceId',
      'ibmenseverity',
      'ibmensourceid',
      'subject',
      'id',
      'source',
      'type',
      'time',
    ];
    const _validParams = [
      'instanceId',
      'ibmenseverity',
      'ibmensourceid',
      'subject',
      'id',
      'source',
      'type',
      'time',
      'data',
      'ibmenfcmbody',
      'ibmenapnsbody',
      'ibmenpushto',
      'ibmenapnsheaders',
      'datacontenttype',
      'specversion',
      'headers',
    ];
    const _validationErrors = validateParams(_params, _requiredParams, _validParams);
    if (_validationErrors) {
      return Promise.reject(_validationErrors);
    }

    const body = {
      'ibmenseverity': _params.ibmenseverity,
      'ibmensourceid': _params.ibmensourceid,
      'subject': _params.subject,
      'id': _params.id,
      'source': _params.source,
      'type': _params.type,
      'time': _params.time,
      'data': _params.data,
      'ibmenfcmbody': JSON.stringify(_params.ibmenfcmbody),
      'ibmenapnsbody': JSON.stringify(_params.ibmenapnsbody),
      'ibmenpushto': JSON.stringify(_params.ibmenpushto),
      'ibmenapnsheaders': JSON.stringify(_params.ibmenapnsheaders),
      'datacontenttype': 'application/json',
      'specversion': '1.0',
    };

    const path = {
      'instance_id': _params.instanceId,
    };

    const sdkHeaders = getSdkHeaders(
      EventNotificationsV1.DEFAULT_SERVICE_NAME,
      'v1',
      'sendNotifications'
    );

    const parameters = {
      options: {
        url: '/v1/instances/{instance_id}/notifications',
        method: 'POST',
        body,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(
          true,
          sdkHeaders,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          _params.headers
        ),
      }),
    };

    return this.createRequest(parameters);
  }
}

namespace SendNotifications {
  export interface JsonObject {
    [key: string]: any;
  }

  /** NotificationFCMBody. */
  export interface NotificationFCMBody {
    /** NotificationFCMBody accepts additional properties. */
    [propName: string]: any;
  }

  /** Payload describing a fcm notifications body message. */
  export interface NotificationAPNSBodyMessageENData extends NotificationAPNSBody {
    /** Payload describing a apns notifications body message Data. */
    en_data?: NotificationAPNSBodyMessageData;
  }

  /** The attributes for an FCM/APNs notification. */
  export interface NotificationAPNSBodyNotificationPayload extends NotificationAPNSBody {}

  /** Payload describing a fcm notifications body message. */
  export interface NotificationFCMBodyMessageENData extends NotificationFCMBody {
    /** Payload describing a fcm notifications body message Data. */
    en_data?: NotificationFCMBodyMessageData;
  }

  /** The attributes for an FCM/APNs notification. */
  export interface NotificationFCMBodyNotificationPayload extends NotificationFCMBody {}

  /** Payload describing a fcm notifications body message Data. */
  export interface NotificationFCMBodyMessageData {
    /** The notification message to be shown to the user. */
    alert: string;
    /** Dozed devices to display only the latest notification and discard old low priority notifications. */
    collapse_key?: string;
    /** The category identifier to be used for the interactive push notifications. */
    interactive_category?: string;
    /** Specify the name of the icon to be displayed for the notification. Make sure the icon is already packaged
     *  with the client application.
     */
    icon?: string;
    /** When this parameter is set to true, it indicates that the
     *    message should not be sent until the device becomes active.
     */
    delay_while_idle?: boolean;
    /** Device group messaging makes it possible for every app instance in a group to reflect the latest messaging
     *  state.
     */
    sync?: boolean;
    /** private/public - Visibility of this notification, which affects how and when the notifications are revealed
     *  on a secure locked screen.
     */
    visibility?: string;
    /** Content specified will show up on a secure locked screen on the device when visibility is set to Private. */
    redact?: string;
    /** Custom JSON payload that will be sent as part of the notification message. */
    payload?: JsonObject;
    /** A string value that indicates the priority of this notification. Allowed values are 'max', 'high',
     *  'default', 'low' and 'min'. High/Max priority notifications along with 'sound' field may be used for Heads up
     *  notification in Android 5.0 or higher.sampleval='low'.
     */
    priority?: string;
    /** The sound file (on device) that will be attempted to play when the notification arrives on the device. */
    sound?: string;
    /** This parameter specifies how long (in seconds) the message
     *    should be kept in GCM storage if the device is offline.
     */
    time_to_live?: number;
    /** Allows setting the notification LED color on receiving push notification . */
    lights?: Lights;
    /** The title of Rich Push notifications. */
    android_title?: string;
    /** Set this notification to be part of a group of notifications sharing the same key. Grouped notifications may
     *  display in a cluster or stack on devices which support such rendering.
     */
    group_id?: string;
    /** Options to specify for Android expandable notifications. The types of expandable notifications are
     *  picture_notification, bigtext_notification, inbox_notification.
     */
    style?: Style;
    /** Notification type. */
    type?: string;
  }

  /** Options to specify for Android expandable notifications. The types of expandable notifications are picture_notification, bigtext_notification, inbox_notification. */
  export interface Style {
    /** Specifies the type of expandable notifications.  The possible values are bigtext_notification,
     *  picture_notification, inbox_notification.
     */
    type?: string;
    /** Specifies the title of the notification.  The title is displayed when the notification is expanded.  Title
     *  must be specified for all three expandable notification.
     */
    title?: string;
    /** An URL from which the picture has to be obtained for the notification.  Must be specified for
     *  picture_notification.
     */
    url?: string;
    /** The big text that needs to be displayed on expanding a bigtext_notification.  Must be specified for
     *  bigtext_notification.
     */
    text?: string;
    /** An array of strings that is to be displayed in inbox style for inbox_notification.  Must be specified for
     *  inbox_notification.
     */
    lines?: string[];
    /** Style accepts additional properties. */
    [propName: string]: any;
  }
  /** Payload describing a notifications response. */
  export interface NotificationResponse {
    /** Notification ID. */
    notification_id: string;
    /** NotificationResponse accepts additional properties. */
    [propName: string]: any;
  }

  /** Allows setting the notification LED color on receiving push notification . */
  export interface Lights {
    /** The color of the led. The hardware will do its best approximation. */
    led_argb?: string;
    /** The number of milliseconds for the LED to be on while it's flashing. The hardware will do its best
     *  approximation.
     */
    led_on_ms?: number;
    /** The number of milliseconds for the LED to be off while it's flashing. The hardware will do its best
     *  approximation.
     */
    led_off_ms?: string;
  }

  /** Payload describing a APNs Notifications body. */
  export interface NotificationAPNSBody {
    /** NotificationAPNSBody accepts additional properties. */
    [propName: string]: any;
  }

  /** Payload describing a apns notifications body message Data. */
  export interface NotificationAPNSBodyMessageData {
    /** The notification message to be shown to the user. */
    alert: string;
    /** The number to display as the badge of the application icon. */
    badge?: number;
    /** The category identifier to be used for the interactive push notifications. */
    interactiveCategory?: string;
    /** The title for the Action key. */
    iosActionKey?: string;
    /** Custom JSON payload that will be sent as part of the notification message. */
    payload?: JsonObject;
    /** The name of the sound file in the application bundle. The sound of this file is played as an alert. */
    sound?: string;
    /** The key to a title string in the Localizable.strings file for the current localization. The key string can
     *  be formatted with %@ and %n$@ specifiers to take the variables specified in the titleLocArgs array.
     */
    titleLocKey?: string;
    /** A key to an alert-message string in a Localizabl.strings file for the current localization (which is set by
     *  the userÃ¢â‚¬â„¢s language preference).
     *    The key string can be formatted with %@ and %n$@ specifiers to take the variables specified in the locArgs
     *  array.
     */
    locKey?: string;
    /** The filename of an image file in the app bundle, with or without the filename extension. The image is used
     *  as the launch image when users tap the action button or move the action slider.
     */
    launchImage?: string;
    /** Variable string values to appear in place of the format specifiers in title-loc-key. */
    titleLocArgs?: string[];
    /** Variable string values to appear in place of the format specifiers in locKey. */
    locArgs?: string[];
    /** The title of Rich Push notifications (Supported only on iOS 10 and above). */
    title?: string;
    /** The subtitle of the Rich Notifications.(Supported only on iOS 10 and above). */
    subtitle?: string;
    /** The link to the iOS notifications media (video, audio, GIF, images - Supported only on iOS 10 and above). */
    attachmentUrl?: string;
    type?: string;
    /** Multiple notifications with the same collapse identifier are displayed to the user as a single notification. */
    apnsCollapseId?: string;
    /** An app-specific identifier for grouping related notifications. This value corresponds to the
     *  threadIdentifier property in the UNNotificationContent object.
     */
    apnsThreadId?: string;
    /** The string the notification adds to the category's summary format string. */
    apnsGroupSummaryArg?: string;
    /** The number of items the notification adds to the category's summary format string. */
    apnsGroupSummaryArgCount?: number;
  }

  /** Payload describing a FCM Notifications targets. */
  export interface NotificationDevices {
    /** List of FCM deviceIds. */
    fcm_devices?: string[];
    /** List of APNs deviceIds. */
    apns_devices?: string[];
    /** List of userIds. */
    user_ids?: string[];
    /** List of tags. */
    tags?: string[];
    /** List of platforms. */
    platforms?: string[];
  }
  /** Parameters for the `sendNotifications` operation. */
  export interface SendNotificationsParams {
    /** Unique identifier for IBM Cloud Event Notifications instance. */
    instanceId: string;
    /** The Notifications id. */
    ibmenseverity: string;
    /** The Event Notifications source id. */
    ibmensourceid: string;
    /** The Notifications subject. */
    subject: string;
    /** The Notifications id. */
    id: string;
    /** The source of Notifications. */
    source: string;
    /** The Notifications type. */
    type: string;
    /** The Notifications time. */
    time: string;
    /** The Notifications data for webhook. */
    data?: JsonObject;
    ibmenfcmbody?: NotificationFCMBody;
    /** Payload describing a APNs Notifications body. */
    ibmenapnsbody?: NotificationAPNSBody;
    /** Payload describing a FCM Notifications targets. */
    ibmenpushto?: NotificationDevices;
    /** The attributes for an FCM/APNs notification. */
    ibmenapnsheaders?: JsonObject;
    /** The Notifications content type. */
    datacontenttype?: string;
    /** The Notifications specversion. */
    specversion?: string;
    headers?: OutgoingHttpHeaders;
  }
}

export = SendNotifications;
