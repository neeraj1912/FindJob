import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders job search heading', () => {
  render(<App />);
  const heading = screen.getByText(/find a job/i);
  expect(heading).toBeInTheDocument();
});

test('filtering resets pagination', () => {
  render(<App />);
  const nextBtn = screen.getByRole('button', { name: /next/i });
  fireEvent.click(nextBtn);
  const searchInput = screen.getByPlaceholderText(/search by job title/i);
  fireEvent.change(searchInput, { target: { value: 'Senior Frontend Developer' } });
  const jobTitle = screen.getByText(/senior frontend developer/i);
  expect(jobTitle).toBeInTheDocument();
});
