
# IBM Cloud Event Notifications Node.js SDK
Node.js client library to interact with various [Event Notifications APIs](https://cloud.ibm.com/apidocs?category=event-notifications).

## Table of Contents

<!-- toc -->

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Using the SDK](#using-the-sdk)
- [Set Environment](#set-environment)
- [Questions](#questions)
- [Issues](#issues)
- [Open source @ IBM](#open-source--ibm)
- [Contributing](#contributing)
- [License](#license)

<!-- tocstop -->

<!-- --------------------------------------------------------------- -->
## Overview

The IBM Cloud Event Notifications Node.js SDK allows developers to programmatically interact with the Event Notifications service in IBM cloud.

Service Name | Import Path
--- | --- 
[Event-Notifications](https://cloud.ibm.com/apidocs/event-notifications) | @ibm-cloud/event-notifications-node-admin-sdk/event-notifications/v1

## Prerequisites
* You need an [IBM Cloud][ibm-cloud-onboarding] account.
* **Node.js >=12**: This SDK is tested with Node.js versions 12 and up. It may work on previous versions but this is not officially supported.

[ibm-cloud-onboarding]: http://cloud.ibm.com/registration

## Installation

```sh
npm install @ibm-cloud/event-notifications-node-admin-sdk
```

## Using the SDK
For general SDK usage information, please see
[this link](https://github.com/IBM/cloud-sdk-common/blob/main/README.md)

## Initialize SDK

Initialize the sdk to connect with your Event Notifications service instance.

```js
import { EventNotificationsV1 } from '@ibm-cloud/event-notifications-node-admin-sdk/event-notifications/v1';
import { IamAuthenticator } from '@ibm-cloud/event-notifications-node-admin-sdk/auth';

const authenticator = new IamAuthenticator({
  apikey: <apikey>,  // Event notifications service instance APIKey
});

const eventNotificationsService = EventNotificationsV1.newInstance({
  authenticator,
  serviceUrl: "https://" + region + ".event-notifications.cloud.ibm.com/event-notifications"
});
```
- region : Region of the Event Notifications Instance

## Using the SDK

SDK Methods to consume

- [Source](#source)
	- [List Sources](#list-sources)
	- [Get Source](#get-sources)
- [Topics](#topics)
	- [Create Topics](#create-topic)
	- [List Topics](#list-topics)
	- [Get Topic](#get-topic)
	- [Update Topics](#update-topic)
	- [Delete Topics](#delete-topic)
- [Destinations](#destinations)
	- [Create Destination](#create-destination)
	- [List Destinations](#list-destinations)
	- [Get Destination](#get-destination)
	- [Update Destination](#update-destination)
	- [Delete Destination](#delete-destination)
- [Destination Devices](#destination-device)
	- [List Destination device](#list-destination-devices)
	- [Get Destination device report](#get-destination-device-report)
	- [Create Destination tag subscription](#create-destination-tag-subscription)
	- [List Destination tag subscription](#list-destination-tag-subscription)
	- [List Destination device tag subscriptions](#list-destination-device-tag-subscriptions)
	- [Delete Destination device tag subscription](#delete-destination-device-tag-subscription)
- [Subscriptions](#subscriptions)
	- [Create Subscription](#create-subscription)
	- [List Subscriptions](#list-subscriptions)
	- [Get Subscription](#get-subscription)
	- [Update Subscription](#update-subscription)
	- [Delete Subscription](#delete-subscription)
- [Send Notifications](#send-notifications)


## Source 

### List Sources

```js
const params = {
  instanceId: <instance-id>, // Event notifications service instance GUID
};

eventNotificationsService
  .listSources(params)
  .then((res) => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch((err) => {
    console.warn(err);
  });
```

### Get Sources

```js
const params = {
  instanceId: <instance-id>, // Event notifications service instance GUID
  id: <source-id>, // Event notifications service instance Source ID
};

eventNotificationsService
  .getSource(params)
  .then((res) => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch((err) => {
    console.warn(err);
  });
```

## Topics 

### Create Topic

```js
// Rules
const rulesModel = {
  enabled: false,
  event_type_filter: "$.notification_event_info.event_type == 'cert_manager'", // Add your event type filter here.
  notification_filter: "$.notification.findings[0].severity == 'MODERATE'", // Add your notification filter here.
};

// TopicUpdateSourcesItem
const topicUpdateSourcesItemModel = {
  id: <source-id>,  // Event notifications service instance Source ID
  rules: [rulesModel],
};

const params = {
  instanceId: <instance-id>, // Event notifications service instance GUID
  name: <topic-name>,
  description: <topic-description>,
  sources: [topicUpdateSourcesItemModel],
};

eventNotificationsService
  .createTopic(params)
  .then((res) => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch((err) => {
    console.warn(err);
  });
```

### List Topics

```js
const params = {
  instanceId: <instance-id>,
};

eventNotificationsService
  .listTopics(params)
  .then((res) => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch((err) => {
    console.warn(err);
  });
```

### Get Topic

```js
const params = {
  instanceId: <instance-id>,
  id: <topic-id>,
};

eventNotificationsService
  .getTopic(params)
  .then((res) => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch((err) => {
    console.warn(err);
  });
```

### Update Topic
```js

// Rules
const rulesModel = {
  enabled: true,
  event_type_filter: "$.notification_event_info.event_type == 'cert_manager'", // Add your event type filter here.
  notification_filter: "$.notification.findings[0].severity == 'MODERATE'",  // Add your notification filter here.
};

// TopicUpdateSourcesItem
const topicUpdateSourcesItemModel = {
  id: <source-id>,
  rules: [rulesModel],
};

const params = {
  instanceId: <instance-id>,
  id: <topic-id>,
  name: <topic-update-name>,
  sources: [topicUpdateSourcesItemModel],
};

eventNotificationsService
  .replaceTopic(params)
  .then((res) => {
    console.log(JSON.stringify(res.result, null, 2));
  })
  .catch((err) => {
    console.warn(err);
  });

```
### Delete Topic
```js
const params = {
  instanceId : <instance-id>,
  id : <topic-id>,
}  

eventNotificationsService
.deleteTopic(params)
.then(res => {
  console.log(JSON.stringify(res.result, null, 2));
})
  .catch(err => {
    console.warn(err);
  });
```

## Destinations 

### Create Destination

```js
 // DestinationConfigParamsWebhookDestinationConfig
   const destinationConfigParamsModel = {
    url: <destination-config-url>,
    verb: <destination-config-verb>,
    custom_headers: {  <header-key>: <header-value> },
    sensitive_headers: [<header-key>],
  };

  // DestinationConfig
  const destinationConfigModel = {
    params: destinationConfigParamsModel,
  };

  const params = {
    instanceId: <instance-id>,
    name: <destination-name>,
    type: <destination-type>,
    description: <destination-description>,
    config: destinationConfigModel,
  };

 eventNotificationsService.createDestination(params)
 .then(res => {
  console.log(JSON.stringify(res.result, null, 2));
})
  .catch(err => {
    console.warn(err);
  });

```

### List Destinations

```js
const params = {
  instanceId : <instance-id>,
}

eventNotificationsService.listDestinations(params)
 .then(res => {
  console.log(JSON.stringify(res.result, null, 2));
})
.catch(err => {
    console.warn(err);
});
```

### Get Destination

```js
const params = {
  instanceId : <instance-id>,
  id : <destination-id>,
}

eventNotificationsService
.getDestination(params)
.then(res => {
  console.log(JSON.stringify(res.result, null, 2));
})
.catch(err => {
  console.warn(err);
});
```

### Update Destination
```js

// DestinationConfigParamsWebhookDestinationConfig
const destinationConfigParamsModel = {
  url:  <destination-config-update-url>,
  verb: <destination-config-update-verb>,
  custom_headers: { <header-key>: <header-value> },
  sensitive_headers: [<header-key>],
};

// DestinationConfig
const destinationConfigModel = {
  params: destinationConfigParamsModel,
};
const params = {
  instanceId: <instance-id>,
  id: <destination-id>,
  name: <destination-update-name>,
  description: <destination-update-description>,
  config: destinationConfigModel,
};

eventNotificationsService.updateDestination(params)
.then(res => {
  console.log(JSON.stringify(res.result, null, 2));
})
  .catch(err => {
    console.warn(err);
  });

```
### Delete Destination
```js
const params = {
  instanceId : <instance-id>,
  id : <destination-id>,
}
eventNotificationsService
.deleteDestination(params)
.then(res => {
  console.log(JSON.stringify(res.result, null, 2));
})
  .catch(err => {
    console.warn(err);
  });
```

## Destination Devices

### List Destination device

```js
const params = {
  instanceId: <instance-id>,
  id: <destination-id>,
};

let res;
try {
  res = await eventNotificationsService.listDestinationDevices(params);
  console.log(JSON.stringify(res.result, null, 2));
} catch (err) {
  console.warn(err);
}
```

### Get Destination device report

```js

const params = {
  instanceId: <instance-id>,
  id: <destination-id>,
};

let res;
try {
  res = await eventNotificationsService.getDestinationDevicesReport(params);
  console.log(JSON.stringify(res.result, null, 2));
} catch (err) {
  console.warn(err);
}
```

### Create Destination tag subscription

```js
const params = {
  instanceId: <instance-id>,
  id: <destination-id>,
  deviceId: <device-id>,
  tagName: <tag-name>,
};

let res;
try {
  res = await eventNotificationsService.createTagsSubscription(params);
  console.log(JSON.stringify(res.result, null, 2));
} catch (err) {
  console.warn(err);
}
```

### List Destination tag subscription

```js
const params = {
  instanceId: <instance-id>,
  id: <destination-id>,
};

let res;
try {
  res = await eventNotificationsService.listTagsSubscription(params);
  console.log(JSON.stringify(res.result, null, 2));
} catch (err) {
  console.warn(err);
}
```

### List Destination device tag subscriptions

```js
const params = {
  instanceId: <instance-id>,
  id: <destination-id>,
  deviceId: <device-id>,
};

let res;
try {
  res = await eventNotificationsService.listTagsSubscriptionsDevice(params);
  console.log(JSON.stringify(res.result, null, 2));
} catch (err) {
  console.warn(err);
}
```

### Delete Destination device tag subscription

```js
const params = {
  instanceId: <instance-id>,
  id: <destination-id>,
  deviceId: <device-id>,
  tagName: <tag-name>
};

try {
  await eventNotificationsService.deleteTagsSubscription(params);
} catch (err) {
  console.warn(err);
}
```

## Subscriptions 

### Create Subscription

```js
While Creating Subscription use any of one option from webhook or email

// SubscriptionCreateAttributesWebhookAttributes
const subscriptionCreateAttributesModel = {
  signing_enabled: false,
};

const params = {
  instanceId: <instance-id>,
  name: <subscription-name>,
  destinationId: <destination-id>,
  topicId: <topic-id>,
  attributes: subscriptionCreateAttributesModel,
  description: <subscription-description>,
};
eventNotificationsService
.createSubscription(params)
.then(res => {
  console.log(JSON.stringify(res.result, null, 2));
})
  .catch(err => {
    console.warn(err);
  });
```

### List Subscriptions

```js
const params = {
  instanceId : <instance-id>,
}
eventNotificationsService
.listSubscriptions(params)
.then(res => {
  console.log(JSON.stringify(res.result, null, 2));
})
  .catch(err => {
    console.warn(err);
  });
```

### Get Subscription

```js
const params = {
  instanceId : <instance-id>,
  id : <subscription-id>,
}
eventNotificationsService.
getSubscription(params)
.then(res => {
  console.log(JSON.stringify(res.result, null, 2));
})
  .catch(err => {
    console.warn(err);
  });
```

### Update Subscription

```js
const subscriptionUpdateAttributesModel = {
  signing_enabled: true,
};

const params = {
  instanceId: <instance-id>,
  id: <subscription-id>,
  name: <subscription-update-name>,
  description: <subscription-update-description>,
  attributes: subscriptionUpdateAttributesModel,
};
 
eventNotificationsService
.updateSubscription(params)
  .then(res => {
  console.log(JSON.stringify(res.result, null, 2));
})
.catch(err => {
  console.warn(err);
});

```

### Delete Subscription
```js
const params = {
  instanceId : <instance-id>,
  id : <subscription-id>,
}
eventNotificationsService
.deleteSubscription(params)
.then(res => {
  console.log(JSON.stringify(res.result, null, 2));
})
  .catch(err => {
    console.warn(err);
  });
```

## Send Notifications

```js
// NotificationFCMDevices
    const notificationFcmDevicesModel = {
      user_ids: ['<user-ids>'],
      fcm_devices: ['<device-ids>'],
      tags: ['<tag-names>'],
      platforms: ['<device-platforms>'],
    };
    
    // Lights
    const lightsModel = {
      led_argb: '<color-name>',
      led_on_ms: <color-on-ms>,
      led_off_ms: '<color-off-ms>',
    };

    // Style
    const styleModel = {
      type: '<notification-style>',
      title: '<notification-title>',
      url: '<notification-url>',
    };

    // NotificationFCMBodyMessageData
    const notificationFcmBodyMessageDataModel = {
      alert: '<notification-message>',
      collapse_key: '<notification-collapse_key>',
      interactive_category: '<notification-category>',
      icon: '<notification-icon>',
      delay_while_idle: true,
      sync: true,
      visibility: '<notification-visibility>',
      redact: '<notification-redact>',
      payload: { <notification-key-value-pair> },
      priority: '<notification-priority>',
      sound: '<notification-sound>',
      time_to_live: 0,
      lights: lightsModel,
      android_title: '<notification-title>',
      group_id: '<notification-group>',
      style: styleModel,
      type: '<notification--type>',
    };

    // NotificationFCMBodyMessage
    const notificationFcmBodyMessageModel = {
      data: notificationFcmBodyMessageDataModel,
    };

    // NotificationFCMBody
    const notificationFcmBodyModel = {
      message: notificationFcmBodyMessageModel,
    };

    let notificationID = "<notification-id>"
    let notificationSubject = "<notification-subject>"
    let notificationSeverity = "<notification-severity>"
    let typeValue = "<notification-type>"
    let notificationsSouce = "<notification-source>"

    const params = {
      instanceId: instanceId,
      subject: notificationSubject,
      severity: notificationSeverity,
      id: notificationID,
      source: notificationsSouce,
      enSourceId: sourceId,
      type: typeValue,
      time: '<notification-time>',
      data: {},
      pushTo: notificationFcmDevicesModel,
      messageFcmBody: notificationFcmBodyModel,
      datacontenttype: 'application/json',
      specversion: '1.0',
    };

    let res;
    try {
      res = await eventNotificationsService.sendNotifications(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
```
<details open>
<summary>Send Notifications Variables</summary>
<br>

- **FCM Target NotificationFcmDevices** - Set up the the push notifications tragets.
  - *user_ids* (Array of **String**) - Send notification to the specified userIds.
  - *fcm_devices* (Array of **String**) - Send notification to the list of specified devices.
  - *tags* (Array of **String**) - Send notification to the devices that have subscribed to any of
these tags.
  - *platforms* (Array of **String**) - Send notification to the devices of the specified platforms. Pass 'G' for google (Android) devices.
- **Android Lights** - Allows setting the notification LED color on receiving push notification.
  - *led_argb* (**String**) - The color of the led. The hardware will do its best approximation. Ex: `Red`
  - *led_on_ms* (**Integer**) - The number of milliseconds for the LED to be on while it's flashing. The hardware will do its best approximation.
  - *led_off_ms* (**String**) - The number of milliseconds for the LED to be off while it's flashing. The hardware will do its best approximation.
- **Android Style** - Options to specify for Android expandable notifications. The types of expandable notifications are *picture_notification*, *bigtext_notification*, and *inbox_notification*.
  - *type* (**String**) - Specifies the type of expandable notifications. The possible values are *picture_notification*, *bigtext_notification*, and *inbox_notification*
  - *title* (**String**) - Specifies the title of the notification. The title is displayed when the notification is expanded. Title must be specified for all three expandable notification.
  - *url* (**String**) - An URL from which the picture has to be obtained for the notification. Must be specified for *picture_notification*.
  - *text* (**String**) - The big text that needs to be displayed on expanding a *bigtext_notification*. Must be specified for *bigtext_notification*.
  - *lines* (**String**) - An array of strings that is to be displayed in inbox style for inbox_notification. Must be specified for inbox_notification.
- **Android NotificationFcmBodyMessageData** - Settings specific to Android platform payload.
  - *alert* (**String**) - The notification message to be shown to the user.
  - *collapse_key* (**String**) - Dozed devices to display only the latest notification and discard old low priority notifications.
  - *interactive_category* (**String**) - The category identifier to be used for the interactive push notifications.
  - *icon* (**String**) - Specify the name of the icon to be displayed for the notification. Make sure the icon is already packaged with the client application.
  - *delay_while_idle* (**Bool**) - When this parameter is set to true, it indicates that the
message should not be sent until the device becomes active.
  - *sync* (**Bool**) - Device group messaging makes it possible for every app instance in a group to reflect the latest messaging state
  - *visibility* (**String**) - private/public - Visibility of this notification, which affects how and when the notifications are revealed on a secure locked screen.
  - *redact* (**String**) - Content specified will show up on a secure locked screen on the device when visibility is set to Private
  - *payload* (**map[string]interface{}**) - 	
Custom JSON payload that will be sent as part of the notification message.
  - *priority* (**String**) - A string value that indicates the priority of this notification. Allowed values are 'max', 'high', 'default', 'low' and 'min'. High/Max priority notifications along with 'sound' field may be used for Heads up notification in Android 5.0 or higher.sampleval='low'.
  - *sound* (**String**) - The sound file (on device) that will be attempted to play when the notification arrives on the device.
  - *time_to_live* (**Integer**) - This parameter specifies how long (in seconds) the message
should be kept in GCM storage if the device is offline.
  - *lights* (**Lights**) - Allows setting the notification LED color on receiving push notification.
  - *android_title* (**String**) - The title of Rich Push notifications.
  - *group_id* (**String**) - Set this notification to be part of a group of notifications sharing the same key. Grouped notifications may display in a cluster or stack on devices which support such rendering.
  - *style* (**Style**) - Options to specify for Android expandable notifications. The types of expandable notifications are *picture_notification*, *bigtext_notification*, and *inbox_notification*..
  - *type* (**String**) - The notification Type value. The types are *DEFAULT* and *SILENT* .

- **FCM NotificationFcmBodyMessage** - Settings specific to Android platform data field.
  - *data* (**NotificationFcmBodyMessageData**) - The `data` field for FCM notifications [Refer this FCM official [link](https://firebase.google.com/docs/cloud-messaging/concept-options)].

- **FCM NotificationFcmBody** - Settings specific to Android platform data field.
  - *message* (**NotificationFcmBodyMessage**) - The `message` field for FCM notifications [Refer this FCM official [link](https://firebase.google.com/docs/cloud-messaging/concept-options)] 

- **Event Notificaitons SendNotificationsOptions** - Event Notificaitons Send notificaitons method. 
  - *instanceId* (**String**) - Event Notificaitons instance AppGUID. 
  - *subject* (**String**) - Subject for the notifications. 
  - *severity* (**String**) - Severity for the notifications. 
  - *id* (**ID**) - ID for the notifications. 
  - *source* (**String**) - Source of the notifications. 
  - *enSourceId* (**String**) - Event Notificaitons instance Source ID. 
  - *type* (**String**) - Type for the notifications. 
  - *time* (**String**) - Time of the notifications. 
  - *data* (**map[string]interface{}**) - Data for the notifications. Supported only for `Webhook` destination. 
  - *pushTo* (**NotificationFcmDevices**) - Targets for the FCM notifications. 
  - *messageFcmBody* (**NotificationFcmBodyMessage**) - Message body for the FCM notifications. 
  - *datacontenttype* (**String**) - Data content type of the notifications. 
  - *specversion* (**String**) - Spec version of the Event Notificaitons. Default value is `1.0`. 

</details>

## Set Environment

Find [event_notifications_v1.env.hide](https://github.com/IBM/event-notifications-node-admin-sdk/blob/main/event_notifications_v1.env.hide) in the repo and rename it to `event_notifications_v1.env`. After that add the values for,

- `EVENT_NOTIFICATIONS_URL` - Add the Event Notifications service instance Url.
- `EVENT_NOTIFICATIONS_APIKEY` - Add the Event Notifications service instance apikey.
- `EVENT_NOTIFICATIONS_GUID` - Add the Event Notifications service instance GUID.

**Optional** 
- `EVENT_NOTIFICATIONS_AUTH_URL` - Add the IAM url if you are using IBM test cloud.
- `EVENT_NOTIFICATIONS_FCM_KEY` - Add firebase server key for Android FCM destination.
- `EVENT_NOTIFICATIONS_FCM_ID` - Add firebase sender Id for Android FCM destination.


## Questions

If you are having difficulties using this SDK or have a question about the IBM Cloud services,
please ask a question at
[Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud).

## Issues
If you encounter an issue with the SDK, you are welcome to submit
a [bug report](https://github.com/IBM/event-notifications-node-admin-sdk/issues).
Before that, please search for similar issues. It's possible someone has
already encountered this issue.

## Open source @ IBM
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

## Contributing
See [CONTRIBUTING](CONTRIBUTING.md).

## License

This project is released under the Apache 2.0 license.
The license's full text can be found in
[LICENSE](LICENSE).
