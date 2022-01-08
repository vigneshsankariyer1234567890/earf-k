import Midi from 'jsmidgen';

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
var brainFuckDict = {
  '+': 'G5',
  '-': 'F5',
  ',': 'B5',
  '.': 'A5',
  '>': 'E5',
  '<': 'D5',
  '[': 'C5',
  ']': 'C6'
};

const parseChar = (char) => brainFuckDict[char];

function compile(program) {
  let notes = []

  for (let i = 0; i < program.length; i++) {
    const char = program[i]
    notes.push(parseChar(char));
  }

  var file = new Midi.File();
  var track = new Midi.Track();
  file.addTrack(track);

  for (let j = 0; j < notes.length; j++) {
    if (notes[j]) {
      track.addNote(0, notes[j], 64)
    }
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