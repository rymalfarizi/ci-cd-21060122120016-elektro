import { render, screen } from '@testing-library/react';
import { act } from 'react'; // Import act from react
import App from './App';

test('renders To Do List header', () => {
  act(() => {
    render(<App />);
  });
  const headerElement = screen.getByText(/To Do List/i); // Update the text to match actual content
  expect(headerElement).toBeInTheDocument();
});