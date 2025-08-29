+++
date = '2025-08-17T09:52:15+08:00'
title = '[Docker] Docker基础'
toc = true  # 启用目录
+++


## 1. 查看 image

```bash
(base) [16:28:39] dingyx (base) ~
$ docker images
REPOSITORY   TAG                       IMAGE ID       CREATED        SIZE
ubuntu       focal-20250404            8feb4d8ca535   3 months ago   101MB
ros          noetic-perception-focal   32370c500818   4 years ago    4.89GB
[16:28:42] [cost 0.095s] docker images
```

### 标题三
`hello` you
#### 标题四
> 标题四段落

## 2. 创建 container

💡解释：使用镜像 TAG `focal-20250404` 创建一个名为 `ubuntu20` 的container，并且通过 -v 命令把宿主机 `/Users/dingyx` 目录下的所有文件，挂载到虚拟机 `/home/dingyx` 的目录下。

```bash
(base) [17:20:39] dingyx (base) ~
$ docker create -v /Users/dingyx/dockerSpace:/mnt -it --name ubuntu20 ubuntu:focal-20250404
40dbe94b240db92673accd73175f58d0348aed85288d1b0a26f445cda367e747
[17:25:45] [cost 0.947s] docker create -v /Users/dingyx:/home/dingyx -it --name ubuntu20 ubuntu:focal-20250404
```

## 3. 查看 container

```bash
(base) [17:29:25] dingyx (base) ~
$ docker ps -a
CONTAINER ID   IMAGE                   COMMAND       CREATED         STATUS    PORTS     NAMES
40dbe94b240d   ubuntu:focal-20250404   "/bin/bash"   3 minutes ago   Created             ubuntu20
[17:29:27] [cost 0.097s] docker ps -a
```

## 4. 启动 container

💡解释：根据查看 container 中的 NAMES 列，启动名为 NAMES 的一个镜像

```bash
(base) [17:31:04] dingyx (base) ~
$ docker start ubuntu20
ubuntu20
[17:31:27] [cost 0.959s] docker start ubuntu20
```

## 5. 进入 container 的终端

⚠️注意：当你使用别人的container，有可能不是通过 `/bin/bash` 进的终端，比如nvidia的一些设备是通过 `/bin/sh` 进入的，这个在启动的时候可以都尝试一下。

```bash
(base) [13:17:40] dingyx (base) ~
$ docker exec -it ubuntu20 /bin/bash

root@e03fb0a3931c:/# 
```

## 6. 停止 container

```bash
(base) [13:19:38] dingyx (base) ~
$ docker stop ubuntu20
ubuntu20
[13:19:41] [cost 0.150s] docker stop ubuntu20
```

## x. 删除一个container

```bash
(base) [16:43:24] dingyx (base) ~
$ docker rm ubuntu20
ubuntu20
[16:43:29] [cost 0.875s] docker rm ubuntu20
```
