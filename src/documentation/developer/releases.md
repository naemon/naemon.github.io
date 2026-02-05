# How To Release

## Prerequisites

### Check Build Status

Make sure all builds and CI pipelines are green.

- [naemon-core](https://github.com/naemon/naemon-core) / [ci pipeline](https://github.com/naemon/naemon-core/actions/workflows/citest.yml)
- [naemon-livestatus](https://github.com/naemon/naemon-livestatus) / [ci pipeline](https://github.com/naemon/naemon-livestatus/actions/workflows/citest.yml)
- [naemon-vimcrypt](https://github.com/naemon/naemon-vimcrypt-vault-broker)

## Create Releases

### Naemon Core

Please make sure you have installed the required dependencies first. For Debian based
systems this can be done like so:
```bash
apt-get install vim git build-essential make devscripts dialog osc
```

1. Create release commit:

    ```shell
    %> NEW_VERSION=1.5.0
    %>
    %> git clone https://github.com/naemon/naemon-core
    %> cd naemon-core
    %> git pull
    %> git checkout -b "release_v${NEW_VERSION}"
    %> ./autogen.sh
    %> make clean
    %> make version
    %> vim NEWS
    %> git commit -avs -m "release v${NEW_VERSION}"
    %> git push origin "release_v${NEW_VERSION}"
    ```

2. Wait for pipeline actions on [GitHub](https://github.com/naemon/naemon-core/actions).

3. Then create release on [naemon core releases](https://github.com/naemon/naemon-core/releases).

    Use `v1.x.x` as tag name and title and the news entry as description.

4. Update OSB Builds

    ```shell
    %> # osc checkout "home:naemon"
    %> cd home:naemon/naemon-core
    %> osc up
    %> vim _service # replace version number
    %> osc commit
    ```

5. Wait for builds to complete on [build.opensuse.org/home:naemon](https://build.opensuse.org/package/show/home:naemon/naemon-core).

### Naemon Livestatus

1. Create release commit:

    ```shell
    %> # git clone https://github.com/naemon/naemon-livestatus
    %> cd naemon-core
    %> git pull
    %> make clean
    %> make version
    %> git commit -avs -m "release v<VERSION>"
    %> git tag "v<VERSION>"
    %> git push
    %> git push --tags
    ```

2. Wait for pipeline actions on [GitHub](https://github.com/naemon/naemon-livestatus/actions).

3. Then create release on [naemon livestatus releases](https://github.com/naemon/naemon-livestatus/releases).

    Use the tag name as title and the news entry as description.

4. Update OSB Builds

    ```shell
    %> # osc checkout "home:naemon"
    %> cd home:naemon/naemon-livestatus
    %> osc up
    %> vim _service # replace version number
    %> osc commit
    ```

5. Wait for builds to complete on [build.opensuse.org/home:naemon](https://build.opensuse.org/package/show/home:naemon/naemon-livestatus).

### Naemon Vim Vault

1. Create release commit:

    ```shell
    %> # git clone https://github.com/naemon/naemon-vimcrypt-vault-broker
    %> cd naemon-vimcrypt-vault-broker
    %> git pull
    %> make clean
    %> make version
    %> git commit -avs -m "release v<VERSION>"
    %> git tag "v<VERSION>"
    %> git push
    %> git push --tags
    ```

2. Then create release on [naemon vimvault releases](https://github.com/naemon/naemon-vimcrypt-vault-broker/releases).

    Use the tag name as title and the news entry as description.

3. Update OSB Builds

    ```shell
    %> # osc checkout "home:naemon"
    %> cd home:naemon/naemon-vimvault
    %> osc up
    %> vim _service # replace version number
    %> osc commit
    ```

4. Wait for builds to complete on [build.opensuse.org/home:naemon](https://build.opensuse.org/package/show/home:naemon/naemon-vimvault).

### Naemon Meta Package

1. Create release commit:

    ```shell
    %> # git clone https://github.com/naemon/naemon
    %> cd naemon
    %> git pull
    %> make clean
    %> make version
    %> git commit -avs -m "release v<VERSION>"
    %> git tag "v<VERSION>"
    %> git push
    %> git push --tags
    ```

2. Wait for pipeline actions on [GitHub](https://github.com/naemon/naemon/actions/workflows/citest.yml).

3. Then create release on [naemon releases](https://github.com/naemon/naemon/releases).

    Just use the auto-generate button.

4. Update OSB Builds

    ```shell
    %> # osc checkout "home:naemon"
    %> cd home:naemon/naemon
    %> osc up
    %> vim _service # replace version number
    %> osc commit
    ```

5. Wait for builds to complete on [build.opensuse.org/home:naemon](https://build.opensuse.org/package/show/home:naemon/naemon).

### naemon.io

1. Create release update:

    ```shell
    %> # git clone github.com/naemon/naemon.github.io
    %> cd naemon.github.io
    %> git pull
    %> vim src/.env                                 # adjust date and version
    %> vim src/download.md                          # double check available distributions
    %> vim src/documentation/usersguide/whatsnew.md # add changelog entry
    %> vim src/news/<date>-release-<v>.md           # add news entry
    %> git commit -avs -m "release v<VERSION>"
    %> git push
    ```

## Socialize

Communicate the release on various channels:

- [mastodon](https://floss.social/@naemon)

## Other

If there had been API changes, 3rd party NEB modules have to be rebuild, ex.:

- mod-gearman neb module
- status engine
