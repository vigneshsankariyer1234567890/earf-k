const wav = require('node-wav');
const FFT = require('fft.js');
const fs = require('fs');

let FFT_SIZE = 8192; //fft size
let NOTE_SIZE = 11025;
let FFT_SAMPLE_SIZE = FFT_SIZE;

// console.log(audioData.length);
// let realInput = audioData.slice(0, FFT_SIZE); // use only 4096 sample from the buffer.

function plot(xVals, yVals, name) {
    plotlib.plot( // plotting the input data
        [{
            x: xVals,
            y: yVals,
            type: 'line',
            name: name
        }]
    );
}

// C5 - 97
// D5 - 109
// E5 - 122
// F5 - 129
// G5 - 145
// A5 - 163
// B5 - 183
// C6 - 194
function closestMidiNote(freq) {
    let notelist = ["C5", "D5", "E5", "F5", "G5", "A5", "B5", "C6"];
    let freqlist = [97, 109, 122, 129, 145, 163, 183, 194];
    for (let i = 0; i < freqlist.length; i++) {
        if (freq <= freqlist[i]) {
            if (i === 0) {
                return notelist[i];
            } else if (freq - freqlist[i-1] < freqlist[i] - freq) {
                return notelist[i-1];
            } else {
                return notelist[i]
            }
        }
    }
    return notelist[notelist.length - 1];
}

function getMidi(input) {
    let buffer = fs.readFileSync('/home/gok99/Local/NUS/hnr22/earf__k/src/bf.wav');
    let result = wav.decode(buffer); // read wav file data
    let audioData = Array.prototype.slice.call(result.channelData[0]); // convert Float32Array to normal array
    let midiArr = [];

    let numberOfNotes = audioData.length / NOTE_SIZE;
    for (let i = 0; i < numberOfNotes; i++) {
        let tempInput = audioData.slice(i*NOTE_SIZE, i*NOTE_SIZE+FFT_SIZE);
        let fftOutput = runFft(tempInput);
        let firstPeakVal = getFirstPeak(fftOutput);
        midiArr.push(closestMidiNote(firstPeakVal));
    }
    return midiArr;
}


function runFft(input) {
    // let size = input.length;
    let fft = new FFT(FFT_SIZE); //create fft object
    let realOutput = new Array(FFT_SIZE); // to store final result
    let complexOutput = fft.createComplexArray(); // to store fft output
    fft.realTransform(complexOutput, input); // compute fft
    // fft.completeSpectrum(complexOutput);
    fft.fromComplexArray(complexOutput,realOutput); // get rid of the complex value and keep only real
    return realOutput;
}

function getFirstPeak(fftOutput) {
    let xf=[]
    let sampleReal=[];
    let mod= Math.floor(FFT_SIZE/FFT_SAMPLE_SIZE);

    let max = -1;
    let ind = -1;

    for(let i=0; i<FFT_SIZE; i++) {
        if ((i%mod) === 0) {
            if(i/mod > 0 && fftOutput[i] > max) {
                max = fftOutput[i]
                ind = i/mod
            }
            sampleReal.push(fftOutput[i]);
            xf.push(i/mod);
            // console.log(i/mod)
        }
    }    
    console.log(ind);
    return ind;
}

console.log(getMidi());