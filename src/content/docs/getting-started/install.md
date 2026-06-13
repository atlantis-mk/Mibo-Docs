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

## Docker

如果你已经安装 Docker，可以直接使用预构建镜像运行 Mibo：

```sh
docker run -d \
  --name mibo \
  -p 18081:18081 \
  -v "$PWD/mibo-data:/data" \
  -v "$PWD/media:/media:ro" \
  atlanxg/mibo
```

Docker 镜像默认监听容器内的 `18081` 端口，并把 SQLite 数据库保存在 `/data/mibo.db`。
上面的命令会把当前目录下的 `mibo-data/` 挂载为运行数据目录，把 `media/` 挂载为只读媒体目录。

服务启动后，在浏览器中打开：

<http://127.0.0.1:18081>

如果要停止并删除容器：

```sh
docker stop mibo
docker rm mibo
```

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

## 设置开机启动

把 Mibo 加入开机启动前，建议先在终端里手动运行一次，确认浏览器可以打开
<http://127.0.0.1:8096>。下面的示例都会把工作目录固定到安装目录，这样默认的
`data/` 目录会稳定保存在同一个位置。

如果你的媒体目录或 `ffprobe` 只对某个用户可见，请让启动项使用同一个用户运行；服务启动
环境通常不会继承你终端里的完整 `PATH`，必要时把 `MIBO_FFPROBE_PATH` 改成绝对路径。

### Linux systemd

下面的示例假设 Mibo 安装在 `/opt/mibo`，并使用当前登录用户运行服务。先移动文件并确认
权限：

```sh
sudo mkdir -p /opt/mibo
sudo cp ~/mibo/mibo-server /opt/mibo/
sudo chown -R "$USER":"$USER" /opt/mibo
chmod +x /opt/mibo/mibo-server
```

创建 systemd 服务文件：

```sh
sudo tee /etc/systemd/system/mibo.service >/dev/null <<EOF
[Unit]
Description=Mibo Media Server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=$USER
WorkingDirectory=/opt/mibo
ExecStart=/opt/mibo/mibo-server
Restart=on-failure
RestartSec=5
Environment=MIBO_HTTP_ADDR=:8096
Environment=MIBO_DATABASE_DRIVER=sqlite
Environment=MIBO_DATABASE_DSN=data/mibo.db
Environment=MIBO_FFPROBE_ENABLED=true
Environment=MIBO_FFPROBE_PATH=ffprobe
Environment=MIBO_WORKER_ENABLED=true

[Install]
WantedBy=multi-user.target
EOF
```

启用并启动服务：

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now mibo
systemctl status mibo
```

查看日志：

```sh
journalctl -u mibo -f
```

如果要停止开机启动：

```sh
sudo systemctl disable --now mibo
```

### macOS launchd

下面的示例使用 LaunchAgent，在当前用户登录后自动启动 Mibo。先确认安装目录和执行权限：

```sh
mkdir -p ~/mibo
chmod +x ~/mibo/mibo-server
mkdir -p ~/Library/LaunchAgents ~/Library/Logs
```

创建 `~/Library/LaunchAgents/com.mibo.server.plist`：

```sh
cat > ~/Library/LaunchAgents/com.mibo.server.plist <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.mibo.server</string>
  <key>ProgramArguments</key>
  <array>
    <string>$HOME/mibo/mibo-server</string>
  </array>
  <key>WorkingDirectory</key>
  <string>$HOME/mibo</string>
  <key>RunAtLoad</key>
  <true/>
  <key>KeepAlive</key>
  <true/>
  <key>EnvironmentVariables</key>
  <dict>
    <key>MIBO_HTTP_ADDR</key>
    <string>:8096</string>
    <key>MIBO_DATABASE_DRIVER</key>
    <string>sqlite</string>
    <key>MIBO_DATABASE_DSN</key>
    <string>data/mibo.db</string>
    <key>MIBO_FFPROBE_ENABLED</key>
    <string>true</string>
    <key>MIBO_FFPROBE_PATH</key>
    <string>ffprobe</string>
    <key>MIBO_WORKER_ENABLED</key>
    <string>true</string>
  </dict>
  <key>StandardOutPath</key>
  <string>$HOME/Library/Logs/mibo.log</string>
  <key>StandardErrorPath</key>
  <string>$HOME/Library/Logs/mibo.err.log</string>
</dict>
</plist>
EOF
```

加载并启动：

```sh
launchctl load ~/Library/LaunchAgents/com.mibo.server.plist
launchctl start com.mibo.server
```

查看日志：

```sh
tail -f ~/Library/Logs/mibo.log ~/Library/Logs/mibo.err.log
```

如果要停止开机启动：

```sh
launchctl unload ~/Library/LaunchAgents/com.mibo.server.plist
```

如果你希望 Mac 在没有用户登录时也启动 Mibo，可以把它改成 LaunchDaemon；这种方式需要把
文件放到 `/Library/LaunchDaemons/` 并用明确的系统用户运行。

### Windows 任务计划程序

下面的示例使用 Windows 任务计划程序，在当前用户登录后自动启动 Mibo。请用 PowerShell
运行：

```powershell
$action = New-ScheduledTaskAction `
  -Execute "C:\mibo\mibo-server.exe" `
  -WorkingDirectory "C:\mibo"
$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet `
  -RestartCount 3 `
  -RestartInterval (New-TimeSpan -Minutes 1) `
  -AllowStartIfOnBatteries

Register-ScheduledTask `
  -TaskName "Mibo Media Server" `
  -Action $action `
  -Trigger $trigger `
  -Settings $settings `
  -Description "Start Mibo Media Server when the user signs in"
```

立即启动任务：

```powershell
Start-ScheduledTask -TaskName "Mibo Media Server"
```

如果要设置环境变量，可以先创建 `C:\mibo\start-mibo.ps1`：

```powershell
$env:MIBO_HTTP_ADDR=":8096"
$env:MIBO_DATABASE_DRIVER="sqlite"
$env:MIBO_DATABASE_DSN="data/mibo.db"
$env:MIBO_FFPROBE_ENABLED="true"
$env:MIBO_FFPROBE_PATH="ffprobe"
$env:MIBO_WORKER_ENABLED="true"
Set-Location "C:\mibo"
.\mibo-server.exe
```

然后把任务动作改成运行这个脚本：

```powershell
$action = New-ScheduledTaskAction `
  -Execute "powershell.exe" `
  -Argument "-NoProfile -ExecutionPolicy Bypass -File C:\mibo\start-mibo.ps1" `
  -WorkingDirectory "C:\mibo"
Set-ScheduledTask -TaskName "Mibo Media Server" -Action $action
```

如果要停止开机启动：

```powershell
Unregister-ScheduledTask -TaskName "Mibo Media Server" -Confirm:$false
```

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
