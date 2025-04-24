# Test info

- Name: New Todo >> should append new items to the bottom of the list
- Location: /home/vinayak/Documents/Playwright-Typescript/tests/example.spec.ts:93:7

# Error details

```
Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)

Locator: getByTestId('todo-count')
Expected string: "3 items leftt"
Received string: "3 items left"
Call log:
  - expect.toHaveText with timeout 5000ms
  - waiting for getByTestId('todo-count')
    9 × locator resolved to <span class="todo-count" data-testid="todo-count">…</span>
      - unexpected value "3 items left"

    at /home/vinayak/Documents/Playwright-Typescript/tests/example.spec.ts:102:29
```

# Page snapshot

```yaml
- text: This is just a demo of TodoMVC for testing, not the
- link "real TodoMVC app.":
  - /url: https://todomvc.com/
- heading "todos" [level=1]
- textbox "What needs to be done?"
- checkbox "❯Mark all as complete"
- text: ❯Mark all as complete
- list:
  - listitem:
    - checkbox "Toggle Todo"
    - text: buy some cheese
  - listitem:
    - checkbox "Toggle Todo"
    - text: feed the cat
  - listitem:
    - checkbox "Toggle Todo"
    - text: book a doctors appointment
- strong: "3"
- text: items left
- list:
  - listitem:
    - link "All":
      - /url: "#/"
  - listitem:
    - link "Active":
      - /url: "#/active"
  - listitem:
    - link "Completed":
      - /url: "#/completed"
- contentinfo:
  - paragraph: Double-click to edit a todo
  - paragraph:
    - text: Created by
    - link "Remo H. Jansen":
      - /url: http://github.com/remojansen/
  - paragraph:
    - text: Part of
    - link "TodoMVC":
      - /url: http://todomvc.com
```

# Test source

```ts
   2 |
   3 | test('Example test 1',async()=>{})
   4 |
   5 | test.skip('has title', async ({ page }) => {
   6 |   await page.goto('https://playwright.dev/');
   7 |
   8 |   // Expect a title "to contain" a substring.
   9 |   await expect(page).toHaveTitle(/Playwright/);
   10 | });
   11 |
   12 | test('has title 1', async ({ page }) => {
   13 |   await page.goto('https://playwright.dev/');
   14 |
   15 |   // Expect a title "to contain" a substring.
   16 |   await expect(page).toHaveTitle(/Vinayak/);
   17 | });
   18 |
   19 | test('has title 2', async ({ page }) => {
   20 |   await page.goto('https://playwright.dev/');
   21 |
   22 |   // Expect a title "to contain" a substring.
   23 |   await expect(page).toHaveTitle(/Vinayak/);
   24 | });
   25 |
   26 | test('has title 3', async ({ page }) => {
   27 |   await page.goto('https://playwright.dev/');
   28 |
   29 |   // Expect a title "to contain" a substring.
   30 |   await expect(page).toHaveTitle(/Vinayak/);
   31 | });
   32 |
   33 | test('get started link', async ({ page }) => {
   34 |   await page.goto('https://playwright.dev/');
   35 |
   36 |   // Click the get started link.
   37 |   await page.getByRole('link', { name: 'Get started' }).click();
   38 |
   39 |   // Expects page to have a heading with the name of Installation.
   40 |   await expect(page.getByRole('heading', { name: 'Installation' })).not.toBeVisible();
   41 | });
   42 |
   43 | test.beforeEach(async ({ page }) => {
   44 |   await page.goto('https://demo.playwright.dev/todomvc');
   45 | });
   46 |
   47 | const TODO_ITEMS = [
   48 |   'buy some cheese',
   49 |   'feed the cat',
   50 |   'book a doctors appointment'
   51 | ] as const;
   52 |
   53 | test.describe('New Todo', () => {
   54 |   test.skip('should allow me to add todo items', async ({ page }) => {
   55 |     // create a new todo locator
   56 |     const newTodo = page.getByPlaceholder('What needs to be done?');
   57 |
   58 |     // Create 1st todo.
   59 |     await newTodo.fill(TODO_ITEMS[0]);
   60 |     await newTodo.press('Enter');
   61 |
   62 |     // Make sure the list only has one todo item.
   63 |     await expect(page.getByTestId('todo-title')).toHaveText([
   64 |       TODO_ITEMS[0]
   65 |     ]);
   66 |
   67 |     // Create 2nd todo.
   68 |     await newTodo.fill(TODO_ITEMS[1]);
   69 |     await newTodo.press('Enter');
   70 |
   71 |     // Make sure the list now has two todo items.
   72 |     await expect(page.getByTestId('todo-title')).toHaveText([
   73 |       TODO_ITEMS[0],
   74 |       TODO_ITEMS[1]
   75 |     ]);
   76 |
   77 |     await checkNumberOfTodosInLocalStorage(page, 2);
   78 |   });
   79 |
   80 |   test('should clear text input field when an item is added', async ({ page }) => {
   81 |     // create a new todo locator
   82 |     const newTodo = page.getByPlaceholder('What needs to be done?');
   83 |
   84 |     // Create one todo item.
   85 |     await newTodo.fill(TODO_ITEMS[0]);
   86 |     await newTodo.press('Enter');
   87 |
   88 |     // Check that input is empty.
   89 |     await expect(newTodo).toBeEmpty();
   90 |     await checkNumberOfTodosInLocalStorage(page, 1);
   91 |   });
   92 |
   93 |   test('should append new items to the bottom of the list', async ({ page }) => {
   94 |     // Create 3 items.
   95 |     await createDefaultTodos(page);
   96 |
   97 |     // create a todo count locator
   98 |     const todoCount = page.getByTestId('todo-count')
   99 |   
  100 |     // Check test using different methods.
  101 |     await expect(page.getByText('3 items left')).toBeVisible();
> 102 |     await expect(todoCount).toHaveText('3 items leftt');
      |                             ^ Error: Timed out 5000ms waiting for expect(locator).toHaveText(expected)
  103 |     await expect(todoCount).toContainText('3');
  104 |     await expect(todoCount).toHaveText(/3/);
  105 |
  106 |     // Check all items in one call.
  107 |     await expect(page.getByTestId('todo-title')).toHaveText(TODO_ITEMS);
  108 |     await checkNumberOfTodosInLocalStorage(page, 3);
  109 |   });
  110 | });
  111 |
  112 | test.describe('Mark all as completed', () => {
  113 |   test.beforeEach(async ({ page }) => {
  114 |     await createDefaultTodos(page);
  115 |     await checkNumberOfTodosInLocalStorage(page, 3);
  116 |   });
  117 |
  118 |   test.afterEach(async ({ page }) => {
  119 |     await checkNumberOfTodosInLocalStorage(page, 3);
  120 |   });
  121 |
  122 |   test('should allow me to mark all items as completed', async ({ page }) => {
  123 |     // Complete all todos.
  124 |     await page.getByLabel('Mark all as complete').check();
  125 |
  126 |     // Ensure all todos have 'completed' class.
  127 |     await expect(page.getByTestId('todo-item')).toHaveClass(['completed', 'completed', 'completed']);
  128 |     await checkNumberOfCompletedTodosInLocalStorage(page, 3);
  129 |   });
  130 |
  131 |   test('should allow me to clear the complete state of all items', async ({ page }) => {
  132 |     const toggleAll = page.getByLabel('Mark all as complete');
  133 |     // Check and then immediately uncheck.
  134 |     await toggleAll.check();
  135 |     await toggleAll.uncheck();
  136 |
  137 |     // Should be no completed classes.
  138 |     await expect(page.getByTestId('todo-item')).toHaveClass(['', '', '']);
  139 |   });
  140 |
  141 |   test('complete all checkbox should update state when items are completed / cleared', async ({ page }) => {
  142 |     const toggleAll = page.getByLabel('Mark all as complete');
  143 |     await toggleAll.check();
  144 |     await expect(toggleAll).toBeChecked();
  145 |     await checkNumberOfCompletedTodosInLocalStorage(page, 3);
  146 |
  147 |     // Uncheck first todo.
  148 |     const firstTodo = page.getByTestId('todo-item').nth(0);
  149 |     await firstTodo.getByRole('checkbox').uncheck();
  150 |
  151 |     // Reuse toggleAll locator and make sure its not checked.
  152 |     await expect(toggleAll).not.toBeChecked();
  153 |
  154 |     await firstTodo.getByRole('checkbox').check();
  155 |     await checkNumberOfCompletedTodosInLocalStorage(page, 3);
  156 |
  157 |     // Assert the toggle all is checked again.
  158 |     await expect(toggleAll).toBeChecked();
  159 |   });
  160 | });
  161 |
  162 | test.describe('Item', () => {
  163 |
  164 |   test('should allow me to mark items as complete', async ({ page }) => {
  165 |     // create a new todo locator
  166 |     const newTodo = page.getByPlaceholder('What needs to be done?');
  167 |
  168 |     // Create two items.
  169 |     for (const item of TODO_ITEMS.slice(0, 2)) {
  170 |       await newTodo.fill(item);
  171 |       await newTodo.press('Enter');
  172 |     }
  173 |
  174 |     // Check first item.
  175 |     const firstTodo = page.getByTestId('todo-item').nth(0);
  176 |     await firstTodo.getByRole('checkbox').check();
  177 |     await expect(firstTodo).toHaveClass('completed');
  178 |
  179 |     // Check second item.
  180 |     const secondTodo = page.getByTestId('todo-item').nth(1);
  181 |     await expect(secondTodo).not.toHaveClass('completed');
  182 |     await secondTodo.getByRole('checkbox').check();
  183 |
  184 |     // Assert completed class.
  185 |     await expect(firstTodo).toHaveClass('completed');
  186 |     await expect(secondTodo).toHaveClass('completed');
  187 |   });
  188 |
  189 |   test('should allow me to un-mark items as complete', async ({ page }) => {
  190 |     // create a new todo locator
  191 |     const newTodo = page.getByPlaceholder('What needs to be done?');
  192 |
  193 |     // Create two items.
  194 |     for (const item of TODO_ITEMS.slice(0, 2)) {
  195 |       await newTodo.fill(item);
  196 |       await newTodo.press('Enter');
  197 |     }
  198 |
  199 |     const firstTodo = page.getByTestId('todo-item').nth(0);
  200 |     const secondTodo = page.getByTestId('todo-item').nth(1);
  201 |     const firstTodoCheckbox = firstTodo.getByRole('checkbox');
  202 |
```