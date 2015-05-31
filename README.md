# bonanimous.json v0.1.0

> Open source skeletal animation serialization format

# spec

***bonanimous.json*** consists of 2 different kinds of `.json` files called `.bone.json` and `.anim.json`.

`.bone.json` represents the static positioning of each bone in the system.

`.anim.json` represents the animations of bones.

## .bone.json

### id: `String`

The id of the bone.

### x: `Number`

x coordinate from its parent bone's origin.

### y: `Number`

y coordinate from its parent bone's origin.

### parent: `String|null`

The id of the parent bone. If null, it's the root bone.

## .anim.json

### name: `String`

the name of the animation

### nodes: `Array<NodeAnimation>`

## NodeAnimation interface

### r: `Array<Transform>` optional
### s: `Array<Transform>` optional
### t: `Array<Transform>` optional

### timing: `String` optional
### repeat: `String` optional
### dir: `String` optional

## Transform interface (Tuple)

Transform is represented as the tuple of `(keyframe(Number), value0(Number), value1(Number))`


# License

MIT
