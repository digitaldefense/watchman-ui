`fl-section` is a means of partitioning content with a consistant header and 
actions. It is implemented as an extension or replacement of the `<section>` element.

### Basic card elements
Cards can be created with a simple `fl-section` attribute on a `<section>` 
element, however, there is little reason to as the basic attribute only adds 
the `.fl-section` class. Using the supporting elements within `fl-section` will
significantly improving its usefulness.

| Element                | Description                                        |
|------------------------|----------------------------------------------------|
| `<fl-section-title>`     | Card title                                         |
| `<fl-section-body>`      | Primary content                                    |
| `<fl-section-actions>`   | Container for buttons at the bottom of the card    |
| `<fl-section-footer>`    | Section anchored to the bottom of the card         |

### Card header
Use the `<fl-section-header>` element to clearly separate the card header from the
body as well as provide a space to include header icons and controls.