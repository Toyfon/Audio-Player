import { ChangeEvent, FC, memo, useState } from 'react';

import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import { setMuteVolume } from 'bll/player-slice';
import { selectIsMuted } from 'bll/selectors/player-selectors';
import styles from 'components/PlayerControls/VolumeBlock/VolumeSettings.module.css';

const MAX = 1;
type VolumeSettingsPropsType = {
  handleChangeVolumeRange: (value: number) => void;
};
export const VolumeSettings: FC<VolumeSettingsPropsType> = memo(
  ({ handleChangeVolumeRange }) => {
    const [volumeValue, setVolumeValue] = useState<number>(0.3);

    const isMuted = useSelector(selectIsMuted);

    const dispatch = useDispatch();

    const changeVolume = (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.currentTarget;
      setVolumeValue(+value);
      handleChangeVolumeRange(Number(value));
      dispatch(setMuteVolume(false));
    };

    const muteVolume = (): void => {
      dispatch(setMuteVolume(!isMuted));
      if (!isMuted) {
        handleChangeVolumeRange(0);
      } else {
        handleChangeVolumeRange(volumeValue);
      }
    };

    const getBackgroundSize = (): { backgroundSize: string } => ({
      backgroundSize: `${(volumeValue * 100) / MAX}% 100%`,
    });

    return (
      <div className={styles.volumeBlock}>
        <button className={styles.volumeButton} type="button" onClick={muteVolume}>
          {isMuted || volumeValue === 0 ? <FaVolumeMute /> : <FaVolumeDown />}
        </button>
        <input
          type="range"
          className={styles.volume_progressBar}
          style={getBackgroundSize()}
          min="0"
          max="1"
          step="0.001"
          value={volumeValue}
          onChange={changeVolume}
        />
        <FaVolumeUp className={styles.volumeButton} />
      </div>
    );
  },
);
