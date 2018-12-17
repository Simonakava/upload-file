import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageURL: '',
            alert: false
        };
    }

    handleUploadImage = (ev) => {
        ev.preventDefault();

        const data = new FormData();
        //add new value in FormData
        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);

        fetch('http://localhost:8000/upload', {
            method: 'POST',
            body: data,
        }).then((response) => {

            response.json().then((body) => {
                this.setState({
                    imageURL: `http://localhost:8000/${body.file}`
                });
            });
            console.log(this.uploadInput.files[0].size)
        });

        this.tooBig()


    }

    //fonction if size > 3Mo
    tooBig = () => {
        if (this.uploadInput.files[0].size > 3000000) {
            alert("File is too big!");
            this.setState({
                alert: true
            });
            console.log(this.state.alert)
        }
    }

    render() {
        return (

            <form onSubmit={this.handleUploadImage} style={{ margin: '10vh' }}>
                <label style={{ fontWeight: 'bold' }}>1/ Choose png in local (max size: 3Mo)</label>
                <div>
                    <input ref={(ref) => { this.uploadInput = ref; }} type="file" accept=".png" multiple />
                </div>
                <br />
                <label style={{ fontWeight: 'bold' }}>2/ Name the file</label>
                <div>
                    <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
                </div>
                <br />
                <label style={{ fontWeight: 'bold' }}>3/ Upload the file</label>
                <div>
                    <button>Upload</button>
                </div>
                <br />
                {(this.state.alert === false) ?
                    <img src={this.state.imageURL} style={{ width: '50vh' }} alt="img" />
                    :
                    <div></div>
                }
            </form >


        );
    }
}

export default Main; 