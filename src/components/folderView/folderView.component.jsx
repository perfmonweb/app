import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Folder from '../folder/folder.component';
import { selectFolders } from '../../redux/reducers/directory/directory.selector';
import { Directory, HeadingBar } from './folderView.styles';
import { setPath } from '../../redux/actions';
import { Link } from 'react-router-dom';

class FolderView extends Component {
  render() {
    const { folders, path, title } = this.props;
    console.log(path);
    return (
      <div>
        <HeadingBar>
          <label>{title}</label>
        </HeadingBar>
        <Directory>
          {folders.map((folder, idx) => (
            <Link className='folder' to={`${path}/${folder.id}`} key={idx}>
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
});

const mapDispatchToProps = (dispatch) => ({
  setPath: (val) => dispatch(setPath(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderView);
