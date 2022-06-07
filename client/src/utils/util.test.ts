import qsParser from './qsParser';
import debounce from './debounce';
import startWithURL from './startWithURL';
import stringCutter from './stringCutter';

jest.useFakeTimers();

beforeEach(() => {
  process.env = Object.assign(process.env, { API_SERVER_URL: 'http://localhost:8080' });
});

describe('유틸 함수가 잘 동작하는지 테스트', () => {
  describe('qsParser가 잘 동작하는지 테스트', () => {
    it('단일 쿼리 테스트', () => {
      expect(qsParser('?a=10')).toStrictEqual({ a: '10' });
    });
    it('다중 쿼리 테스트', () => {
      expect(qsParser('?a=10&b=20')).toStrictEqual({ a: '10', b: '20' });
    });
  });

  describe('startWithURL이 잘 동작하는지 테스트', () => {
    it('API로 잘 변환되는지 테스트', () => {
      expect(startWithURL('hello')).toBe(`${process.env.API_SERVER_URL}/hello`);
    });
  });

  describe('debounce가 잘 동작하는지 테스트', () => {
    let func: jest.Mock;
    let debouncedFunc: () => void;

    it('여러 함수가 실행되었을 때 한번만 실행되는지 테스트', () => {
      func = jest.fn();
      debouncedFunc = debounce(func, 1000);

      for (let i = 0; i < 100; i += 1) {
        debouncedFunc();
      }

      jest.runAllTimers();

      expect(func).toBeCalledTimes(1);
    });
  });

  describe('stringCutter가 잘 동작하는지 테스트', () => {
    it('10자 이상 넘어가면 글자를 자른다.', () => {
      let string = '';
      for (let i = 0; i < 50; i += 1) {
        string += `${i}`;
      }
      expect(stringCutter(string, 10)).toBe('0123456789...');
    });
    it('글자를 자를 때 마지막에 오는 문자가 *이다.', () => {
      let string = '';
      for (let i = 0; i < 50; i += 1) {
        string += `${i}`;
      }
      expect(stringCutter(string, 10, '*')).toBe('0123456789*');
    });
  });
});
