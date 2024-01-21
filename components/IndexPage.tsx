import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import DriversList from 'components/DriversList'
import IndexPageHead from 'components/IndexPageHead'
import * as demo from 'lib/demo.data'
import type { Drivers, Settings } from 'lib/sanity.queries'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  drivers: Drivers[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, drivers, settings } = props;
  const { title = demo.title, description = demo.description } = settings || {};

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader title={title} description={description} level={1} />

          <DriversList drivers={drivers} />

        </Container>
      </Layout>
    </>
  )
}
