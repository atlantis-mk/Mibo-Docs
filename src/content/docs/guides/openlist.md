---
title: OpenList 使用方法
description: 在 Mibo 中添加 OpenList 媒体源，并确认连接测试通过。
---

这篇教程会带你把 OpenList 添加为 Mibo 的媒体源。示例使用下面这组连接信息：

- **OpenList 地址**：`http://10.0.0.4:5244`
- **用户名**：`admin`
- **密码**：`admin123`
- **根路径**：`/`

## 进入媒体源管理

打开 Mibo 后，使用管理员账号登录，进入 **设置 > 媒体管理**。在页面顶部切换到
**媒体源** 标签页，然后点击右下角的 **创建媒体源**。

## 选择 OpenList 类型

在 **创建媒体源** 弹窗里，把 **存储类型** 从 **本地目录** 切换为 **OpenList**。
然后填写：

- **媒体源名称**：示例填写 `OpenList 媒体源`。
- **OpenList 地址**：填写 `http://10.0.0.4:5244`。
- **用户名**：填写 `admin`。
- **密码**：填写 `admin123`。
- **扫描间隔**：保持默认的 `1m` 即可。

![填写 OpenList 连接信息](/Mibo-Docs/screenshots/guides/openlist-source-form.png)

## 测试连接

点击 **测试连接**。测试成功后，连接状态会显示 **OpenList 连接成功，可以继续选择根路径**，
并且根路径浏览器会列出 OpenList 中可用的目录。

本次验证中，根目录 `/` 下可以看到 `夸客`、`电影`、`电视剧` 等目录。

![OpenList 连接测试成功](/Mibo-Docs/screenshots/guides/openlist-connection-tested.png)

## 创建媒体源

确认 **根路径** 为 `/`，点击 **创建**。创建成功后，媒体源列表中会出现刚刚添加的
`OpenList 媒体源`，类型显示为 `openlist`，并展示对应的 OpenList 地址。

![OpenList 媒体源创建完成](/Mibo-Docs/screenshots/guides/openlist-source-created.png)

## 后续使用

添加媒体源后，可以回到 **媒体库** 标签页创建媒体库，并在 **媒体源** 中选择
`OpenList 媒体源`。如果后续连接失败，优先检查 OpenList 地址是否可访问、账号密码是否
仍然有效，以及根路径是否指向实际存在的目录。
