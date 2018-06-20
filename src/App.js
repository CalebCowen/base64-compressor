import React, { Component } from 'react';
import {compress, decompress} from 'lz-string'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      image: null,
      imageSize: null,
      compressed: false
    }
  }

  startUpload = () => {
    this.refs.uploadInput.click()
  }

  savePhoto = (e) => {
   if (e.target.files[0]) {
    let file = e.target.files[0]
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      this.setState({image: reader.result, imageSize: reader.result.length, compressed: false})
    })
    reader.readAsDataURL(file)
   }
  }

  handleCompress = () => {
    let newString = compress(this.state.image)
    this.setState({image: newString, imageSize: newString.length, compressed: true})
  }

  render() {
    let {imageSize, image, compressed} = this.state
    return (
      <div>
        <button onClick={this.startUpload}>Upload</button>
        <button onClick={this.handleCompress}>Compress</button>
        <input ref="uploadInput" hidden type="file" onChange={this.savePhoto}/>
        <p>{(3 * (imageSize / 4)) / 1000000} MB</p>
        <img src={compressed ? decompress(image) : image} />
      </div>
    );
  }
}

export default App;
