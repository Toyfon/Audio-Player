import { FC, memo, useCallback, useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';

import styles from 'components/MenuButton/MenuButton.module.css';

type MenuButtonPropsType = {
  isShowPlaylist: boolean;
  setIsShowPlaylist: (isShowPlaylist: boolean) => void;
};

export const MenuButton: FC<MenuButtonPropsType> = memo(
  ({ setIsShowPlaylist, isShowPlaylist }) => {
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    const handleShowPlaylistOnClick = useCallback((): void => {
      setIsShowPlaylist(!isShowPlaylist);
      setIsOpenMenu(!isOpenMenu);
    }, [isOpenMenu, isShowPlaylist, setIsShowPlaylist]);

    const menuButtonStyle = isOpenMenu
      ? styles.active_open_playlist
      : styles.open_playlist;
    return (
      <AiOutlineMenu className={menuButtonStyle} onClick={handleShowPlaylistOnClick} />
    );
  },
);
