---
title: 元数据源配置
description: 配置 TMDB 元数据提供方、元数据模板，并把模板应用到 OpenList 电影媒体库。
---

这篇教程会完整走一遍元数据配置流程：先添加 TMDB 提供方实例，再创建元数据模板，最后回到
媒体库，把 OpenList 中的 `/电影` 目录添加成电影库，并绑定刚刚创建的模板。

开始前需要准备：

- 已经添加好的 `OpenList 媒体源`。
- OpenList 中存在 `/电影` 目录。
- 一个可用的 TMDB API Key 或令牌。

## 创建 TMDB 提供方实例

打开 **设置 > 元数据策略**，停留在 **提供方实例** 标签页，点击右下角的
**新建提供方实例**。

在弹窗里填写：

- **名称**：`TMDB 电影元数据`。
- **提供方类型**：选择 `TMDB`。
- **API 密钥 / 令牌**：输入自己的 TMDB Key。这个字段会以密码形式隐藏。
- **基础 URL**：保持 `https://api.themoviedb.org/3`。
- **语言**：填写 `zh-CN`。
- **图片基础 URL**：保持 `https://image.tmdb.org/t/p/original`。
- **超时时间**：保持 `30s`。
- **重试次数**：保持 `2`。

![填写 TMDB 提供方实例](/Mibo-Docs/screenshots/guides/metadata-provider-form.png)

点击 **保存**。保存成功后，列表里会出现 `TMDB 电影元数据`，状态显示为已启用、可用，
并且配置状态为已配置。

![TMDB 提供方实例创建完成](/Mibo-Docs/screenshots/guides/metadata-provider-created.png)

## 创建元数据模板

切换到 **元数据模板** 标签页。第一次配置时，页面会提示还没有元数据模板。点击
**新建元数据模板**。

![元数据模板空状态](/Mibo-Docs/screenshots/guides/metadata-template-empty.png)

在模板弹窗里填写：

- **模板名称**：`TMDB 电影模板`。
- **允许回退**：保持开启。
- **描述**：填写这个模板的用途，例如
  `使用 TMDB 电影元数据作为搜索和详情阶段的默认提供方，适合 OpenList 电影库。`
- **搜索阶段**：勾选 `TMDB 电影元数据`。
- **详情阶段**：勾选 `TMDB 电影元数据`。
- **默认元数据语言**：填写 `zh-CN`。

![配置 TMDB 元数据模板](/Mibo-Docs/screenshots/guides/metadata-template-form.png)

点击 **保存**。创建成功后，模板列表会显示 `TMDB 电影模板`，并列出搜索阶段和详情阶段
使用的提供方实例。

![TMDB 元数据模板创建完成](/Mibo-Docs/screenshots/guides/metadata-template-created.png)

## 回到媒体库创建 OpenList 电影库

进入 **设置 > 媒体管理**，停留在 **媒体库** 标签页，点击 **创建媒体库**。

![回到媒体库准备创建来源](/Mibo-Docs/screenshots/guides/openlist-library-before-create.png)

在 **添加内容来源** 弹窗里，先选择 **媒体源** 为 `OpenList 媒体源`。选择后，路径浏览器
会列出 OpenList 根目录下的目录，本次示例可以看到 `夸客`、`电影`、`电视剧`。

![选择 OpenList 媒体源](/Mibo-Docs/screenshots/guides/openlist-library-source-selected.png)

点击 `电影` 目录，让 **当前媒体源子目录** 切换为 `/电影`。然后把 **来源名称** 填为
`OpenList 电影`。

![选择 OpenList 电影目录](/Mibo-Docs/screenshots/guides/openlist-library-movie-path.png)

在 **元数据模板** 中选择刚才创建的 `TMDB 电影模板`。

![选择 TMDB 电影模板](/Mibo-Docs/screenshots/guides/openlist-library-template-selected.png)

确认媒体源、挂载路径和模板都正确后，点击 **添加来源**。创建成功后，媒体库列表里会出现
`OpenList 电影`，路径为 `/电影`，元数据模板显示为 `TMDB 电影模板`。

![OpenList 电影媒体库创建完成](/Mibo-Docs/screenshots/guides/openlist-library-created.png)

## 后续检查

媒体库创建后会进入扫描和探测流程。可以进入 **设置 > 后台任务** 或
**设置 > 媒体库运营** 查看扫描进度；扫描完成后，回到首页、电影页或目录浏览页确认内容
是否出现。如果没有识别到元数据，优先检查 TMDB Key 是否有效、模板是否绑定到了媒体库、
以及 OpenList 的 `/电影` 目录是否能正常列出文件。
