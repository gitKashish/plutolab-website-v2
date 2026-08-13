# Fonts

Self-hosted. Nothing here is fetched from a third party at runtime.

| File | Family | Axes | Subset |
| --- | --- | --- | --- |
| `inter-latin.woff2` | Inter | `wght 100..900` | latin |
| `inter-latin-ext.woff2` | Inter | `wght 100..900` | latin-ext |
| `source-serif-4-latin.woff2` | Source Serif 4 | `wght 200..900`, `opsz 8..60` | latin |
| `source-serif-4-latin-ext.woff2` | Source Serif 4 | `wght 200..900`, `opsz 8..60` | latin-ext |
| `source-serif-4-italic-latin.woff2` | Source Serif 4 Italic | `wght 200..900`, `opsz 8..60` | latin |
| `source-serif-4-italic-latin-ext.woff2` | Source Serif 4 Italic | `wght 200..900`, `opsz 8..60` | latin-ext |

The `@font-face` rules live in `src/fonts.css`. The `unicode-range` values there are
what keep latin-ext and italic from downloading on pages that never use them, so they
need to stay in sync with the subsets above.

`src/app.html` preloads the two latin files. Font requests are CORS-mode even when
same-origin, so those `<link rel="preload">` tags must keep `crossorigin` or the
browser downloads each file twice.

## Provenance

Both families are subset and built by Google Fonts. To refresh, request the CSS with a
browser User-Agent (the response varies by UA — an unknown one gets you TTF instead of
WOFF2), then pull the `latin` and `latin-ext` URLs out of it:

```sh
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

curl -A "$UA" 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'
curl -A "$UA" 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap'
```

Captured at Inter `v20` and Source Serif 4 `v14`.

## Licensing

Both families are under the SIL Open Font License 1.1, included here as
`Inter-LICENSE.txt` and `SourceSerif4-LICENSE.md`. Self-hosting is redistribution, so
the license text has to travel with the files — leave them in place.

Source Serif carries the Reserved Font Name "Source". That only restricts distributing
a *modified* version under the same name; these files are unmodified.
