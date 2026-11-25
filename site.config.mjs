/**
 * Everything about this site that is not prose: where it lives, which languages it offers and which packages have
 * documentation. Plain JavaScript, because the generator reads it with node.
 *
 * To document a new package: add an entry to `projects`, create `docs/<id>/<language>/` and list the page slugs in
 * the project's `groups` (the page title comes from the markdown H1).
 */
export const site = {
    name: "VPM Documentation",
    tagline: "Documentation for the VPM packages maintained by ykysnk.",
    description:
        "Setup, usage and API documentation for the VPM packages by ykysnk: Localization, Utils and YKYToolKit.",
    url: "https://t2penbix99wcoxkv3a4g.github.io/VPM-Docs/",
    repository: "https://github.com/T2PeNBiX99wcoxKv3A4g/VPM-Docs",
    languages: ["en", "ja", "zh-TW"],
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
            groups: [],
        },
        {
            id: "yky-toolkit",
            name: "YKYToolKit",
            package: "io.github.ykysnk.yky-toolkit",
            repository: "https://github.com/T2PeNBiX99wcoxKv3A4g/VPM.YKYToolKit",
            releases: "https://github.com/T2PeNBiX99wcoxKv3A4g/VPM.YKYToolKit/releases",
            groups: [],
        },
    ],
};
