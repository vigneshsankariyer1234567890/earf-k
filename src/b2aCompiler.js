const fs = require('fs')
const Midi = require('jsmidgen')
const synth = require('synth-js')

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
  let tape = Array(30000).fill(0)
  let ptr = 0
  let isLooping = false
  let loopStack = []
  let innerLoops = 0
  let notes = []

  for (i = 0; i < program.length; i++) {
    const char = program[i]

    if (isLooping) {
      if (char === '[') {
        innerLoops++
        if (char === ']') {
          if (innerLoops === 0) {
            isLooping = false
          } else {
            innerLoops--
          }
        }
      }
      continue
    }

    switch (char) {
      case '+':
        tape[ptr]++
        notes.push('G5')
        break
      case '-':
        tape[ptr]--
        notes.push('F5')
        break
      case ',':
        tape[ptr] = prompt()[0].charCodeAt()
        notes.push('B5')
        break
      case '.':
        console.log(String.fromCharCode(tape[ptr]))
        notes.push('A5')
        break
      case '>':
        ptr++
        tape[ptr] = tape[ptr] || 0
        notes.push('E5')
        break
      case '<':
        ptr--
        tape[ptr] = tape[ptr] || 0
        notes.push('D5')
        break
      case '[':
        tape[ptr] === 0 ? (isLooping = true) : loopStack.push(i)
        notes.push('C5')
        break
      case ']':
        tape[ptr] !== 0
          ? (i = loopStack[loopStack.length - 1])
          : loopStack.pop()
        notes.push('C6')
        break
      default:
        break
    }
  }

  // The commented-out sections will add basic percussion and bassline to the melody... for fun :)
  // The percussion and bassline only can be heard for the MIDI format...

  // let lownotes = notes.slice();
  // lownotes = lownotes.map(note => note[0] + (parseInt(note[1]) - 1).toString());

  var file = new Midi.File()
  var track = new Midi.Track()
  // var track2 = new Midi.Track();
  // var track3 = new Midi.Track();
  // var track4 = new Midi.Track();
  file.addTrack(track)
  // file.addTrack(track2);
  // file.addTrack(track3);
  // file.addTrack(track4);

  for (j = 0; j < notes.length; j++) {
    track.addNote(0, notes[j], 64)
    // track2.addNote(1, lownotes[j], 64);
    // if (j % 8 === 0) {
    //     track3.addNote(2, 'c3', 128);
    //     track3.addNote(2, 'c3', 128);
    //     track3.addNote(2, 'c3', 96);
    //     track3.addNote(2, 'c3', 96);
    //     track3.addNote(2, 'c3', 64);
    //     track4.addNote(9, 'b1', 128);
    //     track4.addNote(9, 'b1', 128);
    //     track4.addNote(9, 'b1', 128);
    //     track4.addNote(9, 'b1', 128);
    // }
  }

  // Convert file into .mid format (MIDI file)
  fs.writeFileSync('src/sounds/brainfuck.mid', file.toBytes(), 'binary')

  // Read file from .mid format (MIDI file)
  let midiBuffer = fs.readFileSync('src/sounds/brainfuck.mid')

  // Convert MIDI buffer to WAV buffer
  let wavBuffer = synth.midiToWav(midiBuffer).toBuffer()

  fs.writeFileSync('src/sounds/brainfuck.wav', wavBuffer, {
    encoding: 'binary'
  })
}

compile(
  '>++++++++[<+++++++++>-]<.>++++[<+++++++>-]<+.+++++++..+++.>>++++++[<+++++++>-]<++.------------.>++++++[<+++++++++>-]<+.<.+++.------.--------.>>>++++[<++++++++>-]<+.'
)
