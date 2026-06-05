---
title: 第一个媒体库
description: 添加第一个媒体源，并把其中的目录挂载成 Mibo 媒体库。
---

这篇教程会带你完成两件事：先把一个本地目录添加成媒体源，再从这个媒体源里选择 `Movies`
和 `Shows` 目录创建媒体库。下面的示例使用项目里的演示媒体目录：
`/Users/atlan/Desktop/IdeaProjects/Mibo/demo-media`。

## 进入媒体管理

登录管理员账号后，打开 **设置**，在左侧导航的 **媒体库** 分组里进入 **媒体管理**。
第一次使用时，媒体库列表会提示还没有内容来源。

![媒体库空状态](/Mibo-Docs/screenshots/getting-started/media-library-empty.png)

## 创建媒体源

切换到 **媒体源** 标签页，点击右下角的 **创建媒体源**。

![媒体源空状态](/Mibo-Docs/screenshots/getting-started/media-source-empty.png)

在弹窗里完成下面几项：

- **存储类型**：本地目录保持默认的 **本地目录**。如果你已经配置 OpenList，也可以选择
  对应来源。
- **媒体源名称**：保持 **使用目录名** 时，Mibo 会自动使用 `demo-media`。如果关闭这个选项，
  可以填写 `本地媒体`、`NAS 电影` 或 `家庭媒体入口` 这样的名称。
- **根路径**：选择或输入媒体文件所在的最外层目录。本教程使用
  `/Users/atlan/Desktop/IdeaProjects/Mibo/demo-media`，创建后它会作为后续媒体库挂载的根。

确认路径无误后点击 **创建**。

![创建媒体源](/Mibo-Docs/screenshots/getting-started/create-media-source.png)

## 创建媒体库

回到 **媒体库** 标签页，点击 **创建媒体库**。Mibo 会打开 **添加内容来源** 弹窗。先添加
`Movies`：

![创建媒体库](/Mibo-Docs/screenshots/getting-started/create-media-library.png)

在 **简单模式** 下填写：

- **媒体源**：选择刚刚创建的媒体源。
- **来源名称**：填写这个媒体库在侧边栏和浏览页里显示的名称。示例里先填写 `Movies`。
- **挂载路径**：选择媒体源下面真正要加入媒体库的目录。示例里选择
  `/Users/atlan/Desktop/IdeaProjects/Mibo/demo-media/Movies`。
- **访问标签**：可选。留空时默认对所有已登录用户可见；需要按角色控制可见性时再填写。
- **元数据模板**：如果已经配置元数据模板，可以在这里选择；第一次使用也可以先留空。

填写完成后点击 **添加来源**。

如果还要添加剧集库，再次点击 **创建媒体库**，仍然选择 `demo-media`，把 **来源名称** 填成
`Shows`，并把 **挂载路径** 选到
`/Users/atlan/Desktop/IdeaProjects/Mibo/demo-media/Shows`。这个目录下面可以继续包含剧集季目录，
例如 `灵笼 第二季`。

![媒体库创建完成](/Mibo-Docs/screenshots/getting-started/media-library-created.png)

## 扫描并检查结果

创建完成后，列表里应该能看到 `Movies` 和 `Shows` 两个媒体库。进入
**设置 > 后台任务** 或 **设置 > 媒体库运营** 查看扫描进度。扫描完成后，打开首页、电影、
剧集或目录浏览页面，确认条目已经出现在媒体库中。

如果没有看到内容，优先检查三件事：媒体源根路径是否正确、媒体库挂载路径是否指向实际媒体
目录、当前用户角色是否被访问标签规则限制。
