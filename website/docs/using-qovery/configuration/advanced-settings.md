---
last_modified_on: "2022-06-12"
title: "Advanced Settings"
description: "Learn how to set advanced settings on your infrastructure with Qovery"
---
import Jump from '@site/src/components/Jump';
import Alert from '@site/src/components/Alert';
import Assumptions from '@site/src/components/Assumptions';

To further fine-tune your Qovery infrastructure, you can set advanced settings through [the Qovery API endpoint](https://api-doc.qovery.com/#tag/Application-Configuration/operation/getAdvancedSettings).

<Alert type="info">
Advanced settings are not available in the Qovery console yet.
</Alert>

Below is the list of advanced settings currently available.

### Application Deployment

#### build.timeout_max_sec

| Type    | Description                                                                                 | Default Value  | 
|---------|---------------------------------------------------------------------------------------------|----------------|
| integer | Allows you to specify an interval, in seconds, after which the application build times out. |`1800`          |


### Kubernetes Probes

With Kubernetes probes, you can perform health checks to ensure that your applications are running smoothly. You can configure:

* **Liveness probes:** to check if the application container is alive (passing) or dead (failing). If the check fails, the dead container is restarted to attempt to heal the application.
* **Readiness probes:** to check if the application container is ready to receive requests (as even alive containers can enter phases where they cannot handle incoming traffic). Kubernetes only routes traffic to the application if the check succeeds.

<p align="center">
  <img src="/img/configuration/advanced-settings/workflow.png" alt="Kubernetes Probes Workflow" />
</p>


#### liveness_probe.type

| Type    | Description/Use Case                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Possible Values                                                                                                                                                                                           |
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| string  | Allows you to specify the type of liveness probe you want to launch. <br /> <br/> **HTTP probes** are the most common probe type. You can use them if your application is a HTTP server, or if you create a lightweight HTTP server inside your application specifically to respond to such probes. When using a HTTP liveness probe, Kubernetes pings a path (for example: `/healthz `) at a given port. If it gets a response in the 200 or 300 range, the application is considered healthy. Otherwise, it is considered dead and its container is restarted. <br /> <br /> **TCP probes** are most often used when HTTP or command probes aren't an option. When using a TCP probe, Kubernetes tries to establish a connection on the specified port. If the connection is successful, the application is considered healthy. Otherwise, it is considered dead and the container is restarted.| `"TCP"` (default) <br /> `"HTTP"` <br /> `"NONE"` <br /> <br /> **Warning** `"NONE"` disables the liveness probe, which we strongly advise against, as Kubernetes is then unable to check the state of your application.|

<Alert type="info">

The port used for both HTTP and TCP probes is [the application port][docs.using-qovery.configuration.application#ports].

To define which path should be used for HTTP probes, you can configure the [`liveness_probe.http_get.path`](#liveness_probehttp_getpath) advanced setting.

</Alert>

#### liveness_probe.http_get.path

| Type    | Description                                                                                                                                                                                   | Default Value |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| string  | *(Optional/For HTTP liveness probes)* When configuring a HTTP liveness probe, this advanced setting allows you to set the path to access on the HTTP/HTTPS server to perform the health check.| `"/"`         |


#### liveness_probe.initial_delay_seconds

| Type    | Description                                                                                                         | Use Case                                                                                                                                                                                                                                                             | Default Value |
|---------|---------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| integer | Allows you to specify an interval, in seconds, between the application container start and the first liveness check.| Allowing additional time for the application to start can be useful when boot time usually takes too long (due to long boot operations), or when the application opens the port before being ready to receive traffic on it (due to a still ongoing boot operation). | `30`          |


#### liveness_probe.period_seconds

| Type    | Description                                                                      | Default Value |
|---------|----------------------------------------------------------------------------------|---------------|
| integer | Allows you to specify an interval, in seconds, between each liveness probe.      | `10`          |


#### liveness_probe.timeout_seconds

| Type    | Description                                                                               | Default Value |
|---------|-------------------------------------------------------------------------------------------|---------------|
| integer | Allows you to specify the interval, in seconds, after which the liveness probe times out. | `5`           |


#### liveness_probe.success_threshold

| Type    | Description                                                                                                                                            | Default Value |
|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| integer | Allows you to specify how many consecutive successes are needed, as a minimum, for the probe to be considered successful after having failed previously. | `1`           |

#### liveness_probe.failure_threshold

| Type    | Description                                                                                                                                          | Default Value |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| integer | Allows you to specify how many consecutive failures are needed, as a minimum, for the probe to be considered failed after having succeeded previously. | `3`           |

#### readiness_probe.type

| Type    | Description/Use Case                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |Possible Values                                                                   |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| string  | Allows you to specify the type of readiness probe you want to launch. <br /> <br/> **HTTP probes** are the most common probe type. You can use them if your application is a HTTP server, or if you create a lightweight HTTP server inside your application specifically to respond to such probes. When using a HTTP readiness probe, Kubernetes pings a path (for example: `/healthz `) at a given port. If it gets a response in the 200 or 300 range, the application is considered ready to receive traffic. Otherwise, incoming traffic is suspended. <br /> <br /> **TCP probes** are most often used when HTTP or command probes aren't an option. When using a TCP probe, Kubernetes tries to establish a connection on the specified port. If the connection is successful, the application is considered ready to receive traffic. Otherwise, incoming traffic is suspended.| `"TCP"` (default) <br /> `"HTTP"` <br /> `"NONE"` (disables the readiness probe).|

<Alert type="info">

The port used for both HTTP and TCP probes is [the application port][docs.using-qovery.configuration.application#ports].

To define which path should be used for HTTP probes, you can configure the [`readiness_probe.http_get.path`](#readiness_probehttp_getpath) advanced setting.

</Alert>

#### readiness_probe.http_get.path

| Type    | Description                                                                                                                                                           | Default Value |
|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| string  | *(Optional/For HTTP readiness probes)* This advanced setting allows you to set the path to access on the HTTP/HTTPS server to perform the health check.               | `"/"`         |


#### readiness_probe.initial_delay_seconds

| Type    | Description                                                                                                               | Use Case                                                                                                                                                                                                                                                            | Default Value | 
|---------|---------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|  
| integer | Allows you to specify an interval, in seconds, between the application container start and the first readiness check.     | Allowing additional time for the application to start can be useful when boot time usually takes too long (due to long boot operations), or when the application opens the port before being ready to receive traffic on it (due to a still ongoing boot operation).| `30`          |


#### readiness_probe.period_seconds

| Type    | Description                                                                       | Default Value |
|---------|-----------------------------------------------------------------------------------|---------------|
| integer | Allows you to specify an interval, in seconds, between each readiness probe.      | `10`          |


#### readiness_probe.timeout_seconds

| Type    | Description                                                                              | Default Value |
|---------|------------------------------------------------------------------------------------------|---------------|
| integer | Allows you to specify an interval, in seconds, after which the readiness probe times out.| `1`           |


#### readiness_probe.success_threshold

| Type    | Description                                                                                                                                            | Default Value |
|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| integer | Allows you to specify how many consecutive successes are needed, as a minimum, for the probe to be considered successful after having failed previously. | `1`           |

#### readiness_probe.failure_threshold

| Type    | Description                                                                                                                                          |Default Value  |
|---------|------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| integer | Allows you to specify how many consecutive failures are needed, as a minimum, for the probe to be considered failed after having succeeded previously. | `3`           |


### Network Settings

#### deployment.custom_domain_check_enabled

| Type    | Description                                                                                                                                                                                                                                                                                       | Use Case                                                                                                                                                                                                                                                                                                                                   | Default Value |                                                                                                       
|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| boolean | Qovery allows you to set custom domains for your applications through the addition of a CNAME record to your domain's DNS settings. By default, when an application is deployed, Qovery checks that the CNAME record is set up correctly. This advanced setting allows you to disable this check. | If you are using a Content Delivery Network (CDN), checking the CNAME setup for any custom domains you may have set is likely to stall the deployment of your application. <br /> <br />  Therefore, if you are using a CDN behind your application, we recommend disabling this feature to save time during your application deployments. | `true`        | 

#### network.ingress_proxy_body_size_mb

| Type    | Description                                                                                            | Use Case                                                                                                                                                     | Default Value | 
|---------|--------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------| 
| integer | Allows you to set, in megabytes, a maximum size for resources that can be downloaded from your server. | By default, users can download resources (files, images, videos...) of up to 100 MB. You can use this advanced setting to lower or increase this limitation. | `100`         |
 

#### network.ingress_cors_enable

| Type    | Description                                                | Use Case                                                                                                                                                                                                                                                      | Default Value  |
|---------|------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| boolean | Allows you to enable Cross-Origin Resource Sharing (CORS). | The CORS mechanism supports secure cross-origin requests and data transfers between browsers and servers. For more information on CORS and when to enable it, see [Cross-Origin Resources Sharing] (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) . | `false`        |


#### network.ingress_cors_allow_origin 

| Type    | Description                                                                                            | Use Case                                                                                                                                                                                                                                       | Default Value  |
|---------|--------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| string | *(For CORS users)* Allows you to specify which origin(s) (domain, scheme, port) can access a resource. | For security purposes, you can allow only one or a short list of origins to access your resources. For more information, see [CORS HTTP Response Headers] (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#the_http_response_headers).   | `"*"`          |


####  network.ingress_cors_allow_methods

| Type    | Description                                                                                       | Use Case                                                                                                                                                                                                                                                                                | Default Value                            |
|---------|---------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------|
| string | *(For CORS users)* Allows you to specify which set of methods can be used for the client request.  | For security purposes, you can indicate which HTTP methods are permitted while accessing a resource in response to cross-origin requests. For more information, see [CORS HTTP Response Headers] (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#the_http_response_headers).    |`"GET, PUT, POST, DELETE, PATCH, OPTIONS"`|


####  network.ingress_cors_allow_headers

| Type    | Description                                                                                         | Use Case                                                                                                                                                                                                                                                                                                                 | Default Value                                                                                                   |
|---------|-----------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| string | *(For CORS users)* Allows you to specify which set of headers can be present in the client request. | For security purposes, you can indicate which HTTP headers can be used during a CORS preflight request which includes the `Access-Control-Request-Headers` request header. For more information, see [CORS HTTP Response Headers] (https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#the_http_response_headers).     | `"DNT,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization"` |

<!--
     THIS FILE IS AUTOGENERATED!

     To make changes please edit the template located at:

     website/docs/using-qovery/configuration/advanced-settings.md.erb
-->

## Auto-scaling

####  hpa.cpu.average_utilization_percent

| Type    | Description                                                                                                                                            | Default Value |
|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------|---------------| 
| integer | Auto-scaling is triggered when a specific CPU utilization metric is reached (for instance, 40%). This advanced setting allows you to set this metric.  | `60`          |


[docs.using-qovery.configuration.application#ports]: /docs/using-qovery/configuration/application/#ports