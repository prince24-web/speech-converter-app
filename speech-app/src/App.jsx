

function App() {
      return(
        <div className="container">
            <h1 className="title">Text To Speech <span className="subTitle">Converter</span></h1>
            <div className="input-group">
                <textarea className="form-control" id="text" rows="5" placeholder="Write anything here"></textarea>
            </div>
            <button>Listen</button>
        </div>
      )
}
    
export default App
