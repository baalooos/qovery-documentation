---
last_modified_on: "2023-03-31"
$schema: "/.meta/.schemas/guides.json"
title: Customizing Preview URL with Qovery CLI
description: How to customize preview url with qovery cli
author_github: https://github.com/evoxmusic
tags: ["type: tutorial","technology: qovery"]
hide_pagination: true
---
import Assumptions from '@site/src/components/Assumptions';
import Steps from '@site/src/components/Steps';

In this quick guide, we will show you how to automatically customize your preview URL when a new environment has been created using the Qovery CLI. By following these steps, you can create a custom domain for your service and link it to your DNS provider.

<Assumptions name="guide">

- [Qovery CLI][docs.using-qovery.interface.cli] installed
- Access to your DNS provider

</Assumptions>

<Steps headingDepth={3}>

<ol>

<li>

#### Create a Custom Domain for Your Service

To create a custom domain for your service, run the following command in your terminal:

```bash
# Get Pull Request ID from Qovery Environment Variables
$ PR_ID=`qovery application env list -n "Backend" --show-values | grep "QOVERY_PROJECT_ID" | awk '{print $10}'`

# Create a custom domain
$ qovery application domain create -n "app name" --domain app-$PR_ID.domain.name
```

Replace `app name` with the name of your application and `app.domain.name` with your desired custom domain.

User `--organization`, `--project`, `--environment` flags to specify the organization, project, and environment where you want to create the custom domain.

</li>

<li>

#### Retrieve the Validation Domain

To get the validation domain required for the next step, run the following command:

```bash
$ qovery application domain list -n "app name" | grep "app-$PR_ID.domain.name" | awk '{print $7}'
```

Replace `app name` and `app.domain.name` with the appropriate values. This command will output the validation domain.

</li>

<li>

#### Create a CNAME Record in Your DNS Provider

Use the validation domain from the previous step to create a CNAME record in your DNS provider. The CNAME record should point to the validation domain.

Example with Route53:

```bash
$ aws cli route53 change-resource-record-sets --hosted-zone-id "hosted zone id" --change-batch '{"Changes":[{"Action":"CREATE","ResourceRecordSet":{"Name":"app-$PR_ID.domain.name","Type":"CNAME","TTL":300,"ResourceRecords":[{"Value":"validation-domain"}]}}]}'
```

Example with Cloudflare:

```bash
$ curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records" \
     -H "X-Auth-Email: {email}" \
     -H "X-Auth-Key: {key}" \
     -H "Content-Type: application/json" \
     --data '{"type":"CNAME","name":"app-$PR_ID.domain.name","content":"validation-domain","ttl":1,"proxied":false}'
```

The idea here is to create a CNAME record that points to the validation domain. The validation domain is a temporary domain that is used to validate the ownership of the custom domain.

</li>

<li>

#### Redeploy your application

Once the DNS changes have propagated, redeploy your application to complete the process.

```bash
$ qovery application redeploy -n "app name" -w
```

Your application should now be available at `app-{PR ID}.domain.name`.

</li>

</ol>

</Steps>

<!--
     THIS FILE IS AUTOGENERATED!

     To make changes please edit the template located at:

     website/guides/tutorial/customizing-preview-url-with-qovery-cli.md.erb
-->

## Wrapping up

Congratulations! You have successfully customized your preview URL using the Qovery CLI. Now, whenever a new environment is created, the custom domain will be automatically configured. If you encounter any issues, please reach out to our support team on the Qovery forum.


[docs.using-qovery.interface.cli]: /docs/using-qovery/interface/cli/