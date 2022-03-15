# File Structure and Naming Convention

## File Structure

### Organize your code by feature

Organize directories by feature, not by type. For example, an online shop should have directories named products, checkout, backend, not views, models, controllers, etc.

### LIFT Principle

> Please see the [Angular coding style guide](https://angular.io/guide/styleguide/) for more information.

Do structure the application such that you can **L**ocate code quickly, **I**dentify the code at a glance, keep the **F**lattest structure you can, and **T**ry to be DRY.

Do define the structure to follow these four basic guidelines, listed in order of importance.

Why? LIFT provides a consistent structure that scales well, is modular, and makes it easier to increase developer efficiency by finding code quickly. To confirm your intuition about a particular structure, ask: can I quickly open and start work in all of the related files for this feature?

#### Locate

Do make locating code intuitive and fast.

Why? To work efficiently you must be able to find files quickly, especially when you do not know (or do not remember) the file names. Keeping related files near each other in an intuitive location saves time. A descriptive folder structure makes a world of difference to you and the people who come after you.

#### Identify

Do name the file such that you instantly know what it contains and represents.

Do be descriptive with file names and keep the contents of the file to exactly one component.

Avoid files with multiple components, multiple services, or a mixture.

Why? Spend less time hunting and pecking for code, and become more efficient. Longer file names are far better than short-but-obscure abbreviated names.

#### Flattest

Do keep a flat folder structure as long as possible.

Consider configuring the IDE to hide distracting, irrelevant files such as generated .js and .js.map files.

Why? No one wants to search for a file through seven levels of folders. A flat structure is easy to scan.

On the other hand, psychologists believe that humans start to struggle when the number of adjacent interesting things exceeds nine. **So when a folder has 10 or more files, it may be time to create subfolders.**

Base your decision on your comfort level. Use a flatter structure until there is an obvious value to creating a new folder.

#### Try to be DRY

Do be DRY (Don't Repeat Yourself).

Avoid being so DRY that you sacrifice readability.

Why? Being DRY is important, but not crucial if it sacrifices the other elements of LIFT. That's why it's called T-DRY. For example, it's redundant to name a template hero-view.component.html because with the .html extension, it is obviously a view. But if something is not obvious or departs from a convention, then spell it out.

## Naming Convention

### General Naming Guidelines

Do use consistent names for all symbols.

Do follow a pattern that describes the symbol's feature then its type. The recommended pattern is feature.type.ts.

Why? Naming conventions help provide a consistent way to find content at a glance. Consistency within the project is vital. Consistency with a team is important. Consistency across a company provides tremendous efficiency.

Why? The naming conventions should help find desired code faster and make it easier to understand.

Why? Names of folders and files should clearly convey their intent. For example, app/heroes/hero-list.component.ts may contain a component that manages a list of heroes.

### Separate file names with dots and dashes

Do use dashes to separate words in the descriptive name.

Do use dots to separate the descriptive name from the type.

Do use consistent type names for all components following a pattern that describes the component's feature then its type. A recommended pattern is feature.type.ts.

Do use conventional type names including .service, .component, .pipe, .module, and .directive. Invent additional type names if you must but take care not to create too many.

Why? Type names provide a consistent way to quickly identify what is in the file.

Why? Type names make it easy to find a specific file type using an editor or IDE's fuzzy search techniques.

Why? Unabbreviated type names such as .service are descriptive and unambiguous. Abbreviations such as .srv, .svc, and .serv can be confusing.

Why? Type names provide pattern matching for any automated tasks.
