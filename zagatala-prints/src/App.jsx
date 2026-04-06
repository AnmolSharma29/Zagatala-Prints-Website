import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'
import Gallery from './components/Gallery'

function App() {

  return (
    <div className='h-screen'>
      <Header></Header>
      <MainContent></MainContent>
      <Gallery></Gallery>
      <Footer></Footer>
    </div>
  )
}

export default App
