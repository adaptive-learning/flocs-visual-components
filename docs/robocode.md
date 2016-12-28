# RoboCode

RoboCode is a programming language based on Python for learning basics of programming.

### Commands

Moving left, ahead, right + shooting (only possible when moving ahead).

Form: `move('[direction[+action]]')` (default parameter `'ahead'`)

Example of a sequence of commands:

```python
move()
move('left')
move('right')
move('ahead+shot')
```

### Loops

```python
repeat 4:
    move()
```

```python
while color() != 'b':
    move()
```


### Conditionals


```python
if color() == 'y':
    move('left')
```

If-else conditions are not implemented yet, but they will be soon.

### Conditions

- `position() [==|!=|>|<|>=|<=] [1..5]`
- `color() [==|!=] ['k'|'b'|'y']` (black 'k', blue 'b', yellow 'y')
- `<condition> [and|or] <condition>`


## Links

For more examples, see solutions of tasks in
[flocs-core/tasks](https://github.com/adaptive-learning/flocs-core/tree/master/tasks).

For new features requests, create an issue
(but first look if its not already listed,
for example in [issue #29](https://github.com/adaptive-learning/flocs-visual-components/issues/29)).

For syntax improvements, share any suggestions at
[issue #55](https://github.com/adaptive-learning/flocs-visual-components/issues/55).
