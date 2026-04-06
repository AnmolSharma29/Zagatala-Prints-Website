import './App.css'
import Header from './components/Header'
import SocialMedia from './components/SocialMedia'
import Footer from './components/Footer'
import MainContent from './components/MainContent'
import Gallery from './components/Gallery'

function App() {

  return (
    <div className='h-screen'>
      <Header></Header>
      <SocialMedia></SocialMedia>
      <MainContent></MainContent>
      <Gallery></Gallery>
      <Footer></Footer>
    </div>
  )
}

export default App
