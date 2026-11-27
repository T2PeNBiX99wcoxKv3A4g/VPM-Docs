/**
 * Everything about this site that is not prose: where it lives, which languages it offers and which packages have
 * documentation. Plain JavaScript, so `docs/.vitepress/config.mts` can import it and build the navigation from it.
 *
 * To document a new package: add an entry to `projects`, create `docs/<language>/<id>/` for every language and list
 * the page slugs in the project's `groups`; the page title comes from the markdown H1.
 */
export const site = {
    name: "VPM Documentation",
    tagline: "Documentation for the VPM packages.",
    description:
        "Setup, usage and API documentation for the VPM packages: Localization, Utils and YKYToolKit.",
    url: "https://t2penbix99wcoxkv3a4g.github.io/VPM-Docs/",
    repository: "https://github.com/T2PeNBiX99wcoxKv3A4g/VPM-Docs",
    languages: ["en-US", "ja-JP", "zh-Hans", "zh-Hant"],
    defaultLanguage: "en-US",
    projects: [
        {
            id: "localization",
            name: "Localization",
            package: "io.github.ykysnk.localization",
            repository: "https://github.com/T2PeNBiX99wcoxKv3A4g/VPM.Localization",
            releases: "https://github.com/T2PeNBiX99wcoxKv3A4g/VPM.Localization/releases",
            // Sidebar order of the pages under docs/localization/<language>/.
            groups: [
                {id: "starting", docs: ["Overview", "Installation"]},
                {id: "guide", docs: ["Inspector", "Unity-Keys"]},
                {id: "api-runtime", docs: ["API-BasicLocalization", "API-BasicTranslate"]},
                {id: "api-extensions", docs: ["API-LocalizationExtensions"]},
                {
                    id: "api-editor",
                    docs: [
                        "API-GlobalLocalization",
                        "API-LocalizationHelper",
                        "API-UpdateHelper",
                        "API-LanguagePicker",
                        "API-LocalizationPackageAttribute",
                        "API-BasicLocalizationEditor",
                        "API-BasicTranslateDrawer",
                    ],
                },
                {id: "api-io", docs: ["API-LocalizationConverter", "API-TranslateClipboard"]},
                {id: "help", docs: ["Troubleshooting"]},
            ],
        },
        {
            id: "utils",
            name: "Utils",
            package: "io.github.ykysnk.utils",
            repository: "https://github.com/T2PeNBiX99wcoxKv3A4g/VPM.Utils",
            releases: "https://github.com/T2PeNBiX99wcoxKv3A4g/VPM.Utils/releases",
            groups: [
                {id: "starting", docs: ["Overview", "Installation"]},
                {id: "guide", docs: ["Editor-Helpers", "Patches"]},
                {
                    id: "api-runtime",
                    docs: ["API-Utils", "API-IUtilsEditorOnly", "API-BasicEditorComponent"],
                },
                {
                    id: "api-extensions",
                    docs: [
                        "API-ComponentExtensions",
                        "API-DictionaryExtensions",
                        "API-FloatExtensions",
                        "API-GameObjectExtensions",
                        "API-ListExtensions",
                        "API-StringExtensions",
                        "API-TransformExtensions",
                        "API-Texture2DExtensions",
                        "API-Vector3Extensions",
                    ],
                },
                {
                    id: "api-nonudon",
                    docs: [
                        "API-BooleanVector3",
                        "API-ColorHex",
                        "API-Wrapper",
                        "API-ListWrapper",
                        "API-DictionaryWrapper",
                        "API-HashUtils",
                        "API-JsonUtils",
                        "API-Result",
                        "API-Unit",
                        "API-Try",
                        "API-ResultExtensions",
                        "API-ILogger",
                        "API-Logger",
                    ],
                },
                {
                    id: "api-reflection",
                    docs: ["API-ReflectionUtils", "API-ReflectionWrapper", "API-Reflect", "API-ReflectionDelegates"],
                },
                {
                    id: "api-editor",
                    docs: [
                        "API-BasicEditor",
                        "API-BooleanVector3Drawer",
                        "API-ColorHexDrawer",
                        "API-BooleanVector3Field",
                        "API-EditorGUILayoutUtility",
                        "API-EditorGUILayoutUtilityExtensions",
                        "API-EditorGUIUtils",
                        "API-EditorUtils",
                        "API-CustomDialogWindow",
                        "API-DialogContent",
                        "API-EditorTask",
                        "API-RequestExtensions",
                        "API-TaskExtensions",
                    ],
                },
                {
                    id: "api-menus",
                    docs: ["API-MenuItemObject", "API-MenuWrap", "API-MenuServiceWrap", "API-EditorUtilityWrap", "API-MenuExtensions"],
                },
                {id: "api-packages", docs: ["API-UpmInstaller"]},
                {id: "api-harmony", docs: ["API-CodeCursor", "API-TranspilerExtensions"]},
                {
                    id: "api-patches",
                    docs: ["API-Patch", "API-PatchLoader", "API-PatchMethod", "API-ReversePatchMethod", "API-ExportsPatchLoader"],
                },
            ],
        },
        {
            id: "yky-toolkit",
            name: "YKYToolKit",
            package: "io.github.ykysnk.yky-toolkit",
            repository: "https://github.com/T2PeNBiX99wcoxKv3A4g/VPM.YKYToolKit",
            releases: "https://github.com/T2PeNBiX99wcoxKv3A4g/VPM.YKYToolKit/releases",
            groups: [
                {id: "starting", docs: ["Overview", "Installation"]},
                {id: "guide", docs: ["UPM-Installer", "Import-Watcher", "Tools"]},
                {id: "reference", docs: ["Transform-Inspector"]},
            ],
        },
    ],
};
