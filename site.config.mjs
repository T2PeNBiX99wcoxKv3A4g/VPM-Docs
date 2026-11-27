/**
 * Everything about this site that is not prose: where it lives, which languages it offers and which packages have
 * documentation. Plain JavaScript, so `docs/.vitepress/config.mts` can import it and build the navigation from it.
 *
 * To document a new package: add an entry to `projects`, create `docs/<id>/` (and `docs/<language>/<id>/` for the
 * translations) and list the page slugs in the project's `groups`; the page title comes from the markdown H1.
 */
export const site = {
    name: "VPM Documentation",
    tagline: "Documentation for the VPM packages.",
    description:
        "Setup, usage and API documentation for the VPM packages: Localization, Utils and YKYToolKit.",
    url: "https://t2penbix99wcoxkv3a4g.github.io/VPM-Docs/",
    repository: "https://github.com/T2PeNBiX99wcoxKv3A4g/VPM-Docs",
    languages: ["en", "ja", "zh-CN", "zh-TW"],
    defaultLanguage: "en",
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
                {id: "reference", docs: ["API"]},
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
                {id: "reference", docs: ["API"]},
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
