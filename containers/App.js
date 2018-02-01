import React, {Component} from 'react';
import saveImage from '../utils/saveImage';
import firebaseApp from '../config/FirebaseConfig';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileName:'',
        }
    }

    onChange = (e) => {
        console.log('filename is :',e.target.files[0].name)
        this.setState({file: e.target.files[0]});
    }
    onFormSubmit = (e) => {
        e.preventDefault();
        this.fileUpload(this.state.file);
    }
    fileUpload = (file) => {

        var imagesRef = firebaseApp.storage().ref().child('images');
        var uploadImagesRef = firebaseApp.database().ref().child("uploadImages");
        var newImageKey = uploadImagesRef.push().key;

        console.log('imagesRef',firebaseApp.storage().ref())
        // var newPostKey = firebaseApp.database().ref().child('images').push().key;

        if (file) {
            var filename = (file.name).match(/^.*?([^\\/.]*)[^\\/]*$/)[1]+'_poster';

            var task = saveImage(file, filename, imagesRef)
            console.log('filename is ',filename);
            this.setState({fileName:filename})
            task.then(function (snapshot) {
                var downloadUrl = task.snapshot.downloadURL;

                uploadImagesRef.child(newImageKey+'_image').set({
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
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file"  accept=".jpg, .jpeg, .png" multiple onChange={this.onChange}/>
                <p>file name is {this.state.fileName}</p>
                <button type="submit">Upload</button>
            </form>
        )
    }
}