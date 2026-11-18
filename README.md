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

## Sub-Store 公网入口配置

自建部署可在主程序配置中设置 `sub-store-public-url`，让 WebUI 首页入口和订阅分享链接统一使用指定的公网基础地址。支持 HTTP(S) 协议、端口及路径前缀；未配置或配置无效时，继续使用原有自动探测逻辑。Wails 桌面端仍优先使用本地服务地址。

此功能需要主程序同时提供状态接口字段 `subStorePublicUrl` 和配置项 `sub-store-public-url`，对应主程序贡献分支：[Sub-Store 公网入口后端支持](https://github.com/sinspired/subs-check-pro/compare/main...822233:contrib/sub-store-public-url?expand=1)。
