import { screen } from '@testing-library/testcafe'

fixture`TestCafe`.page('http://localhost:3000')

test('should add two todos and check the first one', async (t) => {
  await t
    .typeText(screen.getByLabelText(/todo/i), 'Task 1')
    .click(screen.getByText(/submit/i))
    .typeText(screen.getByLabelText(/todo/i), 'Task 2')
    .click(screen.getByText(/submit/i))
    .click(screen.getByText('Task 1'))

    .expect(screen.getAllByTestId('todo-item').count).eql(2)
    .expect(screen.getAllByTestId('todo-checkbox').nth(0).child('input').checked).ok();

  await t.eval(() => location.reload());

  await t
    .expect(screen.getAllByTestId('todo-item').count).eql(2)
    .expect(screen.getAllByTestId('todo-checkbox').nth(0).child('input').checked).ok();
});
