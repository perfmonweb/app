import { getDocs } from '@firebase/firestore';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAllDocuments } from '../../../firebase/api';
import { setFolders } from '../../../redux/actions';
import { selectFolders } from '../../../redux/reducers/directory/directory.selector';
import FolderView from '../../folderView/folderView.component';

class Games extends React.Component {
  state = {
    folders: [],
    loaded: false,
    error: '',
  };
  componentDidMount() {
    const {
      match: {
        params: { a, b },
      },
    } = this.props;
    let getDcs = new Promise((resolve, reject) => {
      getAllDocuments(`${a}/${b}/Items`).then((doc) => {
        if (!doc.empty) {
          doc.docs.map((d) => {
            return this.setState({
              folders: [...this.state.folders, { id: d.id, data: d.data() }],
            });
          });
        } else {
          reject('No such document is available');
        }
        resolve(this.state.folders);
      });
    });
    getDcs
      .then((val) => {
        this.props.setFolders(val);
        this.setState({ loaded: true });
      })
      .catch((err) => this.setState({ error: err }));
  }

  render() {
    const { b } = this.props.match.params;
    return this.state.loaded ? (
      <FolderView path={`${b}`} title='Games' />
    ) : (
      <React.Fragment>{this.state.error}</React.Fragment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  folders: selectFolders,
});

const mapDispatchToProps = (dispatch) => ({
  setFolders: (val) => dispatch(setFolders(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);
