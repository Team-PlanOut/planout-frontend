import Head from 'next/head';

import Dashboard from '../components/Dashboard';
import Navbar from '../components/Navbar';
import { withProtected } from '../src/hook/route';

import type { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>PlanOut</title>
        <meta name="description" content="Planout App for planning events" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Dashboard />
    </div>
  );
};

export default withProtected(Home);
