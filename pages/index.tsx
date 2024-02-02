import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getAllDrivers, getAllCircuits, getClient, getSettings } from 'lib/sanity.client'
import { Drivers, Circuits, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'
import css from 'styled-jsx/css'

interface PageProps extends SharedPageProps {
  drivers: Drivers[]
  circuits: Circuits[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { drivers, circuits, settings, draftMode } = props

  if (draftMode) {
    return <PreviewIndexPage drivers={drivers} settings={settings}  />
  }

  return <IndexPage drivers={drivers} settings={settings} circuits={circuits} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, drivers, circuits = []] = await Promise.all([
    getSettings(client),
    getAllDrivers(client),
    getAllCircuits(client),
  ])

  return {
    props: {
      drivers,
      circuits,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
