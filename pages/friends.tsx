import React from 'react';

import Navbar from '../components/Navbar';
import { withProtected } from '../src/hook/route';

function Friends() {
  return (
    <div>
      <Navbar />
      hello friends
    </div>
  );
}

export default withProtected(Friends);
