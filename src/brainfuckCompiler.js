function compile(program) {
    let tape       = Array(30000).fill(0);
    let ptr        = 0;
    let isLooping  = false;
    let loopStack  = [];
    let innerLoops = 0;
    let frequencyList = [];
  
    for( i = 0; i < program.length; i++ ) {
  
      const char = program[i];
    
      if(isLooping) {
        if(char === "[") innerLoops++;
          if(char === "]") {
            if(innerLoops === 0) isLooping = false;
            else innerLoops--;
          }
        continue;
      }
  
      switch(char){
        case '+':
          tape[ptr]++;
          frequencyList.push("G5");
          break;
        case '-':
          tape[ptr]--;
          frequencyList.push("F5");
          break;
        case ',':
          tape[ptr] = prompt()[0].charCodeAt()
          frequencyList.push("B5");
          break;
        case '.':
          console.log(String.fromCharCode(tape[ptr]));
          frequencyList.push("A5");
          break;
        case '>':
          ptr++;
          tape[ptr] = tape[ptr] || 0;
          frequencyList.push("E5");
          break;
        case '<':
          ptr--;
          tape[ptr] = tape[ptr] || 0;
          frequencyList.push("D5");
          break;
        case '[':
          tape[ptr] === 0 
            ? isLooping = true
            : loopStack.push(i);
          frequencyList.push("C5");
          break;
        case ']':
          tape[ptr] !== 0
            ? i = loopStack[loopStack.length-1]
            : loopStack.pop();
          frequencyList.push("C6");
          break;
        default:
          break;
      }
    }

    return frequencyList
  }