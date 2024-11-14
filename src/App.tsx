import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from './container/homeContainer/homeContainer';
import FormationOverviewPage from './container/formationOverview/formationOverview';
import RoasterDetailsPage from './container/roasterDetails/roasterDetails';
import { NoFormationData } from './component/noFormationData/noFormationData';

const LazyLayoutContainer = React.lazy(() => import('./container/layoutContainer/layoutContainer'));


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Suspense fallback="Loading..."><LazyLayoutContainer /></Suspense>}>
          <Route
            path="/"
            element={
              <HomeContainer />
            }
          />
          <Route
            path="/formation-overview/:id"
            element={
              <FormationOverviewPage />
            }
          />
          <Route
            path="/formation-overview"
            element={
              <NoFormationData showModal={true}/>
            }
          />
          <Route
            path="/roaster-details/:id"
            element={
              <RoasterDetailsPage />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
