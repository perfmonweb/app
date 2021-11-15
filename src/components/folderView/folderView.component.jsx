import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Folder from '../folder/folder.component';
import {
  selectFolders,
  selectPath,
} from '../../redux/reducers/directory/directory.selector';
import { Directory, HeadingBar } from './folderView.styles';
import { setPath } from '../../redux/actions';
import { Link } from 'react-router-dom';

class FolderView extends Component {
  render() {
    const { folders, level, title, path } = this.props;
    const pathString = `${parseInt(level) + 1}/${path.slice(1).join('/')}`;

    return (
      <div>
        <HeadingBar>
          <label>{title}</label>
        </HeadingBar>
        <Directory>
          {folders.map((folder, idx) => (
            <Link
              className='folder'
              to={`/web/${pathString}/${folder.id}`}
              key={idx}>
              <Folder name={folder.id} />
            </Link>
          ))}
        </Directory>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  folders: selectFolders,
  path: selectPath,
});

const mapDispatchToProps = (dispatch) => ({
  setPath: (val) => dispatch(setPath(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderView);
