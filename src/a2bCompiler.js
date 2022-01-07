// Converts a given list of frequencies into Brainfuck and compiles it as Brainfuck code.
// The Brainfuck-Frequency mapping is as follows:
// >    = Right shift   = E5
// <    = Left shift    = D5
// +    = Increment     = G5
// -    = Decrement     = F5
// .    = Output        = A5
// ,    = Input         = B5
// [    = Loop start    = C5
// ]    = Loop end      = C6

function compile(freqs) {

    const freq_to_midi = (freq) => Math.log2(freq / 440) * 12 + 69; 
    const midi_to_note = (midi) => {
        let octave = ((midi / 12) - 1).toString();
        let note = octave + substring("C C#D D#E F F#G G#A A#B ", (midi % 12) * 2, 2);
    };

    let notes = freqs.map(freq_to_midi).map(midi_to_note);

    let tape = Array(30000).fill(0);
    let ptr = 0;
    let isLooping = false;
    let loopStack = [];
    let innerLoops = 0;
  
    for( i = 0; i < notes.length; i++ ) {
  
        const char = notes[i];
        
        if (isLooping) {
            if (char === "C5") innerLoops++;
                if (char === "C6") {
                    if (innerLoops === 0) {
                        isLooping = false;
                    } else {
                        innerLoops--;
                    }
                }
            continue;
        }
    
        switch(char) {
        case 'G5':
            tape[ptr]++;
            break;
        case 'F5':
            tape[ptr]--;
            break;
        case 'B5':
            tape[ptr] = prompt()[0].charCodeAt()
            break;
        case 'A5':
            console.log(String.fromCharCode(tape[ptr]));
            break;
        case 'E5':
            ptr++;
            tape[ptr] = tape[ptr] || 0;
            break;
        case 'D5':
            ptr--;
            tape[ptr] = tape[ptr] || 0;
            break;
        case 'C5':
            tape[ptr] === 0 
                ? isLooping = true
                : loopStack.push(i);
            break;
        case 'C6':
            tape[ptr] !== 0
                ? i = loopStack[loopStack.length-1]
                : loopStack.pop();
            break;
        default:
            break;
        }
    }
}