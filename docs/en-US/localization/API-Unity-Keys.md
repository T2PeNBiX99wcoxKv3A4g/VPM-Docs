# Unity keys

## Unity keys

A key that starts with `unity:` holds the English text of a Unity editor string, and Unity translates that text through
`L10n.Tr` instead of the package translating the key. The package only resolves the key to its source text:

```csharp
var key = "unity:label.position";
var source = helper.S(key, out var localized) ? localized : key;
label.text = L10n.Tr(source);
```

`UILocalize` performs the same steps: it looks the key up in the selected language and then in `en-US`, passes the
result (or the raw key) to `L10n.Tr`, and treats the tooltip the same way. Elements with a `unity:` key are not
registered for live updates, because their text follows Unity's editor language, not the selected language of the
package; changing Unity's language requires a restart and the label is resolved again when the tree is rebuilt.

Keep the English text in the `en-US` asset. The loader warns when a `unity:` key is missing from `en-US` or its English
text is empty. Once the assets are loaded, `UILocalize` warns once per key that resolves nowhere, and the label shows
the raw key. See [Unity-Keys](./Unity-Keys.md).
