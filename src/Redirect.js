import { useEffect } from 'react';

function Redirect() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // 👇️ redirects to an external URL
      window.location.replace('./User');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return <>Will redirect in 3 seconds...</>;
}

export default Redirect;