import axios from "axios";
import { useRef, useState } from "react"
import { youtube_parser } from "./utils";

function App() {
  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault()
    const youtubeID = youtube_parser(inputUrlRef.current.value);

    const options = {
      method: 'get',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },
      params: {
        id: youtubeID
      }
    }
    axios(options)
      .then(res => setUrlResult(res.data.link))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';

  }

  return (
    <div className="app">
      <section className="content">
        <h1 className="content_title">Download Your Youtube Music!</h1>
        <header>
          <div className="header-text">
            <p>Download <span></span></p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="form">
          <input ref={inputUrlRef} placeholder="Paste a Youtube video URL link..." className="form_input" type="text" />
          <button type="submit" className="form_button">Search</button>
        </form>

        {urlResult ? <a target='_blank' rel="noreferrer" href={urlResult} className="download_btn">Download MP3</a> : ''}

      </section>
    </div>
  )
}

export default App
