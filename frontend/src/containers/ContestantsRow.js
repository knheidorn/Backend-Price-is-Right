import React, { Component } from 'react'
import BidForm from './BidForm'
import ShowBids from './ShowBids'

class ContestantsRow extends Component {

  constructor() {
    super()
    this.state = {
      value: "",
      submitted: false
    }
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.value)
    this.setState({
      submitted: true
    })
  }

  // I will also need to do a Post request to GameProduct
  //so I can keep track of which items were used and update
  //the score accordingly

  render() {
    let { contestants } = this.props
    let { value } = this.state

    if (!this.state.submitted) {
      return(
        <div className="App-header">
          <BidForm contestants={ contestants }
            value = { value }
            handleChange = { this.handleChange }
            handleSubmit = { this.handleSubmit }
          />
        </div>
      )
    } else {
      return(
        <div className="App-header">
          <ShowBids contestants={ contestants } />
        </div>
      )
    }

  }

}

export default ContestantsRow
