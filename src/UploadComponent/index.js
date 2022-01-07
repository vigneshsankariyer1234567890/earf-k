import React, { useState } from 'react';
import ReactAudioPlayer from 'react-audio-player'
import synth from 'synth-js';

const UploadComponent = (props) => {
    const [selectedFile, setSelectedFile] = useState();
	// const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
        // let wavName = event.target.files[0].name.replace(/\..+?$/, '.wav');
        var reader = new FileReader();

        // set callback for array buffer
        reader.addEventListener('load', function load(event) {
            // convert midi arraybuffer to wav blob
            var wav = synth.midiToWav(event.target.result).toBlob();
            // create a temporary URL to the wav file
            var src = URL.createObjectURL(wav);

            let audio = new Audio(src);
            audio.play();

            // window.open(src);
            
            // anchor.setAttribute('href', src);
        });

        // read the file as an array buffer
        reader.readAsArrayBuffer(event.target.files[0]);
	};

    return(
        <div>
            <input type="file" name="file" onChange={changeHandler} />
            {props.show 
                ? <ReactAudioPlayer
                    src="./scripts/sounds/Brainfuck.wav"
                    autoPlay
                    controls
                    className="place-self-center"
                />
                : null }
        </div>
    )
}

export default UploadComponent;