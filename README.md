## Null Core modifications

This is a modified version of [remnawave/subscription-page](https://github.com/remnawave/subscription-page),
licensed under AGPL-3.0 like the original.

- Branch `nullcore`, based on upstream tag `8.0.1`. Started 2026-11-27.
- Only `frontend/` is changed: Null Core theme (palette, Manrope font, background), a subscription board,
  and a reworked connection guide (platform chips, recommended app, numbered steps).
- The backend is unchanged; the built `frontend/dist` is mounted over `/opt/app/frontend` of the
  upstream `remnawave/subscription-page:8.0.1` image.
- Deployed builds are tagged `nullcore-8.0.1-<N>`.

## Remnawave Subscription Page

Learn more about Remnawave [here](https://docs.rw/).

# Contributors

Check [open issues](https://github.com/remnawave/subscription-page/issues) to help the progress of this project.

<p align="center">
Thanks to the all contributors who have helped improve Remnawave:
</p>
<p align="center">
<a href="https://github.com/remnawave/subscription-page/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=remnawave/subscription-page" />
</a>
</p>
