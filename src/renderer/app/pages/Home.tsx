import { Link } from 'react-router-dom';
import { Label } from '../../shared/shadcn/ui/label';
import { Button } from '../../shared/shadcn/ui/button';

function Home() {
  return (
    <div className="bg-slate-300">
      Esta es la página secundaria
      <Button>Hola</Button>
      <Link to="/private/secondary" className="text-primary ml-2">A la secundaria</Link>
    </div>
  );
}

export default Home;
