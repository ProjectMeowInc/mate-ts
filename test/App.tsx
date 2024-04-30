import { Editor } from "../src"

const content = `Hello world!`

function App() {
    return <Editor placeholder={content} submitHandler={() => alert("Submit sended")} />
}

export default App
