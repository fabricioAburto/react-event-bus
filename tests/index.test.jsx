import { useState } from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '../test-utils';
import userEvent from '@testing-library/user-event';
import { useEventBus, useBusEffectOn } from '@react-event-bus';

const validateEmailSubsFk = jest.fn();
const validateEmailFk = jest.fn();

const ValidatorListener = () => {
  const { dispatch } = useEventBus();
  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  useBusEffectOn('validate-email', ({ name, value }) => {
    validateEmailSubsFk(`email-validation-result-${name}`, EMAIL_REGEX.test(value));
    dispatch(`email-validation-result-${name}`, EMAIL_REGEX.test(value));
  });
  return null;
};

const SimpleEmailInput = ({ label, value, name, onChange, error, helperText }) => {
  return (
    <>
      <label>
        {label}
        <input name={name} type="email" value={value} onChange={onChange} />
      </label>
      {error ? <small>{helperText}</small> : null}
    </>
  );
};

function inputAdapter(Input) {
  return function (props) {
    const { name } = props;

    const { dispatch } = useEventBus();
    const [state, setState] = useState('');
    const [isError, setIsError] = useState(false);

    const handleOnChange = ({ target }) => {
      setState(target.value);
      validateEmailFk('validate-email', { name, value: target.value });
      dispatch('validate-email', { name, value: target.value });
    };

    return <Input {...props} value={state} onChange={handleOnChange} error={isError} />;
  };
}

const AdaptedEmail = inputAdapter(SimpleEmailInput);

const Application = () => {
  return (
    <>
      <ValidatorListener />
      <AdaptedEmail name="email" label="Your email" />
    </>
  );
};

describe('EventBus', () => {
  beforeEach(() => {
    validateEmailSubsFk.mockClear();
    validateEmailFk.mockClear();
  });

  test('Should Call Dispatcher properly', async () => {
    render(<Application />);

    const emailInput = screen.getByText('Your email');
    expect(emailInput).toBeInTheDocument();

    const EMAIL = 'example@gmail.com';

    await userEvent.type(emailInput, EMAIL, { writeToClipboard: true });

    expect(validateEmailSubsFk).toBeCalledTimes(EMAIL.length);
    expect(validateEmailFk).lastCalledWith('validate-email', { name: 'email', value: EMAIL });
    expect(validateEmailSubsFk).lastCalledWith('email-validation-result-email', true);
  });
});
