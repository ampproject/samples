# AMP Story

## Developing for amp-story
- Create new templates in the `templates/` subdirectory.  Each template should
have its own directory that contains assets/resources used by that template.
- Follow best practices listed in the [best practices guide](https://www.ampproject.org/docs/fundamentals/amp_story_best_practices).
- Avoid using `px` units for sizing; instead prefer `em`, `rem`, `%`, or
viewport-based units (`vw`, `vh`, `vmin`, or `vmax`).
- Develop with the `amp-story-responsive-units` experiment enabled.  This can be
enabled by executing `AMP.toggleExperiment('amp-story-responsive-units', true)`
in the JavaScript console.

## Sending a Pull Request
- Keep pull requests small in size.  Generally each pull request should only
encompass a single new feature.
- Before sending a pull request:
    - Ensure that your examples are valid amphtml (run `gulp validate`)
    - Ensure that any configuration JSON (bookend, consent, access, etc.) is
    valid
    - Ensure that your code is linted appropriately (run `gulp lint`)
- Add @newmuis as a reviewer on your pull request.
