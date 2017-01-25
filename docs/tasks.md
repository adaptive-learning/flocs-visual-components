# Tasks

Each task (Space Game) is described as a single markdown file with the following format:

    # four-steps-forward
    [- option: value]*

    ## Setting

    ```
    (SpaceWorld description)
    ```
    [- option: value]*

    ## Solution

    ```
    (RoboCode)
    ```

Example:

    # four-steps-forward
    - category: repeat

    ## Setting

    ```
    |g |g |g |g |g |
    |b |b |b |b |b |
    |b |b |b |b |b |
    |b |b |b |b |b |
    |b |b |bS|b |b |
    ```
    - energy: 2
    - actionsLimit: 1

    ## Solution

    ```
    repeat 4:
        fly()
    ```

- [SpaceWord description](/docs/space-world.md)
- [RoboCode syntax](/docs/robocode.md)
- [exact TaskSource grammar](/src/core/taskSourceGrammar.pegjs)
- [examples in flocs-core/tasks](https://github.com/adaptive-learning/flocs-core/tree/master/tasks)
