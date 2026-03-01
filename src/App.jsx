import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout        from './components/layout/Layout'
import Home          from './pages/Home'
import JobsPage      from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import AdminPage     from './pages/AdminPage'
import NotFound      from './pages/NotFound'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index         element={<Home />}          />
        <Route path="jobs"   element={<JobsPage />}      />
        <Route path="jobs/:id" element={<JobDetailPage />} />
        <Route path="admin"  element={<AdminPage />}     />
        <Route path="*"      element={<NotFound />}      />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App