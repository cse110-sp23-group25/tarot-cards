# Change Log

## June 7, 2023
Re-generated tarot card images for "world", "chariot", & "lovers" as they do not appear on Github Pages. The "world" card now properly works, but "chariot" and "lovers" are still throwing errors on Github Pages, but not locally.
*CI-PIPELINE: Successfully integrated Github Actions code climate workflow.*

## June 5, 2023
*CI-PIPELINE: Worked on adding Github Actions code climate workflow.*

## June 4, 2023
Designed and added welcome page as well as animations for cards being drawn. Merged style changes to main. Added more testing.

## June 3, 2023
Refactored existing code for fortune generation to follow Semantic HTML standards. HTML elements are no longer generated in the javascript file, but are only modified. Added in background image and background music. Styled button which leads to page with the card fortunes. Styled fortune page to look like a receipt.

## June 2, 2023
Changed back of cards to be a new design. Fixed positioning of cards to make it friendly to viewport resizing. Fixed flip animation of cards to not invert the card images.

*CI-PIPELINE: JSDocs successfully generate to `gh-pages` branch not using any Secrets. Documentation generates to `html` files. Tested out deployment files with Heroku, but encountered many compatibility issues.*

## May 31, 2023
More unit testing. Wrote tests for Card and Deck classes and functions. Attempted to write pupeteer tests for UI testing, but faced issues getting page to load.

*CI-PIPELINE:* Added in ruleset to ESLint configuration file to ensure that each line ends with a semicolon.

## May 30, 2023
Merged `working-refactor` branch with `main`. Created `workingTest` branch to be branch dedicated to testing. Began writing tests.

## May 29, 2023
*CI-PIPELINE:* Change linter to parse with ES6.

## May 28, 2023
Finished refactoring all code from original MVP. Functionality is the same, but code is more organized and easier to test. Created `package.json` file and set up repository for JEST unit testing.

*CI-PIPELINE:* Added `.eslintrc.json` file to supply `super-linter` with custom style guidlines.

## May 27, 2023
Major bug fix. Implemented an `async` function to generate the card deck. Earlier, the code was not waiting for the cards to generate causing issues.

*CI-PIPELINE:* Successfully integrated automated JEST unit tests in CI-CD Test Repository.

## May 26, 2023
Began refactoring the code from the MVP. Main goals being to create more functions, create more organized classes, & refactor the `json` file containing the fortunes.

*CI-PIPELINE:* Ran entire codebase through `super-linter` workflow to ensure that all files have proper style.

## May 24, 2023
Continued UI development. Added background video and audio on card flip.

## May 21, 2023
Began UI development. Added grids and div containers to format cards into tarot card cross format. Added card flipping animation. Laid out `html` file to make later UI development easier by laying out the page ahead of time. Merge `working` branch with `main`.

*CI-PIPELINE:* Continued to work on JSDoc generation. Created secret token, but files are still not generating.

## May 20, 2023
Began development of MVP. Generated all fortunes. At the moment, cards are laid out in a straight line and randomized every page refresh. On click, card faces show the randomly selected cards.

*CI-PIPELINE:* Added in `super-linter` workflow to lint all files. Begin exploring automated JEST unit testing & JSDoc generation.

## May 19, 2023
Create folder layouts and style guidlines.

*CI-PIPELINE:* Began testing Github Actions files on [this](https://github.com/cse110-sp23-group25/CI-CD-test-repo) test repository. Attempted to integrate Codacy.

## May 17, 2023
Used AI to generate 22 coffee themed tarot card images.