`wui-card` is a means of partitioning content with a consistant header and 
actions. It is implemented as an extension of the `<section>` element.

### Basic card elements
Cards can be created with a simple `wui-card` attribute on a `<section>` 
element, however, there is little reason to as the basic attribute only adds 
the `.wui-card` class. Using the supporting elements within `wui-card` will
significantly improving its usefulness.

| Element                | Description                                        |
|------------------------|----------------------------------------------------|
| `<wui-card-title>`     | Card title                                         |
| `<wui-card-body>`      | Primary content                                    |
| `<wui-card-actions>`   | Container for buttons at the bottom of the card    |
| `<wui-card-footer>`    | Section anchored to the bottom of the card         |

### Card header
Use the `<wui-card-header>` element to clearly separate the card header from the
body as well as provide a space to include header icons and controls.