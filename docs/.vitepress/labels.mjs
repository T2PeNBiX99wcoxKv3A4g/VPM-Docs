// Labels the theme needs, one block per language. The page text itself lives in the markdown.
//
// `theme` holds the strings of the default theme (outline, footer, search, buttons); VitePress does not translate
// them by itself, so every language carries its own copy here. English is the theme's default and only overrides
// the strings whose wording this site changes.
const copyright = "Copyright © 2026-present yukiyosanako / ゆきよさなこ";

export const labels = {
    "en-US": {
        language: "English",
        nav: {packages: "Packages", github: "GitHub"},
        home: {
            tagline: "Pick a package to read its setup steps, editor usage and API.",
            action: "Documentation",
            features: {
                localization:
                    "Editor localization for VPM packages: translation assets, a language picker and UI Toolkit helpers.",
                utils: "Shared editor helpers used by the other packages.",
                "yky-toolkit":
                    "Editor windows for package management, import tracking and the Unity resource monitor.",
            },
            notes: {
                localization:
                    "`BasicLocalization` and `BasicTranslate` live in `io.github.ykysnk.Localization`; every other page is editor-only (`io.github.ykysnk.Localization.Editor`).",
                utils: "Every public type has its own page; the page title is the type name, so the sidebar is the type list.",
            },
        },
        group: {
            starting: "Getting started",
            guide: "Guide",
            api: "API",
            "api-runtime": "API · Runtime",
            "api-extensions": "API · Extension methods",
            "api-nonudon": "API · NonUdon",
            "api-reflection": "API · Reflection",
            "api-editor": "API · Editor",
            "api-menus": "API · Menus",
            "api-packages": "API · Package handling",
            "api-harmony": "API · Harmony utilities",
            "api-patches": "API · Patches",
            "api-io": "API · Import and export",
            reference: "Reference",
            help: "Help",
        },
        footer: {message: "Released under the MIT License.", copyright},
        theme: {
            search: {
                button: {buttonText: "Search", buttonAriaLabel: "Search"},
                modal: {
                    noResultsText: "No results found",
                    resetButtonTitle: "Clear",
                    footer: {selectText: "select", navigateText: "to navigate", closeText: "to close"},
                },
            },
        },
    },
    "ja-JP": {
        language: "日本語",
        nav: {packages: "パッケージ", github: "GitHub"},
        home: {
            tagline: "パッケージを選ぶと、導入方法・エディタでの使い方・API が読めます。",
            action: "ドキュメント",
            features: {
                localization:
                    "VPM パッケージ向けのエディタ localization。翻訳アセット、言語選択、UI Toolkit ヘルパー。",
                utils: "他のパッケージが使う共有エディタヘルパー。",
                "yky-toolkit": "パッケージ管理・インポート追跡・Unity リソースモニターのエディタウィンドウ。",
            },
            notes: {
                localization:
                    "`BasicLocalization` と `BasicTranslate` は `io.github.ykysnk.Localization`、それ以外のページはエディター専用（`io.github.ykysnk.Localization.Editor`）です。",
                utils: "公開型ごとに 1 ページあります。ページのタイトルが型名なので、サイドバーがそのまま型一覧になります。",
            },
        },
        group: {
            starting: "はじめに",
            guide: "ガイド",
            api: "API",
            "api-runtime": "API · ランタイム",
            "api-extensions": "API · 拡張メソッド",
            "api-nonudon": "API · NonUdon",
            "api-reflection": "API · リフレクション",
            "api-editor": "API · エディター",
            "api-menus": "API · メニュー",
            "api-packages": "API · パッケージ操作",
            "api-harmony": "API · Harmony ユーティリティ",
            "api-patches": "API · パッチ",
            "api-io": "API · インポートとエクスポート",
            reference: "リファレンス",
            help: "ヘルプ",
        },
        footer: {message: "MIT ライセンスで公開しています。", copyright},
        theme: {
            outline: {label: "このページ"},
            docFooter: {prev: "前へ", next: "次へ"},
            lastUpdated: {text: "最終更新"},
            darkModeSwitchLabel: "外観",
            sidebarMenuLabel: "メニュー",
            returnToTopLabel: "トップへ戻る",
            langMenuLabel: "言語を切り替える",
            search: {
                button: {buttonText: "検索", buttonAriaLabel: "検索"},
                modal: {
                    noResultsText: "見つかりませんでした",
                    resetButtonTitle: "クリア",
                    footer: {selectText: "選択", navigateText: "移動", closeText: "閉じる"},
                },
            },
        },
    },
    "zh-Hans": {
        language: "简体中文",
        nav: {packages: "包", github: "GitHub"},
        home: {
            tagline: "选择一个包，查看安装步骤、编辑器用法与 API。",
            action: "文档",
            features: {
                localization: "给 VPM 包用的编辑器本地化：翻译资源、语言选择器与 UI Toolkit 辅助方法。",
                utils: "其他包共用的编辑器工具。",
                "yky-toolkit": "包管理、导入追踪与 Unity 资源监控等编辑器窗口。",
            },
            notes: {
                localization:
                    "`BasicLocalization` 与 `BasicTranslate` 位于 `io.github.ykysnk.Localization`，其余页面仅限编辑器（`io.github.ykysnk.Localization.Editor`）。",
                utils: "每个公开类型各自一页，页面标题就是类名，因此侧边栏等同于类型清单。",
            },
        },
        group: {
            starting: "开始使用",
            guide: "指南",
            api: "API",
            "api-runtime": "API · 运行时",
            "api-extensions": "API · 扩展方法",
            "api-nonudon": "API · NonUdon",
            "api-reflection": "API · 反射",
            "api-editor": "API · 编辑器",
            "api-menus": "API · 菜单",
            "api-packages": "API · 包处理",
            "api-harmony": "API · Harmony 工具",
            "api-patches": "API · 补丁",
            "api-io": "API · 导入与导出",
            reference: "参考",
            help: "疑难解答",
        },
        footer: {message: "以 MIT 授权发布。", copyright},
        theme: {
            outline: {label: "本页内容"},
            docFooter: {prev: "上一页", next: "下一页"},
            lastUpdated: {text: "最后更新"},
            darkModeSwitchLabel: "主题",
            sidebarMenuLabel: "菜单",
            returnToTopLabel: "返回顶部",
            langMenuLabel: "切换语言",
            search: {
                button: {buttonText: "搜索", buttonAriaLabel: "搜索"},
                modal: {
                    noResultsText: "没有找到结果",
                    resetButtonTitle: "清除",
                    footer: {selectText: "选择", navigateText: "切换", closeText: "关闭"},
                },
            },
        },
    },
    "zh-Hant": {
        language: "繁體中文",
        nav: {packages: "套件", github: "GitHub"},
        home: {
            tagline: "選擇一個套件，查看安裝步驟、編輯器用法與 API。",
            action: "文件",
            features: {
                localization: "給 VPM 套件用的編輯器在地化：翻譯資產、語言選擇器與 UI Toolkit 輔助方法。",
                utils: "其他套件共用的編輯器工具。",
                "yky-toolkit": "套件管理、匯入追蹤與 Unity 資源監控等編輯器視窗。",
            },
            notes: {
                localization:
                    "`BasicLocalization` 與 `BasicTranslate` 位於 `io.github.ykysnk.Localization`，其餘頁面僅限編輯器（`io.github.ykysnk.Localization.Editor`）。",
                utils: "每個公開型別各自一頁，頁面標題就是類別名稱，因此側邊欄等同型別清單。",
            },
        },
        group: {
            starting: "開始使用",
            guide: "指南",
            api: "API",
            "api-runtime": "API · 執行階段",
            "api-extensions": "API · 擴充方法",
            "api-nonudon": "API · NonUdon",
            "api-reflection": "API · 反射",
            "api-editor": "API · 編輯器",
            "api-menus": "API · 選單",
            "api-packages": "API · 套件處理",
            "api-harmony": "API · Harmony 工具",
            "api-patches": "API · 修補",
            "api-io": "API · 匯入與匯出",
            reference: "參考",
            help: "疑難排解",
        },
        footer: {message: "以 MIT 授權發布。", copyright},
        theme: {
            outline: {label: "本頁內容"},
            docFooter: {prev: "上一頁", next: "下一頁"},
            lastUpdated: {text: "最後更新"},
            darkModeSwitchLabel: "主題",
            sidebarMenuLabel: "選單",
            returnToTopLabel: "回到頂部",
            langMenuLabel: "切換語言",
            search: {
                button: {buttonText: "搜尋", buttonAriaLabel: "搜尋"},
                modal: {
                    noResultsText: "沒有符合的結果",
                    resetButtonTitle: "清除",
                    footer: {selectText: "選擇", navigateText: "切換", closeText: "關閉"},
                },
            },
        },
    },
};
