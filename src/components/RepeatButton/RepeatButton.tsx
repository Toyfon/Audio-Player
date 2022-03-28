import { FC, useCallback } from 'react';

import { MdRepeat, MdRepeatOne } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { setRepeatValue } from 'bll/player-slice';
import { selectIsRepeat } from 'bll/selectors/player-selectors';
import styles from 'components/RepeatButton/RepeatButton.module.css';

export const RepeatButton: FC = () => {
  const isRepeat = useSelector(selectIsRepeat);

  const dispatch = useDispatch();

  const handleChangeRepeatValue = useCallback(
    (value: boolean): void => {
      dispatch(setRepeatValue(value));
    },
    [dispatch],
  );

  return (
    <button className={styles.repeat_button} type="button">
      {isRepeat ? (
        <MdRepeatOne onClick={() => handleChangeRepeatValue(false)} />
      ) : (
        <MdRepeat onClick={() => handleChangeRepeatValue(true)} />
      )}
    </button>
  );
};
