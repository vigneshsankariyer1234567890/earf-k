import AceEditor from 'react-ace'

function App() {
  function onChange(newValue) {
    console.log('change', newValue)
  }

  return (
    <AceEditor
      mode="java"
      theme="github"
      onChange={onChange}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />
  )
}

export default App
