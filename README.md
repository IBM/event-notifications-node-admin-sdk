
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
* **Node.js >=14**: This SDK is tested with Node.js versions 14 and up. It may work on previous versions but this is not officially supported.

[ibm-cloud-onboarding]: http://cloud.ibm.com/registration

## Installation

```sh
npm install @ibm-cloud/event-notifications-node-admin-sdk
```

## Using the SDK
For general SDK usage information, please see
[this link](https://github.com/IBM/ibm-cloud-sdk-common/blob/main/README.md)

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

To configure service URL for Private Endpoint

If you enabled service endpoints in your account, you can send API requests over the IBM Cloud private network. In the initialisation, the base endpoint URLs of the IAM(authenticator) & Event Notification(service) should be modified to point to private endpoints.
1) Setting client options programmatically
```js
const authenticator = new IamAuthenticator({
    apikey: <apikey>,  // Event notifications service instance APIKey
    url: "https://private.iam.cloud.ibm.com",
})

const initParameters = {
   authenticator,
  serviceUrl: "https://private." + region + ".event-notifications.cloud.ibm.com/event-notifications"
}
```
2) Using external configuration properties
```js
   EVENT_NOTIFICATIONS_AUTH_URL = https://private.iam.cloud.ibm.com/identity/token
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
  - [Custom Domain_Name_verification](#custom-domain-name-verification)
  - [Test Destination](#test-destination)
- [Templates](#templates)
	- [Create Template](#create-template)
	- [List Templates](#list-templates)
	- [Get Template](#get-template)
	- [Update Template](#update-template)
	- [Delete Template](#delete-template)
  - [List Predefined Templates](#list-predefined-templates)
  - [Get Predefined Template](#get-predefined-template)  
- [Push Destination APIs](#push-destination-apis)
	- [Create Destination tag subscription](#create-destination-tag-subscription)
	- [List Destination tag subscription](#list-destination-tag-subscription)
	- [Delete Destination device tag subscription](#delete-destination-device-tag-subscription)
- [Subscriptions](#subscriptions)
	- [Create Subscription](#create-subscription)
	- [List Subscriptions](#list-subscriptions)
	- [Get Subscription](#get-subscription)
	- [Update Subscription](#update-subscription)
	- [Delete Subscription](#delete-subscription)
- [Integration](#integration)
  - [Create Integration](#create-integration)
  - [List Integrations](#list-integrations)
  - [Get Integrations](#get-integration)
  - [Update Integration](#update-integration)  
- [SMTP Configurations](#SMTPConfigurations)
	- [Create SMTP Configuration](#create-smtp-configuration)
	- [Create SMTP User](#create-smtp-user)
	- [Get SMTP Configuration](#get-smtp-configuration)
	- [Get SMTP User](#get-smtp-user)	
	- [Get SMTP Allowed Ips](#get-smtp-allowed-ips)
	- [List SMTP Configurations](#list-smtp-configurations)
	- [List SMTP Users](#list-smtp-users)
	- [Update SMTP Configuration](#update-smtp-configuration)
	- [Update SMTP User](#update-smtp-user)
	- [Delete SMTP User](#delete-smtp-user)
	- [Delete SMTP Configuration](#delete-smtp-user)
	- [Verify SMTP](#verify-smtp)
- [Metrics](#Metrics) 
  - [Get Metrics](#get-metrics)      
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

Filters applied in case of periodic-timer as source. EventTypeFilter, NotificationFilter are mutually exclusive with EventScheduleFilter
```js
const eventScheduleFilterAttributesModel = {
      starts_at: '2025-01-01T05:15:00.000Z',
      ends_at: '2025-01-01T05:15:01.000Z',
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
```

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
Among the supported destinations, if you need to create Push Notification destinations, you have the additional option of choosing a destination of production type or pre-production type.
Set `pre_prod` boolean parameter to *true* to configure destination as pre-production destination else set the value as *false*.
Supported destinations are Android, iOS, Chrome, Firefox and Safari.

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

### Test Destination

This functionality allows you to test a destination. The feature simplifies the process of verifying whether a destination is functioning correctly. 
Currently, this functionality supports following destinations:
1. Slack
2. PagerDuty
3. ServiceNow
4. Microsoft&reg; Teams
5. IBM Cloud Code Engine
6. IBM Cloud Object Storage
7. Webhook
8. App Configuration

```js
const testDestinationParams = {
  instanceId : <instance-id>, // Event notifications service instance GUID
  id : <destination-id>,     	// Event notifications service instance Destination ID
};
try {
  const testDestinationResult = await eventNotificationsService.testDestination(testDestinationParams);
  console.log(JSON.stringify(testDestinationResult.result, null, 2));
} catch (err) {
  console.warn(err);
}
```
Once the test is completed, you will be presented with the results. These results will typically include:

- **Status**: Whether the test is successful or failed
- **Response Code**: If test fails, then the response code sent from the end destination client is returned
- **Response Message**: If test fails, then the response message sent from the end destination client is returned

In case of `webhook` destination test response also returns notification_id, the status of notification_id will represent the webhook test result. Follow below additional steps to get status result of webhook destination test


```js
  const getNotificationsStatusParams = {
    instanceId,
    id: <notification-id>,
  };

  try {
    const getNotificationsStatusResult = await eventNotificationsService.getNotificationsStatus(
    getNotificationsStatusParams
  );
    console.log(JSON.stringify(getNotificationsStatusResult.result, null, 2));
  } catch (err) {
    console.warn(err);
  }
```

The response of `GetNotificationsStatus` will have success, failed or inprogress status. The Notification ID will be valid only for 1 minute to fetch the status of test. The status response as **success** will conclude successful test of webhook destination

### Custom Domain Name Verification

After creation of the custom email destination with your domain name, make sure its validated for the right ownership.
This can be done with SPF and DKIM verification.
* Sender Policy Framework (SPF), which is used to authenticate the sender of an email. SPF specifies the mail servers that are allowed to send email for your domain.
* DomainKeys Identified Mail (DKIM), which allows an organization to take responsibility for transmitting a message by signing it. DKIM allows
  the receiver to check the email that claimed to have come from a specific domain, is authorized by the owner of that domain.

```js
const updateSpfVerifyDestinationParams = {
    instanceId : <instance-id>,
    id : <destination-id>,
    type: <verification-type>,
  };

  let res;
  try {
    res = await eventNotificationsService.updateVerifyDestination(
      updateSpfVerifyDestinationParams
    );
    console.log(JSON.stringify(res.result, null, 2));
  } catch (err) {
    console.warn(err);
  }
```

## Templates

Template is a pre-defined layout, that may include content like images, text and dynamic content based on event. Rather than creating a new content from scratch each time, you can use a template as a base and configure them in subscription. 
supports the following templates:

- Custom Email notification
- Custom Email invitation

### Create Template

#### Custom Email Template
```js
const templateConfigModel = {
  params: {
    body: 'base 64 encoded html contents',
    subject: 'Hi this is invitation for invitation message',
},
};
let createTemplateParams = {
  instanceId: <instance-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,
};
let createTemplateResult;
try {
  createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
  console.log(JSON.stringify(createTemplateResult.result, null, 2));
} catch (err) {
  console.warn(err);
}
```
For custom email supported template type values: smtp_custom.invitation, smtp_custom.notification 

#### Slack Template
```js
const templateConfigModel = {
  params: {
    body: 'base 64 encoded json body',
},
};
let createTemplateParams = {
  instanceId: <instance-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,
};
let createTemplateResult;
try {
  createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
  console.log(JSON.stringify(createTemplateResult.result, null, 2));
} catch (err) {
  console.warn(err);
}
```
For slack template supported template type value: slack.notification

#### Webhook Template
```js
const templateConfigModel = {
  params: {
    body: 'base 64 encoded json body',
},
};
let createTemplateParams = {
  instanceId: <instance-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,
};
let createTemplateResult;
try {
  createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
  console.log(JSON.stringify(createTemplateResult.result, null, 2));
} catch (err) {
  console.warn(err);
}
```
For webhook template supported template type value: webhook.notification

#### Pagerduty Template
```js
const templateConfigModel = {
  params: {
    body: 'base 64 encoded json body',
},
};
let createTemplateParams = {
  instanceId: <instance-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,
};
let createTemplateResult;
try {
  createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
  console.log(JSON.stringify(createTemplateResult.result, null, 2));
} catch (err) {
  console.warn(err);
}
```
For pagerduty template supported template type value: pagerduty.notification

#### Eventstreams Template
```js
const templateConfigModel = {
  params: {
    body: 'base 64 encoded json body',
},
};
let createTemplateParams = {
  instanceId: <instance-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,
};
let createTemplateResult;
try {
  createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
  console.log(JSON.stringify(createTemplateResult.result, null, 2));
} catch (err) {
  console.warn(err);
}
```
For EventStreams template supported template type value: event_streams.notification

#### CodeEngine Template
```js
  const templateConfigModel = {
      body: <template-body>,
    };
  let createTemplateParams = {
    instanceId: <instance-id>,
    name: <template-name>,
    type: <template-type>,
    templateConfigModel,
    description: <template-description>,
};

  let createTemplateResult;
  try {
    createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
    console.log(JSON.stringify(createTemplateResult.result, null, 2));
  } catch (err) {
    console.warn(err);
  }
```
For CodeEngine template supported template type value: ibmceapp.notification and ibmcejob.notification

#### AppConfiguration Template
```js
  const templateConfigModel = {
      body: <template-body>,
    };
  let createTemplateParams = {
    instanceId: <instance-id>,
    name: <template-name>,
    type: <template-type>,
    templateConfigModel,
    description: <template-description>,
};

  let createTemplateResult;
  try {
    createTemplateResult = await eventNotificationsService.createTemplate(createTemplateParams);
    console.log(JSON.stringify(createTemplateResult.result, null, 2));
  } catch (err) {
    console.warn(err);
  }
```
For App Configuration template supported template type value: app_configuration.notification

### List Templates
```js
const params = {
  instanceId: <instance-id>,
};

let res;
try {
  res = await eventNotificationsService.listTemplates(params);
  console.log(JSON.stringify(res.result, null, 2));
} catch (err) {
  console.warn(err);
}
```

### Get Template
```js
const params = {
  instanceId: <instance-id>,
  id: <template-id>,
};

let res;
try {
  res = await eventNotificationsService.getTemplate(params);
  console.log(JSON.stringify(res.result, null, 2));
} catch (err) {
  console.warn(err);
}
```

### List Predefined Templates
```js
const listPreDefinedTemplatesParams = {
      instanceId: <instance-id>,
      source: <source-type>,
      type: <destination-type>,
};

try {
  const res = await eventNotificationsService.listPreDefinedTemplates(
        listPreDefinedTemplatesParams);
  console.log(JSON.stringify(res.result, null, 2));
} catch (err) {
  console.warn(err);
}
```

### Get Predefined Template
```js
const getPreDefinedTemplateParams = {
    instanceId: <instance-id>,
    id: <template-id>,
  };

  try {
    const res = await eventNotificationsService.getPreDefinedTemplate(
      getPreDefinedTemplateParams
    );
  } catch (err) {
    console.warn(err);
  }
```
### Update Template

#### Update Email Template
```js
const templateConfigModel = {
  params: {
    body: 'base 64 encoded html content',
    subject: 'Hi this is invitation for invitation message',
  },
}; 
let replaceTemplateParams = {
  instanceId: <instance-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,s
};
let replaceTemplateResult;
try {
  replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
} catch (err) {
  console.warn(err);
}
```
For custom email supported template type values: smtp_custom.invitation, smtp_custom.notification 

#### Update Slack Template
```js
const templateConfigModel = {
  params: {
    body: 'base 64 encoded json body',
  },
}; 
let replaceTemplateParams = {
  instanceId: <instance-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,s
};
let replaceTemplateResult;
try {
  replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
} catch (err) {
  console.warn(err);
}
```
For slack template supported template type value: slack.notification

#### Update Webhook Template
```js
const templateConfigModel = {
  params: {
    body: 'base 64 encoded json body',
  },
}; 
let replaceTemplateParams = {
  instanceId: <instance-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,s
};
let replaceTemplateResult;
try {
  replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
} catch (err) {
  console.warn(err);
}
```
For webhook template supported template type value: webhook.notification

#### Update PagerDuty Template
```js
const templateConfigModel = {
  params: {
    body: 'base 64 encoded json body',
  },
}; 
let replaceTemplateParams = {
  instanceId: <instance-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,s
};
let replaceTemplateResult;
try {
  replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
} catch (err) {
  console.warn(err);
}
```
For pagerduty template supported template type value: pagerduty.notification

#### Update EventStreams Template
```js
const templateConfigModel = {
  params: {
    body: 'base 64 encoded json body',
  },
}; 
let replaceTemplateParams = {
  instanceId: <instance-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,s
};
let replaceTemplateResult;
try {
  replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
} catch (err) {
  console.warn(err);
}
```
For Event Streams template supported template type value: event_streams.notification

#### Update App Configuration Template
```js
const templateConfigModel = {
  params: {
    body: <template-body>,
  },
}; 
let replaceTemplateParams = {
  instanceId: <instance-id>,
  id: <template-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,
};
let replaceTemplateResult;
try {
  replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
} catch (err) {
  console.warn(err);
}
```
For App Configuration template supported template type value: app_configuration.notification

#### Update CodeEngine Template
```js
const templateConfigModel = {
  params: {
    body: <template-body>,
  },
}; 
let replaceTemplateParams = {
  instanceId: <instance-id>,
  name: <template-name>,
  type: <template-type>,
  templateConfigModel,
  description: <template-description>,s
};
let replaceTemplateResult;
try {
  replaceTemplateResult = await eventNotificationsService.replaceTemplate(replaceTemplateParams);
} catch (err) {
  console.warn(err);
}
```
For Code Engine template supported template type value: ibmceapp.notification and ibmcejob.notification

### Delete Template
```js
const params = {
  instanceId: <instance-id>,
  id: <template-id>,
};

try {
  await eventNotificationsService.deleteTemplate(params);
} catch (err) {
  console.warn(err);
}
```

## Push Destination APIs

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

// SubscriptionCreateAttributesWebhookAttributes
const subscriptionCreateAttributesModel = {
  signing_enabled: false,
  template_id_notification: <webhook-template-id>,
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

### ⚠️ Special Consideration for App Configuration Destination

When creating or updating a subscription for an **App Configuration** destination, the `attributes` object has a specific rule:  

- You must include **either** `feature_flag_enabled` **or** `template_id_notification`  
- You **cannot** include both properties together  

This ensures that a subscription is created for the correct use case — either **feature flag evaluation** or **notification templating**, but not both at once.

#### ✅ Valid Example (Feature Flag Evaluation)

```js
{
  "attributes": {
    "feature_flag_enabled": true
  }
}
```

#### ✅ Valid Example (template association)

```js
{
  "attributes": {
    "template_id_notification": "<template-id>"
  }
}
```

#### ❌ Invalid Example (Not Allowed)

```js
{
  "attributes": {
    "feature_flag_enabled": true,
    "template_id_notification": "<template-id>"
  }
}
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
  template_id_notification: <webhook-template-id>,
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
# Integration

### Create Integration

```js
const metadata = {
  endpoint: <end-point>,
  crn: <crn>,
  bucket_name: <cos-bucket-name>,
};

const params = {
  instanceId : <instance-id>,
  id: <integration-id>,
  type: 'collect_failed_events',
  metadata,
};

const res = await eventNotificationsService.createIntegration(params);

```

### List Integrations

```js
const params = {
      instanceId : <instance-id>,
      offset : <offset>,
      limit : <limit>,
      search : <search>,
    };

const res = await eventNotificationsService.listIntegrations(params);
```

### Get Integration

```js
const params = {
  instanceId : <instance-id>,
  id: <integration-id>,
};

const res = await eventNotificationsService.getIntegration(params);
```

### Update Integration

For kms/hs-crypto-

```js
const metadata = {
  endpoint: <end-point>,
  crn: <crn>,
  root_key_id: <root-key-id>,
};

const params = {
  instanceId : <instance-id>,
  id: <integration-id>,
  type: <integration-type>,
  metadata,
};

const res = await eventNotificationsService.replaceIntegration(params);

```

For Cloud Object Storage-

```js
const metadata = {
  endpoint: <end-point>,
  crn: <crn>,
  bucket_name: <cos_bucket_name>,
};

const params = {
  instanceId : <instance-id>,
  id: <integration-id>,
  type: 'collect_failed_events',
  metadata,
};

const res = await eventNotificationsService.replaceIntegration(params);

```

## SMTPConfigurations

### Create SMTP Configuration

```js
const createSmtpConfigurationParams = {
  instanceId : <instance-id>,
  name : <smtp-name>,
  domain : <smtp-domain>,
  description : <smtp-description>,
};

const res = await eventNotificationsService.createSmtpConfiguration(
  createSmtpConfigurationParams

```

### Create SMTP User

```js
const createSmtpUserParams = {
  instanceId : <instance-id>,
  id: <smtp-Config-id>,
  description: <user-description>,
};

const res = await eventNotificationsService.createSmtpUser(createSmtpUserParams);

```

### Clone SMTP User

```js
const cloneSmtpUserParams = {
  instanceId : <instance-id>,
  id: <smtp-Config-id>,
  usernameToClone: <smtp-user-to-clone>,
};

const res = await eventNotificationsService.createSmtpUser(cloneSmtpUserParams);

```

### Get SMTP Configuration

```js
const getSmtpConfigurationParams = {
  instanceId : <instance-id>,
  id: <smtp-Config-id>,
};
      
const res = await eventNotificationsService.getSmtpConfiguration(getSmtpConfigurationParams);

```

### Get SMTP User

```js
const getSmtpUserParams = {
  instanceId : <instance-id>,
  id: <smtp-Config-id>,
  userId: <smtp-user-id>,
};

const res = await eventNotificationsService.getSmtpUser(getSmtpUserParams);
```

### Get SMTP Allowed Ips

```js
const getSmtpAllowedIpsParams = {
  instanceId : <instance-id>,
  id: <smtp-Config-id>,
};

const res = await eventNotificationsService.getSmtpAllowedIps(getSmtpAllowedIpsParams);
```

### List SMTP Configurations

```js
const listSmtpConfigurationsParams = {
  instanceId : <instance-id>,
  offset : <offset>,
  limit : <limit>,
  search : <search>,
};
const res = await eventNotificationsService.listSmtpConfigurations(
  listSmtpConfigurationsParams
);
```

### List SMTP Users

```js
const listSmtpUsersParams = {
  instanceId : <instance-id>,
  id: <smtp-Config-id>,
  offset : <offset>,
  limit : <limit>,
  search : <search>,
};

const res = await eventNotificationsService.listSmtpUsers(listSmtpUsersParams);
```

### Update SMTP Configuration

```js
const updateSmtpConfigurationParams = {
  instanceId : <instance-id>,
  id: <smtp-Config-id>,
  name: <smtp-name>,
  description: <smtp-description>,
};

const res = await eventNotificationsService.updateSmtpConfiguration(
  updateSmtpConfigurationParams
);
```

### Update SMTP User

```js
const updateSmtpUserParams = {
  instanceId : <instance-id>,
  id: <smtp-Config-id>,
  userId: <smtp-user-id>,
  description <smtp-user-description>,
};

const res = await eventNotificationsService.updateSmtpUser(updateSmtpUserParams);
```

### Delete SMTP User

```js
const deleteSmtpUserParams = {
  instanceId : <instance-id>,
  id: <smtp-Config-id>,
  userId: <smtp-user-id>,
};

const res = await eventNotificationsService.deleteSmtpUser(deleteSmtpUserParams);
```

### Delete SMTP Configuration

```js
const deleteSmtpConfigurationParams = {
  instanceId : <instance-id>,
  id: <smtp-Config-id>,
};

const res = await eventNotificationsService.deleteSmtpConfiguration(
  deleteSmtpConfigurationParams
);
```

### Verify SMTP

```js
const type = 'dkim,spf,en_authorization';
const updateVerifySmtpParams = {
  instanceId : <instance-id>,
  id: <smtp-Config-id>,
  type,
};

const res = await eventNotificationsService.updateVerifySmtp(updateVerifySmtpParams);
```
supported verification types are dkim,spf and en_authorization.

## Metrics

### Get Metrics

```js
const getMetricsParams = {
  instanceId: <instance-id>,
  destinationType: 'smtp_custom',
  gte: <gte-timestamp>,
  lte: <lte-timestamp>,
  destinationId: <destination-id>,
  emailTo: <email-to>,
  notificationId: <notification-id>,
  subject: <subject>,
};

try {
  const res = await eventNotificationsService.getMetrics(getMetricsParams);
  console.log(JSON.stringify(res.result, null, 2));
} catch (err) {
  console.warn(err);
}
```

## Send Notifications

```js
// NotificationFCMDevices
    const notificationDevicesModel = {
      user_ids: ['<user-ids>'],
      fcm_devices: ['<fcm-device-ids>'],
      apns_devices: ['<apns-device-ids>'],
      huawei_devices: ['<huawei-device-ids>']
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
      message: {
        'android': {
          'notification': {
              'title': '<notification-title>',
              'body': '<notification-message>'
          },
          'data': {
              'name': 'Robert',
              'description': 'notification for the Poker'
          },
        },
      }
    };

   const notificationApnsHeaders = {
     "apns-collapse-id": "<apns-apns-collapse-id-value>"
    }

   const notificationSafariBodymodel = {
      saf: {
          alert: 'Game Request',
          badge: 5,
      },
    }

    const notificationHuaweiBodymodel = {
      'android': {
          'notification': {
              'title': '<notification-title>',
              'body': '<notification-message>'
          },
          'data': {
              'name': 'Robert',
              'description': 'notification for the Poker'
          },
        },
      }

     const htmlBody =
      '"Hi  ,<br/>Certificate expiring in 90 days.<br/><br/>Please login to <a href="https: //cloud.ibm.com/security-compliance/dashboard">Security and Complaince dashboard</a> to find more information<br/>"'; 

    let notificationID = "<notification-id>"
    let notificationSubject = "<notification-subject>"
    let notificationSeverity = "<notification-severity>"
    let typeValue = "<notification-type>"
    let notificationsSouce = "<notification-source>"
    let mms = '{"content": "akajdklahl", "content_type": "image/png"}'

const notificationCreateModel = {
      ibmenseverity: notificationSeverity,
      id: notificationID,
      source: notificationsSouce,
      ibmensourceid: sourceId,
      type: typeValue,
      time: '<notification-time>',
      ibmenpushto: JSON.stringify(notificationFcmDevicesModel),
      ibmenfcmbody: JSON.stringify(notificationFcmBodyModel),
      ibmenapnsbody: JSON.stringify(notificationApnsBodyModel),
      ibmensafaribody: JSON.stringify(notificationSafariBodymodel),
      ibmenhuaweibody: JSON.stringify(notificationHuaweiBodymodel),
      ibmenmailto: JSON.stringify(['abc@ibm.com', 'def@us.ibm.com']),
      ibmensmsto: JSON.stringify(['+911234567890', '+911224567890']),
      ibmenslackto: JSON.stringify(['C07FALXBH4G','C07FALXBU4G']),
      ibmentemplates: JSON.stringify(['149b0e11-8a7c-4fda-a847-5d79e01b71dc']),
      ibmensubject: 'certificate expire',
      ibmenmms: JSON.stringify(mms),
      ibmenhtmlbody: htmlBody,
      ibmendefaultshort: 'short info',
      ibmendefaultlong: 'long info',
      specversion: '1.0',
    };

    let body = notificationCreateModel;
    const sendNotificationsParams = {
      instanceId,
      body,
    };

    let res;
    try {
      res = await eventNotificationsService.sendNotifications(sendNotificationsParams);
      console.log(JSON.stringify(res.result, null, 2));
    } catch (err) {
      console.warn(err);
    }
```
<details open>
<summary>Send Notifications Variables</summary>
<br>

- **ibmenpushto** - Set up the push notifications targets.
  - **user_ids** (_Array of String_) - Send notification to the specified userIds.
  - **fcm_devices** (_Array of String_) - Send notification to the list of specified Android devices.
  - **apns_devices** (_Array of String_) - Send notification to the list of specified iOS devices.
  - **chrome_devices** (_Array of String_) - Send notification to the list of specified Chrome devices.
  - **firefox_devices** (_Array of string_) - Send notification to the list of specified Firefox devices.
  - **tags** (_Array of string_) - Send notification to the devices that have subscribed to any of these tags.
  - **platforms** (_Array of string_) - Send notification to the devices of the specified platforms.
    - Pass 'G' for google (Android) devices.
    - Pass 'A' for iOS devices.
    - Pass 'WEB_FIREFOX' for Firefox browser.
    - Pass 'WEB_CHROME' for Chrome browser.
- **Event Notifications SendNotificationsOptions** - Event Notifications Send Notifications method.
  - **instance_id*** (_string_) - Unique identifier for IBM Cloud Event Notifications instance.
  - **ibmenseverity** (_string_) - Severity for the notifications. Some sources can have the concept of an Event severity. Hence a handy way is provided to specify a severity of the event. example: LOW, HIGH, MEDIUM
  - **id*** (_string_) - A unique identifier that identifies each event. source+id must be unique. The backend should be able to uniquely track this id in logs and other records. Send unique ID for each send notification. Same ID can be sent in case of failure of send notification. source+id will be logged in IBM Cloud Logging service. Using this combination we will be able to trace the event movement from one system to another and will aid in debugging and tracing.
  - **source*** (_string_) - Source of the notifications. This is the identifier of the event producer. A way to uniquely identify the source of the event. For IBM Cloud services this is the crn of the service instance producing the events. For API sources this can be something the event producer backend can uniquely identify itself with.
  - **ibmensourceid*** (_string_) - This is the ID of the source created in EN. This is available in the EN UI in the "Sources" section.
  - **type** (_string_) - This describes the type of event. It is of the form <event-type-name>:<sub-type> This type is defined by the producer. The event type name has to be prefixed with the reverse DNS names so the event type is uniquely identified. The same event type can be produced by 2 different sources. It is highly recommended to use hyphen - as a separator instead of _.
  - **data** (_string_) - The payload for webhook notification. If data is added as part of payload then its mandatory to add **datacontenttype**.
  - **datacontenttype** - The notification content type. example: application/json
  - **time** (_string_) - Time of the notifications. UTC time stamp when the event occurred. Must be in the RFC 3339 format.
  - **ibmenpushto** (_string_) - Targets for the FCM notifications. This contains details about the destination where you want to send push notification. This attribute is mandatory for successful delivery from an Android FCM or APNS destination.
  - **ibmenfcmbody** (_string_) - Set payload string specific to Android platform [Refer this FCM official [link](https://firebase.google.com/docs/cloud-messaging/http-server-ref#notification-payload-support)].
  - **ibmenhuaweibody** (_string_) - Set payload string specific to Android platform [Refer this FCM official [link](https://firebase.google.com/docs/cloud-messaging/http-server-ref#notification-payload-support)].
  - **ibmenapnsbody** (_string_) - Set payload string specific to iOS platform [Refer this APNs official doc [link](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html)].
  - **ibmensafaribody** (_string_) - Set payload string specific to safari platform [Refer this Safari official doc [link](https://developer.huawei.com/consumer/en/hms/huawei-pushkit)].
  - **ibmenapnsheaders** (_string_) - Set headers required for the APNs message [Refer this APNs official [link](https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns)(Table 1 Header fields for a POST request)]
  - **ibmenchromebody** (_string_) - Message body for the Chrome notifications. Refer [this official documentation](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) for more.
  - **ibmenfirefoxbody** (_string_) - Message body for the Firefox notifications. Refer [this official documentation](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) for more.
  - **ibmenchromeheaders** (_string_) - Headers for the Chrome notifications. Refer [this official documentation](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) for more.
  - **ibmenfirefoxheaders** (_string_) - Headers for the Firefox notifications. Refer [this official documentation](https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification) for more.
  - **ibmendefaultshort*** (_string_) - Default short text for the message.
  - **ibmendefaultlong*** (_string_) - Default long text for the message.
  - **specversion*** (_string_) - Spec version of the Event Notifications. Default value is `1.0`.
  - **ibmenhtmlbody** (_string_) - The html body of notification for email.
  - **ibmenmailto** (_Array of string_) - Array of email ids to which the notification to be sent.
  - **ibmensmsto** (_Array of string_) - Array of SMS numbers to which the notification to be sent.
  - **ibmensmstext** (_string_) - SMS text to be sent.
  - **ibmenslackto** (_Array of string_) - Array of Slack channel/member ids to which the notification to be sent.
  - **ibmentemplates** (_Array of string_) - Array of template IDs that needs to be applied while sending notification for custom domain email and slack destination.
  - **ibmenmarkdown** (_string_) - The markdown content of pretty formatting.

Note: variable with * represents the mandatory attribute.
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
- `EVENT_NOTIFICATIONS_FCM_PROJECT_ID` - fcm project id
- `EVENT_NOTIFICATIONS_FCM_CLIENT_EMAIL` - fcm client email
- `EVENT_NOTIFICATIONS_FCM_PRIVATE_KEY` - fcm private key
- `EVENT_NOTIFICATIONS_SAFARI_CERTIFICATE` - safari certificate path

- `EVENT_NOTIFICATIONS_SNOW_CLIENT_ID` - service now client id
- `EVENT_NOTIFICATIONS_SNOW_CLIENT_SECRET` - service now client secret
- `EVENT_NOTIFICATIONS_SNOW_USER_NAME` - service now user name
- `EVENT_NOTIFICATIONS_SNOW_PASSWORD` - service now password
- `EVENT_NOTIFICATIONS_SNOW_INSTANCE_NAME` - service now instance name

- `EVENT_NOTIFICATIONS_COS_BUCKET_NAME` - cloud object storage bucket name
- `EVENT_NOTIFICATIONS_COS_INSTANCE` - cloud object storage instance id
- `EVENT_NOTIFICATIONS_COS_INSTANCE_CRN` - cloud object storage instance crn
- `EVENT_NOTIFICATIONS_COS_ENDPOINT` - cloud object storage end point

- `EVENT_NOTIFICATIONS_CODE_ENGINE_URL` - code engine app url
- `EVENT_NOTIFICATIONS_CODE_ENGINE_PROJECT_CRN` - code engine project crn
- `EVENT_NOTIFICATIONS_HUAWEI_CLIENT_SECRET` - huawei client secret
- `EVENT_NOTIFICATIONS_HUAWEI_CLIENT_ID` - huawei client id

- `EVENT_NOTIFICATIONS_SLACK_URL` - slack webhook url
- `EVENT_NOTIFICATIONS_MS_TEAMS_URL` - msteams webhook url
- `EVENT_NOTIFICATIONS_PD_ROUTING_KEY` - pagerduty routing key
- `EVENT_NOTIFICATIONS_PD_API_KEY` - pagerduty api key
- `EVENT_NOTIFICATIONS_TEMPLATE_BODY` - base 64 encoded html content
- `EVENT_NOTIFICATIONS_SLACK_TEMPLATE_BODY` - base 64 encoded json body
- `EVENT_NOTIFICATIONS_WEBHOOK_TEMPLATE_BODY` - base 64 encoded json body
- `EVENT_NOTIFICATIONS_SCHEDULER_SOURCE_ID` - periodic timer source id
- `EVENT_NOTIFICATIONS_PAGERDUTY_TEMPLATE_BODY` - base 64 encoded json body for pagerduty destination
- `EVENT_NOTIFICATIONS_EVENT_STREAMS_TEMPLATE_BODY` - base 64 encoded json body for event streams destination
- `EVENT_NOTIFICATIONS_EVENT_STREAMS_CRN` - Event Streams instance CRN
- `EVENT_NOTIFICATIONS_EVENT_STREAMS_TOPIC` - Event Streams instance Topic name
- `EVENT_NOTIFICATIONS_EVENT_STREAMS_ENDPOINT` - Event streams end point
- `EVENT_NOTIFICATIONS_CODE_ENGINE_APP_TEMPLATE_BODY` - base 64 encoded json body for Code Engine Application
- `EVENT_NOTIFICATIONS_CODE_ENGINE_JOB_TEMPLATE_BODY` - base 64 encoded json body for Code Engine Job
- `EVENT_NOTIFICATIONS_APP_CONFIG_CRN` - CRN of App Configuration instance
- `EVENT_NOTIFICATIONS_APP_CONFIG_TEMPLATE_BODY` -  base 64 encoded json body for App Configuration
- `EVENT_NOTIFICATIONS_SMTP_USER_TO_CLONE` - SMTP username to be cloned

## Questions

If you are having difficulties using this SDK or have a question about the IBM Cloud services,
please ask a question at
[Stack Overflow](http://stackoverflow.com/questions/ask?tags=ibm-cloud).

## Issues
If you encounter an issue with the SDK, you are welcome to submit
a [bug report](https://github.com/IBM/event-notifications-node-admin-sdk/issues).
Before that, please search for similar issues. It's possible someone has
already encountered this issue.

## ⚠️ Deprecation Notice (Attributes)

### Pagerduty Destination Configuration

> The following attribute from interface DestinationConfigOneOfPagerDutyDestinationConfig is **deprecated** and will be removed in a future release:

- `api_key`

This attribute no longer recommended for use and may not be supported in upcoming versions of the SDK. Only `routing_key` is expected to be passed.

## Open source @ IBM
Find more open source projects on the [IBM Github Page](http://ibm.github.io/)

## Contributing
See [CONTRIBUTING](CONTRIBUTING.md).

## License

This project is released under the Apache 2.0 license.
The license's full text can be found in
[LICENSE](LICENSE).