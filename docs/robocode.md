# RoboCode

RoboCode is a programming language based on Python for learning basics of programming.

### Actions

```python
fly()
left()
right()
shoot()
```

Each action is combined with moving one row forward.
The movement takes place after the action, with the exception of left and right turning actions,
where the movement and the action happen simultaneously, i.e. you fly diagonally to the left or to the right.


### Loops

```python
repeat 4:
    fly()
```

```python
while color() != 'b':
    fly()
```


### Conditionals


```python
if color() == 'y':
    left()
```

```python
if color() == 'y':
    left()
elif position() == 1:
    right()
else:
    fly()
```

### Tests

```
position() [==|!=|>|<|>=|<=] [1..5]
color() [==|!=] ['r'|'g'|'b'|'y'|'k']  # (Red, Green, Blue, Yellow, blacK)
<test> [and|or] <test>
```


## Links

- [RoboCode parsing expression grammar](/src/core/roboCodeGrammar.pegjs).
- [examples in flocs-core/tasks](https://github.com/adaptive-learning/flocs-core/tree/master/tasks).

For new feature requests or ideas for improvements,
create an issue
(first look if its not already listed,
for example in [issue #29](https://github.com/adaptive-learning/flocs-visual-components/issues/29)).
