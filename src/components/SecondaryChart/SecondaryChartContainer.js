import React from 'react'
import { Tab } from 'semantic-ui-react'

import SecondaryChart from './SecondaryChart'

const height = 320 ,
      width = 555

const panes = [
  { menuItem: 'Number of paintings', render: () => <Tab.Pane>
    <SecondaryChart
      height = {height }
      width = {width}

    />
  </Tab.Pane> },
  { menuItem: 'Nationality', render: () => <Tab.Pane>
    <SecondaryChart
     height = {height}
     width = {width}

    />
  </Tab.Pane> },
  { menuItem: 'Artistic Movement', render: () => <Tab.Pane>
    <SecondaryChart

    />
  </Tab.Pane> },
  { menuItem: 'Age', render: () => <Tab.Pane>
    <SecondaryChart

    />
  </Tab.Pane> }
]

const SecondaryChartContainer = () => <Tab panes={panes} />

export default SecondaryChartContainer
