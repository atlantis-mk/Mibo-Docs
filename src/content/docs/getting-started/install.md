---
title: 安装 Mibo
description: 下载并运行 Mibo 媒体服务器二进制文件。
---

Mibo 以单个服务器二进制文件发布，Web UI 已经内嵌在服务里。正常安装时，只需要从
Mibo 的 GitHub Release 页面下载与你的系统匹配的二进制压缩包，解压后直接运行即可。

## 安装要求

- 支持的操作系统：Linux、macOS 或 Windows。
- 与下载包匹配的 CPU 架构：`amd64` 或 `arm64`。
- 如果要让 Mibo 分析本地媒体文件，请确保 `ffprobe` 已安装并位于 `PATH` 中。
- Mibo 运行账号需要能读取你的媒体目录。

## 下载

打开最新 Release 页面：

<https://github.com/atlantis-mk/Mibo/releases/latest>

按你的系统和 CPU 架构选择下载包。下表是当前最新版本 `v1.0` 的直接下载地址：

| 系统 | 架构 | 下载地址 |
| :-- | :-- | :-- |
| Linux x64 | Intel / AMD 64 位 | [下载 linux-amd64](https://github.com/atlantis-mk/Mibo/releases/latest/download/mibo-server-1.0-linux-amd64.tar.gz) |
| Linux ARM64 | ARM 64 位 | [下载 linux-arm64](https://github.com/atlantis-mk/Mibo/releases/latest/download/mibo-server-1.0-linux-arm64.tar.gz) |
| macOS Intel | Intel Mac | [下载 darwin-amd64](https://github.com/atlantis-mk/Mibo/releases/latest/download/mibo-server-1.0-darwin-amd64.tar.gz) |
| macOS Apple Silicon | M1 / M2 / M3 / M4 | [下载 darwin-arm64](https://github.com/atlantis-mk/Mibo/releases/latest/download/mibo-server-1.0-darwin-arm64.tar.gz) |
| Windows x64 | Intel / AMD 64 位 | [下载 windows-amd64](https://github.com/atlantis-mk/Mibo/releases/latest/download/mibo-server-1.0-windows-amd64.tar.gz) |
| Windows ARM64 | ARM 64 位 | [下载 windows-arm64](https://github.com/atlantis-mk/Mibo/releases/latest/download/mibo-server-1.0-windows-arm64.tar.gz) |

## Linux

创建安装目录并解压下载包：

```sh
mkdir -p ~/mibo
tar -xzf mibo-server-1.0-linux-amd64.tar.gz -C ~/mibo
cd ~/mibo
chmod +x ./mibo-server
```

运行 Mibo：

```sh
./mibo-server
```

默认情况下，Mibo 会把本地运行数据保存在启动目录下的 `data/` 目录中。你也可以通过
环境变量修改数据库路径。

## macOS

创建安装目录并解压下载包：

```sh
mkdir -p ~/mibo
tar -xzf mibo-server-1.0-darwin-arm64.tar.gz -C ~/mibo
cd ~/mibo
chmod +x ./mibo-server
```

Apple Silicon 芯片的 Mac 使用 `darwin-arm64` 包，Intel 芯片的 Mac 使用
`darwin-amd64` 包。

运行 Mibo：

```sh
./mibo-server
```

如果 macOS 提示该二进制文件来自互联网并阻止运行，可以在系统设置中允许运行，或移除
quarantine 属性：

```sh
xattr -d com.apple.quarantine ./mibo-server
```

## Windows

把下载到的 `.tar.gz` 压缩包解压到一个目录中，例如 `C:\mibo`。较新的 Windows
版本可以直接在文件资源管理器中解压 `.tar.gz`，也可以使用 PowerShell：

```powershell
mkdir C:\mibo
tar -xzf .\mibo-server-1.0-windows-amd64.tar.gz -C C:\mibo
cd C:\mibo
```

运行 Mibo：

```powershell
.\mibo-server.exe
```

如果 Windows Defender SmartScreen 对下载的二进制文件发出提醒，请先确认文件来自
Mibo 官方 Release 页面，再允许它运行。

## 打开 Mibo

服务启动后，在浏览器中打开：

<http://127.0.0.1:8096>

首次启动时，Mibo 会进入初始化流程。按照页面提示创建第一个管理员，然后添加需要扫描的
媒体目录。

## 常用配置

启动二进制文件前，可以通过环境变量配置 Mibo：

```sh
MIBO_HTTP_ADDR=:8096
MIBO_DATABASE_DRIVER=sqlite
MIBO_DATABASE_DSN=data/mibo.db
MIBO_FFPROBE_ENABLED=true
MIBO_FFPROBE_PATH=ffprobe
MIBO_WORKER_ENABLED=true
```

例如，把 Mibo 运行在 `18081` 端口：

```sh
MIBO_HTTP_ADDR=:18081 ./mibo-server
```

Windows PowerShell 写法：

```powershell
$env:MIBO_HTTP_ADDR=":18081"
.\mibo-server.exe
```

## 更新

1. 停止正在运行的 Mibo 进程。
2. 下载与你的操作系统和 CPU 架构匹配的新版本压缩包。
3. 解压到原安装目录，替换旧的二进制文件。
4. 重新启动 Mibo。

除非你确实想重置本地数据库和运行文件，否则不要删除 `data/` 目录。
