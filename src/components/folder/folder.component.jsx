import React from 'react';
import { FolderIcon } from './folder.styles';

const Folder = ({ name }) => (
  <div>
    <FolderIcon>
      <div className='icon'>
        <div className='folder'></div>
        <div className='folder-top'></div>
        <div className='footer'>
          <label>{name}</label>
        </div>
      </div>
    </FolderIcon>
  </div>
);

export default Folder;
