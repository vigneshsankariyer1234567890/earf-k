import React from 'react';
import synth from 'synth-js';
import getMidi from '../scripts/fftCompiler.js';
import compile from '../scripts/a2bCompiler.js';

const UploadComponent = (props) => {
    // const [selectedFile, setSelectedFile] = useState();
	// const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		// setSelectedFile(event.target.files[0]);
        // let wavName = event.target.files[0].name.replace(/\..+?$/, '.wav');
        var reader = new FileReader();

        // set callback for array buffer
        reader.addEventListener('load', async function load(event) {
            // convert midi arraybuffer to wav blob
            var wav = synth.midiToWav(event.target.result).toBlob();

            if (props.play) {
                // create a temporary URL to the wav file
                var src = URL.createObjectURL(wav);

                let audio = new Audio(src);
                audio.play();

                // window.open(src);
                // anchor.setAttribute('href', src);
            } else {
                let notelist = await getMidi(wav);
                props.setOutput(compile(notelist));
            }
        });

        // read the file as an array buffer
        reader.readAsArrayBuffer(event.target.files[0]);
	};

    return(
        <div className="flex items-center justify-between gap-4">
            <input type="file" name="file" onChange={changeHandler} />
            { props.play 
                ? null
                : <input
              type="submit"
              className="px-4 py-2 font-medium text-white transition-colors bg-red-500 rounded cursor-pointer hover:bg-red-600"
            />}
        </div>
    )
}

export default UploadComponent;