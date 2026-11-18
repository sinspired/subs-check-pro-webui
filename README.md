<p align="center">
<a href="https://github.com/sinspired/subs-check-pro/releases"><img src="https://img.shields.io/github/v/release/sinspired/subs-check-pro?logo=github&include_prereleases"/></a>
<a href="https://hub.docker.com/r/sinspired/subs-check-pro"><img src="https://img.shields.io/docker/pulls/sinspired/subs-check-pro?logo=docker" /></a>
<a href="https://ghcr.io/sinspired/subs-check-pro"><img src="https://img.shields.io/badge/ghcr.io-available-blue?logo=github"/></a>
<a href="https://github.com/sinspired/subs-check-pro/wiki"><img src="https://img.shields.io/badge/Wiki-Docs-blue?logo=github"/></a>
<a href="https://github.com/sinspired/subs-free"><img alt="GitHub Release" src="https://img.shields.io/github/v/release/sinspired/subs-free?include_prereleases&display_name=release&style=flat&logo=wails&logoColor=E2434B&label=%E8%B7%A8%E5%B9%B3%E5%8F%B0%E7%8E%B0%E4%BB%A3GUI"></a>
</p>

# ✨ 现代 WebUI 管理界面

![login](https://github.com/sinspired/subs-check-pro/raw/main/./doc/images/login.png)
![WebUI](https://github.com/sinspired/subs-check-pro/raw/main/./doc/images/WebUI.png)

# 🖥️ Wails v3 现代化桌面客户端

如果你更喜欢原生的桌面应用程序，可以使用全新开发的客户端。它拥有完美的跨平台系统级适配、更低的系统资源开销以及极度现代化的精致 GUI 交互界面。

![GUI](https://github.com/sinspired/subs-check-pro/raw/main/./doc/images/GUI.png)

➡️ 立即前往体验：[subs-free 仓库](https://github.com/sinspired/subs-free)

# 📊 检测结果分析报告

`http://localhost:8199/analysis`

![analysis](https://github.com/sinspired/subs-check-pro/raw/main/./doc/images/analysis.png)

# 📣 交流反馈

- > Telegram 群组：[subs-check性能版](https://t.me/subs_check_pro)⁠
- > Telegram 频道：[关注频道](https://t.me/sinspired_ai)⁠

## 节点延迟上限配置

配合支持 `max-latency` 的主程序版本使用，可在配置表单的“延迟参数”中设置节点延迟上限（毫秒）：

- `300`：只保留 HTTP 测活响应耗时严格小于 300ms 的节点。
- `0`：关闭延迟上限筛选。
- 该设置复用主程序原有 HTTP 测活请求计时，不会额外发送探测请求。

主程序功能对应 PR：[修复检测任务锁并增加节点延迟上限](https://github.com/sinspired/subs-check-pro/pull/19)。在主程序合并并发布支持版本前，WebUI 表单字段不会单独启用后端筛选功能。
