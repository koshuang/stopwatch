import { secondsToString } from './secondsToString';

it('should convert seconds to time string', () => {
  const seconds = 60;

  const result = secondsToString(seconds);

  expect(result).toEqual('00:01:00');
});
