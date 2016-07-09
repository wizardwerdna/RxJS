import {Observable} from 'rxjs';
import {test, str2mbl$, mbl2str$, expect} from './testsuite';

export function testTests() {

  test('General Expectation Tests', function() {
    test('expect().toBe()', function() {
      expect(1).toBe(1);
      expect('a').toBe('a');
      expect(null).toBe(null);
      expect(true).toBe(true);
      expect(1).not.toBe(2);
      expect('a').not.toBe('b');
      expect(null).not.toBe(undefined);
      expect(true).not.toBe(false);
    });

    test('expect().toEqual()', function() {
      expect(1).toEqual(1);
      expect('a').toEqual('a');
      expect(null).toEqual(null);
      expect(true).toEqual(true);
      expect([1, 2, 3]).toEqual([1, 2, 3]);
      expect(1).not.toEqual(2);
      expect('a').not.toEqual('b');
      expect(null).not.toEqual(100);
      expect(true).not.toEqual(false);
      expect([1, 2, 3]).not.toEqual([9, 2, 3]);
    });

    test('expect().toMarble', function() {
      test('empty', () => expect(mbl2str$('-|')).toMarble('-|'));
      test('empty', () => expect(mbl2str$('-1|')).toMarble('-1|'));
      test('empty', () => expect(mbl2str$('-1-2|')).toMarble('-1-2|'));
      test('empty', () => expect(mbl2str$('-|')).not.toMarble('-0|'));
      test('empty', () => expect(mbl2str$('-1|')).not.toMarble('-0-1|'));
      test('empty', () => expect(mbl2str$('-1-2|')).not.toMarble('-0-1-2|'));
    });
  });

  test('Stream Utility Functions', function() {
    test('str2mbl$', function () {
      test('empty', () => assertStr2mbl([], '-|'));
      test('empty', () => assertStr2mbl([1], '-1|'));
      test('empty', () => assertStr2mbl(['1'], '-1|'));
      test('empty', () => assertStr2mbl([1, 2], '-1-2|'));
      test('empty', () => assertStr2mbl([1, 2, 3], '-1-2-3|'));

      function assertStr2mbl(obs, expected) {
        const obs$ = Observable.from(obs);
        str2mbl$(obs$).subscribe(
          actual => expect(actual).toEqual(expected),
          err => console.error('ERROR: ' + err)
        );
      }
    });

    test('str2mbl$ using Observable.from', function () {
      test('empty', () => assertStr2mbl([], '-|'));
      test('empty', () => assertStr2mbl([1], '-1|'));
      test('empty', () => assertStr2mbl(['1'], '-1|'));
      test('empty', () => assertStr2mbl([1, 2], '-1-2|'));
      test('empty', () => assertStr2mbl([1, 2, 3], '-1-2-3|'));

      function assertStr2mbl(obs, expected) {
        const obs$ = Observable.from(obs);
        str2mbl$(obs$).subscribe(
          actual => expect(actual).toEqual(expected),
          err => console.error('ERROR: ' + err)
        );
      }
    });

    test('str2mbl$ using mbl2str$', function() {
      test('empty', () => assertStr2mbl('', '-|'));
      test('singleton', () => assertStr2mbl('1', '-1|'));
      test('doubleton', () => assertStr2mbl('1-2', '-1-2|'));
      test('multiple hyphens', () => assertStr2mbl('1----2', '-1-2|'));
      test('leading " |-"', () => assertStr2mbl('--  || ----1', '-1|'));
      test('trailing " |-"', () => assertStr2mbl('1--  |', '-1|'));
      function assertStr2mbl(str, expected) {
        str2mbl$(mbl2str$(str)).subscribe(
          actual => expect(actual).toEqual(expected)
        );
      }
    });
  });

};
