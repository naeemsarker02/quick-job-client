import Hero           from '../components/home/Hero'
import CategorySection from '../components/home/CategorySection'
import CTABanner       from '../components/home/CTABanner'
import FeaturedJobs    from '../components/home/FeaturedJobs'
import LatestJobs      from '../components/home/LatestJobs'

const Home = () => (
  <>
    <Hero />
    <CategorySection />
    <CTABanner />
    <FeaturedJobs />
    <LatestJobs />
  </>
)

export default Home