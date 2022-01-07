import Midi from 'jsmidgen';
import synth from 'synth-js';

const fs = require('fs-web');

// const fs = require('fs')
// const Midi = require('jsmidgen')
// const synth = require('synth-js')

// Converts a given Brainfuck program into audio.
// The Brainfuck-Frequency mapping is as follows:
// >    = Right shift   = E5
// <    = Left shift    = D5
// +    = Increment     = G5
// -    = Decrement     = F5
// .    = Output        = A5
// ,    = Input         = B5
// [    = Loop start    = C5
// ]    = Loop end      = C6

function compile(program) {
  // let tape = Array(30000).fill(0)
  // let ptr = 0
  // let isLooping = false
  // let loopStack = []
  // let innerLoops = 0
  let notes = []

  for (let i = 0; i < program.length; i++) {
    const char = program[i]

    // if (isLooping) {
    //   if (char === '[') {
    //     innerLoops++
    //     if (char === ']') {
    //       if (innerLoops === 0) {
    //         isLooping = false
    //       } else {
    //         innerLoops--
    //       }
    //     }
    //   }
    //   continue
    // }

    switch (char) {
      case '+':
        // tape[ptr]++
        notes.push('G5')
        break
      case '-':
        // tape[ptr]--
        notes.push('F5')
        break
      case ',':
        // tape[ptr] = prompt()[0].charCodeAt()
        notes.push('B5')
        break
      case '.':
        // console.log(String.fromCharCode(tape[ptr]))
        notes.push('A5')
        break
      case '>':
        // ptr++
        // tape[ptr] = tape[ptr] || 0
        notes.push('E5')
        break
      case '<':
        // ptr--
        // tape[ptr] = tape[ptr] || 0
        notes.push('D5')
        break
      case '[':
        // tape[ptr] === 0 ? (isLooping = true) : loopStack.push(i)
        notes.push('C5')
        break
      case ']':
        // tape[ptr] !== 0
        //   ? (i = loopStack[loopStack.length - 1])
        //   : loopStack.pop()
        notes.push('C6')
        break
      default:
        break
    }
  }

  var file = new Midi.File();
  var track = new Midi.Track();
  file.addTrack(track);

  for (let j = 0; j < notes.length; j++) {
    track.addNote(0, notes[j], 64)
  }

  const bytes = file.toBytes();
  const b64 = btoa(bytes);
  const uri = 'data:audio/midi;base64,' + b64;

  window.open(uri);

  // function Download(arrayBuffer, type) {
  //   var blob = new Blob([arrayBuffer], { type: type });
  //   var url = URL.createObjectURL(blob);
  //   return new Blob([arrayBuffer], { type: type });
  // }

  // Download(b64, "audio/midi");

  // fs.writeFile("Brainfuck.mid", b64).then(() => {
  //     return fs.readFile("Brainfuck.mid");
  // }).then(files => {
  //     console.log(files);
  //     let wavBuffer = synth.midiToWav(files).toBuffer();
  //     console.log("Success! 2")
  // });

  // Convert file into .mid format (MIDI file)
  // fs.writeFileSync('src/scripts/sounds/brainfuck.mid', file.toBytes(), 'binary')

  // Read file from .mid format (MIDI file)
  // let midiBuffer = fs.readFileSync('src/scripts/sounds/brainfuck.mid')

  // Convert MIDI buffer to WAV buffer
  // let wavBuffer = synth.midiToWav(midiBuffer).toBuffer()

  // fs.writeFileSync('src/scripts/sounds/brainfuck.wav', wavBuffer, {
  //   encoding: 'binary'
  // })
}

export default compile;

// compile(">++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.")