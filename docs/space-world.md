# Space World

SpaceWorld is a simple grid world used in (currently the only one) game in RoboMission for learning basics of programming.

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
  - objects: `S`paceship, `D`iamond, `M`eteoroid, `A`steroid
- for example, `kD` is a black field with a diamond

## Conventions:
- the top row should be all blue and there should be no other blue fields

For more examples, see settings of tasks in
[flocs-core/tasks](https://github.com/adaptive-learning/flocs-core/tree/master/tasks).

For the exact (and current) setting setting parser rules, see
[source code of taskSetting parser and generator](/src/core/taskSetting.js).

For new feature requests (or any other changes), create an issue.
