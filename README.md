
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

const initParameters = {
   authenticator,
  serviceUrl: "https://" + region + ".event-notifications.cloud.ibm.com/event-notifications"
}
const eventNotificationsService = EventNotificationsV1.newInstance(initParameters);
```
- region : Region of the Event Notifications Instance

## Using the SDK

SDK Methods to consume

- [Source](#source)
  - [Create Source](#create-source)
  - [List Sources](#list-sources)
  - [Get Source](#get-source)
  - [Update Source](#update-source)
  - [Delete Source](#delete-source)
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

### Create Source 

```js
 const params = {
    instanceId: <instance-id>, // Event notifications service instance GUID
    name: '<source-name>',
    description: '<source-description>',
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

```
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

### Get Source

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
### Update Source 

```js
const params = {
    instanceId: <instance-id>, // Event notifications service instance GUID
    id: <sourceId>,
    name: '<source-updated-name>',
    description: '<source-updated-description>',
    enabled: true,
  };

    let res;
    try {
      res = await eventNotificationsService.updateSource(params);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
```

### Delete Source 

```js
 const params = {
    instanceId: <instance-id>, // Event notifications service instance GUID
    id: <sourceId>,
  };

  try {
    await eventNotificationsService.deleteSource(params);
  } catch (err) {
    console.warn(err);
  }
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
    const notificationDevicesModel = {
      user_ids: ['<user-ids>'],
      fcm_devices: ['<fcm-device-ids>'],
      apns_devices: ['<apns-device-ids>'],
      tags: ['<tag-names>'],
      platforms: ['<device-platforms>'],
    };
    
    const notificationApnsBodyModel = {
      aps: {
        alert: '<notification-message>',
        badge: 5,
      },
    };

    const notificationFcmBodyModel = {
      notification: {
        title: '<notification-title>',
        badge: '<notification-message>',
      },
    };

   const notificationApnsHeaders = {
     "apns-collapse-id": "<apns-apns-collapse-id-value>"
    }

    let notificationID = "<notification-id>"
    let notificationSubject = "<notification-subject>"
    let notificationSeverity = "<notification-severity>"
    let typeValue = "<notification-type>"
    let notificationsSouce = "<notification-source>"

    const params = {
      instanceId: instanceId,
      ceIbmenseverity: notificationSeverity,
      ceId: notificationID,
      ceSource: notificationsSouce,
      ceIbmensourceid: sourceId,
      ceType: typeValue,
      ceTime: '<notification-time>',
      ceIbmenpushto: JSON.stringify(notificationDevicesModel),
      ceIbmenfcmbody: JSON.stringify(notificationFcmBodyModel),
      ceIbmenapnsbody: JSON.stringify(notificationApnsBodyModel),
      ceIbmenapnsheaders: JSON.stringify(apnsHeaders),
      ceSpecversion: '1.0',
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

- **ceIbmenpushto** - Set up the the push notifications tragets.
  - *user_ids* (Array of **String**) - Send notification to the specified userIds.
  - *fcm_devices* (Array of **String**) - Send notification to the list of specified Android devices.
  - *fcm_devices* (Array of **String**) - Send notification to the list of specified iOS devices.
  - *_devices* (Array of **String**) - Send notification to the list of specified Chrome devices.
  - *firefox_devices* (Array of **String**) - Send notification to the list of specified Firefox devices.
  - *tags* (Array of **String**) - Send notification to the devices that have subscribed to any of these tags.
  - *platforms* (Array of **String**) - Send notification to the devices of the specified platforms. 
  	- Pass 'G' for google (Android) devices.
	- Pass 'A' for iOS devices.
	- Pass 'WEB_FIREFOX' for Firefox browser.
	- Pass 'WEB_CHROME' for Chrome browser.
- **Event Notifications SendNotificationsOptions** - Event Notifications Send Notifications method. 
  - *InstanceID* (**String**) - Event Notifications instance AppGUID. 
  - *CeIbmenseverity* (**String**) - Severity for the notifications. 
  - *CeID* (**String**) - ID for the notifications. 
  - *CeSource* (**String**) - Source of the notifications. 
  - *CeIbmensourceid* (**String**) - Event Notifications instance Source ID. 
  - *CeType* (**String**) - Type for the notifications. 
  - *CeTime* (**String**) - Time of the notifications. 
  - *CeIbmenpushto* (**string**) - Targets for the FCM notifications. 
  - *CeIbmenfcmbody* (**string**) - Set payload string specific to Android platform [Refer this FCM official [link](https://firebase.google.com/docs/cloud-messaging/http-server-ref#notification-payload-support)]. 
  - *CeIbmenapnsbody* (**string**) - Set payload string specific to iOS platform [Refer this APNs official doc [link](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html)].
  - *CeIbmenapnsheaders* (**string**) - Set headers required for the APNs message [Refer this APNs official [link](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns)(Table 1 Header fields for a POST request)]
  - *CeIbmenchromebody* (**string**) - Message body for the Chrome notifications. Refer [this official documentation](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) for more.
  - *CeIbmenfirefoxbody* (**string**) - Message body for the Firefox notifications. Refer [this official documentation](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) for more.
  - *CeIbmenchromeheaders* (**string**) - Headers for the Chrome notifications. Refer [this official documentation](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) for more.
  - *CeIbmenfirefoxheaders* (**string**) - Headers for the Firefox notifications. Refer [this official documentation](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) for more.
  - *CeSpecversion* (**String**) - Spec version of the Event Notifications. Default value is `1.0`. 

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
