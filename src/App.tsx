import { FC } from 'react';

import './App.css';

import { Player } from 'components/Player/Player';

export const App: FC = () => {
  console.log('APP RENDER');
  return (
    <div className="App">
      <Player />
    </div>
  );
};
