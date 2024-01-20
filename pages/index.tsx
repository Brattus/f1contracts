import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getAllDrivers, getClient, getSettings } from 'lib/sanity.client'
import { Drivers, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  drivers: Drivers[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { drivers, settings, draftMode } = props

  if (draftMode) {
    return <PreviewIndexPage drivers={drivers} settings={settings} />
  }

  return <IndexPage drivers={drivers} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, drivers = []] = await Promise.all([
    getSettings(client),
    getAllDrivers(client),
  ])

  return {
    props: {
      drivers,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
