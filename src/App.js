import { useState } from 'react'
import UploadComponent from './UploadComponent'

import compile from './scripts/b2aCompiler.js'

function App() {
  const [value, setValue] = useState('')
  const [output, setOutput] = useState('')

  // Creates Brainfuck.mid and Brainfuck.wav under scripts/sounds
  function handleSubmit(event) {
    event.preventDefault()
    compile(value)
  }

  return (
    <>
      <header className="items-center justify-between px-6 py-4 bg-gray-100">
        <h1 className="text-xl font-bold text-red-500">EARF_CK</h1>
      </header>
      <div className="flex flex-1 gap-12 p-6">
        <section className="flex flex-col gap-4 p-6 bg-gray-100 rounded sm:w-96">
          <div>
            <h2 className="mb-2 text-xl font-medium text-red-500">
              What is Brainfuck?
            </h2>
            <p className="mb-2 text-gray-800">
              Brainfuck is an esoteric programming language created in 1993 by
              Urban Müller. Notable for its extreme minimalism, the language
              consists of only eight simple commands, a data pointer and an
              instruction pointer.
            </p>
            <p className="text-gray-800">
              While it is fully Turing complete, it is not
              intended for practical use, but to challenge and amuse
              programmers. Brainfuck simply requires one to break commands into
              microscopic steps. The language's name is a reference to the slang
              term brainfuck, which refers to things so complicated or unusual
              that they exceed the limits of one's understanding.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-medium text-red-500">
              What is Earf_ck?
            </h2>
            <p className="mb-2 text-gray-800">
              Earf_ck is primarily an Audio-based language that compiles to Brainfuck programming language. 
              It is also able to map a given Brainfuck program into its audio version. 
            </p>
            <p className="mb-2 text-gray-800">
              The mapping between the Brainfuck commands and the notes are given below:
            </p>
            <p className="text-gray-800">
              &gt;   =   Right shift   =   E5
            </p>
            <p className="text-gray-800">
              &lt;   =   Left shift    =   D5
            </p>
            <p className="text-gray-800">
              +   =   Increment     =   G5
            </p>
            <p className="text-gray-800">
              -   =   Decrement     =   F5
            </p>
            <p className="text-gray-800">
              .   =   Output        =   A5
            </p>
            <p className="text-gray-800">
              ,   =   Input         =   B5
            </p>
            <p className="text-gray-800">
              [   =   Loop start    =   C5
            </p>
            <p className="mb-2 text-gray-800">
              ]   =   Loop end      =   C6
            </p>
            <p className="text-gray-800">
              This was developed purely for fun, but this might have practical applications.
            </p>
            <p className="mb-2 text-gray-800">
              Maybe.
            </p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-medium text-red-500">
              What's next for Earf_ck?
            </h2>
            <p className="text-gray-800">
              We want to introduce more variations in tone &amp; pitch, note durations, instrumentation, etc.,
              which would allow us to create a more robust set of instructions that might possibly be easier
              to use than one that is based on Brainfuck, which would be more intuitive and easier to learn for
              the average programmer.</p>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-medium text-red-500">
              Why do this? This is pointless.
            </h2>
            <p className="text-gray-800">Yes.</p>
          </div>
          <div>
            <h4 className="mt-2 mb-2 text-l font-bold text-red-500">
              <a target="_blank" rel="noopener noreferrer" href="https://devpost.com/software/earf_ck">About our project</a>
            </h4>
          </div>
        </section>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-4">
          <h2 className="text-xl font-medium text-red-500">
            Brainfuck to Earf_ck converter
          </h2>
          <label
            htmlFor="instructions"
            className="text-lg font-medium text-gray-800"
          >
            1. Input Brainfuck instructions
          </label>
          <p className="mb-1 text-gray-600">
            Any program written in Brainfuck will be converted to a MIDI file written in Earf_ck for download!
          </p>
          <p className="text-gray-600">
            E.g. This program prints out "Hello, World!" in Brainfuck: &gt;++++++++[&lt;+++++++++&gt;-]&lt;.&gt;++++[&lt;+++++++&gt;-]&lt;+.+++++++..+++.&gt;&gt;++++++[&lt;+++++++&gt;-]&lt;++.------------.&gt;++++++[&lt;+++++++++&gt;-]&lt;+.&lt;.+++.------.--------.&gt;&gt;&gt;++++[&lt;++++++++&gt;-]&lt;+.
          </p>
          <div className="flex gap-4">
            <input
              name="instructions"
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className="flex-1 px-4 py-2 text-gray-800 bg-gray-100 rounded"
            />
            <input
              type="submit"
              className="px-4 py-2 font-medium text-white bg-red-500 rounded cursor-pointer hover:bg-red-600 transition-color"
            />
          </div>
          <label className="text-lg font-medium text-gray-800">
            2. Upload your MIDI file and listen to your code!
          </label>
          <UploadComponent play={true}/>
        </form>
        <form
          className="flex flex-col flex-1 gap-4"
          onSubmit={(event) => {event.preventDefault()}}
        >
          <h2 className="text-xl font-medium text-red-500">
            Earf_ck to Brainfuck converter
          </h2>
          <label htmlFor="upload" className="text-lg font-medium text-gray-800">
            1. Upload a MIDI file written in Earf_ck
          </label>
          <p className="text-gray-600">
            E.g. You can create a MIDI file written in Earf_ck through the Brainfuck to Earf_ck converter.
          </p>
          <UploadComponent play={false} setOutput={setOutput}/>
          <h3 className="text-lg font-medium text-gray-800">
            2. Here's the compiled Brainfuck output from the Earf_ck MIDI file you provided!
          </h3>
          <div className="p-6 text-gray-800 bg-gray-100 rounded">{output}</div>
        </form>
      </div>
      <footer className="flex justify-end p-6 bg-gray-100 sm:justify-between">
        <p className="hidden text-gray-400 sm:block">
          Built by Gokul, Hyung Woon, Shem and Vignesh for Hack&amp;Roll 2022.
        </p>
        <a
          target="_blank"
          href="https://github.com/vigneshsankariyer1234567890/earf__k"
          rel="noopener noreferrer"
          className="cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
            className="flex-none text-gray-400 transition-colors cursor-pointer hover:text-gray-500"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      </footer>
    </>
  )
}

export default App
