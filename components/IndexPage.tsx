import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import DriversList from 'components/DriversList'
import CircuitList from 'components/CircuitList'
import Footer from 'components/Footer'
import IndexPageHead from 'components/IndexPageHead'
import * as demo from 'lib/demo.data'
import type { Drivers, Circuits, Settings } from 'lib/sanity.queries'
import circuit from 'schemas/circuit'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  drivers: Drivers[]
  circuits: Circuits[]
  settings: Settings
}



export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, drivers, circuits, settings } = props;
  
  const { title = demo.title, description = demo.description } = settings || {};

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} description={description} level={1} />

          <div className="flex flex-col space-y-10 md:space-y-20 mb-32">
            <DriversList drivers={drivers} />



            <CircuitList circuits={circuits} /></div>

            <Footer />

        </Container>
      </Layout>
    </>
  )
}
