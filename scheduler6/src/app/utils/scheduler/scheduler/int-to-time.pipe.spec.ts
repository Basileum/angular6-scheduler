import { IntToTimePipe } from './int-to-time.pipe';

describe('IntToTimePipe', () => {
  it('create an instance', () => {
    const pipe = new IntToTimePipe();
    expect(pipe).toBeTruthy();
  });
});
