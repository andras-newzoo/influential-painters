import React, { Component } from 'react'
import { Tab, Dropdown} from 'semantic-ui-react'

import SecondaryChart from './SecondaryChart'

import nationalities from '../../data/nationalities'
import movements from '../../data/movements'

const height = 285 ,
      width = 625

class SecondaryChartContainer extends Component {


  render() {

    const { handleClick, color, metric } = this.props

    nationalities.sort((a,b) => a.key.localeCompare(b.key))
    movements.sort((a,b) => a.text.localeCompare(b.text))

    return (
        <Tab panes={

          [
           { menuItem: 'Number of Paintings', render: () => <Tab.Pane>
             <div className='first'>
               <SecondaryChart
                 key = {'paintings'}
                 chartClass = {'paintings'}
                 height = {height}
                 width = {width * .95}
                 yKey = {"paintings"}

                 xMax = {19.2}
                 yDomain = {[ "< 50", "50 <", "100 <", "200 <", "300 <", "700 <"]}

                 color = {color}
                 metric = {metric}

                 handleClick = {handleClick}

               />
           </div>
           </Tab.Pane> },
           { menuItem: 'Nationality', render: () => <Tab.Pane>
             <div className='second'>
               <SecondaryChart
                 key = {'nationatlity'}
                 chartClass = {'nationatlity'}
                height = {height}
                width = {width * .95}

                yKey = {"nationality"}

                xMax = {12}
                yDomain = {[ "Flemish",  "Russian", "Dutch", "Spanish",  "Italian", "French"]}

                color = {color}
                metric = {metric}

                handleClick = {handleClick}

               />
             <div id="nationality-dropdown">
                 <Dropdown onChange={this.props.handleNationalityDropDown}
                   placeholder='Search for other nationalities...'
                   selection
                   search
                   options = {nationalities}
                 />
               </div>
             </div>
           </Tab.Pane> },
           { menuItem: 'Artistic Movement', render: () => <Tab.Pane>
             <SecondaryChart
               key = {'movement'}
               chartClass = {'movement'}
              height = {height}
              width = {width * .95}

              yKey = {"movement"}

              xMax = {5.05}
              yDomain = {[ "Romanticism" ,"High Renaissance", "Post-Impressionism", "Northern Renaissance",  "Impressionism", "Baroque"]}

              color = {color}
              metric = {metric}

              handleClick = {handleClick}

             />
           <div id="movements-dropdown">
                 <Dropdown onChange={this.props.handleMovementDropDown}
                   placeholder='Search for other movements...'
                   selection
                   search
                   options = {movements}
                 />
               </div>
           </Tab.Pane> },
           { menuItem: 'Age', render: () => <Tab.Pane>
             <SecondaryChart
               key = {'age'}
               chartClass = {'age'}
              height = {height}
              width = {width * .95}

              yKey = {"age"}

              xMax = {12.15}
              yDomain = { ["Over 90 years" ,"80-89 years" ,"70-79 years", "60-69 years", "50-59 years",  "40-49 years", "30-39 years"]}

              color = {color}
              metric = {metric}

              handleClick = {handleClick}
             />
           </Tab.Pane> }
         ]

                } renderActiveOnly={true}/>
    );
}}


export default SecondaryChartContainer
