# Space World

Space World is a simple grid world used in (currently the only one) game in RoboMission for learning basics of programming.

Example:

```
|b |bM|b |b |b |
|k |k |k |kA|k |
|kA|k |k |k |kD|
|k |kM|k |k |k |
|k |k |kS|k |kM|
```

Corresponds to:

![task screenshot](/docs/files/task-diamond-on-right.png)

## Field
- starts with a lower-case letter denoting background
  - colors: `r`ed, `g`reen, `b`lue, `y`ellow, blac`k`
- followed by a series of upper-case letters denoting objects
  - objects: `S`paceship, `D`iamond, `M`eteoroid, `A`steroid, `W`ormhole
- for example, `bD` is a blue field with a diamond

## Conventions
- use black as a basic background colour, blue for the top row, other colours for specific meaning (decisions or just hints)

## Links

For more examples, see settings of tasks in
[flocs-core/tasks](https://github.com/adaptive-learning/flocs-core/tree/master/tasks).

For the exact (and current) Space World description rules, see
[source code of Space World parser and generator](/src/core/spaceWorldDescription.js).

For new feature requests (or any other changes), create an issue.
