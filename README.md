# Document opener for STM32

## Tool

Tool showing STM32/SM8 device lines. And their documentations.
On click if document is present he will opens it

![23_01_06_268](https://user-images.githubusercontent.com/48834492/210958095-11756a88-0980-409b-823b-008045d37d25.png)

## Configuration

App must have correctly configured paths in settings:

![23_01_05_265](https://user-images.githubusercontent.com/48834492/210720849-3c5c4fa2-8999-4c84-a8ca-52c026501ac5.png)

The path `%USERPROFILE%/.stmcufinder` will lead to user folder. Where is .stmcufinder installed by default.
The CubeMX repository path must be set manually.

Tool should store this configuration and will be used for each run.

If Path to .stmcufinder is wrong. Orcube-finder-db.db is missing. No documentation will be visible.
If repository path is wrong or the no pdf is present tool will not open the documentation.

## Download STM32 documentation.

It is possible to do it in CubeMX on version 6.6.1 and older. In `Menu->Help->Refresh Data->Download`
![23_01_05_266](https://user-images.githubusercontent.com/48834492/210721747-cd0cd32b-dfa8-479d-a18a-28d16c2196b2.png)

Or is possible to use STMCUFinder and use `Settings icon->Refresh data->Download`
![23_01_05_267](https://user-images.githubusercontent.com/48834492/210721998-91e1673f-7821-4b39-993a-535218d756af.png)

Be sure you have correct repository path.

## Info

The program is able to open the documentation, if file is downloaded in repository.
This is possible to set in configuration.

The documentation can be downloaded with STM32CubeFinder which still have this option. From MX this option disappeared.
