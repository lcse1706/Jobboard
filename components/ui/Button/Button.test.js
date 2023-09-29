import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {
  it('renders with label', () => {
    const label = 'Click Me';
    const { getByText } = render(<Button label={label} />);
    const buttonElement = getByText(label);
    expect(buttonElement).toBeInTheDocument();
  });

  it('executes onClick callback when clicked', () => {
    const onClickMock = jest.fn();
    const label = 'Click Me';
    const { getByText } = render(
      <Button label={label} onClick={onClickMock} />
    );
    const buttonElement = getByText(label);
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const customClassName = 'custom-button';
    const { container } = render(
      <Button label="Click Me" className={customClassName} />
    );
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveClass(customClassName);
  });

  it('has base button classes', () => {
    const { container } = render(<Button label="Click Me" />);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveClass(
      'bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full m-1'
    );
  });
});
