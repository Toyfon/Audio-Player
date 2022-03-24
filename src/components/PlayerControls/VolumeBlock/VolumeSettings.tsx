import { ChangeEvent, FC, memo, useState } from 'react';

import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

import styles from 'components/PlayerControls/VolumeBlock/VolumeSettings.module.css';

type VolumeSettingsPropsType = {
  handleChangeVolumeRange: (value: number) => void;
};
export const VolumeSettings: FC<VolumeSettingsPropsType> = memo(
  ({ handleChangeVolumeRange }) => {
    const [volumeValue, setVolumeValue] = useState<number>(0.3);
    const [isMuted, setIsMuted] = useState<boolean>(false);

    const changeVolume = (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.currentTarget;
      setVolumeValue(+value);
      handleChangeVolumeRange(Number(value));
    };

    const muteVolume = (): void => {
      setIsMuted(!isMuted);
      if (!isMuted) {
        handleChangeVolumeRange(0);
      } else {
        handleChangeVolumeRange(volumeValue);
      }
    };
    return (
      <div className={styles.volumeBlock}>
        <button className={styles.volumeButton} type="button" onClick={muteVolume}>
          {isMuted ? <FaVolumeMute /> : <FaVolumeDown />}
        </button>
        <input
          type="range"
          className={styles.volume_progressBar}
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
