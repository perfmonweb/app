import _ from 'lodash';
import { getDocs, collectionGroup, query, where } from '@firebase/firestore';
import { db, getAllCollections, getDocument } from '../../../firebase/api';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAllDocuments } from '../../../firebase/api';
import { setFolders, setPath } from '../../../redux/actions';
import {
  selectFolders,
  selectPath,
} from '../../../redux/reducers/directory/directory.selector';
import FolderView from '../../folderView/folderView.component';
import DisplayChart from '../display-chart/display-chart.component';
import { Perimeter } from './single.styles';
import { Link } from 'react-router-dom';

class Single extends React.Component {
  state = {
    folders: [],
    loaded: false,
    error: '',
    itemType: '',
    isFolder: false,
    chartData: {},
  };
  componentDidMount() {
    const {
      path,
      match: { params, url },
    } = this.props;
    //  Possible params we can expect from the params
    // Type: Either Tree(directory) or Blob(graph) view
    // l0, l1, l2, l3 - levels
    const paramsValues = Object.values(params);
    const dirLevel = params['level'];
    let pathArray = paramsValues.slice(1);
    switch (parseInt(dirLevel)) {
      case 0:
        break;
      case 1:
        pathArray = [...pathArray, 'Devices'];
        break;
      case 2:
        pathArray = [...pathArray, 'Games'];
        break;
      case 3:
        break;
      default:
        break;
    }
    if (dirLevel < '3') {
      this.setState({ isFolder: true });
      getAllDocuments(pathArray).then((documents) => {
        let x = documents.docs.reduce(
          (acc, doc) => [
            ...acc,
            { id: doc.id, data: doc.data(), ref: doc.ref },
          ],
          []
        );
        this.props.setFolders(x);
      });
    } else {
      this.setState({ isFolder: false });
      let documentDataPromise = new Promise((resolve, reject) => {
        getDocument(pathArray).then((doc) => {
          if (doc.exists) {
            let docData = doc.data();
            resolve(docData);
          } else {
            reject('The document does not exist');
          }
        });
      });
      documentDataPromise.then((data) => this.setState({ chartData: data }));
    }
    this.props.setPath([dirLevel, ...pathArray]);
  }

  render() {
    return (
      <Perimeter>
        {this.props.path ? (
          <div className='path'>
            {this.props.path.map((path, idx) => {
              if (idx === 0) {
                return (
                  <Link
                    className='path-child ui label tag teal'
                    to={`/web/0/Google`}>
                    sessions
                  </Link>
                );
              }
              if (idx % 2 === 0) {
                let updatedPath = this.props.path.slice(0, idx + 1);
                let uPath = `${(updatedPath.length - 1) / 2}/${updatedPath
                  .slice(1)
                  .join('/')}`;
                console.log(uPath, updatedPath);
                return (
                  <Link
                    className='path-child ui label tag teal'
                    to={`/web/${uPath}`}>
                    {path}
                  </Link>
                );
              } else {
                return <React.Fragment></React.Fragment>;
              }
            })}
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        {this.state.isFolder ? (
          <FolderView
            folders={this.state.folders}
            title='Google'
            level={this.props.match.params['level']}
          />
        ) : (
          <DisplayChart chartData={this.state.chartData}></DisplayChart>
        )}
      </Perimeter>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  folders: selectFolders,
  path: selectPath,
});

const mapDispatchToProps = (dispatch) => ({
  setFolders: (val) => dispatch(setFolders(val)),
  setPath: (val) => dispatch(setPath(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Single);
