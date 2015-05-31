# bonanimous.json v0.1.0

> Open source skeletal animation serialization format

# spec

***bonanimous.json*** consists of 2 different kinds of `.json` files called `.bone.json` and `.anim.json`.

`.bone.json` represents the static positioning of each bone in the system.

`.anim.json` represents the animations of bones.

## .bone.json

Example
```json
[{
    "id": "0",
    "x": 150,
    "y": 150,
    "parent": null
}, {
    "id": "0-0",
    "x": -90,
    "y": -90,
    "parent": "0"
}, {
    "id": "0-0-0",
    "x": -30,
    "y": -30,
    "parent": "0-0"
}]
```

### id: `String`

The id of the bone.

### x: `Number`

x coordinate from its parent bone's origin.

### y: `Number`

y coordinate from its parent bone's origin.

### parent: `String|null`

The id of the parent bone. If null, it's the root bone.

## .anim.json

Example
```json
[{
    "name": "rot",
    "nodes": [{
        "id": "0",
        "r": [[0, 0], [100, 360]],
        "t": [],
        "s": [[0, 1], [100, 0.2]],
        "repeat": "inifinite",
        "timing": "linear",
        "dir": "alternate"
    }, {
        "id": "0-0",
        "r": [[0, 0], [100, 360]],
        "repeat": "inifinite",
        "timing": "linear",
        "dir": "alternate"
    }, {
        "id": "0-0-0",
        "r": [[0, 0], [100, 360]],
        "rep": "inifinite",
        "timing": "linear",
        "dir": "alternate"
    }]
}]
```

### name: `String`

the name of the animation

### nodes: `Array<NodeAnimation>`

## NodeAnimation interface

### r: `Array<Transform>` optional
### s: `Array<Transform>` optional
### t: `Array<Transform>` optional

### duration: `Number` optional
### timing: `String` optional
### repeat: `String` optional
### dir: `String` optional

## Transform interface (Tuple)

Transform is represented as the 3-tuple of `(keyframe(Number), value0(Number), value1(Number))`

### 0: `Number`

This represents the keyframe, from 0 to 100

### 1: `Number`

This represents the value of the transform in the given keyframe.
If the transform is a rotation, this is the degree of the rotation.
If the transform is a translation, this is the distance along the x coordinate.
If the transform is a scaling, this is the scaling ratio along the x coordinate.

### 2: `Number` optional

This represents the additional value of the transform in the given keyframe.
If the transform is a translation, this is the distance along the y coordinate.
If the transform is a scaling, this is the scaling ratio along the y coordinate.

# License

MIT
