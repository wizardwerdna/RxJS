## Andrew Greenberg's Seed Development System.

This package is a seed development system relying on RxJS, Cycle.js, Node, Typescript and Webpack for  Functional Responsive Programming development of a
web application.  To run the application:

```bash
npm run setup
npm start
```

## Testsuite (Brower-console-based Test Functions).

The seed development system includes a homegrown test system that displays
test results in the console of a Browser.

```javascript
test('string identifying test or tests', function_containing_assertions, display)
```

A `test` function posts a group to the browser console, bearing the string
as its identifier, and then runs the function.  The third parameter `display` indicates whether the group for the test is initially opened (when true, the default), or closed.  Tests may be nested, where they will post groups internal to parent tests.  Statistics of tests run,
passed and errors are maintained and will be posted after the outermost
nested function is completed.

```javascript
expect(actual)
expect(actual).not
```

Expectations retain the value of `actual` for use with subsequent testing
functions as shown below.  If followed with a `.not`, it will change the
meaning of the testing function, passing when the function would fail, and vice-versa.  Thus, `expect(1).toBe(1)` passes and `expect(1).not.toBe(1)` fails.  Likewise, `expect(1).not.toBe(false)` passes and `expect(1).toBe(false)` fails.

```javascript
expect(actual).toBe(expected)
```

This test is passed, when `actual === expected`, in the javascript
sense of '==='.  Thus,

```javascript
expect(actual).toEqual(expected)
```

This test is passed, when `JSON.stringify(actual) === JSON.stringify(expected)`.

```javascript
expect(actual$).toMarble(expected_marble_diagram)
```

This test is passed, when `str2mbl(actual$) === expected_marble_diagram`.

```javascript
expect(actual$).toBeStreamOf(expected)
```

For each element `ele` of actual$, this expectation runs `expect(ele).toBe(expected)`, as separate expectations.  Thus, no tests are run when actual$ is the empty stream.

```typescript
mbl2str$(marble_diagram)
```

This returns a stream corresponding to the ASCII marble diagram.  The stream is treated synchronously, giving no meaning to each '-', except as a separator of
the elements presented.  Thus `mbl2str$('--a-b--c--|')` is the same stream as `mbl2str$('-a-b-c|')`;

```typescript
assertMVIComponent(compnent)
```

This executes a predetermined suite of tests to confirm that the identified function implements
the MVI Protocol, as defined in [André Staltz' article](http://staltz.com/unidirectional-user-interface-architectures.html).
Essentially, the tests assure that three functions, model, view and intent are provided, implementing the functionality
as set forth there.  The component must be defined with three parameters for those functions, hence in the form:

`main(sources, model = modelFn, view = viewFn, intent = intentFn)`

As a matter of convenience, the three functions can be independently unit tested.
