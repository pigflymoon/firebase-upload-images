import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import FileUpload from 'material-ui-icons/FileUpload';

const styles = theme => ({
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

class UploadButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileName:'',
        }
    }
    handleImageChange = (e) => {
        console.log('filename is :',e.target.files[0].name)
        this.setState({file: e.target.files[0]});
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={(e)=>this.handleImageChange(e)}
                />
                <label htmlFor="raised-button-file">
                    <Button component="span" className={classes.button} raised color="default">
                        Upload
                        <FileUpload className={classes.rightIcon}/>
                    </Button>
                </label>
            </div>
        );
    }

}

UploadButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadButton);