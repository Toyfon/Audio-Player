import { FC, useCallback } from 'react';

import { FaRandom } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { changeTracksOrder } from 'bll/player-slice';
import styles from 'components/RandomButton/RandomButton.module.css';

export const RandomButton: FC = () => {
  const dispatch = useDispatch();

  const handleChangeTrackReordering = useCallback((): void => {
    dispatch(changeTracksOrder());
  }, [dispatch]);

  return (
    <FaRandom className={styles.random_button} onClick={handleChangeTrackReordering} />
  );
};
