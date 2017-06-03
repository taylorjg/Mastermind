[![CircleCI](https://circleci.com/gh/taylorjg/Mastermind.svg?style=svg)](https://circleci.com/gh/taylorjg/Mastermind)

## Description

Just trying to gain more experience with React/Redux. Simple implementation of the Mastermind game from like the 70's.

## TODO

* Add a button to abandon an in-progress game
* Add the option to auto-solve using Knuth's algorithm
    * Trigger it by adding something to the query string or via a UI checkbox ?
* Use yarn for package management ?
* Add React middlewares e.g. logging, development tools
* Split React state into smaller pieces and use selectors ? (especially when autosolve has been implemented)
* Add tests re React components
* Add property tests re autosolve ?
* UI: general cosmetic improvements
* UI: highlight active row ?
* UI: add 4 columns (menus) of large pegs to make selecting pegs easier ?
* UI: need some visual ta-da re game outcome
* UI: responsive UI
* UI: keyboard navigation ?
* UI: favicon ?

## Links

* [Mastermind (board game)](https://en.wikipedia.org/wiki/Mastermind_(board_game))
* [Five-guess algorithm](https://en.wikipedia.org/wiki/Mastermind_(board_game)#Five-guess_algorithm)
* [Knuth's mastermind algorithm](https://math.stackexchange.com/questions/1192961/knuths-mastermind-algorithm)
* [An implementation of Knuth's five-guess algorithm to solve a mastermind code](https://gist.github.com/firebus/2153677)
