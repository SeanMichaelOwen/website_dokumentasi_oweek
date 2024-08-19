import Footer from './components/footer';
import GridImage from './components/gridImage';
import Jumbotron from './components/jumbotron';
import PhotoGallery from './galery';
import FollowUs from './SectionFollowUs';
import StickyNotesPage from './stickyNotesPage';


export default function Homes() {

  return (
    <div style={{ backgroundColor: '#fff', color: '#fff', minHeight: '100vh' }}>
      <Jumbotron />
      <main>
      <FollowUs/>
      <GridImage/>
      <StickyNotesPage/>
      {/* <PhotoGallery/> */}
      {/* <Footer/> */}
      </main>
    </div>
  );
}
