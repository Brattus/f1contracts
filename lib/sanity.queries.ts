import { groq } from 'next-sanity'
import circuit from 'schemas/circuit'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const driversQuery = groq`
*[_type == "driver"] | order(_updatedAt desc) {
  _id,
  name,
  number,
  active,
  comment,
  "contracts": contracts[] {
    startYear,
    endYear,
    "team": team->,
    _key
  },
  _updatedAt
}
`

export const circuitsQuery = groq`
*[_type == "circuit"] | order(_updatedAt desc) {
  _id,
  name,
  contractEnd,
  active,
  racedate,
  comment,
  laps,
  length
}
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export interface Drivers {
  _id: string
  name?: string
  number?: number
  active?: boolean
  comment?: string
  contracts?: any[]
  _updatedAt?: Date
}

export interface Circuits {
  _id: string
  name?: string
  contractEnd?: number
  active?: boolean
  racedate?: Date
  comment?: string
  laps?: number
  length?: number
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}
