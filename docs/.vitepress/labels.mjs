// Labels the theme needs, one block per language. The page text itself lives in the markdown.
//
// `theme` holds the strings of the default theme (outline, footer, search, buttons); VitePress does not translate
// them by itself, so every language carries its own copy here. English is the theme's default and only overrides
// the strings whose wording this site changes.
const copyright = "Copyright © 2025-present yukiyosanako / ゆきよさなこ";

export const labels = {
    "en-US": {
        language: "English",
        nav: {packages: "Packages", github: "GitHub"},
        group: {starting: "Getting started", guide: "Guide", reference: "Reference", help: "Help"},
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
        group: {starting: "はじめに", guide: "ガイド", reference: "リファレンス", help: "ヘルプ"},
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
        group: {starting: "开始使用", guide: "指南", reference: "参考", help: "疑难解答"},
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
        group: {starting: "開始使用", guide: "指南", reference: "參考", help: "疑難排解"},
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
