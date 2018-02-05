import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import FileUpload from 'material-ui-icons/FileUpload';
import AddToPhotos from 'material-ui-icons/AddToPhotos';
import {mailFolderListItems, otherMailFolderListItems} from './tileData';
import saveImage from '../utils/saveImage';
import firebaseApp from '../config/FirebaseConfig';

import withRoot from '../withRoot';
const drawerWidth = 240;

const styles = theme => ({
    root: {
        width: '100%',
        height: 430,
        marginTop: theme.spacing.unit * 3,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: theme.mixins.toolbar,
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileName: '',
        }
    }

    handleAddImage = (e) => {
        console.log('filename is :', e.target.files[0].name)
        this.setState({file: e.target.files[0]});
    }

    handleUpload = (e) => {
        e.preventDefault();
        console.log('submit', this.state.file);
        this.fileUpload(this.state.file);
    }

    fileUpload = (file) => {

        var imagesRef = firebaseApp.storage().ref().child('images');
        var uploadImagesRef = firebaseApp.database().ref().child("uploadImages");
        var newImageKey = uploadImagesRef.push().key;

        console.log('imagesRef', firebaseApp.storage().ref())
        // var newPostKey = firebaseApp.database().ref().child('images').push().key;

        if (file) {
            var filename = (file.name).match(/^.*?([^\\/.]*)[^\\/]*$/)[1] + '_poster';

            var task = saveImage(file, filename, imagesRef)
            console.log('filename is ', filename);
            this.setState({fileName: filename})
            task.then(function (snapshot) {
                var downloadUrl = task.snapshot.downloadURL;

                uploadImagesRef.child(newImageKey + '_image').set({
                    downloadUrl: downloadUrl,
                    Name: filename
                });

                console.log('download url is: ', downloadUrl)
            })
                .catch(function (error) {
                    console.error('error', error);
                });
        } else {
            console.log('no file')
        }

    }

    render() {
        const {classes} = this.props;
        const {anchor} = this.state;


        return (
            <div className={classes.root}>

                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, classes[`appBar-left`])}>
                        <Toolbar>
                            <Typography variant="title" color="inherit" noWrap>
                                Permanent drawer
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor={anchor}
                    >
                        <div className={classes.drawerHeader} />
                        <Divider />
                        <List>{mailFolderListItems}</List>
                        <Divider />
                        <List>{otherMailFolderListItems}</List>
                    </Drawer>
                    <main className={classes.content}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={(e) => this.handleAddImage(e)}
                        />
                        <label htmlFor="raised-button-file">
                            <Button component="span" className={classes.button}  color="default">
                                Choose Image
                                <AddToPhotos className={classes.rightIcon}/>
                            </Button>
                        </label>
                        <label htmlFor="raised-button-file">
                            <Button type="submit" onClick={(e) => this.handleUpload(e)} className={classes.button}
                                    color="default">
                                Upload
                                <FileUpload className={classes.rightIcon}/>
                            </Button>
                        </label>
                        <Typography>{'You think water moves fast? You should see ice.'}</Typography>
                    </main>
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));