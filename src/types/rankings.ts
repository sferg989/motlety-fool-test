import {LatestRecommendation} from "./articles"
import {Instrument} from "./quotes"

export type Ranking = {
  currentRank: {
    asOfDate: string
    value: number
  }
  instrument: Instrument
  latestRecommendation: LatestRecommendation
}