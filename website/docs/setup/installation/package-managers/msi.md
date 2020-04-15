---
last_modified_on: "2020-04-01"
title: Install Qovery via Window Installer
sidebar_label: MSI
description: Install Qovery through the Windows Installer
---

import ConfigExample from '@site/src/components/ConfigExample';
import DaemonDiagram from '@site/src/components/DaemonDiagram';
import Jump from '@site/src/components/Jump';
import Steps from '@site/src/components/Steps';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Qovery can be installed from an MSI package through the Windows Installer.

<!--
     THIS FILE IS AUTOGENERATED!

     To make changes please edit the template located at:

     website/docs/setup/installation/package-managers/msi.md.erb
-->

## Install

<Tabs
  block={true}
  defaultValue="daemon"
  values={[{"label":"As a Daemon","value":"daemon"}]}>
<TabItem value="daemon">

The [daemon deployment strategy][docs.strategies#daemon] is designed for data
collection on a single host. Qovery runs in the background, in its own process,
collecting _all_ data for that host.
Typically data is collected from a process manager, such as Journald via
Qovery's [`journald` source][docs.sources.journald], but can be collected
through any of Qovery's [sources][docs.sources].
The following diagram demonstrates how it works.

<DaemonDiagram
  platformName={null}
  sourceName={null}
  sinkName={null} />

---

<Tabs
  centered={true}
  className={"rounded"}
  defaultValue={"msi"}
  placeholder="Please choose an installation method..."
  select={false}
  size={null}
  values={[{"group":"Package managers","label":"MSI","value":"msi"}]}>
<TabItem value="msi">

<Steps headingDepth={3}>
<Tabs
  centered={true}
  className="rounded"
  defaultValue="x86_64"
  values={[{"label":"x86_64","value":"x86_64"}]}>

<TabItem value="x86_64">

1.  ### Download the Qovery `.msi` file

    ```bat
    powershell Invoke-WebRequest https://packages.timber.io/qovery/0.8.X/qovery-x64.msi -OutFile qovery-x64.msi
    ```

    [Looking for a specific version?][docs.package_managers.msi#versions]

2.  ### Install the Qovery `.msi` package using `msiexec` command

    ```bat
    msiexec /i qovery-x64.msi /quiet
    ```

3.  ### Navigate to the Qovery directory

    ```bat
    cd "C:\Program Files\Qovery"
    ```

4.  ### Configure Qovery

    <ConfigExample
      format="toml"
      path={"config\\qovery.toml"}
      sourceName={"file"}
      sinkName={null} />

5.  ### Start Qovery

    ```bat
    .\bin\qovery --config config\qovery.toml
    ```

</TabItem>
</Tabs>
</Steps>

</TabItem>
</Tabs>
</TabItem>
</Tabs>

## Configuring

The Qovery configuration file is placed in:

```text
%ProgramFiles%\Qovery\config\qovery.toml
```

A full spec is located at `%ProgramFiles%\Qovery\config\qovery.spec.toml` and examples are
located in `%ProgramFiles%\Qovery\config\examples\*`. You can learn more about configuring
Qovery in the [Configuration][docs.configuration] section.

## Deploying

How you deploy Qovery is largely dependent on your use case and environment.
Please see the [deployment section][docs.deployment] for more info on how to
deploy Qovery.

## Administering

Qovery can be managed as a [Windows Service][urls.windows_service]:

<Jump to="/docs/administration/">Administration</Jump>

## Uninstalling

```bat
msiexec /x {7FAD6F97-D84E-42CC-A600-5F4EC3460FF5} /quiet
```

## Updating

Follow the [install](#install) steps again, downloading the latest version of
Qovery.

## Package

### Architectures

Qovery's MSI packages only support the X86_64 architecture.

### Versions

Qovery's MSI packages can be downloaded with the following URLs. Note that
Qovery maintains special URLS that are automatically updated whenever Qovery is
[released][urls.qovery_releases]:

<Tabs
  className="mini"
  defaultValue="x86_64"
  values={[{"label":"x86_64","value":"x86_64"}]}>
<TabItem value="x86_64">

| Version          | URL                                                                                               |
|:-----------------|:--------------------------------------------------------------------------------------------------|
| Latest major     | `https://packages.timber.io/qovery/latest/qovery-x64.msi`               |
| Latest minor     | `https://packages.timber.io/qovery/<MAJOR>.X/qovery-x64.msi`            |
| Latest patch     | `https://packages.timber.io/qovery/<MAJOR.MINOR>.X/qovery-x64.msi`      |
| Specific version | `https://packages.timber.io/qovery/<MAJOR.MINOR.PATCH>/qovery-x64.msi`  |
| Latest nightly   | `https://packages.timber.io/qovery/nightly/latest/qovery-x64.msi`       |
| Specific nightly | `https://packages.timber.io/qovery/nightly/<YYYY-MM-DD>/qovery-x64.msi` |

</TabItem>
</Tabs>


### Source Files

Qovery's MSI source files are located in
[Qovery's repo][urls.qovery_msi_source_files].


[docs.configuration]: /docs/setup/configuration/
[docs.deployment]: /docs/setup/deployment/
[docs.package_managers.msi#versions]: /docs/setup/installation/package-managers/msi/#versions
[docs.sources.journald]: /docs/reference/sources/journald/
[docs.sources]: /docs/reference/sources/
[docs.strategies#daemon]: /docs/setup/deployment/strategies/#daemon
[urls.qovery_msi_source_files]: https://github.com/timberio/qovery/tree/master/distribution/msi
[urls.qovery_releases]: https://qovery.dev/releases/latest
[urls.windows_service]: https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/new-service