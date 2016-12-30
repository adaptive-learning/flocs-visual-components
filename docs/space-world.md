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

![task screenshot](docs/files/task-diamond-on-right.png)

Field:
- starts with a lower-case letter denoting background (black 'k', blue 'b', yellow 'y')
- followed by a series of upper-case letters denoting objects (spaceship 'S', diamond 'D', meteoroid 'M', asteroid 'A').

Additional rules:
- there should be exaclty one spaceship
- the spaceship should be somewhere on the bottom row
- the top row should be all blue and there should be no other blue fields

For more examples, see settings of tasks in
[flocs-core/tasks](https://github.com/adaptive-learning/flocs-core/tree/master/tasks).

For the exact (and current) setting setting parser rules, see
[source code of taskSetting parser and generator](https://github.com/adaptive-learning/flocs-visual-components/blob/master/src/core/taskSetting.js).

For new feature requests (or any other changes), create an issue.
