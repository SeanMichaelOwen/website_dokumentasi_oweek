import GridImage from './components/gridImage';
import Jumbotron from './components/jumbotron';
import StickyNotesPage from './stickyNotesPage';


export default function Homes() {

  return (
    <div style={{ backgroundColor: '#fff', color: '#fff', minHeight: '100vh' }}>
      <Jumbotron />
      <main>
      <GridImage/>
      <StickyNotesPage/>
      </main>
    </div>
  );
}
