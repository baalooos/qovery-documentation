---
last_modified_on: "2024-08-09"
$schema: "/.meta/.schemas/guides.json"
title: Deploy a DaemonSet in a Karpenter context
description: How to ensure your DaemonSet is well deployed when you are using Karpenter.
author_github: https://github.com/baalooos
tags: ["type: tutorial", "technology: qovery", "installation_guide: aws"]
hide_pagination: true
---

import Alert from '@site/src/components/Alert';
import Steps from '@site/src/components/Steps';
import Assumptions from '@site/src/components/Assumptions';

[Karpenter](https://karpenter.sh/) is a great way to cut your AWS bill. It provides an easy and flexible way to scale and optimize your resource consumption. But there is a known [issue](https://github.com/kubernetes-sigs/karpenter/issues/731) with capacity planning when you deploy DaemonSets. In this guide, I will present the issue and explain how to avoid it by using Priority Class.

<!--
     THIS FILE IS AUTOGENERATED!

     To make changes please edit the template located at:

     website/guides/advanced/deploy-daemonset-with-karpenter.md.erb
-->

## What is a DaemonSet?

A DaemonSet in Kubernetes is a specialized controller used to ensure that a copy of a particular pod runs on all nodes in a cluster. It is particularly useful for deploying background tasks or system-level services that need to run on every node, such as log collectors, monitoring agents, or network components.

When nodes are added to the cluster, the DaemonSet automatically schedules the specified pod on the new nodes, ensuring consistent deployment across the entire infrastructure. Similarly, when nodes are removed, the DaemonSet takes care of cleaning up the pods that were running on those nodes.

This makes DaemonSets a powerful tool for maintaining uniformity and reliability in the operation of essential services across a Kubernetes cluster.

## What is the problem?

There is a [known issue](https://github.com/kubernetes-sigs/karpenter/issues/731) with Karpenter and DaemonSets when scaling nodes. DaemonSets ensure a copy of a pod runs on every node, consuming additional resources that Karpenter does not consider, leading to potential resource contention and under-provisioned nodes.

This forces operators to over-provision their nodes, resulting in inefficient resource utilization and higher costs. While the Kubernetes community and Karpenter developers are working on solutions, users currently need to manually adjust resource allocations and monitor node utilization to mitigate these issues.

A way to resolve this problem is to use a Priority Class and attach it to the DaemonSet we are creating.

## How to resolve it?

### What is a Priority Class?

A PriorityClass in Kubernetes is a resource used to assign a priority level to pods. This resource helps the scheduler make decisions during resource contention.

- Higher-priority pods are scheduled before lower-priority ones
- In case of resource shortages, lower-priority pods may be preempted (evicted) to make room for higher-priority pods.

This ensures that critical workloads receive the necessary resources to run effectively.

### Deploy a new Priority Class using Helm

I created a [simple repository](https://github.com/baalooos/karpenter-daemonset-priority-class) you can clone to follow along.

Create the karpenter-priority-class service in the Qovery environment where you want to deploy your DaemonSet by following [this documentation][docs.using-qovery.configuration.helm] and these values:

* General:
  * Service name: `karpenter-priority-class`
  * Source:
    * Helm source: `Git Provider`
    * Git repository: `Github` (Change if you are not using GitHub)
    * Repository: `Baalooos/karpenter-daemonset-priority-class` (Replace by the name of your repository)
    * Branch: `main`
    * Root application path: `/`
    * Allow cluster-wide resources :heavy_check_mark:

Click on Continue

* Values override as file:
  * File source: `Git repository`
  * Git repository: `Github` (Change if you are not using GitHub)
  * Repository: `Baalooos/karpenter-daemonset-priority-class` (Replace by the name of your repository)
  * Branch: `main`
  * Override path: `/values.yaml`

Then, you can:

- deploy this helm service to add the priority class on your cluster
- Modify your DaemonSet configuration to use the new priority class an redeploy it

## Conclusion

Even if Karpenter is a great way of reducing your AWS bill, sometimes you will have to do some manual lifting. This issue is a good example. A single Priority Class is enough to avoid a complex resource allocation problem.


[docs.using-qovery.configuration.helm]: /docs/using-qovery/configuration/helm/